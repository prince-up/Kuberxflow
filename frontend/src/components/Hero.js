import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-particles">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              animate={{
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        className="hero-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero-content" variants={itemVariants}>
          <motion.div className="hero-badge" variants={itemVariants}>
            <span className="badge-text">🚀 Production Ready</span>
          </motion.div>

          <motion.h1 className="hero-title" variants={itemVariants}>
            Kube<span className="highlight">Flow</span>X
          </motion.h1>

          <motion.p className="hero-subtitle" variants={itemVariants}>
            Enterprise-grade Kubernetes platform with intelligent auto-scaling,
            self-healing capabilities, and comprehensive monitoring.
          </motion.p>

          <motion.div className="hero-metrics" variants={itemVariants}>
            <div className="metric">
              <div className="metric-value">99.9%</div>
              <div className="metric-label">Uptime SLA</div>
            </div>
            <div className="metric">
              <div className="metric-value">&lt;1s</div>
              <div className="metric-label">Recovery</div>
            </div>
            <div className="metric">
              <div className="metric-value">10x</div>
              <div className="metric-label">Auto-scaling</div>
            </div>
          </motion.div>

          <motion.div className="hero-actions" variants={itemVariants}>
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Deploy Now</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>

            <motion.button
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View Demo</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M15 10L11 14L9 12M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          variants={floatingVariants}
          animate="animate"
        >
          <div className="cluster-container">
            <motion.div
              className="cluster-core"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="core-node">
                <div className="node-icon">🎯</div>
                <div className="node-label">Control Plane</div>
              </div>
            </motion.div>

            <div className="cluster-nodes">
              {[
                { icon: '⚡', label: 'Worker 1', delay: 0 },
                { icon: '🚀', label: 'Worker 2', delay: 1 },
                { icon: '🔥', label: 'Worker 3', delay: 2 }
              ].map((node, index) => (
                <motion.div
                  key={index}
                  className="cluster-node"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: node.delay
                  }}
                >
                  <div className="node-icon">{node.icon}</div>
                  <div className="node-label">{node.label}</div>
                  <div className="node-status active"></div>
                </motion.div>
              ))}
            </div>

            <svg className="cluster-connections" viewBox="0 0 400 300">
              <motion.path
                d="M200 150 L120 100"
                stroke="url(#gradient1)"
                strokeWidth="2"
                fill="none"
                animate={{ pathLength: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.path
                d="M200 150 L280 100"
                stroke="url(#gradient1)"
                strokeWidth="2"
                fill="none"
                animate={{ pathLength: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              />
              <motion.path
                d="M200 150 L200 220"
                stroke="url(#gradient1)"
                strokeWidth="2"
                fill="none"
                animate={{ pathLength: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 2 }}
              />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#667eea" stopOpacity="0.3"/>
                  <stop offset="50%" stopColor="#764ba2" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#667eea" stopOpacity="0.3"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-scroll"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="scroll-text">Scroll to explore</div>
        <div className="scroll-arrow">↓</div>
      </motion.div>
    </section>
  );
};

export default Hero;