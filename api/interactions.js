const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Read interactions from file (read-only on Vercel)
  let interactions = { images: {}, totalLikes: 0, totalComments: 0 };
  try {
    const filePath = path.join(process.cwd(), 'server', 'data', 'interactions.json');
    if (fs.existsSync(filePath)) {
      interactions = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (e) {
    console.log('Using default interactions');
  }

  // Handle GET - return stats
  if (req.method === 'GET') {
    return res.status(200).json({
      totalLikes: interactions.totalLikes,
      totalComments: interactions.totalComments,
      totalImages: Object.keys(interactions.images).length,
      message: 'Interactions API (read-only on Vercel)'
    });
  }

  // Handle POST - Like or Comment (stored in localStorage on frontend)
  if (req.method === 'POST') {
    const { action, imageKey, liked, comment } = req.body;

    // On Vercel, we can't write to filesystem
    // Return success and let frontend handle localStorage
    return res.status(200).json({
      success: true,
      message: 'Interaction recorded (client-side storage on Vercel)',
      action: action,
      imageKey: imageKey
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
