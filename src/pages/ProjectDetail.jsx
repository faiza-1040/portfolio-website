import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiArrowLeft, FiGithub, FiExternalLink, FiCheck, FiZap, FiDatabase, FiFolder, FiCode, FiTarget, FiTrendingUp, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import AnimatedSection from '../components/AnimatedSection';
import { getProjectById } from '../data/projects';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = getProjectById(id);
  const [activeImage, setActiveImage] = useState(0);

  if (!project) {
    return (
      <div className="not-found">
        <h2>Project not found</h2>
        <Link to="/projects" className="btn btn-primary">← Back to Projects</Link>
      </div>
    );
  }

  const {
    title, category, duration, status, longDescription, tags,
    github, live, problemStatement, solution, features, techStack,
    architecture, challenges, learned, improvements, apis,
    folderStructure, dbTables, images = [], image,
  } = project;

  const galleryImages = images.length > 0 ? images : (image ? [image] : []);
  const showPrevImage = () => setActiveImage((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  const showNextImage = () => setActiveImage((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));

  return (
    <div className="project-detail">
      {/* ── Hero ── */}
      <div className="pd-hero">
        <div className="pd-hero-bg" />
        <div className="container">
          <motion.button
            className="back-btn"
            onClick={() => navigate('/projects')}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <FiArrowLeft /> Back to Projects
          </motion.button>

          <motion.div
            className="pd-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="pd-meta">
              <span className="project-category">{category}</span>
              <span className={`badge ${status === 'Complete' ? 'badge-complete' : 'badge-progress'}`}>{status}</span>
              <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>📅 {duration}</span>
            </div>

            <h1 className="pd-title">{title}</h1>
            <p className="pd-desc">{longDescription}</p>

            <div className="pd-tags">
              {tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
            </div>

            <div className="pd-actions">
              {github && (
                <a href={github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <FiGithub /> View on GitHub
                </a>
              )}
              {live && (
                <a href={live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <FiExternalLink /> Live Demo
                </a>
              )}
            </div>
          </motion.div>

          {/* Hero Image Gallery */}
          {galleryImages.length > 0 && (
            <motion.div
              className="pd-hero-image"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <div className="pd-image-frame">
                <img src={galleryImages[activeImage]} alt={`${title} screenshot ${activeImage + 1}`} className="pd-gallery-image" />
                {galleryImages.length > 1 && (
                  <>
                    <button type="button" className="pd-gallery-nav pd-gallery-nav-left" onClick={showPrevImage} aria-label="Previous screenshot">
                      <FiChevronLeft size={18} />
                    </button>
                    <button type="button" className="pd-gallery-nav pd-gallery-nav-right" onClick={showNextImage} aria-label="Next screenshot">
                      <FiChevronRight size={18} />
                    </button>
                    <div className="pd-gallery-dots">
                      {galleryImages.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          className={`pd-gallery-dot ${index === activeImage ? 'active' : ''}`}
                          onClick={() => setActiveImage(index)}
                          aria-label={`Show screenshot ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="pd-body">
        <div className="container">
          <div className="pd-layout">
            {/* Main Content */}
            <div className="pd-main">

              {/* Overview / Problem / Solution */}
              {problemStatement && (
                <AnimatedSection className="pd-section">
                  <div className="pd-section-header">
                    <FiTarget className="pd-section-icon" />
                    <h2>Problem Statement</h2>
                  </div>
                  <div className="pd-text-block problem-block">
                    <p>{problemStatement}</p>
                  </div>
                </AnimatedSection>
              )}

              {solution && (
                <AnimatedSection className="pd-section">
                  <div className="pd-section-header">
                    <FiZap className="pd-section-icon teal" />
                    <h2>Our Solution</h2>
                  </div>
                  <div className="pd-text-block solution-block">
                    <p>{solution}</p>
                  </div>
                </AnimatedSection>
              )}

              {/* Features */}
              {features.length > 0 && (
                <AnimatedSection className="pd-section">
                  <div className="pd-section-header">
                    <FiCheck className="pd-section-icon lavender" />
                    <h2>Key Features</h2>
                  </div>
                  <div className="features-grid">
                    {features.map((feature, i) => (
                      <AnimatedSection key={feature.name} delay={i * 0.08} className="feature-card card">
                        <h3 className="feature-name">{feature.name}</h3>
                        <p className="feature-desc">{feature.description}</p>
                        <div className="feature-tech">
                          {feature.tech.map(t => <span key={t} className="tag tag-lavender">{t}</span>)}
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>
                </AnimatedSection>
              )}

              {/* Tech Stack */}
              {techStack.length > 0 && (
                <AnimatedSection className="pd-section">
                  <div className="pd-section-header">
                    <FiCode className="pd-section-icon teal" />
                    <h2>Tech Stack — Why We Chose Each</h2>
                  </div>
                  <div className="tech-stack-list">
                    {techStack.map((item, i) => (
                      <AnimatedSection key={item.name} delay={i * 0.07} className="tech-stack-item">
                        <div className="ts-name">
                          <span className="ts-badge tag">{item.name}</span>
                        </div>
                        <div className="ts-reason">
                          <p>{item.reason}</p>
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>
                </AnimatedSection>
              )}

              {/* Architecture */}
              {architecture.length > 0 && (
                <AnimatedSection className="pd-section">
                  <div className="pd-section-header">
                    <FiDatabase className="pd-section-icon blue" />
                    <h2>System Architecture</h2>
                  </div>
                  <div className="architecture-flow">
                    {architecture.map((step, i) => (
                      <div key={step} className="arch-step">
                        <div className="arch-node">
                          <span>{step}</span>
                        </div>
                        {i < architecture.length - 1 && (
                          <div className="arch-arrow">↓</div>
                        )}
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              )}

              {/* API Docs */}
              {apis.length > 0 && (
                <AnimatedSection className="pd-section">
                  <div className="pd-section-header">
                    <FiCode className="pd-section-icon pink" />
                    <h2>API Documentation</h2>
                  </div>
                  <div className="api-table">
                    <div className="api-header-row">
                      <span>Method</span>
                      <span>Endpoint</span>
                      <span>Description</span>
                    </div>
                    {apis.map((api, i) => (
                      <div key={i} className="api-row">
                        <span className={`api-method method-${api.method.toLowerCase()}`}>{api.method}</span>
                        <span className="api-endpoint mono">{api.endpoint}</span>
                        <span className="api-desc">{api.description}</span>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              )}

              {/* Folder Structure */}
              {folderStructure && (
                <AnimatedSection className="pd-section">
                  <div className="pd-section-header">
                    <FiFolder className="pd-section-icon orange" />
                    <h2>Folder Structure</h2>
                  </div>
                  <pre className="code-block">{folderStructure}</pre>
                </AnimatedSection>
              )}

              {/* DB Tables */}
              {dbTables.length > 0 && (
                <AnimatedSection className="pd-section">
                  <div className="pd-section-header">
                    <FiDatabase className="pd-section-icon blue" />
                    <h2>Database Design</h2>
                  </div>
                  <div className="db-tables">
                    {dbTables.map((table, i) => (
                      <div key={table} className="db-table-badge">
                        <span className="db-table-icon">🗃️</span>
                        <span className="db-table-name">{table}</span>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              )}

              {/* Challenges */}
              {challenges.length > 0 && (
                <AnimatedSection className="pd-section">
                  <div className="pd-section-header">
                    <FiZap className="pd-section-icon pink" />
                    <h2>Challenges Faced</h2>
                  </div>
                  <div className="challenges-list">
                    {challenges.map((c, i) => (
                      <div key={i} className="challenge-item">
                        <span className="challenge-num mono">0{i + 1}</span>
                        <p>{c}</p>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Sidebar */}
            <aside className="pd-sidebar">
              {/* What I Learned */}
              {learned.length > 0 && (
                <AnimatedSection direction="right" className="sidebar-card card">
                  <h3 className="sidebar-card-title">
                    <FiTrendingUp /> What I Learned
                  </h3>
                  <div className="learned-list">
                    {learned.map(item => (
                      <div key={item} className="learned-item">
                        <FiCheck size={12} style={{ color: 'var(--accent-teal)', flexShrink: 0 }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              )}

              {/* Future */}
              {improvements.length > 0 && (
                <AnimatedSection direction="right" delay={0.1} className="sidebar-card card">
                  <h3 className="sidebar-card-title">
                    🚀 Future Improvements
                  </h3>
                  <div className="learned-list">
                    {improvements.map(item => (
                      <div key={item} className="learned-item">
                        <span style={{ color: 'var(--accent-lavender)', fontSize: '0.7rem', flexShrink: 0 }}>◆</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              )}

              {/* GitHub */}
              {github && (
                <AnimatedSection direction="right" delay={0.2} className="sidebar-card card">
                  <h3 className="sidebar-card-title"><FiGithub /> Repository</h3>
                  <a href={github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                    View on GitHub
                  </a>
                </AnimatedSection>
              )}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
