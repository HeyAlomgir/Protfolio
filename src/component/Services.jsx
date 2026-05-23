"use client"
import { Button, Modal } from "@heroui/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaLaptopCode, FaNetworkWired, FaServer } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";
import { SiBackendless } from "react-icons/si";
import { Modals } from "./Modals";




 const Services = () => {

    const [services, setServices] = useState([]);
   

    const iconComponents = {
        frontend: <FaLaptopCode />,
        backend: <FaServer />,
        fullstack: <FaNetworkWired />,
        mern: <FaNetworkWired />,
    }

    useEffect(() => {
        const servicesData = async () => {
            try {
                const res = await fetch("/services.json");
                const data = await res.json();
                setServices(data);
            } catch (error) {
                toast.error("Error fetching data:", error)
            }
        };
        servicesData();
    }, [])

    // console.log(services);

    return (
        <div id="services" className="max-w-7xl mx-auto">
            {/* title */}
            <div className="text-center mb-16 my-20">

                <h2 className="text-4xl font-bold">
                    Services
                </h2>
                <p className="text-gray-400 mt-2">
                    What I offer
                </p>
            </div>

            {/* card */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service, index) => (
                    <div key={index}
                        className="group p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-blue-500 hover:-translate-y-2 transt duration-300 shadow-xl">


                        {/* Icon */}
                        <div className=" text-5xl text-blue-500 mb-6 group-hover:scale-110 transition">
                            {iconComponents[service.icon]}
                        </div>
                        <h3 className="text-2xl font-semibold mb-4">
                            {service.title}
                        </h3>

                   
                       
                       <Modals service={service} />

                    </div>
                ))}
            </div>
 
  {/* modal */}




        </div>
    );
};

export default Services;

