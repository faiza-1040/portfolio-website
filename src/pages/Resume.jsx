import AnimatedSection from '../components/AnimatedSection';
import { FiDownload, FiExternalLink } from 'react-icons/fi';
import './Resume.css';

const highlights = [
  { label: 'Education',  value: 'BS Computer Science — COMSATS Lahore' },
  { label: 'Experience', value: 'Internships at Vise Tech & Ilm-O-Irfan' },
  { label: 'Skills',     value: 'React.js, JavaScript, Tailwind CSS, Bootstrap, Python' },
  { label: 'Certifications', value: 'Machine Learning (Coursera), Google Digital Marketing' },
  { label: 'Languages',  value: 'English, Urdu, Punjabi' },
  { label: 'Location',   value: 'Lahore, Punjab, Pakistan' },
];

const Resume = () => {
  return (
    <div className="resume-page">
      <div className="page-header">
        <div className="page-header-bg" />
        <div className="container">
          <AnimatedSection>
            <span className="section-label">Career Profile</span>
            <h1 className="page-title">My <span className="accent">Resume</span></h1>
            <p className="page-subtitle">Download or preview my full resume below.</p>
          </AnimatedSection>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="resume-layout">
            {/* Left — Actions + Highlights */}
            <AnimatedSection direction="left" className="resume-sidebar">
              <div className="resume-actions card">
                <h3 className="resume-actions-title">Resume Options</h3>
                <a href="/resume.pdf" download className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <FiDownload /> Download PDF
                </a>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}>
                  <FiExternalLink /> Open in New Tab
                </a>
                <p className="resume-note">Last updated: July 2024</p>
              </div>

              <div className="highlights-card card">
                <h3 className="highlights-title">Quick Highlights</h3>
                <div className="highlights-list">
                  {highlights.map(({ label, value }) => (
                    <div key={label} className="highlight-row">
                      <span className="hl-label mono">{label}</span>
                      <span className="hl-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Right — Preview */}
            <AnimatedSection direction="right" className="resume-preview-col">
              <div className="resume-preview-card card">
                <div className="resume-preview-placeholder">
                  {/* Simulated resume layout */}
                  <div className="fake-resume">
                    <div className="fake-header">
                      <div className="fake-name-block">
                        <div className="fake-line wide" style={{ height: '18px', width: '200px' }} />
                        <div className="fake-line" style={{ height: '10px', width: '140px', marginTop: '8px' }} />
                      </div>
                      <div className="fake-contact">
                        {[1,2,3].map(i => <div key={i} className="fake-line" style={{ height: '8px', width: '120px' }} />)}
                      </div>
                    </div>

                    {['Experience', 'Education', 'Skills', 'Projects'].map(section => (
                      <div key={section} className="fake-section">
                        <div className="fake-section-title">{section}</div>
                        <div className="fake-lines">
                          {[90, 75, 85, 60].map((w, i) => (
                            <div key={i} className="fake-line" style={{ width: `${w}%`, height: '8px' }} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="resume-overlay">
                    <div className="resume-overlay-content">
                      <span style={{ fontSize: '3rem' }}>📄</span>
                      <p>Resume Preview</p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Add your resume.pdf to the public folder</p>
                      <a href="/resume.pdf" download className="btn btn-primary">
                        <FiDownload /> Download Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resume;
