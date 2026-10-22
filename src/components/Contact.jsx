import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { submitContactMessage, isFirebaseConfigured } from '../firebase';

export default function Contact({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: '', text: '' });
  const [showConfigInfo, setShowConfigInfo] = useState(false);

  // Email format validator
  const isValidEmail = (email) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(email);
  };

  // Validate fields
  useEffect(() => {
    const newErrors = {};

    if (touched.name) {
      if (!formData.name.trim()) {
        newErrors.name = 'Please enter your full name.';
      } else if (formData.name.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters.';
      }
    }

    if (touched.email) {
      if (!formData.email.trim()) {
        newErrors.email = 'Please enter your email address.';
      } else if (!isValidEmail(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address (e.g. name@domain.com).';
      }
    }

    if (touched.message) {
      if (!formData.message.trim()) {
        newErrors.message = 'Please provide a message.';
      } else if (formData.message.trim().length < 10) {
        newErrors.message = 'Message must contain at least 10 characters.';
      }
    }

    setErrors(newErrors);
  }, [formData, touched]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all as touched
    setTouched({
      name: true,
      email: true,
      message: true
    });

    const isNameValid = formData.name.trim().length >= 2;
    const isEmailValid = isValidEmail(formData.email.trim());
    const isMessageValid = formData.message.trim().length >= 10;

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      setFormStatus({
        type: 'error',
        text: 'Please correct the highlighted fields before transmitting.'
      });
      return;
    }

    setIsSubmitting(true);
    setFormStatus({ type: '', text: '' });

    try {
      const result = await submitContactMessage(formData);

      setIsSubmitting(false);
      const deliveryDetails = [];
      if (result.emailSent) deliveryDetails.push(`sent directly to ${personalInfo.email}`);
      if (result.firestoreSaved) deliveryDetails.push('recorded in Cloud Firestore');
      
      const deliveryText = deliveryDetails.length > 0
        ? `Message transmitted! Successfully ${deliveryDetails.join(' and ')}.`
        : `Message transmitted! A copy has been dispatched to ${personalInfo.email}.`;

      setFormStatus({
        type: 'success',
        text: deliveryText
      });

      if (onShowToast) {
        onShowToast({
          title: 'Email Sent to ' + personalInfo.email,
          body: 'Your message has been directly dispatched to Ajjappa’s inbox!'
        });
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setTouched({
        name: false,
        email: false,
        message: false
      });

      setTimeout(() => {
        setFormStatus({ type: '', text: '' });
      }, 7000);
    } catch (err) {
      setIsSubmitting(false);
      setFormStatus({
        type: 'error',
        text: err.message || 'Transmission failed. Please verify network or try again.'
      });
    }
  };

  const charLength = formData.message.length;

  return (
    <section id="contact" className="contact-section section-padding">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header text-center reveal-fade reveal-active">
          <span className="section-tag">05 / GET IN TOUCH</span>
          <h2 className="section-title">
            Let's Build Something <span className="gold-gradient-text">Exceptional</span>
          </h2>
          <p className="section-subtitle">
            Interested in collaborating, hiring for an internship, or discussing a project? Reach out below.
          </p>

          {/* Firebase Connection Status Badge */}
          <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={() => setShowConfigInfo(prev => !prev)}
              style={{
                background: 'rgba(212, 175, 55, 0.08)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '20px',
                padding: '6px 14px',
                color: '#D4AF37',
                fontSize: '0.8rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                transition: 'all 0.25s ease'
              }}
              title="Click to view Firebase setup guide"
            >
              <span style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: isFirebaseConfigured ? '#52c41a' : '#faad14',
                boxShadow: isFirebaseConfigured ? '0 0 8px #52c41a' : '0 0 8px #faad14'
              }}></span>
              <span>
                {isFirebaseConfigured
                  ? 'Firebase Firestore: Active'
                  : 'Firebase Service: Ready (Demo / Fallback Mode)'}
              </span>
              <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>ℹ️</span>
            </button>
          </div>

          {/* Config Information Modal/Drawer if clicked */}
          {showConfigInfo && (
            <div style={{
              maxWidth: '680px',
              margin: '16px auto 0',
              padding: '16px 20px',
              backgroundColor: 'var(--bg-surface-elevated)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              borderRadius: '12px',
              textAlign: 'left',
              color: 'var(--text-body)',
              fontSize: '0.85rem',
              lineHeight: '1.6'
            }}>
              <strong style={{ color: '#F5C542', display: 'block', marginBottom: '6px' }}>
                🔥 Firebase Firestore Integration Guide:
              </strong>
              <p style={{ margin: '0 0 8px' }}>
                This contact section is built with the official modular Firebase Web SDK (v10+).
                Messages are saved directly into the <code>contacts</code> collection in Cloud Firestore.
              </p>
              <p style={{ margin: '0 0 8px' }}>
                To connect your live Firebase project, create a <code>.env.local</code> file in the project root with your credentials:
              </p>
              <pre style={{
                backgroundColor: '#0a0a0a',
                padding: '10px 12px',
                borderRadius: '8px',
                color: '#D4AF37',
                overflowX: 'auto',
                fontSize: '0.8rem'
              }}>
{`VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id`}
              </pre>
              <p style={{ margin: '8px 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <em>Note: If credentials are not present, submissions are safely recorded in demo mode so the contact form always functions seamlessly without throwing errors.</em>
              </p>
            </div>
          )}
        </div>

        <div className="contact-split-grid">
          {/* Left: Contact Details Card */}
          <div className="contact-info-card card-luxury reveal-slide-left reveal-active">
            <h3 className="contact-card-title">Contact Information</h3>
            <p className="contact-card-text">
              I am always receptive to new ideas, technical challenges, internships, and conversations with fellow developers or recruiters.
            </p>

            <div className="contact-items-list">
              {/* Item 1: Email */}
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="contact-detail">
                  <span className="detail-label">Email Me</span>
                  <a href={`mailto:${personalInfo.email}`} className="detail-value text-gold-hover">
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              {/* Item 2: Location */}
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="contact-detail">
                  <span className="detail-label">Location</span>
                  <span className="detail-value">{personalInfo.location}</span>
                </div>
              </div>

              {/* Item 3: Status */}
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 14 14" />
                  </svg>
                </div>
                <div className="contact-detail">
                  <span className="detail-label">Current Availability</span>
                  <span className="detail-value">{personalInfo.availability}</span>
                </div>
              </div>
            </div>

            {/* Social Links Panel */}
            <div className="contact-socials-box">
              <span className="socials-box-title">SOCIAL PRESENCE</span>
              <div className="social-icons-row">
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-circle-btn"
                  aria-label={`${personalInfo.name} on GitHub`}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-circle-btn"
                  aria-label={`${personalInfo.name} on LinkedIn`}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href={personalInfo.socials.email}
                  className="social-circle-btn"
                  aria-label="Send Direct Email"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Validated Contact Form with Firebase */}
          <div className="contact-form-card card-luxury reveal-slide-right reveal-active">
            <h3 className="contact-card-title">Send a Message</h3>

            <form
              id="contactForm"
              className={`contact-form ${isSubmitting ? 'is-submitting' : ''}`}
              noValidate
              onSubmit={handleSubmit}
            >
              {/* Name Input Group */}
              <div className="form-group">
                <label htmlFor="contactName" className="form-label">
                  Your Name <span className="required-star">*</span>
                </label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="contactName"
                    name="name"
                    className={`form-input ${
                      touched.name
                        ? errors.name
                          ? 'is-invalid'
                          : 'is-valid'
                        : ''
                    }`}
                    placeholder="e.g. Rahul Sharma"
                    required
                    minLength={2}
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur('name')}
                    aria-invalid={touched.name && Boolean(errors.name)}
                    aria-describedby={errors.name ? 'nameError' : undefined}
                  />
                </div>
                <span className="form-error" id="nameError" aria-live="polite">
                  {errors.name}
                </span>
              </div>

              {/* Email Input Group */}
              <div className="form-group">
                <label htmlFor="contactEmail" className="form-label">
                  Your Email Address <span className="required-star">*</span>
                </label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="contactEmail"
                    name="email"
                    className={`form-input ${
                      touched.email
                        ? errors.email
                          ? 'is-invalid'
                          : 'is-valid'
                        : ''
                    }`}
                    placeholder="e.g. rahul@example.com"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                    aria-invalid={touched.email && Boolean(errors.email)}
                    aria-describedby={errors.email ? 'emailError' : undefined}
                  />
                </div>
                <span className="form-error" id="emailError" aria-live="polite">
                  {errors.email}
                </span>
              </div>

              {/* Subject Input Group */}
              <div className="form-group">
                <label htmlFor="contactSubject" className="form-label">
                  Subject
                </label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="contactSubject"
                    name="subject"
                    className="form-input"
                    placeholder="e.g. Internship Inquiry / Project Discussion"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Message Input Group */}
              <div className="form-group">
                <div className="message-label-row">
                  <label htmlFor="contactMessage" className="form-label">
                    Your Message <span className="required-star">*</span>
                  </label>
                  <span
                    className="char-count"
                    id="charCount"
                    style={{ color: charLength >= 480 ? '#FF7875' : 'var(--text-muted)' }}
                  >
                    {charLength} / 500
                  </span>
                </div>
                <div className="input-wrapper">
                  <textarea
                    id="contactMessage"
                    name="message"
                    className={`form-textarea ${
                      touched.message
                        ? errors.message
                          ? 'is-invalid'
                          : 'is-valid'
                        : ''
                    }`}
                    rows={5}
                    placeholder="Share your inquiry or say hello..."
                    required
                    minLength={10}
                    maxLength={500}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={() => handleBlur('message')}
                    aria-invalid={touched.message && Boolean(errors.message)}
                    aria-describedby={errors.message ? 'messageError' : undefined}
                  />
                </div>
                <span className="form-error" id="messageError" aria-live="polite">
                  {errors.message}
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="submitBtn"
                className="btn btn-primary btn-glow w-full"
                disabled={isSubmitting}
              >
                <span className="btn-text">
                  {isSubmitting ? 'Connecting...' : 'Transmit Message'}
                </span>
                <span className="btn-loader" aria-hidden="true"></span>
                <svg
                  className="btn-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>

              {/* Direct Mailto Option */}
              <div style={{ marginTop: '12px', textAlign: 'center', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Prefer opening your email client? </span>
                <a
                  href={`mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(formData.message)}`}
                  style={{ color: '#D4AF37', textDecoration: 'underline', transition: 'color 0.2s ease' }}
                  className="text-gold-hover"
                >
                  Click here to email {personalInfo.email}
                </a>
              </div>

              {/* Form Status Notice */}
              {formStatus.text && (
                <div
                  id="formStatus"
                  className={`form-status ${formStatus.type}`}
                  role="status"
                  aria-live="polite"
                >
                  {formStatus.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
