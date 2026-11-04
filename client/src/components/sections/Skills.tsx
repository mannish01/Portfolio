import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Layout,
  Server,
  Database,
  Wrench,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  GitBranch,
  Github,
  Globe,
  Palette,
  Workflow,
  Leaf,
  Flame,
  Binary,
  FileCode2,
  FileCode,
} from 'lucide-react';
import { skillCategoriesData } from '../../data/portfolioData.js';
import { SectionHeading } from '../ui/SectionHeading.js';

// Map icon strings to Lucide components
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Code2,
  Layout,
  Server,
  Database,
  Wrench,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  GitBranch,
  Github,
  Globe,
  Palette,
  Workflow,
  Leaf,
  Flame,
  Binary,
  FileCode2,
  FileCode,
};

export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const allSkills = skillCategoriesData.flatMap((cat) =>
    cat.skills.map((s) => ({ ...s, categoryTitle: cat.title }))
  );

  const displayedSkills =
    activeTab === 'all'
      ? allSkills
      : allSkills.filter((s) => s.category === activeTab);

  return (
    <section id="skills" className="relative py-24 sm:py-32 bg-navy-dark text-offwhite overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-violet/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-lime/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          number="02"
          tag="TECHNICAL TOOLKIT"
          title="Engineered with Modern Technologies & Robust Frameworks."
          subtitle="A categorized overview of programming languages, frontend ecosystems, backend runtimes, and databases verified on my resume."
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-start gap-2 sm:gap-3 mb-12">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-mono text-xs sm:text-sm font-semibold transition-all duration-300 ${
              activeTab === 'all'
                ? 'bg-lime text-navy-dark shadow-[0_0_20px_rgba(215,255,100,0.4)]'
                : 'bg-navy-surface/80 text-offwhite/70 hover:text-offwhite hover:bg-navy-surface border border-white/10'
            }`}
          >
            All Skills ({allSkills.length})
          </button>

          {skillCategoriesData.map((category) => {
            const isActive = activeTab === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-mono text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-violet text-white shadow-[0_0_20px_rgba(121,87,255,0.4)]'
                    : 'bg-navy-surface/80 text-offwhite/70 hover:text-offwhite hover:bg-navy-surface border border-white/10'
                }`}
              >
                {category.title.split(' ')[0]} ({category.skills.length})
              </button>
            );
          })}
        </div>

        {/* Animated Skills Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5 mb-16">
          <AnimatePresence>
            {displayedSkills.map((skill) => {
              const IconComponent = iconMap[skill.iconName] || Code2;
              return (
                <motion.div
                  layout
                  key={`${skill.category}-${skill.name}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="group relative p-5 rounded-2xl bg-navy-surface/60 border border-white/10 hover:border-violet/60 backdrop-blur-md flex flex-col items-center text-center justify-between transition-all shadow-md hover:shadow-[0_10px_25px_rgba(121,87,255,0.2)]"
                >
                  {/* Subtle Top Indicator Dot */}
                  <div
                    className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: skill.color }}
                  />

                  {/* Technology Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${skill.color}15`,
                      border: `1px solid ${skill.color}35`,
                      color: skill.color,
                    }}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Skill Name */}
                  <h4 className="font-display font-semibold text-sm text-offwhite group-hover:text-white transition-colors">
                    {skill.name}
                  </h4>

                  {/* Category Pill */}
                  <span className="mt-2 text-[10px] font-mono uppercase tracking-wider text-offwhite/50 group-hover:text-offwhite/70">
                    {skill.category}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Interactive Developer Workflow Terminal Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-navy-deep border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-coral/80" />
              <div className="w-3 h-3 rounded-full bg-lime/80" />
              <div className="w-3 h-3 rounded-full bg-violet/80" />
              <span className="ml-2 font-mono text-xs text-offwhite/50">
                manish@sitamarhi:~/workspace/portfolio
              </span>
            </div>
            <span className="font-mono text-xs text-lime flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-lime animate-ping" />
              BUILD_SUCCESS
            </span>
          </div>

          <pre className="font-mono text-xs sm:text-sm text-offwhite/90 overflow-x-auto leading-relaxed">
            <code>
              <span className="text-violet-light font-bold">const</span> developer = &#123;{'\n'}
              {'  '}name: <span className="text-lime">"Manish Kumar"</span>,{'\n'}
              {'  '}education: <span className="text-lime">"Sitamarhi Institute of Technology (2023–2027)"</span>,{'\n'}
              {'  '}cgpa: <span className="text-coral">8.51</span>,{'\n'}
              {'  '}primaryStack: [<span className="text-lime">"React"</span>, <span className="text-lime">"TypeScript"</span>, <span className="text-lime">"Node.js"</span>, <span className="text-lime">"Express"</span>, <span className="text-lime">"PostgreSQL"</span>, <span className="text-lime">"MongoDB"</span>],{'\n'}
              {'  '}orm: <span className="text-violet-light">"Prisma ORM"</span>,{'\n'}
              {'  '}specialization: <span className="text-coral">"Artificial Intelligence & Machine Learning"</span>,{'\n'}
              {'  '}availableForOpportunities: <span className="text-lime font-bold">true</span>{'\n'}
              &#125;;
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
};

