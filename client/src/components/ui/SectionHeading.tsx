import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  number: string;
  tag: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  tag,
  title,
  subtitle,
  align = 'left',
  light = false,
}) => {
  return (
    <div className={`mb-16 md:mb-20 ${align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'}`}>
      {/* Category Pill Tag */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-4 font-mono text-xs tracking-wider uppercase backdrop-blur-md ${
          light
            ? 'border-navy-dark/15 bg-navy-dark/5 text-navy-dark'
            : 'border-violet/30 bg-violet/10 text-lime shadow-[0_0_15px_rgba(121,87,255,0.2)]'
        }`}
      >
        <span className="font-bold text-coral">{number}</span>
        <span className="opacity-40">/</span>
        <span>{tag}</span>
      </motion.div>

      {/* Main Display Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] ${
          light ? 'text-navy-dark' : 'text-offwhite'
        }`}
      >
        {title}
      </motion.h2>

      {/* Supporting Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`mt-4 text-base sm:text-lg md:text-xl font-normal leading-relaxed ${
            light ? 'text-navy-dark/70' : 'text-offwhite/70'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

