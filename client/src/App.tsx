import React from 'react';
import { useLenis } from './hooks/useLenis.js';
import { CustomCursor } from './components/animations/CustomCursor.js';
import { Navbar } from './components/layout/Navbar.js';
import { Hero } from './components/sections/Hero.js';
import { About } from './components/sections/About.js';
import { Skills } from './components/sections/Skills.js';
import { Projects } from './components/sections/Projects.js';
import { Experience } from './components/sections/Experience.js';
import { Education } from './components/sections/Education.js';
import { Certifications } from './components/sections/Certifications.js';
import { Contact } from './components/sections/Contact.js';
import { Footer } from './components/layout/Footer.js';

export const App: React.FC = () => {
  const { scrollTo } = useLenis();

  const handleScrollTo = (target: string) => {
    scrollTo(target);
  };

  return (
    <div className="relative min-h-screen bg-navy-dark text-offwhite selection:bg-coral selection:text-navy-dark">
      {/* Standout Custom Cursor */}
      <CustomCursor />

      {/* Navigation Bar */}
      <Navbar onNavigate={handleScrollTo} />

      {/* Main Content Sections */}
      <main>
        <Hero onScrollTo={handleScrollTo} />
        <About onScrollTo={handleScrollTo} />
        <Skills />
        <Projects />
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

