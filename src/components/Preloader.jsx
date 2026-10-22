import React, { useEffect, useState } from 'react';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      const hideTimer = setTimeout(() => {
        setVisible(false);
      }, 700);
      return () => clearTimeout(hideTimer);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      id="preloader"
      className={`preloader ${fading ? 'fade-out' : ''}`}
      aria-label="Loading site"
      style={{ display: visible ? 'flex' : 'none' }}
    >
      <div className="preloader-content">
        <div className="preloader-monogram">AG</div>
        <div className="preloader-bar-wrap">
          <div className="preloader-bar"></div>
        </div>
        <p className="preloader-text">CRAFTING EXPERIENCE</p>
      </div>
    </div>
  );
}
