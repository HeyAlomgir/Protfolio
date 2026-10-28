'use client';

import { useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
import { Card } from '@heroui/react';
import Marquee from 'react-fast-marquee';
import toast from 'react-hot-toast';
import {
  FaAward,
  FaFolderOpen,
  FaHeadset,
  FaDownload,
  FaJsSquare,
  FaNode,
  FaReact,
} from 'react-icons/fa';
import { RiTailwindCssFill } from 'react-icons/ri';
import {
  SiHtml5,
  SiCss,
  SiDaisyui,
  SiNextdotjs,
  SiTypescript,
  SiExpress,
  SiMongodb,
  SiFigma,
  SiGit,
  SiVercel,
  SiNetlify,
  SiRender,
} from 'react-icons/si';
import { TbBrandGithubFilled } from 'react-icons/tb';

// ── Skills data ─────────────────────────────────────────────────────────────
const tabSkills = {
  Frontend: [
    { label: 'Next.js', icon: <SiNextdotjs className="text-slate-900 dark:text-white" /> },
    { label: 'React', icon: <FaReact className="text-[#61DAFB]" /> },
    { label: 'JavaScript', icon: <FaJsSquare className="text-[#F7DF1E]" /> },
    { label: 'TypeScript', icon: <SiTypescript className="text-[#3178C6]" /> },
    { label: 'Tailwind CSS', icon: <RiTailwindCssFill className="text-[#06B6D4]" /> },
    { label: 'HeroUI', icon: <span className="text-[#8B5CF6] text-4xl font-black">H</span> },
    { label: 'DaisyUI', icon: <SiDaisyui className="text-[#5A0EF8]" /> },
    { label: 'HTML5', icon: <SiHtml5 className="text-[#E34F26]" /> },
    { label: 'CSS3', icon: <SiCss className="text-[#1572B6]" /> },
  ],
  Backend: [
    { label: 'Node.js', icon: <FaNode className="text-[#339933]" /> },
    { label: 'Express.js', icon: <SiExpress className="text-slate-700 dark:text-slate-300" /> },
    { label: 'MongoDB', icon: <SiMongodb className="text-[#13AA52]" /> },
    { label: 'Better Auth', icon: <span className="text-[#F97316] text-3xl font-black">B</span> },
  ],
  'Design & Deploy': [
    { label: 'Figma', icon: <SiFigma className="text-[#F24E1E]" /> },
    { label: 'Penpot', icon: <span className="text-[#FF3D00] text-3xl font-black">P</span> },
    { label: 'Git', icon: <SiGit className="text-[#F05032]" /> },
    { label: 'GitHub', icon: <TbBrandGithubFilled className="text-slate-900 dark:text-white" /> },
    { label: 'Vercel', icon: <SiVercel className="text-slate-900 dark:text-white" /> },
    { label: 'Netlify', icon: <SiNetlify className="text-[#00C7B7]" /> },
    { label: 'Render', icon: <SiRender className="text-[#46E3B7]" /> },
  ],
};

const tabs = Object.keys(tabSkills);

// ── Professional 3D Tilt ────────────────────────────────────────────────────
function Tilt3D({ children, className = '', intensity = 12, scale = 1.04 }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });

  const rotateX = useTransform(sy, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-intensity, intensity]);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1200 }} className={className}>
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        whileHover={{ scale }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function About() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleDownload = () => {
    const toastId = toast.loading('Preparing resume...');
    let progress = 0;

    const interval = setInterval(() => {
      progress += 20;
      toast.loading(`Downloading Resume... ${progress}%`, { id: toastId });

      if (progress >= 100) {
        clearInterval(interval);
        toast.success('Resume downloaded successfully!', { id: toastId });

        const link = document.createElement('a');
        link.href = '/Alomgir_Resume.pdf';
        link.download = 'Alomgir_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }, 250);
  };

  return (
    <section
      id="about"
      className="relative w-full py-24 md:py-32 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white dark:from-[#0B1120] dark:via-[#0f172a] dark:to-[#0B1120] transition-colors duration-500"
    >
      {/* Subtle 3D grid floor */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[480px] opacity-[0.35] dark:opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(rgba(34,211,238,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.22) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          transform: 'perspective(700px) rotateX(58deg)',
          transformOrigin: 'bottom',
          maskImage: 'linear-gradient(to top, black 20%, transparent)',
          WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent)',
        }}
      />

      {/* Soft ambient orbs */}
      <div className="pointer-events-none absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-cyan-400/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/3 -right-32 w-80 h-80 rounded-full bg-blue-500/15 blur-[100px]" />

      <div className="relative max-w-[1500px] mx-auto px-6 lg:px-10">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-semibold mb-5 tracking-wide">
            <span className="text-base">👨‍💻</span> Get to know me
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[3.4rem] font-black text-slate-900 dark:text-white tracking-tight mb-4">
            About{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
              Me
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            My journey, passion, and the technologies I use to craft modern web experiences.
          </p>
        </motion.div>

        {/* ── Main Content ── */}
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* LEFT — Professional 3D Photo Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="relative flex justify-center items-center min-h-[540px]"
          >
            {/* Soft glow behind card */}
            <div className="absolute w-[380px] h-[380px] rounded-full bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-violet-500/25 blur-3xl" />

            <Tilt3D intensity={14} scale={1.025} className="relative w-[300px] sm:w-[340px] h-[460px]">
              {/* Deep back layer */}
              <div
                className="absolute inset-0 rounded-[1.85rem] bg-gradient-to-br from-violet-500/30 to-blue-600/30 border border-white/10"
                style={{ transform: 'translateZ(-70px) translate(22px, 22px)' }}
              />
              {/* Middle layer */}
              <div
                className="absolute inset-0 rounded-[1.85rem] bg-gradient-to-br from-cyan-400/40 to-blue-500/40 border border-white/15"
                style={{ transform: 'translateZ(-35px) translate(11px, 11px)' }}
              />

              {/* Main card */}
              <div
                className="absolute inset-0 rounded-[1.85rem] p-[2.5px] bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 shadow-[0_25px_60px_-12px_rgba(34,211,238,0.45)]"
                style={{ transform: 'translateZ(0px)' }}
              >
                <div className="relative w-full h-full rounded-[1.7rem] overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <Image
                    src="https://i.ibb.co.com/Z67td2TS/Alomgir-2.png"
                    alt="Alomgir Hossain"
                    fill
                    priority
                    className="object-cover object-top"
                  />
                  {/* Subtle top shine */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-transparent pointer-events-none" />
                  {/* Bottom vignette */}
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Name plate — floating forward */}
              <div
                className="absolute left-1/2 -translate-x-1/2 bottom-6 w-[84%] rounded-2xl px-5 py-3.5 bg-white/85 dark:bg-[#0B1120]/85 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-xl text-center"
                style={{ transform: 'translateZ(80px)' }}
              >
                <p className="text-slate-900 dark:text-white font-bold text-[1.05rem] tracking-tight">
                  Alomgir Hossain
                </p>
                <p className="text-cyan-600 dark:text-cyan-400 text-xs font-semibold tracking-wider mt-0.5">
                  Full-Stack Developer
                </p>
              </div>

              {/* Floating badge — Projects */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-7 top-12"
                style={{ transform: 'translateZ(120px)' }}
              >
                <div className="bg-white/90 dark:bg-[#111827]/95 backdrop-blur-xl rounded-2xl px-3.5 py-2.5 shadow-2xl border border-slate-200/80 dark:border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-inner">
                      35+
                    </div>
                    <div>
                      <p className="text-slate-900 dark:text-white font-semibold text-sm leading-none">
                        Projects
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                        Completed
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating badge — Available */}
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-7 top-28"
                style={{ transform: 'translateZ(140px)' }}
              >
                <div className="bg-white/90 dark:bg-[#111827]/95 backdrop-blur-xl rounded-2xl px-3.5 py-2.5 shadow-2xl border border-slate-200/80 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                    </span>
                    <div>
                      <p className="text-slate-900 dark:text-white font-semibold text-sm leading-none">
                        Available
                      </p>
                      <p className="text-emerald-500 text-[11px] font-semibold mt-0.5">For Hire</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating badge — Stack */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-5 bottom-32"
                style={{ transform: 'translateZ(110px)' }}
              >
                <div className="bg-white/90 dark:bg-[#111827]/95 backdrop-blur-xl rounded-2xl px-3.5 py-2.5 shadow-2xl border border-slate-200/80 dark:border-white/10">

                </div>
              </motion.div>

              {/* Decorative 3D elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="absolute -right-5 -top-5 w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 opacity-90 shadow-lg shadow-cyan-500/40"
                style={{ transform: 'translateZ(95px)' }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                className="absolute -left-3 -bottom-5 w-8 h-8 rounded-full border-[3px] border-violet-400/60"
                style={{ transform: 'translateZ(85px)' }}
              />
            </Tilt3D>
          </motion.div>

          {/* RIGHT — Bio + Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="space-y-9"
          >
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: <FaAward className="text-2xl text-cyan-500" />,
                  title: 'Experience',
                  sub: '1.5+ Years Learning',
                },
                {
                  icon: <FaFolderOpen className="text-2xl text-cyan-500" />,
                  title: 'Projects',
                  sub: '35+ Completed',
                },
                {
                  icon: <FaHeadset className="text-2xl text-cyan-500" />,
                  title: 'Support',
                  sub: '24/7 Available',
                },
              ].map((s) => (
                <Tilt3D key={s.title} intensity={16} scale={1.05}>
                  <div
                    className="group p-5 rounded-2xl bg-white/70 dark:bg-white/[0.04] backdrop-blur-xl border border-slate-200/80 dark:border-white/10 hover:border-cyan-400/50 shadow-md hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 text-center"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="mb-3 flex justify-center" style={{ transform: 'translateZ(36px)' }}>
                      {s.icon}
                    </div>
                    <h3
                      className="font-bold text-slate-900 dark:text-white text-[15px] mb-1"
                      style={{ transform: 'translateZ(28px)' }}
                    >
                      {s.title}
                    </h3>
                    <p
                      className="text-sm text-slate-600 dark:text-slate-400"
                      style={{ transform: 'translateZ(20px)' }}
                    >
                      {s.sub}
                    </p>
                  </div>
                </Tilt3D>
              ))}
            </div>

            {/* Bio text */}
            <div className="space-y-4">
              <p className="text-slate-700 dark:text-slate-300 leading-8 text-[1.05rem]">
                I started my programming journey with curiosity about how websites work, and over
                time I grew into a passionate{' '}
                <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                  Full-Stack Developer
                </span>
                .
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-8 text-[1.05rem]">
                I build modern, responsive, and scalable web applications using{' '}
                <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                  React.js, Next.js, Node.js, Express.js, MongoDB, Tailwind CSS, HeroUI, and Better
                  Auth
                </span>
                .
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-8 text-[1.05rem]">
                My focus is creating clean UI, secure authentication systems, strong backend
                architecture, and real-world user experiences that solve practical problems.
              </p>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <motion.button
                onClick={handleDownload}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-[0_8px_0_0_#0e7490,0_18px_35px_rgba(6,182,212,0.3)] hover:shadow-[0_10px_0_0_#0e7490,0_22px_45px_rgba(6,182,212,0.4)] transition-shadow duration-300"
              >
                <FaDownload className="text-lg" />
                Download Resume
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* ── Skills Section ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-28"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
              My Tech{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                Stack
              </span>
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
              Click a category to explore
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 ${activeTab === tab
                  ? 'text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400'
                  }`}
              >
                {activeTab === tab && (
                  <motion.span
                    layoutId="activeSkillTab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25"
                    transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>

          {/* Marquee skills */}
          <div className="overflow-hidden py-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.28 }}
              >
                <Marquee pauseOnHover gradient={false} speed={50}>
                  <div className="flex items-center gap-5 pr-5">
                    {tabSkills[activeTab].map((tech, i) => (
                      <Tilt3D
                        key={i}
                        intensity={18}
                        scale={1.08}
                        className="w-[7.25rem] h-[7.25rem] mx-1.5"
                      >
                        <Card
                          className="w-full h-full flex flex-col items-center justify-center rounded-2xl cursor-pointer bg-white dark:bg-[#111827] border border-cyan-400/60 shadow-[0_0_18px_rgba(34,211,238,0.25)] hover:shadow-[0_0_32px_rgba(34,211,238,0.45)] hover:border-cyan-400 transition-all duration-300"
                          style={{ transformStyle: 'preserve-3d' }}
                        >
                          <p
                            className="text-[2.65rem] flex items-center justify-center w-full h-14"
                            style={{ transform: 'translateZ(32px)' }}
                          >
                            {tech.icon}
                          </p>
                          <p
                            className="text-[10px] font-bold text-slate-600 dark:text-slate-400 text-center px-1.5 leading-tight mt-1"
                            style={{ transform: 'translateZ(18px)' }}
                          >
                            {tech.label}
                          </p>
                        </Card>
                      </Tilt3D>
                    ))}
                  </div>
                </Marquee>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}