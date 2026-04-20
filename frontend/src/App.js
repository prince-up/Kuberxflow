import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Architecture from './components/Architecture';
import Demo from './components/Demo';
import Footer from './components/Footer';
import DemoPage from './pages/DemoPage';

const HomePage = () => (
  <>
    <Navbar />
    <Hero />
    <Features />
    <Architecture />
    <Demo />
    <Footer />
  </>
);

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stagger: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <Router>
      <div className="App">
        <motion.div className="scroll-progress" style={{ scaleX }} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/demo" element={<DemoPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;