import React from 'react';
import { motion } from 'framer-motion';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: '🔄',
      title: 'Self-Healing',
      description: 'Intelligent liveness and readiness probes ensure automatic recovery from failures with zero downtime.',
      gradient: 'from-blue-500 to-purple-600',
      stats: '99.9% Uptime'
    },
    {
      icon: '📈',
      title: 'Smart Scaling',
      description: 'AI-powered horizontal pod autoscaling based on CPU, memory, and custom metrics for optimal performance.',
      gradient: 'from-green-500 to-teal-600',
      stats: '10x Performance'
    },
    {
      icon: '📊',
      title: 'Observability',
      description: 'Comprehensive monitoring stack with Prometheus metrics, Grafana dashboards, and real-time alerting.',
      gradient: 'from-orange-500 to-red-600',
      stats: '360° Visibility'
    },
    {
      icon: '🐳',
      title: 'Container Optimized',
      description: 'Multi-stage Docker builds with security scanning, vulnerability assessment, and performance optimization.',
      gradient: 'from-cyan-500 to-blue-600',
      stats: '50% Smaller Images'
    },
    {
      icon: '⚡',
      title: 'High Performance',
      description: 'FastAPI backend with async processing, caching layers, and optimized database connections.',
      gradient: 'from-yellow-500 to-orange-600',
      stats: '<10ms Response'
    },
    {
      icon: '🔒',
      title: 'Enterprise Security',
      description: 'End-to-end encryption, RBAC, audit logging, and compliance with industry security standards.',
      gradient: 'from-purple-500 to-pink-600',
      stats: 'Zero Trust'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <section className="features">
      <div className="features-background">
        <div className="features-gradient"></div>
      </div>

      <div className="features-container">
        <motion.div
          className="features-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="section-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span>✨ Features</span>
          </motion.div>

          <h2>Enterprise-Grade Capabilities</h2>
          <p>
            Built for production environments with industry-leading reliability,
            security, and performance standards.
          </p>
        </motion.div>

        <motion.div
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="feature-header">
                <motion.div
                  className="feature-icon"
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <span className="icon-emoji">{feature.icon}</span>
                  <div className="icon-glow"></div>
                </motion.div>

                <div className="feature-stats">
                  {feature.stats}
                </div>
              </div>

              <div className="feature-content">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>

              <div className="feature-footer">
                <motion.div
                  className="feature-gradient"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  viewport={{ once: true }}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="features-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="cta-content">
            <h3>Ready to Deploy?</h3>
            <p>Get started with KubeFlowX in minutes</p>
            <motion.button
              className="cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Start Free Trial</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;