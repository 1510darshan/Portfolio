# ⚡ QUICK START REFERENCE CARD

## 🚀 Start Your Portfolio in 3 Steps

### Step 1: Start MongoDB
```powershell
net start MongoDB
```

### Step 2: Seed Database (First Time Only)
```powershell
cd backend
node seed.js
cd ..
```

### Step 3: Start Application
```powershell
# Quick Start
.\start.ps1

# OR Manual
# Terminal 1
cd backend
npm run dev

# Terminal 2 (new terminal)
npm start
```

---

## 🌐 Access URLs

| What | URL |
|------|-----|
| **Portfolio** | http://localhost:3000 |
| **Admin** | http://localhost:3000/admin/login |
| **API** | http://localhost:5000/api |

---

## 🔐 Login

```
Email: admin@portfolio.com
Password: admin123
```

---

## 📁 Key Directories

```
backend/          → API Server
  models/         → Database schemas
  routes/         → API endpoints
  
src/
  admin/          → Admin dashboard
  components/     → Public portfolio
  services/       → API calls
```

---

## 🛠️ Common Commands

### Backend
```powershell
cd backend
npm run dev          # Start server
node seed.js         # Seed database
```

### Frontend
```powershell
npm start            # Start dev server
npm run build        # Production build
```

### MongoDB
```powershell
net start MongoDB    # Start service
net stop MongoDB     # Stop service
mongod               # Run manually
```

---

## 🎯 Admin Features

### Projects
- Add/Edit/Delete projects
- Categories: frontend, backend, fullstack, java, python
- Tags, images, GitHub links

### Skills
- Add/Edit/Delete skills
- Set proficiency level (0-100%)
- Categories: technical, soft, tools, languages

### Education
- Add/Edit/Delete education
- Timeline view
- Degrees, certifications

### Messages
- View contact submissions
- Mark as read
- Delete messages

### Profile
- Personal info
- Social links
- Resume URL
- Profile picture

---

## 🐛 Troubleshooting

### MongoDB not connected?
```powershell
net start MongoDB
```

### Port 5000 busy?
```powershell
Get-NetTCPConnection -LocalPort 5000 | Select OwningProcess
Stop-Process -Id <PID> -Force
```

### Can't login?
- Check backend is running
- Username: admin@portfolio.com
- Password: admin123

### Changes not showing?
- Hard refresh: Ctrl + Shift + R
- Clear cache: Ctrl + F5

---

## 📊 Database Collections

After seeding:
- ✅ projects (2 items)
- ✅ skills (6 items)
- ✅ education (1 item)
- ✅ admins (1 user)
- ✅ profiles (1 profile)
- ✅ contacts (0 messages)

---

## 🎨 Tech Stack

**Frontend:** React, React Router, Styled Components, Axios
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT
**Email:** EmailJS
**Auth:** JWT + Bcrypt

---

## 📖 Full Documentation

- `README.md` - Project overview
- `STARTUP_GUIDE.md` - Detailed setup
- `PROJECT_COMPLETE.md` - Everything created
- `ADMIN_PANEL_GUIDE.md` - Admin features

---

## ⚠️ Important Notes

1. **Change admin password** after first login
2. **MongoDB must be running** before starting servers
3. **Seed database only once** (or it will duplicate data)
4. **Both servers** (backend + frontend) must run simultaneously

---

## 🎉 Success Indicators

✅ Backend: "MongoDB Connected" message
✅ Frontend: "Compiled successfully!"
✅ Login: Redirects to dashboard
✅ Projects: Load from database

---

## 🚨 Emergency Reset

If something breaks:

```powershell
# 1. Stop all servers (Ctrl + C)

# 2. Drop database
mongo
use portfolio
db.dropDatabase()
exit

# 3. Reseed
cd backend
node seed.js

# 4. Restart
.\start.ps1
```

---

**Need Help?** Check `STARTUP_GUIDE.md` for detailed instructions!
