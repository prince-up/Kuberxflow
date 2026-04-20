import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const footerLinks = {
    product: [
      { name: 'Features', href: '#features', icon: '✨' },
      { name: 'Pricing', href: '#pricing', icon: '💎' },
      { name: 'Documentation', href: '#docs', icon: '📚' },
      { name: 'API Reference', href: '#api', icon: '🔧' }
    ],
    company: [
      { name: 'About', href: '#about', icon: '🏢' },
      { name: 'Blog', href: '#blog', icon: '📝' },
      { name: 'Careers', href: '#careers', icon: '🚀' },
      { name: 'Contact', href: '#contact', icon: '📞' }
    ],
    resources: [
      { name: 'Community', href: '#community', icon: '👥' },
      { name: 'Support', href: '#support', icon: '🛟' },
      { name: 'GitHub', href: 'https://github.com/prince-up', external: true, icon: '🐙' },
      { name: 'Status', href: '#status', icon: '📊' }
    ],
    legal: [
      { name: 'Privacy', href: '#privacy', icon: '🔒' },
      { name: 'Terms', href: '#terms', icon: '📋' },
      { name: 'Security', href: '#security', icon: '🛡️' },
      { name: 'Compliance', href: '#compliance', icon: '✅' }
    ]
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: '🐙',
      href: 'https://github.com/prince-up',
      color: '#333',
      gradient: 'linear-gradient(135deg, #333, #666)'
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      href: 'https://www.linkedin.com/in/prince-yadav-4t/',
      color: '#0077b5',
      gradient: 'linear-gradient(135deg, #0077b5, #005885)'
    },
    {
      name: 'Twitter',
      icon: '🐦',
      href: 'https://x.com/prince__up',
      color: '#1da1f2',
      gradient: 'linear-gradient(135deg, #1da1f2, #0d8ecf)'
    },
    {
      name: 'Email',
      icon: '✉️',
      href: 'mailto:contact@kuberxflow.com',
      color: '#ea4335',
      gradient: 'linear-gradient(135deg, #ea4335, #d33b2c)'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <footer className="footer">
      {/* Animated Background Elements */}
      <div className="footer-background">
        <div className="footer-gradient"></div>
        <div className="floating-shapes">
          <motion.div
            className="shape shape-1"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ☸️
          </motion.div>
          <motion.div
            className="shape shape-2"
            animate={{
              y: [0, 20, 0],
              x: [0, -15, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            ⚡
          </motion.div>
          <motion.div
            className="shape shape-3"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -180, -360]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            🚀
          </motion.div>
          <motion.div
            className="shape shape-4"
            animate={{
              y: [0, -15, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            🌟
          </motion.div>
        </div>
      </div>

      <div className="footer-container">
        <motion.div
          className="footer-main"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="footer-brand" variants={itemVariants}>
            <div className="brand-visual">
              <motion.div
                className="brand-logo"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3>Kube<span className="highlight">Flow</span>X</h3>
                <div className="brand-badge">
                  <span className="badge-icon">🚀</span>
                  v2.1.0
                </div>
              </motion.div>
              <div className="brand-decoration">
                <div className="decoration-line"></div>
                <div className="decoration-dot"></div>
                <div className="decoration-line"></div>
              </div>
            </div>

            <p>
              Enterprise-grade Kubernetes platform powering the next generation
              of cloud-native applications with intelligent automation and observability.
            </p>

            <div className="brand-stats">
              <motion.div
                className="stat"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span className="stat-number">10K+</span>
                <span className="stat-label">Deployments</span>
                <div className="stat-icon">📈</div>
              </motion.div>
              <motion.div
                className="stat"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span className="stat-number">99.9%</span>
                <span className="stat-label">Uptime</span>
                <div className="stat-icon">⚡</div>
              </motion.div>
              <motion.div
                className="stat"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span className="stat-number">24/7</span>
                <span className="stat-label">Support</span>
                <div className="stat-icon">🛟</div>
              </motion.div>
            </div>
          </motion.div>

          <div className="footer-links">
            <motion.div className="footer-section" variants={itemVariants}>
              <h4>
                <span className="section-icon">🛠️</span>
                Product
              </h4>
              <ul>
                {footerLinks.product.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <a href={link.href} className={link.external ? 'external' : ''}>
                      <span className="link-icon">{link.icon}</span>
                      {link.name}
                      {link.external && <span className="external-icon">↗</span>}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div className="footer-section" variants={itemVariants}>
              <h4>
                <span className="section-icon">🏢</span>
                Company
              </h4>
              <ul>
                {footerLinks.company.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <a href={link.href}>
                      <span className="link-icon">{link.icon}</span>
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div className="footer-section" variants={itemVariants}>
              <h4>
                <span className="section-icon">📚</span>
                Resources
              </h4>
              <ul>
                {footerLinks.resources.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <a href={link.href} className={link.external ? 'external' : ''}>
                      <span className="link-icon">{link.icon}</span>
                      {link.name}
                      {link.external && <span className="external-icon">↗</span>}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div className="footer-section" variants={itemVariants}>
              <h4>
                <span className="section-icon">⚖️</span>
                Legal
              </h4>
              <ul>
                {footerLinks.legal.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <a href={link.href}>
                      <span className="link-icon">{link.icon}</span>
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="footer-newsletter"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h4>
              <span className="newsletter-icon">📧</span>
              Stay Updated
            </h4>
            <p>Get the latest updates on Kubernetes innovations and platform features.</p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
              />
              <motion.button
                className="newsletter-button"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="button-icon">🚀</span>
                Subscribe
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className="footer-social"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h4>
              <span className="social-header-icon">🌐</span>
              Connect
            </h4>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    boxShadow: `0 15px 35px ${social.color}40`
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    '--hover-color': social.color,
                    '--gradient': social.gradient
                  }}
                >
                  <span className="social-icon">{social.icon}</span>
                  <span className="social-name">{social.name}</span>
                  <div className="social-glow"></div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="footer-copyright"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="copyright-content">
            <p>
              <span className="copyright-heart">❤️</span>
              © {new Date().getFullYear()} KubeFlowX. Built with love by{' '}
              <motion.a
                href="https://github.com/prince-up"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Prince Yadav
              </motion.a>
              . Open source under MIT License.
            </p>
            <div className="copyright-links">
              <motion.a href="#privacy" whileHover={{ scale: 1.05 }}>Privacy</motion.a>
              <span className="separator">•</span>
              <motion.a href="#terms" whileHover={{ scale: 1.05 }}>Terms</motion.a>
              <span className="separator">•</span>
              <motion.a href="#cookies" whileHover={{ scale: 1.05 }}>Cookies</motion.a>
            </div>
          </div>

          <div className="footer-badges">
            <motion.div
              className="badge"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span className="badge-icon">🔒</span>
              <span className="badge-text">SOC 2 Compliant</span>
            </motion.div>
            <motion.div
              className="badge"
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span className="badge-icon">🛡️</span>
              <span className="badge-text">GDPR Ready</span>
            </motion.div>
            <motion.div
              className="badge"
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span className="badge-icon">⚡</span>
              <span className="badge-text">99.9% SLA</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;