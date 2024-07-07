// File: public/socketHandler.js
import { renderMessage } from './messageHandler.js';

export const socket = io();

socket.on('connect', () => {
  console.log('Connected to WebSocket server');
});

socket.on('chat message', ({ sessionId, userMessage, assistantMessage }) => {
  const chatSessionsList = document.getElementById('chat-sessions');
  const chatWindow = document.getElementById('chat-window');
  if (chatSessionsList.dataset.activeSessionId === sessionId) {
    if (userMessage) {
      renderMessage(userMessage, 'user');
    }
    if (assistantMessage) {
      renderMessage(assistantMessage, 'assistant');
    }
  }
});

export const sendMessage = () => {
  const chatSessionsList = document.getElementById('chat-sessions');
  const userInput = document.getElementById('user-input');
  const activeSessionId = chatSessionsList.dataset.activeSessionId;
  const message = userInput.value.trim();
  if (!activeSessionId || !message) return;

  userInput.value = '';

  socket.emit('chat message', { sessionId: activeSessionId, message });
};
