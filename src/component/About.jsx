'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Card } from '@heroui/react';
import Marquee from 'react-fast-marquee';
import { FaAward, FaFolderOpen, FaHeadset, FaDownload, FaJsSquare, FaNode, FaReact, FaCss3Alt } from 'react-icons/fa';
import { RiTailwindCssFill } from 'react-icons/ri';
import {
  SiHtml5, SiDaisyui,
  SiNextdotjs, SiTypescript, SiExpress,
  SiMongodb, SiFigma, SiGit, SiVercel, SiNetlify, SiRender,
} from 'react-icons/si';
import { TbBrandGithubFilled } from 'react-icons/tb';

// ── Each tab has a list of { label, icon JSX } for the Marquee ──────────────
const tabSkills = {
  Frontend: [
    { label: 'Next.js', icon: <SiNextdotjs className='text-slate-900 dark:text-white' /> },
    { label: 'React', icon: <FaReact className='text-[#61DAFB]' /> },
    { label: 'JavaScript', icon: <FaJsSquare className='text-[#F7DF1E]' /> },
    { label: 'TypeScript', icon: <SiTypescript className='text-[#3178C6]' /> },
    { label: 'Tailwind CSS', icon: <RiTailwindCssFill className='text-[#06B6D4]' /> },
    { label: 'HeroUI', icon: <span className='text-[#8B5CF6] text-4xl font-black'>H</span> },
    { label: 'DaisyUI', icon: <SiDaisyui className='text-[#5A0EF8]' /> },
    { label: 'HTML5', icon: <SiHtml5 className='text-[#E34F26]' /> },
    { label: 'CSS3', icon: <FaCss3Alt className='text-[#1572B6]' /> },
  ],
  Backend: [
    { label: 'Node.js', icon: <FaNode className='text-[#339933]' /> },
    { label: 'Express.js', icon: <SiExpress className='text-slate-900 dark:text-slate-100' /> },
    { label: 'MongoDB', icon: <SiMongodb className='text-[#13AA52]' /> },
    { label: 'Better Auth', icon: <span className='text-[#F97316] text-3xl font-black'>B</span> },
  ],
  'Design & Deploy': [
    { label: 'Figma', icon: <SiFigma className='text-[#F24E1E]' /> },
    { label: 'Penpot', icon: <span className='text-[#FF3D00] text-3xl font-black'>P</span> },
    { label: 'Git', icon: <SiGit className='text-[#F05032]' /> },
    { label: 'GitHub', icon: <TbBrandGithubFilled className='text-slate-900 dark:text-white' /> },
    { label: 'Vercel', icon: <SiVercel className='text-slate-900 dark:text-white' /> },
    { label: 'Netlify', icon: <SiNetlify className='text-[#00C7B7]' /> },
    { label: 'Render', icon: <SiRender className='text-[#46E3B7]' /> },
  ],
};

const tabs = Object.keys(tabSkills);

export default function About() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section
      id='about'
      className='w-full py-24 bg-gradient-to-b from-white to-slate-50 dark:from-[#0B1120] dark:to-[#111827] transition-colors duration-300'
    >
      <div className='max-w-[1500px] mx-auto px-6 lg:px-10'>

        {/* ── Section Title ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-20'
        >
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-semibold mb-5'>
            👨‍💻 Get to know me
          </div>
          <h2 className='text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-3'>
            About <span className='text-cyan-600 dark:text-cyan-400'>Me</span>
          </h2>
          <p className='text-slate-600 dark:text-gray-400 text-lg max-w-2xl mx-auto'>
            My journey, passion, and the technologies I use to build modern web experiences.
          </p>
        </motion.div>

        {/* ── Main grid ── */}
        <div className='grid lg:grid-cols-2 gap-20 items-center'>

          {/* LEFT — Avatar (Unique Cyber Glass Frame Design) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='relative flex justify-center items-center py-6'
          >
            {/* Ambient Background Glow Mesh */}
            <div className='absolute w-[380px] h-[380px] bg-gradient-to-r from-cyan-500/20 via-blue-500/15 to-purple-500/20 rounded-full blur-3xl animate-pulse' />

            {/* Rotating Tech Orbital Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              className='absolute w-[350px] h-[350px] md:w-[410px] md:h-[410px] rounded-full border border-cyan-500/20 dark:border-cyan-400/20 border-dashed'
            />

            {/* Counter-rotating Accent Ring with Glowing Dots */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
              className='absolute w-[310px] h-[310px] md:w-[370px] md:h-[370px] rounded-full border border-purple-500/20 dark:border-purple-400/20'
            >
              <div className='absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]' />
              <div className='absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_12px_#c084fc]' />
            </motion.div>

            {/* Futuristic Tech Corner Bracket Elements */}
            <div className='absolute -top-2 left-8 md:left-12 text-cyan-500/40 text-xl font-mono select-none'>&lt;DEV&gt;</div>
            <div className='absolute -bottom-2 right-8 md:right-12 text-cyan-500/40 text-xl font-mono select-none'>&lt;/DEV&gt;</div>

            {/* Main Cyber Glass Card Container */}
            <motion.div
              whileHover={{ scale: 1.02, rotateY: 5, rotateX: -5 }}
              transition={{ duration: 0.4 }}
              className='relative z-10 w-[290px] h-[370px] md:w-[330px] md:h-[430px] p-3 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-blue-600/10 to-purple-600/20 backdrop-blur-2xl border border-cyan-500/30 dark:border-cyan-400/30 shadow-[0_0_40px_rgba(34,211,238,0.15)] group'
            >
              {/* Inner Glowing Frame */}
              <div className='w-full h-full rounded-2xl overflow-hidden relative bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-900 dark:to-[#0B1120] border border-white/40 dark:border-white/10'>
                {/* Background Tech Grid Lines inside Frame */}
                <div className='absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:18px_18px]' />

                {/* Profile Image */}
                <Image
                  src='https://i.ibb.co.com/Z67td2TS/Alomgir-2.png'
                  alt='Alomgir Hossain'
                  fill
                  priority
                  className='object-contain object-bottom transition-transform duration-500 group-hover:scale-105'
                />

                {/* Bottom Gradient Fade */}
                <div className='absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none' />
              </div>
            </motion.div>

            {/* Floating Badge 1 — Projects */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className='absolute -left-2 md:-left-6 top-12 z-20 bg-white/90 dark:bg-[#0B1120]/90 backdrop-blur-xl rounded-2xl p-3.5 shadow-xl border border-slate-200 dark:border-cyan-500/30 flex items-center gap-3'
            >
              <div className='w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-cyan-500/20'>
                35+
              </div>
              <div>
                <p className='text-slate-900 dark:text-white font-bold text-xs leading-tight'>Projects</p>
                <p className='text-slate-500 dark:text-cyan-400 text-[10px] font-medium'>Completed</p>
              </div>
            </motion.div>

            {/* Floating Badge 2 — Developer Status */}
            <motion.div
              animate={{ y: [6, -6, 6] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className='absolute -right-2 md:-right-6 bottom-16 z-20 bg-white/90 dark:bg-[#0B1120]/90 backdrop-blur-xl rounded-2xl p-3.5 shadow-xl border border-slate-200 dark:border-purple-500/30 flex items-center gap-3'
            >
              <div className='relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white text-base shadow-md shadow-purple-500/20'>
                💻
                <span className='absolute -top-1 -right-1 flex h-3 w-3'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75'></span>
                  <span className='relative inline-flex rounded-full h-3 w-3 bg-emerald-500'></span>
                </span>
              </div>
              <div>
                <p className='text-slate-900 dark:text-white font-bold text-xs leading-tight'>Full-Stack</p>
                <p className='text-cyan-600 dark:text-cyan-400 text-[10px] font-semibold'>Developer</p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — Bio */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='space-y-8'
          >
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
              {[
                { icon: <FaAward className='mx-auto text-3xl text-cyan-500 mb-3 group-hover:scale-110 transition-transform' />, title: 'Experience', sub: '1+ Years Learning' },
                { icon: <FaFolderOpen className='mx-auto text-3xl text-cyan-500 mb-3 group-hover:scale-110 transition-transform' />, title: 'Projects', sub: '35+ Completed' },
                { icon: <FaHeadset className='mx-auto text-3xl text-cyan-500 mb-3 group-hover:scale-110 transition-transform' />, title: 'Support', sub: '24/7 Available' },
              ].map((s) => (
                <div key={s.title} className='group p-6 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 text-center'>
                  {s.icon}
                  <h3 className='font-bold text-slate-900 dark:text-white mb-1'>{s.title}</h3>
                  <p className='text-sm text-slate-600 dark:text-gray-400'>{s.sub}</p>
                </div>
              ))}
            </div>

            <div className='space-y-5'>
              <p className='text-slate-700 dark:text-gray-300 leading-8 text-lg'>
                I started my programming journey with curiosity about how websites work, and over time I grew into a passionate{' '}
                <span className='font-semibold text-cyan-600 dark:text-cyan-400'>Full-Stack Developer</span>.
              </p>
              <p className='text-slate-700 dark:text-gray-300 leading-8 text-lg'>
                I build modern, responsive, and scalable web applications using{' '}
                <span className='font-semibold text-cyan-600 dark:text-cyan-400'>React.js, Next.js, Node.js, Express.js, MongoDB, Tailwind CSS, HeroUI, and Better Auth</span>.
              </p>
              <p className='text-slate-700 dark:text-gray-300 leading-8 text-lg'>
                My focus is creating clean UI, secure authentication systems, strong backend architecture, and real-world user experiences that solve practical problems.
              </p>
            </div>

            <div className='pt-4'>
              <motion.a
                href='/Alomgir_Resume.pdf'
                download='Alomgir_Resume.pdf'
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300'
              >
                <FaDownload />
                Download Resume
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* ── Skills: Tab + Marquee (COMBINED) ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mt-24'
        >
          {/* Title */}
          <div className='text-center mb-10'>
            <h3 className='text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2'>
              My Tech <span className='text-cyan-600 dark:text-cyan-400'>Stack</span>
            </h3>
            <p className='text-slate-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest'>
              Click a category to explore
            </p>
          </div>

          {/* Tab switcher */}
          <div className='flex flex-wrap justify-center gap-2 mb-10'>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 ${activeTab === tab
                    ? 'text-white'
                    : 'text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400'
                  }`}
              >
                {activeTab === tab && (
                  <motion.span
                    layoutId='activeSkillTab'
                    className='absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600'
                    transition={{ type: 'spring', duration: 0.45 }}
                  />
                )}
                <span className='relative z-10'>{tab}</span>
              </button>
            ))}
          </div>

          {/* Marquee — swaps content on tab change */}
          <div className='overflow-hidden'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Marquee pauseOnHover gradient={false} speed={55}>
                  <div className='flex items-center gap-5 pr-5'>
                    {tabSkills[activeTab].map((tech, i) => (
                      <Card
                        key={i}
                        className='
                          w-28 h-28
                          flex flex-col items-center justify-center
                          rounded-2xl cursor-pointer mx-2
                          bg-white dark:bg-[#111827]
                          border-2 border-cyan-400
                          shadow-[0_0_15px_rgba(34,211,238,0.4)]
                          hover:shadow-[0_0_28px_rgba(34,211,238,0.75)]
                          hover:-translate-y-2
                          transition duration-300
                        '
                      >
                        <p className='text-5xl flex items-center justify-center w-full h-14 px-3'>
                          {tech.icon}
                        </p>
                        <p className='text-[10px] font-bold text-slate-600 dark:text-gray-400 text-center px-1 leading-tight'>
                          {tech.label}
                        </p>
                      </Card>
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