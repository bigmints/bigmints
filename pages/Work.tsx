import React, { useState } from 'react';
import { SiteConfig, ProjectCategory } from '../types';
import ProjectCard from '../components/ProjectCard';
import SEO from '../components/SEO';
interface WorkProps {
  config: SiteConfig | null;
}

const Work: React.FC<WorkProps> = ({ config }) => {
  const [filter, setFilter] = useState<ProjectCategory | 'All'>('All');


  if (!config) return <div className="animate-pulse h-96 bg-zinc-50 dark:bg-zinc-900 rounded-lg"></div>;

  const categories: (ProjectCategory | 'All')[] = ['All', 'UX', 'AI', 'Product', 'Engineering'];

  const filteredProjects = filter === 'All'
    ? config.projects
    : config.projects.filter(p => p.category === filter);

  return (
    <div className="animate-in fade-in duration-500">
      <SEO
        title="Work"
        description="A collection of products shipped, case studies written, and AI models tinkered with by Pretheesh Thomas."
        url="/work"
      />
      <div className="mb-16 max-w-2xl">
        <h1 className="text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">Work</h1>
        <p className="text-xl text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
          A collection of products shipped, case studies written, and AI models tinkered with.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${filter === cat
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-lg scale-105'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-32 text-zinc-400 dark:text-zinc-600">
          No projects found in this category.
        </div>
      )}
    </div>
  );
};

export default Work;
