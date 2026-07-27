import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import { skillCategories } from '../data/skills';
import './Skills.css';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const current = skillCategories.find(c => c.id === activeCategory);

  return (
    <div className="skills-page">
      <div className="page-header">
        <div className="page-header-bg" />
        <div className="container">
          <AnimatedSection>
            <span className="section-label">My arsenal</span>
            <h1 className="page-title">
              Skills &<br /><span className="accent">Technologies</span>
            </h1>
            <p className="page-subtitle">Hover a skill card to see experience and which projects it was used in.</p>
          </AnimatedSection>
        </div>
      </div>

      <section className="section">
        <div className="container">

          {/* Tabs */}
          <AnimatedSection>
            <div className="skill-tabs">
              {skillCategories.map(({ id, label }) => (
                <motion.button
                  key={id}
                  className={`skill-tab ${activeCategory === id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(id)}
                  whileTap={{ scale: 0.97 }}
                >
                  {label}
                </motion.button>
              ))}
            </div>
          </AnimatedSection>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="skills-grid"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {current.skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  className="skill-card"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="skill-card-top">
                    <h3 className="skill-name">{skill.name}</h3>
                    <span className="skill-years">{skill.years}yr</span>
                  </div>

                  <div className="skill-track">
                    <motion.div
                      className="skill-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.9, delay: i * 0.04 + 0.1, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>

                  {/* Hover info */}
                  <AnimatePresence>
                    {hoveredSkill === skill.name && (
                      <motion.div
                        className="skill-hover-info"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.18 }}
                      >
                        <div className="shi-header">
                          <span className="shi-label">Proficiency</span>
                          <span className="shi-val">{skill.level}%</span>
                        </div>
                        <div className="shi-divider" />
                        <div className="shi-projects-label">Used in</div>
                        <div className="shi-projects">
                          {skill.projects.map(p => (
                            <span key={p} className="shi-project">{p}</span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Summary */}
          <AnimatedSection delay={0.3}>
            <div className="skills-summary-row">
              {skillCategories.map(({ id, label, skills }) => (
                <div key={id} className="summary-chip">
                  <span className="summary-chip-num">{skills.length}</span>
                  <span className="summary-chip-label">{label}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Skills;
