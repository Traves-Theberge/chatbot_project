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
        sessions.forEach(session => {
          const li = document.createElement('li');
          li.textContent = session.session_name;
          li.dataset.sessionId = session.id;
          li.classList.add('p-2', 'hover:bg-gray-700', 'cursor-pointer');
          li.addEventListener('click', () => {
            chatSessionsList.dataset.activeSessionId = session.id;
            loadChat(session.id);
          });
          chatSessionsList.appendChild(li);
        });
      } else {
        console.error('Unexpected response format:', sessions);
      }
    } catch (error) {
      console.error('Error loading chat sessions:', error);
    }
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
      botMessage.textContent = `bot: ${data.choices[0].message.content.trim()}`;
      chatWindow.appendChild(botMessage);
    } catch (error) {
      console.error('Error sending message:', error);
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

  createButton.addEventListener('click', async () => {
    const sessionName = newChatNameInput.value;
    console.log('Creating new chat session with name:', sessionName);
    try {
      const response = await fetch('/chat/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sessionName })
      });
      const session = await response.json();
      chatSessionsList.dataset.activeSessionId = session.id;
      const li = document.createElement('li');
      li.textContent = session.session_name;
      li.dataset.sessionId = session.id;
      li.classList.add('p-2', 'hover:bg-gray-700', 'cursor-pointer');
      li.addEventListener('click', () => {
        chatSessionsList.dataset.activeSessionId = session.id;
        loadChat(session.id);
      });
      chatSessionsList.appendChild(li);
      modal.classList.add('hidden');
      chatWindow.innerHTML = '';
      const initialMessage = document.createElement('div');
      initialMessage.textContent = 'bot: How can I help you today?';
      chatWindow.appendChild(initialMessage);
    } catch (error) {
      console.error('Error creating chat session:', error);
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

  loadChatSessions();
});
