import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Demo.css';

const Demo = () => {
  const [metrics, setMetrics] = useState({
    cpu: 45,
    pods: 3,
    responseTime: 120,
    memory: 68,
    network: 2.4,
    errors: 0
  });

  const [logs, setLogs] = useState([
    { id: 1, time: '14:32:15', level: 'INFO', message: 'Pod kube-system/metrics-server started successfully' },
    { id: 2, time: '14:32:12', level: 'INFO', message: 'HorizontalPodAutoscaler scaled deployment' },
    { id: 3, time: '14:32:08', level: 'INFO', message: 'Readiness probe passed for pod-abc123' },
  ]);

  const [isScaling, setIsScaling] = useState(false);
  const [activeTab, setActiveTab] = useState('metrics');

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpu: Math.max(20, Math.min(90, prev.cpu + (Math.random() - 0.5) * 15)),
        pods: Math.max(1, Math.min(8, prev.pods + (Math.random() > 0.85 ? (Math.random() > 0.5 ? 1 : -1) : 0))),
        responseTime: Math.max(50, Math.min(300, prev.responseTime + (Math.random() - 0.5) * 40)),
        memory: Math.max(30, Math.min(95, prev.memory + (Math.random() - 0.5) * 10)),
        network: Math.max(0.5, Math.min(10, prev.network + (Math.random() - 0.5) * 1)),
        errors: Math.random() > 0.95 ? Math.floor(Math.random() * 3) : 0
      }));

      // Add new log occasionally
      if (Math.random() > 0.7) {
        const logTypes = [
          { level: 'INFO', messages: [
            'Health check passed for all pods',
            'Autoscaling triggered - increasing replicas',
            'Metrics collected successfully',
            'Load balancer updated'
          ]},
          { level: 'WARN', messages: [
            'High CPU usage detected',
            'Memory threshold approaching',
            'Network latency increased'
          ]},
          { level: 'ERROR', messages: [
            'Pod restart triggered',
            'Service unavailable temporarily'
          ]}
        ];

        const randomType = logTypes[Math.floor(Math.random() * logTypes.length)];
        const randomMessage = randomType.messages[Math.floor(Math.random() * randomType.messages.length)];

        const newLog = {
          id: Date.now(),
          time: new Date().toLocaleTimeString(),
          level: randomType.level,
          message: randomMessage
        };

        setLogs(prev => [newLog, ...prev.slice(0, 4)]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleScaleUp = () => {
    setIsScaling(true);
    setMetrics(prev => ({ ...prev, pods: Math.min(8, prev.pods + 1) }));
    setTimeout(() => setIsScaling(false), 2000);
  };

  const handleRestart = () => {
    const newLog = {
      id: Date.now(),
      time: new Date().toLocaleTimeString(),
      level: 'WARN',
      message: 'Manual pod restart initiated'
    };
    setLogs(prev => [newLog, ...prev.slice(0, 4)]);
  };

  const getStatusColor = (value, thresholds) => {
    if (value >= thresholds.high) return '#ef4444';
    if (value >= thresholds.medium) return '#f59e0b';
    return '#10b981';
  };

  const getStatusClass = (value, thresholds) => {
    if (value >= thresholds.high) return 'critical';
    if (value >= thresholds.medium) return 'warning';
    return 'normal';
  };

  const metricCards = [
    {
      label: 'CPU Usage',
      value: `${metrics.cpu.toFixed(1)}%`,
      icon: '⚡',
      thresholds: { medium: 70, high: 85 },
      color: getStatusColor(metrics.cpu, { medium: 70, high: 85 })
    },
    {
      label: 'Active Pods',
      value: metrics.pods,
      icon: '📦',
      thresholds: { medium: 6, high: 8 },
      color: getStatusColor(metrics.pods, { medium: 6, high: 8 })
    },
    {
      label: 'Response Time',
      value: `${metrics.responseTime.toFixed(0)}ms`,
      icon: '⏱️',
      thresholds: { medium: 200, high: 250 },
      color: getStatusColor(metrics.responseTime, { medium: 200, high: 250 })
    },
    {
      label: 'Memory',
      value: `${metrics.memory.toFixed(1)}%`,
      icon: '🧠',
      thresholds: { medium: 80, high: 90 },
      color: getStatusColor(metrics.memory, { medium: 80, high: 90 })
    },
    {
      label: 'Network I/O',
      value: `${metrics.network.toFixed(1)}MB/s`,
      icon: '🌐',
      thresholds: { medium: 5, high: 8 },
      color: getStatusColor(metrics.network, { medium: 5, high: 8 })
    },
    {
      label: 'Error Rate',
      value: metrics.errors,
      icon: '🚨',
      thresholds: { medium: 1, high: 2 },
      color: getStatusColor(metrics.errors, { medium: 1, high: 2 })
    }
  ];

  return (
    <section className="demo">
      <div className="demo-background">
        <div className="demo-gradient"></div>
      </div>

      <div className="demo-container">
        <motion.div
          className="demo-header"
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
            <span>📊 Live Dashboard</span>
          </motion.div>

          <h2>Real-Time Monitoring</h2>
          <p>
            Experience the power of intelligent Kubernetes orchestration with live metrics,
            automated scaling, and comprehensive observability.
          </p>
        </motion.div>

        <div className="demo-content">
          <motion.div
            className="metrics-dashboard"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="dashboard-header">
              <h3>System Metrics</h3>
              <div className="status-indicator">
                <div className="status-dot active"></div>
                <span>All Systems Operational</span>
              </div>
            </div>

            <div className="metrics-grid">
              {metricCards.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  className={`metric-card ${getStatusClass(
                    parseFloat(metric.value),
                    metric.thresholds
                  )}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="metric-header">
                    <div className="metric-icon">{metric.icon}</div>
                    <div className="metric-status">
                      <div
                        className="status-indicator"
                        style={{ backgroundColor: metric.color }}
                      ></div>
                    </div>
                  </div>

                  <div className="metric-content">
                    <div className="metric-value">{metric.value}</div>
                    <div className="metric-label">{metric.label}</div>
                  </div>

                  <motion.div
                    className="metric-bar"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, parseFloat(metric.value) * (metric.label.includes('%') ? 1 : 10))}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  >
                    <div className="metric-bar-fill"></div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="demo-controls"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="controls-tabs">
              <button
                className={`tab-button ${activeTab === 'metrics' ? 'active' : ''}`}
                onClick={() => setActiveTab('metrics')}
              >
                Metrics
              </button>
              <button
                className={`tab-button ${activeTab === 'logs' ? 'active' : ''}`}
                onClick={() => setActiveTab('logs')}
              >
                Logs
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'metrics' ? (
                <motion.div
                  key="metrics"
                  className="controls-actions"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.button
                    className="control-button primary"
                    onClick={handleScaleUp}
                    disabled={isScaling}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isScaling ? (
                      <>
                        <div className="loading-spinner"></div>
                        Scaling...
                      </>
                    ) : (
                      <>
                        <span>⚡</span>
                        Scale Up
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    className="control-button secondary"
                    onClick={handleRestart}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>🔄</span>
                    Restart Pod
                  </motion.button>

                  <motion.button
                    className="control-button secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>📊</span>
                    View Charts
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="logs"
                  className="logs-panel"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="logs-header">
                    <h4>Recent Activity</h4>
                    <div className="logs-filter">
                      <button className="filter-button active">All</button>
                      <button className="filter-button">Errors</button>
                      <button className="filter-button">Warnings</button>
                    </div>
                  </div>

                  <div className="logs-content">
                    <AnimatePresence>
                      {logs.map((log) => (
                        <motion.div
                          key={log.id}
                          className={`log-entry ${log.level.toLowerCase()}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="log-time">{log.time}</div>
                          <div className={`log-level ${log.level.toLowerCase()}`}>
                            {log.level}
                          </div>
                          <div className="log-message">{log.message}</div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Demo;