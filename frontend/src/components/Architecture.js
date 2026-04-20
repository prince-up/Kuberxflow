import React from 'react';
import { motion } from 'framer-motion';
import './Architecture.css';

const Architecture = () => {
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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.5
      }
    }
  };

  return (
    <section className="architecture">
      <div className="architecture-container">
        <motion.div
          className="architecture-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>How It Works</h2>
          <p>From development to production - seamless Kubernetes deployment and scaling</p>
        </motion.div>

        <motion.div
          className="architecture-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="architecture-text" variants={itemVariants}>
            <div className="text-section">
              <h3>🚀 Development Environment</h3>
              <p>
                Start with your FastAPI application running locally on your development machine.
                Our platform provides intelligent monitoring and health checks to ensure your
                application is ready for deployment.
              </p>
              <div className="feature-list">
                <div className="feature-item">
                  <span className="feature-icon">💻</span>
                  <span>Local development with hot reload</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🔍</span>
                  <span>Built-in health monitoring</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📊</span>
                  <span>Real-time performance metrics</span>
                </div>
              </div>
            </div>

            <div className="text-section">
              <h3>☸️ Kubernetes Orchestration</h3>
              <p>
                Deploy to Kubernetes with automated containerization, service discovery,
                and load balancing. Our platform handles the complexity of Kubernetes
                manifests and ensures high availability.
              </p>
              <div className="feature-list">
                <div className="feature-item">
                  <span className="feature-icon">🐳</span>
                  <span>Automated Docker containerization</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🔄</span>
                  <span>Service discovery and load balancing</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🛡️</span>
                  <span>Built-in security and networking</span>
                </div>
              </div>
            </div>

            <div className="text-section">
              <h3>📈 Auto-Scaling & Monitoring</h3>
              <p>
                Experience true cloud-native scaling with horizontal pod autoscaling
                based on CPU utilization. Comprehensive monitoring with Prometheus
                and beautiful dashboards with Grafana.
              </p>
              <div className="feature-list">
                <div className="feature-item">
                  <span className="feature-icon">⚡</span>
                  <span>Horizontal Pod Autoscaling (HPA)</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📈</span>
                  <span>Real-time metrics collection</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🎯</span>
                  <span>Custom dashboards and alerts</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="architecture-visual" variants={imageVariants}>
            <div className="visual-container">
              {/* Development Laptop */}
              <motion.div
                className="device laptop"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="device-screen">
                  <div className="screen-content">
                    <div className="code-editor">
                      <div className="code-line">from fastapi import FastAPI</div>
                      <div className="code-line">app = FastAPI()</div>
                      <div className="code-line highlight">@app.get("/health")</div>
                      <div className="code-line">def health_check():</div>
                      <div className="code-line indent">return &#123;"status": "healthy"&#125;</div>
                    </div>
                    <div className="status-indicator">
                      <span className="status-dot healthy"></span>
                      <span className="status-text">Running</span>
                    </div>
                  </div>
                </div>
                <div className="device-label">Developer Laptop</div>
              </motion.div>

              {/* Connection Arrow */}
              <div className="connection-arrow">
                <div className="arrow-line"></div>
                <div className="arrow-head">▶</div>
                <div className="connection-label">Deploy</div>
              </div>

              {/* Kubernetes Cluster */}
              <motion.div
                className="device cluster"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="cluster-nodes">
                  <div className="node master">
                    <div className="node-icon">🎛️</div>
                    <div className="node-label">Master</div>
                    <div className="node-status healthy">●</div>
                  </div>
                  <div className="node worker">
                    <div className="node-icon">⚙️</div>
                    <div className="node-label">Worker 1</div>
                    <div className="node-status healthy">●</div>
                  </div>
                  <div className="node worker">
                    <div className="node-icon">⚙️</div>
                    <div className="node-label">Worker 2</div>
                    <div className="node-status healthy">●</div>
                  </div>
                  <div className="node worker">
                    <div className="node-icon">⚙️</div>
                    <div className="node-label">Worker 3</div>
                    <div className="node-status scaling">●</div>
                  </div>
                </div>
                <div className="cluster-pods">
                  <div className="pod active">
                    <div className="pod-icon">📦</div>
                    <div className="pod-metrics">CPU: 45%</div>
                  </div>
                  <div className="pod active">
                    <div className="pod-icon">📦</div>
                    <div className="pod-metrics">CPU: 67%</div>
                  </div>
                  <div className="pod scaling">
                    <div className="pod-icon">📦</div>
                    <div className="pod-metrics">Scaling...</div>
                  </div>
                </div>
                <div className="device-label">Kubernetes Cluster</div>
              </motion.div>

              {/* Connection Arrow */}
              <div className="connection-arrow">
                <div className="arrow-line"></div>
                <div className="arrow-head">▶</div>
                <div className="connection-label">Monitor</div>
              </div>

              {/* Monitoring Dashboard */}
              <motion.div
                className="device dashboard"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="dashboard-screen">
                  <div className="dashboard-header">
                    <div className="dashboard-title">System Metrics</div>
                    <div className="dashboard-status">
                      <span className="status-indicator healthy">●</span>
                      All Systems Operational
                    </div>
                  </div>
                  <div className="dashboard-charts">
                    <div className="chart cpu-chart">
                      <div className="chart-label">CPU Usage</div>
                      <div className="chart-bar">
                        <div className="chart-fill" style={{width: '65%'}}></div>
                      </div>
                      <div className="chart-value">65%</div>
                    </div>
                    <div className="chart memory-chart">
                      <div className="chart-label">Memory</div>
                      <div className="chart-bar">
                        <div className="chart-fill" style={{width: '42%'}}></div>
                      </div>
                      <div className="chart-value">42%</div>
                    </div>
                    <div className="chart pods-chart">
                      <div className="chart-label">Active Pods</div>
                      <div className="chart-bar">
                        <div className="chart-fill" style={{width: '80%'}}></div>
                      </div>
                      <div className="chart-value">8/10</div>
                    </div>
                  </div>
                </div>
                <div className="device-label">Monitoring Dashboard</div>
              </motion.div>
            </div>

            <div className="workflow-steps">
              <div className="step active">
                <div className="step-number">1</div>
                <div className="step-text">Develop Locally</div>
              </div>
              <div className="step-connector"></div>
              <div className="step active">
                <div className="step-number">2</div>
                <div className="step-text">Deploy to K8s</div>
              </div>
              <div className="step-connector"></div>
              <div className="step active">
                <div className="step-number">3</div>
                <div className="step-text">Auto-Scale</div>
              </div>
              <div className="step-connector"></div>
              <div className="step active">
                <div className="step-number">4</div>
                <div className="step-text">Monitor & Alert</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Architecture;