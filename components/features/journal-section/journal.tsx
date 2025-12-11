"use client";

import { useState, useRef } from "react";
import { Lock } from "lucide-react"; 
import Image from "next/image";
import { timelineData } from "./journal-content/timeline-data"; 
// Import your new neat component
import JournalDetailCard from "./journal-content/journal-detail-card"; 

export default function Journal() {
  const [hoveredYear, setHoveredYear] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  
  // 1. Create a Ref to store the DOM elements for each year
  const yearRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const isFuture = (year: string) => parseInt(year) > 2025;

  const handleYearClick = (year: string) => {
    if (isFuture(year)) return;
    
    if (selectedYear === year) {
      setSelectedYear(null);
    } else {
      setSelectedYear(year);
      
      // 2. Scroll logic: Find the element and scroll it to center
      setTimeout(() => {
        const element = yearRefs.current[year];
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 300); // Small delay to allow the accordion to start opening
    }
  };

  const activeData = timelineData.find((item) => item.year === selectedYear);

  return (
    <section id="journal" className="relative w-full pt-30 bg-linear-to-b from-[#0D0D0D] to-[#0E0E0E] text-white min-h-screen">

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 text-left pl-4 md:pl-0">
          <h2 className="font-SpaceGrotesk-VariableFont_wght text-4xl md:text-6xl font-bold mb-4">
            My Journey So Far
          </h2>
          <div className="h-1 w-20 bg-blue-500/50 rounded-full mx-auto md:mx-0 shadow-[0_0_10px_rgba(34,197,94,0.5)]"/>
        </div>

        {/* --- VERTICAL TIMELINE --- */}
        <div className="relative ml-4 md:ml-12 pb-12">
          <div className="absolute left-0 top-2 bottom-0 w-0.5 bg-zinc-800" />

          {timelineData.map((item) => {
            const future = isFuture(item.year);
            const isSelected = selectedYear === item.year;
            // Simplified isActive: only true if manually selected
            const isActive = isSelected;

            return (
              <div 
                key={item.year}
                // 3. Assign the Ref to this specific year's container
                ref={(el) => { yearRefs.current[item.year] = el; }}
                data-year={item.year}
                className="relative pl-8 md:pl-12 pb-12"
              >
                {/* Sticky Node */}
                <div className="sticky top-1/3 z-20 self-start inline-block">
                  <div 
                    onClick={() => handleYearClick(item.year)}
                    className={`
                      absolute -left-[45px] md:-left-[61px] top-1.5 w-5 h-5 rounded-full border-4 transition-all duration-500 cursor-pointer
                      ${isActive 
                        ? "bg-white border-white scale-125 shadow-[0_0_15px_rgba(255,255,255,0.6)]" 
                        : future 
                          ? "bg-zinc-950 border-zinc-800 cursor-not-allowed" 
                          : "bg-zinc-900 border-zinc-600 hover:border-white hover:scale-110"
                      }
                    `}
                  />

                  <div onClick={() => handleYearClick(item.year)} className="group cursor-pointer">
                    <span className={`text-sm font-SpaceMono-Regular font-bold tracking-widest mb-1 block transition-colors ${isActive ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"}`}>
                      {item.year}
                    </span>
                    <div className="flex items-center gap-4">
                      <h3 className={`text-3xl md:text-4xl font-bold font-SpaceGrotesk-VariableFont_wght transition-colors ${isActive ? "text-white" : future ? "text-zinc-700" : "text-zinc-400 group-hover:text-white"}`}>
                        {item.title}
                      </h3>
                      {future && <Lock size={16} className="text-zinc-700" />}
                    </div>
                    {!isSelected && (
                      <p className="mt-2 text-zinc-500 font-SpaceMono-Regular text-sm max-w-lg leading-relaxed transition-opacity duration-300">
                        {future ? "Deployment Pending..." : item.preview}
                      </p>
                    )}
                  </div>
                </div>

                {/* Expanded Content Area */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isSelected ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="mt-6">
                    {/* Render the new Neat Component here! */}
                    {isSelected && <JournalDetailCard data={item} year={item.year} />}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}