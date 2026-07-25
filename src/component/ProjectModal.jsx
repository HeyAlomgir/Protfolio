'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaExclamationTriangle, FaRocket, FaServer } from 'react-icons/fa';
import { IoIosArrowRoundForward } from 'react-icons/io';

export function ProjectModal({ project }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Trigger button */}
            <motion.button
                onClick={() => setOpen(true)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className='inline-flex items-center gap-2 border border-cyan-500 text-cyan-600 dark:text-cyan-400 font-extrabold text-xs px-4 py-2.5 rounded-xl hover:bg-cyan-500/10 transition duration-200 group'
            >
                View Details
                <IoIosArrowRoundForward className='text-xl transition-transform duration-300 group-hover:translate-x-1' />
            </motion.button>

            {/* Modal — rendered via portal to escape parent transform context */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {open && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                key='backdrop'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                onClick={() => setOpen(false)}
                                className='fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm'
                            />

                            {/* Dialog */}
                            <motion.div
                                key='dialog'
                                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.92, y: 30 }}
                                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                                className='fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none'
                            >
                                <div
                                    onClick={(e) => e.stopPropagation()}
                                    className='pointer-events-auto relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#0d1526] border border-slate-200 dark:border-slate-700/50 shadow-2xl shadow-black/30'
                                >
                                    {/* Close button */}
                                    <button
                                        onClick={() => setOpen(false)}
                                        className='absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-gray-400 transition'
                                    >
                                        <FaTimes size={14} />
                                    </button>

                                    {/* Project image */}
                                    <div className='relative w-full h-52 sm:h-64 overflow-hidden rounded-t-3xl bg-slate-100 dark:bg-slate-800'>
                                        <Image
                                            src={project.itemimg}
                                            alt={project.name}
                                            fill
                                            className='object-cover'
                                        />
                                        {/* Gradient overlay */}
                                        <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent' />
                                        {/* Project name overlay */}
                                        <div className='absolute bottom-4 left-5 right-12'>
                                            <h2 className='text-white font-black text-xl md:text-2xl leading-snug drop-shadow'>
                                                {project.name}
                                            </h2>
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className='p-6 space-y-6'>

                                        {/* Description */}
                                        <p className='text-slate-600 dark:text-gray-300 text-sm leading-relaxed'>
                                            {project.desc}
                                        </p>

                                        {/* Tech stack */}
                                        <div>
                                            <h4 className='text-xs font-black uppercase tracking-widest text-slate-400 dark:text-gray-500 mb-3'>Tech Stack</h4>
                                            <div className='flex flex-wrap gap-2'>
                                                {project.tech.map((t, i) => (
                                                    <span key={i} className='text-[11px] font-bold bg-slate-900 dark:bg-slate-700 text-white px-3 py-1.5 rounded-xl'>
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Challenges */}
                                        <div className='p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20'>
                                            <h4 className='flex items-center gap-2 text-sm font-black text-amber-700 dark:text-amber-400 mb-2'>
                                                <FaExclamationTriangle size={13} /> Challenges Faced
                                            </h4>
                                            <p className='text-amber-800 dark:text-amber-300 text-sm leading-relaxed'>
                                                {project.challenges}
                                            </p>
                                        </div>

                                        {/* Future plans */}
                                        <div className='p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20'>
                                            <h4 className='flex items-center gap-2 text-sm font-black text-cyan-700 dark:text-cyan-400 mb-2'>
                                                <FaRocket size={13} /> Future Improvements & Plans
                                            </h4>
                                            <p className='text-cyan-800 dark:text-cyan-300 text-sm leading-relaxed'>
                                                {project.plans}
                                            </p>
                                        </div>

                                        {/* Action buttons */}
                                        <div className='flex flex-wrap gap-3 pt-1'>
                                            <a
                                                href={project.githubClient}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                className='inline-flex items-center gap-2 bg-slate-900 dark:bg-slate-700 text-white font-bold text-xs px-5 py-3 rounded-xl hover:bg-slate-700 dark:hover:bg-slate-600 transition'
                                            >
                                                <FaGithub /> GitHub Client
                                            </a>
                                            <a
                                                href={project.githubServer}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                className='inline-flex items-center gap-2 bg-slate-900 dark:bg-slate-700 text-white font-bold text-xs px-5 py-3 rounded-xl hover:bg-slate-700 dark:hover:bg-slate-600 transition'
                                            >
                                                <FaServer /> GitHub Server
                                            </a>
                                            <a
                                                href={project.live}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                className='inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs px-5 py-3 rounded-xl hover:opacity-90 transition shadow-lg shadow-cyan-500/20'
                                            >
                                                <FaExternalLinkAlt /> Live Demo
                                            </a>
                                        </div>

                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}