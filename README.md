# Chatbot Project

## Overview

This project is a real-time chatbot application built with the following technologies:
- **Frontend**: HTML, CSS (Tailwind CSS), JavaScript
- **Backend**: Node.js, Express
- **Database**: Supabase
- **Real-time Communication**: Socket.IO
- **AI**: OpenAI API for chatbot responses

## Project Structure
```
chatbot-project/
│
├── public/
│ ├── build/
│ │ └── styles.css # Compiled CSS styles from Tailwind
│ ├── index.html # The homepage containing login and signup forms
│ ├── chat.html # The chat interface page
│ ├── tailwind.css # Tailwind CSS configuration file
│ ├── main.js # JavaScript file for handling authentication logic
│ ├── chat.js # JavaScript file for handling chat logic
│ ├── socketHandler.js # JavaScript file for handling WebSocket logic
│ ├── sessionHandler.js # JavaScript file for handling session logic
│ ├── messageHandler.js # JavaScript file for handling message rendering logic
│ └── modalHandler.js # JavaScript file for handling modal logic
│
├── server/
│ ├── middleware/
│ │ └── auth.js # Middleware for authenticating users using Supabase
│ ├── routes/
│ │ ├── auth.js # Routes for handling signup, login, and logout
│ │ └── chat.js # Routes for handling chat sessions and messages
│ └── server.js # Main server file setting up the Express server
│
├── .env # Environment variables file containing Supabase and other keys
├── .gitignore # Git ignore file specifying files and directories to ignore in git
├── package.json # NPM package file listing dependencies and scripts
├── package-lock.json # Lock file for NPM packages ensuring consistent installs
├── tailwind.config.js # Configuration file for Tailwind CSS
├── postcss.config.js # Configuration file for PostCSS (used by Tailwind)
└── README.md # Project documentation
```

## Setup and Installation

### Prerequisites

- Node.js and npm installed
- Supabase account and project set up

### Environment Variables

Create a `.env` file in the root directory with the following content:
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
OPENAI_API_KEY=your_openai_api_key
SESSION_SECRET=your_session_secret
```

### Installation

1. Clone the repository:
    ```
    git clone your_repository_url
    cd chatbot-project
    ```

2. Install the dependencies:
    ```
    npm install
    ```

3. Start the server:
    ```
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Sign up or log in to access the chat interface.
3. Create a new chat session using the "New Chat" button.
4. Start chatting! The chatbot will respond using the OpenAI API.

## Features

- **User Authentication**: Sign up, login, and logout functionality using Supabase.
- **Real-Time Chat**: Real-time messaging using Socket.IO.
- **Chat Sessions**: Create and delete chat sessions.
- **AI Responses**: Chatbot responses powered by the OpenAI API.
- **Responsive Design**: Modern and responsive UI designed with Tailwind CSS.

## File Descriptions

### Frontend

- **`index.html`**: The homepage containing login and signup forms.
- **`chat.html`**: The chat interface page.
- **`tailwind.css`**: Tailwind CSS configuration file.
- **`styles.css`**: Compiled CSS styles from Tailwind.
- **`main.js`**: JavaScript file for handling authentication logic.
- **`chat.js`**: JavaScript file for handling chat logic.
- **`socketHandler.js`**: JavaScript file for handling WebSocket logic.
- **`sessionHandler.js`**: JavaScript file for handling session logic.
- **`messageHandler.js`**: JavaScript file for handling message rendering logic.
- **`modalHandler.js`**: JavaScript file for handling modal logic.

### Backend

- **`auth.js`**: Middleware for authenticating users using Supabase.
- **`auth.js`**: Routes for handling signup, login, and logout.
- **`chat.js`**: Routes for handling chat sessions and messages.
- **`server.js`**: Main server file setting up the Express server.

## Contributing

Feel free to fork this repository and make changes. Pull requests are welcome!

## License

This project is licensed under the MIT License.