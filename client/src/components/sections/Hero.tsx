import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Sparkles,
  MapPin,
  Cpu,
  Layers,
  GraduationCap,
  CheckCircle2,
} from 'lucide-react';
import { personalInfo } from '../../data/portfolioData.js';
import { MagneticButton } from '../ui/MagneticButton.js';

interface HeroProps {
  onScrollTo: (target: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollTo }) => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-navy-dark"
    >
      {/* Dynamic Animated Mesh Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Violet Nebula */}
        <motion.div
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[15%] -left-[10%] w-[550px] sm:w-[700px] h-[550px] sm:h-[700px] rounded-full bg-gradient-to-br from-violet/30 via-violet/10 to-transparent blur-3xl opacity-70"
        />

        {/* Coral Sunrise */}
        <motion.div
          animate={{
            x: [0, -50, 40, 0],
            y: [0, 40, -40, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-[20%] -right-[15%] w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] rounded-full bg-gradient-to-bl from-coral/25 via-pink-soft/15 to-transparent blur-3xl opacity-60"
        />

        {/* Lime Energy Glow */}
        <motion.div
          animate={{
            x: [0, 30, -40, 0],
            y: [0, -30, 40, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute -bottom-[20%] left-[20%] w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full bg-gradient-to-tr from-lime/15 via-transparent to-transparent blur-3xl opacity-50"
        />

        {/* Subtle Geometric Grid Matrix */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #FAF8F3 1px, transparent 1px), linear-gradient(to bottom, #FAF8F3 1px, transparent 1px)',
            backgroundSize: '4rem 4rem',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main Grid: Left Narrative + Right Refined Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Heading, Bio & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Top Technical Metadata Bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-[11px] sm:text-xs text-offwhite/60"
            >
              {/* Location Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <MapPin className="w-3.5 h-3.5 text-coral" />
                <span>Samastipur, Bihar, India</span>
              </div>

              {/* Academic Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <GraduationCap className="w-3.5 h-3.5 text-lime" />
                <span>SIT Sitamarhi '27</span>
              </div>

              {/* Availability Status */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime/10 border border-lime/30 text-lime backdrop-blur-md font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-lime"></span>
                </span>
                <span>OPEN TO ROLES</span>
              </div>
            </motion.div>

            {/* Greeting & Name */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative"
            >
              <span className="block font-mono text-xs sm:text-sm font-semibold tracking-widest text-coral uppercase mb-2">
                [ DEVELOPER PORTFOLIO // 2026 ]
              </span>
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] text-offwhite">
                Hey, I'm{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-violet via-coral to-lime bg-clip-text text-transparent">
                    Manish Kumar
                  </span>
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="absolute -bottom-1 sm:-bottom-2 left-0 h-1 sm:h-1.5 bg-gradient-to-r from-violet to-coral rounded-full opacity-80"
                  />
                </span>
              </h1>
            </motion.div>

            {/* Supporting Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-offwhite/90 leading-tight">
                Building digital experiences with{' '}
                <span className="text-lime font-bold">code</span>,{' '}
                <span className="text-pink-soft font-bold">creativity</span> &{' '}
                <span className="text-coral font-bold">curiosity</span>.
              </h2>
            </motion.div>

            {/* Introduction Narrative */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg text-offwhite/75 font-normal leading-relaxed max-w-xl"
            >
              {personalInfo.heroBio}
            </motion.p>

            {/* Call to Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2"
            >
              <MagneticButton>
                <button
                  onClick={() => onScrollTo('#projects')}
                  className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-violet to-coral text-offwhite font-mono text-xs sm:text-sm font-bold tracking-wide uppercase shadow-[0_0_25px_rgba(121,87,255,0.4)] hover:shadow-[0_0_35px_rgba(255,112,88,0.6)] transition-all duration-300"
                >
                  <span>Explore My Work</span>
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </button>
              </MagneticButton>

              <MagneticButton>
                <button
                  onClick={() => onScrollTo('#contact')}
                  className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-navy-surface hover:bg-navy-surface/80 text-offwhite border border-white/20 hover:border-lime font-mono text-xs sm:text-sm font-bold tracking-wide uppercase transition-all duration-300 shadow-md hover:text-lime"
                >
                  <Sparkles className="w-4 h-4 text-lime" />
                  <span>Let's Connect</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </MagneticButton>

              <MagneticButton>
                <a
                  href={personalInfo.resumeUrl}
                  download="Manish_Kumar_Resume.pdf"
                  className="group inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-offwhite/90 hover:text-offwhite border border-white/15 hover:border-white/30 font-mono text-xs sm:text-sm font-medium transition-all duration-300"
                >
                  <Download className="w-4 h-4 text-coral group-hover:-translate-y-0.5 transition-transform" />
                  <span>Resume</span>
                </a>
              </MagneticButton>
            </motion.div>

          </div>

          {/* Right Column: Properly Sized, High-Finish Portrait Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative w-full max-w-[300px] sm:max-w-[320px]"
            >
              {/* Subtle Ambient Backlight Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-violet/30 via-coral/20 to-lime/20 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

              {/* Main Card Frame */}
              <div className="relative rounded-3xl p-[2px] bg-gradient-to-b from-violet/60 via-coral/40 to-lime/30 shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl group overflow-hidden">
                <div className="relative rounded-[22px] bg-navy-deep overflow-hidden">
                  
                  {/* Photo Container */}
                  <div className="relative overflow-hidden bg-navy-surface">
                    <img
                      src="/images/manish-portrait.jpg"
                      alt="Manish Kumar — Full-Stack Developer & AI/ML Engineer"
                      className="w-full h-auto object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />

                    {/* Smooth Dark Gradient Blend at Base */}
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-navy-deep via-navy-deep/80 to-transparent pointer-events-none" />

                    {/* Identity Tag inside bottom of card */}
                    <div className="absolute bottom-3 inset-x-3 p-3 rounded-2xl bg-navy-surface/90 border border-white/10 backdrop-blur-md flex items-center justify-between shadow-lg">
                      <div className="space-y-0.5">
                        <h3 className="font-display font-bold text-sm text-offwhite flex items-center gap-1.5 leading-none">
                          <span>Manish Kumar</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-lime inline" />
                        </h3>
                        <p className="font-mono text-[11px] text-offwhite/60">
                          Full-Stack Dev • AI & ML
                        </p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-lime/15 border border-lime/30 text-lime font-bold">
                        SIT '27
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Refined Integrated Metadata Chips (Cleanly positioned below with zero overlap) */}
              <div className="mt-3.5 grid grid-cols-2 gap-2.5">
                <div className="p-2.5 rounded-2xl bg-navy-surface/90 border border-white/10 backdrop-blur-md flex items-center gap-2.5 shadow-md hover:border-lime/40 transition-colors">
                  <div className="p-1.5 rounded-xl bg-lime/10 text-lime shrink-0">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-offwhite/50 uppercase leading-none">Specialization</div>
                    <div className="text-xs font-bold text-offwhite font-display mt-0.5">AI & ML</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-2xl bg-navy-surface/90 border border-white/10 backdrop-blur-md flex items-center gap-2.5 shadow-md hover:border-violet/40 transition-colors">
                  <div className="p-1.5 rounded-xl bg-violet/10 text-violet-light shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-offwhite/50 uppercase leading-none">Primary Stack</div>
                    <div className="text-xs font-bold text-offwhite font-display mt-0.5">MERN + TS</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex flex-col items-center gap-2 cursor-pointer pt-16"
          onClick={() => onScrollTo('#about')}
        >
          <span className="font-mono text-[10px] tracking-widest uppercase text-offwhite/50 hover:text-lime transition-colors">
            Scroll to explore
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-lime shadow-[0_0_8px_#D7FF64]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
