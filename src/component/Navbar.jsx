'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

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

    // Active section detection
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

    return (
        <nav className='sticky top-0 z-50 backdrop-blur-xl border-b border-black/5 dark:border-white/10 bg-white/80 dark:bg-[#0B1120]/80 transition-colors duration-300'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-20'>
                    {/* Logo */}
                    <a href='#home' className='flex items-center gap-3'>
                        <Image
                            src='https://i.ibb.co.com/7NZGxkQp/logo.png'
                            width={48}
                            height={48}
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
                            aria-label='Toggle Theme'
                        >
                            {theme === 'dark' ? (
                                // Sun Icon
                                <svg
                                    className='w-5 h-5 text-yellow-400'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M12 3v2m0 14v2m7-9h2M3 12H5m11.364-6.364l1.414 1.414M5.222 18.778l1.414-1.414m12.728 1.414l-1.414-1.414M5.222 5.222l1.414 1.414M12 16a4 4 0 100-8 4 4 0 000 8z'
                                    />
                                </svg>
                            ) : (
                                // Moon Icon
                                <svg
                                    className='w-5 h-5 text-slate-700'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                                    />
                                </svg>
                            )}
                        </button>

                        {/* Resume Button */}
                        <a
                            href='/Alomgir_Resume.pdf'
                            download='Alomgir_Resume.pdf'
                            className='bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold text-sm px-5 py-3 rounded-xl shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5'
                        >
                            Download Resume
                        </a>
                    </div>

                    {/* Mobile Controls */}
                    <div className='md:hidden flex items-center gap-2'>
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className='w-10 h-10 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 flex items-center justify-center'
                        >
                            {theme === 'dark' ? (
                                <span className='text-yellow-400 text-lg'>☀️</span>
                            ) : (
                                <span className='text-slate-700 text-lg'>🌙</span>
                            )}
                        </button>

                        {/* Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className='w-10 h-10 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-700 dark:text-white'
                            aria-label='Toggle Menu'
                        >
                            {isMenuOpen ? (
                                <svg
                                    className='w-5 h-5'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M6 18L18 6M6 6l12 12'
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className='w-5 h-5'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M4 6h16M4 12h16M4 18h16'
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className='bg-white/95 dark:bg-[#111827]/95 backdrop-blur-xl border-t border-slate-200 dark:border-white/10 px-4 py-4 space-y-2 shadow-2xl'>
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

                    <a
                        href='/Alomgir_Resume.pdf'
                        download='Alomgir_Resume.pdf'
                        onClick={() => setIsMenuOpen(false)}
                        className='mt-4 block w-full text-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg shadow-cyan-500/20'
                    >
                        Download Resume
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;