/**
 * ========================================
 * TASHU'S STUDIO - ADMIN PANEL SERVER
 * ========================================
 * A simple, beginner-friendly Express.js server
 * for managing portfolio content
 */

const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create Express app
const app = express();
const PORT = 3000;

// ========================================
// MIDDLEWARE SETUP
// ========================================

// Enable CORS for frontend requests
app.use(cors({
  origin: true,
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies (for forms)
app.use(express.urlencoded({ extended: true }));

// Session configuration for authentication
app.use(session({
  secret: 'tashu-studio-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Serve static files
app.use(express.static(path.join(__dirname, '..')));
app.use('/admin', express.static(path.join(__dirname, '..', 'admin')));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// ========================================
// FILE UPLOAD CONFIGURATION
// ========================================

// Create uploads folder if it doesn't exist
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Create unique filename with timestamp
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    // Allow only images
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// ========================================
// DATA FILE PATHS
// ========================================

const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILES = {
  admin: path.join(DATA_DIR, 'admin.json'),
  portfolio: path.join(DATA_DIR, 'portfolio.json'),
  about: path.join(DATA_DIR, 'about.json'),
  services: path.join(DATA_DIR, 'services.json'),
  skills: path.join(DATA_DIR, 'skills.json'),
  stories: path.join(DATA_DIR, 'stories.json'),
  messages: path.join(DATA_DIR, 'messages.json'),
  settings: path.join(DATA_DIR, 'settings.json')
};

// ========================================
// HELPER FUNCTIONS
// ========================================

// Read data from JSON file
function readData(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading file:', filePath, error);
    return [];
  }
}

// Write data to JSON file
function writeData(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing file:', filePath, error);
    return false;
  }
}

// Generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Check if user is authenticated (middleware)
function isAuthenticated(req, res, next) {
  if (req.session && req.session.isLoggedIn) {
    next();
  } else {
    res.status(401).json({ error: 'Please login to access this resource' });
  }
}

// ========================================
// INITIALIZE DEFAULT DATA
// ========================================

function initializeData() {
  // Create data directory if it doesn't exist
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // Initialize admin account if not exists
  if (!fs.existsSync(DATA_FILES.admin)) {
    const defaultAdmin = {
      username: 'admin',
      // Default password: admin123 (change this!)
      password: bcrypt.hashSync('admin123', 10),
      email: 'tashfeen635@gmail.com'
    };
    writeData(DATA_FILES.admin, defaultAdmin);
    console.log('Default admin account created (username: admin, password: admin123)');
  }

  // Initialize empty data files
  Object.keys(DATA_FILES).forEach(key => {
    if (key !== 'admin' && !fs.existsSync(DATA_FILES[key])) {
      writeData(DATA_FILES[key], key === 'about' ? {} : []);
    }
  });
}

// Initialize data on startup
initializeData();

// ========================================
// AUTHENTICATION ROUTES
// ========================================

// Login route
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Get admin data
  const admin = readData(DATA_FILES.admin);

  // Check credentials
  if (username === admin.username && bcrypt.compareSync(password, admin.password)) {
    req.session.isLoggedIn = true;
    req.session.username = username;
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

// Logout route
app.post('/api/auth/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true, message: 'Logged out successfully' });
});

// Check authentication status
app.get('/api/auth/check', (req, res) => {
  if (req.session && req.session.isLoggedIn) {
    res.json({ isLoggedIn: true, username: req.session.username });
  } else {
    res.json({ isLoggedIn: false });
  }
});

// Change password route
app.post('/api/auth/change-password', isAuthenticated, (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current and new password are required' });
  }

  const admin = readData(DATA_FILES.admin);

  if (!bcrypt.compareSync(currentPassword, admin.password)) {
    return res.status(401).json({ error: 'Current password is incorrect' });
  }

  admin.password = bcrypt.hashSync(newPassword, 10);
  writeData(DATA_FILES.admin, admin);

  res.json({ success: true, message: 'Password changed successfully' });
});

// Change username route
app.post('/api/auth/change-username', isAuthenticated, (req, res) => {
  const { newUsername, password } = req.body;

  if (!newUsername || !password) {
    return res.status(400).json({ error: 'New username and password are required' });
  }

  if (newUsername.length < 3) {
    return res.status(400).json({ error: 'Username must be at least 3 characters' });
  }

  const admin = readData(DATA_FILES.admin);

  // Verify password before allowing username change
  if (!bcrypt.compareSync(password, admin.password)) {
    return res.status(401).json({ error: 'Password is incorrect' });
  }

  admin.username = newUsername;
  writeData(DATA_FILES.admin, admin);

  // Update session username
  req.session.username = newUsername;

  res.json({ success: true, message: 'Username changed successfully' });
});

// ========================================
// PORTFOLIO ROUTES (CRUD)
// ========================================

// Get all portfolio items
app.get('/api/portfolio', (req, res) => {
  const portfolio = readData(DATA_FILES.portfolio);
  res.json(portfolio);
});

// Get single portfolio item
app.get('/api/portfolio/:id', (req, res) => {
  const portfolio = readData(DATA_FILES.portfolio);
  const item = portfolio.find(p => p.id === req.params.id);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Portfolio item not found' });
  }
});

// Create portfolio item
app.post('/api/portfolio', isAuthenticated, upload.single('image'), (req, res) => {
  const portfolio = readData(DATA_FILES.portfolio);

  const newItem = {
    id: generateId(),
    title: req.body.title,
    description: req.body.description,
    category: req.body.category || 'web',
    link: req.body.link || '',
    image: req.file ? '/uploads/' + req.file.filename : '',
    createdAt: new Date().toISOString()
  };

  portfolio.push(newItem);
  writeData(DATA_FILES.portfolio, portfolio);

  res.json({ success: true, data: newItem });
});

// Update portfolio item
app.put('/api/portfolio/:id', isAuthenticated, upload.single('image'), (req, res) => {
  const portfolio = readData(DATA_FILES.portfolio);
  const index = portfolio.findIndex(p => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Portfolio item not found' });
  }

  portfolio[index] = {
    ...portfolio[index],
    title: req.body.title || portfolio[index].title,
    description: req.body.description || portfolio[index].description,
    category: req.body.category || portfolio[index].category,
    link: req.body.link || portfolio[index].link,
    image: req.file ? '/uploads/' + req.file.filename : portfolio[index].image,
    updatedAt: new Date().toISOString()
  };

  writeData(DATA_FILES.portfolio, portfolio);
  res.json({ success: true, data: portfolio[index] });
});

// Delete portfolio item
app.delete('/api/portfolio/:id', isAuthenticated, (req, res) => {
  let portfolio = readData(DATA_FILES.portfolio);
  const index = portfolio.findIndex(p => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Portfolio item not found' });
  }

  portfolio.splice(index, 1);
  writeData(DATA_FILES.portfolio, portfolio);

  res.json({ success: true, message: 'Portfolio item deleted' });
});

// ========================================
// ABOUT ROUTES
// ========================================

// Get about data
app.get('/api/about', (req, res) => {
  const about = readData(DATA_FILES.about);
  res.json(about);
});

// Update about data
app.put('/api/about', isAuthenticated, upload.single('image'), (req, res) => {
  let about = readData(DATA_FILES.about);

  about = {
    ...about,
    name: req.body.name || about.name,
    title: req.body.title || about.title,
    bio: req.body.bio || about.bio,
    location: req.body.location || about.location,
    image: req.file ? '/uploads/' + req.file.filename : about.image,
    updatedAt: new Date().toISOString()
  };

  writeData(DATA_FILES.about, about);
  res.json({ success: true, data: about });
});

// ========================================
// SERVICES ROUTES (CRUD)
// ========================================

// Get all services
app.get('/api/services', (req, res) => {
  const services = readData(DATA_FILES.services);
  res.json(services);
});

// Create service
app.post('/api/services', isAuthenticated, (req, res) => {
  const services = readData(DATA_FILES.services);

  const newService = {
    id: generateId(),
    name: req.body.name,
    description: req.body.description,
    icon: req.body.icon || 'icon-star',
    createdAt: new Date().toISOString()
  };

  services.push(newService);
  writeData(DATA_FILES.services, services);

  res.json({ success: true, data: newService });
});

// Update service
app.put('/api/services/:id', isAuthenticated, (req, res) => {
  const services = readData(DATA_FILES.services);
  const index = services.findIndex(s => s.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Service not found' });
  }

  services[index] = {
    ...services[index],
    name: req.body.name || services[index].name,
    description: req.body.description || services[index].description,
    icon: req.body.icon || services[index].icon,
    updatedAt: new Date().toISOString()
  };

  writeData(DATA_FILES.services, services);
  res.json({ success: true, data: services[index] });
});

// Delete service
app.delete('/api/services/:id', isAuthenticated, (req, res) => {
  let services = readData(DATA_FILES.services);
  const index = services.findIndex(s => s.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Service not found' });
  }

  services.splice(index, 1);
  writeData(DATA_FILES.services, services);

  res.json({ success: true, message: 'Service deleted' });
});

// ========================================
// SKILLS ROUTES (CRUD)
// ========================================

// Get all skills
app.get('/api/skills', (req, res) => {
  const skills = readData(DATA_FILES.skills);
  res.json(skills);
});

// Create skill
app.post('/api/skills', isAuthenticated, (req, res) => {
  const skills = readData(DATA_FILES.skills);

  const newSkill = {
    id: generateId(),
    name: req.body.name,
    level: parseInt(req.body.level) || 50,
    createdAt: new Date().toISOString()
  };

  skills.push(newSkill);
  writeData(DATA_FILES.skills, skills);

  res.json({ success: true, data: newSkill });
});

// Update skill
app.put('/api/skills/:id', isAuthenticated, (req, res) => {
  const skills = readData(DATA_FILES.skills);
  const index = skills.findIndex(s => s.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Skill not found' });
  }

  skills[index] = {
    ...skills[index],
    name: req.body.name || skills[index].name,
    level: req.body.level ? parseInt(req.body.level) : skills[index].level,
    updatedAt: new Date().toISOString()
  };

  writeData(DATA_FILES.skills, skills);
  res.json({ success: true, data: skills[index] });
});

// Delete skill
app.delete('/api/skills/:id', isAuthenticated, (req, res) => {
  let skills = readData(DATA_FILES.skills);
  const index = skills.findIndex(s => s.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Skill not found' });
  }

  skills.splice(index, 1);
  writeData(DATA_FILES.skills, skills);

  res.json({ success: true, message: 'Skill deleted' });
});

// ========================================
// STORIES ROUTES (CRUD)
// ========================================

// Get all stories
app.get('/api/stories', (req, res) => {
  const stories = readData(DATA_FILES.stories);
  res.json(stories);
});

// Create story
app.post('/api/stories', isAuthenticated, upload.single('image'), (req, res) => {
  const stories = readData(DATA_FILES.stories);

  const newStory = {
    id: generateId(),
    title: req.body.title,
    content: req.body.content,
    image: req.file ? '/uploads/' + req.file.filename : '',
    createdAt: new Date().toISOString()
  };

  stories.push(newStory);
  writeData(DATA_FILES.stories, stories);

  res.json({ success: true, data: newStory });
});

// Update story
app.put('/api/stories/:id', isAuthenticated, upload.single('image'), (req, res) => {
  const stories = readData(DATA_FILES.stories);
  const index = stories.findIndex(s => s.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Story not found' });
  }

  stories[index] = {
    ...stories[index],
    title: req.body.title || stories[index].title,
    content: req.body.content || stories[index].content,
    image: req.file ? '/uploads/' + req.file.filename : stories[index].image,
    updatedAt: new Date().toISOString()
  };

  writeData(DATA_FILES.stories, stories);
  res.json({ success: true, data: stories[index] });
});

// Delete story
app.delete('/api/stories/:id', isAuthenticated, (req, res) => {
  let stories = readData(DATA_FILES.stories);
  const index = stories.findIndex(s => s.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Story not found' });
  }

  stories.splice(index, 1);
  writeData(DATA_FILES.stories, stories);

  res.json({ success: true, message: 'Story deleted' });
});

// ========================================
// CONTACT MESSAGES ROUTES
// ========================================

// Get all messages (admin only)
app.get('/api/messages', isAuthenticated, (req, res) => {
  const messages = readData(DATA_FILES.messages);
  res.json(messages);
});

// Submit contact message (public)
app.post('/api/messages', (req, res) => {
  const messages = readData(DATA_FILES.messages);

  const newMessage = {
    id: generateId(),
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
    read: false,
    createdAt: new Date().toISOString()
  };

  messages.push(newMessage);
  writeData(DATA_FILES.messages, messages);

  res.json({ success: true, message: 'Message sent successfully!' });
});

// Mark message as read
app.put('/api/messages/:id/read', isAuthenticated, (req, res) => {
  const messages = readData(DATA_FILES.messages);
  const index = messages.findIndex(m => m.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Message not found' });
  }

  messages[index].read = true;
  writeData(DATA_FILES.messages, messages);

  res.json({ success: true });
});

// Delete message
app.delete('/api/messages/:id', isAuthenticated, (req, res) => {
  let messages = readData(DATA_FILES.messages);
  const index = messages.findIndex(m => m.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Message not found' });
  }

  messages.splice(index, 1);
  writeData(DATA_FILES.messages, messages);

  res.json({ success: true, message: 'Message deleted' });
});

// ========================================
// SITE SETTINGS ROUTES
// ========================================

// Get site settings
app.get('/api/settings', (req, res) => {
  const settings = readData(DATA_FILES.settings);
  res.json(settings);
});

// Update site settings
app.put('/api/settings', isAuthenticated, (req, res) => {
  let settings = readData(DATA_FILES.settings);

  settings = {
    ...settings,
    storiesHeading: req.body.storiesHeading || settings.storiesHeading,
    portfolioHeading: req.body.portfolioHeading || settings.portfolioHeading,
    servicesHeading: req.body.servicesHeading || settings.servicesHeading,
    skillsHeading: req.body.skillsHeading || settings.skillsHeading,
    contactHeading: req.body.contactHeading || settings.contactHeading,
    updatedAt: new Date().toISOString()
  };

  writeData(DATA_FILES.settings, settings);
  res.json({ success: true, data: settings });
});

// ========================================
// RESTORE DEFAULT DATA
// ========================================

// Import default data
const defaultData = require('./default-data');

// Restore all data to defaults
app.post('/api/restore-defaults', isAuthenticated, (req, res) => {
  try {
    // Restore About data
    writeData(DATA_FILES.about, defaultData.about);

    // Restore Services data
    writeData(DATA_FILES.services, defaultData.services);

    // Restore Skills data
    writeData(DATA_FILES.skills, defaultData.skills);

    // Restore Portfolio data
    writeData(DATA_FILES.portfolio, defaultData.portfolio);

    // Restore Stories data
    writeData(DATA_FILES.stories, defaultData.stories);

    // Restore Site Settings
    writeData(DATA_FILES.settings, defaultData.settings);

    // Note: Messages are NOT restored (kept empty) to preserve contact history
    // If you want to clear messages too, uncomment the line below:
    // writeData(DATA_FILES.messages, defaultData.messages);

    console.log('Default data restored successfully');
    res.json({
      success: true,
      message: 'All data has been restored to defaults successfully!'
    });
  } catch (error) {
    console.error('Error restoring default data:', error);
    res.status(500).json({
      error: 'Failed to restore default data. Please try again.'
    });
  }
});

// ========================================
// IMAGE INTERACTIONS API (Likes, Comments, Shares)
// ========================================

const INTERACTIONS_FILE = path.join(__dirname, 'data', 'interactions.json');

// Read interactions data
function readInteractions() {
  try {
    if (fs.existsSync(INTERACTIONS_FILE)) {
      return JSON.parse(fs.readFileSync(INTERACTIONS_FILE, 'utf8'));
    }
  } catch (e) {
    console.error('Error reading interactions:', e);
  }
  return { images: {}, totalLikes: 0, totalComments: 0 };
}

// Write interactions data
function writeInteractions(data) {
  try {
    fs.writeFileSync(INTERACTIONS_FILE, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error('Error writing interactions:', e);
  }
}

// Get interactions for an image
app.get('/api/interactions/:imageKey', (req, res) => {
  const data = readInteractions();
  const imageKey = req.params.imageKey;
  const imageData = data.images[imageKey] || {
    likes: 0,
    comments: []
  };
  res.json(imageData);
});

// Like/Unlike an image
app.post('/api/interactions/like', (req, res) => {
  const { imageKey, liked } = req.body;

  if (!imageKey) {
    return res.status(400).json({ error: 'Image key is required' });
  }

  const data = readInteractions();

  if (!data.images[imageKey]) {
    data.images[imageKey] = { likes: 0, comments: [] };
  }

  if (liked) {
    data.images[imageKey].likes++;
    data.totalLikes++;
  } else {
    data.images[imageKey].likes = Math.max(0, data.images[imageKey].likes - 1);
    data.totalLikes = Math.max(0, data.totalLikes - 1);
  }

  writeInteractions(data);

  res.json({
    success: true,
    likes: data.images[imageKey].likes,
    totalLikes: data.totalLikes
  });
});

// Add comment to an image
app.post('/api/interactions/comment', (req, res) => {
  const { imageKey, comment } = req.body;

  if (!imageKey || !comment) {
    return res.status(400).json({ error: 'Image key and comment are required' });
  }

  const data = readInteractions();

  if (!data.images[imageKey]) {
    data.images[imageKey] = { likes: 0, comments: [] };
  }

  const newComment = {
    id: Date.now().toString(),
    username: comment.username || 'Guest',
    text: comment.text,
    time: new Date().toISOString(),
    likes: 0
  };

  data.images[imageKey].comments.push(newComment);
  data.totalComments++;

  writeInteractions(data);

  res.json({
    success: true,
    comment: newComment,
    totalComments: data.images[imageKey].comments.length
  });
});

// Get all interactions stats
app.get('/api/interactions/stats', (req, res) => {
  const data = readInteractions();
  res.json({
    totalLikes: data.totalLikes,
    totalComments: data.totalComments,
    totalImages: Object.keys(data.images).length
  });
});

// ========================================
// START SERVER
// ========================================

app.listen(PORT, () => {
  console.log('========================================');
  console.log("   TASHU'S STUDIO - ADMIN PANEL");
  console.log('========================================');
  console.log(`Server running at: http://localhost:${PORT}`);
  console.log(`Admin Panel: http://localhost:${PORT}/admin`);
  console.log(`Main Website: http://localhost:${PORT}`);
  console.log('========================================');
  console.log('Default Login: admin / admin123');
  console.log('========================================');
});
