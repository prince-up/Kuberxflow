import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Youtube, Share2, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: ["Features", "Security", "Scalability", "Pricing", "Demo"]
    },
    {
      title: "Resources",
      links: ["Documentation", "API Reference", "Guides", "Blog", "Community"]
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Support", "Media Kit", "Contact"]
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "SLA"]
    }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-icon">
                <Share2 size={24} color="var(--primary)" />
              </div>
              <span className="logo-text">Kuber<span className="text-gradient">xflow</span></span>
            </div>
            <p className="footer-desc">
              Next-generation Kubernetes orchestration platform. 
              Simplifying infrastructure management for the modern enterprise.
            </p>
            <div className="social-links">
              <a href="#"><Github size={20} /></a>
              <a href="#"><Twitter size={20} /></a>
              <a href="#"><Linkedin size={20} /></a>
              <a href="#"><Youtube size={20} /></a>
            </div>
          </div>

          <div className="footer-grid">
            {footerLinks.map((group, i) => (
              <div key={i} className="footer-group">
                <h4>{group.title}</h4>
                <ul>
                  {group.links.map((link, j) => (
                    <li key={j}><a href="#">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-newsletter glass">
          <div className="newsletter-content">
            <h4>Subscribe to our newsletter</h4>
            <p>Get the latest updates in cloud-native infrastructure.</p>
          </div>
          <form className="newsletter-form">
            <div className="input-group">
              <Mail size={18} className="input-icon" />
              <input type="email" placeholder="Enter your email" />
            </div>
            <button className="btn-primary">Subscribe</button>
          </form>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} Kuberxflow. All rights reserved.</p>
          <div className="footer-status">
            <span className="status-dot"></span>
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;