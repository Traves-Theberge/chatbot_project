README.md
shell
Copy code
# Chatbot Project

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
│ └── chat.js # JavaScript file for handling chat logic
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

## How It Works

### Server
- **Express Setup:** The server is set up using Express, with middleware for handling sessions, cookies, and CORS.
- **Routes:** Separate routes for authentication and chat functionalities.
- **Static Files:** Serves static files from the `public` directory.

### Middleware
- **Supabase Client:** Used for interacting with the Supabase database.
- **Authentication:** Middleware to ensure users are authenticated before accessing chat functionalities.

### Authentication Routes
- **Signup:** Allows users to create a new account.
- **Login:** Allows users to log in with their email and password.
- **Logout:** Logs out the user by destroying the session.

### Chat Routes
- **Fetch Sessions:** Retrieves all chat sessions for the authenticated user.
- **Fetch Conversations:** Retrieves the conversation history for a specific chat session.
- **New Session:** Allows users to create a new chat session.
- **Delete Session:** Allows users to delete a chat session and its conversations.
- **New Message:** Handles sending new messages and getting responses from OpenAI.

### Frontend
- **HTML Pages:** `index.html` for login/signup, `chat.html` for the chat interface.
- **JavaScript:** `main.js` for handling authentication logic, `chat.js` for managing chat interactions.

### Environment Variables
- **.env File:** Contains sensitive information like Supabase keys and session secrets.

## Getting Started

1. **Install Dependencies:**

```
npm install
```
## Environment Variables:

- Create a .env file with the following variables:

```
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SESSION_SECRET=your-session-secret
OPENAI_API_KEY=your-openai-api-key
```
## Run the Server:


```
npm start
```

## Access the Application:
- Open your browser and navigate to http://localhost:3000.