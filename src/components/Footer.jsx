import React, { useState, useEffect } from 'react';
import { personalInfo, navLinks } from '../data/portfolioData';

export default function Footer() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [showTopBtn, setShowTopBtn] = useState(false);

  const radius = 18;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPercent(Math.min(100, Math.max(0, pct)));
      setShowTopBtn(scrollTop > 280);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="site-footer">
      <div className="section-container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#hero" className="brand-logo">
              <span className="logo-emblem">{personalInfo.initials}</span>
              <span className="logo-name">{personalInfo.name}</span>
            </a>
            <p className="footer-tagline">
              Bachelor of Computer Applications scholar architecting modern, accessible, and elegant software solutions.
            </p>
          </div>

          <div className="footer-nav-col">
            <span className="footer-col-title">NAVIGATION</span>
            <ul className="footer-links">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-nav-col">
            <span className="footer-col-title">GET CONNECTED</span>
            <div className="footer-social-links">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-circle-btn small"
                aria-label="GitHub"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-circle-btn small"
                aria-label="LinkedIn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href={personalInfo.socials.email}
                className="social-circle-btn small"
                aria-label="Email"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright-text">
            &copy; 2026 <strong>{personalInfo.name}</strong>. All rights reserved. Architected with React &amp; Firebase.
          </p>

          <button
            id="backToTopBtn"
            className="back-to-top"
            aria-label="Back to top of page"
            onClick={scrollToTop}
            style={{
              opacity: showTopBtn ? 1 : 0,
              visibility: showTopBtn ? 'visible' : 'hidden',
              transition: 'opacity 0.3s ease, visibility 0.3s ease'
            }}
          >
            <svg className="progress-ring" width="44" height="44" viewBox="0 0 44 44">
              <circle
                className="progress-ring-circle"
                stroke="url(#goldGradient)"
                strokeWidth="2.5"
                fill="transparent"
                r={radius}
                cx="22"
                cy="22"
                style={{
                  strokeDasharray: `${circumference} ${circumference}`,
                  strokeDashoffset: strokeDashoffset,
                  transition: 'stroke-dashoffset 0.15s ease'
                }}
              />
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="50%" stopColor="#F5C542" />
                  <stop offset="100%" stopColor="#B8860B" />
                </linearGradient>
              </defs>
            </svg>
            <svg className="arrow-up-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
