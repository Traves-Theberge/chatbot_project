// File: public/chat.js
import { showModal } from './modalHandler.js';
import { addChatSessionToList, loadChat, createChatSession } from './sessionHandler.js';
import { sendMessage, socket } from './socketHandler.js';

document.addEventListener('DOMContentLoaded', () => {
  const newChatButton = document.getElementById('new-chat-button');
  const logoutButton = document.getElementById('logout-button');
  const sendButton = document.getElementById('send-button');
  const userInput = document.getElementById('user-input');
  const modelSelect = document.getElementById('model-select');

  newChatButton.addEventListener('click', () => {
    showModal('New Chat Session', async (sessionName) => {
      await createChatSession(sessionName);
      loadChatSessions();
    });
  });

  logoutButton.addEventListener('click', async () => {
    try {
      await fetch('/auth/logout', { method: 'POST', credentials: 'same-origin' });
      window.location.href = 'index.html';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  });

  sendButton.addEventListener('click', () => sendMessage(modelSelect.value));

  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage(modelSelect.value);
    }
  });

  modelSelect.addEventListener('change', async () => {
    const selectedModel = modelSelect.value;
    try {
      const response = await fetch('/set-model', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ model: selectedModel }),
        credentials: 'same-origin'
      });
      if (!response.ok) {
        throw new Error('Failed to set model');
      }
      console.log('Model set to:', selectedModel);
    } catch (error) {
      console.error('Error setting model:', error);
    }
  });

  const loadChatSessions = async () => {
    const chatSessionsList = document.getElementById('chat-sessions');
    console.log('Loading chat sessions');
    try {
      const response = await fetch('/chat/sessions', { credentials: 'same-origin' });
      const sessions = await response.json();
      chatSessionsList.innerHTML = '';
      if (sessions.length > 0) {
        sessions.forEach(session => {
          addChatSessionToList(session);
        });
        const mostRecentSession = sessions[sessions.length - 1];
        chatSessionsList.dataset.activeSessionId = mostRecentSession.id;
        loadChat(mostRecentSession.id);
      } else {
        const newSession = await createChatSession('New Chat');
        chatSessionsList.dataset.activeSessionId = newSession.id;
        loadChat(newSession.id);
      }
    } catch (error) {
      console.error('Error loading chat sessions:', error);
    }
  };

  loadChatSessions();
});