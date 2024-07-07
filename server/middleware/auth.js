// File: server/middleware/auth.js
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or key');
}

const supabaseClient = createClient(supabaseUrl, supabaseKey);

const authenticateUser = (req, res, next) => {
  const user = req.session.user;
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  req.user = user;
  next();
};

module.exports = { authenticateUser, supabaseClient };
