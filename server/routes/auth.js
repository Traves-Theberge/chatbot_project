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

// Signup
router.post('/signup', async (req, res) => {
  console.log('Signup request received:', req.body);
  const { email, password } = req.body;
  const { user, error } = await supabaseClient.auth.signUp({ email, password });

  if (error) {
    console.error('Signup error:', error);
    return res.status(400).json({ error: error.message });
  }

  if (user) {
    await insertUser(user);
    console.log('Signup successful:', user);
    return res.status(200).json({ message: 'Signup successful. Please check your email to verify your account.' });
  }

  res.status(400).json({ error: 'Signup failed. Please try again.' });
});

// Login
router.post('/login', async (req, res) => {
  console.log('Login request received:', req.body);
  const { email, password } = req.body;
  const { data: session, error } = await supabaseClient.auth.signInWithPassword({ email, password });

  if (error) {
    console.error('Login error:', error);
    return res.status(400).json({ error: error.message });
  }

  const user = session.user;

  if (!user || !user.email_confirmed_at) {
    console.error('Email not confirmed:', email);
    return res.status(400).json({ error: 'Email not confirmed' });
  }

  await insertUser(user);
  console.log('Login successful:', user);
  req.session.user = { id: user.id, email: user.email, access_token: session.access_token };
  res.status(200).json({ email: user.email });
});

// Logout
router.post('/logout', (req, res) => {
  console.log('Logout request received');
  req.session.destroy();
  res.status(200).json({ message: 'Logged out' });
});

module.exports = router;
