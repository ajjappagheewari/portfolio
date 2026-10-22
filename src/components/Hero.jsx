import React, { useState, useEffect } from 'react';
import ParticlesCanvas from './ParticlesCanvas';
import { personalInfo } from '../data/portfolioData';

export default function Hero() {
  const [roleText, setRoleText] = useState('BCA Student');

  // Typewriter effect
  useEffect(() => {
    const roles = personalInfo.roles;
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeDelay = 100;
    let timeoutId;

    const typeLoop = () => {
      const currentRole = roles[roleIdx];

      if (isDeleting) {
        setRoleText(currentRole.substring(0, charIdx - 1));
        charIdx--;
        typeDelay = 45;
      } else {
        setRoleText(currentRole.substring(0, charIdx + 1));
        charIdx++;
        typeDelay = 95;
      }

      if (!isDeleting && charIdx === currentRole.length) {
        typeDelay = 2000;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typeDelay = 450;
      }

      timeoutId = setTimeout(typeLoop, typeDelay);
    };

    timeoutId = setTimeout(typeLoop, 800);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section id="hero" className="hero-section">
      {/* Interactive floating gold particles canvas */}
      <ParticlesCanvas />

      <div className="section-container hero-container">
        <div className="hero-content">
          {/* Availability Badge */}
          <div className="availability-badge reveal-fade reveal-active">
            <span className="pulse-dot"></span>
            <span className="badge-text">{personalInfo.availabilityHero}</span>
          </div>

          {/* Hero Headings */}
          <p className="hero-eyebrow reveal-fade reveal-active">{personalInfo.eyebrow}</p>
          <h1 className="hero-title reveal-fade reveal-active">
            Hi, I'm <br />
            <span className="gold-gradient-text glow-text">{personalInfo.name}</span>
          </h1>

          {/* Typing Subtitle */}
          <div className="hero-typing-wrap reveal-fade reveal-active">
            <span className="typing-prefix">I am a </span>
            <span className="typing-role" id="typingRole">{roleText}</span>
            <span className="typing-cursor" aria-hidden="true">|</span>
          </div>

          {/* Intro Paragraph */}
          <p className="hero-desc reveal-fade reveal-active">
            {personalInfo.bio}
          </p>

          {/* Action Buttons */}
          <div className="hero-actions reveal-fade reveal-active">
            <a href="#projects" className="btn btn-primary btn-glow">
              <span>View Projects</span>
              <svg className="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a
              href={personalInfo.resumePath}
              download={personalInfo.resumeFileName}
              className="btn btn-outline"
              id="heroResumeBtn"
            >
              <span>Download Resume</span>
              <svg className="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </div>

          {/* Social Quick Strip */}
          <div className="hero-social-strip reveal-fade reveal-active">
            <span className="social-strip-label">CONNECT:</span>
            <div className="social-links">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-chip"
                aria-label="GitHub Profile"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-chip"
                aria-label="LinkedIn Profile"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>LinkedIn</span>
              </a>
              <a
                href={personalInfo.socials.email}
                className="social-chip"
                aria-label="Direct Email"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Hero Visual Profile Card */}
        <div className="hero-visual reveal-fade reveal-active">
          <div className="profile-card-wrapper">
            <div className="profile-glow-ring"></div>
            <div className="profile-card">
              <div className="profile-image-container">
                <img
                  src={personalInfo.profileImage}
                  alt={`${personalInfo.name} - ${personalInfo.degree} & Web Developer`}
                  className="profile-img"
                  width="400"
                  height="480"
                  loading="eager"
                />
              </div>
              <div className="profile-card-overlay">
                <div className="profile-badge">
                  <span className="badge-icon">🎓</span>
                  <div className="badge-texts">
                    <span className="badge-title">BCA Scholar</span>
                    <span className="badge-sub">Computer Applications</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Micro Metric Badges */}
            <div className="floating-pill pill-top">
              <span className="pill-dot"></span>
              <span>Clean Code &amp; Architecture</span>
            </div>
            <div className="floating-pill pill-bottom">
              <span className="pill-icon">⚡</span>
              <span>Modern Web Solutions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a href="#about" className="scroll-indicator" aria-label="Scroll to About section">
        <span className="scroll-text">EXPLORE</span>
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
      </a>
    </section>
  );
}
