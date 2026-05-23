"use client"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiBadgeCheck } from "react-icons/bi";


const Skills = () => {

  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const skillsData = async () => {
      try {
        const res = await fetch("/skills.json");
        const data = await res.json();
        setSkills(data)
        // console.log(data);
      } catch (error) {
        toast.error("Error fetching data:", error);

      }
    };

    skillsData();
  }, []);
  return (
    <div id="skills">
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Skills</h1>
        <p className="text-sm text-slate-400 font-medium">My Technical Level</p>
      </div>

      <div className="grid md:grid-cols-2 gap-18 my-15  ">

        {/* Fontend */}

        <div className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm flex flex-col items-center hover:bg-slate-50 transition duration-200">

          <h3 className="text-xl font-bold text-slate-700 mb-8 text-center">Frontend Developer</h3>


          <div className="grid grid-cols-2 gap-x-12 gap-y-6 w-full max-w-sm">

            {skills?.frontend?.map((skill, index) => (
              <div key={index} className="flex items-start gap-2.5 group">
                <BiBadgeCheck className="text-cyan-500 w-5 h-5 mt-0.5 group-hover:scale-110 transition duration-150" />

                <div >
                  <h4 className="font-extrabold text-slate-800 text-sm md:text-base tracking-wide leading-none">{skill.name}</h4>
                  <span className="text-[11px] font-bold text-slate-400 block mt-1">{skill.level}</span>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Backend */}

        <div className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm flex flex-col items-center hover:bg-slate-50 transition duration-200">

          <h3 className="text-xl font-bold text-slate-700 mb-8 text-center">Backend Developer</h3>


          <div className="grid grid-cols-2 gap-x-12 gap-y-6 w-full max-w-sm  ">

            {skills?.backend?.map((skill, index) => (
              <div key={index} className="flex items-start gap-2.5 group ">
                <BiBadgeCheck className="text-cyan-500 w-5 h-5 mt-0.5 group-hover:scale-110 transition duration-150" />

                <div >
                  <h4 className="font-extrabold text-slate-800 text-sm md:text-base tracking-wide leading-none">{skill.name}</h4>
                  <span className="text-[11px] font-bold text-slate-400 block mt-1">{skill.level}</span>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>


    </div>
  );
};

export default Skills;