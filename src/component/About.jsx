import { Card } from "@heroui/react";
import Image from "next/image";
import { FaAward, FaFolderOpen, FaHeadset } from "react-icons/fa";


export default function About() {
  return (
    <div id="about"
      className="max-w-7xl mx-auto px-6 py-24"
    >



      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold">
          About Me
        </h2>

        <p className="text-gray-400 mt-2">
          My Introduction
        </p>
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-2 gap-16 items-center">

       
        <div className="flex-1 flex justify-center items-center">
          {/* ১. বাইরের মূল ফ্রেম যা ছবির ব্যাকগ্রাউন্ডে গ্লোয়িং বর্ডার তৈরি করবে */}
          <div className="group relative md:w-8/12 lg:w-full lg:h-full  rounded-2xl p-1 bg-gradient-to-tr from-cyan-400 to-blue-500 shadow-xl shadow-cyan-500/20 flex items-center justify-center transition-all duration-500 hover:scale-[1.02] hover:rotate-1">

            {/* ২. ভেতরের সাদা বর্ডার ফ্রেম */}
            <div className="w-full h-full rounded-2xl overflow-hidden border-[4px] border-white bg-slate-50 flex items-center justify-center">
              <Image
                className="w-full h-full object-cover  animate-pulse 
                shadow-[0_0_15px_rgba(34,211,238,0.5)] 
                hover:shadow-[0_0_25px_rgba(34,211,238,0.8)]transition-all duration-500 group-hover:scale-110"
                src={"https://i.ibb.co.com/Z67td2TS/Alomgir-2.pngco.com"}
                alt="About Image"
                width={420}
                height={420}
              />
            </div>

          </div>
        </div>

        {/* Right Side */}
        <div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-4">

            {/* Card 1 */}
            <Card className="border border-white/10  hover:border-blue-500  animate-pulse 
                shadow-[0_0_15px_rgba(34,211,238,0.5)] 
                hover:shadow-[0_0_25px_rgba(34,211,238,0.8)]">
              <div className="p-2 text-center  transition">

                <FaAward className="mx-auto text-2xl text-blue-500 mb-3" />

                <h3 className="font-semibold text-lg">
                  Experience
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  1+ Years Learning
                </p>
              </div>
            </Card>

            {/* Card 2 */}
            <Card className="border border-white/10   hover:border-blue-500  animate-pulse 
                shadow-[0_0_15px_rgba(34,211,238,0.5)] 
                hover:shadow-[0_0_25px_rgba(34,211,238,0.8)]">
              <div className="p-2 text-center hover:border-blue-500 transition">

                <FaFolderOpen className="mx-auto text-2xl text-blue-500 mb-3" />

                <h3 className="font-semibold text-lg">
                  Projects
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  30+ Completed
                </p>
              </div>
            </Card>

            {/* Card 3 */}
            <Card className="border border-white/10  hover:border-blue-500  animate-pulse 
                shadow-[0_0_15px_rgba(34,211,238,0.5)] 
                hover:shadow-[0_0_25px_rgba(34,211,238,0.8)]">
              <div className="p-2 text-center hover:border-blue-500 transition">

                <FaHeadset className="mx-auto text-2xl text-blue-500 mb-3" />

                <h3 className="font-semibold text-lg">
                  Support
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  Online 24/12
                </p>
              </div>
            </Card>

          </div>

          {/* Description */}
          <p className="text-[#828282] leading-8 mt-10">
            Passionate Full Stack Web Developer with
            experience in building responsive and modern
            web applications using React.js, Next.js,
            Node.js, Express.js, and MongoDB.

            <br />
            <br />

            I enjoy creating clean UI, solving real-world
            problems, and continuously learning modern
            web technologies.
          </p>

          {/* Button */}
          <button className="mt-10 px-7 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:scale-105 transition">
            Download Resume
          </button>

        </div>
      </div>

       {/* Tecnoloyies */}



    </div>
  );
}
