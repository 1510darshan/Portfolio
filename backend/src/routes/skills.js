import { Router } from 'express';
import db from '../config/firebase.js';
import {
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

const router = Router();

// GET /api/skills - Get all skills
router.get('/', async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, 'Skills'));
    const skills = [];
    snapshot.forEach(doc => {
      skills.push({ id: doc.id, ...doc.data() });
    });
    skills.sort((a, b) => a.order - b.order);
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/skills/:category - Get skills by category
router.get('/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const q = query(
      collection(db, 'Skills'),
      where('category', '==', category)
    );
    const snapshot = await getDocs(q);
    const skills = [];
    snapshot.forEach(doc => {
      skills.push({ id: doc.id, ...doc.data() });
    });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;