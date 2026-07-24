"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaLaptopCode, FaNetworkWired, FaServer } from "react-icons/fa";
import { Modals } from "./Modals";

// ── Icon + gradient/glow map, one per service "icon" key ─────────────────────
const SERVICE_META = {
    frontend: {
        icon: <FaLaptopCode />,
        gradient: "from-cyan-400 to-blue-500",
        glow: "rgba(34,211,238,0.5)",
    },
    backend: {
        icon: <FaServer />,
        gradient: "from-green-500 to-emerald-700",
        glow: "rgba(16,185,129,0.5)",
    },
    fullstack: {
        icon: <FaNetworkWired />,
        gradient: "from-purple-500 to-indigo-600",
        glow: "rgba(139,92,246,0.5)",
    },
    mern: {
        icon: <FaNetworkWired />,
        gradient: "from-orange-400 to-amber-600",
        glow: "rgba(249,115,22,0.5)",
    },
};

// ── Single service card, same hover treatment as the Skills cards ───────────
function ServiceCard({ service, index }) {
    const [hovered, setHovered] = useState(false);
    const meta = SERVICE_META[service.icon] ?? {
        icon: <span className="text-cyan-500 font-black text-2xl">{service.title[0]}</span>,
        gradient: "from-cyan-500 to-blue-600",
        glow: "rgba(34,211,238,0.5)",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ y: -8, scale: 1.03, transition: { type: "spring", stiffness: 280, damping: 18 } }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="relative group overflow-hidden rounded-3xl p-8 cursor-pointer flex flex-col
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
            <div
                className={`absolute inset-0 bg-gradient-to-br ${meta.gradient} opacity-0 group-hover:opacity-[0.07] dark:group-hover:opacity-[0.13] transition-opacity duration-500 pointer-events-none rounded-3xl`}
            />

            {/* Shimmer streak */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none" />

            {/* Icon */}
            <div
                className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-6
          bg-slate-100 dark:bg-slate-800/70
          border border-slate-200 dark:border-slate-700/40
          text-cyan-600 dark:text-cyan-400
          group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg
          transition-all duration-300"
            >
                {meta.icon}
            </div>

            {/* Title */}
            <h3 className="relative z-10 text-xl font-bold text-slate-900 dark:text-white mb-3
        group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-200">
                {service.title}
            </h3>

            {/* Description */}
            <p className="relative z-10 text-sm text-slate-500 dark:text-gray-400 leading-relaxed mb-6 flex-1">
                {service.description}
            </p>

            <div className="relative z-10">
                <Modals service={service} />
            </div>
        </motion.div>
    );
}

const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const servicesData = async () => {
            try {
                const res = await fetch("/services.json");
                const data = await res.json();
                setServices(data);
            } catch (error) {
                toast.error("Error fetching services data");
            }
        };
        servicesData();
    }, []);

    return (
        <section
            id="services"
            className="w-full py-24 bg-white dark:bg-[#0B1120] transition-colors duration-300"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-10">

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-semibold mb-5">
                        🛠️ What I Offer
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-3">
                        My <span className="text-cyan-600 dark:text-cyan-400">Services</span>
                    </h2>
                    <p className="text-slate-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        A few of the core services I can help you with, from idea to production.
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;