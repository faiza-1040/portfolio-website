import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import { certifications } from '../data/certifications';
import './Certifications.css';

const colorMap = {
  teal:     { bg: 'rgba(100,255,218,0.08)', border: 'rgba(100,255,218,0.25)', text: 'var(--accent-teal)' },
  lavender: { bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.25)', text: 'var(--accent-lavender)' },
  blue:     { bg: 'rgba(56,189,248,0.08)',  border: 'rgba(56,189,248,0.25)',  text: 'var(--accent-blue)' },
  pink:     { bg: 'rgba(244,114,182,0.08)', border: 'rgba(244,114,182,0.25)', text: 'var(--accent-pink)' },
  orange:   { bg: 'rgba(251,146,60,0.08)',  border: 'rgba(251,146,60,0.25)',  text: 'var(--accent-orange)' },
};

const Certifications = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="certifications-page">
      <div className="page-header">
        <div className="page-header-bg" />
        <div className="container">
          <AnimatedSection>
            <span className="section-label">Credentials</span>
            <h1 className="page-title">My <span className="gradient-text">Certifications</span></h1>
            <p className="page-subtitle">Continuous learning and upskilling — click a card to view details.</p>
          </AnimatedSection>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="cert-grid">
            {certifications.map((cert, i) => {
              const colors = colorMap[cert.color] || colorMap.teal;
              return (
                <AnimatedSection key={cert.id} delay={i * 0.08}>
                  <motion.div
                    className="cert-card card"
                    style={{ '--cert-border': colors.border, '--cert-bg': colors.bg, '--cert-text': colors.text }}
                    whileHover={{ y: -6, scale: 1.01 }}
                    onClick={() => setSelected(cert)}
                  >
                    <div className="cert-icon-wrapper">
                      <span className="cert-icon">{cert.icon}</span>
                    </div>
                    <div className="cert-content">
                      <div className="cert-meta">
                        <span className="cert-issuer">{cert.issuer}</span>
                        <span className="cert-year mono">{cert.date}</span>
                      </div>
                      <h3 className="cert-title">{cert.title}</h3>
                      <div className="cert-skills">
                        {cert.skills.map(s => <span key={s} className="tag">{s}</span>)}
                      </div>
                    </div>
                    <div className="cert-arrow">→</div>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="cert-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="cert-modal card"
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="cert-modal-close" onClick={() => setSelected(null)}>✕</button>
              <span className="cert-modal-icon">{selected.icon}</span>
              <h2 className="cert-modal-title">{selected.title}</h2>
              <div className="cert-modal-info">
                <div className="cert-info-row">
                  <span className="cert-info-label">Issuer</span>
                  <span className="cert-info-value">{selected.issuer}</span>
                </div>
                <div className="cert-info-row">
                  <span className="cert-info-label">Date</span>
                  <span className="cert-info-value">{selected.date}</span>
                </div>
                <div className="cert-info-row">
                  <span className="cert-info-label">Credential ID</span>
                  <span className="cert-info-value mono">{selected.credentialId}</span>
                </div>
              </div>
              <div className="cert-modal-skills">
                <h4>Skills Covered</h4>
                <div className="cert-modal-skill-tags">
                  {selected.skills.map(s => <span key={s} className="tag">{s}</span>)}
                </div>
              </div>
              <a href={selected.link} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}>
                View Certificate
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Certifications;
