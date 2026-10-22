import React, { useState, useEffect } from 'react';
import { personalInfo, navLinks } from '../data/portfolioData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // ScrollSpy logic
      const sections = navLinks.map(link => document.getElementById(link.id)).filter(Boolean);
      const scrollPos = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (scrollPos >= section.offsetTop) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  const closeDrawer = () => setMobileOpen(false);

  return (
    <>
      {/* Header / Navigation */}
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`} id="header">
        <div className="nav-container">
          <a href="#hero" className="brand-logo" aria-label={`${personalInfo.name} - Back to Home`}>
            <span className="logo-emblem">{personalInfo.initials}</span>
            <span className="logo-name">{personalInfo.name}</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <ul className="nav-list">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Header CTA & Mobile Toggle */}
          <div className="nav-actions">
            <a href="#contact" className="btn btn-outline nav-cta">
              Let's Talk
            </a>
            <button
              className={`hamburger-btn ${mobileOpen ? 'is-active' : ''}`}
              id="mobileMenuToggle"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobileDrawer"
              onClick={() => setMobileOpen(prev => !prev)}
            >
              <span className="bar bar-1"></span>
              <span className="bar bar-2"></span>
              <span className="bar bar-3"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop overlay for mobile drawer */}
      <div
        id="mobileOverlay"
        className={`mobile-overlay ${mobileOpen ? 'active' : ''}`}
        aria-hidden="true"
        onClick={closeDrawer}
      ></div>

      {/* Mobile Drawer Menu */}
      <div
        className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}
        id="mobileDrawer"
        aria-hidden={!mobileOpen}
      >
        <div className="mobile-drawer-inner">
          <div className="mobile-drawer-header">
            <div className="brand-logo">
              <span className="logo-emblem">{personalInfo.initials}</span>
              <span className="logo-name">{personalInfo.name}</span>
            </div>
            <button
              className="drawer-close-btn"
              id="mobileDrawerClose"
              aria-label="Close menu"
              onClick={closeDrawer}
            >
              &times;
            </button>
          </div>

          <nav className="mobile-nav" aria-label="Mobile Navigation">
            <ul className="mobile-nav-list">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
                    onClick={closeDrawer}
                  >
                    <span>{link.num}</span> {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mobile-drawer-footer">
            <a
              href={personalInfo.resumePath}
              download={personalInfo.resumeFileName}
              className="btn btn-primary w-full"
              onClick={closeDrawer}
            >
              <span>Download Resume</span>
              <svg className="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
