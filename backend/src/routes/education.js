import { Router } from 'express';
import db from '../config/firebase.js';
import { collection, getDocs } from 'firebase/firestore';

const router = Router();

// GET /api/education
router.get('/', async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, 'Education'));
    const education = [];
    snapshot.forEach(doc => {
      education.push({ id: doc.id, ...doc.data() });
    });
    education.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;