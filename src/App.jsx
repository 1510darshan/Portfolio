import './App.css';
import Navbar from './components/Navbar';
import Hero from './pages/Hero/Hero';
import About from './pages/About/About';
import Projects from './pages/Projects/Projects';
import Skills from './pages/Skills/Skills';
import Experience from './pages/Experience/Experience';
import Contact from './pages/Contact/Contact';

function App() {
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
  )
}

export default App