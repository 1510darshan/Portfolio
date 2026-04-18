import { Router } from 'express';
import db from '../config/firebase.js';
import { collection, getDocs } from 'firebase/firestore';

const router = Router();

// GET /api/experiences - Get all experiences
router.get('/', async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, 'Experience'));
    const experiences = [];
    snapshot.forEach(doc => {
      experiences.push({ id: doc.id, ...doc.data() });
    });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;