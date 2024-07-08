const express = require('express');
const { body, validationResult } = require('express-validator');
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
router.post('/signup',
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }).trim().escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

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
router.post('/login',
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }).trim().escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

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
    
    // Only send non-sensitive information back to the client
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
