
import React from 'react'
import Navbar from "./components/Pages/Navbar/Navbar";
import Hero from './components/Pages/Hero';
import Speciality from './components/Pages/Speciality';
import Projects from './components/Pages/Projects';
import About from './components/Pages/About';
import Contact from './components/Pages/Contact';

import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Speciality />
      <Projects />
      <About />
      <Contact />
    </div>
    
  );
}

export default App;
