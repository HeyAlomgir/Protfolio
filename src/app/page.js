import About from "@/component/About";
import Education from "@/component/Education";
import Hero from "@/component/Hero";
import ProjectsPage from "@/component/Project";
import Services from "@/component/Services";
import Skills from "@/component/Skills";
import Technoloi from "@/component/Technoloi";



export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans ">
     
    <Hero/>
    <About/>
    <Technoloi/>
    <Skills/>
    <Services/>
    <Education/>
    <ProjectsPage/>
   
    </div>
  );
}
