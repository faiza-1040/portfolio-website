import AnimatedSection from '../components/AnimatedSection';
import { experiences, education } from '../data/experience';
import './Experience.css';

const Experience = () => {
  return (
    <div className="experience-page">
      <div className="page-header">
        <div className="page-header-bg" />
        <div className="container">
          <AnimatedSection>
            <span className="section-label">My Journey</span>
            <h1 className="page-title">Experience & <span className="gradient-text">Timeline</span></h1>
            <p className="page-subtitle">Where I've been and what I've built along the way.</p>
          </AnimatedSection>
        </div>
      </div>

      {/* Experience */}
      <section className="section">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-label">Work & Projects</span>
              <h2 className="section-title">Experience</h2>
              <div className="divider" />
            </div>
          </AnimatedSection>

          <div className="exp-timeline">
            {experiences.map((exp, i) => (
              <AnimatedSection key={exp.id} delay={i * 0.15} className="exp-item">
                <div className="exp-connector">
                  <div className={`exp-dot exp-dot-${exp.color}`} />
                  {i < experiences.length - 1 && <div className="exp-line" />}
                </div>
                <div className="exp-card card">
                  <div className="exp-header">
                    <div className="exp-main">
                      <div className="exp-company-badge">{exp.companyType}</div>
                      <h3 className="exp-role">{exp.role}</h3>
                      <p className="exp-company">{exp.company}</p>
                    </div>
                    <div className="exp-meta">
                      <span className="exp-duration mono">{exp.duration}</span>
                      <span className="exp-location">{exp.location}</span>
                    </div>
                  </div>

                  <p className="exp-description">{exp.description}</p>

                  <div className="exp-responsibilities">
                    <h4 className="exp-section-label">Key Responsibilities</h4>
                    <ul>
                      {exp.responsibilities.map((r, i) => (
                        <li key={i} className="exp-resp-item">
                          <span className="exp-bullet">›</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="exp-tech">
                    <h4 className="exp-section-label">Technologies</h4>
                    <div className="exp-tech-tags">
                      {exp.tech.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Education (condensed) */}
      <section className="section exp-edu-section">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-label">Academic</span>
              <h2 className="section-title">Education</h2>
              <div className="divider" />
            </div>
          </AnimatedSection>

          <div className="edu-cards-grid">
            {education.map((edu, i) => (
              <AnimatedSection key={edu.id} delay={i * 0.1}>
                <div className="edu-mini-card card">
                  <span className="edu-icon-big">{edu.icon}</span>
                  <div className="edu-mini-content">
                    <span className="edu-mini-duration mono">{edu.duration}</span>
                    <h3 className="edu-mini-degree">{edu.degree}</h3>
                    <p className="edu-mini-inst">{edu.institution}</p>
                    <span className="badge badge-complete" style={{ marginTop: '10px', display: 'inline-flex' }}>{edu.grade}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Experience;
