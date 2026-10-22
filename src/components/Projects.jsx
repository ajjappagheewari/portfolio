import React, { useRef } from 'react';
import { projects } from '../data/portfolioData';

function ProjectCard({ project }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4.5;
    const rotateY = ((x - centerX) / centerX) * 4.5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
  };

  return (
    <article
      ref={cardRef}
      className="project-card card-luxury reveal-fade reveal-active"
      data-project-id={project.id}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-thumb-wrap">
        <img
          src={project.image}
          alt={project.alt}
          className="project-img"
          width="800"
          height="500"
          loading="lazy"
        />
        <div className="project-overlay-glow"></div>
        <span className="project-badge">{project.badge}</span>
      </div>

      <div className="project-body">
        <div className="project-header">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-desc">{project.description}</p>
        </div>

        <div className="project-tags">
          {project.tags.map((tag, idx) => (
            <span className="tag" key={idx}>
              {tag}
            </span>
          ))}
        </div>

        <div className="project-footer">
          <a
            href={project.demoUrl}
            className="project-btn project-btn-primary"
            aria-label={`View Live Demo of ${project.title}`}
          >
            <span>{project.id === 2 ? 'Live Preview' : 'Live Demo'}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-btn project-btn-outline"
            aria-label={`View ${project.title} source on GitHub`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="projects-section section-padding">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header text-center reveal-fade reveal-active">
          <span className="section-tag">03 / SHOWCASE</span>
          <h2 className="section-title">
            Featured <span className="gold-gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            A curated collection of web applications, academic systems, and practical tools.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
