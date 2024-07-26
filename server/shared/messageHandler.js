// shared/messageHandler.js
const handleChatMessage = async (sessionId, message, model, supabaseClient) => {
  // Insert user message into conversations
  const { data: userMessage, error: userMessageError } = await supabaseClient
    .from('conversations')
    .insert([{ session_id: sessionId, sender: 'user', content: message }])
    .single();

  if (userMessageError) {
    throw new Error(userMessageError.message);
  }

  // Fetch conversation history
  const { data: conversations, error: historyError } = await supabaseClient
    .from('conversations')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });

  if (historyError) {
    throw new Error(historyError.message);
  }

  // Prepare messages for the model
  const messages = [{ role: 'system', content: 'You are a helpful assistant.' }];
  conversations.forEach(conversation => {
    messages.push({ role: conversation.sender === 'user' ? 'user' : 'assistant', content: conversation.content });
  });
  messages.push({ role: 'user', content: message });

  // Get assistant response from the selected model
  const assistantMessage = await model.generateMessage(messages);

  // Insert assistant message into conversations
  const { data: assistantMessageData, error: assistantMessageError } = await supabaseClient
    .from('conversations')
    .insert([{ session_id: sessionId, sender: 'assistant', content: assistantMessage }])
    .single();

  if (assistantMessageError) {
    throw new Error(assistantMessageError.message);
  }

  return { userMessage: message, assistantMessage };
};

module.exports = { handleChatMessage };
