'use client';
import React, { useState } from "react";
import Image from "next/image";

const Navbars = () => {
    // Mobile drawer panel display controller switch toggle state
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Layout navigation compliance active routes tracking configuration array 
    const menuItems = [
        { name: "Home", path: "#home" },
        { name: "About", path: "#about" },
        { name: "Skills", path: "#skills" },
        { name: "Services", path: "#services" },
        { name: "Education", path: "#education" },
        { name: "Projects", path: "#projects" },
        { name: "Contact", path: "/contact" }
    ];
    return (
        <div>
            <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4 ">
                <div className="max-w-7xl mx-auto flex justify-between items-center">

                    {/* Brand Identification */}
                    <div className="flex items-center gap-3">

                        <Image src={"https://i.ibb.co.com/7NZGxkQp/logo.png"}
                            width={38}
                            height={38}
                            alt="Logo"
                            className="rounded-full ring-2 ring-cyan-500/20" priority />
                        <span className="font-extrabold text-slate-800 tracking-wider text-base">ALOMGIR</span>
                    </div>

                    {/* 💻 Desktop View Navigation Links - Dynamic map item with proper target paths */}
                    <div className="hidden md:flex items-center space-x-8">
                        {menuItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.path} 
                                className="text-slate-600 hover:text-cyan-500 text-sm font-semibold tracking-wide transition duration-150"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* Action Button */}
                    <div className="hidden md:flex items-center">
                        <a href="#" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md">
                            Resume
                        </a>
                    </div>

                    {/* Mobile View Interactive Hamburger Switch */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} type="button" className="text-slate-700 hover:text-cyan-500">
                            {isMenuOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* 📱 Mobile Drawer Link Elements */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 bg-white/95 border-t border-slate-100 pt-3 pb-4 space-y-2">
                        {menuItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.path} // 💡 Multi link selector trigger
                                onClick={() => setIsMenuOpen(false)}
                                className="block text-slate-700 hover:text-cyan-500 hover:bg-slate-50 px-4 py-2.5 text-base font-medium rounded-lg transition"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbars;