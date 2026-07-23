'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import Typewriter from 'typewriter-effect';
import toast from 'react-hot-toast';

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
      url: 'https://www.facebook.com/alomgir.hossain.938369',
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

  return (
    <section
      id='home'
      className='relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50 dark:from-[#020617] dark:via-[#0B1120] dark:to-[#111827] transition-colors duration-300'
    >
      {/* Background glow */}
      <div className='absolute inset-0'>
        <div className='absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl'></div>
        <div className='absolute bottom-20 right-20 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl'></div>
      </div>

      <div className='relative z-10 max-w-[1500px] mx-auto px-6 lg:px-10 pt-32 pb-20'>
        <div className='grid lg:grid-cols-2 gap-16 items-center'>

          {/* LEFT CONTENT - মোবাইলে দ্বিতীয়, ডেস্কটপে প্রথম (বাম) */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className='order-2 lg:order-1 space-y-7'
          >
            {/* Welcome badge */}
            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-semibold'>
              ✨ Welcome to my portfolio
            </div>

            {/* Heading */}
            <div className='space-y-4'>
              <h1 className='text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight text-slate-900 dark:text-white'>
                Hi, I’m
                <span className='block bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-400 bg-clip-text text-transparent'>
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

              {/* Tagline - এখন typewriter লাইনের ঠিক নিচে */}
              <p className='text-cyan-600 dark:text-cyan-400 font-semibold text-sm md:text-base'>
                🚀 Turning ideas into Stunning Websites 💻 | Available for projects and collaborations 🌟
              </p>
            </div>

            {/* Description */}
            <div className='space-y-4'>
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

            {/* Resume + Social */}
            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-5'>

              {/* Resume Button */}
              <motion.button
                onClick={handleDownload}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300'
              >
                Download Resume
              </motion.button>

              {/* Social Buttons */}
              <div className='flex items-center gap-3'>
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className='w-12 h-12 rounded-2xl flex items-center justify-center bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all duration-300 shadow-lg'
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT AVATAR DESIGN - মোবাইলে প্রথম, ডেস্কটপে দ্বিতীয় (ডান) */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9 }}
            className='order-1 lg:order-2 flex justify-center lg:justify-end'
          >
            <div className='relative w-[360px] sm:w-[420px] lg:w-[540px] h-[460px] lg:h-[620px]'>

              {/* Abstract Blob Background */}
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='w-[320px] h-[320px] lg:w-[440px] lg:h-[440px] bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-[40%_60%_55%_45%/45%_35%_65%_55%] blur-[2px] opacity-95'></div>
              </div>

              {/* Dark accent shape */}
              <div className='absolute top-28 left-6 w-40 h-40 bg-[#0F172A] rounded-[60%_40%_30%_70%] opacity-80'></div>

              {/* Dot pattern */}
              <div className='absolute top-12 right-8 grid grid-cols-6 gap-2 opacity-30'>
                {Array.from({ length: 30 }).map((_, i) => (
                  <div key={i} className='w-1.5 h-1.5 rounded-full bg-white'></div>
                ))}
              </div>

              {/* IMAGE - larger, smoother blob mask + gradient ring border, blends well in both modes */}
              <div className='absolute inset-0 flex items-center justify-center'>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                  className='relative w-[320px] h-[420px] sm:w-[360px] sm:h-[470px] lg:w-[400px] lg:h-[520px]'
                >
                  {/* Soft glow behind the photo - adapts to light/dark automatically via opacity/blend */}
                  <div className='absolute -inset-4 rounded-[42%_58%_55%_45%/48%_42%_58%_52%] bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-purple-500/30 blur-2xl' />

                  {/* Gradient ring border wrapper */}
                  <div
                    className='relative w-full h-full p-[3px] bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 shadow-2xl'
                    style={{ borderRadius: '42% 58% 55% 45% / 48% 42% 58% 52%' }}
                  >
                    {/* Photo itself, clipped to a soft blob shape so edges blend into the design instead of a hard rectangle */}
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
                      {/* subtle bottom fade so the photo base blends smoothly with the card overlaps below */}
                      <div className='absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/50 dark:from-[#0B1120]/70 to-transparent' />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Projects Card */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 4, repeat: Infinity }}
                className='absolute left-0 top-32 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-2xl border border-white/10'
              >
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold'>
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
                className='absolute right-0 bottom-28 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-xl rounded-2xl px-5 py-4 shadow-2xl border border-white/10'
              >
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white'>
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

              {/* Available Card */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className='absolute right-10 top-12 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-2xl border border-white/10'
              >
                <div className='flex items-center gap-2'>
                  <div className='w-3 h-3 rounded-full bg-green-500 animate-pulse'></div>
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
            </div>
          </motion.div>
        </div>

        {/* Recruiter-attracting touch: animated scroll cue, invites the visitor further down the page */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className='hidden sm:flex flex-col items-center gap-2 mt-16 mx-auto w-fit text-slate-400 dark:text-gray-500'
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