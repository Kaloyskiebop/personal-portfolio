"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { timelineData } from "./journal-content/timeline-data"; 

export default function Journal() {
  const [hoveredYear, setHoveredYear] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  // Toggle Logic: Close if already open, otherwise open
  const handleYearClick = (year: string) => {
    if (selectedYear === year) {
      setSelectedYear(null);
    } else {
      setSelectedYear(year);
    }
  };

  // Find data for the currently selected year to show in the details section
  const activeData = timelineData.find((item) => item.year === selectedYear);

  return (
    // min-h-screen + justify-center: Keeps everything vertically centered
    <section id="journal" className="relative w-full py-32 bg-[#0D0D0D] text-white min-h-screen flex flex-col justify-center overflow-hidden">
      
      {/* --- RESTORED BACKGROUND IMAGE --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/hero-banner.svg" 
          alt="Hero Banner"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Dark gradient to blend edges */}
        <div className="absolute inset-0 bg-linear-to-b from-[#0D0D0D] via-transparent to-[#0D0D0D]" />
      </div>

      {/* Content Container (Added z-10 relative to sit ON TOP of background) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* 1. Header - Left aligned */}
        <div className="mb-24 text-left">
          <h2 className="font-SpaceGrotesk-VariableFont_wght text-4xl md:text-6xl font-bold mb-4">
            My Journey So Far
          </h2>
          <div className="h-1 w-20 bg-zinc-800 rounded-full" />
        </div>

        {/* 2. Timeline Container */}
        <div className="relative transition-all duration-500 ease-in-out">
          
          {/* The Connecting Line (Background) */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-zinc-800 -translate-y-1/2 rounded-full z-0 mx-12 hidden md:block" />

          {/* 3. Year Nodes Wrapper */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-0 relative z-10">
            {timelineData.map((item) => (
              <div 
                key={item.year} 
                className="relative flex flex-col items-center group"
                onMouseEnter={() => setHoveredYear(item.year)}
                onMouseLeave={() => setHoveredYear(null)}
                onClick={() => handleYearClick(item.year)}
              >
                {/* --- The Hover Preview Box --- */}
                <div 
                  className={`
                    hidden md:block absolute bottom-full mb-8 w-64 
                    bg-zinc-900/90 backdrop-blur-xl border border-zinc-700 p-4 rounded-2xl shadow-2xl
                    transition-all duration-300 origin-bottom z-20
                    ${hoveredYear === item.year && selectedYear !== item.year ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"}
                  `}
                >
                  <div className="relative h-32 w-full mb-3 rounded-xl overflow-hidden bg-zinc-950">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <h4 className="font-SpaceGrotesk-VariableFont_wght text-lg font-bold mb-1">{item.title}</h4>
                  <p className="font-SpaceMono-Regular text-xs text-zinc-400 leading-snug">
                    {item.preview}
                  </p>
                  
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-zinc-900 border-r border-b border-zinc-700 transform rotate-45"></div>
                </div>

                {/* --- The Circle Node --- */}
                <button 
                  className={`
                    relative w-20 h-20 rounded-full flex items-center justify-center text-sm font-bold font-SpaceMono-Regular transition-all duration-500 border-4 cursor-pointer z-10
                    ${selectedYear === item.year 
                      ? "bg-white text-black border-white scale-125 shadow-[0_0_30px_rgba(255,255,255,0.6)]" 
                      : "bg-zinc-900 text-zinc-500 border-zinc-800 hover:border-zinc-500 hover:text-white hover:scale-110"
                    }
                  `}
                >
                  {item.year}
                </button>

                <span className="md:hidden mt-2 font-SpaceGrotesk-VariableFont_wght text-lg font-bold">{item.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Detailed Journey View (Animated Expand/Collapse) */}
        <div className={`overflow-hidden transition-all duration-700 ease-in-out ${selectedYear ? "max-h-[800px] opacity-100 mt-20" : "max-h-0 opacity-0 mt-0"}`}>
          {activeData && (
            <div className="bg-zinc-900/50 border border-zinc-800 p-8 md:p-12 rounded-3xl backdrop-blur-sm animate-in fade-in slide-in-from-top-8 duration-500">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                
                {/* Content Side */}
                <div>
                  <div className="inline-block px-3 py-1 mb-4 rounded-full bg-zinc-800 text-xs font-SpaceMono-Regular text-zinc-400">
                    Year {selectedYear}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold font-SpaceGrotesk-VariableFont_wght mb-4">
                    {activeData.title}
                  </h3>
                  <p className="font-SpaceMono-Regular text-zinc-400 leading-relaxed text-sm md:text-base mb-6">
                    This was a pivotal year. {activeData.preview} I dedicated my time to mastering the core technologies that power the modern web. From late-night debugging sessions to shipping my first production-ready code, every moment contributed to my growth as a developer.
                  </p>
                  <button className="flex items-center gap-2 text-white font-bold hover:gap-3 transition-all">
                    View Projects from {selectedYear} <ArrowRight size={16} />
                  </button>
                </div>

                {/* Image Side */}
                <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden border border-zinc-800 group">
                  <Image 
                    src={activeData.image} 
                    alt={activeData.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>

              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}