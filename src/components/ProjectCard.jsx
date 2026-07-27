import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi';
import './ProjectCard.css';

const tagColorMap = {
  React: 'accent',        'Node.js': 'blue',   PostgreSQL: 'blue',
  Python: 'sage',         NLP: 'accent',       JWT: 'rose',
  Express: 'blue',        spaCy: 'sage',        PySpark: 'rose',
  'Machine Learning': 'rose', 'Apache Spark': 'rose',
  Vite: 'accent',         'Framer Motion': 'lavender', CSS: 'blue',
  'React Router': 'accent', JavaScript: 'accent', 'scikit-learn': 'sage',
  'MERN Stack': 'accent',  LLM: 'sage',        Flask: 'blue',
  'HuggingFace Transformers': 'lavender', 'Sentence-BERT': 'sage',
  OCR: 'rose',            Docling: 'blue',
};

const colorClass = tag => `tag-${tagColorMap[tag] || 'default'}`;

const ProjectCard = ({ project, index = 0 }) => {
  const navigate = useNavigate();
  const { id, title, category, duration, status, description, tags, github, live, featured, caseStudyLink } = project;
  const detailPath = caseStudyLink || `/projects/${id}`;

  return (
    <motion.article
      className={`project-card ${featured ? 'is-featured' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      layout
      onClick={() => navigate(detailPath)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(detailPath)}
    >
      {/* Top accent line */}
      <div className="card-accent-line" />

      <div className="project-card-inner">
        {/* Header */}
        <div className="pc-header">
          <div className="pc-meta">
            <span className="pc-category mono">{category}</span>
            <span className={`badge ${status === 'Complete' ? 'badge-complete' : 'badge-progress'}`}>
              {status}
            </span>
          </div>
          {featured && <span className="pc-featured-label">Featured</span>}
        </div>

        {/* Title */}
        <h3 className="pc-title">{title}</h3>

        {/* Duration */}
        <span className="pc-duration mono">{duration}</span>

        {/* Description */}
        <p className="pc-desc">{description}</p>

        {/* Tags */}
        <div className="pc-tags">
          {tags.slice(0, 5).map(tag => (
            <span key={tag} className={`tag ${colorClass(tag)}`}>{tag}</span>
          ))}
          {tags.length > 5 && <span className="tag">+{tags.length - 5}</span>}
        </div>

        {/* Actions */}
        <div className="pc-actions">
          <button
            className="pc-case-study-btn"
            onClick={e => { e.stopPropagation(); navigate(detailPath); }}
          >
            Case Study <FiArrowRight size={13} />
          </button>
          <div className="pc-icon-actions">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="pc-icon-btn"
                onClick={e => e.stopPropagation()}
                aria-label="GitHub"
              >
                <FiGithub size={15} />
              </a>
            )}
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="pc-icon-btn"
                onClick={e => e.stopPropagation()}
                aria-label="Live Demo"
              >
                <FiExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
