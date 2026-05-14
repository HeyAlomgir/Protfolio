'use client';
import { Button } from "@heroui/react";
import Image from "next/image";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import Typewriter from 'typewriter-effect';


const Hero = () => {
  const socialLinks = [
    { name: "GitHub", url: "https://github.com/HeyAlomgir", icon: <FaGithub /> },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/alomgir-hossain-web/", icon: <FaLinkedin /> },
    { name: "Facebook", url: "https://www.facebook.com/alomgir.hossain.938369", icon: <FaFacebook /> }
  ];

  return (

    <div id="home" className="w-full flex items-center justify-center px-6 py-6">


      <div className="max-w-7xl w-full mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-12 mt-50">

        {/* left side */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <div className="space-y-1">
            <span className="text-cyan-600 text-xs font-extrabold uppercase tracking-widest bg-cyan-50 px-3 py-1.5 rounded-full inline-block">
              Welcome to my portfolio
            </span>

            <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight leading-none">
              Hi, I am <br className="hidden md:block" /> Alomgir Hossain
            </h1>

            <div className="text-cyan-500 font-extrabold text-xl md:text-2xl tracking-wide pt-1 flex items-center justify-center md:justify-start gap-1.5">
              <span>I am a</span>
              <span className="text-cyan-500 font-extrabold">
                <Typewriter
                  options={{
                    strings: [
                      '<span style="color: #1d4ed8;">Full Stack Developer</span>',
                      '<span style="color: #3b82f6;">Frontend Developer</span>',
                      '<span style="color: #10b981;">Backend Developer</span>',
                      '<span style="color: #f59e0b;">MERN Stack Developer</span>'
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 55,
                    deleteSpeed: 30,
                    pauseFor: 800,
                  }}
                />
              </span>
            </div>


          </div>

          <p className="text-slate-500 text-sm md:text-base max-w-md leading-relaxed font-medium">
            🚀 Turning ideas into Stunning Websites 💻
            | Available for projects and collaborations 🌟
          </p>
          <p className="text-slate-600 text-sm md:text-base max-w-md leading-relaxed font-medium">
            I build modern, high-performance, and responsive web applications using Next.js, React, Node.js, and MongoDB.
          </p>

          {/* Resume */}

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-2">
            <Button
              href="#"
              onClick={(e) => { e.preventDefault(); alert('Resume download system is processing!'); }}
              className="w-full sm:w-auto text-center bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-md shadow-cyan-500/10 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              Download Resume
            </Button>
            <div className="flex gap-2 justify-center">
              {socialLinks.map((social, i) => (
                <a key={i}
                  href={social.url}
                  title={`Connect on ${social.name}`}
                  className={`w-10 h-10 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md ${social.hoverClass}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>

          </div>

        </div>

        <div className="flex-1 flex justify-center items-center">

          <div className="w-48 h-48 md:w-94 md:h-94 rounded-full p-1 bg-gradient-to-tr from-cyan-400 to-blue-500 shadow-xl shadow-cyan-500/5 flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white bg-slate-50 flex items-center justify-center">
              <Image
                // src={"https://i.ibb.co.com/FbB133xZ/ghh-optimized-200-removebg-preview.png"}
                src={"https://i.ibb.co.com/Z67td2TS/Alomgir-2.png"}
                alt="Alomgir Hossain Logo"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
