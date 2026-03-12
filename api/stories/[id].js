const fs = require('fs');
const path = require('path');

function readData(filename) {
  try {
    const filePath = path.join(process.cwd(), 'server', 'data', filename);
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading file:', error);
    return [];
  }
}

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  try {
    const stories = readData('stories.json');
    const story = stories.find(s => s.id === id);

    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    return res.status(200).json(story);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};
