import React from 'react';
import { motion } from 'framer-motion';
import { Server, Database, Cloud, Lock, Settings, Activity } from 'lucide-react';
import './Architecture.css';

const Architecture = () => {
  const steps = [
    {
      icon: <Cloud />,
      title: "Ingress Gateway",
      desc: "Smart traffic routing and global load balancing."
    },
    {
      icon: <Lock />,
      title: "Security Mesh",
      desc: "Zero-trust network policy and mTLS encryption."
    },
    {
      icon: <Server />,
      title: "Service Plane",
      desc: "High-available microservices orchestration."
    },
    {
      icon: <Database />,
      title: "State Store",
      desc: "Distributed persistent storage with auto-backup."
    }
  ];

  return (
    <section className="architecture section-padding" id="architecture">
      <div className="container">
        <div className="architecture-layout">
          <div className="architecture-info">
            <span className="section-badge">How it works</span>
            <h2 className="section-title">Built for the <span className="text-gradient">Modern Edge</span></h2>
            <p className="section-subtitle">
              Our architecture is designed from the ground up to handle high-concurrency 
              workloads with sub-millisecond latency.
            </p>

            <div className="arch-steps">
              {steps.map((step, i) => (
                <motion.div 
                  key={i} 
                  className="arch-step"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="step-number glass">{i + 1}</div>
                  <div className="step-content">
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="architecture-visual">
            <div className="visual-core glass-card">
              <div className="core-glow"></div>
              <Settings size={48} className="spin-icon" />
              <span>Control Plane</span>
            </div>

            <div className="visual-nodes">
              <motion.div 
                className="visual-node glass-card vn1"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Activity size={24} color="var(--primary)" />
                <span>Monitoring</span>
              </motion.div>
              <motion.div 
                className="visual-node glass-card vn2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Lock size={24} color="#10b981" />
                <span>Security</span>
              </motion.div>
              <motion.div 
                className="visual-node glass-card vn3"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <Database size={24} color="#f59e0b" />
                <span>Storage</span>
              </motion.div>
            </div>

            <svg className="arch-lines" viewBox="0 0 400 400">
              <motion.line 
                x1="200" y1="200" x2="300" y2="100" 
                stroke="rgba(255,255,255,0.1)" strokeWidth="2" 
                strokeDasharray="5,5"
              />
              <motion.line 
                x1="200" y1="200" x2="100" y2="300" 
                stroke="rgba(255,255,255,0.1)" strokeWidth="2" 
                strokeDasharray="5,5"
              />
              <motion.line 
                x1="200" y1="200" x2="300" y2="300" 
                stroke="rgba(255,255,255,0.1)" strokeWidth="2" 
                strokeDasharray="5,5"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Architecture;