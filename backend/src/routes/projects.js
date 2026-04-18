import { Router } from 'express';
import db from '../config/firebase.js';
import {
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

const router = Router();

// GET /api/projects - Get all projects
router.get('/', async (req, res) => {
  try {
    
    const snapshot = await getDocs(collection(db, 'Projects'));
    
    const projects = [];
    snapshot.forEach(doc => {
      projects.push({ id: doc.id, ...doc.data() });
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/projects/:category - Get projects by category
router.get('/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const q = query(
      collection(db, 'Projects'),
      where('category', '==', category)
    );
    const snapshot = await getDocs(q);
    const projects = [];
    snapshot.forEach(doc => {
      projects.push({ id: doc.id, ...doc.data() });
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;