
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SiteConfig } from '../types';
import { ChevronRight, ArrowUpRight } from 'lucide-react';
import GravityHero from '../components/GravityHero';
import SEO from '../components/SEO';

interface HomeProps {
    config: SiteConfig | null;
}

const Home: React.FC<HomeProps> = ({ config }) => {
    const [activeTab, setActiveTab] = useState<string>('All');

    // Safely compute filtered posts ensuring hooks run unconditionally
    const filteredPosts = useMemo(() => {
        if (!config) return [];
        if (activeTab === 'All') return config.posts.slice(0, 3);
        return config.posts.filter(post => post.tags.includes(activeTab)).slice(0, 3);
    }, [config, activeTab]);

    if (!config) return <div className="animate-pulse h-96 bg-zinc-50 dark:bg-zinc-900 rounded-lg"></div>;

    const showcaseProjects = config.projects.slice(0, 4);

    // Extract all unique tags from posts for filters
    const allTags = Array.from(new Set(config.posts.flatMap(post => post.tags)));
    const tabs = ['All', ...allTags.slice(0, 4)]; // Limit to 4 tags for simplicity

    return (
        <div className="space-y-32">
            <SEO />
            {/* Hero Section */}
            <section className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-center pb-16 md:pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <GravityHero />
                <div className="max-w-4xl relative z-10 pointer-events-none">
                    <h1 className="text-6xl md:text-9xl font-bold text-zinc-900 dark:text-white tracking-tighter mb-8 leading-[0.85] pointer-events-auto">
                        Architecture.<br />
                        Experience.<br />
                        Intelligence.
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed mb-8 font-light tracking-tight pointer-events-auto">
                        I'm <span className="text-zinc-900 dark:text-white font-medium">Pretheesh Thomas</span>, an Experience Design Leader and Technologist based in Dubai.
                        Blending full-stack engineering with high-fidelity design to build enterprise-grade systems and autonomous agents.
                    </p>
                </div>
            </section>

            {/* Selected Experiments */}
            <section>
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Selected Experiments</h2>
                    <Link to="/experiments" className="hidden md:inline-flex items-center px-4 py-2 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-200 rounded-full text-xs font-semibold transition-colors">
                        View all experiments <ChevronRight size={14} className="ml-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {showcaseProjects.map((project, index) => {
                        const isLarge = index === 0 || index === 3;
                        const colSpan = isLarge ? "md:col-span-2" : "md:col-span-1";

                        return (
                            <Link
                                key={project.id}
                                to={`/experiments/${project.id}`}
                                className={`group relative flex flex-col justify-end overflow-hidden rounded-3xl h-[450px] ${colSpan} bg-zinc-100 dark:bg-zinc-900`}
                            >
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                <div className="absolute top-4 right-4 z-20">
                                    <span className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-white group-hover:text-black">
                                        <ArrowUpRight size={18} />
                                    </span>
                                </div>

                                <div className="relative z-10 p-8 w-full">
                                    <span className="inline-block px-2 py-0.5 mb-3 text-[10px] font-bold tracking-widest uppercase text-white/90 border border-white/20 rounded bg-black/20 backdrop-blur-md">
                                        {project.category}
                                    </span>
                                    <h3 className="text-3xl font-bold text-white mb-2 tracking-tight leading-tight">
                                        {project.title}
                                    </h3>
                                    <p className="text-zinc-200 text-base leading-relaxed line-clamp-2 max-w-lg font-light">
                                        {project.description}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-8 md:hidden text-center">
                    <Link to="/experiments" className="inline-flex items-center px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full text-sm font-bold shadow-lg">
                        View all experiments
                    </Link>
                </div>
            </section>

            {/* Recent Thoughts - List View with Filters */}
            <section className="pb-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-t border-zinc-100 dark:border-zinc-800 pt-16 gap-6">
                    <div>
                        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight mb-4">Recent Thoughts</h2>
                        {/* Tabs */}
                        <div className="flex flex-wrap gap-2">
                            {tabs.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-3 py-1 text-sm rounded-full transition-colors ${activeTab === tab
                                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                    <Link to="/blog" className="hidden md:inline-flex items-center text-sm font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
                        Read all articles <ChevronRight size={16} className="ml-1" />
                    </Link>
                </div>

                <div className="space-y-8">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <Link
                                key={post.slug}
                                to={`/blog/${post.slug}`}
                                className="group flex flex-col md:flex-row gap-6 items-start p-4 -mx-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                            >
                                {/* Thumbnail */}
                                <div className="w-full md:w-64 aspect-[3/2] shrink-0 rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-800">
                                    {post.coverImage ? (
                                        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 text-zinc-300 dark:text-zinc-600">
                                            <span className="text-xs font-mono uppercase">No Image</span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-grow pt-2">
                                    <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 dark:text-zinc-500 mb-3">
                                        <span>{post.date}</span>
                                        <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                                        <span>{post.readingTime}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors leading-tight">
                                        {post.title}
                                    </h3>
                                    <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2 mb-4">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex gap-2">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2 py-1 rounded-md">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="py-12 text-center text-zinc-400">
                            No articles found for this category.
                        </div>
                    )}
                </div>

                <div className="mt-8 md:hidden">
                    <Link to="/blog" className="inline-flex w-full justify-center items-center px-6 py-3 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-xl text-sm font-bold">
                        View all articles
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
