"use client";

import { useState } from "react";
import { Code, Layers, ArrowUpRight, Award, Github, Instagram, Facebook } from "lucide-react";
import Image from "next/image";
import Modal from "@/components/ui/modal/about-modal-content"; 
import CertificatesList from "./certificates/certificates-list"; 
import TechStackList from "./tech-stack/tech-stack-list"; 

export default function About() {
  const [showTech, setShowTech] = useState(false);
  const [showCerts, setShowCerts] = useState(false);

  // Base classes for all cards to remove border and add a default subtle shadow
  const cardBaseClass = "bg-zinc-900/50 p-8 rounded-3xl transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.3)]";

  return (
    <section id="about" className="relative w-full py-24 bg-[#0D0D0D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <h2 className="font-SpaceGrotesk-VariableFont_wght text-4xl md:text-5xl font-bold mb-4 mt-10">
            About Me
          </h2>
          <div className="h-1 w-20 bg-zinc-800 rounded-full mx-auto md:mx-0" />
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* --- TOP ROW --- */}

          {/* Card 1: Main Bio (White Glow) */}
          <div className={`md:col-span-2 ${cardBaseClass}`}>
            <div className="flex flex-col h-full justify-between">
              <div className="space-y-4">
                <div className="p-3 bg-white/5 w-fit rounded-xl border border-white/10">
                  <Code className="text-white" size={24} />
                </div>
                <h3 className="font-SpaceGrotesk-VariableFont_wght text-2xl font-bold">The intersection of Logic & Creativity.</h3>
                <p className="font-SpaceMono-Regular text-zinc-400 leading-relaxed">
                  I am a web designer and developer based in Davao, focusing on building digital experiences that look good and work even better.
                  <br /><br />
                  My work is driven by a desire to create pixel-perfect, accessible, and performant interfaces. I don't just write code; I craft solutions.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Profile Picture (Blue Glow) */}
          <div className={`relative h-64 md:h-auto rounded-3xl overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-500`}>
             <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
                <span className="font-SpaceMono-Regular text-zinc-600"></span>
             </div>
             <Image 
               src="/personal-photo.png" 
               alt="Carl" 
               fill 
               className="object-cover grayscale hover:grayscale-0 transition-all duration-500" 
             />
          </div>

          {/* --- BOTTOM ROW --- */}

          {/* Box 1: Tech Stack (Orange Glow) */}
          <div 
            onClick={() => setShowTech(!showTech)}
            className={`relative cursor-pointer group overflow-hidden h-64 ${cardBaseClass} hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]`}
          >
            {/* View 1: Default (Hidden) */}
            <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ${showTech ? "opacity-0 invisible" : "opacity-100 visible"}`}>
              <div className="p-4 bg-white/5 rounded-full border border-white/10 mb-4 group-hover:scale-110 transition-transform">
                <Layers className="text-white" size={32} />
              </div>
              <h3 className="font-SpaceGrotesk-VariableFont_wght text-xl font-bold mb-2">My Arsenal</h3>
              <p className="font-SpaceMono-Regular text-xs text-zinc-500 uppercase tracking-widest">Tap to reveal</p>
            </div>

            {/* View 2: Revealed List */}
            <div className={`absolute inset-0 p-8 flex flex-col transition-opacity duration-300 ${showTech ? "opacity-100 visible" : "opacity-0 invisible"}`}>
              <div className="flex justify-between items-start mb-4">
                 <h3 className="font-SpaceGrotesk-VariableFont_wght text-lg font-bold text-zinc-300">Tech Stack</h3>
                 <ArrowUpRight size={16} className="text-zinc-500" />
              </div>
              
              <TechStackList /> 
              
            </div>
          </div>

          {/* Box 2: Certificates (Green Glow) */}
          <div 
            onClick={() => setShowCerts(true)} 
            className={`relative cursor-pointer group overflow-hidden h-64 ${cardBaseClass} hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]`}
          >
             <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="p-4 bg-white/5 rounded-full border border-white/10 mb-4 group-hover:scale-110 transition-transform">
                  <Award className="text-white" size={32} />
                </div>
                <h3 className="font-SpaceGrotesk-VariableFont_wght text-xl font-bold mb-2">Certificates</h3>
                <p className="font-SpaceMono-Regular text-xs text-zinc-500 uppercase tracking-widest">View All</p>
             </div>
          </div>

          {/* Box 3: Social Media (Purple Glow) */}
          <div className={`h-64 flex flex-col items-center justify-center gap-6 ${cardBaseClass} hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]`}>
            <div className="text-center">
              <h3 className="font-SpaceGrotesk-VariableFont_wght text-xl font-bold mb-1">Connect</h3>
              <p className="font-SpaceMono-Regular text-xs text-zinc-500">Let's build something together.</p>
            </div>
            
            <div className="flex gap-4">
               <a href="#" className="p-4 bg-zinc-800 rounded-2xl border border-zinc-700 hover:bg-white hover:text-black transition-all group hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                 <Facebook size={24} />
               </a>
               <a href="#" className="p-4 bg-zinc-800 rounded-2xl border border-zinc-700 hover:bg-white hover:text-black transition-all group hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                 <Github size={24} />
               </a>
               <a href="#" className="p-4 bg-zinc-800 rounded-2xl border border-zinc-700 hover:bg-white hover:text-black transition-all group hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                 <Instagram size={24} />
               </a>
            </div>
          </div>

        </div>
      </div>

      <Modal 
        isOpen={showCerts} 
        onClose={() => setShowCerts(false)}
        title="My Certifications"
      >
        <CertificatesList />
      </Modal>

    </section>
  );
}