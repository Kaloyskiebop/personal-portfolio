"use client";

import { useState, useEffect } from "react";
import { Code, Layers, ArrowUpRight, Award, Radio, Cpu, ScanLine, Terminal, Activity } from "lucide-react"; // Removed social icons
import Image from "next/image";
import Modal from "@/components/ui/modal/modal"; 
import CertificatesList from "./certificates/certificates-list"; 
import TechStackList from "./tech-stack/tech-stack-list"; 

// --- HELPER: LIVE CLOCK COMPONENT ---
function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Manila",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="font-mono tracking-widest">{time}</span>;
}

export default function About() {
  const [showTech, setShowTech] = useState(false);
  const [showCerts, setShowCerts] = useState(false);

  // Common Styles
  const cardBaseClass = "bg-[#0A0A0A] border border-zinc-800 p-8 rounded-3xl transition-all duration-500 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] relative overflow-hidden group";
  const iconBoxClass = "p-3 bg-zinc-900/50 w-fit rounded-xl border border-zinc-800 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] text-zinc-400 group-hover:text-white group-hover:border-zinc-600 transition-colors";

  return (
    <section id="about" className="relative w-full py-24 bg-[#0D0D0D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="font-SpaceGrotesk-VariableFont_wght text-4xl md:text-6xl font-bold mb-4 mt-10">
              System Overview
            </h2>
            <div className="h-1 w-20 bg-green-500/50 rounded-full mx-auto md:mx-0 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
          </div>
          <div className="flex items-center gap-4 bg-zinc-900/50 border border-zinc-800 px-4 py-2 rounded-full self-center md:self-auto">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <div className="text-xs font-SpaceMono-Regular text-zinc-400">
              OPERATIONAL <span className="text-zinc-600 mx-2">|</span> <LiveClock /> PH
            </div>
          </div>
        </div>

        {/* --- MAIN GRID LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* === LEFT COLUMN (Bio, Tech, Certs) === */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Widget 1: Main Bio */}
            <div className={`min-h-[300px] ${cardBaseClass}`}>
              <div className="flex flex-col h-full justify-between z-10 relative">
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                     <div className={iconBoxClass}>
                       <Code size={24} />
                     </div>
                     <span className="text-[10px] font-SpaceMono-Regular text-zinc-600 uppercase tracking-widest border border-zinc-800 px-2 py-1 rounded">Bio.exe running</span>
                  </div>
                  <div>
                    <h3 className="font-SpaceGrotesk-VariableFont_wght text-2xl font-bold mb-2">
                      Logic <span className="text-zinc-600">&</span> Creativity
                    </h3>
                    <p className="font-SpaceMono-Regular text-zinc-400 leading-relaxed text-sm md:text-base">
                      <span className="text-green-500 mr-2">&gt;</span>
                      Initiating developer sequence...
                      <br/><br/>
                      I am a web designer and developer based in Davao. My core function is building digital experiences that prioritize performance, accessibility, and precision.
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none" />
            </div>

            {/* Inner Grid for Tech & Certs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Widget 3: Tech Stack */}
                <div 
                  onClick={() => setShowTech(!showTech)}
                  className={`relative cursor-pointer h-64 ${cardBaseClass}`}
                >
                  <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ${showTech ? "opacity-0 invisible" : "opacity-100 visible"}`}>
                    <div className={`${iconBoxClass} mb-4 relative`}>
                      <Cpu size={32} />
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                      </span>
                    </div>
                    <h3 className="font-SpaceGrotesk-VariableFont_wght text-xl font-bold mb-1">Tech Arsenal</h3>
                    <p className="font-SpaceMono-Regular text-[10px] text-zinc-500 uppercase tracking-widest">
                      System Status: Optimized
                    </p>
                  </div>
                  <div className={`absolute inset-0 p-6 flex flex-col transition-opacity duration-300 ${showTech ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                    <div className="flex justify-between items-start mb-4 border-b border-zinc-800 pb-2">
                      <h3 className="font-SpaceGrotesk-VariableFont_wght text-lg font-bold text-zinc-300">Modules Loaded</h3>
                      <ArrowUpRight size={16} className="text-zinc-500" />
                    </div>
                    <TechStackList /> 
                  </div>
                </div>

                {/* Widget 4: Certificates */}
                <div 
                  onClick={() => setShowCerts(true)} 
                  className={`relative cursor-pointer h-64 ${cardBaseClass}`}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className={`${iconBoxClass} mb-4`}>
                        <Award size={32} />
                      </div>
                      <h3 className="font-SpaceGrotesk-VariableFont_wght text-xl font-bold mb-2">Credentials</h3>
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/20 border border-green-900/50">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="font-SpaceMono-Regular text-[10px] text-green-400 uppercase tracking-widest">Verified</span>
                      </div>
                  </div>
                </div>
            </div>
          </div>

          {/* === RIGHT COLUMN (THE ID CARD) === */}
          <div className="lg:col-span-1 h-full">
            <div className={`h-full flex flex-col ${cardBaseClass} p-0`}> 
              
              {/* Top Half: Profile Photo (Expanded) */}
              <div className="relative flex-1 min-h-[300px] w-full overflow-hidden bg-zinc-900 group border-b border-zinc-800">
                <Image 
                  src="/personal-photo.png" 
                  alt="Carl" 
                  fill 
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100" 
                />
                
                {/* ID Card Overlay Effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-4 left-4 p-1 border border-white/20 rounded bg-black/20 backdrop-blur-sm">
                      <ScanLine size={16} className="text-white/70" />
                    </div>
                    {/* ID Badge Number */}
                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                       <span className="font-SpaceMono-Regular text-[10px] text-zinc-300">ID: DEV-001</span>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.5)] animate-[scan_3s_ease-in-out_infinite]" />
                </div>
              </div>

              {/* Bottom Half: Current Focus / Stats (REPLACED SOCIALS) */}
              <div className="p-8 flex flex-col items-center justify-center gap-6 bg-[#0A0A0A]">
                <div className="text-center w-full">
                  <div className="flex items-center justify-center gap-2 mb-4 text-zinc-500">
                    <Activity size={16} className="text-green-500" />
                    <span className="font-SpaceMono-Regular text-xs uppercase tracking-widest">Current Focus</span>
                  </div>
                  
                  {/* Status List */}
                  <div className="space-y-3 w-full">
                    <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-800 bg-zinc-900/50">
                      <span className="text-sm font-bold text-zinc-300">Web Designing</span>
                      <span className="text-[10px] font-SpaceMono-Regular text-green-400 bg-green-900/20 px-2 py-1 rounded">Active</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-800 bg-zinc-900/50">
                      <span className="text-sm font-bold text-zinc-300">Frontend</span>
                      <span className="text-[10px] font-SpaceMono-Regular text-yellow-400 bg-yellow-900/20 px-2 py-1 rounded">Learning</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <Modal 
        isOpen={showCerts} 
        onClose={() => setShowCerts(false)}
        title="Verified Credentials"
      >
        <CertificatesList />
      </Modal>

    </section>
  );
}