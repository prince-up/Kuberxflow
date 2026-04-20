import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Shield, Zap, RefreshCcw, 
  ArrowLeft, Terminal, Cpu, Database, 
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './DemoPage.css';

const DemoPage = () => {
  const [cpuUsage, setCpuUsage] = useState(0);
  const [history, setHistory] = useState([40, 45, 42, 48, 50, 45, 40]);
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState('Optimal');

  // Fetch real CPU data from backend
  useEffect(() => {
    const fetchCPU = async () => {
      try {
        const apiBase = `http://${window.location.hostname}:8000`;
        const response = await fetch(`${apiBase}/cpu`);
        const data = await response.json();
        const value = Math.round(data.cpu_usage_percent);
        setCpuUsage(value);
        setHistory(prev => [...prev.slice(-14), value]);
        
        // Random status logic
        if (value > 80) setStatus('High Load');
        else if (value > 60) setStatus('Scaling...');
        else setStatus('Optimal');
      } catch (err) {
        console.error("Backend offline, using fallback data");
        const fallback = Math.floor(Math.random() * 40) + 20;
        setCpuUsage(fallback);
        setHistory(prev => [...prev.slice(-14), fallback]);
      }
    };

    const interval = setInterval(fetchCPU, 2000);
    return () => clearInterval(interval);
  }, []);

  // Simulate SystemEvents
  useEffect(() => {
    const eventTypes = [
      { msg: 'Horizontal Pod Autoscaler triggered', icon: <Zap size={14} />, type: 'info' },
      { msg: 'Node-02 health check passed', icon: <Shield size={14} />, type: 'success' },
      { msg: 'Cluster bin-packing optimized', icon: <Database size={14} />, type: 'success' },
      { msg: 'Load balancer re-routing traffic', icon: <RefreshCcw size={14} />, type: 'info' },
    ];

    const addEvent = () => {
      const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      const newEvent = {
        id: Date.now(),
        ...randomType,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
      setEvents(prev => [newEvent, ...prev.slice(0, 5)]);
    };

    const timer = setInterval(addEvent, 5000);
    return () => clearInterval(timer);
  }, []);

  const triggerManualScale = () => {
    const newEvent = {
        id: Date.now(),
        msg: 'MANUAL ACTION: Manual node scaling triggered',
        icon: <Zap size={14} />,
        type: 'info',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    setEvents(prev => [newEvent, ...prev.slice(0, 5)]);
    setCpuUsage(prev => Math.min(100, prev + 10)); // Simulate load increase
  };

  return (
    <div className="demo-page">
      <header className="demo-header glass">
        <div className="container header-container">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          <div className="demo-badge">Live Enterprise Sandbox</div>
        </div>
      </header>

      <main className="container demo-main">
        <aside className="demo-sidebar">
          <div className="sidebar-section">
            <h3>How it Works</h3>
            <div className="work-steps">
              <div className="step">
                <div className="step-icon glass"><Terminal size={18} /></div>
                <div className="step-info">
                  <h4>Metric Collection</h4>
                  <p>Our agent collects real-time node metrics every 2 seconds.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-icon glass"><Activity size={18} /></div>
                <div className="step-info">
                  <h4>AI Analysis</h4>
                  <p>Proprietary models predict traffic spikes 5 mins in advance.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-icon glass"><Shield size={18} /></div>
                <div className="step-info">
                  <h4>Auto-Scaling</h4>
                  <p>K8s resources are adjusted seamlessly without downtime.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="sidebar-cta glass-card">
            <h4>Ready to Go Live?</h4>
            <p>Connect your AWS/GCP cluster and start optimizing today.</p>
            <button className="btn-primary full-width">Deploy to Production</button>
          </div>
        </aside>

        <section className="demo-dashboard">
          <div className="dashboard-grid">
            {/* Stat Card 1 */}
            <motion.div 
              className="stat-card glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="card-header">
                <Cpu size={20} color="var(--primary)" />
                <span>CPU Load</span>
              </div>
              <div className="card-value">{cpuUsage}%</div>
              <div className="cpu-bar-container">
                <motion.div 
                  className="cpu-bar"
                  animate={{ width: `${cpuUsage}%` }}
                  style={{ background: cpuUsage > 80 ? '#ef4444' : 'var(--primary)' }}
                ></motion.div>
              </div>
              <p className="card-subtext">Real-time usage from Backend</p>
              <button 
                className="manual-trigger-btn glass" 
                onClick={triggerManualScale}
              >
                Simulate Load +
              </button>
            </motion.div>

            {/* Stat Card 2 */}
            <motion.div 
              className="stat-card glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="card-header">
                <Activity size={20} color="#10b981" />
                <span>Cluster Health</span>
              </div>
              <div className="card-value">{status}</div>
              <div className="health-nodes">
                {[1,2,3,4,5,6].map(i => <div key={i} className="node-dot active"></div>)}
              </div>
              <p className="card-subtext">6/6 Nodes Operational</p>
            </motion.div>

            {/* Main Graph */}
            <motion.div 
              className="graph-card glass-card span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="card-header">
                <Clock size={20} color="var(--accent)" />
                <span>System Performance (Live)</span>
              </div>
              <div className="graph-container">
                <svg viewBox="0 0 400 100" className="live-graph">
                  <motion.path
                    d={`M ${history.map((h, i) => `${(i * 400) / 14} ${100 - h}`).join(' L ')}`}
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1 }}
                  />
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="400" y2="20" stroke="rgba(255,255,255,0.05)" />
                  <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(255,255,255,0.05)" />
                  <line x1="0" y1="80" x2="400" y2="80" stroke="rgba(255,255,255,0.05)" />
                </svg>
              </div>
            </motion.div>

            {/* Feed Section */}
            <motion.div 
              className="feed-card glass-card span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="card-header">
                <Terminal size={20} color="var(--text-muted)" />
                <span>System Events</span>
              </div>
              <div className="event-list">
                <AnimatePresence>
                  {events.map((event) => (
                    <motion.div 
                      key={event.id}
                      className={`event-item ${event.type}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="event-icon">{event.icon}</div>
                      <div className="event-msg">{event.msg}</div>
                      <div className="event-time">{event.time}</div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DemoPage;
