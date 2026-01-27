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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const about = readData('about.json');
    return res.status(200).json(about);
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
