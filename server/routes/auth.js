// File: server/routes/auth.js
const express = require('express');
const router = express.Router();
const { supabaseClient } = require('../middleware/auth');

// Function to insert user into the users table
const insertUser = async (user) => {
  const { id, email } = user;
  const { data, error } = await supabaseClient
    .from('users')
    .upsert({ id, email })
    .single();
  if (error) {
    console.error('Error inserting user:', error);
  }
  return data;
};

// Signup route
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const { user, error } = await supabaseClient.auth.signUp({ email, password });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  if (user) {
    await insertUser(user);
    return res.status(200).json({ message: 'Signup successful. Please check your email to verify your account.' });
  }

  res.status(400).json({ error: 'Signup failed. Please try again.' });
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const { data: session, error } = await supabaseClient.auth.signInWithPassword({ email, password });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const user = session.user;
  if (!user || !user.email_confirmed_at) {
    return res.status(400).json({ error: 'Email not confirmed' });
  }

  await insertUser(user);
  req.session.user = { id: user.id, email: user.email, access_token: session.access_token };
  res.status(200).json({ email: user.email });
});

// Logout route
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed. Please try again.' });
    }
    res.status(200).json({ message: 'Logged out' });
  });
});

module.exports = router;
