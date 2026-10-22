import React, { useState, useEffect, useRef } from 'react';
import { skillCategories } from '../data/portfolioData';

function CategoryIcon({ type }) {
  if (type === 'code') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    );
  }
  if (type === 'globe') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    );
  }
  if (type === 'database') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    );
  }
  // default / tool
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setAnimated(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="skills-section section-padding" ref={sectionRef}>
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header text-center reveal-fade reveal-active">
          <span className="section-tag">02 / EXPERTISE</span>
          <h2 className="section-title">
            Technical <span className="gold-gradient-text">Arsenal</span>
          </h2>
          <p className="section-subtitle">
            Proficiencies developed through academic rigor and hands-on software development.
          </p>
        </div>

        <div className="skills-categories-grid">
          {skillCategories.map((category) => (
            <div key={category.id} className="skill-category-card card-luxury reveal-fade reveal-active">
              <div className="category-header">
                <div className="cat-icon-badge">
                  <CategoryIcon type={category.iconType} />
                </div>
                <div>
                  <h3 className="category-title">{category.title}</h3>
                  <span className="category-subtitle">{category.subtitle}</span>
                </div>
              </div>

              <div className="skills-list">
                {category.skills.map((skill, sIdx) => (
                  <div className="skill-item" key={sIdx}>
                    <div className="skill-meta">
                      <div className="skill-name-wrap">
                        <span className="skill-badge">{skill.badge}</span>
                        <span className="skill-name">{skill.name}</span>
                      </div>
                      <span className="skill-percent">{skill.percent}%</span>
                    </div>

                    <div
                      className="progress-track"
                      role="progressbar"
                      aria-valuenow={skill.percent}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-label={`${skill.name} proficiency`}
                    >
                      <div
                        className="progress-bar"
                        style={{
                          width: animated ? `${skill.percent}%` : '0%',
                          transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                      />
                    </div>
                    <span className="skill-detail">{skill.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
