export const renderMessage = (message, sender) => {
    if (!message) return; // Avoid rendering undefined messages
  
    const chatWindow = document.getElementById('chat-window');
    const div = document.createElement('div');
    
    // Add classes correctly
    div.classList.add('message');
    if (sender === 'user') {
      div.classList.add('bg-blue-500', 'text-white', 'self-end');
    } else {
      div.classList.add('bg-gray-700', 'text-white', 'self-start');
    }
    div.classList.add('rounded-lg', 'p-4', 'my-2', 'max-w-lg');
  
    div.innerHTML = `
      <div class="content">${message}</div>
      <div class="timestamp text-xs mt-2 text-gray-400">${new Date().toLocaleTimeString()}</div>
    `;
    
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to the latest message
  };
  