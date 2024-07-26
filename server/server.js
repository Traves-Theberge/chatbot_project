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
const helmet = require('helmet');
const { supabaseClient } = require('./middleware/auth');

// Function to load models
const loadModels = async () => {
  try {
    const initializeModels = await import('./config/models.mjs');
    const models = await initializeModels.default();
    console.log('Models loaded:', Object.keys(models));
    return models;
  } catch (err) {
    console.error('Error loading models:', err);
    throw err;
  }
};

let models;

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 3000;

// Use a more robust session store, like Redis or MongoDB
// For this example, we'll use the memory store, but it's not recommended for production
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
});

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sessionMiddleware);

app.use(express.static(path.join(__dirname, '../public')));

const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');

app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);

app.post('/set-model', async (req, res) => {
  try {
    if (!models) {
      console.log('Models not loaded, loading now...');
      models = await loadModels();
    }
    const { model } = req.body;
    console.log('Setting model to:', model);
    if (models[model]) {
      req.session.selectedModel = model;
      req.session.save((err) => {
        if (err) {
          console.error('Error saving session:', err);
          return res.status(500).json({ success: false, message: 'Failed to save session' });
        }
        console.log('Model set in session:', req.session.selectedModel);
        res.json({ success: true, model });
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid model selected' });
    }
  } catch (error) {
    console.error('Error in /set-model:', error);
    res.status(500).json({ success: false, message: 'Failed to load models' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Wrap the socket middleware to ensure it has access to the latest session data
const wrappedSessionMiddleware = (socket, next) => {
  sessionMiddleware(socket.request, {}, next);
};

io.use(wrappedSessionMiddleware);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('change model', async ({ model }) => {
    try {
      if (!models) {
        console.log('Models not loaded, loading now...');
        models = await loadModels();
      }
      if (models[model]) {
        socket.request.session.selectedModel = model;
        socket.request.session.save((err) => {
          if (err) {
            console.error('Error saving session:', err);
            socket.emit('error', { error: 'Failed to save session' });
          } else {
            console.log('Model set in session:', model);
            socket.emit('model changed', { success: true, model });
          }
        });
      } else {
        socket.emit('error', { error: 'Invalid model selected' });
      }
    } catch (error) {
      console.error('Error in change model:', error);
      socket.emit('error', { error: 'Failed to change model' });
    }
  });

  socket.on('chat message', async ({ sessionId, message }) => {
    try {
      if (!models) {
        console.log('Models not loaded, loading now...');
        models = await loadModels();
      }

      // Retrieve the selected model from the session
      const selectedModel = socket.request.session.selectedModel || 'openai';
      console.log('Retrieved selected model from session:', selectedModel);
      const model = models[selectedModel];

      if (!model || !model.generateMessage) {
        throw new Error(`Model ${selectedModel} not properly loaded`);
      }

      const { handleChatMessage } = require('./shared/messageHandler');
      const result = await handleChatMessage(sessionId, message, model, supabaseClient);

      io.emit('chat message', { sessionId, ...result, model: selectedModel });
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

const startServer = async () => {
  try {
    models = await loadModels();
    server.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();