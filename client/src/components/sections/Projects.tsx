import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  ArrowUpRight,
  Sparkles,
  Search,
  Filter,
  CheckCircle,
  Plane,
  Compass,
  MapPin,
  Calendar,
  Database,
  X,
  ExternalLink,
} from 'lucide-react';
import { projectsData } from '../../data/portfolioData.js';
import { Project } from '../../types/portfolio.js';
import { SectionHeading } from '../ui/SectionHeading.js';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-24 sm:py-32 bg-navy-surface text-offwhite overflow-hidden">
      {/* Visual Ambiance */}
      <div className="absolute -top-32 right-1/4 w-[500px] h-[500px] bg-violet/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/4 w-[500px] h-[500px] bg-coral/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          number="03"
          tag="CASE STUDIES"
          title="Featured Full-Stack Engineering Works."
          subtitle="Real-world applications engineered from database schema modeling to reactive frontend experiences."
        />

        {/* Project Cards Stack */}
        <div className="space-y-16 sm:space-y-24">
          {projectsData.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8 }}
                data-cursor="project"
                data-cursor-text="VIEW"
                className="group relative rounded-3xl bg-navy-deep/90 border border-white/10 hover:border-violet/50 shadow-2xl overflow-hidden transition-all duration-500"
              >
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 30%, ${project.accentColor}18, transparent 70%)`,
                  }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-10 lg:p-12 items-center">
                  {/* Left (or alternating) Content Column */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'} space-y-6`}>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-white/5 border border-white/10 text-lime">
                        {project.category}
                      </span>
                      <span className="text-xs font-mono text-offwhite/40">
                        {index === 0 ? '01 / 02' : '02 / 02'}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-offwhite group-hover:text-white transition-colors">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm sm:text-base font-medium text-coral">
                        {project.tagline}
                      </p>
                    </div>

                    <p className="text-sm sm:text-base text-offwhite/75 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Feature bullet list */}
                    <ul className="space-y-2 text-xs sm:text-sm text-offwhite/85">
                      {project.features.slice(0, 3).map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-lime shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-navy-surface border border-white/10 text-offwhite/90"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                      {/* GitHub Link */}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold bg-white/10 hover:bg-white/20 border border-white/15 text-offwhite hover:text-white transition-all shadow-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-4 h-4" />
                        <span>Source Code</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>

                      {/* Modal / Deep-dive Trigger */}
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold bg-violet text-white hover:bg-violet-dark transition-all shadow-[0_0_20px_rgba(121,87,255,0.4)]"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>View Architecture</span>
                      </button>
                    </div>
                  </div>

                  {/* Right (or alternating) Visual Interactive Mockup */}
                  <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div
                      onClick={() => setSelectedProject(project)}
                      className="cursor-pointer relative rounded-2xl bg-navy-dark/95 border border-white/15 p-4 sm:p-6 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                    >
                      {/* Browser / App Header */}
                      <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-coral/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-lime/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-violet/80" />
                          <span className="ml-2 font-mono text-[11px] text-offwhite/50 truncate max-w-[200px]">
                            {project.id === 'applylens'
                              ? 'https://applylens.dev/opportunities'
                              : 'https://travelexplorer.app/destinations'}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-lime uppercase tracking-widest bg-lime/10 px-2 py-0.5 rounded border border-lime/20">
                          {project.id === 'applylens' ? 'MERN + PRISMA' : 'PHP + MYSQL'}
                        </span>
                      </div>

                      {/* Interactive UI Mockup Representation */}
                      {project.id === 'applylens' ? (
                        /* ApplyLens Product Mockup */
                        <div className="space-y-4">
                          {/* Search & Filter Mockup Bar */}
                          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-navy-surface border border-white/10">
                            <Search className="w-4 h-4 text-violet-light shrink-0" />
                            <span className="text-xs font-mono text-offwhite/60 flex-1 truncate">
                              Search "Machine Learning Intern" or "Full Stack Developer"...
                            </span>
                            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-lime">
                              <Filter className="w-3 h-3" />
                              <span>Filter</span>
                            </div>
                          </div>

                          {/* Filter Tags */}
                          <div className="flex flex-wrap gap-1.5">
                            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-violet/20 text-violet-light border border-violet/30">
                              Active: Internship
                            </span>
                            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-lime/10 text-lime border border-lime/20">
                              Tech: React + Node
                            </span>
                            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-white/5 text-offwhite/70 border border-white/10">
                              Remote / India
                            </span>
                          </div>

                          {/* Mock Opportunity Cards */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="p-3.5 rounded-xl bg-navy-surface/80 border border-violet/30 hover:border-violet transition-colors">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-display font-bold text-xs text-offwhite">
                                  Frontend Developer Intern
                                </span>
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-lime/20 text-lime">
                                  98% Match
                                </span>
                              </div>
                              <p className="text-[11px] text-offwhite/60 mb-2">
                                React • TypeScript • Tailwind CSS
                              </p>
                              <div className="flex items-center justify-between text-[10px] font-mono text-offwhite/50">
                                <span>Stipend Verified</span>
                                <span className="text-coral">Apply Now →</span>
                              </div>
                            </div>

                            <div className="p-3.5 rounded-xl bg-navy-surface/80 border border-white/10 hover:border-lime/40 transition-colors">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-display font-bold text-xs text-offwhite">
                                  AI/ML Research Associate
                                </span>
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-violet/20 text-violet-light">
                                  94% Match
                                </span>
                              </div>
                              <p className="text-[11px] text-offwhite/60 mb-2">
                                Python • Machine Learning • Data
                              </p>
                              <div className="flex items-center justify-between text-[10px] font-mono text-offwhite/50">
                                <span>Remote</span>
                                <span className="text-lime">Apply Now →</span>
                              </div>
                            </div>
                          </div>

                          {/* Relational Database / Prisma Schema Peek */}
                          <div className="p-2.5 rounded-lg bg-navy-surface/50 border border-white/5 flex items-center justify-between text-[11px] font-mono text-offwhite/60">
                            <span className="flex items-center gap-1.5">
                              <Database className="w-3.5 h-3.5 text-lime" />
                              Prisma: 12 Relations mapped to PostgreSQL
                            </span>
                            <span className="text-violet-light font-bold">200 OK</span>
                          </div>
                        </div>
                      ) : (
                        /* Travel Explorer Product Mockup */
                        <div className="space-y-4">
                          {/* Search Destination Header */}
                          <div className="flex items-center justify-between p-3 rounded-xl bg-navy-surface border border-white/10">
                            <div className="flex items-center gap-2">
                              <Compass className="w-4 h-4 text-coral" />
                              <span className="font-display font-bold text-xs text-offwhite">
                                Discover Next Destination
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-mono text-offwhite/50">
                              <Calendar className="w-3 h-3 text-lime" />
                              <span>Roundtrip / One-way</span>
                            </div>
                          </div>

                          {/* Destination Cards Showcase */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="relative rounded-xl overflow-hidden border border-white/10 p-3.5 bg-gradient-to-br from-navy-surface to-coral/10">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-display font-bold text-xs text-offwhite flex items-center gap-1.5">
                                  <MapPin className="w-3.5 h-3.5 text-coral" />
                                  Shimla & Manali Circuit
                                </span>
                                <span className="text-[10px] font-mono text-lime font-bold">
                                  Verified
                                </span>
                              </div>
                              <p className="text-[11px] text-offwhite/60 mb-3">
                                Scenic Himalayan valley package with seat reservations.
                              </p>
                              <div className="flex items-center justify-between text-[10px] font-mono">
                                <span className="text-offwhite/70">PHP Booking Flow</span>
                                <span className="text-lime">Book Seat →</span>
                              </div>
                            </div>

                            <div className="relative rounded-xl overflow-hidden border border-white/10 p-3.5 bg-gradient-to-br from-navy-surface to-violet/15">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-display font-bold text-xs text-offwhite flex items-center gap-1.5">
                                  <MapPin className="w-3.5 h-3.5 text-violet-light" />
                                  Goa Coastal Express
                                </span>
                                <span className="text-[10px] font-mono text-lime font-bold">
                                  Trending
                                </span>
                              </div>
                              <p className="text-[11px] text-offwhite/60 mb-3">
                                Express coastal ticket booking with automated billing.
                              </p>
                              <div className="flex items-center justify-between text-[10px] font-mono">
                                <span className="text-offwhite/70">MySQL Database</span>
                                <span className="text-coral">Select Date →</span>
                              </div>
                            </div>
                          </div>

                          {/* PHP & Backend Reservation Status */}
                          <div className="p-2.5 rounded-lg bg-navy-surface/50 border border-white/5 flex items-center justify-between text-[11px] font-mono text-offwhite/60">
                            <span className="flex items-center gap-1.5">
                              <Plane className="w-3.5 h-3.5 text-coral" />
                              CodeIgniter MVC Architecture • PHP Session Handler
                            </span>
                            <span className="text-lime font-bold">200 OK</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Deep-Dive Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-navy-dark/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl rounded-3xl bg-navy-deep border border-white/20 p-6 sm:p-10 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-offwhite/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono font-semibold uppercase text-lime">
                    {selectedProject.category}
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl font-bold text-offwhite mt-1">
                    {selectedProject.title}
                  </h3>
                  <p className="text-base text-coral font-medium mt-1">
                    {selectedProject.tagline}
                  </p>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-offwhite/80 leading-relaxed">
                  <p>{selectedProject.longDescription}</p>
                </div>

                {/* Key Technical Highlights */}
                <div>
                  <h4 className="font-display font-semibold text-offwhite text-sm mb-3 uppercase tracking-wider">
                    Key Architectural Highlights
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedProject.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-offwhite/85">
                        <CheckCircle className="w-4 h-4 text-lime shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="font-display font-semibold text-offwhite text-sm mb-3 uppercase tracking-wider">
                    Technologies Utilized
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-navy-surface border border-white/10 text-offwhite"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* GitHub CTA */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-bold bg-lime text-navy-dark hover:bg-lime-light transition-all shadow-[0_0_20px_rgba(215,255,100,0.4)]"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository on GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-xs font-mono text-offwhite/60 hover:text-white transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
