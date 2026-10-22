import React, { useState, useEffect, useRef } from 'react';
import { personalInfo, stats } from '../data/portfolioData';

function StatCounterCard({ target, suffix, title, description, isVisible }) {
  const [count, setCount] = useState(0);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (!isVisible || animatedRef.current) return;
    animatedRef.current = true;

    const duration = 1800;
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeProgress * target);

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isVisible, target]);

  return (
    <div className="stat-card card-luxury">
      <div className="stat-glow"></div>
      <div className="stat-number-wrap">
        <span className="stat-counter">{count}</span>
        <span className="stat-plus">{suffix}</span>
      </div>
      <h4 className="stat-title">{title}</h4>
      <p className="stat-desc">{description}</p>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const [sectionVisible, setSectionVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSectionVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about-section section-padding" ref={sectionRef}>
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header text-center reveal-fade reveal-active">
          <span className="section-tag">01 / DISCOVER</span>
          <h2 className="section-title">
            About <span className="gold-gradient-text">Me</span>
          </h2>
          <p className="section-subtitle">
            Bridging academic computer science foundations with modern digital artistry.
          </p>
        </div>

        <div className="about-grid">
          {/* Story / Bio Card */}
          <div className="about-bio-card card-luxury reveal-slide-left reveal-active">
            <div className="card-corner-gold tl"></div>
            <div className="card-corner-gold tr"></div>
            <div className="card-corner-gold bl"></div>
            <div className="card-corner-gold br"></div>

            <h3 className="about-story-title">{personalInfo.aboutStory.title}</h3>
            {personalInfo.aboutStory.paragraphs.map((p, idx) => (
              <p className="about-text" key={idx}>
                {p}
              </p>
            ))}

            {/* Quick Attributes Grid */}
            <div className="about-attributes">
              {personalInfo.aboutStory.attributes.map((attr, idx) => (
                <div className="attribute-item" key={idx}>
                  <span className="attr-icon">{attr.icon}</span>
                  <div>
                    <span className="attr-label">{attr.label}</span>
                    <span className="attr-value">{attr.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Counter Stats Column */}
          <div className="about-stats-column reveal-slide-right reveal-active">
            {stats.map((s, idx) => (
              <StatCounterCard
                key={idx}
                target={s.target}
                suffix={s.suffix}
                title={s.title}
                description={s.description}
                isVisible={sectionVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
