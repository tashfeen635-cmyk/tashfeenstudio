/**
 * ========================================
 * TASHU'S STUDIO - ADMIN PANEL JAVASCRIPT
 * ========================================
 * Simple, beginner-friendly admin functionality
 */

// API Base URL - Change this if your server runs on a different port
const API_URL = 'http://localhost:3000/api';

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Show toast notification
function showToast(message, isError = false) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = isError ? 'toast error show' : 'toast show';

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Format date to readable string
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Show image preview when file is selected
function setupImagePreview(inputId, previewId) {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);

  if (input && preview) {
    input.addEventListener('change', function () {
      preview.innerHTML = '';
      if (this.files && this.files[0]) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(this.files[0]);
        preview.appendChild(img);
      }
    });
  }
}

// ========================================
// AUTHENTICATION
// ========================================

// Check if user is logged in
async function checkAuth() {
  try {
    const response = await fetch(`${API_URL}/auth/check`, {
      credentials: 'include'
    });
    const data = await response.json();

    if (data.isLoggedIn) {
      showDashboard();
      document.getElementById('welcomeUser').textContent = `Welcome, ${data.username}`;
      loadDashboardData();
    } else {
      showLogin();
    }
  } catch (error) {
    console.error('Auth check failed:', error);
    showLogin();
  }
}

// Show login page
function showLogin() {
  document.getElementById('loginPage').classList.remove('hidden');
  document.getElementById('adminDashboard').classList.add('hidden');
}

// Show dashboard
function showDashboard() {
  document.getElementById('loginPage').classList.add('hidden');
  document.getElementById('adminDashboard').classList.remove('hidden');
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorEl = document.getElementById('loginError');

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
      showToast('Login successful!');
      showDashboard();
      loadDashboardData();
    } else {
      errorEl.textContent = data.error || 'Login failed';
    }
  } catch (error) {
    errorEl.textContent = 'Connection error. Please try again.';
    console.error('Login error:', error);
  }
});

// Handle logout
document.getElementById('logoutBtn').addEventListener('click', async function () {
  try {
    await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    showToast('Logged out successfully');
    showLogin();
  } catch (error) {
    console.error('Logout error:', error);
  }
});

// ========================================
// NAVIGATION
// ========================================

// Handle sidebar navigation
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', function (e) {
    e.preventDefault();
    const section = this.dataset.section;
    showSection(section);
  });
});

// Show a specific section
function showSection(sectionName) {
  // Update active nav item
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.section === sectionName) {
      item.classList.add('active');
    }
  });

  // Show selected section
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(`${sectionName}Section`).classList.add('active');

  // Update page title
  const titles = {
    dashboard: 'Dashboard',
    portfolio: 'Portfolio',
    about: 'About',
    services: 'Services',
    skills: 'Skills',
    stories: 'Stories',
    messages: 'Messages',
    settings: 'Settings'
  };
  document.getElementById('pageTitle').textContent = titles[sectionName] || 'Dashboard';

  // Load section data
  loadSectionData(sectionName);

  // Close mobile sidebar
  document.querySelector('.sidebar').classList.remove('active');
}

// Load data for a specific section
function loadSectionData(section) {
  switch (section) {
    case 'dashboard':
      loadDashboardData();
      break;
    case 'portfolio':
      loadPortfolio();
      break;
    case 'about':
      loadAbout();
      break;
    case 'services':
      loadServices();
      break;
    case 'skills':
      loadSkills();
      break;
    case 'stories':
      loadStories();
      break;
    case 'messages':
      loadMessages();
      break;
    case 'settings':
      loadSettings();
      break;
  }
}

// Mobile menu toggle
document.getElementById('menuToggle').addEventListener('click', function () {
  document.querySelector('.sidebar').classList.toggle('active');
});

// ========================================
// MODAL FUNCTIONS
// ========================================

function openModal(modalId) {
  document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
  // Reset form
  const form = document.querySelector(`#${modalId} form`);
  if (form) form.reset();
  // Clear image previews
  document.querySelectorAll(`#${modalId} .image-preview`).forEach(el => el.innerHTML = '');
}

// Close modal when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', function (e) {
    if (e.target === this) {
      this.classList.remove('active');
    }
  });
});

// ========================================
// DASHBOARD
// ========================================

async function loadDashboardData() {
  try {
    // Load counts
    const [portfolio, services, skills, messages] = await Promise.all([
      fetch(`${API_URL}/portfolio`).then(r => r.json()),
      fetch(`${API_URL}/services`).then(r => r.json()),
      fetch(`${API_URL}/skills`).then(r => r.json()),
      fetch(`${API_URL}/messages`, { credentials: 'include' }).then(r => r.json())
    ]);

    document.getElementById('portfolioCount').textContent = portfolio.length || 0;
    document.getElementById('servicesCount').textContent = services.length || 0;
    document.getElementById('skillsCount').textContent = skills.length || 0;
    document.getElementById('messagesCount').textContent = messages.length || 0;

    // Update unread messages badge
    const unread = Array.isArray(messages) ? messages.filter(m => !m.read).length : 0;
    const badge = document.getElementById('unreadBadge');
    if (unread > 0) {
      badge.textContent = unread;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  } catch (error) {
    console.error('Error loading dashboard data:', error);
  }
}

// ========================================
// PORTFOLIO CRUD
// ========================================

async function loadPortfolio() {
  try {
    const response = await fetch(`${API_URL}/portfolio`);
    const portfolio = await response.json();

    const table = document.getElementById('portfolioTable');

    if (portfolio.length === 0) {
      table.innerHTML = `
        <tr>
          <td colspan="4" class="text-center text-muted" style="padding: 40px;">
            No portfolio items yet. Click "Add New" to create one.
          </td>
        </tr>
      `;
      return;
    }

    table.innerHTML = portfolio.map(item => `
      <tr>
        <td>
          ${item.image ? `<img src="${item.image}" alt="${item.title}">` : '<span class="text-muted">No image</span>'}
        </td>
        <td><strong>${item.title}</strong></td>
        <td>${item.category || '-'}</td>
        <td>
          <div class="table-actions">
            <button class="btn btn-small btn-outline" onclick="editPortfolio('${item.id}')">Edit</button>
            <button class="btn btn-small btn-danger" onclick="deletePortfolio('${item.id}')">Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error loading portfolio:', error);
    showToast('Error loading portfolio', true);
  }
}

// Edit portfolio item
async function editPortfolio(id) {
  try {
    const response = await fetch(`${API_URL}/portfolio/${id}`);
    const item = await response.json();

    document.getElementById('portfolioId').value = item.id;
    document.getElementById('portfolioTitle').value = item.title;
    document.getElementById('portfolioCategory').value = item.category;
    document.getElementById('portfolioDescription').value = item.description || '';
    document.getElementById('portfolioLink').value = item.link || '';

    if (item.image) {
      document.getElementById('portfolioImagePreview').innerHTML = `<img src="${item.image}">`;
    }

    document.getElementById('portfolioModalTitle').textContent = 'Edit Portfolio Item';
    openModal('portfolioModal');
  } catch (error) {
    console.error('Error loading portfolio item:', error);
    showToast('Error loading item', true);
  }
}

// Delete portfolio item
async function deletePortfolio(id) {
  if (!confirm('Are you sure you want to delete this portfolio item?')) return;

  try {
    const response = await fetch(`${API_URL}/portfolio/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    if (response.ok) {
      showToast('Portfolio item deleted');
      loadPortfolio();
      loadDashboardData();
    } else {
      showToast('Error deleting item', true);
    }
  } catch (error) {
    console.error('Error deleting portfolio:', error);
    showToast('Error deleting item', true);
  }
}

// Portfolio form submission
document.getElementById('portfolioForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const id = formData.get('id');
  const url = id ? `${API_URL}/portfolio/${id}` : `${API_URL}/portfolio`;
  const method = id ? 'PUT' : 'POST';

  try {
    const response = await fetch(url, {
      method: method,
      credentials: 'include',
      body: formData
    });

    if (response.ok) {
      showToast(id ? 'Portfolio item updated' : 'Portfolio item created');
      closeModal('portfolioModal');
      loadPortfolio();
      loadDashboardData();
    } else {
      showToast('Error saving portfolio item', true);
    }
  } catch (error) {
    console.error('Error saving portfolio:', error);
    showToast('Error saving item', true);
  }
});

// ========================================
// ABOUT
// ========================================

async function loadAbout() {
  try {
    const response = await fetch(`${API_URL}/about`);
    const about = await response.json();

    document.getElementById('aboutName').value = about.name || '';
    document.getElementById('aboutTitle').value = about.title || '';
    document.getElementById('aboutLocation').value = about.location || '';
    document.getElementById('aboutBio').value = about.bio || '';

    if (about.image) {
      document.getElementById('aboutImagePreview').innerHTML = `<img src="${about.image}">`;
    }
  } catch (error) {
    console.error('Error loading about:', error);
  }
}

// About form submission
document.getElementById('aboutForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  try {
    const response = await fetch(`${API_URL}/about`, {
      method: 'PUT',
      credentials: 'include',
      body: formData
    });

    if (response.ok) {
      showToast('About information saved');
    } else {
      showToast('Error saving about information', true);
    }
  } catch (error) {
    console.error('Error saving about:', error);
    showToast('Error saving', true);
  }
});

// ========================================
// SERVICES CRUD
// ========================================

async function loadServices() {
  try {
    const response = await fetch(`${API_URL}/services`);
    const services = await response.json();

    const table = document.getElementById('servicesTable');

    if (services.length === 0) {
      table.innerHTML = `
        <tr>
          <td colspan="3" class="text-center text-muted" style="padding: 40px;">
            No services yet. Click "Add New" to create one.
          </td>
        </tr>
      `;
      return;
    }

    table.innerHTML = services.map(item => `
      <tr>
        <td><strong>${item.name}</strong></td>
        <td>${item.description ? item.description.substring(0, 60) + '...' : '-'}</td>
        <td>
          <div class="table-actions">
            <button class="btn btn-small btn-outline" onclick="editService('${item.id}')">Edit</button>
            <button class="btn btn-small btn-danger" onclick="deleteService('${item.id}')">Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error loading services:', error);
    showToast('Error loading services', true);
  }
}

// Edit service
async function editService(id) {
  try {
    const response = await fetch(`${API_URL}/services`);
    const services = await response.json();
    const item = services.find(s => s.id === id);

    if (item) {
      document.getElementById('serviceId').value = item.id;
      document.getElementById('serviceName').value = item.name;
      document.getElementById('serviceDescription').value = item.description || '';

      document.getElementById('serviceModalTitle').textContent = 'Edit Service';
      openModal('serviceModal');
    }
  } catch (error) {
    console.error('Error loading service:', error);
    showToast('Error loading service', true);
  }
}

// Delete service
async function deleteService(id) {
  if (!confirm('Are you sure you want to delete this service?')) return;

  try {
    const response = await fetch(`${API_URL}/services/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    if (response.ok) {
      showToast('Service deleted');
      loadServices();
      loadDashboardData();
    } else {
      showToast('Error deleting service', true);
    }
  } catch (error) {
    console.error('Error deleting service:', error);
    showToast('Error deleting service', true);
  }
}

// Service form submission
document.getElementById('serviceForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const id = document.getElementById('serviceId').value;
  const name = document.getElementById('serviceName').value;
  const description = document.getElementById('serviceDescription').value;

  const url = id ? `${API_URL}/services/${id}` : `${API_URL}/services`;
  const method = id ? 'PUT' : 'POST';

  try {
    const response = await fetch(url, {
      method: method,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description })
    });

    if (response.ok) {
      showToast(id ? 'Service updated' : 'Service created');
      closeModal('serviceModal');
      loadServices();
      loadDashboardData();
    } else {
      showToast('Error saving service', true);
    }
  } catch (error) {
    console.error('Error saving service:', error);
    showToast('Error saving service', true);
  }
});

// ========================================
// SKILLS CRUD
// ========================================

async function loadSkills() {
  try {
    const response = await fetch(`${API_URL}/skills`);
    const skills = await response.json();

    const grid = document.getElementById('skillsGrid');

    if (skills.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <p>No skills yet. Click "Add New" to create one.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = skills.map(item => `
      <div class="skill-card">
        <div class="skill-header">
          <h3>${item.name}</h3>
          <span class="skill-level">${item.level}%</span>
        </div>
        <div class="skill-bar">
          <div class="skill-progress" style="width: ${item.level}%"></div>
        </div>
        <div class="skill-actions">
          <button class="btn btn-small btn-outline" onclick="editSkill('${item.id}')">Edit</button>
          <button class="btn btn-small btn-danger" onclick="deleteSkill('${item.id}')">Delete</button>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading skills:', error);
    showToast('Error loading skills', true);
  }
}

// Edit skill
async function editSkill(id) {
  try {
    const response = await fetch(`${API_URL}/skills`);
    const skills = await response.json();
    const item = skills.find(s => s.id === id);

    if (item) {
      document.getElementById('skillId').value = item.id;
      document.getElementById('skillName').value = item.name;
      document.getElementById('skillLevel').value = item.level;
      document.getElementById('skillLevelValue').textContent = item.level;

      document.getElementById('skillModalTitle').textContent = 'Edit Skill';
      openModal('skillModal');
    }
  } catch (error) {
    console.error('Error loading skill:', error);
    showToast('Error loading skill', true);
  }
}

// Delete skill
async function deleteSkill(id) {
  if (!confirm('Are you sure you want to delete this skill?')) return;

  try {
    const response = await fetch(`${API_URL}/skills/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    if (response.ok) {
      showToast('Skill deleted');
      loadSkills();
      loadDashboardData();
    } else {
      showToast('Error deleting skill', true);
    }
  } catch (error) {
    console.error('Error deleting skill:', error);
    showToast('Error deleting skill', true);
  }
}

// Skill form submission
document.getElementById('skillForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const id = document.getElementById('skillId').value;
  const name = document.getElementById('skillName').value;
  const level = document.getElementById('skillLevel').value;

  const url = id ? `${API_URL}/skills/${id}` : `${API_URL}/skills`;
  const method = id ? 'PUT' : 'POST';

  try {
    const response = await fetch(url, {
      method: method,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, level })
    });

    if (response.ok) {
      showToast(id ? 'Skill updated' : 'Skill created');
      closeModal('skillModal');
      loadSkills();
      loadDashboardData();
    } else {
      showToast('Error saving skill', true);
    }
  } catch (error) {
    console.error('Error saving skill:', error);
    showToast('Error saving skill', true);
  }
});

// ========================================
// STORIES CRUD
// ========================================

async function loadStories() {
  try {
    const response = await fetch(`${API_URL}/stories`);
    const stories = await response.json();

    const grid = document.getElementById('storiesGrid');

    if (stories.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <p>No stories yet. Click "Add New" to create one.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = stories.map(item => `
      <div class="card">
        <div class="card-image">
          ${item.image ? `<img src="${item.image}" alt="${item.title}">` : ''}
        </div>
        <div class="card-content">
          <h3>${item.title}</h3>
          <p>${item.content ? item.content.substring(0, 100) + '...' : ''}</p>
          <div class="card-actions">
            <button class="btn btn-small btn-outline" onclick="editStory('${item.id}')">Edit</button>
            <button class="btn btn-small btn-danger" onclick="deleteStory('${item.id}')">Delete</button>
          </div>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading stories:', error);
    showToast('Error loading stories', true);
  }
}

// Edit story
async function editStory(id) {
  try {
    const response = await fetch(`${API_URL}/stories`);
    const stories = await response.json();
    const item = stories.find(s => s.id === id);

    if (item) {
      document.getElementById('storyId').value = item.id;
      document.getElementById('storyTitle').value = item.title;
      document.getElementById('storyContent').value = item.content || '';

      if (item.image) {
        document.getElementById('storyImagePreview').innerHTML = `<img src="${item.image}">`;
      }

      document.getElementById('storyModalTitle').textContent = 'Edit Story';
      openModal('storyModal');
    }
  } catch (error) {
    console.error('Error loading story:', error);
    showToast('Error loading story', true);
  }
}

// Delete story
async function deleteStory(id) {
  if (!confirm('Are you sure you want to delete this story?')) return;

  try {
    const response = await fetch(`${API_URL}/stories/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    if (response.ok) {
      showToast('Story deleted');
      loadStories();
    } else {
      showToast('Error deleting story', true);
    }
  } catch (error) {
    console.error('Error deleting story:', error);
    showToast('Error deleting story', true);
  }
}

// Story form submission
document.getElementById('storyForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const id = formData.get('id');
  const url = id ? `${API_URL}/stories/${id}` : `${API_URL}/stories`;
  const method = id ? 'PUT' : 'POST';

  try {
    const response = await fetch(url, {
      method: method,
      credentials: 'include',
      body: formData
    });

    if (response.ok) {
      showToast(id ? 'Story updated' : 'Story created');
      closeModal('storyModal');
      loadStories();
    } else {
      showToast('Error saving story', true);
    }
  } catch (error) {
    console.error('Error saving story:', error);
    showToast('Error saving story', true);
  }
});

// ========================================
// MESSAGES
// ========================================

async function loadMessages() {
  try {
    const response = await fetch(`${API_URL}/messages`, {
      credentials: 'include'
    });
    const messages = await response.json();

    const list = document.getElementById('messagesList');

    if (!Array.isArray(messages) || messages.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <p>No messages yet. Messages from your contact form will appear here.</p>
        </div>
      `;
      return;
    }

    // Sort by date, newest first
    messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    list.innerHTML = messages.map(msg => `
      <div class="message-card ${msg.read ? '' : 'unread'}">
        <div class="message-header">
          <h3>${msg.name}</h3>
          <span class="message-date">${formatDate(msg.createdAt)}</span>
        </div>
        <p class="message-email">${msg.email}</p>
        <p class="message-content">${msg.message}</p>
        <div class="message-actions">
          ${!msg.read ? `<button class="btn btn-small btn-outline" onclick="markAsRead('${msg.id}')">Mark as Read</button>` : ''}
          <a href="mailto:${msg.email}" class="btn btn-small btn-primary">Reply</a>
          <button class="btn btn-small btn-danger" onclick="deleteMessage('${msg.id}')">Delete</button>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading messages:', error);
    showToast('Error loading messages', true);
  }
}

// Mark message as read
async function markAsRead(id) {
  try {
    const response = await fetch(`${API_URL}/messages/${id}/read`, {
      method: 'PUT',
      credentials: 'include'
    });

    if (response.ok) {
      loadMessages();
      loadDashboardData();
    }
  } catch (error) {
    console.error('Error marking message as read:', error);
  }
}

// Delete message
async function deleteMessage(id) {
  if (!confirm('Are you sure you want to delete this message?')) return;

  try {
    const response = await fetch(`${API_URL}/messages/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    if (response.ok) {
      showToast('Message deleted');
      loadMessages();
      loadDashboardData();
    } else {
      showToast('Error deleting message', true);
    }
  } catch (error) {
    console.error('Error deleting message:', error);
    showToast('Error deleting message', true);
  }
}

// ========================================
// SITE SETTINGS
// ========================================

async function loadSettings() {
  try {
    const response = await fetch(`${API_URL}/settings`);
    const settings = await response.json();

    document.getElementById('storiesHeading').value = settings.storiesHeading || '';
    document.getElementById('portfolioHeading').value = settings.portfolioHeading || '';
    document.getElementById('servicesHeading').value = settings.servicesHeading || '';
    document.getElementById('skillsHeading').value = settings.skillsHeading || '';
    document.getElementById('contactHeading').value = settings.contactHeading || '';
  } catch (error) {
    console.error('Error loading settings:', error);
  }
}

// Settings form submission
document.getElementById('settingsForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const settings = {
    storiesHeading: document.getElementById('storiesHeading').value,
    portfolioHeading: document.getElementById('portfolioHeading').value,
    servicesHeading: document.getElementById('servicesHeading').value,
    skillsHeading: document.getElementById('skillsHeading').value,
    contactHeading: document.getElementById('contactHeading').value
  };

  try {
    const response = await fetch(`${API_URL}/settings`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });

    if (response.ok) {
      showToast('Settings saved successfully!');
    } else {
      showToast('Error saving settings', true);
    }
  } catch (error) {
    console.error('Error saving settings:', error);
    showToast('Error saving settings', true);
  }
});

// Password change form submission
document.getElementById('passwordForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const currentPassword = document.getElementById('currentPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Validate passwords match
  if (newPassword !== confirmPassword) {
    showToast('New passwords do not match!', true);
    return;
  }

  // Validate minimum length
  if (newPassword.length < 6) {
    showToast('Password must be at least 6 characters!', true);
    return;
  }

  try {
    const response = await fetch(`${API_URL}/auth/change-password`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newPassword })
    });

    const data = await response.json();

    if (response.ok) {
      showToast('Password changed successfully!');
      // Clear the form
      document.getElementById('passwordForm').reset();
    } else {
      showToast(data.error || 'Error changing password', true);
    }
  } catch (error) {
    console.error('Error changing password:', error);
    showToast('Error changing password', true);
  }
});

// Username change form submission
document.getElementById('usernameForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const newUsername = document.getElementById('newUsername').value;
  const password = document.getElementById('usernamePassword').value;

  // Validate minimum length
  if (newUsername.length < 3) {
    showToast('Username must be at least 3 characters!', true);
    return;
  }

  try {
    const response = await fetch(`${API_URL}/auth/change-username`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newUsername, password })
    });

    const data = await response.json();

    if (response.ok) {
      showToast('Username changed successfully!');
      // Update the welcome message
      document.getElementById('welcomeUser').textContent = `Welcome, ${newUsername}`;
      // Clear the form
      document.getElementById('usernameForm').reset();
    } else {
      showToast(data.error || 'Error changing username', true);
    }
  } catch (error) {
    console.error('Error changing username:', error);
    showToast('Error changing username', true);
  }
});

// ========================================
// RESTORE DEFAULT DATA
// ========================================

async function restoreDefaults() {
  // Show confirmation dialog with warning
  const confirmed = confirm(
    '⚠️ RESTORE DEFAULT DATA\n\n' +
    'This will replace ALL your current data (About, Services, Skills, Portfolio, Stories) with the original default data.\n\n' +
    'Your contact messages will be preserved.\n\n' +
    'This action cannot be undone. Are you sure you want to continue?'
  );

  if (!confirmed) return;

  // Double confirmation for safety
  const doubleConfirm = confirm(
    'Final Confirmation:\n\n' +
    'All your custom content will be lost and replaced with defaults.\n\n' +
    'Click OK to proceed or Cancel to abort.'
  );

  if (!doubleConfirm) return;

  try {
    const response = await fetch(`${API_URL}/restore-defaults`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();

    if (response.ok) {
      showToast('All data restored to defaults successfully!');
      // Reload dashboard data to reflect changes
      loadDashboardData();
      // Reload current section if it's not dashboard
      const activeSection = document.querySelector('.nav-item.active');
      if (activeSection && activeSection.dataset.section !== 'dashboard') {
        loadSectionData(activeSection.dataset.section);
      }
    } else {
      showToast(data.error || 'Error restoring defaults', true);
    }
  } catch (error) {
    console.error('Error restoring defaults:', error);
    showToast('Connection error. Please try again.', true);
  }
}

// ========================================
// INITIALIZE
// ========================================

// Setup image previews
setupImagePreview('portfolioImage', 'portfolioImagePreview');
setupImagePreview('aboutImage', 'aboutImagePreview');
setupImagePreview('storyImage', 'storyImagePreview');

// Reset modal forms when opening for new item
document.querySelectorAll('[onclick^="openModal"]').forEach(btn => {
  btn.addEventListener('click', function () {
    const modalId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
    const modal = document.getElementById(modalId);
    const form = modal.querySelector('form');
    if (form) form.reset();

    // Reset title
    const titleMap = {
      'portfolioModal': 'Add Portfolio Item',
      'serviceModal': 'Add Service',
      'skillModal': 'Add Skill',
      'storyModal': 'Add Story'
    };
    const titleEl = modal.querySelector('.modal-header h3');
    if (titleEl && titleMap[modalId]) {
      titleEl.textContent = titleMap[modalId];
    }

    // Clear previews
    modal.querySelectorAll('.image-preview').forEach(el => el.innerHTML = '');
  });
});

// Check authentication on page load
checkAuth();
