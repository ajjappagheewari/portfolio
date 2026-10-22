import React, { useEffect, useRef } from 'react';

export default function ParticlesCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = 0;
    let height = 0;
    let particles = [];
    let isVisible = true;

    const mouse = {
      x: null,
      y: null,
      radius: 120
    };

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.offsetWidth;
      height = parent.offsetHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      createParticles();
    };

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.2 + 0.8;
        this.speedX = (Math.random() - 0.5) * 0.45;
        this.speedY = -Math.random() * 0.5 - 0.2; // Gentle upward drift
        this.alpha = Math.random() * 0.5 + 0.2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulse = Math.random() * Math.PI;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Pulse brightness
        this.pulse += this.pulseSpeed;
        const currentAlpha = Math.max(0.1, Math.min(0.9, this.alpha + Math.sin(this.pulse) * 0.15));

        // Mouse avoidance/attraction subtle response
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius && distance > 0) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= (dx / distance) * force * 1.5;
            this.y -= (dy / distance) * force * 1.5;
          }
        }

        // Boundary wrap
        if (this.y < -10) this.y = height + 10;
        if (this.y > height + 10) this.y = -10;
        if (this.x < -10) this.x = width + 10;
        if (this.x > width + 10) this.x = -10;

        return currentAlpha;
      }

      draw(alpha) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(245, 197, 66, 0.4)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const createParticles = () => {
      particles = [];
      // Adjust density based on screen dimensions
      const count = Math.min(Math.floor((width * height) / 16000), 65);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        const alpha = particle.update();
        particle.draw(alpha);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    // Optimize: only run physics loop when hero is visible
    let observer;
    if ('IntersectionObserver' in window && parent) {
      observer = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
      }, { threshold: 0.05 });
      observer.observe(parent);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particles-canvas"
      className="hero-canvas"
      aria-hidden="true"
    />
  );
}
