import React from 'react';
import { useLenis } from './hooks/useLenis.js';
import { CustomCursor } from './components/animations/CustomCursor.js';
import { Navbar } from './components/layout/Navbar.js';
import { Hero } from './components/sections/Hero.js';
import { About } from './components/sections/About.js';
import { Skills } from './components/sections/Skills.js';
import { Projects } from './components/sections/Projects.js';
import { LeetCode } from './components/sections/LeetCode.js';
import { Experience } from './components/sections/Experience.js';
import { Education } from './components/sections/Education.js';
import { Certifications } from './components/sections/Certifications.js';
import { Contact } from './components/sections/Contact.js';
import { Footer } from './components/layout/Footer.js';

export const App: React.FC = () => {
  const { scrollTo } = useLenis();

  const handleScrollTo = (target: string) => {
    const id = target.replace('#', '');
    if (id) {
      const url = new URL(window.location.href);
      if (url.hash !== `#${id}`) {
        url.hash = id;
        window.history.pushState(null, '', url);
      }
    }
    scrollTo(target);
  };

  return (
    <div className="relative min-h-screen bg-navy-dark text-offwhite selection:bg-coral selection:text-navy-dark">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-lime focus:text-navy-dark focus:font-mono focus:text-sm"
      >
        Skip to content
      </a>

      {/* Standout Custom Cursor */}
      <CustomCursor />

      {/* Navigation Bar */}
      <Navbar onNavigate={handleScrollTo} />

      {/* Main Content Sections */}
      <main id="main-content">
        <Hero onScrollTo={handleScrollTo} />
        <About onScrollTo={handleScrollTo} />
        <Skills />
        <Projects />
        <LeetCode />
        <Experience />
        <Education />
        <Certifications />
        <Contact />
      </main>

      {/* Global Footer */}
      <Footer onScrollTo={handleScrollTo} />
    </div>
  );
};

export default App;

// Client application root component

