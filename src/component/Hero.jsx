'use client';

import Image from 'next/image';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import Typewriter from 'typewriter-effect';
import toast from 'react-hot-toast';
import { useRef, useState } from 'react';

const Hero = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/HeyAlomgir',
      icon: <FaGithub />,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/alomgir-hossain-web/',
      icon: <FaLinkedinIn />,
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/AlomgirWEB',
      icon: <FaFacebookF />,
    },
  ];

  // Resume download with toast progress
  const handleDownload = () => {
    const toastId = toast.loading('Preparing resume...');

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

        const link = document.createElement('a');
        link.href = '/Alomgir_Resume.pdf';
        link.download = 'Alomgir_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }, 250);
  };

  // ─── 3D Tilt tracking for avatar card ───
  const avatarRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = avatarRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // ─── 3D tilt for left content ───
  const contentRef = useRef(null);
  const contentMouseX = useMotionValue(0);
  const contentMouseY = useMotionValue(0);

  const contentRotateX = useSpring(useTransform(contentMouseY, [-0.5, 0.5], [4, -4]), { stiffness: 120, damping: 25 });
  const contentRotateY = useSpring(useTransform(contentMouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 120, damping: 25 });

  const handleContentMouseMove = (e) => {
    const rect = contentRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    contentMouseX.set(x);
    contentMouseY.set(y);
  };

  const handleContentMouseLeave = () => {
    contentMouseX.set(0);
    contentMouseY.set(0);
  };

  return (
    <section
      id='home'
      className='relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50 dark:from-[#020617] dark:via-[#0B1120] dark:to-[#111827] transition-colors duration-300'
      style={{ perspective: '1200px' }}
    >
      {/* ═══ 3D Parallax Background Orbs ═══ */}
      <div className='absolute inset-0' style={{ transformStyle: 'preserve-3d' }}>
        <motion.div
          animate={{ y: [-30, 30, -30], x: [-15, 15, -15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className='absolute top-16 left-16 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl'
          style={{ transform: 'translateZ(-100px)' }}
        />
        <motion.div
          animate={{ y: [20, -30, 20], x: [10, -20, 10] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className='absolute bottom-16 right-16 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl'
          style={{ transform: 'translateZ(-150px)' }}
        />
        <motion.div
          animate={{ y: [15, -25, 15], x: [-10, 20, -10], scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className='absolute top-1/2 left-1/3 w-72 h-72 bg-purple-500/8 rounded-full blur-3xl'
          style={{ transform: 'translateZ(-200px)' }}
        />
      </div>

      {/* ═══ 3D Geometric Grid Background ═══ */}
      <div className='absolute inset-0 overflow-hidden opacity-[0.03] dark:opacity-[0.04]'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `
              linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: 'perspective(500px) rotateX(60deg) translateY(-50%)',
            transformOrigin: 'center center',
          }}
        />
      </div>

      <div className='relative z-10 max-w-[1500px] mx-auto px-6 lg:px-10 pt-32 pb-20'>
        <div className='grid lg:grid-cols-2 gap-16 items-center'>

          {/* ═══════════════════════════════════════════════════
              LEFT CONTENT — 3D Tilt on hover
          ═══════════════════════════════════════════════════ */}
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, x: -60, rotateY: -8 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            onMouseMove={handleContentMouseMove}
            onMouseLeave={handleContentMouseLeave}
            style={{
              transformStyle: 'preserve-3d',
              rotateX: contentRotateX,
              rotateY: contentRotateY,
            }}
            className='order-2 lg:order-1 space-y-7'
          >
            {/* Welcome badge — 3D pop-out */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{ transform: 'translateZ(40px)' }}
              className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-semibold backdrop-blur-sm shadow-lg shadow-cyan-500/5'
            >
              ✨ Welcome to my portfolio
            </motion.div>

            {/* Heading — 3D layered text */}
            <div className='space-y-4' style={{ transform: 'translateZ(30px)' }}>
              <h1 className='text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight text-slate-900 dark:text-white'>
                Hi, I'm
                <span className='block bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg'>
                  Alomgir Hossain
                </span>
              </h1>

              <div className='flex flex-wrap items-center gap-3 text-2xl lg:text-3xl font-bold'>
                <span className='text-slate-900 dark:text-white'>I am a</span>

                <span className='text-cyan-600 dark:text-cyan-400 min-w-[260px]'>
                  <Typewriter
                    options={{
                      strings: [
                        'Full-Stack Developer',
                        'MERN Stack Developer',
                        'Frontend Developer',
                        'Backend Developer',
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 55,
                      deleteSpeed: 30,
                    }}
                  />
                </span>
              </div>

              {/* Tagline */}
              <p className='text-cyan-600 dark:text-cyan-400 font-semibold text-sm md:text-base'>
                🚀 Turning ideas into Stunning Websites 💻 | Available for projects and collaborations 🌟
              </p>
            </div>

            {/* Description — 3D depth layer */}
            <div className='space-y-4' style={{ transform: 'translateZ(20px)' }}>
              <p className='text-slate-700 dark:text-gray-300 text-lg leading-relaxed max-w-xl'>
                I build modern, scalable, and high-performance web applications using
                <span className='text-cyan-600 dark:text-cyan-400 font-semibold'>
                  {' '}Next.js, React, Node.js, Express, MongoDB, and Better Auth
                </span>.
              </p>

              <p className='text-slate-600 dark:text-gray-400 leading-relaxed max-w-xl'>
                My focus is creating clean UI, secure authentication systems, strong backend architecture, and real-world user experiences that solve practical problems.
              </p>
            </div>

            {/* Resume + Social — front-most 3D layer */}
            <div
              className='flex flex-col sm:flex-row items-start sm:items-center gap-5'
              style={{ transform: 'translateZ(50px)' }}
            >
              {/* Resume Button — 3D press effect */}
              <motion.button
                onClick={handleDownload}
                whileHover={{ y: -4, scale: 1.03, rotateX: -5 }}
                whileTap={{ scale: 0.96, rotateX: 3 }}
                className='relative px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/50 transition-all duration-300 overflow-hidden group'
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Shine sweep on hover */}
                <span className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700' />
                <span className='relative z-10'>Download Resume</span>
              </motion.button>

              {/* Social Buttons — 3D pop */}
              <div className='flex items-center gap-3'>
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    whileHover={{ y: -6, scale: 1.15, rotateY: 15 }}
                    whileTap={{ scale: 0.9 }}
                    className='w-12 h-12 rounded-2xl flex items-center justify-center bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-cyan-500/10'
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ═══════════════════════════════════════════════════
              RIGHT AVATAR — 3D Interactive Tilt Card
          ═══════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.9, rotateY: 12 }}
            animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className='order-1 lg:order-2 flex justify-center lg:justify-end'
          >
            <div
              ref={avatarRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className='relative w-[360px] sm:w-[420px] lg:w-[540px] h-[460px] lg:h-[620px]'
              style={{ perspective: '1000px' }}
            >
              {/* ── 3D Tilt Container ── */}
              <motion.div
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
                className='relative w-full h-full'
              >

                {/* Abstract Blob Background — Back layer */}
                <div
                  className='absolute inset-0 flex items-center justify-center'
                  style={{ transform: 'translateZ(-60px)' }}
                >
                  <div className='w-[320px] h-[320px] lg:w-[440px] lg:h-[440px] bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-[40%_60%_55%_45%/45%_35%_65%_55%] blur-[2px] opacity-95' />
                </div>

                {/* Dark accent shape — Mid-back layer */}
                <div
                  className='absolute top-28 left-6 w-40 h-40 bg-[#0F172A] rounded-[60%_40%_30%_70%] opacity-80'
                  style={{ transform: 'translateZ(-30px)' }}
                />

                {/* Dot pattern — Mid layer */}
                <div
                  className='absolute top-12 right-8 grid grid-cols-6 gap-2 opacity-30'
                  style={{ transform: 'translateZ(20px)' }}
                >
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div key={i} className='w-1.5 h-1.5 rounded-full bg-white' />
                  ))}
                </div>

                {/* ── IMAGE — 3D elevated with glow ring ── */}
                <div
                  className='absolute inset-0 flex items-center justify-center'
                  style={{ transform: 'translateZ(40px)' }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                    className='relative w-[320px] h-[420px] sm:w-[360px] sm:h-[470px] lg:w-[400px] lg:h-[520px]'
                  >
                    {/* Soft 3D glow behind photo */}
                    <div
                      className='absolute -inset-4 rounded-[42%_58%_55%_45%/48%_42%_58%_52%] bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-purple-500/30 blur-2xl'
                      style={{ transform: 'translateZ(-20px)' }}
                    />

                    {/* Gradient ring border wrapper */}
                    <div
                      className='relative w-full h-full p-[3px] bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 shadow-2xl'
                      style={{ borderRadius: '42% 58% 55% 45% / 48% 42% 58% 52%' }}
                    >
                      {/* Photo */}
                      <div
                        className='relative w-full h-full overflow-hidden bg-slate-100 dark:bg-[#0B1120]'
                        style={{ borderRadius: '42% 58% 55% 45% / 48% 42% 58% 52%' }}
                      >
                        <Image
                          src='https://i.ibb.co.com/Z67td2TS/Alomgir-2.png'
                          alt='Alomgir Hossain'
                          fill
                          priority
                          sizes='(max-width: 640px) 320px, (max-width: 1024px) 360px, 400px'
                          className='object-cover object-top'
                        />
                        {/* bottom fade */}
                        <div className='absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/50 dark:from-[#0B1120]/70 to-transparent' />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* ── Floating 3D Cards (front layer) ── */}

                {/* Projects Card — 3D float */}
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  whileHover={{ scale: 1.08, rotateY: -10, z: 20 }}
                  className='absolute left-0 top-32 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-2xl border border-white/10 cursor-pointer'
                  style={{ transform: 'translateZ(80px)', transformStyle: 'preserve-3d' }}
                >
                  <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/30'>
                      35+
                    </div>
                    <div>
                      <p className='text-slate-900 dark:text-white font-bold text-sm'>
                        Projects
                      </p>
                      <p className='text-slate-500 dark:text-gray-400 text-xs'>
                        Completed
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Full Stack Card — 3D float */}
                <motion.div
                  animate={{ y: [8, -8, 8] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  whileHover={{ scale: 1.08, rotateY: 10, z: 20 }}
                  className='absolute right-0 bottom-28 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-xl rounded-2xl px-5 py-4 shadow-2xl border border-white/10 cursor-pointer'
                  style={{ transform: 'translateZ(90px)', transformStyle: 'preserve-3d' }}
                >
                  <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30'>
                      💻
                    </div>
                    <div>
                      <p className='text-slate-900 dark:text-white font-bold text-sm'>
                        Full-Stack
                      </p>
                      <p className='text-cyan-600 dark:text-cyan-400 text-xs font-semibold'>
                        Developer
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Available Card — 3D float */}
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                  whileHover={{ scale: 1.08, rotateX: 10, z: 20 }}
                  className='absolute right-10 top-12 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-2xl border border-white/10 cursor-pointer'
                  style={{ transform: 'translateZ(100px)', transformStyle: 'preserve-3d' }}
                >
                  <div className='flex items-center gap-2'>
                    <div className='w-3 h-3 rounded-full bg-green-500 animate-pulse' />
                    <div>
                      <p className='text-slate-900 dark:text-white font-bold text-sm'>
                        Available
                      </p>
                      <p className='text-green-500 text-xs font-semibold'>
                        For Hire
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* ── NEW: Tech Stack Orbiting Ring (3D) ── */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className='absolute inset-0 flex items-center justify-center pointer-events-none'
                  style={{ transform: 'translateZ(60px)' }}
                >
                  {['⚛️', '🟢', '🔷', '🍃'].map((emoji, i) => (
                    <motion.div
                      key={i}
                      className='absolute w-10 h-10 rounded-full bg-white/90 dark:bg-[#111827]/90 backdrop-blur-md flex items-center justify-center shadow-xl border border-white/20 text-lg'
                      style={{
                        top: `${50 + 42 * Math.sin((i * Math.PI * 2) / 4)}%`,
                        left: `${50 + 42 * Math.cos((i * Math.PI * 2) / 4)}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                      {emoji}
                    </motion.div>
                  ))}
                </motion.div>

              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ═══ Scroll Cue ═══ */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className='hidden sm:flex flex-col items-center gap-2 mt-16 mx-auto w-fit text-slate-400 dark:text-gray-500'
          style={{ transform: 'translateZ(20px)' }}
        >
          <span className='text-xs font-medium tracking-widest uppercase'>Scroll to explore</span>
          <div className='w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-1'>
            <motion.span
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className='w-1.5 h-1.5 rounded-full bg-current'
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;