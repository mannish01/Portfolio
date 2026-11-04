import React, { useState, useEffect } from 'react';
import {
  ArrowUp,
  Terminal,
  Home,
  User,
  Cpu,
  Layers,
  Briefcase,
  GraduationCap,
  Mail,
  Github,
  Linkedin,
  Phone,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { personalInfo } from '../../data/portfolioData.js';

interface FooterProps {
  onScrollTo: (target: string) => void;
}

const navItems = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Skills', href: '#skills', icon: Cpu },
  { name: 'Projects', href: '#projects', icon: Layers },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Education', href: '#education', icon: GraduationCap },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export const Footer: React.FC<FooterProps> = ({ onScrollTo }) => {
  const [localTime, setLocalTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Indian Standard Time (IST)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setLocalTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative bg-navy-dark text-offwhite border-t border-white/10 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10 items-start">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                onScrollTo('#home');
              }}
              className="inline-flex items-center gap-3 text-offwhite group"
            >
              <div className="relative">
                <div className="h-10 w-10 rounded-full p-0.5 bg-gradient-to-tr from-violet via-coral to-lime shadow-[0_0_15px_rgba(121,87,255,0.5)] group-hover:scale-105 transition-transform overflow-hidden">
                  <img
                    src="/images/manish-square.jpg"
                    alt="Manish Kumar"
                    className="w-full h-full rounded-full object-cover object-top"
                  />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-lime border-2 border-navy-dark shadow-[0_0_6px_#D7FF64]" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-black tracking-tight leading-none text-offwhite">
                  MANISH<span className="text-coral group-hover:text-lime transition-colors">.</span>
                </span>
                <span className="text-[10px] font-mono text-offwhite/50 tracking-wider">PORTFOLIO</span>
              </div>
            </a>

            <p className="text-sm text-offwhite/70 max-w-sm leading-relaxed">
              Computer Science & Engineering (AI & ML) undergraduate at Sitamarhi Institute of Technology. Building full-stack web products with passion and precision.
            </p>

            {/* Live Clock IST */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-surface border border-white/10 font-mono text-xs text-offwhite/80">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime"></span>
              </span>
              <span>SAMASTIPUR, IN: {localTime || '12:00:00 PM'} (IST)</span>
            </div>
          </div>

          {/* Quick Navigation Links with Icons */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-lime font-bold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Navigation</span>
            </h4>
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        onScrollTo(item.href);
                      }}
                      className="group flex items-center gap-2.5 text-offwhite/70 hover:text-white transition-colors py-0.5"
                    >
                      <Icon className="w-3.5 h-3.5 text-offwhite/40 group-hover:text-lime transition-colors" />
                      <span className="font-mono text-xs font-medium group-hover:translate-x-0.5 transition-transform">
                        {item.name}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Socials & Back to Top */}
          <div className="md:col-span-4 flex flex-col justify-between items-start md:items-end space-y-6">
            <div className="space-y-3 md:text-right">
              <h4 className="font-mono text-xs uppercase tracking-widest text-coral font-bold">
                Connect Directly
              </h4>
              <div className="flex flex-col md:items-end gap-2 text-xs font-mono">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-offwhite/75 hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-offwhite/50 group-hover:text-white transition-colors" />
                  <span>GitHub Profile</span>
                  <ArrowUpRight className="w-3 h-3 text-offwhite/40" />
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-offwhite/75 hover:text-[#0077B5] transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#0077B5]" />
                  <span>LinkedIn Network</span>
                  <ArrowUpRight className="w-3 h-3 text-offwhite/40" />
                </a>

                <a
                  href={`mailto:${personalInfo.email}`}
                  className="group inline-flex items-center gap-2 text-offwhite/75 hover:text-coral transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-coral" />
                  <span>{personalInfo.email}</span>
                </a>

                <a
                  href={`tel:${personalInfo.phone.replace(/[^0-9+]/g, '')}`}
                  className="group inline-flex items-center gap-2 text-offwhite/75 hover:text-lime transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-lime" />
                  <span>{personalInfo.phone}</span>
                </a>
              </div>
            </div>

            {/* Back to top button */}
            <button
              onClick={() => onScrollTo('#home')}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono font-semibold text-offwhite hover:text-lime transition-all"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform text-lime" />
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-offwhite/50">
          <p>© {new Date().getFullYear()} Manish Kumar. All rights reserved.</p>
          <div className="flex items-center gap-2 text-offwhite/60">
            <Terminal className="w-3.5 h-3.5 text-violet-light" />
            <span>MERN Stack • TypeScript • Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
