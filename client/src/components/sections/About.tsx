import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Code2,
  Brain,
  Rocket,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { educationData } from '../../data/portfolioData.js';
import { SectionHeading } from '../ui/SectionHeading.js';

interface AboutProps {
  onScrollTo?: (target: string) => void;
}

export const About: React.FC<AboutProps> = ({ onScrollTo }) => {
  return (
    <section id="about" className="relative py-24 sm:py-32 bg-navy-deep text-offwhite overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-coral/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          number="01"
          tag="WHO I AM"
          title="Bridging Artificial Intelligence with Modern Web Engineering."
          subtitle="A disciplined Computer Science undergraduate with hands-on experience developing production-grade web applications and exploring intelligent algorithms."
        />

        {/* Split Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Authentic Bio & Philosophy */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 sm:p-10 rounded-3xl bg-navy-surface/50 border border-white/10 backdrop-blur-md relative overflow-hidden group hover:border-violet/40 transition-colors"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-violet/20 to-transparent rounded-bl-full pointer-events-none" />

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-offwhite mb-4">
                The intersection of algorithmic logic and thoughtful user experiences.
              </h3>

              <div className="space-y-4 text-offwhite/80 text-base sm:text-lg leading-relaxed">
                <p>
                  I'm currently pursuing my <span className="text-lime font-medium">B.Tech in Computer Science & Engineering with specialization in AI & Machine Learning</span> at{' '}
                  <strong className="text-offwhite font-semibold">Sitamarhi Institute of Technology</strong> (2023–2027), where I maintain a cumulative grade point average of{' '}
                  <span className="text-coral font-bold font-mono">8.51 / 10</span>.
                </p>
                <p>
                  My engineering journey is driven by practical execution. Rather than remaining within theoretical bounds, I apply my skills to real products—architecting full-stack applications with <strong className="text-violet-light font-medium">React, TypeScript, Node.js, Express, and PostgreSQL/MongoDB</strong>, and designing type-safe database schemas with <strong className="text-lime font-medium">Prisma ORM</strong>.
                </p>
                <p>
                  Having completed internships at <strong className="text-offwhite font-medium">NIELIT</strong> (Machine Learning) and <strong className="text-offwhite font-medium">Androwebstech Limited</strong> (Full Stack Web Development), I have gained firsthand experience with both modern client-server paradigms and foundational AI pipelines.
                </p>
              </div>

              {/* Core Pillars Grid */}
              <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-violet/10 text-violet border border-violet/20 shrink-0">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-offwhite text-sm">Full-Stack Reliability</h4>
                    <p className="text-xs text-offwhite/60 mt-0.5">End-to-end TypeScript, REST APIs, and relational/document databases.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-lime/10 text-lime border border-lime/20 shrink-0">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-offwhite text-sm">AI & ML Focus</h4>
                    <p className="text-xs text-offwhite/60 mt-0.5">Undergraduate specialization exploring intelligent data workflows.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Career Goal Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-6 rounded-2xl bg-gradient-to-r from-violet/20 via-navy-surface to-coral/10 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <Rocket className="w-6 h-6 text-lime shrink-0" />
                <div>
                  <h4 className="font-display font-bold text-offwhite text-base">Eager to contribute to a product team</h4>
                  <p className="text-xs text-offwhite/70">Ready to take on challenges as a MERN stack developer & engineer.</p>
                </div>
              </div>
              {onScrollTo && (
                <button
                  onClick={() => onScrollTo('#projects')}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-lime hover:text-white transition-colors"
                >
                  <span>See featured work</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </motion.div>
          </div>

          {/* Right Column: Editorial Highlight Cards & Academic Summary */}
          <div className="lg:col-span-5 space-y-6">
            {/* Academic Credential Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-3xl bg-navy-surface border border-white/10 shadow-xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-lime font-mono text-xs uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4" />
                  <span>Academic Standing</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-lime/10 text-lime border border-lime/30 font-mono text-xs font-bold">
                  2023 – 2027
                </span>
              </div>

              <h4 className="font-display text-xl font-bold text-offwhite mb-1">
                {educationData.institution}
              </h4>
              <p className="text-xs font-mono text-offwhite/60 mb-6">
                Sitamarhi, Bihar, India
              </p>

              {/* CGPA Big Metric Callout */}
              <div className="p-5 rounded-2xl bg-navy-dark/70 border border-violet/30 flex items-center justify-between mb-6">
                <div>
                  <span className="block font-mono text-xs text-offwhite/60 uppercase">Cumulative Grade Point</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-display text-4xl sm:text-5xl font-extrabold text-lime">
                      8.51
                    </span>
                    <span className="font-mono text-sm text-offwhite/50">/ 10</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-violet/20 border border-violet/50 flex items-center justify-center text-violet-light font-mono text-xs font-bold shadow-[0_0_15px_rgba(121,87,255,0.4)]">
                  TOP
                </div>
              </div>

              <div className="space-y-2.5">
                <span className="block font-mono text-xs uppercase tracking-wider text-coral font-semibold">
                  Degree & Focus
                </span>
                <p className="text-sm font-semibold text-offwhite">
                  B.Tech in Computer Science & Engineering (AI & ML)
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-offwhite/70">
                    Data Structures
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-offwhite/70">
                    Algorithms
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-offwhite/70">
                    Machine Learning
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-offwhite/70">
                    DBMS & Networks
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Quick Fact Sheet Box */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 rounded-3xl bg-navy-surface/40 border border-white/10"
            >
              <h4 className="font-mono text-xs uppercase tracking-wider text-offwhite/50 mb-4">
                Verified Resume Snapshot
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-offwhite/80">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-lime shrink-0" />
                  <span>2 Industry Internships (NIELIT & Androwebstech)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-coral shrink-0" />
                  <span>3 Official Certifications (NPTEL IoT, Cloud & freeCodeCamp)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-violet-light shrink-0" />
                  <span>Full-Stack Projects: ApplyLens (MERN+Prisma) & Travel Explorer</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-pink-soft shrink-0" />
                  <span>Actively building in React, TypeScript, Node.js & Python</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
