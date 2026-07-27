import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiMail, FiTwitter } from 'react-icons/fi';
import './Footer.css';

const socials = [
  { icon: <FiGithub size={14} />,   href: 'https://github.com/faizaaslam',                  label: 'GitHub' },
  { icon: <FiLinkedin size={14} />, href: 'https://linkedin.com/in/faiza-aslam-891b30276',   label: 'LinkedIn' },
  { icon: <FiTwitter size={14} />,  href: 'https://twitter.com/',                             label: 'Twitter' },
  { icon: <FiMail size={14} />,     href: 'mailto:faizaaslam1040@gmail.com',                  label: 'Email' },
];

const sectionLinks = [
  { label: 'Education',      anchor: 'education' },
  { label: 'Experience',     anchor: 'experience' },
  { label: 'Skills',         anchor: 'skills' },
  { label: 'Projects',       anchor: 'projects' },
  { label: 'Certifications', anchor: 'certifications' },
  { label: 'Contact',        anchor: 'contact' },
];

const Footer = () => {
  const location  = useLocation();
  const navigate  = useNavigate();

  const scrollTo = (anchor) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-top">
            {/* Brand */}
            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <div className="footer-logo-icon">F</div>
                <span className="footer-logo-name">Faiza<span>.</span></span>
              </Link>
              <p className="footer-tagline">
                Frontend & full-stack developer.<br />Building things that matter.
              </p>
              <div className="footer-social">
                {socials.map(({ icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                    aria-label={label}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Sections nav */}
            <nav className="footer-nav">
              <div className="footer-nav-group">
                <span className="footer-nav-label">Navigation</span>
                {sectionLinks.map(({ label, anchor }) => (
                  <button
                    key={anchor}
                    onClick={() => scrollTo(anchor)}
                    className="footer-nav-link footer-nav-btn"
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="footer-nav-group">
                <span className="footer-nav-label">Contact</span>
                <a href="mailto:faizaaslam1040@gmail.com" className="footer-nav-link">Email</a>
                <a href="https://github.com/faizaaslam" target="_blank" rel="noopener noreferrer" className="footer-nav-link">GitHub</a>
                <a href="https://linkedin.com/in/faiza-aslam-891b30276" target="_blank" rel="noopener noreferrer" className="footer-nav-link">LinkedIn</a>
                <Link to="/projects" className="footer-nav-link">All Projects</Link>
              </div>
            </nav>
          </div>

          {/* Bottom */}
          <div className="footer-bottom">
            <p className="footer-copy">
              © {new Date().getFullYear()}{' '}
              <a href="https://github.com/faizaaslam" target="_blank" rel="noopener noreferrer">
                Faiza Aslam
              </a>
              . Designed & built with care.
            </p>
            <p className="footer-stack mono">
              React · Vite · JetBrains Mono
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
