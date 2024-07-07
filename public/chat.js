document.addEventListener('DOMContentLoaded', function() {
  console.log('Chat DOM fully loaded and parsed');

  const chatSessionsList = document.getElementById('chat-sessions');
  const chatWindow = document.getElementById('chat-window');
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');
  const newChatButton = document.getElementById('new-chat-button');
  const modal = document.getElementById('modal');
  const newChatNameInput = document.getElementById('new-chat-name');
  const createButton = document.getElementById('create-button');
  const cancelButton = document.getElementById('cancel-button');
  const logoutButton = document.getElementById('logout-button');

  const loadChatSessions = async () => {
    console.log('Loading chat sessions');
    try {
      const response = await fetch('/chat/sessions');
      const sessions = await response.json();
      if (Array.isArray(sessions)) {
        chatSessionsList.innerHTML = '';
        if (sessions.length > 0) {
          sessions.forEach(session => {
            addChatSessionToList(session);
          });
          // Automatically select and load the most recent chat session
          const mostRecentSession = sessions[sessions.length - 1];
          chatSessionsList.dataset.activeSessionId = mostRecentSession.id;
          loadChat(mostRecentSession.id);
        } else {
          // Automatically create a new session if no sessions are present
          await createChatSession('New Chat');
        }
      } else {
        console.error('Unexpected response format:', sessions);
      }
    } catch (error) {
      console.error('Error loading chat sessions:', error);
    }
  };

  const addChatSessionToList = (session) => {
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
    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation();
      deleteChatSession(session.id, li);
    });

    li.appendChild(deleteButton);
    chatSessionsList.appendChild(li);
  };

  const loadChat = async (sessionId) => {
    console.log('Loading chat for session:', sessionId);
    try {
      const response = await fetch(`/chat/conversations/${sessionId}`);
      const conversations = await response.json();
      chatWindow.innerHTML = '';
      conversations.forEach(conversation => {
        const div = document.createElement('div');
        div.textContent = `${conversation.sender}: ${conversation.content}`;
        chatWindow.appendChild(div);
      });
    } catch (error) {
      console.error('Error loading chat:', error);
    }
  };

  const sendMessage = async () => {
    const activeSessionId = chatSessionsList.dataset.activeSessionId;
    const message = userInput.value;
    if (!activeSessionId || !message) {
      console.log('No active session or empty message');
      return;
    }

    console.log('Sending message:', message);
    try {
      const response = await fetch('/chat/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sessionId: activeSessionId, message })
      });
      const data = await response.json();
      userInput.value = '';
      const userMessage = document.createElement('div');
      userMessage.textContent = `user: ${message}`;
      chatWindow.appendChild(userMessage);
      const botMessage = document.createElement('div');
      botMessage.textContent = `assistant: ${data.choices[0].message.content.trim()}`;
      chatWindow.appendChild(botMessage);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const createChatSession = async (sessionName) => {
    console.log('Creating new chat session with name:', sessionName);
    try {
      const response = await fetch('/chat/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sessionName })
      });
      if (response.ok) {
        modal.classList.add('hidden');
        window.location.reload(); // Refresh the page
      } else {
        console.error('Error creating chat session:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating chat session:', error);
    }
  };

  const deleteChatSession = async (sessionId, listItem) => {
    console.log('Deleting chat session with id:', sessionId);
    try {
      const response = await fetch(`/chat/sessions/${sessionId}`, {
        method: 'DELETE'
      });
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

  createButton.addEventListener('click', () => {
    const sessionName = newChatNameInput.value;
    createChatSession(sessionName);
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

  loadChatSessions();
});
