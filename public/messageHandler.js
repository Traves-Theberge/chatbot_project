// File: public/messageHandler.js
export const renderMessage = (message, sender, model = '') => {
  if (!message) return;

  const chatWindow = document.getElementById('chat-window');
  const div = document.createElement('div');

  div.classList.add('message');
  if (sender === 'user') {
    div.classList.add('bg-blue-500', 'text-white', 'self-end');
  } else {
    div.classList.add('bg-gray-700', 'text-white', 'self-start');
  }
  div.classList.add('rounded-lg', 'p-4', 'my-2', 'max-w-lg');

  const modelInfo = model ? ` - ${model}` : '';
  div.innerHTML = `
    <div class="content">${message}</div>
    <div class="timestamp text-xs mt-2 text-white-400">
      ${new Date().toLocaleTimeString()}${modelInfo}
    </div>
  `;

  chatWindow.appendChild(div);
  div.scrollIntoView({ behavior: 'smooth' });
};