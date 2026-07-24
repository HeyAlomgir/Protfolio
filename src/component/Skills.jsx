"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaReact, FaNodeJs, FaGitAlt, FaGithub, FaHtml5, FaCss3Alt, FaFigma,
} from "react-icons/fa";
import {
  SiJavascript, SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb,
  SiExpress, SiRender, SiVercel, SiNetlify, SiDaisyui, SiPenpot,
} from "react-icons/si";

// ── Static icon + style map (keyed by skill name) ────────────────────────────
const SKILL_META = {
  "Next.js": { icon: <SiNextdotjs className="text-slate-900 dark:text-white" />, gradient: "from-slate-600 to-slate-900", glow: "rgba(100,116,139,0.55)" },
  "React.js": { icon: <FaReact className="text-[#61DAFB]" />, gradient: "from-cyan-400 to-blue-500", glow: "rgba(34,211,238,0.55)" },
  "JavaScript": { icon: <SiJavascript className="text-[#F7DF1E]" />, gradient: "from-yellow-400 to-amber-500", glow: "rgba(247,223,30,0.55)" },
  "TypeScript": { icon: <SiTypescript className="text-[#3178C6]" />, gradient: "from-blue-500 to-indigo-600", glow: "rgba(49,120,198,0.55)" },
  "Tailwind CSS": { icon: <SiTailwindcss className="text-[#06B6D4]" />, gradient: "from-cyan-400 to-teal-500", glow: "rgba(6,182,212,0.55)" },
  "HeroUI": { icon: <span className="text-[#8B5CF6] font-black text-2xl leading-none">H</span>, gradient: "from-purple-500 to-indigo-600", glow: "rgba(139,92,246,0.55)" },
  "DaisyUI": { icon: <SiDaisyui className="text-[#5A0EF8]" />, gradient: "from-violet-500 to-purple-600", glow: "rgba(90,14,248,0.55)" },
  "HTML5": { icon: <FaHtml5 className="text-[#E34F26]" />, gradient: "from-orange-500 to-red-600", glow: "rgba(228,77,38,0.55)" },
  "CSS3": { icon: <FaCss3Alt className="text-[#1572B6]" />, gradient: "from-blue-400 to-cyan-500", glow: "rgba(21,114,182,0.55)" },
  "Node.js": { icon: <FaNodeJs className="text-[#339933]" />, gradient: "from-green-500 to-emerald-700", glow: "rgba(51,153,51,0.55)" },
  "Express.js": { icon: <SiExpress className="text-slate-700 dark:text-slate-100" />, gradient: "from-slate-500 to-slate-800", glow: "rgba(100,116,139,0.45)" },
  "MongoDB": { icon: <SiMongodb className="text-[#13AA52]" />, gradient: "from-emerald-500 to-green-600", glow: "rgba(19,170,82,0.55)" },
  "Better Auth": { icon: <span className="text-[#F97316] font-black text-2xl leading-none">B</span>, gradient: "from-orange-400 to-amber-600", glow: "rgba(249,115,22,0.55)" },
  "Git": { icon: <FaGitAlt className="text-[#F05032]" />, gradient: "from-red-500 to-orange-500", glow: "rgba(240,80,50,0.55)" },
  "GitHub": { icon: <FaGithub className="text-slate-900 dark:text-white" />, gradient: "from-slate-600 to-slate-900", glow: "rgba(100,116,139,0.45)" },
  "Figma": { icon: <FaFigma className="text-[#F24E1E]" />, gradient: "from-pink-500 to-rose-600", glow: "rgba(242,78,30,0.55)" },
  "Penpot": { icon: <SiPenpot className="text-[#FF3D00]" />, gradient: "from-orange-500 to-red-500", glow: "rgba(255,61,0,0.55)" },
  "Vercel": { icon: <SiVercel className="text-slate-900 dark:text-white" />, gradient: "from-slate-700 to-black", glow: "rgba(100,116,139,0.45)" },
  "Netlify": { icon: <SiNetlify className="text-[#00C7B7]" />, gradient: "from-cyan-400 to-teal-600", glow: "rgba(0,199,183,0.55)" },
  "Render": { icon: <SiRender className="text-[#46E3B7]" />, gradient: "from-teal-400 to-emerald-500", glow: "rgba(70,227,183,0.55)" },
};

// Fallback if public/skills.json is missing
const FALLBACK = {
  all: [
    { name: "Next.js", level: 90 },
    { name: "React.js", level: 90 },
    { name: "Node.js", level: 80 },
    { name: "Express.js", level: 78 },
    { name: "MongoDB", level: 82 },
    { name: "Better Auth", level: 78 },
    { name: "JavaScript", level: 88 },
    { name: "TypeScript", level: 35 },
    { name: "Tailwind CSS", level: 92 },
    { name: "HeroUI", level: 85 },
    { name: "DaisyUI", level: 82 },
    { name: "HTML5", level: 96 },
    { name: "CSS3", level: 94 },
    { name: "Git", level: 88 },
    { name: "GitHub", level: 88 },
    { name: "Figma", level: 75 },
    { name: "Penpot", level: 65 },
    { name: "Vercel", level: 90 },
    { name: "Netlify", level: 85 },
    { name: "Render", level: 82 },
  ],
  frontend: [
    { name: "Next.js", level: 90 },
    { name: "React.js", level: 90 },
    { name: "JavaScript", level: 88 },
    { name: "TypeScript", level: 35 },
    { name: "Tailwind CSS", level: 92 },
    { name: "HeroUI", level: 85 },
    { name: "DaisyUI", level: 82 },
    { name: "HTML5", level: 96 },
    { name: "CSS3", level: 94 },
  ],
  backend: [
    { name: "Node.js", level: 80 },
    { name: "Express.js", level: 78 },
    { name: "MongoDB", level: 82 },
    { name: "Better Auth", level: 78 },
  ],
  tools: [
    { name: "Git", level: 88 },
    { name: "GitHub", level: 88 },
    { name: "Figma", level: 75 },
    { name: "Penpot", level: 65 },
    { name: "Vercel", level: 90 },
    { name: "Netlify", level: 85 },
    { name: "Render", level: 82 },
  ],
};

const CATEGORIES = [
  { id: "all", label: "All Skills", emoji: "⚡" },
  { id: "frontend", label: "Frontend", emoji: "🎨" },
  { id: "backend", label: "Backend", emoji: "🔧" },
  { id: "tools", label: "Design & Deploy", emoji: "🛠️" },
];

// ── Single skill card ─────────────────────────────────────────────────────────
function SkillCard({ name, level, index }) {
  const [hovered, setHovered] = useState(false);
  const meta = SKILL_META[name] ?? {
    icon: <span className="text-cyan-500 font-black text-2xl">{name[0]}</span>,
    gradient: "from-cyan-500 to-blue-600",
    glow: "rgba(34,211,238,0.5)",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, scale: 1.04, transition: { type: "spring", stiffness: 280, damping: 18 } }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative group overflow-hidden rounded-2xl p-5 cursor-pointer
        bg-white dark:bg-[#0d1526]
        border border-slate-200/80 dark:border-slate-700/40
        hover:border-cyan-400/60 dark:hover:border-cyan-400/50
        transition-colors duration-300"
      style={{
        boxShadow: hovered
          ? `0 20px 40px ${meta.glow}, 0 0 0 1px rgba(34,211,238,0.2)`
          : "0 2px 8px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Gradient bg on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${meta.gradient} opacity-0 group-hover:opacity-[0.07] dark:group-hover:opacity-[0.13] transition-opacity duration-500 pointer-events-none rounded-2xl`} />

      {/* Shimmer streak */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none" />

      {/* Icon + % badge */}
      <div className="relative z-10 flex items-start justify-between mb-4">
        <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl
          bg-slate-100 dark:bg-slate-800/70
          border border-slate-200 dark:border-slate-700/40
          group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg
          transition-all duration-300">
          {meta.icon}
        </div>

        <motion.div
          animate={hovered ? { scale: 1.12 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`px-2.5 py-1 rounded-full text-xs font-black tracking-wide bg-gradient-to-r ${meta.gradient} text-white shadow-md`}
        >
          {level}%
        </motion.div>
      </div>

      {/* Name */}
      <h3 className="relative z-10 font-bold text-sm text-slate-800 dark:text-white mb-3
        group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-200">
        {name}
      </h3>

      {/* Progress bar */}
      <div className="relative z-10 w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: "easeOut", delay: index * 0.03 }}
          className={`h-full rounded-full bg-gradient-to-r ${meta.gradient} relative`}
        >
          <span className="absolute right-0 top-0 bottom-0 w-3 bg-white/70 dark:bg-white/40 rounded-full blur-[2px] animate-pulse" />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Skills() {
  const [data, setData] = useState(FALLBACK);
  const [activeCategory, setActive] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/skills.json")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((json) => setData(json))
      .catch(() => setData(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  // Tag each category for tab filtering
  const frontendSkills = (data.frontend ?? []).map((s) => ({ ...s, cat: "frontend" }));
  const backendSkills = (data.backend ?? []).map((s) => ({ ...s, cat: "backend" }));
  const toolsSkills = (data.tools ?? []).map((s) => ({ ...s, cat: "tools" }));

  // "all" tab uses the pre-ordered "all" array from skills.json
  const displayed =
    activeCategory === "all" ? (data.all ?? []) :
      activeCategory === "frontend" ? frontendSkills :
        activeCategory === "backend" ? backendSkills :
          toolsSkills;

  return (
    <section
      id="skills"
      className="w-full py-24 bg-slate-50 dark:bg-[#080f1e] transition-colors duration-300"
    >
      <div className="max-w-[1500px] mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-semibold mb-5">
            ⚡ Technical Expertise
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-3">
            My <span className="text-cyan-600 dark:text-cyan-400">Skills</span>
          </h2>
          <p className="text-slate-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Technologies I use to craft modern, scalable web experiences — sorted by proficiency.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${activeCategory === cat.id
                  ? "text-white shadow-lg shadow-cyan-500/25"
                  : "text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10"
                }`}
            >
              {activeCategory === cat.id && (
                <motion.span
                  layoutId="activeSkillCat"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                  transition={{ type: "spring", duration: 0.45 }}
                />
              )}
              <span className="relative z-10">{cat.emoji} {cat.label}</span>
            </button>
          ))}
        </div>

        {/* Skill grid */}
        {loading ? (
          /* Skeleton loader while fetching */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-36 rounded-2xl bg-slate-200 dark:bg-slate-800/60 animate-pulse" />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
            >
              {displayed.map((skill, i) => (
                <SkillCard key={skill.name} name={skill.name} level={skill.level} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

      </div>
    </section>
  );
}