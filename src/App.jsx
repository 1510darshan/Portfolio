import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './pages/Hero/Hero';
import About from './pages/About/About';
import Projects from './pages/Projects/Projects';
import Skills from './pages/Skills/Skills';
import Experience from './pages/Experience/Experience';
import Contact from './pages/Contact/Contact';
import Admin from './pages/Admin/Admin';
import AdminLogin from './pages/Admin/AdminLogin';

function Portfolio() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </>
  );
}

function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAdminAuthenticated(true);
    }
  }, []);

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAdminAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route
          path="/admin"
          element={
            isAdminAuthenticated ? (
              <Admin onLogout={handleAdminLogout} />
            ) : (
              <AdminLogin onLogin={handleAdminLogin} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;