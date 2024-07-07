import { showModal } from './modalHandler.js';
import { addChatSessionToList, loadChat, createChatSession } from './sessionHandler.js';
import { sendMessage, socket } from './socketHandler.js';

document.addEventListener('DOMContentLoaded', () => {
  const newChatButton = document.getElementById('new-chat-button');
  const logoutButton = document.getElementById('logout-button');
  const sendButton = document.getElementById('send-button');
  const userInput = document.getElementById('user-input');

  newChatButton.addEventListener('click', () => {
    showModal('New Chat Session', async (sessionName) => {
      await createChatSession(sessionName);
      loadChatSessions(); // Reload chat sessions without page reload
    });
  });

  logoutButton.addEventListener('click', async () => {
    try {
      await fetch('/auth/logout', { method: 'POST' });
      window.location.href = 'index.html';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  });

  sendButton.addEventListener('click', sendMessage);
  
  // Send message on Enter key
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  const loadChatSessions = async () => {
    const chatSessionsList = document.getElementById('chat-sessions');
    console.log('Loading chat sessions');
    try {
      const response = await fetch('/chat/sessions');
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
