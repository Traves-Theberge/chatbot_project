// File: public/modalHandler.js
export const showModal = (title, onConfirm) => {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const newChatNameInput = document.getElementById('new-chat-name');
  const createButton = document.getElementById('create-button');
  const cancelButton = document.getElementById('cancel-button');

  modalTitle.textContent = title;
  modal.classList.remove('hidden');
  newChatNameInput.value = '';
  newChatNameInput.focus();

  const closeModal = () => {
    modal.classList.add('hidden');
    createButton.removeEventListener('click', handleCreate);
    cancelButton.removeEventListener('click', closeModal);
  };

  const handleCreate = async () => {
    const sessionName = newChatNameInput.value.trim();
    if (sessionName) {
      await onConfirm(sessionName);
      closeModal();
    }
  };

  createButton.addEventListener('click', handleCreate);
  cancelButton.addEventListener('click', closeModal);

  newChatNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleCreate();
  });
};
