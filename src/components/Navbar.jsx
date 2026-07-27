import { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { ThemeContext } from '../context/ThemeContext';
import './Navbar.css';

const navItems = [
  { label: 'Projects',       anchor: 'projects' },
  { label: 'Certifications', anchor: 'certifications' },
  { label: 'Skills',         anchor: 'skills' },
];

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [scrolled, setScrolled]  = useState(false);
  const [menuOpen, setMenuOpen]  = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollToSection = (anchor) => {
    setMenuOpen(false);
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
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo */}
          <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
            <div className="logo-icon">F</div>
            <span className="logo-text">Faiza<span className="logo-dot">.</span></span>
          </Link>

          {/* Desktop links — absolutely centred */}
          <ul className="nav-links">
            {navItems.map(({ label, anchor }) => (
              <li key={anchor}>
                <button
                  className="nav-link nav-anchor"
                  onClick={() => scrollToSection(anchor)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="nav-controls">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? <FiSun size={15} /> : <FiMoon size={15} />}
            </button>
            <button
              className="nav-contact-btn"
              onClick={() => scrollToSection('contact')}
            >
              Contact Me
            </button>
            <button className="hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
              {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            >
              <ul className="mobile-links">
                {[...navItems, { label: 'Contact', anchor: 'contact' }].map(({ label, anchor }, i) => (
                  <motion.li
                    key={anchor}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <button
                      className="mobile-link"
                      onClick={() => scrollToSection(anchor)}
                    >
                      <span className="mobile-link-num">0{i + 1}</span>
                      {label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
