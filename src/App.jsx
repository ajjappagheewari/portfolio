import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ToastNotification from './components/ToastNotification';

export default function App() {
  const [toast, setToast] = useState({ show: false, title: '', body: '' });

  const triggerToast = ({ title, body }) => {
    setToast({ show: true, title, body });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  useEffect(() => {
    // IntersectionObserver for scroll reveals
    const revealElements = document.querySelectorAll(
      '.reveal-fade, .reveal-slide-left, .reveal-slide-right'
    );

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('reveal-active'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Luxury Preloader */}
      <Preloader />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact onShowToast={triggerToast} />
      </main>

      {/* Site Footer */}
      <Footer />

      {/* Floating Feedback Toast Notification */}
      <ToastNotification toast={toast} />
    </>
  );
}
