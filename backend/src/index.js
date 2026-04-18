import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import projectsRouter from './routes/projects.js';
import skillsRouter from './routes/skills.js';
import experiencesRouter from './routes/experiences.js';
import messagesRouter from './routes/messages.js';
import aboutRouter from './routes/about.js';
import adminRouter from './routes/admin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app  = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://localhost:3000',
    'https://portfolio-swart-theta-iljumjifai.vercel.app/'
  ],
  credentials: true,
}));
app.use(express.json());

// API Routes
app.use('/api/projects',     projectsRouter);
app.use('/api/skills',       skillsRouter);
app.use('/api/experiences',  experiencesRouter);
app.use('/api/messages',     messagesRouter);
app.use('/api/about',        aboutRouter);
app.use('/api/admin',        adminRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── Serve React dist ──────────────────────────────────────────
const distPath = path.resolve(__dirname, '../dist');   // src/index.js → backend/dist
app.use(express.static(distPath));

// For any non-API route, serve index.html (client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});