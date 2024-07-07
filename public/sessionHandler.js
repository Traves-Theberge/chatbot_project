import { renderMessage } from './messageHandler.js';

export const addChatSessionToList = (session) => {
  const chatSessionsList = document.getElementById('chat-sessions');
  const li = document.createElement('li');
  li.textContent = session.session_name;
  li.dataset.sessionId = session.id;
  li.classList.add('p-2', 'hover:bg-gray-700', 'cursor-pointer', 'flex', 'justify-between');
  li.addEventListener('click', () => {
    chatSessionsList.dataset.activeSessionId = session.id;
    loadChat(session.id);
  });

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'x';
  deleteButton.classList.add('ml-4', 'text-red-500');
  deleteButton.addEventListener('click', async (event) => {
    event.stopPropagation();
    await deleteChatSession(session.id, li);
  });

  li.appendChild(deleteButton);
  chatSessionsList.appendChild(li);
};

export const loadChat = async (sessionId) => {
  const chatWindow = document.getElementById('chat-window');
  console.log('Loading chat for session:', sessionId);
  try {
    const response = await fetch(`/chat/conversations/${sessionId}`);
    const conversations = await response.json();
    chatWindow.innerHTML = '';
    conversations.forEach(conversation => {
      renderMessage(conversation.content, conversation.sender);
    });
  } catch (error) {
    console.error('Error loading chat:', error);
  }
};

export const createChatSession = async (sessionName) => {
  console.log('Creating new chat session with name:', sessionName);
  try {
    const response = await fetch('/chat/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionName })
    });
    const newSession = await response.json();
    addChatSessionToList(newSession);
    return newSession;
  } catch (error) {
    console.error('Error creating chat session:', error);
  }
};

export const deleteChatSession = async (sessionId, listItem) => {
  const chatSessionsList = document.getElementById('chat-sessions');
  const chatWindow = document.getElementById('chat-window');
  console.log('Deleting chat session with id:', sessionId);
  try {
    const response = await fetch(`/chat/sessions/${sessionId}`, { method: 'DELETE' });
    if (response.ok) {
      chatSessionsList.removeChild(listItem);
      if (chatSessionsList.dataset.activeSessionId === sessionId) {
        chatSessionsList.dataset.activeSessionId = null;
        chatWindow.innerHTML = '';
      }
    } else {
      console.error('Failed to delete chat session');
    }
  } catch (error) {
    console.error('Error deleting chat session:', error);
  }
};
