'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import toast from 'react-hot-toast';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [theme, setTheme] = useState('dark');
    const [scrolled, setScrolled] = useState(false);

    // 3D tilt for navbar
    const navRef = useRef(null);
    const navMouseX = useMotionValue(0);
    const tiltY = useSpring(useTransform(navMouseX, [-0.5, 0.5], [-2, 2]), { stiffness: 200, damping: 30 });

    const handleNavMouseMove = (e) => {
        const rect = navRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        navMouseX.set(x);
    };

    const handleNavMouseLeave = () => {
        navMouseX.set(0);
    };

    const menuItems = [
        { name: 'Home', id: 'home' },
        { name: 'About', id: 'about' },
        { name: 'Skills', id: 'skills' },
        { name: 'Services', id: 'services' },
        { name: 'Education', id: 'education' },
        { name: 'Projects', id: 'projects' },
        { name: 'Contact', id: 'contact' },
    ];

    // Default Dark Theme
    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    // Track scroll for navbar elevation
    useEffect(() => {
        const handleScrollChange = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScrollChange);
        handleScrollChange();
        return () => window.removeEventListener('scroll', handleScrollChange);
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
            ref={navRef}
            initial={{ y: -100, rotateX: -15 }}
            animate={{ y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            onMouseMove={handleNavMouseMove}
            onMouseLeave={handleNavMouseLeave}
            style={{
                perspective: '800px',
                rotateY: tiltY,
                transformStyle: 'preserve-3d',
            }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled
                    ? 'backdrop-blur-2xl bg-white/70 dark:bg-[#0B1120]/70 border-b border-slate-200/30 dark:border-white/10 shadow-xl shadow-black/5 dark:shadow-cyan-500/5'
                    : 'backdrop-blur-xl bg-white/50 dark:bg-[#0B1120]/50 border-b border-transparent'
            }`}
        >
            {/* 3D Bottom glow line */}
            <motion.div
                className='absolute bottom-0 left-0 right-0 h-[1px]'
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.4), rgba(59,130,246,0.4), rgba(6,182,212,0.4), transparent)',
                    transform: 'translateZ(5px)',
                }}
                animate={{
                    opacity: scrolled ? [0.3, 0.7, 0.3] : 0,
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-20'>

                    {/* ═══ Logo — 3D flip on hover ═══ */}
                    <a href='#home' className='flex items-center gap-3 group'>
                        <motion.div
                            whileHover={{ rotateY: 180, scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            animate={{
                                boxShadow: [
                                    '0 0 0px rgba(34,211,238,0.4)',
                                    '0 0 18px rgba(34,211,238,0.6)',
                                    '0 0 0px rgba(34,211,238,0.4)',
                                ],
                            }}
                            transition={{
                                boxShadow: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
                                rotateY: { type: 'spring', stiffness: 300, damping: 15 },
                                scale: { type: 'spring', stiffness: 300, damping: 15 },
                            }}
                            style={{ transformStyle: 'preserve-3d' }}
                            className='relative w-11 h-11 rounded-full flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-black text-sm ring-2 ring-cyan-400/30 flex-shrink-0 cursor-pointer'
                        >
                            {/* Front face */}
                            <span
                                className='absolute inset-0 flex items-center justify-center'
                                style={{ backfaceVisibility: 'hidden' }}
                            >
                                AH
                            </span>
                            {/* Back face */}
                            <span
                                className='absolute inset-0 flex items-center justify-center text-lg'
                                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                            >
                                ⚡
                            </span>
                        </motion.div>

                        <div className='leading-tight' style={{ transform: 'translateZ(10px)' }}>
                            <h1 className='font-extrabold text-lg tracking-wide text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300'>
                                Alomgir
                            </h1>

                            <p className='text-xs text-cyan-500 dark:text-cyan-400 font-semibold'>
                                Full-Stack Developer
                            </p>
                        </div>
                    </a>

                    {/* ═══ Desktop Menu — 3D pill navigation ═══ */}
                    <div
                        className='hidden md:flex items-center gap-1 px-2 py-1.5 rounded-2xl bg-slate-100/60 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 backdrop-blur-md'
                        style={{ transformStyle: 'preserve-3d', transform: 'translateZ(8px)' }}
                    >
                        {menuItems.map((item, index) => {
                            const isActive = activeSection === item.id;

                            return (
                                <motion.a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    whileHover={{ y: -2, rotateX: -5 }}
                                    whileTap={{ scale: 0.95, rotateX: 5 }}
                                    initial={{ opacity: 0, y: -20, rotateX: -30 }}
                                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                    transition={{
                                        delay: index * 0.06,
                                        duration: 0.4,
                                        type: 'spring',
                                        stiffness: 200,
                                    }}
                                    style={{ transformStyle: 'preserve-3d' }}
                                    className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                                        isActive
                                            ? 'text-white shadow-lg shadow-cyan-500/25'
                                            : 'text-slate-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400'
                                    }`}
                                >
                                    {/* Active 3D background pill */}
                                    {isActive && (
                                        <motion.div
                                            layoutId='activeNavPill'
                                            className='absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl'
                                            style={{
                                                transform: 'translateZ(-2px)',
                                                boxShadow: '0 4px 15px rgba(6,182,212,0.3), 0 0 30px rgba(6,182,212,0.1)',
                                            }}
                                            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                        />
                                    )}
                                    <span className='relative z-10'>{item.name}</span>
                                </motion.a>
                            );
                        })}
                    </div>

                    {/* ═══ Desktop Actions — 3D buttons ═══ */}
                    <div
                        className='hidden md:flex items-center gap-3'
                        style={{ transformStyle: 'preserve-3d', transform: 'translateZ(5px)' }}
                    >
                        {/* Theme Toggle — 3D flip */}
                        <motion.button
                            onClick={toggleTheme}
                            whileHover={{ rotateY: 20, scale: 1.08 }}
                            whileTap={{ scale: 0.92, rotateY: -10 }}
                            style={{ transformStyle: 'preserve-3d' }}
                            className='w-11 h-11 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 flex items-center justify-center hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300'
                        >
                            <motion.span
                                key={theme}
                                initial={{ rotateY: -90, opacity: 0 }}
                                animate={{ rotateY: 0, opacity: 1 }}
                                exit={{ rotateY: 90, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className='text-xl'
                            >
                                {theme === 'dark' ? '☀️' : '🌙'}
                            </motion.span>
                        </motion.button>

                        {/* Resume Button — 3D elevated with shine */}
                        <motion.button
                            onClick={handleDownload}
                            whileHover={{ y: -3, scale: 1.04, rotateX: -4 }}
                            whileTap={{ scale: 0.96, rotateX: 3 }}
                            style={{
                                transformStyle: 'preserve-3d',
                                transform: 'translateZ(10px)',
                            }}
                            className='relative bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm px-5 py-3 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 overflow-hidden group'
                        >
                            {/* 3D shine sweep */}
                            <span className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700' />
                            <span className='relative z-10'>Download Resume</span>
                        </motion.button>
                    </div>

                    {/* ═══ Mobile Controls ═══ */}
                    <div className='md:hidden flex items-center gap-2'>
                        <motion.button
                            onClick={toggleTheme}
                            whileHover={{ rotateY: 15 }}
                            whileTap={{ scale: 0.9 }}
                            className='w-10 h-10 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 flex items-center justify-center'
                        >
                            {theme === 'dark' ? '☀️' : '🌙'}
                        </motion.button>

                        <motion.button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            whileHover={{ rotateY: 15 }}
                            whileTap={{ scale: 0.9 }}
                            className='w-10 h-10 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-700 dark:text-white'
                        >
                            <motion.span
                                key={isMenuOpen ? 'close' : 'open'}
                                initial={{ rotateX: -90, opacity: 0 }}
                                animate={{ rotateX: 0, opacity: 1 }}
                                transition={{ duration: 0.2 }}
                            >
                                {isMenuOpen ? '✕' : '☰'}
                            </motion.span>
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* ═══ Mobile Menu — 3D staggered items ═══ */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, rotateX: -10 }}
                        animate={{ opacity: 1, height: 'auto', rotateX: 0 }}
                        exit={{ opacity: 0, height: 0, rotateX: 10 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        style={{ transformOrigin: 'top', transformStyle: 'preserve-3d' }}
                        className='md:hidden bg-white/95 dark:bg-[#111827]/95 backdrop-blur-2xl border-t border-slate-200/50 dark:border-white/10 px-4 py-4 space-y-2 shadow-2xl'
                    >
                        {menuItems.map((item, index) => {
                            const isActive = activeSection === item.id;

                            return (
                                <motion.a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={() => setIsMenuOpen(false)}
                                    initial={{ opacity: 0, x: -30, rotateY: -15 }}
                                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                                    transition={{ delay: index * 0.05, duration: 0.3 }}
                                    whileHover={{ x: 8, rotateY: 3 }}
                                    style={{ transformStyle: 'preserve-3d' }}
                                    className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                                        isActive
                                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                                            : 'text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-cyan-500 dark:hover:text-cyan-400'
                                    }`}
                                >
                                    {item.name}
                                </motion.a>
                            );
                        })}

                        <motion.button
                            onClick={() => {
                                handleDownload();
                                setIsMenuOpen(false);
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: menuItems.length * 0.05 + 0.1 }}
                            whileHover={{ scale: 1.02, rotateX: -3 }}
                            whileTap={{ scale: 0.98 }}
                            className='mt-4 w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg shadow-cyan-500/20 relative overflow-hidden group'
                        >
                            <span className='absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700' />
                            <span className='relative z-10'>Download Resume</span>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
