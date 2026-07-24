// import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";


// const Footer = () => {
//     const socialLinks = [
//         { name: "Twitter", url: "https://x.com", icon: <FaTwitter /> },
//         { name: "LinkedIn", url: "https://linkedin.com", icon: <FaLinkedinIn /> },
//         { name: "GitHub", url: "https://github.com", icon: <FaGithub /> }
//     ];
//     const quickLinks = [
//         { name: "Home", url: "#home" },
//         { name: "About", url: "#about" },
//         { name: "Skills", url: "#skills" },
//         { name: "Services", url: "#services" },
//         { name: "Projects", url: "#projects" },
//         { name: "Contact", url: "#contact" }
//     ];
//     return (
//         <div>
//             <footer className="w-full bg-[#f8f9fa] border-t border-gray-100 py-12 px-6">
//                 <div className="max-w-5xl mx-auto flex flex-col items-center justify-center space-y-6">
//                     <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs md:text-sm font-bold text-slate-500 tracking-wide">
//                         {quickLinks.map((link, idx) => (
//                             <a
//                                 key={idx}
//                                 href={link.url}
//                                 className="hover:text-cyan-500 transition-colors duration-200 cursor-pointer"
//                             >
//                                 {link.name}
//                             </a>
//                         ))}
//                     </div>
//                     <div className="flex items-center justify-center gap-4 pt-2">
//                         {socialLinks.map((social, i) => (
//                             <a
//                                 key={i}
//                                 href={social.url}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 title={`Connect on ${social.name}`}
//                                 className="w-9 h-9 flex items-center justify-center bg-white border border-gray-200 text-slate-700 hover:text-cyan-500 hover:border-cyan-400 rounded-full text-sm shadow-sm transition-all duration-200 hover:-translate-y-0.5"
//                             >
//                                 {social.icon}
//                             </a>
//                         ))}
//                     </div>
//                     <div className="text-center text-[11px] md:text-xs text-slate-400 tracking-wide font-medium pt-2">
//                         &copy; {new Date().getFullYear()} Copyright: <span className="font-bold text-slate-500">Alomgir Hossain</span>
//                     </div>

//                 </div>
//             </footer>
//         </div>
//     );
// };

// export default Footer;

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaGithub, FaLinkedin, FaFacebook, FaHeart, FaArrowUp } from "react-icons/fa";

const socialIcons = {
    github: <FaGithub />,
    linkedin: <FaLinkedin />,
    facebook: <FaFacebook />,
};

export default function Footer() {
    const [footer, setFooter] = useState(null);

    useEffect(() => {
        const loadFooter = async () => {
            try {
                const res = await fetch("/footer.json");
                if (!res.ok) throw new Error();
                const data = await res.json();
                setFooter(data);
            } catch {
                toast.error("Failed to load footer data.");
            }
        };
        loadFooter();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!footer) return null;

    return (
        <footer className="bg-[#0a0f1c] text-white relative overflow-hidden">
            {/* Gradient Top Border */}
            <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />

            <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 rounded-3xl p-12 text-center mb-20"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-4">
                        Let's Create Something
                        <span className="text-cyan-400"> Extraordinary</span>
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Available for freelance, collaborations, and exciting opportunities.
                    </p>
                    <a
                        href="#contact"
                        className="mt-8 inline-flex items-center gap-3 bg-white text-black font-semibold px-10 py-4 rounded-full hover:bg-cyan-400 hover:text-black transition-all duration-300 hover:scale-105"
                    >
                        Hire Me Now →
                    </a>
                </motion.div>

                <div className="grid md:grid-cols-12 gap-16">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-5"
                    >
                        <h2 className="text-4xl font-bold mb-3">{footer.brand.name}</h2>
                        <p className="text-cyan-400 text-xl font-medium mb-6">{footer.brand.title}</p>
                        <p className="text-slate-400 leading-relaxed max-w-md">
                            {footer.brand.description}
                        </p>

                        {/* Scroll to Top */}
                        <button
                            onClick={scrollToTop}
                            className="mt-10 flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                        >
                            <FaArrowUp /> Back to Top
                        </button>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-3"
                    >
                        <h3 className="text-lg font-semibold mb-6 text-slate-300">Quick Links</h3>
                        <div className="flex flex-col gap-4">
                            {footer.quickLinks.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.href}
                                    className="text-slate-400 hover:text-white transition-all hover:translate-x-2 w-fit"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-4"
                    >
                        <h3 className="text-lg font-semibold mb-6 text-slate-300">Connect With Me</h3>
                        <div className="flex gap-4">
                            {footer.socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-14 h-14 rounded-2xl bg-slate-800 hover:bg-cyan-500 flex items-center justify-center text-3xl transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                                >
                                    {socialIcons[social.icon]}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800 py-8">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
                    <p>{footer.copyright}</p>
                    <p className="flex items-center gap-2">
                        Built with <FaHeart className="text-red-500" /> using Next.js & Tailwind CSS
                    </p>
                </div>
            </div>
        </footer>
    );
}