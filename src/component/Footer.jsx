'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFacebook, FaArrowUp } from 'react-icons/fa';

const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/HeyAlomgir', label: 'GitHub', hoverBg: 'hover:bg-slate-700', hoverText: 'hover:text-white' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/alomgir-hossain-web/', label: 'LinkedIn', hoverBg: 'hover:bg-blue-600', hoverText: 'hover:text-white' },
    { icon: FaFacebook, href: 'https://www.facebook.com/AlomgirWEB', label: 'Facebook', hoverBg: 'hover:bg-blue-500', hoverText: 'hover:text-white' },

];

const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Services', href: '#services' },
    { label: 'Education', href: '#education' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

// ── Real-time clock card ──────────────────────────────────────────────────────
function LiveClock() {
    const [now, setNow] = useState(null);

    useEffect(() => {
        setNow(new Date());
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    if (!now) return null;

    const pad = (n) => String(n).padStart(2, '0');

    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());
    const isAM = now.getHours() < 12;

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dayName = dayNames[now.getDay()];
    const date = pad(now.getDate());
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className='relative overflow-hidden rounded-2xl p-5 bg-white dark:bg-[#0d1526] border border-slate-200 dark:border-slate-700/50 shadow-sm group hover:border-cyan-400/50 dark:hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300'
        >
            {/* Glow */}
            <div className='absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl' />

            {/* Live dot */}
            <div className='flex items-center gap-2 mb-4'>
                <span className='relative flex h-2 w-2'>
                    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75' />
                    <span className='relative inline-flex h-2 w-2 rounded-full bg-cyan-500' />
                </span>
                <span className='text-[10px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400'>Live Clock</span>
            </div>

            {/* Time display */}
            <div className='flex items-end gap-1 mb-3'>
                <div className='flex items-center gap-1'>
                    {/* Hours */}
                    <motion.span
                        key={`h-${hours}`}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className='text-4xl font-black text-slate-900 dark:text-white tabular-nums tracking-tight'
                    >
                        {hours}
                    </motion.span>

                    {/* Blinking colon */}
                    <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className='text-3xl font-black text-cyan-500 pb-0.5'
                    >
                        :
                    </motion.span>

                    {/* Minutes */}
                    <motion.span
                        key={`m-${minutes}`}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className='text-4xl font-black text-slate-900 dark:text-white tabular-nums tracking-tight'
                    >
                        {minutes}
                    </motion.span>

                    {/* Blinking colon */}
                    <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                        className='text-3xl font-black text-cyan-500 pb-0.5'
                    >
                        :
                    </motion.span>

                    {/* Seconds */}
                    <motion.span
                        key={`s-${seconds}`}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className='text-4xl font-black text-slate-400 dark:text-slate-500 tabular-nums tracking-tight'
                    >
                        {seconds}
                    </motion.span>
                </div>

                {/* AM/PM */}
                <span className='mb-1 ml-1 text-xs font-black text-slate-400 dark:text-slate-500 uppercase'>
                    {isAM ? 'AM' : 'PM'}
                </span>
            </div>

            {/* Date row */}
            <div className='flex items-center gap-2'>
                <span className='text-xs font-bold text-slate-500 dark:text-gray-400'>{dayName},</span>
                <span className='text-xs font-bold text-slate-500 dark:text-gray-400'>{date} {month} {year}</span>
            </div>
        </motion.div>
    );
}

// ── Main Footer ───────────────────────────────────────────────────────────────
export default function Footer() {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer className='relative w-full bg-white dark:bg-[#080f1e] border-t border-slate-200 dark:border-slate-800 transition-colors duration-300 overflow-hidden'>

            {/* Background glow */}
            <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none' />

            <div className='relative max-w-[1500px] mx-auto px-6 lg:px-10 pt-16 pb-8'>

                {/* ── Top grid ── */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14'>

                    {/* Brand column */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className='space-y-5'
                    >
                        <div className='flex items-center gap-3'>
                            <motion.div
                                whileHover={{ scale: 1.08, rotate: -3 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                className='w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-cyan-500/25'
                            >
                                AH
                            </motion.div>
                            <div>
                                <p className='font-black text-slate-900 dark:text-white text-lg leading-none'>Alomgir</p>
                                <p className='text-xs text-cyan-600 dark:text-cyan-400 font-semibold'>Full-Stack Developer</p>
                            </div>
                        </div>

                        <p className='text-slate-500 dark:text-gray-400 text-sm leading-relaxed'>
                            Passionate Full-Stack Developer building modern, scalable web applications with clean UI and strong backend architecture.
                        </p>

                        {/* Social icons */}
                        <div className='flex items-center gap-2'>
                            {socialLinks.map((s, i) => {
                                const Icon = s.icon;
                                return (
                                    <motion.a
                                        key={s.label}
                                        href={s.href}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        aria-label={s.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                                        whileHover={{ scale: 1.15, y: -4 }}
                                        whileTap={{ scale: 0.93 }}
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 dark:text-gray-400 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 transition-all duration-200 ${s.hoverBg} ${s.hoverText}`}
                                    >
                                        <Icon size={16} />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Quick links */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className='space-y-5'
                    >
                        <h4 className='font-black text-slate-900 dark:text-white text-sm uppercase tracking-widest'>Quick Links</h4>
                        <ul className='space-y-3'>
                            {navLinks.map((link, i) => (
                                <motion.li
                                    key={link.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.35, delay: 0.15 + i * 0.07 }}
                                >
                                    <a href={link.href} className='group flex items-center gap-2 text-slate-500 dark:text-gray-400 text-sm font-medium hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-200'>
                                        <span className='w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-cyan-500 group-hover:scale-125 transition-all duration-200' />
                                        {link.label}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className='space-y-5'
                    >
                        <h4 className='font-black text-slate-900 dark:text-white text-sm uppercase tracking-widest'>Contact</h4>
                        <div className='space-y-3'>
                            {[
                                { emoji: '📧', text: 'alomgirhosssain71@gmail.com', href: 'mailto:alomgirhosssain71@gmail.com' },
                                { emoji: '📞', text: '+880 1756135199', href: 'tel:+8801756135199' },
                                { emoji: '📍', text: 'Mymensingh, Bangladesh', href: null },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.text}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.35, delay: 0.25 + i * 0.08 }}
                                >
                                    {item.href ? (
                                        <a href={item.href} className='flex items-center gap-2 text-slate-500 dark:text-gray-400 text-sm font-medium hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-200'>
                                            <span>{item.emoji}</span>{item.text}
                                        </a>
                                    ) : (
                                        <p className='flex items-center gap-2 text-slate-500 dark:text-gray-400 text-sm font-medium'>
                                            <span>{item.emoji}</span>{item.text}
                                        </p>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Live clock */}
                    <LiveClock />

                </div>

                {/* ── Divider ── */}
                <div className='h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent mb-8' />

                {/* ── Bottom row ── */}
                <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className='text-slate-400 dark:text-gray-500 text-xs font-medium text-center sm:text-left'
                    >
                        © {new Date().getFullYear()} Alomgir Hossain. All rights reserved.
                    </motion.p>

                    <motion.button
                        onClick={scrollToTop}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        whileHover={{ scale: 1.06, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className='flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 px-4 py-2.5 rounded-xl transition-colors duration-200 group'
                    >
                        <motion.span
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <FaArrowUp size={11} />
                        </motion.span>
                        Back to top
                    </motion.button>
                </div>

            </div>
        </footer>
    );
}