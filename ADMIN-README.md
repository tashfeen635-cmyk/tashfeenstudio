# Tashu's Studio - Admin Panel

A simple, beginner-friendly admin panel for managing your portfolio website.

## Quick Start

### 1. Install Dependencies

Open your terminal in this folder and run:

```bash
npm install
```

### 2. Start the Server

```bash
npm start
```

### 3. Access the Admin Panel

- **Admin Panel:** http://localhost:3000/admin
- **Main Website:** http://localhost:3000

### Default Login Credentials

- **Username:** admin
- **Password:** admin123

> **Important:** Change the password after your first login!

---

## Features

- **Dashboard:** Overview of all content
- **Portfolio:** Manage your projects (add, edit, delete)
- **About:** Update your bio and profile image
- **Services:** Manage services you offer
- **Skills:** Add and update your skills with progress bars
- **Stories:** Create blog-style content
- **Messages:** View contact form submissions

---

## Project Structure

```
tashus-studio/
├── admin/                  # Admin panel frontend
│   ├── index.html         # Admin dashboard
│   ├── css/admin.css      # Admin styles
│   └── js/admin.js        # Admin functionality
│
├── server/                 # Backend
│   ├── server.js          # Express server
│   └── data/              # JSON data storage
│       ├── admin.json     # Admin credentials
│       ├── portfolio.json # Portfolio items
│       ├── about.json     # About information
│       ├── services.json  # Services list
│       ├── skills.json    # Skills list
│       ├── stories.json   # Stories/blog posts
│       └── messages.json  # Contact messages
│
├── uploads/               # Uploaded images
├── package.json           # Node.js dependencies
└── index.html            # Main portfolio website
```

---

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/check` - Check login status

### Portfolio
- `GET /api/portfolio` - Get all items
- `POST /api/portfolio` - Create item
- `PUT /api/portfolio/:id` - Update item
- `DELETE /api/portfolio/:id` - Delete item

### About
- `GET /api/about` - Get about info
- `PUT /api/about` - Update about info

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Skills
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Create skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

### Stories
- `GET /api/stories` - Get all stories
- `POST /api/stories` - Create story
- `PUT /api/stories/:id` - Update story
- `DELETE /api/stories/:id` - Delete story

### Messages
- `GET /api/messages` - Get all messages (admin only)
- `POST /api/messages` - Submit contact message (public)
- `PUT /api/messages/:id/read` - Mark as read
- `DELETE /api/messages/:id` - Delete message

---

## Customization

### Change Admin Password

1. Login to admin panel
2. Go to Settings (if implemented) OR
3. Manually update `server/data/admin.json`

### Change Server Port

Edit `server/server.js` and change:
```javascript
const PORT = 3000;
```

### Styling

- Admin styles: `admin/css/admin.css`
- Main website styles: `css/style.css`

---

## Troubleshooting

### "Cannot connect to server"
- Make sure you ran `npm install`
- Make sure the server is running (`npm start`)
- Check if port 3000 is available

### "Login failed"
- Default credentials: admin / admin123
- Check `server/data/admin.json` file

### Images not uploading
- Check `uploads/` folder exists
- Check file size (max 5MB)
- Only images allowed (jpg, png, gif, webp)

---

## Security Notes

For production use, please:

1. Change the default admin password
2. Use HTTPS
3. Set a strong session secret in `server.js`
4. Consider using a proper database (MongoDB, PostgreSQL)
5. Add rate limiting for login attempts

---

## Support

For questions or issues, contact: tashfeen635@gmail.com
