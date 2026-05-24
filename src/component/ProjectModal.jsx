"use client";

import { Rocket } from "@gravity-ui/icons";
import { Button, Modal } from "@heroui/react";
import Image from "next/image";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";

export function ProjectModal({ project }) {
    console.log(project.name);

    return (
        <Modal>

            {/* Open Button */}
            <Button
                className="bg-transparent border border-cyan-500 hover:bg-cyan-50/40 text-cyan-600 font-extrabold text-xs px-4 h-9.5 rounded-xl transition duration-150"
            >
                View More / Details

                <IoIosArrowRoundForward
                    className="text-xl transform transition-transform duration-300 group-hover:translate-x-1.5"
                />
            </Button>

            {/* Modal */}
            <Modal.Backdrop>

                <Modal.Container>

                    <Modal.Dialog className="sm:max-w-64 md:max-w-xl rounded-3xl p-6">

                        {/* Close Button */}
                        <Modal.CloseTrigger />

                        {/* Header */}
                        <Modal.Header className="justify-center">

                            <Modal.Icon className="bg-blue-100 text-blue-600">
                                <Rocket className="size-5" />
                            </Modal.Icon>

                        </Modal.Header>

                        {/* Body */}
                        <Modal.Body className="py-6">

                            {/* Title & Description */}
                            <div className="text-center">

                                <h2 className="text-3xl font-bold text-black">
                                    {project.name}
                                </h2>


                                <h4 className="font-bold text-slate-800 mb-0.5">⚠️ Challenges Faced:</h4>
                                <p className="text-slate-500">{project.challenges}</p>

                                <div className="pt-2">
                                    <h4 className="font-bold text-slate-800 mb-0.5">🚀 Future Improvements & Plans:</h4>
                                    <p className="text-slate-500">{project.plans}</p>
                                </div>

                            </div>
                               <div className="w-full md:w-full min-h-56 bg-slate-50 border border-gray-100 rounded-[2rem] overflow-hidden flex items-center justify-center relative p-1 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group/img cursor-pointer">
                                                            <Image
                                                                src={project.itemimg}
                                                                alt={project.name}
                                                                width={450}
                                                                height={260}
                                                                className="w-full h-full object-cover rounded-[1.2rem] transition-transform duration-500 ease-out group-hover/img:scale-105"
                                                            />
                                                        </div>

                            <div className="flex flex-wrap gap-3 pt-2  justify-center mt-2">
                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-slate-800 transition">
                                    <FaGithub /> GitHub
                                </a>
                                <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-blue-700 transition">
                                    <FaExternalLinkAlt /> Live Demo
                                </a>

                            </div>

                        </Modal.Body>

                    </Modal.Dialog>

                </Modal.Container>

            </Modal.Backdrop>

        </Modal>
    );
}