import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import projectsRouter from './routes/projects.js';
import skillsRouter from './routes/skills.js';
import experiencesRouter from './routes/experiences.js';
import messagesRouter from './routes/messages.js';
import aboutRouter from './routes/about.js';
import adminRouter from './routes/admin.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173", 
    "http://localhost:3000",
    "https://portfolio-darshans-projects-70687de6.vercel.app/"
  ],
  credentials: true,
}));
app.use(express.json());

// Public Routes
app.use('/api/projects', projectsRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/experiences', experiencesRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/about', aboutRouter);

// Admin Routes (protected)
app.use('/api/admin', adminRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  
  
});
