const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const { Server } = require('socket.io');
const { supabaseClient } = require('./middleware/auth');
const OpenAI = require('openai');

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

// Use HTTPS in production
if (isProduction) {
  const fs = require('fs');
  const https = require('https');
  const privateKey = fs.readFileSync('/etc/letsencrypt/live/chatbot-dcyu.onrender.com/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('/etc/letsencrypt/live/chatbot-dcyu.onrender.com/fullchain.pem', 'utf8');
  const ca = fs.readFileSync('/etc/letsencrypt/live/chatbot-dcyu.onrender.com/chain.pem', 'utf8');

  const credentials = { key: privateKey, cert: certificate, ca: ca };
  var server = https.createServer(credentials, app);
} else {
  var server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT || 3000}`);
  });
}

const io = new Server(server);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(cors({
  origin: isProduction ? 'https://chatbot-dcyu.onrender.com' : 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: isProduction } // Use secure cookies in production
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

if (isProduction) {
  server.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running at https://chatbot-dcyu.onrender.com`);
  });
}
