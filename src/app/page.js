import About from "@/component/About";
import Contact from "@/component/Contact";
import Education from "@/component/Education";
import Hero from "@/component/Hero";
import ProjectsPage from "@/component/Project";
import Services from "@/component/Services";
import Skills from "@/component/Skills";




export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans ">

      <Hero />
      <About />
      <Skills />
      <Services />
      <Education />
      <ProjectsPage />
      <Contact />

    </div>
  );
}
