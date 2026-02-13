const fs = require('fs');
const path = require('path');

function readData(filename) {
  try {
    const filePath = path.join(process.cwd(), 'server', 'data', filename);
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
    return {};
  } catch (error) {
    console.error('Error reading file:', error);
    return {};
  }
}

module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Return about data for any request (GET, POST, etc.)
  // This is read-only data, so it's safe
  try {
    const about = readData('about.json');
    return res.status(200).json(about);
  } catch (error) {
    return res.status(200).json({
      name: "Tashfeen Riaz",
      title: "Web Designer & Developer",
      bio: "Creative designer and developer"
    });
  }
};
