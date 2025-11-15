# 🚀 Personal Portfolio - Full Stack Application

## 📖 Overview

A modern, full-stack portfolio website built with React, Node.js, Express, and MongoDB. Features a beautiful public-facing portfolio with an integrated admin dashboard for easy content management.

## ✨ Features

### Public Portfolio
- 🎨 Modern, responsive design
- 📱 Mobile-friendly interface
- 🚀 Fast performance with lazy loading
- 🔍 SEO optimized
- 📧 Contact form with EmailJS integration
- 💼 Dynamic projects showcase
- 🎓 Education timeline
- 💡 Skills display with progress bars
- 🔗 Social media integration

### Admin Dashboard
- 🔐 Secure JWT authentication
- 📊 Real-time statistics dashboard
- 🛠️ Full CRUD operations for:
  - Projects
  - Skills
  - Education
  - Contact Messages
  - Profile Settings
- 📱 Responsive admin interface
- 🎨 Beautiful dark theme UI

## 🛠️ Tech Stack

### Frontend
- React 19.1.0
- React Router DOM 7.1.1
- Styled Components 6.1.18
- Axios 1.7.9
- EmailJS Browser 4.4.1
- React Icons
- Lucide React

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- Bcrypt for password hashing
- CORS enabled
- Multer for file uploads

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (Local or Atlas)
- npm or yarn

### 1. Clone Repository
```bash
git clone https://github.com/1510darshan/Portfolio.git
cd Portfolio
```

### 2. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ..
npm install
```

### 3. Environment Setup

**Backend** (`backend/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

**Frontend** (`.env`):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Seed Database
```bash
cd backend
node seed.js
```

### 5. Start Application

**Option A: Manual Start**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd ..
npm start
```

**Option B: Quick Start Script (Windows)**
```bash
# PowerShell
.\start.ps1

# Or Command Prompt
start.bat
```

### 6. Access Application
- **Portfolio**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login
- **Admin Dashboard**: http://localhost:3000/admin/dashboard
- **API**: http://localhost:5000/api

### 🔐 Default Admin Credentials
```
Email: admin@portfolio.com
Password: admin123
```
⚠️ Change these after first login!

## 📁 Project Structure

```
Portfolio/
├── backend/                  # Backend API
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API routes
│   ├── middleware/          # Authentication middleware
│   ├── server.js           # Express server
│   └── seed.js             # Database seeder
├── src/
│   ├── admin/              # Admin dashboard components
│   ├── components/Pages/   # Public portfolio pages
│   ├── services/           # API service layer
│   └── App.js              # Main app with routing
├── public/                  # Static assets
├── .env                     # Frontend environment
└── start.ps1 / start.bat   # Quick start scripts
```

## 📚 Documentation

- [Complete Startup Guide](./STARTUP_GUIDE.md)
- [Admin Panel Guide](./ADMIN_PANEL_GUIDE.md)
- [Contact Form Fixes](./CONTACT_RESPONSIVE_FIXES.md)
- [Hero Section Fixes](./HERO_RESPONSIVE_FIXES.md)

## 🔌 API Endpoints

### Public Endpoints
- `GET /api/projects` - Get all projects
- `GET /api/skills` - Get all skills
- `GET /api/education` - Get education
- `GET /api/profile` - Get profile
- `POST /api/contact` - Submit contact form

### Protected Endpoints (Require JWT)
- `POST /api/auth/login` - Admin login
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- Similar CRUD for skills, education, profile

## 🎨 Customization

### Update Profile
1. Login to admin dashboard
2. Navigate to Profile section
3. Update personal information, social links, resume URL

### Add Projects
1. Login to admin dashboard
2. Navigate to Projects
3. Click "Add Project"
4. Fill in details and save

### Manage Skills
1. Navigate to Skills section
2. Add/Edit skills with proficiency levels
3. Organize by categories

## 🚨 Troubleshooting

### MongoDB Connection Failed
```bash
# Start MongoDB
net start MongoDB

# Or manually
mongod --dbpath "C:\data\db"
```

### Port Already in Use
```powershell
# Kill process on port 5000
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force
```

### CORS Errors
- Ensure backend is running on port 5000
- Check CORS configuration in `backend/server.js`

## 📦 Production Deployment

### Backend (Railway/Render/Heroku)
1. Set environment variables
2. Deploy backend code
3. Run seed script once

### Frontend (Vercel/Netlify)
1. Update `REACT_APP_API_URL` to production API URL
2. Build: `npm run build`
3. Deploy `build` folder

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Darshan Walhe**
- GitHub: [@1510darshan](https://github.com/1510darshan)
- LinkedIn: [Darshan Walhe](https://in.linkedin.com/in/darshan-walhe-475b60255)
- Email: Darshanwalhe1510@gmail.com

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB for the database
- All open-source contributors

---

⭐ If you like this project, please give it a star on GitHub!
2. Page smoothly scrolls to Contact section
3. Form briefly highlights with blue glow
4. Subject and message fields are pre-filled with project discussion context
5. User can immediately continue typing or modify the pre-filled content

## 🔧 **Code Quality:**
- No compilation errors
- Clean component separation
- Reusable event system
- Responsive design maintained
- Theme consistency preserved
