
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Pages/Navbar/Navbar";
import Hero from './components/Pages/Hero';
import Speciality from './components/Pages/Speciality';
import Projects from './components/Pages/Projects';
import About from './components/Pages/About';
import Contact from './components/Pages/Contact';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import PrivateRoute from './admin/PrivateRoute';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Portfolio Routes */}
        <Route path="/" element={
          <div>
            <Navbar />
            <Hero />
            <Speciality />
            <Projects />
            <About />
            <Contact />
          </div>
        } />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard/*" element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
