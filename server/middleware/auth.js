const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

const authenticateUser = async (req, res, next) => {
  const { user } = req.session;
  if (user) {
    const { data, error } = await supabaseClient.auth.getUser(user.access_token);
    if (error || !data) {
      console.error('Auth Middleware Error:', error);
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user = { ...data.user, access_token: user.access_token };  // Ensure user object is correctly set
    next();
  } else {
    console.error('No user in session');
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = { supabaseClient, authenticateUser };
