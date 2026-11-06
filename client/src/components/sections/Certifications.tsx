import React from 'react';
import { motion } from 'framer-motion';
import { Radio, Cloud, Code, Award, CheckCircle2 } from 'lucide-react';
import { certificationsData } from '../../data/portfolioData.js';
import { SectionHeading } from '../ui/SectionHeading.js';

const certIconMap: Record<string, React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>> = {
  Radio,
  Cloud,
  Code,
};

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="relative py-24 sm:py-32 bg-navy-dark text-offwhite overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 right-10 w-72 h-72 bg-violet/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          number="06"
          tag="CREDENTIALS"
          title="Verified Professional Certifications."
          subtitle="Continuous learning through nationally recognized academic bodies and developer foundations."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {certificationsData.map((cert, index) => {
            const IconComp = certIconMap[cert.icon] || Award;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative rounded-3xl bg-navy-surface/60 border border-white/10 hover:border-violet/50 p-6 sm:p-8 backdrop-blur-md shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Glowing border accent */}
                <div
                  className="absolute top-0 right-0 w-28 h-28 rounded-tr-3xl opacity-20 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at top right, ${cert.color}, transparent 70%)`,
                  }}
                />

                <div>
                  {/* Top Issuer Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-md"
                      style={{
                        backgroundColor: `${cert.color}15`,
                        border: `1px solid ${cert.color}35`,
                        color: cert.color,
                      }}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>

                    <span
                      className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase"
                      style={{
                        backgroundColor: `${cert.color}18`,
                        color: cert.color,
                        border: `1px solid ${cert.color}35`,
                      }}
                    >
                      {cert.issuer}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-offwhite group-hover:text-white transition-colors mb-4">
                    {cert.title}
                  </h3>

                  {/* Skills tags covered */}
                  <div className="space-y-2 mb-6">
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-offwhite/50">
                      Competencies Covered
                    </span>
                    <ul className="space-y-1.5">
                      {cert.skills.map((skill, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-offwhite/80">
                          <CheckCircle2
                            className="w-3.5 h-3.5 shrink-0"
                            style={{ color: cert.color }}
                          />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Verified Status */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-offwhite/60">
                  <span className="flex items-center gap-1.5 text-lime font-semibold">
                    <span className="w-2 h-2 rounded-full bg-lime" />
                    Verified Credential
                  </span>
                  <span>{cert.issuer}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

