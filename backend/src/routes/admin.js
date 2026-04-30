import { Router } from 'express';
import {
  collection,
  addDoc,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';
import { authenticateToken, generateToken } from '../middleware/auth.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import db, { auth } from '../config/firebase.js';

const router = Router();

// POST /api/admin/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = generateToken({ role: 'admin', uid: userCredential.user.uid });
    res.json({ token });
  } catch (error) {
    console.error('Login error code:', error.code);
    console.error('Login error message:', error.message);

    const authErrors = {
      'auth/user-not-found':         { status: 401, message: 'No account found with this email' },
      'auth/wrong-password':         { status: 401, message: 'Incorrect password' },
      'auth/invalid-credential':     { status: 401, message: 'Invalid email or password' },
      'auth/invalid-email':          { status: 400, message: 'Invalid email format' },
      'auth/user-disabled':          { status: 403, message: 'This account has been disabled' },
      'auth/too-many-requests':      { status: 429, message: 'Too many attempts. Please try again later' },
      'auth/network-request-failed': { status: 503, message: 'Network error. Please check your connection' },
      'auth/configuration-not-found':{ status: 500, message: 'Auth service misconfigured' },
    };

    const known = authErrors[error.code];
    if (known) {
      return res.status(known.status).json({ error: known.message });
    }

    res.status(500).json({ error: 'Login failed. Please try again later' });
  }
});

// All admin routes below require authentication
router.use(authenticateToken);

// ── Projects ──────────────────────────────────────────────────
router.post('/projects', async (req, res) => {
  try {
    const docRef = await addDoc(collection(db, 'Projects'), req.body);
    res.json({ id: docRef.id });
  } catch (error) {
    console.error('POST /projects error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.put('/projects/:id', async (req, res) => {
  try {
    await setDoc(doc(db, 'Projects', req.params.id), req.body, { merge: true });
    res.json({ message: 'Project updated' });
  } catch (error) {
    console.error('PUT /projects/:id error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.delete('/projects/:id', async (req, res) => {
  try {
    await deleteDoc(doc(db, 'Projects', req.params.id));
    res.json({ message: 'Project deleted' });
  } catch (error) {
    console.error('DELETE /projects/:id error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ── Skills ─────────────────────────────────────────────────────
router.post('/skills', async (req, res) => {
  try {
    const docRef = await addDoc(collection(db, 'Skills'), req.body);
    res.json({ id: docRef.id });
  } catch (error) {
    console.error('POST /skills error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.put('/skills/:id', async (req, res) => {
  try {
    await setDoc(doc(db, 'Skills', req.params.id), req.body, { merge: true });
    res.json({ message: 'Skill updated' });
  } catch (error) {
    console.error('PUT /skills/:id error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.delete('/skills/:id', async (req, res) => {
  try {
    await deleteDoc(doc(db, 'Skills', req.params.id));
    res.json({ message: 'Skill deleted' });
  } catch (error) {
    console.error('DELETE /skills/:id error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ── Experiences ────────────────────────────────────────────────
router.post('/experiences', async (req, res) => {
  try {
    const docRef = await addDoc(collection(db, 'Experience'), req.body);
    res.json({ id: docRef.id });
  } catch (error) {
    console.error('POST /experiences error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.put('/experiences/:id', async (req, res) => {
  try {
    await setDoc(doc(db, 'Experience', req.params.id), req.body, { merge: true });
    res.json({ message: 'Experience updated' });
  } catch (error) {
    console.error('PUT /experiences/:id error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.delete('/experiences/:id', async (req, res) => {
  try {
    await deleteDoc(doc(db, 'Experience', req.params.id));
    res.json({ message: 'Experience deleted' });
  } catch (error) {
    console.error('DELETE /experiences/:id error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ── About ─────────────────────────────────────────────────────
router.put('/about', async (req, res) => {
  try {
    await setDoc(doc(db, 'AboutMe', 'profile'), req.body, { merge: true });
    res.json({ message: 'About updated' });
  } catch (error) {
    console.error('PUT /about error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ── Messages ───────────────────────────────────────────────────
router.get('/messages', async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, 'Messages'));
    const messages = [];
    snapshot.forEach(d => messages.push({ id: d.id, ...d.data() }));
    res.json(messages);
  } catch (error) {
    console.error('GET /messages error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.put('/messages/:id/read', async (req, res) => {
  try {
    await setDoc(doc(db, 'Messages', req.params.id), { read: true }, { merge: true });
    res.json({ message: 'Message marked as read' });
  } catch (error) {
    console.error('PUT /messages/:id/read error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.delete('/messages/:id', async (req, res) => {
  try {
    await deleteDoc(doc(db, 'Messages', req.params.id));
    res.json({ message: 'Message deleted' });
  } catch (error) {
    console.error('DELETE /messages/:id error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ── Education ──────────────────────────────────────────────────
router.post('/education', async (req, res) => {
  try {
    const docRef = await addDoc(collection(db, 'Education'), req.body);
    res.json({ id: docRef.id });
  } catch (error) {
    console.error('POST /education error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.put('/education/:id', async (req, res) => {
  try {
    await setDoc(doc(db, 'Education', req.params.id), req.body, { merge: true });
    res.json({ message: 'Education updated' });
  } catch (error) {
    console.error('PUT /education/:id error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.delete('/education/:id', async (req, res) => {
  try {
    await deleteDoc(doc(db, 'Education', req.params.id));
    res.json({ message: 'Education deleted' });
  } catch (error) {
    console.error('DELETE /education/:id error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ── Certifications ─────────────────────────────────────────────
router.post('/certifications', async (req, res) => {
  try {
    const docRef = await addDoc(collection(db, 'Certifications'), req.body);
    res.json({ id: docRef.id });
  } catch (error) {
    console.error('POST /certifications error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.put('/certifications/:id', async (req, res) => {
  try {
    await setDoc(doc(db, 'Certifications', req.params.id), req.body, { merge: true });
    res.json({ message: 'Certification updated' });
  } catch (error) {
    console.error('PUT /certifications/:id error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.delete('/certifications/:id', async (req, res) => {
  try {
    await deleteDoc(doc(db, 'Certifications', req.params.id));
    res.json({ message: 'Certification deleted' });
  } catch (error) {
    console.error('DELETE /certifications/:id error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ── Analytics ──────────────────────────────────────────────────
router.get('/analytics', async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, 'Analytics'));
    const events = [];
    snapshot.forEach(d => events.push({ id: d.id, ...d.data() }));

    // Sort newest first
    events.sort((a, b) => {
      const getMs = (ts) => {
        if (!ts) return 0;
        if (ts?.toDate) return ts.toDate().getTime();
        if (typeof ts === 'object' && ts.seconds) return ts.seconds * 1000;
        return 0;
      };
      return getMs(b.timestamp) - getMs(a.timestamp);
    });

    res.json(events);
  } catch (error) {
    console.error('GET /analytics error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;