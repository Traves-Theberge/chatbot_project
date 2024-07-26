// File: public/socketHandler.js
import { renderMessage } from './messageHandler.js';

export const socket = io();

socket.on('connect', () => {
  console.log('Connected to WebSocket server');
});

socket.on('chat message', ({ sessionId, userMessage, assistantMessage, model }) => {
  const chatSessionsList = document.getElementById('chat-sessions');
  const chatWindow = document.getElementById('chat-window');
  if (chatSessionsList.dataset.activeSessionId === sessionId) {
    renderMessage(userMessage, 'user');
    renderMessage(assistantMessage, 'assistant', model);
  }
});

export const sendMessage = () => {
  const chatSessionsList = document.getElementById('chat-sessions');
  const userInput = document.getElementById('user-input');
  const modelSelect = document.getElementById('model-select');
  const activeSessionId = chatSessionsList.dataset.activeSessionId;
  const message = userInput.value.trim();
  const selectedModel = modelSelect.value;

  if (!activeSessionId || !message) return;

  userInput.value = '';

  socket.emit('chat message', { 
    sessionId: activeSessionId, 
    message, 
    selectedModel 
  });
};