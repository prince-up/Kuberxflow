import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Cpu, Globe, BarChart3, Layers } from 'lucide-react';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: <Activity size={32} />,
      title: "Intelligent Auto-Scaling",
      description: "Dynamically adjust cluster resources based on real-time traffic patterns and predictive analysis.",
      color: "#6366f1"
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Proactive Self-Healing",
      description: "Automatic detection and recovery of failed nodes or pods before users experience any downtime.",
      color: "#10b981"
    },
    {
      icon: <Cpu size={32} />,
      title: "Resource Optimization",
      description: "Advanced bin-packing algorithms to maximize CPU/Memory utilization and reduce cloud costs.",
      color: "#f59e0b"
    },
    {
      icon: <Globe size={32} />,
      title: "Multi-Cloud Mesh",
      description: "Seamlessly orchestrate workloads across AWS, GCP, and Azure with a single unified interface.",
      color: "#06b6d4"
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Deep Observability",
      description: "Full-stack monitoring with eBPF-powered metrics and distributed tracing out of the box.",
      color: "#ec4899"
    },
    {
      icon: <Layers size={32} />,
      title: "Zero-Downtime Updates",
      description: "Automated canary and blue-green deployments with built-in rollback capabilities.",
      color: "#8b5cf6"
    }
  ];

  return (
    <section className="features section-padding" id="features">
      <div className="container">
        <div className="section-header">
          <motion.span 
            className="section-badge"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Capabilities
          </motion.span>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Engineered for <span className="text-gradient">Reliability</span>
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Scale your infrastructure with enterprise-grade tools designed to handle 
            millions of requests with absolute precision.
          </motion.p>
        </div>

        <div className="features-grid">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="feature-card glass-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ 
                rotateX: -5, 
                rotateY: 5, 
                z: 20,
                transition: { duration: 0.2 } 
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div 
                className="feature-icon" 
                style={{ '--icon-color': feature.color }}
              >
                {feature.icon}
                <div className="icon-glow"></div>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <div className="feature-link">
                Learn more <ChevronRight size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ChevronRight = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

export default Features;