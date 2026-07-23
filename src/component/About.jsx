'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaAward, FaFolderOpen, FaHeadset, FaDownload } from 'react-icons/fa';

export default function About() {
  return (
    <section
      id='about'
      className='w-full py-24 bg-gradient-to-b from-white to-slate-50 dark:from-[#0B1120] dark:to-[#111827] transition-colors duration-300'
    >
      <div className='max-w-[1500px] mx-auto px-6 lg:px-10'>

        {/* Title */}
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

        {/* Content */}
        <div className='grid lg:grid-cols-2 gap-20 items-center'>

          {/* LEFT SIDE - Premium Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='relative flex justify-center items-center'
          >
            {/* Glow */}
            <div className='absolute w-[420px] h-[420px] bg-cyan-500/10 rounded-full blur-3xl'></div>

            {/* Blob */}
            <div className='absolute w-[360px] h-[360px] bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-[42%_58%_63%_37%/38%_45%_55%_62%] opacity-90'></div>

            {/* Dots */}
            <div className='absolute -top-6 right-6 grid grid-cols-6 gap-2 opacity-25'>
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className='w-1.5 h-1.5 rounded-full bg-cyan-400'></div>
              ))}
            </div>

            {/* Image Card */}
            <motion.div
              whileHover={{ scale: 1.02, rotate: -1 }}
              transition={{ duration: 0.4 }}
              className='relative z-10 w-[300px] h-[380px] md:w-[340px] md:h-[440px]'
            >
              <div className='absolute inset-0 rounded-[2rem] bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl'></div>

              <div className='absolute inset-3 rounded-[1.6rem] overflow-hidden bg-gradient-to-b from-slate-100 to-white dark:from-slate-800 dark:to-slate-900'>
                <Image
                  src='https://i.ibb.co.com/Z67td2TS/Alomgir-2.png'
                  alt='Alomgir Hossain'
                  fill
                  priority
                  className='object-contain object-bottom'
                />
              </div>
            </motion.div>

            {/* 35+ Projects */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 4, repeat: Infinity }}
              className='absolute left-0 top-16 z-20 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-2xl border border-slate-200 dark:border-white/10'
            >
              <div className='flex items-center gap-3'>
                <div className='w-11 h-11 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold'>
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

            {/* Full Stack Card */}
            <motion.div
              animate={{ y: [8, -8, 8] }}
              transition={{ duration: 5, repeat: Infinity }}
              className='absolute right-0 bottom-20 z-20 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-2xl border border-slate-200 dark:border-white/10'
            >
              <div className='flex items-center gap-3'>
                <div className='w-11 h-11 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white'>
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
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='space-y-8'
          >

            {/* Stats Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>

              {/* Experience */}
              <div className='group p-6 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 text-center'>
                <FaAward className='mx-auto text-3xl text-cyan-500 mb-3 group-hover:scale-110 transition-transform' />
                <h3 className='font-bold text-slate-900 dark:text-white mb-1'>
                  Experience
                </h3>
                <p className='text-sm text-slate-600 dark:text-gray-400'>
                  1+ Years Learning
                </p>
              </div>

              {/* Projects */}
              <div className='group p-6 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 text-center'>
                <FaFolderOpen className='mx-auto text-3xl text-cyan-500 mb-3 group-hover:scale-110 transition-transform' />
                <h3 className='font-bold text-slate-900 dark:text-white mb-1'>
                  Projects
                </h3>
                <p className='text-sm text-slate-600 dark:text-gray-400'>
                  35+ Completed
                </p>
              </div>

              {/* Support */}
              <div className='group p-6 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 text-center'>
                <FaHeadset className='mx-auto text-3xl text-cyan-500 mb-3 group-hover:scale-110 transition-transform' />
                <h3 className='font-bold text-slate-900 dark:text-white mb-1'>
                  Support
                </h3>
                <p className='text-sm text-slate-600 dark:text-gray-400'>
                  24/7 Available
                </p>
              </div>
            </div>

            {/* Description */}
            <div className='space-y-5'>
              <p className='text-slate-700 dark:text-gray-300 leading-8 text-lg'>
                I started my programming journey with curiosity about how websites work, and over time I grew into a passionate <span className='font-semibold text-cyan-600 dark:text-cyan-400'>Full-Stack Developer</span>.
              </p>

              <p className='text-slate-700 dark:text-gray-300 leading-8 text-lg'>
                I build modern, responsive, and scalable web applications using <span className='font-semibold text-cyan-600 dark:text-cyan-400'>React.js, Next.js, Node.js, Express.js, MongoDB, Tailwind CSS, HeroUI, and Better Auth</span>.
              </p>

              <p className='text-slate-700 dark:text-gray-300 leading-8 text-lg'>
                My focus is creating clean UI, secure authentication systems, strong backend architecture, and real-world user experiences that solve practical problems.
              </p>
            </div>

            {/* Resume Button */}
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
      </div>
    </section>
  );
}