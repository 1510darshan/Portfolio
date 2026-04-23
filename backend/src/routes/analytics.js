// routes/analytics.js
import { Router } from 'express';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { authenticateToken } from '../middleware/auth.js';
import db from '../config/firebase.js';

const router = Router();

// POST /api/analytics  — track a visit or interaction (public, no auth)
router.post('/', async (req, res) => {
  try {
    const { type, section, Project, NavTab } = req.body;

    if (!type) return res.status(400).json({ error: 'type is required' });


    if (Project) {
      await addDoc(collection(db, 'Analytics'), {
        type,                      // 'visit' | 'interaction'
        Project: Project || null,  // e.g. 'home', 'projects', 'contact-form'
        timestamp: serverTimestamp(),
      });
    } else if (NavTab) {
      await addDoc(collection(db, 'Analytics'), {
        type,                     
        NavTab: NavTab || null,  
        timestamp: serverTimestamp(),
      });
    } else {
      await addDoc(collection(db, 'Analytics'), {
        type,                  
        section: section || null,  
        timestamp: serverTimestamp(),
      });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error('Analytics POST error:', err);
    res.status(500).json({ error: err.message });
  }
});


export default router;