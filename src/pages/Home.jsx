import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import {
  FiGithub, FiLinkedin, FiMail,
  FiArrowRight, FiDownload, FiExternalLink, FiEye,
} from 'react-icons/fi';
import AnimatedSection from '../components/AnimatedSection';
import { education, experiences } from '../data/experience';
import { skillCategories } from '../data/skills';
import { projects } from '../data/projects';
import './Home.css';

/* ── DATA ── */
const stats = [
  { value: '7+', label: 'Projects' },
  { value: '2', label: 'Internships' },
  { value: '2026', label: 'Graduate' },
  { value: 'Open to', label: 'Work' },
];

const certifications = [
  { title: 'React Developer Certification', issuer: 'Meta', year: '2024', icon: '⚛️' },
  { title: 'JavaScript Algorithms & Data Structures', issuer: 'freeCodeCamp', year: '2023', icon: '📜' },
  { title: 'Responsive Web Design', issuer: 'freeCodeCamp', year: '2023', icon: '🎨' },
];

/* All skills flat list for the ribbon */
const allSkills = [
  'HTML', 'CSS', 'JavaScript', 'Python', 'OOP',
  'DSA', 'MongoDB', 'Database Management', 'React.js', 'Git',
  'HTML', 'CSS', 'JavaScript', 'Python', 'OOP',
  'DSA', 'MongoDB', 'Database Management', 'React.js', 'Git',
];

/* ── COMPONENT ── */
const Home = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  /* one featured project */
  const featured = projects.find(p => p.featured) || projects[0];
  const supportingProjects = projects.filter(project => project.id !== featured.id).slice(0, 2);
  const [activeProjectImage, setActiveProjectImage] = useState(0);

  useEffect(() => {
    if (!featured?.images?.length) return;
    const timer = window.setInterval(() => {
      setActiveProjectImage((prev) => (prev + 1) % featured.images.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [featured?.images?.length]);

  const renderSkillDots = (filled = 3) => (
    Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`skill-dot ${index < filled ? 'filled' : ''}`} />
    ))
  );

  return (
    <div className="home">

      {/* ═══════════ HERO — New Two-Column ═══════════ */}
      <motion.section ref={heroRef} id="hero" className="hero-v2" style={{ opacity: heroOpacity }}>
        <div className="hero-v2-inner">

          {/* ── LEFT — Portrait Card ── */}
          <div className="hero-portrait-col">
            <div className="hero-portrait-ring-wrap">
              <div className="hero-portrait-card">
                <img
                  src="/download.png"
                  alt="Faiza Aslam"
                  className="hero-portrait-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hero-portrait-fallback">FA</div>
                <div className="hero-portrait-label">
                  <span className="hero-portrait-label-dot" />
                  Software Engineer
                </div>
              </div>
            </div>

            <motion.div
              className="hero-awards-block"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <span className="hero-awards-icon">🏆</span>
              <div className="hero-awards-lines">
                <strong>FYP Poster Competition — 2nd Position</strong>
                <span>CS Graduate · COMSATS University · 2026</span>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT — Content ── */}
          <div className="hero-content-col">

            {/* Overline */}
            <motion.p
              className="hero-overline"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Available for opportunities
            </motion.p>

            {/* Big serif heading */}
            <motion.h1
              className="hero-v2-heading"
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              FAIZA<br />
              <span className="hero-v2-heading-outline">ASLAM</span>
            </motion.h1>

            {/* Decorative line */}
            <motion.div
              className="hero-deco-line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Description — updated */}
            <motion.p
              className="hero-v2-bio"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
            >
              Computer Science graduate from <span className="hero-v2-accent">COMSATS University</span> with expertise in Software Engineering, Python, DSA, and OOP. Specializing in Frontend Development, with hands-on experience building responsive, scalable web applications using React.js, JavaScript, HTML, CSS, Tailwind CSS, Bootstrap, REST APIs, Git, and GitHub.
            </motion.p>

            {/* CTA row — View CV + Download CV + Scroll btn */}
            <motion.div
              className="hero-v2-cta-row"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.88 }}
            >
              {/* View CV — opens in new tab */}
              <a
                href="/FaizaAslam-webdeveloper.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-v2-cv-btn"
              >
                <FiEye size={15} /> View CV
              </a>

              {/* Download CV */}
              <a
                href="/FaizaAslam-webdeveloper.pdf"
                download
                className="hero-v2-cv-btn hero-v2-cv-btn--outline"
              >
                <FiDownload size={15} /> Download CV
              </a>

              {/* Scroll down button */}
              <motion.button
                className="hero-scroll-btn"
                onClick={() => document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' })}
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                aria-label="Scroll down"
              >
                ↓
              </motion.button>
            </motion.div>

            {/* Social links — no Twitter */}
            <motion.div
              className="hero-v2-socials"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              {[
                { icon: <FiGithub size={16} />,   href: 'https://github.com/faiza-1040/',                          label: 'GitHub' },
                { icon: <FiLinkedin size={16} />, href: 'https://www.linkedin.com/in/faiza-aslam-891b30276/',     label: 'LinkedIn' },
                { icon: <FiMail size={16} />,     href: 'mailto:faizaaslam1040@gmail.com',                        label: 'Email' },
              ].map(({ icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-v2-social"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {icon}
                  <span>{label}</span>
                </motion.a>
              ))}
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* ═══════════ SKILLS RIBBON ═══════════ */}
      <div className="skills-ribbon-wrap">
        {/* Black backing strip */}
        <div className="skills-ribbon-black" />
        {/* Pink-red top strip */}
        <div className="skills-ribbon skills-ribbon-pink">
          <div className="skills-ribbon-track">
            {[...allSkills, ...allSkills].map((skill, i) => (
              <span key={i} className="ribbon-skill-item">
                <span className="ribbon-diamond">◆</span>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════ STATS ═══════════ */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-row">
            {stats.map(({ value, label }, i) => (
              <AnimatedSection key={label} delay={i * 0.08} className="stat-item">
                <span className="stat-value">{value}</span>
                <span className="stat-label">{label}</span>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SKILLS — Badge Grid ═══════════ */}
      <section id="skills" className="section skills-section">
        <div className="container">
          <AnimatedSection className="section-header">
            <span className="section-label">My Arsenal</span>
            <h2 className="section-title">Skills &amp; <span className="accent">Technologies</span></h2>
            <p className="section-subtitle">A curated toolkit built across projects, internships, and coursework.</p>
          </AnimatedSection>

          <div className="skills-categories">
            {skillCategories.map((cat, ci) => (
              <AnimatedSection key={cat.id} delay={ci * 0.1} className="skill-category">
                <div className="skill-category-header">
                  <h3 className="skill-cat-label">{cat.label}</h3>
                  <div className="skill-category-dots" aria-label={`${cat.label} skill level`}>{renderSkillDots(3)}</div>
                </div>
                <div className="skill-badge-grid">
                  {cat.skills.map((skill, si) => (
                    <motion.div
                      key={skill.name}
                      className="skill-badge"
                      initial={{ opacity: 0, scale: 0.85, y: 10 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: si * 0.05, type: 'spring', stiffness: 220, damping: 18 }}
                      whileHover={{ y: -3, scale: 1.03 }}
                    >
                      <span className="skill-badge-name">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ EXPERIENCE ═══════════ */}
      <section id="experience" className="section exp-section">
        <div className="container">
          <AnimatedSection className="section-header">
            <span className="section-label">Work History</span>
            <h2 className="section-title">Experience</h2>
            <p className="section-subtitle">Professional roles and internships along my journey.</p>
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
                      {exp.responsibilities.map((r, j) => (
                        <li key={j} className="exp-resp-item">
                          <span className="exp-bullet">›</span>{r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="exp-tech">
                    <h4 className="exp-section-label">Technologies</h4>
                    <div className="exp-tech-tags">
                      {exp.tech.map(t => <span key={t} className="tech-badge">{t}</span>)}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ EDUCATION ═══════════ */}
      <section id="education" className="section edu-section">
        <div className="container">
          <AnimatedSection className="section-header">
            <span className="section-label">Academic Background</span>
            <h2 className="section-title">Education</h2>
            <p className="section-subtitle">Academic foundations that shaped my engineering mindset.</p>
          </AnimatedSection>

          <div className="edu-list">
            {education.map((edu, i) => (
              <AnimatedSection key={edu.id} delay={i * 0.12} className="edu-row">
                <div className="edu-spine">
                  <div className="edu-icon-circle">{edu.icon}</div>
                  {i < education.length - 1 && <div className="edu-spine-line" />}
                </div>
                <div className="edu-card card">
                  <span className="edu-year mono">{edu.duration}</span>
                  <h3 className="edu-degree">{edu.degree}</h3>
                  <p className="edu-inst">{edu.institution}</p>
                  <p className="edu-desc">{edu.description}</p>
                  <div className="edu-chips">
                    {edu.highlights.map(h => <span key={h} className="tag">{h}</span>)}
                    <span className="badge badge-complete">{edu.grade}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURED PROJECT ═══════════ */}
      <section id="projects" className="section projects-home-section">
        <div className="container">
          <AnimatedSection className="section-header">
            <span className="section-label">Featured Work</span>
            <h2 className="section-title">Projects</h2>
            <p className="section-subtitle">A highlight from my engineering portfolio.</p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="featured-project-card card">
              <div className="fp-left">
                <div className="fp-meta">
                  <span className="fp-category mono">{featured.category}</span>
                  <span className="badge badge-complete">{featured.status}</span>
                </div>
                <h3 className="fp-title">{featured.title}</h3>
                <p className="fp-desc">{featured.description}</p>

                <div className="fp-feature-list">
                  <div className="fp-feature-item">• Resume Parsing</div>
                  <div className="fp-feature-item">• AI Evaluation</div>
                  <div className="fp-feature-item">• NLP Analysis</div>
                  <div className="fp-feature-item">• Report Generation</div>
                </div>

                <div className="fp-tags">
                  {featured.tags.slice(0, 6).map(t => (
                    <span key={t} className="tag tag-accent">{t}</span>
                  ))}
                </div>

                <div className="fp-actions">
                  {featured.live && (
                    <a href={featured.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      Live Demo <FiExternalLink size={14} />
                    </a>
                  )}
                  {featured.github && (
                    <a href={featured.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                      <FiGithub size={14} /> GitHub
                    </a>
                  )}
                </div>
              </div>

              <div className="fp-right">
                <div className="fp-image-shell">
                  <img src={featured.images?.[activeProjectImage] || '/src/assets/projects/nlpias/landing page.png'} alt="NLP project showcase" className="fp-image" />
                  <button type="button" className="fp-nav fp-nav-left" onClick={() => setActiveProjectImage((prev) => (prev === 0 ? (featured.images?.length || 1) - 1 : prev - 1))} aria-label="Previous image">
                    <FiChevronLeft size={16} />
                  </button>
                  <button type="button" className="fp-nav fp-nav-right" onClick={() => setActiveProjectImage((prev) => (prev + 1) % (featured.images?.length || 1))} aria-label="Next image">
                    <FiChevronRight size={16} />
                  </button>
                  <div className="fp-dots">
                    {(featured.images || []).map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`fp-dot ${index === activeProjectImage ? 'active' : ''}`}
                        onClick={() => setActiveProjectImage(index)}
                        aria-label={`Show image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <div className="featured-project-supporting">
            {supportingProjects.map((project, index) => (
              <Link
                key={project.id}
                to={project.caseStudyLink || `/projects/${project.id}`}
                className={`mini-project-card ${index === 0 ? 'mini-project-card-left' : 'mini-project-card-right'}`}
              >
                <div className="mini-project-top">
                  <span className="mini-project-category mono">{project.category}</span>
                  <span className="badge badge-complete">{project.status}</span>
                </div>
                <h4 className="mini-project-title">{project.title}</h4>
                <p className="mini-project-desc">{project.description}</p>
                <div className="mini-project-tags">
                  {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="tag tag-accent">{tag}</span>
                  ))}
                </div>
                <div className="mini-project-footer">
                  <span>View case study</span>
                  <FiArrowRight size={13} />
                </div>
              </Link>
            ))}
          </div>

          {/* View All Projects */}
          <AnimatedSection delay={0.2}>
            <div className="view-all-projects">
              <p className="view-all-text mono">Want to see more of my work?</p>
              <Link to="/projects" className="btn btn-primary view-all-btn">
                View All Projects <FiArrowRight size={15} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════ CERTIFICATIONS ═══════════ */}
      <section id="certifications" className="section certs-section">
        <div className="container">
          <AnimatedSection className="section-header">
            <span className="section-label">Credentials</span>
            <h2 className="section-title">Certifications</h2>
            <p className="section-subtitle">Continuous learning through recognized online programs.</p>
          </AnimatedSection>

          <div className="certs-grid">
            {certifications.map((cert, i) => (
              <AnimatedSection key={cert.title} delay={i * 0.1} className="cert-card card">
                <div className="cert-icon">{cert.icon}</div>
                <div className="cert-body">
                  <p className="cert-issuer mono">{cert.issuer} · {cert.year}</p>
                  <h3 className="cert-title">{cert.title}</h3>
                </div>
                <span className="badge badge-complete">Earned</span>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CONTACT ═══════════ */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <AnimatedSection>
            <div className="contact-inner">
              <div className="contact-text">
                <span className="section-label">Get in Touch</span>
                <h2 className="contact-heading">
                  Let's build something<br />
                  <span className="accent">remarkable.</span>
                </h2>
                <p className="contact-sub">
                  Open to full-time roles, internships, freelance projects, and collaborations.
                </p>
              </div>
              <div className="contact-actions">
                <a href="mailto:faizaaslam1040@gmail.com" className="btn btn-primary contact-email-btn">
                  <FiMail size={15} /> faizaaslam1040@gmail.com
                </a>
                <div className="contact-socials">
                  {[
                    { icon: <FiGithub size={18} />,   href: 'https://github.com/faiza-1040/',                              label: 'GitHub' },
                    { icon: <FiLinkedin size={18} />, href: 'https://www.linkedin.com/in/faiza-aslam-891b30276/',         label: 'LinkedIn' },
                  ].map(({ icon, href, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social-btn"
                      aria-label={label}
                      whileHover={{ y: -2 }}
                    >
                      {icon} <span>{label}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
};

export default Home;
