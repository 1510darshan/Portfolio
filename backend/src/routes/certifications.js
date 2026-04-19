import { Router } from 'express';
import db from '../config/firebase.js';
import { collection, getDocs } from 'firebase/firestore';

const router = Router();

// GET /api/certifications
router.get('/', async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, 'Certifications'));
    const certifications = [];
    snapshot.forEach(doc => {
      certifications.push({ id: doc.id, ...doc.data() });
    });
    certifications.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
    res.json(certifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;