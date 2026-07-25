'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaServer } from 'react-icons/fa';
import { ProjectModal } from './ProjectModal';
import projects from '../../public/projects.json';


function ProjectCard({ project, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.13, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ y: -6, transition: { type: 'spring', stiffness: 260, damping: 20 } }}
            className='group relative rounded-3xl bg-white dark:bg-[#0d1526] border border-slate-200/80 dark:border-slate-700/40 hover:border-cyan-400/60 dark:hover:border-cyan-400/50 shadow-sm hover:shadow-[0_20px_60px_rgba(34,211,238,0.15)] transition-all duration-300 flex flex-col lg:flex-row p-5 gap-6 lg:h-[400px]'
        >
            {/* Shimmer streak */}
            <div className='absolute inset-0 overflow-hidden rounded-3xl pointer-events-none'>
                <div className='-translate-x-full group-hover:translate-x-full transition-transform duration-700 absolute inset-0 bg-gradient-to-r from-transparent via-white/6 to-transparent skew-x-12' />
            </div>

            {/* Gradient bg on hover */}
            <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none' />

            {/* Project number */}
            <div className='absolute top-5 right-5 z-10 w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center text-xs font-black text-slate-400 dark:text-slate-500 group-hover:bg-cyan-500/10 group-hover:text-cyan-500 transition-colors duration-300'>
                {String(index + 1).padStart(2, '0')}
            </div>

            {/* Image — full height on lg */}
            <div className='relative w-full lg:w-[44%] lg:self-stretch rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800/60 flex-shrink-0 min-h-[220px] md:min-h[250px] aspect-[16/9] lg:aspect-auto'>
                <Image
                    src={project.img}
                    alt={project.name}
                    fill
                    className='object-cover transition-transform duration-500 group-hover:scale-108'
                />
                {/* Dark overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400' />
                {/* Live badge on image hover */}
                <div className='absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0'>
                    <span className='inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20'>
                        <span className='w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse' />
                        Live Project
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className='relative z-10 flex-1 flex flex-col justify-between gap-5 pr-8 py-2'>

                {/* Title + desc */}
                <div className='space-y-3'>
                    <h3 className='text-xl lg:text-2xl font-black text-slate-900 dark:text-white leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300'>
                        {project.name}
                    </h3>
                    <p className='text-slate-500 dark:text-gray-400 text-sm leading-relaxed'>
                        {project.desc}
                    </p>
                </div>

                {/* Tech stack */}
                <div className='flex flex-wrap gap-2'>
                    {project.tech.map((t, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.75 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08 + i * 0.04, duration: 0.3 }}
                            whileHover={{ scale: 1.08, y: -2 }}
                            className='text-[10px] lg:text-xs font-bold bg-slate-900 dark:bg-slate-700/80 text-white px-3 py-1.5 rounded-xl cursor-default transition-colors duration-200 hover:bg-cyan-600 dark:hover:bg-cyan-700'
                        >
                            {t}
                        </motion.span>
                    ))}
                </div>

                {/* Buttons */}
                <div className='flex flex-wrap gap-2.5'>
                    <motion.a
                        href={project.githubClient}
                        target='_blank'
                        rel='noopener noreferrer'
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className='inline-flex items-center gap-2 bg-slate-900 dark:bg-slate-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors duration-200 shadow-sm hover:shadow-md'
                    >
                        <FaGithub size={13} /> Client
                    </motion.a>

                    {project.githubServer && (
                        <motion.a
                            href={project.githubServer}
                            target='_blank'
                            rel='noopener noreferrer'
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className='inline-flex items-center gap-2 bg-slate-700 dark:bg-slate-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-slate-600 dark:hover:bg-slate-500 transition-colors duration-200 shadow-sm hover:shadow-md'
                        >
                            <FaServer size={11} /> Server
                        </motion.a>
                    )}

                    <motion.a
                        href={project.live}
                        target='_blank'
                        rel='noopener noreferrer'
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className='inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:opacity-90 transition shadow-md shadow-cyan-500/25 hover:shadow-cyan-500/40'
                    >
                        <FaExternalLinkAlt size={11} /> Live Demo
                    </motion.a>

                    <ProjectModal project={project} />
                </div>

            </div>
        </motion.div>
    );
}

export default function ProjectsPage() {
    return (
        <section
            id='projects'
            className='w-full py-24 bg-slate-50 dark:bg-[#080f1e] transition-colors duration-300'
        >
            <div className='max-w-[1500px] mx-auto px-6 lg:px-10'>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className='text-center mb-16'
                >
                    <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-semibold mb-5'>
                        🚀 Recent Work
                    </div>
                    <h2 className='text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-3'>
                        My <span className='text-cyan-600 dark:text-cyan-400'>Projects</span>
                    </h2>
                    <p className='text-slate-600 dark:text-gray-400 text-lg max-w-2xl mx-auto'>
                        Real-world applications built using modern full-stack technologies.
                    </p>
                </motion.div>

                {/* Cards */}
                <div className='flex flex-col gap-8'>
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>

            </div>
        </section>
    );
}