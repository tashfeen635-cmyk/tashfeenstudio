module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // For Vercel deployment, admin panel runs in read-only mode
  // Return logged in status to show dashboard
  return res.status(200).json({
    isLoggedIn: true,
    username: 'admin',
    message: 'Running in read-only mode on Vercel'
  });
};
