import { Router } from 'express';
import db from '../config/firebase.js';
import {
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

const router = Router();

// POST /api/messages - Send a contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Name, email, and message are required',
      });
    }

    const docRef = await addDoc(collection(db, 'Messages'), {
      name,
      email,
      subject: subject || '',
      message,
      timestamp: serverTimestamp(),
      read: false,
    });

    res.json({
      id: docRef.id,
      message: 'Message sent successfully',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;