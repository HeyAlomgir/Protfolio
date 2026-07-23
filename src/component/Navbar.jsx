'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [theme, setTheme] = useState('dark');

    const menuItems = [
        { name: 'Home', id: 'home' },
        { name: 'About', id: 'about' },
        { name: 'Skills', id: 'skills' },
        { name: 'Education', id: 'education' },
        { name: 'Projects', id: 'projects' },
        { name: 'Contact', id: 'contact' },
    ];

    // Default Dark Theme
    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    // Theme Toggle
    const toggleTheme = () => {
        if (theme === 'dark') {
            document.documentElement.classList.remove('dark');
            setTheme('light');
        } else {
            document.documentElement.classList.add('dark');
            setTheme('dark');
        }
    };

    // Active section
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 120;

            menuItems.forEach((item) => {
                const section = document.getElementById(item.id);
                if (!section) return;

                const offsetTop = section.offsetTop;
                const offsetHeight = section.offsetHeight;

                if (
                    scrollPosition >= offsetTop &&
                    scrollPosition < offsetTop + offsetHeight
                ) {
                    setActiveSection(item.id);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Resume Download with Toast Progress
    const handleDownload = () => {
        const toastId = toast.loading('Preparing resume download...');

        let progress = 0;

        const interval = setInterval(() => {
            progress += 20;

            toast.loading(`Downloading Resume... ${progress}%`, {
                id: toastId,
            });

            if (progress >= 100) {
                clearInterval(interval);

                toast.success('Resume downloaded successfully!', {
                    id: toastId,
                });

                // Trigger actual download
                const link = document.createElement('a');
                link.href = '/Alomgir_Resume.pdf';
                link.download = 'Alomgir_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }, 300);
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className='fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-black/5 dark:border-white/10 bg-white/80 dark:bg-[#0B1120]/80 transition-colors duration-300'
        >
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-20'>
                    {/* Logo */}
                    <a href='#home' className='flex items-center gap-3'>
                        <Image
                            src='https://i.ibb.co.com/7NZGxkQp/logo.png'
                            width={50}
                            height={50}
                            alt='Alomgir Logo'
                            className='rounded-full ring-2 ring-cyan-400/30'
                            priority
                        />

                        <div className='leading-tight'>
                            <h1 className='font-extrabold text-lg tracking-wide text-slate-900 dark:text-white'>
                                Alomgir
                            </h1>

                            <p className='text-xs text-cyan-500 dark:text-cyan-400 font-semibold'>
                                Full-Stack Developer
                            </p>
                        </div>
                    </a>

                    {/* Desktop Menu */}
                    <div className='hidden md:flex items-center gap-2'>
                        {menuItems.map((item) => {
                            const isActive = activeSection === item.id;

                            return (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${isActive
                                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                                            : 'text-slate-700 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/5'
                                        }`}
                                >
                                    {item.name}
                                </a>
                            );
                        })}
                    </div>

                    {/* Desktop Actions */}
                    <div className='hidden md:flex items-center gap-3'>
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className='w-11 h-11 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 flex items-center justify-center hover:border-cyan-400 transition'
                        >
                            {theme === 'dark' ? (
                                <span className='text-yellow-400 text-xl'>☀️</span>
                            ) : (
                                <span className='text-slate-700 text-xl'>🌙</span>
                            )}
                        </button>

                        {/* Resume Button */}
                        <button
                            onClick={handleDownload}
                            className='bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold text-sm px-5 py-3 rounded-xl shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5'
                        >
                            Download Resume
                        </button>
                    </div>

                    {/* Mobile Controls */}
                    <div className='md:hidden flex items-center gap-2'>
                        <button
                            onClick={toggleTheme}
                            className='w-10 h-10 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 flex items-center justify-center'
                        >
                            {theme === 'dark' ? '☀️' : '🌙'}
                        </button>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className='w-10 h-10 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-700 dark:text-white'
                        >
                            {isMenuOpen ? '✕' : '☰'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className='md:hidden bg-white/95 dark:bg-[#111827]/95 backdrop-blur-xl border-t border-slate-200 dark:border-white/10 px-4 py-4 space-y-2 shadow-2xl'
                    >
                        {menuItems.map((item) => {
                            const isActive = activeSection === item.id;

                            return (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 ${isActive
                                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                                            : 'text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-cyan-500 dark:hover:text-cyan-400'
                                        }`}
                                >
                                    {item.name}
                                </a>
                            );
                        })}

                        <button
                            onClick={() => {
                                handleDownload();
                                setIsMenuOpen(false);
                            }}
                            className='mt-4 w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg shadow-cyan-500/20'
                        >
                            Download Resume
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;