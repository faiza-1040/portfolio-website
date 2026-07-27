import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';
import './Projects.css';

const allTags = ['All', ...new Set(projects.flatMap(p => p.tags))];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.tags.includes(activeFilter));

  return (
    <div className="projects-page">
      <div className="page-header">
        <div className="page-header-bg" />
        <div className="container">
          <AnimatedSection>
            <span className="section-label">What I've built</span>
            <h1 className="page-title">
              Projects<span className="accent">.</span>
            </h1>
            <p className="page-subtitle">Click any card to read the full engineering case study.</p>
          </AnimatedSection>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Filter */}
          <AnimatedSection className="filter-wrap">
            <div className="filter-bar-v2">
              <span className="filter-mono-label">filter:</span>
              <div className="filter-chips">
                {allTags.slice(0, 14).map(tag => (
                  <motion.button
                    key={tag}
                    className={`filter-chip ${activeFilter === tag ? 'active' : ''}`}
                    onClick={() => setActiveFilter(tag)}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tag}
                  </motion.button>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <p className="results-info">
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
            {activeFilter !== 'All' && <> — <span className="accent">{activeFilter}</span></>}
          </p>

          {/* Grid */}
          <AnimatePresence mode="popLayout">
            <motion.div className="projects-grid-v2" layout>
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty */}
          {filtered.length === 0 && (
            <div className="no-results">
              <span>🔍</span>
              <p>No projects tagged "{activeFilter}"</p>
              <button className="btn btn-ghost" onClick={() => setActiveFilter('All')}>Reset filter</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
