'use client';
import React, { useState } from "react";
import { Button, Modal } from "@heroui/react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { ProjectModal } from "./ProjectModal";
import Image from "next/image";
const myProjects = [
    {
        id: 1,
        name: "IdeaVault - Startup Idea Sharing Platform",
        desc: "The ultimate secure full-stack collaborative platform where tech creators share, explore, and collectively validate innovative early-stage startup concepts, featured with user pitching trends and analytics.",
        tech: ["JavaScript", "React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "Better-Auth", "HeroUI"],
        img: "https://i.ibb.co.com/9kKNWHZS/image.png",
        itemimg: "https://i.ibb.co.com/FR0bhzB/image.png",
        live: "https://ideavault-gold-chi.vercel.app",
        github: "https://github.com/HeyAlomgir/IdeaVault",
        challenges: "Securing dynamic user interactions and private pitch payloads concurrently using complex Better-Auth session token parsing configurations over independent Express API routes.",
        plans: "Introduce AI-powered automated startup summary generators and launch private real-time bookmarking vaults with fine-grained access tokens."
    },
    {
        id: 2,
        name: "Tiles Gallery - Premium Collection Shop",
        desc: "An elegant, production-ready web application showcasing premium handcrafted marble and ceramic tile inventories. Features dynamic product pages, dimension metrics filtering, and responsive product cards with full grid stability.",
        tech: ["JavaScript", "React.js", "Next.js (App Router)", "MongoDB", "Better-Auth", "HeroUI"],
        img: "https://i.ibb.co.com/Ps7FSshz/image.png",
        itemimg: "https://i.ibb.co.com/8DxgBc0S/image.png",
        live: "https://tiles-gallary-eight.vercel.app",
        github: "https://github.com/HeyAlomgir/Tiles-Gallary",
        challenges: "Configuring the strict database schema models for cross-relational tile sizes while maintaining fast Next.js Server Side Rendering (SSR) page compilation speeds.",
        plans: "Integrate an advanced automated user cart pipeline and attach a real-time invoice PDF generator using headless server functions."
    },
    {
        id: 3,
        name: "DigiTools Platform",
        desc: "A powerful single-page utility web platform tailored for digital tools management. Built using modern frontend architectures to ensure smooth asset listing, crisp styling, and immediate user interactions.",
        tech: ["JavaScript (ES6)", "React.js", "Tailwind CSS", "DaisyUI", "React Toastify"],
        img: "https://i.ibb.co.com/Jj14vNRz/image.png",
        itemimg: "https://i.ibb.co.com/bjYSp1L2/image.png", 
        live: "https://digitools-platform-alomgir.netlify.app",
        github: "https://github.com/HeyAlomgir/B13-A6-Digitools-Platform",
        challenges: "Managing fluid state sync transitions during dynamic asset calculations and configuring proper toast notifications layout behaviors on smaller mobile screens.",
        plans: "Implement a centralized client-side global state store and introduce custom dark mode rendering support using pure Tailwind variants."
    },

];
export default function ProjectsPage() {

    return (
        <div id="projects" className="bg-white text-slate-800 min-h-screen py-16 px-6">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Header */}
                <div className="text-center space-y-1">
                    <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Projects</h1>
                    <p className="text-sm text-slate-400 font-medium">Recent Projects</p>
                </div>

                {/* project container */}
                <div className="space-y-8 pt-4">
                    {myProjects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-white border border-gray-200/80 rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row items-stretch p-5 gap-6 hover:shadow-md transition duration-300"
                        >
                            {/* left side  */}
                            <div className="w-full md:w-1/2 min-h-56 bg-slate-50 border border-gray-100 rounded-[2rem] overflow-hidden flex items-center justify-center relative p-1 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group/img cursor-pointer">
                                <Image
                                    src={project.img}
                                    alt={project.name}
                                    width={450}
                                    height={260}
                                    className="w-full h-full object-cover rounded-[1.2rem] transition-transform duration-500 ease-out group-hover/img:scale-105"
                                />
                            </div>


                            {/* right side*/}
                            <div className="flex-1 flex flex-col justify-between space-y-4">
                                <div className="space-y-2">
                                    <h3 className="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight leading-snug">
                                        {project.name}
                                    </h3>
                                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium">
                                        {project.desc}
                                    </p>
                                </div>

                                {/* tech */}
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {project.tech.map((t, idx) => (
                                        <span key={idx} className="text-[10px] md:text-xs font-bold tracking-wide bg-slate-800 text-white px-3 py-1.5 rounded-xl">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                {/* action btn */}
                                <div className="flex flex-wrap gap-3 pt-2">
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-slate-800 transition">
                                        <FaGithub /> GitHub
                                    </a>
                                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-blue-700 transition">
                                        <FaExternalLinkAlt /> Live Demo
                                    </a>

                                    <ProjectModal project={project} />

                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

