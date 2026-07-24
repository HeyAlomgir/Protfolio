'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaLaptopCode, FaSchool, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi';

// ── Icon map by "icon" field in JSON ─────────────────────────────────────────
const ICON_MAP = {
    college: { icon: HiAcademicCap, gradient: 'from-cyan-500 to-blue-600', glow: 'rgba(34,211,238,0.5)' },
    course: { icon: FaLaptopCode, gradient: 'from-purple-500 to-pink-500', glow: 'rgba(168,85,247,0.5)' },
    school: { icon: FaSchool, gradient: 'from-emerald-500 to-teal-600', glow: 'rgba(16,185,129,0.5)' },
};

// Fallback data if JSON fetch fails
const FALLBACK = [
    {
        id: 1, status: 'Ongoing', icon: 'college',
        degree: 'Diploma in Engineering (Computer Science & Technology)',
        institution: 'Mymensingh Polytechnic Institute', duration: '2023 - Present',
        desc: 'Currently pursuing a Diploma in Computer Science & Technology (CST). Alongside academic studies, specializing in Full Stack Web Development using React.js, Next.js, Node.js, Express.js, MongoDB, Better Auth, TypeScript, and modern web technologies.',
    },
    {
        id: 2, status: 'Completed', icon: 'course',
        degree: 'Complete Web Development Course',
        institution: 'Programming Hero', duration: '2025 - 2026',
        desc: 'Successfully completed an intensive Full Stack Web Development course covering HTML5, CSS3, JavaScript, React.js, Next.js, Tailwind CSS, Node.js, Express.js, MongoDB, Better Auth, Stripe, Git, GitHub, and deployment.',
    },
    {
        id: 3, status: 'Completed', icon: 'school',
        degree: 'Secondary School Certificate (SSC)',
        institution: 'Konapara High School', duration: '2023',
        desc: 'Successfully completed the Secondary School Certificate (SSC), building a strong academic foundation before continuing higher education in Computer Science & Technology.',
    },
];

// ── Single education card ─────────────────────────────────────────────────────
function EduCard({ edu, index, isLast }) {
    const [hovered, setHovered] = useState(false);
    const meta = ICON_MAP[edu.icon] ?? ICON_MAP.college;
    const Icon = meta.icon;
    const isOngoing = edu.status === 'Ongoing';

    return (
        <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className='relative flex gap-6 group'
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* ── Timeline line + dot ── */}
            <div className='flex flex-col items-center'>
                {/* Glowing icon dot */}
                <motion.div
                    animate={hovered ? { scale: 1.2 } : { scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    className={`relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center text-white shadow-lg flex-shrink-0`}
                    style={{ boxShadow: hovered ? `0 0 24px ${meta.glow}` : undefined, transition: 'box-shadow 0.3s ease' }}
                >
                    <Icon size={24} />
                    {/* Ping animation for ongoing */}
                    {isOngoing && (
                        <span className='absolute -top-1 -right-1 flex h-3.5 w-3.5'>
                            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75' />
                            <span className='relative inline-flex h-3.5 w-3.5 rounded-full bg-cyan-500' />
                        </span>
                    )}
                </motion.div>

                {/* Vertical line */}
                {!isLast && (
                    <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
                        className='w-0.5 flex-1 mt-3 origin-top bg-gradient-to-b from-slate-300 to-transparent dark:from-slate-700'
                    />
                )}
            </div>

            {/* ── Content card ── */}
            <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className='relative flex-1 mb-10 overflow-hidden rounded-2xl p-6 cursor-default bg-white dark:bg-[#0d1526] border border-slate-200/80 dark:border-slate-700/40 hover:border-cyan-400/50 dark:hover:border-cyan-400/40 transition-colors duration-300'
                style={{
                    boxShadow: hovered
                        ? `0 16px 40px ${meta.glow}, 0 0 0 1px rgba(34,211,238,0.15)`
                        : '0 2px 8px rgba(0,0,0,0.06)',
                    transition: 'box-shadow 0.3s ease',
                }}
            >
                {/* Shimmer streak on hover */}
                <div className='absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none' />

                {/* Gradient bg overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${meta.gradient} opacity-0 group-hover:opacity-[0.05] dark:group-hover:opacity-[0.10] transition-opacity duration-500 pointer-events-none rounded-2xl`} />

                {/* Top row: status badge + duration */}
                <div className='relative z-10 flex flex-wrap items-center justify-between gap-3 mb-4'>
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${isOngoing
                            ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20'
                            : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                        }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isOngoing ? 'bg-cyan-500 animate-pulse' : 'bg-emerald-500'}`} />
                        {edu.status}
                    </span>

                    <span className='flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-gray-400'>
                        <FaClock size={11} />
                        {edu.duration}
                    </span>
                </div>

                {/* Degree title */}
                <h3 className='relative z-10 text-lg md:text-xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-200 leading-snug'>
                    {edu.degree}
                </h3>

                {/* Institution */}
                <div className='relative z-10 flex items-center gap-1.5 text-sm font-bold text-slate-500 dark:text-gray-400 mb-4'>
                    <FaMapMarkerAlt size={12} className='text-cyan-500' />
                    {edu.institution}
                </div>

                {/* Description */}
                <p className='relative z-10 text-sm text-slate-600 dark:text-gray-400 leading-relaxed font-medium'>
                    {edu.desc}
                </p>

                {/* Bottom accent line on hover */}
                <motion.div
                    animate={{ scaleX: hovered ? 1 : 0 }}
                    transition={{ duration: 0.35 }}
                    className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${meta.gradient} origin-left rounded-b-2xl`}
                />
            </motion.div>
        </motion.div>
    );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Education() {
    const [data, setData] = useState(FALLBACK);

    useEffect(() => {
        fetch('/education.json')
            .then((r) => (r.ok ? r.json() : Promise.reject()))
            .then((json) => setData(json))
            .catch(() => setData(FALLBACK));
    }, []);

    return (
        <section
            id='education'
            className='w-full py-24 bg-white dark:bg-[#080f1e] transition-colors duration-300'
        >
            <div className='max-w-[1500px] mx-auto px-6 lg:px-10'>

                {/* ── Section Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className='text-center mb-20'
                >
                    <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-semibold mb-5'>
                        🎓 Academic Background
                    </div>
                    <h2 className='text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-3'>
                        My <span className='text-cyan-600 dark:text-cyan-400'>Education</span>
                    </h2>
                    <p className='text-slate-600 dark:text-gray-400 text-lg max-w-2xl mx-auto'>
                        The academic journey and courses that shaped my skills as a developer.
                    </p>
                </motion.div>

                {/* ── Timeline ── */}
                <div className='max-w-3xl mx-auto'>
                    {data.map((edu, index) => (
                        <EduCard
                            key={edu.id}
                            edu={edu}
                            index={index}
                            isLast={index === data.length - 1}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}