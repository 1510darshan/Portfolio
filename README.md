# Darshan Walhe — Portfolio

A full-stack developer portfolio featuring a dark-themed animated UI, Firebase-backed content management, and a complete admin panel for managing portfolio content without touching code.

---

## Tech Stack

### Frontend
- **React 19** with Vite
- **React Router v7** — client-side routing
- **Styled Components** — component-level CSS-in-JS with animations
- **Tailwind CSS v4** — utility-first CSS (postcss)
- **FontAwesome** — icons (solid + brands)
- **Firebase JS SDK v12** — client-side data fetching

### Backend
- **Express.js** — REST API server
- **Firebase Admin SDK v12** — server-side Firestore access
- **JWT (jsonwebtoken)** — admin authentication
- **CORS**, **dotenv** — middleware and env config

### Database
- **Firebase Firestore** — stores projects, skills, experiences, about-me, and messages

---

## Project Structure

```
portfolio/
├── frontend/                  # React SPA (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx     # Sticky navigation bar
│   │   ├── pages/
│   │   │   ├── Hero/          # Landing hero section
│   │   │   ├── About/         # About section
│   │   │   ├── Projects/      # Filterable project showcase
│   │   │   ├── Skills/        # Skills section
│   │   │   ├── Experience/    # Work experience timeline
│   │   │   ├── Contact/       # Contact form
│   │   │   └── Admin/         # Admin panel + managers
│   │   │       └── managers/  # Dashboard, ProjectsManager, SkillsManager, ...
│   │   │       └── AdminLogin.jsx
│   │   ├── Services/
│   │   │   ├── Api.js         # All API calls (CRUD for all entities)
│   │   │   ├── FetchData.js
│   │   │   └── ManageData.js
│   │   ├── App.jsx            # Router setup
│   │   └── main.jsx           # React entry point
│   ├── index.html
│   ├── .env.example
│   └── package.json
│
└── backend/                   # Express API
    ├── src/
    │   ├── config/
    │   │   └── firebase.js    # Firebase Admin initialization
    │   ├── middleware/
    │   │   └── auth.js        # JWT token generation/verification
    │   ├── routes/
    │   │   ├── projects.js    # GET /projects, GET /projects/:category
    │   │   ├── skills.js      # GET /skills, GET /skills/:category
    │   │   ├── experiences.js # GET /experiences
    │   │   ├── messages.js    # POST /messages (contact form)
    │   │   ├── about.js       # GET /about
    │   │   └── admin.js       # Auth + full CRUD (protected)
    │   └── index.js           # Express app entry
    ├── .env.example
    └── package.json
```

---

## Features

### Public Portfolio Site
- **Hero Section** — animated avatar with orbiting rings, name, tagline, and CTA buttons
- **About** — bio section with profile image and personal description
- **Projects** — filterable grid (by category) with modal detail view, live/GitHub links
- **Skills** — categorized skill badges with visual indicators
- **Experience** — timeline-style work history
- **Contact** — send messages directly from the site (stored in Firestore)
- Responsive design with mobile-first breakpoints

### Admin Panel (`/admin`)
- JWT-based login via Firebase Authentication
- Protected routes — unauthenticated users see only the login screen
- Separate management tabs for: Projects, Skills, Experiences, About, Contact info, Messages
- Full CRUD — create, read, update, delete all content entities
- Unread message badge counter

---

## API Endpoints

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | List all projects |
| GET | `/api/projects/:category` | Filter projects by category |
| GET | `/api/skills` | List all skills |
| GET | `/api/skills/:category` | Filter skills by category |
| GET | `/api/experiences` | List all experiences |
| GET | `/api/about` | Get about-me content |
| POST | `/api/messages` | Submit a contact message |

### Admin (authenticated)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/login` | Admin login |
| POST | `/api/admin/projects` | Create project |
| PUT | `/api/admin/projects/:id` | Update project |
| DELETE | `/api/admin/projects/:id` | Delete project |
| POST | `/api/admin/skills` | Create skill |
| PUT | `/api/admin/skills/:id` | Update skill |
| DELETE | `/api/admin/skills/:id` | Delete skill |
| POST | `/api/admin/experiences` | Create experience |
| PUT | `/api/admin/experiences/:id` | Update experience |
| DELETE | `/api/admin/experiences/:id` | Delete experience |
| PUT | `/api/admin/about` | Update about-me |
| GET | `/api/admin/messages` | List all messages |
| PUT | `/api/admin/messages/:id/read` | Mark message as read |
| DELETE | `/api/admin/messages/:id` | Delete message |

---

## Firestore Collections

| Collection | Fields | Purpose |
|------------|--------|---------|
| `Projects` | name, type, desc, tech[], image, live, github, category, status, accent | Portfolio projects |
| `Skills` | name, category, level | Technical skills |
| `Experience` | company, role, period, desc | Work history |
| `AboutMe` | name, title, desc, profileImage | About section (single doc `profile`) |
| `Messages` | name, email, message, read | Contact form submissions |

---

## Setup

### 1. Clone and install

```bash
git clone <repo-url>
cd portfolio
cd frontend && npm install
cd ../backend && npm install
```

### 2. Firebase project

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Firestore Database** (start in test mode for development)
3. Enable **Authentication** → Sign-in method → **Email/Password**
4. Add a user (your admin account)
5. Register a **Web App** and copy the config values

### 3. Configure environment variables

**Frontend** (`frontend/.env.local` — copy from `.env.example`):

```env
VITE_API_URL=http://localhost:3001
```

**Backend** (`backend/.env` — copy from `.env.example`):

```env
PORT=3001

# Firebase Admin (from Firebase console → Project Settings → Service Accounts)
apiKey=...
authDomain=...
databaseURL=...
projectId=...
storageBucket=...
messagingSenderId=...
appId=...
measurementId=...

# Admin credentials (Firebase Auth user email/password)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-password
```

### 4. Run

```bash
# Terminal 1 — backend
cd backend
npm run dev

# Terminal 2 — frontend
cd frontend
npm run dev
```

Frontend runs at `http://localhost:5173`, backend at `http://localhost:3001`.

### 5. Build for production

```bash
cd frontend && npm run build
```

The built assets are served by the Express server from `backend/dist/`.

---

## Admin Access

1. Go to `/admin`
2. Log in with the Firebase Auth email/password configured in `.env`
3. A JWT is stored in `localStorage` and sent with all admin API requests

---

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| Primary accent | `#22d3ee` | Cyan — headings, highlights, borders |
| Secondary accent | `#7b2fff` | Purple — gradients, tags |
| Background | `#040d1a` | Near-black blue |
| Surface | `rgba(10,26,46,0.7)` | Cards, modals |
| Text primary | `white` | Headings |
| Text muted | `rgba(255,255,255,0.45)` | Body, labels |
| Font | Space Mono (monospace) | Code-like tags, labels |

---

## License

MIT