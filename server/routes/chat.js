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
  console.log('Fetching chat sessions for user:', userId);
  const { data, error } = await supabaseClient
    .from('chat_sessions')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching chat sessions:', error);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Fetch conversation history
router.get('/conversations/:sessionId', authenticateUser, async (req, res) => {
  const sessionId = req.params.sessionId;
  const userId = req.user.id;
  console.log('Fetching conversations for session:', sessionId);

  if (!uuidValidate(sessionId)) {
    console.error('Invalid session ID:', sessionId);
    return res.status(400).json({ error: 'Invalid session ID' });
  }

  const { data, error } = await supabaseClient
    .from('conversations')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching conversations:', error);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Start new chat session
router.post('/sessions', authenticateUser, async (req, res) => {
  const userId = req.user.id;
  const { sessionName } = req.body;
  console.log('Starting new chat session for user:', userId, 'with name:', sessionName);

  try {
    const { data, error } = await supabaseClient
      .from('chat_sessions')
      .insert([{ user_id: userId, session_name: sessionName }])
      .single();

    if (error) {
      console.error('Error starting new chat session:', error);
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Handle new messages
router.post('/conversations', authenticateUser, async (req, res) => {
  const userId = req.user.id;
  const { sessionId, message } = req.body;
  console.log('Handling new message for session:', sessionId);

  if (!uuidValidate(sessionId)) {
    console.error('Invalid session ID:', sessionId);
    return res.status(400).json({ error: 'Invalid session ID' });
  }

  try {
    const { data: userMessage, error: userMessageError } = await supabaseClient
      .from('conversations')
      .insert([{ session_id: sessionId, sender: 'user', content: message }])
      .single();

    if (userMessageError) {
      console.error('Error inserting user message:', userMessageError);
      return res.status(500).json({ error: userMessageError.message });
    }

    const messages = [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: message }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages
    });

    const assistantMessage = completion.choices[0].message.content.trim();

    const { data: assistantMessageData, error: assistantMessageError } = await supabaseClient
      .from('conversations')
      .insert([{ session_id: sessionId, sender: 'assistant', content: assistantMessage }])
      .single();

    if (assistantMessageError) {
      console.error('Error inserting assistant message:', assistantMessageError);
      return res.status(500).json({ error: assistantMessageError.message });
    }

    res.json(completion);
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
