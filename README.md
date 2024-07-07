README.md
shell
Copy code
# Chatbot Project

## Project Structure
```
chatbot-project/
│
├── public/
│   ├── build/
│   │   └── styles.css
│   ├── index.html
│   ├── chat.html
│   ├── tailwind.css
│   ├── main.js
│   ├── messageHandler.js
│   ├── sessionHandler.js
│   ├── socketHandler.js
│   └── chat.js
│
├── server/
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── chat.js
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
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