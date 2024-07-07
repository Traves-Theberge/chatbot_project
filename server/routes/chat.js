const express = require('express');
const router = express.Router();
const { authenticateUser, supabaseClient } = require('../middleware/auth');
const OpenAI = require('openai');
const { v4: uuidv4, validate: uuidValidate } = require('uuid');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Fetch chat sessions
router.get('/sessions', authenticateUser, async (req, res) => {
  const userId = req.user.id;
  const { data, error } = await supabaseClient.from('chat_sessions').select('*').eq('user_id', userId);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Fetch conversation history
router.get('/conversations/:sessionId', authenticateUser, async (req, res) => {
  const sessionId = req.params.sessionId;
  const userId = req.user.id;

  if (!uuidValidate(sessionId)) {
    return res.status(400).json({ error: 'Invalid session ID' });
  }

  const { data, error } = await supabaseClient
    .from('conversations')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Start new chat session
router.post('/sessions', authenticateUser, async (req, res) => {
  const userId = req.user.id;
  const { sessionName } = req.body;

  try {
    const { data, error } = await supabaseClient
      .from('chat_sessions')
      .insert([{ user_id: userId, session_name: sessionName }])
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete chat session
router.delete('/sessions/:sessionId', authenticateUser, async (req, res) => {
  const sessionId = req.params.sessionId;
  const userId = req.user.id;

  try {
    const { data, error } = await supabaseClient
      .from('chat_sessions')
      .delete()
      .eq('id', sessionId)
      .eq('user_id', userId)
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    await supabaseClient
      .from('conversations')
      .delete()
      .eq('session_id', sessionId);

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Handle new messages
router.post('/conversations', authenticateUser, async (req, res) => {
  const userId = req.user.id;
  const { sessionId, message } = req.body;

  if (!uuidValidate(sessionId)) {
    return res.status(400).json({ error: 'Invalid session ID' });
  }

  try {
    // Insert user message into conversations
    const { data: userMessage, error: userMessageError } = await supabaseClient
      .from('conversations')
      .insert([{ session_id: sessionId, sender: 'user', content: message }])
      .single();

    if (userMessageError) {
      return res.status(500).json({ error: userMessageError.message });
    }

    // Fetch conversation history
    const { data: conversations, error: historyError } = await supabaseClient
      .from('conversations')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (historyError) {
      return res.status(500).json({ error: historyError.message });
    }

    // Prepare messages for OpenAI
    const messages = [{ role: 'system', content: 'You are a helpful assistant.' }];
    conversations.forEach(conversation => {
      messages.push({ role: conversation.sender === 'user' ? 'user' : 'assistant', content: conversation.content });
    });
    messages.push({ role: 'user', content: message });

    // Get assistant response from OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages
    });

    const assistantMessage = completion.choices[0].message.content.trim();

    // Insert assistant message into conversations
    const { data: assistantMessageData, error: assistantMessageError } = await supabaseClient
      .from('conversations')
      .insert([{ session_id: sessionId, sender: 'assistant', content: assistantMessage }])
      .single();

    if (assistantMessageError) {
      return res.status(500).json({ error: assistantMessageError.message });
    }

    res.json({ userMessage: userMessage.content, assistantMessage });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
