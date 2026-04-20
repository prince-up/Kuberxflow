import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, ChevronRight, Activity, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const [liveMetrics, setLiveMetrics] = useState({ cpu: 0, status: 'connecting...' });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const apiBase = `http://${window.location.hostname}:8000`;
        const response = await fetch(`${apiBase}/cpu`);
        const data = await response.json();
        setLiveMetrics({ 
          cpu: Math.round(data.cpu_usage_percent), 
          status: 'live' 
        });
      } catch (err) {
        setLiveMetrics(prev => ({ ...prev, status: 'offline' }));
      }
    };
    
    const interval = setInterval(fetchStats, 2000);
    fetchStats();
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-grid"></div>

      <motion.div
        className="container hero-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hero-content">
          <motion.div className="hero-badge-wrapper" variants={itemVariants}>
            <div className="flex-badges">
              <div className="hero-badge glass">
                <span className="badge-dot"></span>
                <span className="badge-text">v2.0 Now Available</span>
                <ChevronRight size={14} className="badge-arrow" />
              </div>
              
              <div className={`live-status-badge glass ${liveMetrics.status}`}>
                 <Activity size={12} className="pulse-icon" />
                 <span>{liveMetrics.status === 'live' ? `Live CPU: ${liveMetrics.cpu}%` : 'System Offline'}</span>
              </div>
            </div>
          </motion.div>

          <motion.h1 className="hero-title" variants={itemVariants}>
            Automate Your <br />
            <span className="text-gradient">Kubernetes</span> Workflow
          </motion.h1>

          <motion.p className="hero-subtitle" variants={itemVariants}>
            The enterprise-grade platform for intelligent auto-scaling,
            proactive self-healing, and real-time observability.
            Deploy with confidence, scale with ease.
          </motion.p>

          <motion.div className="hero-btns" variants={itemVariants}>
            <Link to="/demo">
              <button className="btn-primary-lg">
                Get Started for Free <ChevronRight size={18} />
              </button>
            </Link>
            <Link to="/demo">
              <button className="btn-secondary-lg glass">
                Watch Demo
              </button>
            </Link>
          </motion.div>

          <motion.div className="hero-trust" variants={itemVariants}>
            <p>Trusted by modern engineering teams</p>
            <div className="trust-logos">
              <div className="trust-logo">STARK</div>
              <div className="trust-logo">OSCORP</div>
              <div className="trust-logo">WAYNE</div>
              <div className="trust-logo">CYBERDYNE</div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero-media-laptop"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="laptop-wrapper">
            <div className="laptop-glow"></div>
            <img 
              src="/images/laptop-mockup.png" 
              alt="Kuberxflow Dashboard" 
              className="laptop-image" 
            />
            
            {/* Real-time Data Particles */}
            <motion.div 
              className="data-particle"
              style={{"--particle-color": "var(--primary)"}}
              animate={{ 
                x: [-100, 200], 
                y: [200, -200],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Zap size={14} />
            </motion.div>
          </div>

          <div className="floating-elements">
            <motion.div
              className="floating-card glass c1"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="card-icon zap">
                <Zap size={20} />
              </div>
              <div className="card-info">
                <h6>Auto-Scaled</h6>
                <span className="text-accent">+240% throughput</span>
              </div>
            </motion.div>

            <motion.div
              className="floating-card glass c2"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <div className="card-icon shield">
                <Shield size={20} />
              </div>
              <div className="card-info">
                <h6>Self-Healed</h6>
                <span className="text-success">Node-7 recovered</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;