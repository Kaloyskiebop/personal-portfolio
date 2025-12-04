import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react"; 

export default function Hero() {
  return (
    <section className="relative w-screen h-screen bg-zinc-950 overflow-hidden left-1/2 -translate-x-1/2">
      
      {/* 1. Background Image */}
      <Image
        src="/hero-banner.svg" 
        alt="Hero Banner"
        fill
        className="object-cover" 
        priority
        quality={100}
      />

      {/* 2. Dark Overlay - Slightly darker (60%) to match the high contrast in your design */}
      <div className="absolute inset-0 bg-black/5" />

      {/* 3. Text Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center px-4 text-center z-10">
        
        {/* Main Headline Group */}
        <div className="space-y-2 mb-8">
          <h1 className="font-SpaceGrotesk-VariableFont_wght text-5xl md:text-8xl font-bold text-white tracking-tight">
            Hello, I’m Carl
          </h1>
          <h2 className="font-SpaceGrotesk-VariableFont_wght text-2xl md:text-[42px] font-medium text-zinc-200">
            A Web Designer from Davao
          </h2>
        </div>

        {/* Description Paragraph - Using Mono font as per design */}
        <p className="font-mono text-sm md:text-[16px] text-zinc-400 max-w-xl mx-auto mb-10 leading-relaxed">
          Passionate about web design and front-end development,
          focused on creating responsive and creative websites
          while continuously refining my skills.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          
          {/* Resume Button: White Background, Black Text */}
          <Link 
            href="/resume" 
            className="group relative flex items-center justify-center gap-2 w-full sm:w-52 py-3 rounded-lg bg-white text-black font-sans font-semibold hover:bg-zinc-200 transition-all"
          >
            Resume
            <ArrowUpRight className="absolute right-6 w-5 h-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          
          {/* Projects Button: Transparent, White Border */}
          <Link 
            href="/projects" 
            className="group relative flex items-center justify-center gap-2 w-full sm:w-52 py-3 rounded-lg border-2 border-zinc-600 text-white font-sans font-semibold hover:bg-zinc-900 hover:border-white transition-all"
          >
            Projects
            <ArrowUpRight className="absolute right-6 w-5 h-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          
        </div>
      </div>
    </section>
  );
}