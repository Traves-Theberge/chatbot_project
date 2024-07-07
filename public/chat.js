import { sendMessage } from './socketHandler.js';
import { addChatSessionToList, loadChat, createChatSession, deleteChatSession } from './sessionHandler.js';

document.addEventListener('DOMContentLoaded', () => {
  const chatSessionsList = document.getElementById('chat-sessions');
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');
  const newChatButton = document.getElementById('new-chat-button');
  const modal = document.getElementById('modal');
  const newChatNameInput = document.getElementById('new-chat-name');
  const createButton = document.getElementById('create-button');
  const cancelButton = document.getElementById('cancel-button');
  const logoutButton = document.getElementById('logout-button');

  sendButton.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  newChatButton.addEventListener('click', () => {
    console.log('New chat button clicked');
    modal.classList.remove('hidden');
  });

  cancelButton.addEventListener('click', () => {
    console.log('Cancel button clicked');
    modal.classList.add('hidden');
  });

  createButton.addEventListener('click', async () => {
    const sessionName = newChatNameInput.value.trim();
    if (sessionName) {
      await createChatSession(sessionName);
      modal.classList.add('hidden');
      window.location.reload(); // Reload to show the new session
    }
  });

  logoutButton.addEventListener('click', async () => {
    console.log('Logout button clicked');
    try {
      await fetch('/auth/logout', { method: 'POST' });
      window.location.href = 'index.html';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  });

  const loadChatSessions = async () => {
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
