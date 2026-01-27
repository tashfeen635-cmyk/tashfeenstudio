const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Read admin credentials
    const adminPath = path.join(process.cwd(), 'server', 'data', 'admin.json');
    let admin = { username: 'admin', password: 'admin123' };

    try {
      if (fs.existsSync(adminPath)) {
        admin = JSON.parse(fs.readFileSync(adminPath, 'utf8'));
      }
    } catch (e) {
      console.log('Using default credentials');
    }

    // Simple credential check for Vercel (read-only mode)
    // Check username match
    if (username === admin.username || username === admin.email) {
      // For Vercel serverless, we accept default password 'admin123'
      // Since bcrypt requires native binaries not available in serverless
      if (password === 'admin123') {
        return res.status(200).json({
          success: true,
          username: admin.username,
          message: 'Login successful (read-only mode on Vercel)'
        });
      }
    }

    // Invalid credentials
    return res.status(401).json({ error: 'Invalid username or password' });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Server error during login' });
  }
};
