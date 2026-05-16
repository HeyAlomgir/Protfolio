import { Card } from "@heroui/react";
import Marquee from "react-fast-marquee";
import { FaJsSquare, FaNode, FaReact } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiExpress, SiMongodb, SiNextdotjs } from "react-icons/si";
import { TbBrandGithubFilled } from "react-icons/tb";


const Technoloi = () => {
    const Technology = [
        { logo: <FaJsSquare className="text-[#F7DF1E]" /> },
        { logo: <FaReact className="text-[#61DAFB]" /> },
        { logo: <SiNextdotjs className="text-slate-900" /> },
        { logo: <RiTailwindCssFill className="text-[#06B6D4]" /> },
        { logo: <FaNode className="text-[#339933]" /> },
        { logo: <SiExpress className="text-slate-800" /> },
        { logo: <SiMongodb className="text-[#13AA52]" /> },
        { logo: <TbBrandGithubFilled className="text-slate-900" /> }
    ]
    return (
        <section className="space-y-8 py-10 max-w-7xl mx-auto px-4 overflow-hidden">
            {/* Tecnolgy title */}


            <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-800">Technologies</h2>
                <p className="text-xs text-slate-400 font-bold uppercase ">My Tech Stack</p>
            </div>


            {/* tecnolory */}

            <div className="w-2xs md:w-5xl lg:w-7xl">
                <Marquee pauseOnHover play gradient={false} speed={60} >
                    <div className="flex items-center gap-5">
                        {Technology.map((tech, ind) => <div key={ind} >
                            <Card className="
                w-28 h-28
                flex flex-col
                items-center
                justify-center
                rounded-2xl
                hover:-translate-y-2

                transition duration-300
                cursor-pointer
                mx-
                border-2 border-cyan-400
                animate-pulse 
                shadow-[0_0_15px_rgba(34,211,238,0.5)] 
                hover:shadow-[0_0_25px_rgba(34,211,238,0.8)]
              ">
                                <p className="text-7xl flex items-center justify-center w-full h-full p-2">{tech.logo}</p>

                            </Card>
                        </div>)}
                    </div>
                </Marquee>
            </div>

        </section>
    );
};

export default Technoloi;