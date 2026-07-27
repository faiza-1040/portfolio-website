import { Link } from 'react-router-dom';
import { FiMapPin, FiMail, FiGithub, FiLinkedin, FiDownload } from 'react-icons/fi';

import AnimatedSection from '../components/AnimatedSection';
import { education } from '../data/experience';
import './About.css';

const infoRows = [
  { key: 'name',       val: 'Faiza Aslam' },
  { key: 'degree',     val: 'BS Computer Science' },
  { key: 'university', val: 'COMSATS Lahore' },
  { key: 'location',   val: 'Lahore, Pakistan' },
  { key: 'languages',  val: 'English, Urdu, Punjabi' },
  { key: 'status',     val: 'Open to Work' },
];

const facts = [
  { icon: '⚡', text: 'Skilled in building responsive web UIs using React.js and Tailwind CSS' },
  { icon: '🚀', text: 'Completed front-end developer and content creation internships' },
  { icon: '🧠', text: 'Developed an AI NLP-based Resume & Candidate evaluation platform' },
  { icon: '🎯', text: 'Passionate about clean, high-performance web applications' },
];

const About = () => {
  return (
    <div className="about-page">
      <div className="page-header">
        <div className="page-header-bg" />
        <div className="container">
          <AnimatedSection>
            <span className="section-label">Get to know me</span>
            <h1 className="page-title">
              About<br /><span className="accent">Me.</span>
            </h1>
            <p className="page-subtitle">Computer Science graduate with hands-on experience in frontend web development.</p>
          </AnimatedSection>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="about-grid">
            {/* Left */}
            <AnimatedSection direction="left" className="about-left">
              {/* Photo frame */}
              <div className="about-photo-frame">
                <div className="about-photo-inner">
                  <div className="about-photo-bg" />
                  <span className="about-photo-initials">FA</span>
                </div>
                <div className="about-photo-chip">CS Graduate '26</div>
              </div>

              {/* Info card */}
              <div className="about-info-card card">
                <span className="info-card-label">Profile Info</span>
                <div className="info-rows">
                  {infoRows.map(({ key, val }) => (
                    <div key={key} className="info-row">
                      <span className="info-key">{key}</span>
                      <span className="info-val">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social links */}
              <div className="about-social-row">
                <a href="mailto:faizaaslam1040@gmail.com" className="about-social-link">
                  <FiMail size={13} /> Email
                </a>
                <a href="https://github.com/faizaaslam" target="_blank" rel="noopener noreferrer" className="about-social-link">
                  <FiGithub size={13} /> GitHub
                </a>
                <a href="https://linkedin.com/in/faiza-aslam-891b30276" target="_blank" rel="noopener noreferrer" className="about-social-link">
                  <FiLinkedin size={13} /> LinkedIn
                </a>
              </div>

              <a href="/resume.pdf" download className="btn btn-primary">
                <FiDownload size={14} /> Download Resume
              </a>
            </AnimatedSection>

            {/* Right — Story */}
            <AnimatedSection direction="right" className="about-right">
              <div className="about-story-header">
                <span className="section-label">My story</span>
                <h2 className="about-story-title">
                  Who I Am &<br />
                  <span className="accent">What I Build</span>
                </h2>
              </div>

              <div className="about-story-text">
                <p>
                  I'm a Computer Science graduate from COMSATS University Islamabad, Lahore Campus. 
                  My focus is on frontend engineering, and I enjoy building elegant, high-performance, 
                  and fully responsive web applications using HTML, CSS, JavaScript, React.js, Tailwind CSS, and Bootstrap.
                </p>
                <p>
                  Through my professional internships, including working as a Frontend Developer Intern at 
                  <span className="accent-inline"> Vise Tech</span>, I gained valuable practical experience building 
                  responsive user interfaces, optimizing styling, improving overall user experiences, and integrating REST APIs.
                </p>
                <p>
                  For my Final Year Project, I led the development of an <span className="accent-inline">NLP-based Interview Assessment System</span>, 
                  where I worked across the full stack to build candidate evaluation pipelines, resume parsers, CV similarity screening, 
                  and automated quiz assessment routes.
                </p>
                <p>
                  I am passionate about continuous learning, writing clean code, and working in collaborative environments to 
                  solve challenging problems and deliver impactful digital products.
                </p>
              </div>

              {/* Quick facts */}
              <div className="about-facts">
                {facts.map(({ icon, text }) => (
                  <div key={text} className="about-fact">
                    <span className="fact-icon">{icon}</span>
                    <span className="fact-text">{text}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="section edu-section">
        <div className="container">
          <AnimatedSection className="section-header">
            <span className="section-label">Academic</span>
            <h2 className="section-title">Education <span className="accent">History</span></h2>
            <p className="section-subtitle">Academic foundations from FSc Pre-Medical to Bachelor of Computer Science.</p>
          </AnimatedSection>

          <div className="edu-list">
            {education.map((edu, i) => (
              <AnimatedSection key={edu.id} delay={i * 0.1} className="edu-row">
                <div className="edu-spine">
                  <div className="edu-icon-circle">{edu.icon}</div>
                  {i < education.length - 1 && <div className="edu-spine-line" />}
                </div>
                <div className="edu-content">
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
    </div>
  );
};

export default About;
