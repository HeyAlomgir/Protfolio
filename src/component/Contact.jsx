'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { IoIosSend } from 'react-icons/io';
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';

// ── EmailJS credentials ────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = 'service_a1yc62z';
const EMAILJS_TEMPLATE_ID = 'template_542z158';
const EMAILJS_PUBLIC_KEY = 'JiYVBICWaBA0dvbHd';

// ── Contact info data ──────────────────────────────────────────────────────
const contactCards = [
  {
    icon: FiMail,
    label: 'Email',
    value: 'alomgirhosssain71@gmail.com',
    href: 'mailto:alomgirhosssain71@gmail.com',
    gradient: 'from-cyan-400 to-blue-500',
    glow: 'rgba(34,211,238,0.5)',
    iconBg: 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
  },
  {
    icon: FiPhone,
    label: 'Phone / WhatsApp',
    value: '+880 1756-135199',
    href: 'tel:+8801756135199',
    gradient: 'from-green-400 to-emerald-600',
    glow: 'rgba(16,185,129,0.5)',
    iconBg: 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400',
  },
  {
    icon: FiMapPin,
    label: 'Location',
    value: 'Mymensingh, Bangladesh',
    href: null,
    gradient: 'from-purple-400 to-indigo-600',
    glow: 'rgba(139,92,246,0.5)',
    iconBg: 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400',
  },
];

const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/HeyAlomgir', label: 'GitHub', color: 'hover:bg-slate-700 hover:text-white' },
  { icon: FaLinkedin, href: 'https://linkedin.com/in/alomgir', label: 'LinkedIn', color: 'hover:bg-blue-600 hover:text-white' },
  { icon: FaFacebook, href: 'https://facebook.com/alomgir', label: 'Facebook', color: 'hover:bg-blue-500 hover:text-white' },
];

// ── Contact info card — Services.jsx-এর মতো hover ─────────────────────────
function ContactCard({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, scale: 1.03, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className='relative group overflow-hidden rounded-3xl p-6 cursor-default bg-white dark:bg-[#0d1526] border border-slate-200/80 dark:border-slate-700/40 hover:border-cyan-400/60 dark:hover:border-cyan-400/50 transition-colors duration-300'
      style={{
        boxShadow: hovered
          ? `0 20px 40px ${item.glow}, 0 0 0 1px rgba(34,211,238,0.2)`
          : '0 2px 8px rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {/* Gradient bg on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-[0.07] dark:group-hover:opacity-[0.13] transition-opacity duration-500 pointer-events-none rounded-3xl`} />

      {/* Shimmer streak */}
      <div className='absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none' />

      <div className='relative z-10 flex items-center gap-4'>
        {/* Icon */}
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 border border-slate-200 dark:border-slate-700/40 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg transition-all duration-300 ${item.iconBg}`}>
          <Icon size={22} />
        </div>

        {/* Text */}
        <div>
          <p className='text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-gray-500 mb-1'>{item.label}</p>
          {item.href ? (
            <a href={item.href} className='text-sm font-bold text-slate-800 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400'>
              {item.value}
            </a>
          ) : (
            <p className='text-sm font-bold text-slate-800 dark:text-white'>{item.value}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Contact section ──────────────────────────────────────────────────
export default function Contact() {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { username, useremail, usermessage } = Object.fromEntries(formData.entries());

    if (!username.trim() || !useremail.trim() || !usermessage.trim()) {
      toast.error('Please fill in all fields.', {
        style: { background: '#0d1526', color: '#fff', border: '1px solid rgba(239,68,68,0.4)' },
      });
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Sending message...', {
      style: { background: '#0d1526', color: '#fff', border: '1px solid rgba(34,211,238,0.3)' },
    });

    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY);
      toast.success("Message sent! I'll reply soon 🚀", {
        id: toastId,
        duration: 4000,
        style: { background: '#0d1526', color: '#fff', border: '1px solid rgba(34,211,238,0.4)' },
      });
      e.target.reset();
    } catch {
      toast.error('Failed to send. Please try again.', {
        id: toastId,
        style: { background: '#0d1526', color: '#fff', border: '1px solid rgba(239,68,68,0.4)' },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id='contact'
      className='w-full py-24 bg-slate-50 dark:bg-[#080f1e] transition-colors duration-300'
    >
      <Toaster position='top-right' />

      <div className='max-w-[1500px] mx-auto px-6 lg:px-10'>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-semibold mb-5'>
            📬 Get In Touch
          </div>
          <h2 className='text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-3'>
            Contact <span className='text-cyan-600 dark:text-cyan-400'>Me</span>
          </h2>
          <p className='text-slate-600 dark:text-gray-400 text-lg max-w-2xl mx-auto'>
            Have a project in mind or want to collaborate? Send me a message — I'll get back to you soon.
          </p>
        </motion.div>

        <div className='grid lg:grid-cols-5 gap-10 items-start'>

          {/* LEFT — Info */}
          <div className='lg:col-span-2 space-y-5'>

            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className='text-xl font-black text-slate-900 dark:text-white mb-2'
            >
              Talk to me
            </motion.h3>

            {/* Contact cards */}
            {contactCards.map((item, i) => (
              <ContactCard key={item.label} item={item} index={i} />
            ))}

            {/* Social links */}
            <div className='flex items-center gap-3 pt-2'>
              {socialLinks.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={s.label}
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.4 + i * 0.09 }}
                    whileHover={{ scale: 1.15, y: -4 }}
                    whileTap={{ scale: 0.93 }}
                    className={`w-11 h-11 rounded-xl flex items-center justify-center text-slate-500 dark:text-gray-400 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 transition-all duration-200 ${s.color}`}
                  >
                    <Icon size={17} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* RIGHT — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className='lg:col-span-3'
          >
            <div className='relative group overflow-hidden rounded-3xl p-8 bg-white dark:bg-[#0d1526] border border-slate-200/80 dark:border-slate-700/40 hover:border-cyan-400/40 dark:hover:border-cyan-400/30 transition-colors duration-300 shadow-sm hover:shadow-xl hover:shadow-cyan-500/10'>

              {/* Shimmer on form card */}
              <div className='absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none' />

              <h3 className='text-xl font-black text-slate-900 dark:text-white mb-6'>Write me your message</h3>

              <form ref={formRef} onSubmit={handleSubmit} className='space-y-4'>

                {/* Name */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                >
                  <input
                    type='text'
                    name='username'
                    required
                    placeholder='Your name'
                    className='w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm font-medium focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200'
                  />
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.15 }}
                >
                  <input
                    type='email'
                    name='useremail'
                    required
                    placeholder='your@email.com'
                    className='w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm font-medium focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200'
                  />
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.2 }}
                >
                  <textarea
                    name='usermessage'
                    required
                    rows={5}
                    placeholder='Write your message here...'
                    className='w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm font-medium focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 resize-none'
                  />
                </motion.div>

                {/* Submit button */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.25 }}
                >
                  <motion.button
                    type='submit'
                    disabled={loading}
                    whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
                    whileTap={!loading ? { scale: 0.98 } : {}}
                    className='w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300'
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full'
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <IoIosSend className='text-lg' />
                      </>
                    )}
                  </motion.button>
                </motion.div>

              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}