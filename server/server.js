// File: server/server.js
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const helmet = require('helmet'); // Add Helmet for security
const { supabaseClient } = require('./middleware/auth');
const OpenAI = require('openai');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(helmet()); // Use Helmet for setting various HTTP headers for security
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

app.use(express.static(path.join(__dirname, '../public')));

const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');

app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('chat message', async ({ sessionId, message }) => {
    try {
      const { data: userMessage, error: userMessageError } = await supabaseClient
        .from('conversations')
        .insert([{ session_id: sessionId, sender: 'user', content: message }])
        .single();

      if (userMessageError) {
        return socket.emit('error', { error: userMessageError.message });
      }

      io.emit('chat message', { sessionId, userMessage: message });

      const { data: conversations, error: historyError } = await supabaseClient
        .from('conversations')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (historyError) {
        return socket.emit('error', { error: historyError.message });
      }

      const messages = [{ role: 'system', content: 'You are a helpful assistant.' }];
      conversations.forEach(conversation => {
        messages.push({ role: conversation.sender === 'user' ? 'user' : 'assistant', content: conversation.content });
      });
      messages.push({ role: 'user', content: message });

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages
      });

      const assistantMessage = completion.choices[0].message.content.trim();

      await supabaseClient
        .from('conversations')
        .insert([{ session_id: sessionId, sender: 'assistant', content: assistantMessage }])
        .single();

      io.emit('chat message', { sessionId, assistantMessage });
    } catch (error) {
      console.error('Error handling chat message:', error);
      socket.emit('error', { error: 'Internal server error' });
    }
  });

  socket.on('create chat session', async (sessionName) => {
    const newSession = { id: 'new-session-id', session_name: sessionName };
    socket.emit('chat session created', newSession);
  });
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});