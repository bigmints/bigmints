import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SiteConfig, Project } from '../types';
import { ArrowLeft, ExternalLink, Calendar, Tag, Layers } from 'lucide-react';
import SEO from '../components/SEO';
interface ProjectDetailProps {
  config: SiteConfig | null;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ config }) => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    if (config && id) {
      const found = config.projects.find(p => p.id === id);
      setProject(found || null);
      setLogoError(false); // Reset error state when project changes
    }
  }, [config, id]);

  if (!config) return <div className="animate-pulse h-screen bg-white dark:bg-zinc-950"></div>;

  if (!project) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Project not found</h2>
        <Link to="/experiments" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white mt-4 inline-block">Back to experiments</Link>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SEO
        title={project.title}
        description={project.description}
        image={project.imageUrl}
        url={`/experiments/${project.id}`}
      />
      <Link to="/experiments" className="inline-flex items-center text-sm font-medium text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors mb-8 group">
        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to all experiments
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

        {/* Left Col: Header & Meta */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            {/* Logo if exists and not broken */}
            {project.logoUrl && !logoError && (
              <div className="mb-8 w-20 h-20 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl flex items-center justify-center p-4">
                <img
                  src={project.logoUrl}
                  alt="Logo"
                  className="w-full h-full object-contain opacity-80"
                  onError={() => setLogoError(true)}
                />
              </div>
            )}

            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs font-bold uppercase tracking-wider rounded-full">
                {project.category}
              </span>
              <span className="text-zinc-400 dark:text-zinc-500 text-sm font-mono flex items-center gap-1">
                <Calendar size={12} /> {project.date}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 leading-tight tracking-tight">
              {project.title}
            </h1>

            <div className="prose prose-zinc dark:prose-invert prose-lg text-zinc-500 dark:text-zinc-400 mb-10 leading-relaxed">
              <p>{project.description}</p>
            </div>
          </div>

          <div className="space-y-8 border-t border-zinc-100 dark:border-zinc-800 pt-8">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                <Layers size={14} /> Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1.5 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 text-sm rounded-md bg-zinc-50 dark:bg-zinc-900">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {(project.link || project.caseStudyLink) && (
              <div className="pt-4">
                <a
                  href={project.link || project.caseStudyLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center w-full md:w-auto px-8 py-4 bg-zinc-900 hover:bg-black dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Visit Project <ExternalLink size={18} className="ml-2" />
                </a>
                {project.caseStudyLink && project.link !== project.caseStudyLink && (
                  <a
                    href={project.caseStudyLink}
                    target="_blank"
                    rel="noreferrer"
                    className="block mt-4 md:inline-block md:mt-0 md:ml-4 text-center px-6 py-4 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white font-medium transition-colors"
                  >
                    Read Case Study
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Imagery */}
        <div className="lg:col-span-7">
          <div className="aspect-[4/3] w-full rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 shadow-2xl shadow-zinc-200/50 dark:shadow-black/50 border border-zinc-100/50 dark:border-zinc-800">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Context Stats / Details */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800">
              <h4 className="text-zinc-400 dark:text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Role</h4>
              <p className="text-zinc-900 dark:text-zinc-200 font-medium">{project.role || 'Lead Architect / Design'}</p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800">
              <h4 className="text-zinc-400 dark:text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Platform</h4>
              <p className="text-zinc-900 dark:text-zinc-200 font-medium">{project.platform || 'Web & Mobile'}</p>
            </div>
          </div>
        </div>

      </div>

      {/* Rich Content Sections */}
      {(project.overview || project.objectives || project.keyFeatures || project.challenges || project.outcomes) && (
        <div className="mt-20 space-y-16">

          {/* Overview */}
          {project.overview && project.overview.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">Overview</h2>
              <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none">
                {project.overview.map((paragraph, index) => (
                  <p key={index} className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* Objectives */}
          {project.objectives && project.objectives.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">Objectives</h2>
              <ul className="space-y-3">
                {project.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-zinc-400 dark:text-zinc-500 mt-1">→</span>
                    <span className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{objective}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Key Features */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.keyFeatures.map((feature, index) => (
                  <div key={index} className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{feature}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Challenges */}
          {project.challenges && project.challenges.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">Challenges & Solutions</h2>
              <ul className="space-y-4">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="p-6 bg-amber-50 dark:bg-amber-950/20 rounded-2xl border border-amber-100 dark:border-amber-900/30">
                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{challenge}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Outcomes */}
          {project.outcomes && project.outcomes.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">Outcomes & Impact</h2>
              <ul className="space-y-3">
                {project.outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-emerald-500 dark:text-emerald-400 mt-1">✓</span>
                    <span className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{outcome}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

        </div>
      )}

    </div>
  );
};

export default ProjectDetail;
