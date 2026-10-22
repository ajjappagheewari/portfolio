import React from 'react';

export default function ToastNotification({ toast }) {
  if (!toast) return null;

  return (
    <div
      id="toastNotification"
      className={`toast-notification ${toast.show ? 'show' : ''}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="toast-icon">✓</div>
      <div className="toast-content">
        <span className="toast-title">{toast.title || 'Message Delivered'}</span>
        <span className="toast-body">{toast.body || 'Thank you! Your message has been received.'}</span>
      </div>
    </div>
  );
}
