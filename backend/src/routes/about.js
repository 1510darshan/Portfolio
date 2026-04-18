import { Router } from 'express';
import db from '../config/firebase.js';
import { collection, doc, getDoc } from 'firebase/firestore';

const router = Router();

// GET /api/about - Get about me profile
router.get('/', async (req, res) => {
  try {
    
    const docRef = doc(db, 'AboutMe', 'profile');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      res.json(docSnap.data());
    } else {
      res.json(null);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;