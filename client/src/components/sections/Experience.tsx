import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { experienceData } from '../../data/portfolioData.js';
import { SectionHeading } from '../ui/SectionHeading.js';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative py-24 sm:py-32 bg-navy-dark text-offwhite overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-violet/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-coral/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          number="04"
          tag="PRACTICAL EXPERIENCE"
          title="Industry Internships & Applied Learning."
          subtitle="Direct technical exposure in machine learning workflows and full-stack web development."
        />

        {/* Timeline Container */}
        <div className="relative mt-12 sm:mt-16">
          {/* Animated Central Vertical Neon Line */}
          <div className="absolute top-4 bottom-4 left-4 sm:left-1/2 w-0.5 bg-gradient-to-b from-violet via-coral to-lime -translate-x-1/2 opacity-30 sm:opacity-40" />

          <div className="space-y-12 sm:space-y-16">
            {experienceData.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={exp.id}
                  className="relative flex flex-col sm:flex-row items-start"
                >
                  {/* Timeline Center Node Badge */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-navy-dark border-2 border-violet flex items-center justify-center z-10 shadow-[0_0_15px_rgba(121,87,255,0.6)]">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: exp.color }}
                    />
                  </div>

                  {/* Left Column (Desktop) */}
                  <div
                    className={`pl-12 sm:pl-0 sm:w-1/2 ${
                      isEven ? 'sm:pr-12 sm:text-right' : 'sm:order-2 sm:pl-12'
                    } w-full`}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.6 }}
                      className="p-6 sm:p-8 rounded-3xl bg-navy-surface/70 border border-white/10 hover:border-violet/40 backdrop-blur-md shadow-xl transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] group"
                    >
                      {/* Duration & Semester Badges */}
                      <div
                        className={`flex flex-wrap items-center gap-2 mb-3 ${
                          isEven ? 'sm:justify-end' : 'sm:justify-start'
                        }`}
                      >
                        <span
                          className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase"
                          style={{
                            backgroundColor: `${exp.color}18`,
                            color: exp.color,
                            border: `1px solid ${exp.color}40`,
                          }}
                        >
                          {exp.duration}
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-offwhite/60">
                          {exp.semester}
                        </span>
                      </div>

                      {/* Role & Company */}
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-offwhite group-hover:text-white transition-colors">
                        {exp.role}
                      </h3>
                      <p
                        className="font-mono text-xs sm:text-sm font-semibold mt-1"
                        style={{ color: exp.color }}
                      >
                        {exp.company}
                      </p>

                      {/* Bullet Achievements */}
                      <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-offwhite/80 text-left">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle2
                              className="w-4 h-4 shrink-0 mt-0.5"
                              style={{ color: exp.color }}
                            />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Technology Pills */}
                      <div
                        className={`flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-white/10 ${
                          isEven ? 'sm:justify-end' : 'sm:justify-start'
                        }`}
                      >
                        {exp.technologies.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-navy-deep border border-white/10 text-offwhite/80"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Empty Spacer Column for Desktop */}
                  <div
                    className={`hidden sm:block sm:w-1/2 ${
                      isEven ? 'sm:order-2' : 'sm:order-1'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
