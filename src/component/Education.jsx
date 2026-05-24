'use client';
const educationData = [
  {
    id: 1,
    status: "Ongoing",
    degree: "Diploma in Engineering - Computer Science & Technology (CST)",
    institution: "Mymensingh Polytechnic Institute",
    duration: "2023 - Present",
    desc: "Currently pursuing a Diploma in Engineering under the CST department. Gaining foundational concepts and basic knowledge in programming disciplines including Python, Java, Operating Systems (OS), Data Communication, and IT Support. Concurrently, actively mastering advanced foundations in Frontend and Backend architectures, specializing in MERN Stack and modern secure Full-Stack web development."
  },
  {
    id: 2,
    status: "Completed",
    degree: "Secondary School Certificate (SSC)",
    institution: "Konapara High School",
    duration: "Graduated: 2023",
    desc: "Successfully completed secondary school education from the vocational stream, focusing on foundational academic studies and technical principles."
  }
];

export default function Education() {
    return (
        <div id="education" className=" py-16 px-6 my-30 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-blue-500 hover:-translate-y-2 transt duration-300 shadow-xl">
            <div className="max-w-4xl mx-auto space-y-12 ">

                {/* header */}
                <div className="text-center md:text-left space-y-1">
                    <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Education</h2>
                    <p className="text-sm text-slate-400 font-medium tracking-wide">My Academic Journey</p>
                </div>

                {/*border l */}
                <div className="relative border-l-5 border-slate-200 pl-6 space-y-12 ml-4">
                    {educationData.map((edu) => (
                        <div key={edu.id} className="relative group">


                            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-white bg-cyan-500 shadow-sm group-hover:scale-125 transition-all duration-300"></div>

                            {/* education contenet card */}
                            <div className="space-y-2">
                                <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border ${edu.status === "Ongoing"
                                        ? "bg-cyan-50 text-cyan-600 border-cyan-100"
                                        : "bg-blue-50 text-blue-600 border-blue-100"
                                    }`}>
                                    {edu.status}
                                </span>

                                <h3 className="text-lg md:text-xl font-extrabold text-slate-800 tracking-tight group-hover:text-cyan-500 transition-colors duration-200">
                                    {edu.degree}
                                </h3>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 font-bold gap-1">
                                    <span className="tracking-wide">{edu.institution}</span>
                                    <span className="text-slate-500">{edu.duration}</span>
                                </div>

                                <p className="text-slate-500 text-xs md:text-sm leading-relaxed pt-2 max-w-2xl font-medium tracking-wide">
                                    {edu.desc}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
