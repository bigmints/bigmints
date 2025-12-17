
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SiteConfig, BlogPost as BlogPostType } from '../types';
import { SimpleMarkdownRenderer } from '../utils/markdown';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

interface BlogPostProps {
  config: SiteConfig | null;
}

const BlogPost: React.FC<BlogPostProps> = ({ config }) => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (config && slug) {
      const foundPost = config.posts.find(p => p.slug === slug);
      setPost(foundPost || null);

      if (foundPost) {
        // Fetch the raw markdown file
        fetch(foundPost.contentFile)
          .then(res => {
            if (!res.ok) throw new Error("Failed to load post");
            return res.text();
          })
          .then(text => {
            // Remove the first H1 heading to avoid duplication with the header
            const lines = text.split('\n');
            const contentWithoutFirstH1 = lines.filter((line, index) => {
              // Skip the first line if it's an H1
              if (index === 0 && line.trim().startsWith('# ')) {
                return false;
              }
              return true;
            }).join('\n');
            setContent(contentWithoutFirstH1);
          })
          .catch(err => setContent(`# Error\nCould not load content for ${foundPost.title}. \n\nDetails: ${err.message}`))
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    }
  }, [config, slug]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-slate-200 dark:bg-zinc-800 w-24 mb-8 rounded"></div>
          <div className="h-10 bg-slate-200 dark:bg-zinc-800 w-3/4 rounded"></div>
          <div className="h-4 bg-slate-200 dark:bg-zinc-800 w-1/2 mb-12 rounded"></div>
          <div className="space-y-3">
            <div className="h-4 bg-slate-100 dark:bg-zinc-800 rounded"></div>
            <div className="h-4 bg-slate-100 dark:bg-zinc-800 rounded"></div>
            <div className="h-4 bg-slate-100 dark:bg-zinc-800 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Post not found</h1>
        <Link to="/blog" className="text-blue-600 hover:underline mt-4 inline-block">Return to Blog</Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <SEO
        title={post.title}
        description={post.excerpt}
        image={post.coverImage}
        url={`/blog/${post.slug}`}
        type="article"
      />
      <Link to="/blog" className="inline-flex items-center text-sm text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors">
        <ArrowLeft size={16} className="mr-2" /> Back to writing
      </Link>

      <header className="mb-10">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-zinc-50 mb-6 leading-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-zinc-400 font-mono pb-8">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readingTime}</span>
          <span>•</span>
          <div className="flex gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-slate-600 dark:text-zinc-300">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="mb-10 -mx-6 md:-mx-0">
          <div className="aspect-[2/1] w-full rounded-none md:rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      <div className="prose prose-slate dark:prose-invert prose-lg max-w-none text-slate-700 dark:text-zinc-300">
        <SimpleMarkdownRenderer content={content} />
      </div>

      <hr className="my-12 border-slate-100 dark:border-zinc-800" />

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
    </article>
  );
};

export default BlogPost;
