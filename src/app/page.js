import About from "@/component/About";
import Hero from "@/component/Hero";



export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans ">
     
    <Hero/>
    <About/>
   
    </div>
  );
}
