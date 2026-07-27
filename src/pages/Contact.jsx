import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiMail, FiGithub, FiLinkedin, FiSend, FiMapPin, FiCheck, FiAlertCircle } from 'react-icons/fi';
import AnimatedSection from '../components/AnimatedSection';
import './Contact.css';

const socials = [
  { icon: <FiGithub />,   label: 'GitHub',   value: 'github.com/faizaaslam',       href: 'https://github.com/faizaaslam' },
  { icon: <FiLinkedin />, label: 'LinkedIn', value: 'linkedin.com/in/faiza-aslam-891b30276',   href: 'https://linkedin.com/in/faiza-aslam-891b30276' },
  { icon: <FiMail />,     label: 'Email',    value: 'faizaaslam1040@gmail.com',     href: 'mailto:faizaaslam1040@gmail.com' },
  { icon: <FiMapPin />,   label: 'Location', value: 'Lahore, Pakistan',           href: null },
];

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const onSubmit = async (data) => {
    // Simulate sending (replace with real API call)
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Form data:', data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="contact-page">
      <div className="page-header">
        <div className="page-header-bg" />
        <div className="container">
          <AnimatedSection>
            <span className="section-label">Let's Talk</span>
            <h1 className="page-title">Get in <span className="gradient-text">Touch</span></h1>
            <p className="page-subtitle">Open to opportunities, collaborations, or just a friendly chat.</p>
          </AnimatedSection>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-layout">
            {/* Left Info */}
            <AnimatedSection direction="left" className="contact-info">
              <div className="contact-intro">
                <h2>Let's Build Something<br /><span className="gradient-text">Together</span></h2>
                <p>
                  I'm actively looking for full-time frontend or full-stack developer roles. 
                  Whether you have a job opportunity, a project idea, or just want to connect — 
                  I'd love to hear from you!
                </p>
              </div>

              <div className="contact-cards">
                {socials.map(({ icon, label, value, href }) => (
                  <motion.div key={label} className="contact-card card" whileHover={{ x: 6 }}>
                    <div className="contact-card-icon">{icon}</div>
                    <div className="contact-card-info">
                      <span className="contact-card-label">{label}</span>
                      {href ? (
                        <a href={href} target="_blank" rel="noopener noreferrer" className="contact-card-value">
                          {value}
                        </a>
                      ) : (
                        <span className="contact-card-value">{value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="contact-availability">
                <div className="avail-dot" />
                <div>
                  <strong>Currently Available</strong>
                  <p>Open to full-time roles & freelance projects</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Right Form */}
            <AnimatedSection direction="right" className="contact-form-col">
              <div className="contact-form-card card">
                <h3 className="form-title">Send a Message</h3>

                {submitted && (
                  <motion.div
                    className="form-success"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <FiCheck /> Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}

                <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-name">Full Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="John Doe"
                        className={`form-input ${errors.name ? 'error' : ''}`}
                        {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Name too short' } })}
                      />
                      {errors.name && <span className="form-error"><FiAlertCircle size={12} /> {errors.name.message}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-email">Email Address</label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="john@example.com"
                        className={`form-input ${errors.email ? 'error' : ''}`}
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' }
                        })}
                      />
                      {errors.email && <span className="form-error"><FiAlertCircle size={12} /> {errors.email.message}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-subject">Subject</label>
                    <input
                      id="contact-subject"
                      type="text"
                      placeholder="Job Opportunity / Collaboration / General"
                      className={`form-input ${errors.subject ? 'error' : ''}`}
                      {...register('subject', { required: 'Subject is required' })}
                    />
                    {errors.subject && <span className="form-error"><FiAlertCircle size={12} /> {errors.subject.message}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-message">Message</label>
                    <textarea
                      id="contact-message"
                      placeholder="Tell me about your project, opportunity, or how we can work together..."
                      rows={6}
                      className={`form-input form-textarea ${errors.message ? 'error' : ''}`}
                      {...register('message', { required: 'Message is required', minLength: { value: 20, message: 'Message too short (min 20 characters)' } })}
                    />
                    {errors.message && <span className="form-error"><FiAlertCircle size={12} /> {errors.message.message}</span>}
                  </div>

                  <motion.button
                    type="submit"
                    className="btn btn-primary submit-btn"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {isSubmitting ? (
                      <><span className="spinner" /> Sending...</>
                    ) : (
                      <><FiSend /> Send Message</>
                    )}
                  </motion.button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
