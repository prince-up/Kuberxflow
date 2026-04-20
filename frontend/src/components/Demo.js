import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, Zap, Shield, Activity, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Demo.css';

const Demo = () => {
  const [cpuUsage, setCpuUsage] = useState(0);
  const [status, setStatus] = useState('Stable');
  const [events, setEvents] = useState([
    { id: 1, msg: 'System initialized...', type: 'info' },
    { id: 2, msg: 'Monitoring 6 active nodes', type: 'success' }
  ]);

  // Fetch real CPU metrics
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const apiBase = `http://${window.location.hostname}:8000`;
        const response = await fetch(`${apiBase}/cpu`);
        const data = await response.json();
        const value = Math.round(data.cpu_usage_percent);
        setCpuUsage(value);
        
        if (value > 80) setStatus('High Load: Scaling...');
        else if (value > 50) setStatus('Optimizing...');
        else setStatus('Stable');
      } catch (err) {
        // Fallback for demo
        setCpuUsage(prev => (prev > 0 ? prev - 2 : 15));
      }
    };
    
    const interval = setInterval(fetchStats, 3000);
    return () => clearInterval(interval);
  }, []);

  const triggerLoad = () => {
    setCpuUsage(prev => Math.min(100, prev + 25));
    const newEvent = {
        id: Date.now(),
        msg: `High traffic detected. Horizontal Pod Autoscaler triggered.`,
        type: 'warning'
    };
    setEvents(prev => [newEvent, ...prev.slice(0, 4)]);
    setTimeout(() => {
        const healingEvent = {
            id: Date.now() + 1,
            msg: `Traffic absorbed. Scaling up 3 additional pods.`,
            type: 'success'
        };
        setEvents(prev => [healingEvent, ...prev.slice(0, 4)]);
    }, 2000);
  };

  return (
    <section className="demo section-padding" id="demo">
      <div className="container">
        <div className="section-header">
          <h2 className="cta-title">Public <span className="text-gradient">Interactive</span> Sandbox</h2>
          <p className="cta-subtitle">Test our engine in real-time. Trigger load and watch how our Kubernetes controller reacts.</p>
        </div>

        <motion.div 
          className="demo-sandbox-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Dashboard Control */}
          <div className="sandbox-panel glass-card">
             <div className="panel-header">
                <Activity size={18} color="var(--primary)" />
                <h4>Cluster Performance</h4>
             </div>
             
             <div className="stat-row">
                <div className="stat-item">
                   <span className="stat-label">CPU Load</span>
                   <span className="stat-value">{cpuUsage}%</span>
                </div>
                <div className="stat-item">
                   <span className="stat-label">System Health</span>
                   <span className="stat-value text-success">{status}</span>
                </div>
             </div>

             <div className="load-meter-container">
                <div className="load-meter-bg">
                    <motion.div 
                        className="load-meter-fill"
                        animate={{ width: `${cpuUsage}%` }}
                        style={{ background: cpuUsage > 70 ? 'var(--grad-primary)' : 'var(--accent)' }}
                    />
                </div>
             </div>

             <div className="panel-actions">
                <button className="btn-trigger" onClick={triggerLoad}>
                    <Zap size={16} /> Simulate Traffic Spike
                </button>
                <p className="hint-text">Click to generate load on the virtual cluster</p>
             </div>
          </div>

          {/* Live System Console */}
          <div className="sandbox-panel glass-card console">
             <div className="panel-header">
                <Terminal size={18} color="var(--text-muted)" />
                <h4>System Controller Log</h4>
             </div>
             
             <div className="terminal-output">
                <AnimatePresence>
                    {events.map(event => (
                        <motion.div 
                            key={event.id} 
                            className={`log-entry ${event.type}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <span className="log-prompt">></span>
                            <span className="log-msg">{event.msg}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div className="log-cursor">_</div>
             </div>
             
             <div className="panel-footer">
                <Link to="/demo" className="full-demo-link">
                    Open Advanced Dashboard <ArrowRight size={14} />
                </Link>
             </div>
          </div>
        </motion.div>

        <div className="demo-cta-footer">
          <div className="cta-features">
            <div className="cta-feature">
              <CheckCircle2 size={18} color="var(--primary)" />
              <span>Unlimited Clusters</span>
            </div>
            <div className="cta-feature">
              <CheckCircle2 size={18} color="var(--primary)" />
              <span>24/7 Priority Support</span>
            </div>
            <div className="cta-feature">
              <CheckCircle2 size={18} color="var(--primary)" />
              <span>Custom SSL & Domains</span>
            </div>
          </div>
          
          <div className="cta-btns">
            <Link to="/demo">
                <button className="btn-primary-lg">Get Started Now</button>
            </Link>
            <button className="btn-secondary-lg glass">Talk to Sales</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;