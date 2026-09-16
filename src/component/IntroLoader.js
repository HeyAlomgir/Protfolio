'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';


const PROFILE_IMAGE_URL = 'https://i.ibb.co.com/BVX7Bq3n/Alomgir-2.png';

const PATTERNS = [
    { steps: 36, angle: 170 },
    { steps: 48, angle: 151 },
    { steps: 60, angle: 144 },
    { steps: 72, angle: 157 },
    { steps: 90, angle: 160 },
    { steps: 45, angle: 163 },
];

export default function IntroLoader({ onFinish }) {
    const canvasRef = useRef(null);
    const [phase, setPhase] = useState('drawing'); // 'drawing' -> 'exiting' -> unmount

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Retina-friendly sizing
        const size = Math.min(window.innerWidth, window.innerHeight) * 0.7;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;
        ctx.scale(dpr, dpr);

        const center = size / 2;
        const lineLength = size * 0.32;

     
        const { steps, angle } = PATTERNS[Math.floor(Math.random() * PATTERNS.length)];
        const baseHue = Math.floor(Math.random() * 360);

        const DRAW_DURATION = 2000; 
        const HOLD_DURATION = 400;
        const startTime = performance.now();

        let x = center;
        let y = center;
        let heading = 0;
        let stepsDone = 0;
        let rafId;

        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.shadowBlur = 8;

        const draw = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / DRAW_DURATION);
            const targetSteps = Math.floor(progress * steps);

            while (stepsDone < targetSteps) {
                const rad = (heading * Math.PI) / 180;
                const nx = x + lineLength * Math.cos(rad);
                const ny = y + lineLength * Math.sin(rad);

                const hue = (baseHue + (stepsDone / steps) * 360) % 360;
                ctx.strokeStyle = `hsl(${hue}, 85%, 62%)`;
                ctx.shadowColor = `hsl(${hue}, 85%, 62%)`;

                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(nx, ny);
                ctx.stroke();

                x = nx;
                y = ny;
                heading += angle;
                stepsDone++;
            }

            if (elapsed < DRAW_DURATION) {
                rafId = requestAnimationFrame(draw);
            } else {
                // আঁকা শেষ, একটু বিরতি নিয়ে exit phase শুরু করবে
                setTimeout(() => setPhase('exiting'), HOLD_DURATION);
            }
        };

        rafId = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(rafId);
    }, []);

    // exiting phase শুরু হলে fade-out শেষে পুরো loader সরিয়ে দাও
    useEffect(() => {
        if (phase === 'exiting') {
            const t = setTimeout(() => onFinish?.(), 550);
            return () => clearTimeout(t);
        }
    }, [phase, onFinish]);

    return (
        <AnimatePresence>
            {phase !== 'done' && (
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: phase === 'exiting' ? 0 : 1 }}
                    transition={{ duration: 0.55, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#05070d] overflow-hidden"
                >
                    {/* Welcome text - উপরে */}
                    <motion.p
                        initial={{ opacity: 0, y: -14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.5 }}
                        className="text-cyan-400 text-sm sm:text-base font-semibold tracking-[0.3em] uppercase mb-2"
                    >
                        Welcome
                    </motion.p>

                    {/* Canvas spiral + center photo */}
                    <div className="relative flex items-center justify-center">
                        <canvas ref={canvasRef} className="block" />

                        {/* মাঝখানের গোল ছবি (spiral এর কেন্দ্রের "hole" এ বসবে) */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.6, ease: 'backOut' }}
                                className="relative w-[26%] h-[26%] rounded-full overflow-hidden ring-2 ring-white/20 shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                            >
                                {PROFILE_IMAGE_URL !== 'PASTE_YOUR_IMGBB_LINK_HERE' ? (
                                    <Image src={PROFILE_IMAGE_URL} alt="Alomgir Hossain" fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-lg">
                                        AH
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>

                    {/* ননাম / ব্র্যান্ডিং */}
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="mt-4 text-center"
                    >
                        <h1 className="text-2xl sm:text-3xl font-black tracking-wide">
                            <span className="text-white">ALOMGIR</span>{' '}
                            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                                PORTFOLIO
                            </span>
                        </h1>
                        <div className="w-24 h-0.5 mx-auto mt-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}