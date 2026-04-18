# Darshan Walhe — Full-Stack Developer Portfolio

A modern, dynamic developer portfolio built with **React 19 + Vite** on the frontend and **Node.js + Express** on the backend, powered by **Firebase Firestore** as the database and **Firebase Auth** for admin authentication. All portfolio content (projects, skills, experience, about info) is managed dynamically through a built-in **Admin Panel** — no code changes needed to update your portfolio.

---

## 🌐 Live Demo

> Deploy your own and update this link: `https://your-portfolio.onrender.com`

---

## 📸 Preview

| Section | Description |
|---------|-------------|
| Hero | Animated profile image, tagline, CTA buttons |
| About | Bio, stat cards, skill tags |
| Projects | Compact cards with click-to-expand modal + dynamic filters |
| Skills | Categorized skill grid with FontAwesome icons + proficiency levels |
| Experience | Animated timeline + Education + Certifications tabs |
| Contact | Contact form that saves to Firestore |
| Admin | Full CRUD admin panel at `/admin` |

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19.x | UI framework |
| Vite | 7.x | Build tool & dev server |
| styled-components | 6.x | CSS-in-JS styling |
| React Router DOM | 7.x | Client-side routing |
| FontAwesome | 7.x | Skill icons |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 18+ | Runtime |
| Express | 4.x | REST API server |
| Firebase Firestore | 12.x | NoSQL database |
| Firebase Auth | 12.x | Admin authentication |
| JSON Web Token | 9.x | Session management |
| dotenv | 16.x | Environment config |
| cors | 2.x | Cross-origin requests |

---

## Project Structure

```
Portfolio/
├── frontend/                         # React + Vite app
│   ├── public/
│   │   └── background.png            # Hero background image
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx            # Sticky navigation bar
│   │   ├── pages/
│   │   │   ├── Hero/Hero.jsx         # Landing section with profile image
│   │   │   ├── About/About.jsx       # Bio, stats, tags
│   │   │   ├── Projects/Projects.jsx # Cards + modal + dynamic filters
│   │   │   ├── Skills/Skills.jsx     # Skill grid with FA icons
│   │   │   ├── Experience/Experience.jsx  # Timeline, Education, Certifications
│   │   │   ├── Contact/Contact.jsx   # Contact form
│   │   │   └── Admin/
│   │   │       ├── Admin.jsx                      # Admin panel with tabs
│   │   │       ├── AdminLogin.jsx                 # Firebase Auth login
│   │   │       └── managers/
│   │   │           ├── Dashboard.jsx              # Stats overview
│   │   │           ├── ProjectsManager.jsx        # Projects CRUD
│   │   │           ├── SkillsManager.jsx          # Skills CRUD
│   │   │           ├── ExperiencesManager.jsx     # Experience CRUD
│   │   │           ├── MessagesManager.jsx        # View contact messages
│   │   │           ├── AboutManager.jsx           # Edit about info
│   │   │           └── ContactManager.jsx         # Contact settings
│   │   ├── Services/
│   │   │   ├── Api.js           # All REST API calls (named exports)
│   │   │   ├── FetchData.js     # useFirebase + useSendMessage hooks
│   │   │   └── ManageData.js    # Admin CRUD API calls
│   │   ├── App.jsx              # Router: / and /admin routes
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
│
└── backend/                          # Express API server
    ├── dist/                         # Built React frontend (served statically)
    ├── src/
    │   ├── index.js                  # Entry point + static file serving
    │   ├── config/firebase.js        # Firestore + Auth init (exports db, auth)
    │   ├── middleware/auth.js        # JWT authenticateToken + generateToken
    │   └── routes/
    │       ├── projects.js           # GET /api/projects
    │       ├── skills.js             # GET /api/skills
    │       ├── experiences.js        # GET /api/experiences
    │       ├── about.js              # GET /api/about
    │       ├── messages.js           # POST /api/messages
    │       └── admin.js              # Login + protected CRUD routes
    └── package.json
```

---

## API Reference

### Public Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/projects` | Get all projects |
| `GET` | `/api/projects/:category` | Get projects by category |
| `GET` | `/api/skills` | Get all skills |
| `GET` | `/api/skills/:category` | Get skills by category |
| `GET` | `/api/experiences` | Get all experiences |
| `GET` | `/api/about` | Get about info |
| `POST` | `/api/messages` | Submit contact form message |
| `GET` | `/health` | Server health check |

### Admin Endpoints (JWT Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/admin/login` | Login with email + password → JWT |
| `POST` | `/api/admin/projects` | Create project |
| `PUT` | `/api/admin/projects/:id` | Update project |
| `DELETE` | `/api/admin/projects/:id` | Delete project |
| `POST` | `/api/admin/skills` | Create skill |
| `PUT` | `/api/admin/skills/:id` | Update skill |
| `DELETE` | `/api/admin/skills/:id` | Delete skill |
| `POST` | `/api/admin/experiences` | Create experience |
| `PUT` | `/api/admin/experiences/:id` | Update experience |
| `DELETE` | `/api/admin/experiences/:id` | Delete experience |
| `PUT` | `/api/admin/about` | Update about info |
| `GET` | `/api/admin/messages` | Get all contact messages |
| `PUT` | `/api/admin/messages/:id/read` | Mark message as read |
| `DELETE` | `/api/admin/messages/:id` | Delete message |

---

## Firebase Firestore Collections

```
Firestore Database
├── Projects/           # Portfolio projects
├── Skills/             # Technical skills
├── Experience/         # Work experience
├── AboutMe/
│   └── profile         # Single document for about info
└── Messages/           # Contact form submissions
```

### Data Schemas

<details>
<summary><b>Projects</b></summary>

```js
{
  name: "Project Name",
  category: "Fullstack,Frontend",   // comma-separated for multi-category
  desc: "Project description...",
  tech: ["React", "Node.js"],        // array
  type: "Web",
  accent: "#22d3ee",                 // hex color for card theming
  status: "Completed",
  live: "https://...",               // optional
  github: "https://github.com/...",  // optional
  image: "https://..."               // optional image URL
}
```
</details>

<details>
<summary><b>Skills</b></summary>

```js
{
  name: "React",
  category: "Frontend",
  level: 90,               // 0–100 proficiency
  color: "#22d3ee",
  icon: { prefix: "fab", name: "react" },  // FontAwesome icon object
  featured: true,          // show in skill rings on hero
  order: 1                 // display priority
}
```
</details>

<details>
<summary><b>Experience</b></summary>

```js
{
  role: "Senior Frontend Developer",
  company: "TechCorp",
  type: "Full-time",               // optional — omit to hide dot separator
  date: "Aug 2024 — Present",      // supports "MMM YYYY — Present" format
  current: true,                   // floats to top of timeline
  desc: "Description of role...",
  tags: ["React", "Node.js"]       // array of skills
}
```
</details>

<details>
<summary><b>AboutMe → profile</b></summary>

```js
{
  name: "Your Name",
  title: "Full-Stack Developer",
  bio: "...",
  profileImage: "https://...",
  email: "...",
  github: "https://github.com/...",
  linkedin: "https://linkedin.com/..."
}
```
</details>

---

## ⚙️ Local Development Setup

### Prerequisites
- Node.js 18+
- npm
- A Firebase project with Firestore + Email/Password Auth enabled

### 1. Clone the repository

```bash
git clone https://github.com/1510darshan/Portfolio.git
cd Portfolio
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com) → create or open your project
2. Enable **Firestore Database** (start in test mode)
3. Enable **Authentication** → Sign-in method → **Email/Password**
4. Under Authentication → Users → **Add a user** (this will be your admin login)
5. Go to Project Settings → Your apps → copy the Firebase config values

### 3. Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
# Server
PORT=3000

# Firebase Config (from Project Settings → Your apps)
apiKey=AIzaSy...
authDomain=your-project.firebaseapp.com
databaseURL=https://your-project-default-rtdb.firebaseio.com
projectId=your-project-id
storageBucket=your-project.appspot.com
messagingSenderId=123456789
appId=1:123456789:web:abc123
measurementId=G-XXXXXXX

# JWT Secret (use a long random string)
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
```

Start the backend:

```bash
npm run dev
# → Server running on http://localhost:3000
```

### 4. Frontend Setup

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
# → App running on http://localhost:5173
```

---

## Production Build & Deployment

### Step 1 — Build the React frontend

```bash
cd frontend
npm run build
# Output: frontend/dist/
```

### Step 2 — Copy dist to backend

```bash
# Windows
xcopy /E /I frontend\dist backend\dist

# Mac / Linux
cp -r frontend/dist backend/dist
```

The Express server serves the React build from `backend/dist/` and handles client-side routing with a `GET *` catch-all — so React Router paths like `/admin` work correctly after a refresh.

### Step 3 — Deploy to Render

1. Push your code to GitHub (ensure `backend/dist` is committed or add a build step)
2. Go to [Render](https://render.com) → **New Web Service**
3. Connect your GitHub repo
4. Configure the service:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add all environment variables from `backend/.env` in the Render Environment tab
6. Click **Deploy** 🚀

---

## Admin Panel

Navigate to `/admin` on your deployed site (e.g., `https://your-site.onrender.com/admin`).

### Login
- Uses **Firebase Email/Password Authentication**
- Enter the email and password of the admin user you created in Firebase Console
- A JWT token is stored in `localStorage` for session persistence (24h expiry)

### Admin Panel Tabs

| Tab | What you can do |
|-----|----------------|
| **Dashboard** | Live counts of projects, skills, experiences, unread messages |
| **Projects** | Add / edit / delete projects — name, category, description, tech stack, accent color, image URL, live link, GitHub link |
| **Skills** | Add / edit / delete skills — name, category, proficiency level (0–100), FontAwesome icon, featured flag, display order |
| **Experience** | Add / edit / delete work experience — role, company, type, date range, description, skill tags, current job flag |
| **Messages** | View contact form submissions, mark as read, delete |
| **About** | Update bio, profile image URL, social links |

---

## Notable Features

- **Dynamic category filters** on Projects — tabs are auto-generated from your data (no hardcoded values), supports comma-separated multi-category like `"Fullstack,Frontend,Backend"`
- **Click-to-expand project cards** — compact grid with full detail modal on click; close with ✕ button, backdrop click, or `Escape` key
- **Smart experience timeline sorting** — current positions always float to the top, then sorted by start date descending; parses date strings like `"Aug 2024 — Present"` automatically
- **Skeleton loading states** — shimmer skeletons for every data-fetched section
- **FontAwesome skill icons** — skills use real FA icons stored as `{ prefix: "fab", name: "react" }` objects in Firestore
- **Single-server deployment** — backend serves both the REST API and the React frontend from `dist/`; one process, one port
- **Graceful Firebase Auth error handling** — all known Firebase error codes (`auth/wrong-password`, `auth/too-many-requests`, etc.) return user-friendly messages

---

## Application Routes

| Path | Component | Notes |
|------|-----------|-------|
| `/` | Full portfolio | Hero → About → Projects → Skills → Experience → Contact |
| `/admin` | Admin panel | Shows `AdminLogin` if not authenticated, `Admin` dashboard if authenticated |

---

## Contributing

This is a personal portfolio — feel free to fork and customise for your own use!

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Author

**Darshan Walhe**

[![GitHub](<img width="1912" height="969" alt="image" src="https://github.com/user-attachments/assets/7e4d00bc-8fe3-4676-917c-ce319f527f62" />)

---

> Built with ❤️ using React 19, Node.js, Express, and Firebase
