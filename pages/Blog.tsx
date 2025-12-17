
import React from 'react';
import { Link } from 'react-router-dom';
import { SiteConfig } from '../types';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

interface BlogProps {
  config: SiteConfig | null;
}

const Blog: React.FC<BlogProps> = ({ config }) => {
  if (!config) return <div className="animate-pulse h-96 bg-zinc-50 dark:bg-zinc-900 rounded-lg"></div>;

  return (
    <div className="animate-in fade-in duration-500">
      <SEO
        title="Blog"
        description="Thoughts on technology, design systems, and the future of software by Pretheesh Thomas."
        url="/blog"
      />
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">Writing</h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400">
          Thoughts on technology, design systems, and the future of software.
        </p>
      </div>

      <div className="space-y-8">
        {config.posts.map((post) => (
          <article key={post.slug} className="group relative flex flex-col md:flex-row gap-8 items-start">
            {/* Date Column */}
            <div className="md:w-32 lg:w-40 shrink-0 pt-1">
              <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-500 font-mono mb-2">
                <Calendar size={14} className="mr-2" />
                {post.date}
              </div>
              <div className="flex items-center text-xs text-zinc-400 dark:text-zinc-600">
                <Clock size={12} className="mr-2" />
                {post.readingTime}
              </div>
            </div>

            {/* Image Column */}
            <div className="w-full md:w-48 lg:w-64 aspect-[3/2] shrink-0 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm">
              {post.coverImage ? (
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-600 text-xs">No Image</div>
              )}
            </div>

            {/* Content Column */}
            <div className="flex-grow min-w-0">
              <Link to={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                  {post.title}
                </h2>
              </Link>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex gap-2 mb-4">
                {post.tags.map(tag => (
                  <span key={tag} className="text-xs font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <Link to={`/blog/${post.slug}`} className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 inline-flex items-center">
                Read Article <ArrowRight size={14} className="ml-1" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <hr className="my-12 border-zinc-100 dark:border-zinc-800" />

      {/* Substack Subscribe CTA */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-zinc-900 dark:to-zinc-800 p-8 rounded-2xl border border-blue-100 dark:border-zinc-700">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-2">Subscribe to my newsletter</h3>
            <p className="text-slate-600 dark:text-zinc-400">
              Get updates on new posts, projects, and insights delivered to your inbox.
            </p>
          </div>
          <a
            href="https://pshmt.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors whitespace-nowrap"
          >
            Subscribe on Substack
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Blog;
