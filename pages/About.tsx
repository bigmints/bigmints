
import React, { useState } from 'react';
import { SiteConfig } from '../types';
import { MapPin, Mail, Linkedin, Download, ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';

const About: React.FC<{ config: SiteConfig | null }> = ({ config }) => {
    if (!config) return <div className="animate-pulse h-96 bg-zinc-50 dark:bg-zinc-900 rounded-lg"></div>;

    const { profile, resume } = config;

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        // Fallback to a neutral placeholder with initials if the custom image fails to load
        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=18181b&color=fff&size=500`;
    };

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-700">
            <SEO
                title="About"
                description={resume.summary}
                url="/about"
                image={profile.avatar}
            />
            {/* Header Profile */}
            <div className="flex flex-col md:flex-row gap-12 items-start mb-24">
                <div className="shrink-0 relative group">
                    {/* Clean Minimal Photo Container */}
                    <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-xl shadow-zinc-200/50 dark:shadow-none border border-zinc-100 dark:border-zinc-800 transition-all duration-500 ease-out group-hover:scale-[1.02]">
                        <img
                            src={profile.avatar}
                            alt={profile.name}
                            onError={handleImageError}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Subtle decor element */}
                    <div className="absolute -z-10 top-4 -right-4 w-full h-full rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800"></div>
                </div>

                <div className="flex-grow pt-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">{profile.name}</h1>
                    <h2 className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 font-medium">{profile.role}</h2>

                    <div className="flex flex-wrap gap-6 text-sm text-zinc-500 dark:text-zinc-400 mb-8">
                        <span className="flex items-center gap-2">
                            <MapPin size={16} /> {profile.location}
                        </span>
                        <a href={`mailto:${profile.email}`} className="flex items-center gap-2 hover:text-zinc-900 dark:hover:text-white transition-colors">
                            <Mail size={16} /> {profile.email}
                        </a>
                        {profile.socials.find(s => s.platform === 'LinkedIn') && (
                            <a href={profile.socials.find(s => s.platform === 'LinkedIn')?.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-zinc-900 dark:hover:text-white transition-colors">
                                <Linkedin size={16} /> LinkedIn
                            </a>
                        )}
                    </div>

                    <div className="prose prose-zinc dark:prose-invert text-zinc-600 dark:text-zinc-300 max-w-none leading-relaxed">
                        {Array.isArray(resume.summary) ? (
                            <ul className="space-y-3 list-none pl-0">
                                {resume.summary.map((point, index) => (
                                    <li key={index} className="relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-zinc-400 dark:before:text-zinc-600">
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>{resume.summary}</p>
                        )}
                    </div>
                </div>
            </div>

            <hr className="border-zinc-100 dark:border-zinc-800 my-16" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                {/* Left Sidebar: Skills & Education */}
                <div className="md:col-span-4 space-y-12">

                    {/* Skills */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-white mb-6">Core Competencies</h3>
                        <div className="space-y-8">
                            {resume.skills.map((skillGroup) => (
                                <div key={skillGroup.category}>
                                    <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-3 uppercase tracking-wide">{skillGroup.category}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {skillGroup.items.map(skill => (
                                            <span key={skill} className="px-2 py-1 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 text-xs rounded border border-zinc-100 dark:border-zinc-800">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Education */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-white mb-6">Education</h3>
                        <div className="space-y-6">
                            {resume.education.map((edu, idx) => (
                                <div key={idx}>
                                    <h4 className="font-semibold text-zinc-900 dark:text-white text-sm mb-1">{edu.degree}</h4>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{edu.institution}</p>
                                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 font-mono">{edu.period}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Main: Experience */}
                <div className="md:col-span-8">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-white mb-10">Experience</h3>

                    <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-3 space-y-12 pb-4">
                        {resume.experience.map((job) => (
                            <div key={job.id} className="relative pl-10">
                                {/* Timeline Dot */}
                                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-600 border-2 border-white dark:border-zinc-950 ring-1 ring-zinc-100 dark:ring-zinc-800"></div>

                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                                    <h4 className="text-lg font-bold text-zinc-900 dark:text-white">{job.role}</h4>
                                    <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 bg-zinc-50 dark:bg-zinc-900 px-2 py-1 rounded mt-2 sm:mt-0 inline-block">{job.period}</span>
                                </div>

                                <div className="text-base text-zinc-800 dark:text-zinc-300 font-medium mb-4">{job.company}</div>

                                <ul className="space-y-2">
                                    {job.description.map((point, i) => (
                                        <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-zinc-300 dark:before:text-zinc-700">
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Note */}
            <div className="mt-20 pt-10 border-t border-zinc-100 dark:border-zinc-800 text-center">
                <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center text-zinc-900 dark:text-white font-semibold border-b border-zinc-900 dark:border-white pb-0.5 hover:text-zinc-600 dark:hover:text-zinc-300 hover:border-zinc-600 dark:hover:border-zinc-300 transition-colors"
                >
                    Get in touch for opportunities <ArrowUpRight size={16} className="ml-1" />
                </a>
            </div>
        </div>
    );
};

export default About;
