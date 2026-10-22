import React from 'react';
import { educationHistory, certifications } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="education-section section-padding">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header text-center reveal-fade reveal-active">
          <span className="section-tag">04 / MILESTONES</span>
          <h2 className="section-title">
            Education &amp; <span className="gold-gradient-text">Certifications</span>
          </h2>
          <p className="section-subtitle">
            A chronological record of academic accomplishments and ongoing skill refinement.
          </p>
        </div>

        <div className="timeline-container">
          <div className="timeline-spine"></div>

          {/* Academic Degrees & Schooling */}
          {educationHistory.map((item, index) => {
            const slideClass = index % 2 === 0 ? 'reveal-slide-left' : 'reveal-slide-right';
            return (
              <div key={item.id} className={`timeline-item ${slideClass} reveal-active`}>
                <div className="timeline-dot">
                  <span className="dot-inner"></span>
                </div>
                <div className="timeline-card card-luxury">
                  <div className="timeline-meta">
                    <span className={`timeline-badge ${item.isCurrent ? 'current' : ''}`}>
                      {item.badge}
                    </span>
                    <span className="timeline-year">{item.period}</span>
                  </div>
                  <h3 className="timeline-heading">{item.heading}</h3>
                  <h4 className="timeline-institution">{item.institution}</h4>
                  <p className="timeline-desc">{item.description}</p>
                  <div className="timeline-highlights">
                    {item.highlights.map((h, hIdx) => (
                      <span className="pill-tag" key={hIdx}>
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Certifications Timeline Item */}
          <div className="timeline-item reveal-slide-right reveal-active">
            <div className="timeline-dot">
              <span className="dot-inner"></span>
            </div>
            <div className="timeline-card card-luxury cert-timeline-card">
              <div className="timeline-meta">
                <span className="timeline-badge gold">Certifications &amp; Credentials</span>
                <span className="timeline-year">Verified Milestones</span>
              </div>
              <h3 className="timeline-heading">Professional &amp; Technical Certifications</h3>
              <p className="timeline-desc">
                Supplemented academic education with targeted industry certifications in core programming and modern web technologies.
              </p>

              <div className="certifications-list">
                {certifications.map((cert) => (
                  <div className="cert-item" key={cert.id}>
                    <div className="cert-icon-wrap">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
                        <circle cx="12" cy="8" r="7" />
                        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                      </svg>
                    </div>
                    <div className="cert-info">
                      <span className="cert-name">{cert.name}</span>
                      <span className="cert-issuer">{cert.issuer}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
