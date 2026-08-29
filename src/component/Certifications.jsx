'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { FaCertificate, FaTimes, FaExpand } from 'react-icons/fa';

// public/certifications.json না পাওয়া গেলে fallback (image URL বসাতে ভুলো না)
const FALLBACK = [
    {
        id: 1,
        title: 'Complete Web Development Course — Certificate of Excellence',
        issuer: 'Programming Hero (Batch-13)',
        date: 'Jan 2026 - Jun 2026',
        image: '',
        description:
            'Successfully completed an intensive Full Stack Web Development course, demonstrating proficiency in HTML, CSS, JavaScript, React.js, Next.js, Node.js, Express.js, and MongoDB, along with AI-powered development practices and professional web engineering readiness.',
    },
    {
        id: 2,
        title: 'AI Skills Training Programme',
        issuer: 'BRAC Education Programme (BEP) & Social Innovation Lab (SIL)',
        date: '2026',
        image: '',
        description:
            'Successfully completed the AI Skills Training programme, part of the AI Opportunity Fund: Asia-Pacific initiative in collaboration with AVPN, supported by Google.org and the Asian Development Bank (ADB) — building foundational AI concepts and future-ready skills.',
    },
];

export default function Certifications() {
    const [certifications, setCertifications] = useState(FALLBACK);
    const [loading, setLoading] = useState(true);
    const [selectedCert, setSelectedCert] = useState(null); // ক্লিক করা certificate, lightbox এ দেখানোর জন্য

    useEffect(() => {
        const fetchCertifications = async () => {
            try {
                const res = await fetch('/certifications.json');
                if (!res.ok) throw new Error('Failed to load');
                const data = await res.json();
                setCertifications(data);
            } catch (error) {
                toast.error('Error loading certifications data');
                setCertifications(FALLBACK);
            } finally {
                setLoading(false);
            }
        };
        fetchCertifications();
    }, []);

    // Lightbox খোলা অবস্থায় background scroll বন্ধ রাখা
    useEffect(() => {
        document.body.style.overflow = selectedCert ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [selectedCert]);

    // Escape চাপলে lightbox বন্ধ হবে
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setSelectedCert(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    return (
        <section
            id="certifications"
            className="w-full py-24 bg-white dark:bg-[#0B1120] transition-colors duration-300"
        >
            <div className="max-w-5xl mx-auto px-6 lg:px-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-semibold mb-5">
                        🏆 Achievements
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-3">
                        My <span className="text-cyan-600 dark:text-cyan-400">Certifications</span>
                    </h2>
                    <p className="text-slate-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        Courses and training programs I've completed to sharpen my skills. Click a certificate to view it full size.
                    </p>
                </motion.div>

                {/* Cards */}
                {loading ? (
                    <div className="grid sm:grid-cols-2 gap-6">
                        {Array.from({ length: 2 }).map((_, i) => (
                            <div key={i} className="h-80 rounded-3xl bg-slate-100 dark:bg-slate-800/60 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 gap-6">
                        {certifications.map((cert, index) => (
                            <motion.div
                                key={cert.id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.12, duration: 0.45 }}
                                whileHover={{ y: -6 }}
                                className="group relative overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md hover:border-cyan-400/60 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
                            >
                                {/* Certificate image - ক্লিক করলে lightbox খুলবে */}
                                {cert.image ? (
                                    <button
                                        onClick={() => setSelectedCert(cert)}
                                        className="relative w-full h-48 bg-slate-100 dark:bg-slate-900 overflow-hidden block cursor-zoom-in"
                                        aria-label={`View ${cert.title} full size`}
                                    >
                                        <Image
                                            src={cert.image}
                                            alt={cert.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {/* Hover overlay with expand icon */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                                            <FaExpand className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                    </button>
                                ) : (
                                    <div className="w-full h-48 bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                                        <FaCertificate className="text-slate-300 dark:text-slate-700 text-4xl" />
                                    </div>
                                )}

                                <div className="p-7">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 leading-snug">
                                        {cert.title}
                                    </h3>
                                    <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 mb-1">
                                        {cert.issuer}
                                    </p>
                                    <p className="text-xs text-slate-400 dark:text-gray-500 mb-4">{cert.date}</p>

                                    <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed">
                                        {cert.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Lightbox - certificate পুরো সাইজে দেখার জন্য */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedCert(null)}
                        className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
                    >
                        <button
                            onClick={() => setSelectedCert(null)}
                            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                            aria-label="Close"
                        >
                            <FaTimes size={18} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-3xl max-h-[85vh] flex flex-col items-center"
                        >
                            <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden bg-white">
                                <Image
                                    src={selectedCert.image}
                                    alt={selectedCert.title}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <p className="text-white text-sm font-semibold mt-4 text-center">
                                {selectedCert.title}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}