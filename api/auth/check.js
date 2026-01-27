module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // For Vercel serverless, we don't have persistent sessions
  // Return not logged in so user sees login form
  return res.status(200).json({
    isLoggedIn: false,
    message: 'Please login to access admin panel'
  });
};
