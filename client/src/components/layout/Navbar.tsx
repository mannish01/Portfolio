import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Download, Sparkles } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData.js';

interface NavbarProps {
  onNavigate?: (id: string) => void;
}

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    if (onNavigate) {
      onNavigate(href);
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-navy-dark/80 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo with Redesigned Photo Avatar */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick('#home', e)}
            className="group flex items-center gap-3 text-offwhite"
          >
            <div className="relative">
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full p-0.5 bg-gradient-to-tr from-violet via-coral to-lime shadow-[0_0_18px_rgba(121,87,255,0.55)] group-hover:scale-105 group-hover:shadow-[0_0_22px_rgba(255,112,88,0.6)] transition-all duration-300 overflow-hidden">
                <img
                  src="/images/manish-square.jpg"
                  alt="Manish Kumar"
                  className="w-full h-full rounded-full object-cover object-top"
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-lime border-2 border-navy-dark shadow-[0_0_8px_#D7FF64]" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg sm:text-xl font-black tracking-tight leading-none text-offwhite">
                MANISH<span className="text-coral group-hover:text-lime transition-colors">.</span>
              </span>
              <span className="text-[10px] font-mono text-offwhite/50 tracking-wider">DEV & AI/ML</span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-navy-surface/60 border border-white/10 backdrop-blur-md shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(link.href, e)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-offwhite/70 hover:text-offwhite hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-gradient-to-r from-violet to-coral rounded-full -z-10 shadow-[0_0_12px_rgba(121,87,255,0.5)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Resume Download CTA */}
            <a
              href={personalInfo.resumeUrl}
              download="Manish_Kumar_Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-semibold bg-white/5 hover:bg-white/10 border border-white/15 text-offwhite hover:text-lime transition-all duration-300 hover:border-lime/40"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>

            {/* Let's Talk Magnetic CTA */}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick('#contact', e)}
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-semibold text-navy-dark bg-lime hover:bg-lime-light transition-all duration-300 shadow-[0_0_20px_rgba(215,255,100,0.35)] hover:shadow-[0_0_25px_rgba(215,255,100,0.55)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-navy-dark" />
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-offwhite hover:text-lime transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Animated Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[70px] z-40 lg:hidden px-4 py-6 bg-navy-dark/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
          >
            <div className="flex flex-col gap-2 max-w-md mx-auto">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(link.href, e)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-mono transition-all ${
                      isActive
                        ? 'bg-violet/20 border border-violet/40 text-lime font-bold'
                        : 'text-offwhite/80 hover:bg-white/5 hover:text-offwhite'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && <div className="w-2 h-2 rounded-full bg-lime animate-pulse" />}
                  </a>
                );
              })}

              <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
                <a
                  href={personalInfo.resumeUrl}
                  download="Manish_Kumar_Resume.pdf"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-mono font-semibold bg-white/5 border border-white/15 text-offwhite hover:text-lime"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume (PDF)</span>
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick('#contact', e)}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-mono font-bold bg-lime text-navy-dark shadow-[0_0_20px_rgba(215,255,100,0.3)]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Let's Connect</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

