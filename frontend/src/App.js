import React from 'react';
import './App.css';
import Hero from './components/Hero';
import Features from './components/Features';
import Architecture from './components/Architecture';
import Demo from './components/Demo';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Hero />
      <Features />
      <Architecture />
      <Demo />
      <Footer />
    </div>
  );
}

export default App;