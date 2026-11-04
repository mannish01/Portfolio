import React from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Calendar,
  Award,
  BookOpen,
} from 'lucide-react';
import { educationData } from '../../data/portfolioData.js';
import { SectionHeading } from '../ui/SectionHeading.js';

export const Education: React.FC = () => {
  return (
    <section id="education" className="relative py-24 sm:py-32 bg-navy-surface text-offwhite overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          number="05"
          tag="ACADEMIC BACKGROUND"
          title="Formal Computer Science & AI Education."
          subtitle="Building rigorous fundamentals in algorithms, computing systems, and intelligent machine learning workflows."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl bg-navy-deep/90 border border-white/15 p-8 sm:p-12 shadow-2xl backdrop-blur-xl overflow-hidden"
        >
          {/* Decorative Corner Ribbon */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-lime/20 via-violet/10 to-transparent rounded-full blur-xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Main Degree Details */}
            <div className="md:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-lime/15 border border-lime/30 text-lime uppercase tracking-wider">
                  UNDERGRADUATE DEGREE
                </span>
                <span className="flex items-center gap-1.5 text-xs font-mono text-offwhite/60">
                  <Calendar className="w-3.5 h-3.5 text-coral" />
                  <span>{educationData.period}</span>
                </span>
                <span className="flex items-center gap-1.5 text-xs font-mono text-offwhite/60">
                  <MapPin className="w-3.5 h-3.5 text-violet-light" />
                  <span>{educationData.location}</span>
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-black text-offwhite leading-tight">
                  {educationData.degree}
                </h3>
                <p className="font-mono text-sm sm:text-base font-semibold text-coral mt-1">
                  {educationData.field}
                </p>
                <p className="text-base text-offwhite/80 font-medium mt-1">
                  {educationData.institution}
                </p>
              </div>

              <div className="pt-2">
                <h4 className="font-mono text-xs uppercase tracking-wider text-offwhite/50 mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-lime" />
                  <span>Key Coursework & Domains</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {educationData.coreSubjects.map((subject) => (
                    <span
                      key={subject}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono bg-navy-surface border border-white/10 text-offwhite/85"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right CGPA Standout Stat Box */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-navy-surface border border-violet/30 shadow-inner text-center">
              <Award className="w-8 h-8 text-lime mb-2 animate-bounce" />
              <span className="font-mono text-xs text-offwhite/60 uppercase tracking-widest">
                Academic Performance
              </span>
              <div className="flex items-baseline gap-1 my-2">
                <span className="font-display text-5xl sm:text-6xl font-black text-lime">
                  {educationData.cgpa}
                </span>
                <span className="font-mono text-base text-offwhite/50 font-bold">
                  / {educationData.scale}
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-violet/20 border border-violet/40 text-violet-light">
                High First Class Distinction
              </span>
              <p className="mt-3 text-[11px] text-offwhite/60">
                Recognized for academic rigor and technical foundations.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
