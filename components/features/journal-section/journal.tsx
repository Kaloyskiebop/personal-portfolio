"use client";

import { useState } from "react";
import { ArrowRight, Lock, Ticket, MapPin, BookOpen, Sparkles, Image as ImageIcon } from "lucide-react"; 
import Image from "next/image";
import { timelineData } from "./journal-content/timeline-data"; 
import ImageCarousel from "@/components/ui/carousel/image-carousel"; 

export default function Journal() {
  const [hoveredYear, setHoveredYear] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"learnings" | "events">("learnings");
  
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  const isFuture = (year: string) => parseInt(year) > 2025;

  const handleYearClick = (year: string) => {
    if (isFuture(year)) return;
    
    if (selectedYear === year) {
      setSelectedYear(null);
    } else {
      setSelectedYear(year);
      setActiveTab("learnings");
      setSelectedEvent(null);
    }
  };

  const handleTabChange = (tab: "learnings" | "events") => {
    setActiveTab(tab);
    if (tab === "learnings") {
      setSelectedEvent(null);
    }
  };

  const activeData = timelineData.find((item) => item.year === selectedYear);
  
  // Helper to determine which IMAGES (Array) to show
  const getDisplayImages = () => {
    if (activeTab === "learnings") {
      // Safety check: Filter out empty strings
      const mainImages = activeData?.gallery || (activeData?.image ? [activeData.image] : []);
      return mainImages.filter(img => img !== ""); 
    }
    if (activeTab === "events" && selectedEvent) {
      return selectedEvent.image ? [selectedEvent.image] : [];
    }
    return []; 
  };

  const displayImages = getDisplayImages();

  return (
    <section id="journal" className="relative w-full min-h-screen py-24 bg-[#0D0D0D] text-white flex flex-col justify-center overflow-hidden">
      
      {/* Background Image - SAFETY CHECK ADDED */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/hero-banner.svg" 
          alt="Hero Banner"
          fill
          className="object-cover" 
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#0D0D0D] via-transparent to-[#0D0D0D]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Header */}
        <div className="mb-24 text-left">
          <h2 className="font-SpaceGrotesk-VariableFont_wght text-4xl md:text-5xl font-bold mb-4">
            My Journey So Far
          </h2>
          <div className="h-1 w-20 bg-zinc-800 rounded-full" />
        </div>

        {/* Timeline Container */}
        <div className="relative transition-all duration-500 ease-in-out">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-zinc-800 -translate-y-1/2 rounded-full z-0 mx-12 hidden md:block" />

          {/* Year Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-0 relative z-10">
            {timelineData.map((item) => {
              const future = isFuture(item.year);
              return (
                <div 
                  key={item.year} 
                  className="relative flex flex-col items-center group"
                  onMouseEnter={() => setHoveredYear(item.year)}
                  onMouseLeave={() => setHoveredYear(null)}
                  onClick={() => handleYearClick(item.year)}
                >
                  {/* Hover Preview Box */}
                  <div 
                    className={`
                      hidden md:block absolute bottom-full mb-8 w-64 
                      bg-zinc-900/90 backdrop-blur-xl border border-zinc-700 p-4 rounded-2xl shadow-2xl
                      transition-all duration-300 origin-bottom z-20
                      ${hoveredYear === item.year && selectedYear !== item.year ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"}
                    `}
                  >
                    {future ? (
                      <div className="flex flex-col items-center justify-center py-6 text-center space-y-3">
                        <div className="p-3 bg-zinc-800 rounded-full text-zinc-500">
                          <Lock size={20} />
                        </div>
                        <div>
                          <h4 className="font-SpaceGrotesk-VariableFont_wght text-lg font-bold text-zinc-300">Locked</h4>
                          <p className="font-SpaceMono-Regular text-xs text-zinc-500 uppercase tracking-widest mt-1">Deployment Pending</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="relative h-full w-full mb-3 rounded-xl overflow-hidden bg-zinc-950">
                          {/* SAFETY CHECK: Added fallback image */}
                          <Image 
                            src={item.image || "/hero-banner.png"} 
                            alt={item.title} 
                            fill 
                            className="object-cover" 
                          />
                        </div>
                        <h4 className="font-SpaceGrotesk-VariableFont_wght text-lg font-bold mb-1">{item.title}</h4>
                        <p className="font-SpaceMono-Regular text-xs text-zinc-400 leading-snug">{item.preview}</p>
                      </>
                    )}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-zinc-900 border-r border-b border-zinc-700 transform rotate-45"></div>
                  </div>

                  {/* Circle Node */}
                  <button 
                    className={`
                      relative w-20 h-20 rounded-full flex items-center justify-center text-sm font-bold font-SpaceMono-Regular transition-all duration-500 border-4 z-10
                      ${selectedYear === item.year 
                        ? "bg-white text-black border-white scale-125 shadow-[0_0_30px_rgba(255,255,255,0.6)] cursor-pointer" 
                        : future 
                          ? "bg-zinc-950 text-zinc-700 border-zinc-800 cursor-not-allowed" 
                          : "bg-zinc-900 text-zinc-500 border-zinc-800 hover:border-zinc-500 hover:text-white hover:scale-105 cursor-pointer"
                      }
                    `}
                  >
                    {item.year}
                  </button>

                  <span className={`md:hidden mt-2 font-SpaceGrotesk-VariableFont_wght text-lg font-bold ${future ? "text-zinc-700" : "text-white"}`}>
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Journey View */}
        <div className={`overflow-hidden transition-all duration-700 ease-in-out ${selectedYear ? "max-h-[1000px] opacity-100 mt-20" : "max-h-0 opacity-0 mt-0"}`}>
          {activeData && (
            <div className="bg-zinc-900/50 border border-zinc-800 p-6 md:p-8 rounded-3xl backdrop-blur-sm animate-in fade-in slide-in-from-top-8 duration-500">
              
              <div className="grid md:grid-cols-2 gap-8 items-stretch">
                
                {/* Left Side: Content with Tabs */}
                <div className="flex flex-col h-full">
                  
                  {/* Header Info */}
                  <div className="mb-4">
                    <div className="inline-block px-3 py-1 mb-3 rounded-full bg-zinc-800 text-xs font-SpaceMono-Regular text-zinc-400">
                      {isFuture(activeData.year) ? "Future Goal" : `Year ${selectedYear}`}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold font-SpaceGrotesk-VariableFont_wght">
                      {activeData.title}
                    </h3>
                  </div>

                  {/* Tab Switcher */}
                  <div className="flex items-center gap-6 border-b border-zinc-800 mb-4">
                    <button 
                      onClick={() => handleTabChange("learnings")}
                      className={`pb-2 text-sm font-bold flex items-center gap-2 transition-all border-b-2 
                        ${activeTab === "learnings" ? "text-white border-white" : "text-zinc-500 border-transparent hover:text-zinc-300"}
                      `}
                    >
                      <BookOpen size={14} /> Learnings
                    </button>
                    <button 
                      onClick={() => handleTabChange("events")}
                      className={`pb-2 text-sm font-bold flex items-center gap-2 transition-all border-b-2 
                        ${activeTab === "events" ? "text-white border-white" : "text-zinc-500 border-transparent hover:text-zinc-300"}
                      `}
                    >
                      <Sparkles size={14} /> Highlights
                    </button>
                  </div>

                  {/* Tab Content: Learnings */}
                  {activeTab === "learnings" && (
                    <div className="animate-in fade-in duration-300">
                      <p className="font-SpaceMono-Regular text-zinc-400 leading-relaxed text-sm mb-6">
                        {isFuture(activeData.year) 
                          ? `This is a milestone I am actively working towards. ${activeData.preview} The future is unwritten, but my path is clear.`
                          : `This was a pivotal year. ${activeData.preview} I dedicated my time to mastering the core technologies that power the modern web. From late-night debugging sessions to shipping my first production-ready code.`
                        }
                      </p>
                      <button className={`flex items-center gap-2 font-bold text-sm hover:gap-3 transition-all ${isFuture(activeData.year) ? "text-zinc-500 cursor-not-allowed" : "text-white"}`}>
                        {isFuture(activeData.year) ? "Coming Soon" : `View Projects`} 
                        {!isFuture(activeData.year) && <ArrowRight size={14} />}
                      </button>
                    </div>
                  )}

                  {/* Tab Content: Events */}
                  {activeTab === "events" && (
                    <div className="animate-in fade-in duration-300 space-y-3">
                      {activeData.events && activeData.events.length > 0 ? (
                        activeData.events.map((event, idx) => (
                          <div 
                            key={idx} 
                            onClick={() => setSelectedEvent(event)} 
                            className={`flex gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200
                              ${selectedEvent === event 
                                ? "bg-zinc-800 border-white shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
                                : "bg-zinc-950/50 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900" 
                              }
                            `}
                          >
                            <div className="shrink-0 p-2 bg-zinc-900 rounded-md h-fit text-zinc-400 border border-zinc-800">
                              {event.type === 'Community' ? <Ticket size={16} /> : <MapPin size={16} />}
                            </div>
                            <div>
                              <h5 className="font-bold text-white text-sm mb-0.5">{event.title}</h5>
                              <p className="text-[10px] md:text-xs text-zinc-400 font-SpaceMono-Regular leading-relaxed line-clamp-2">
                                {event.description}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center border border-dashed border-zinc-800 rounded-lg text-zinc-500 font-SpaceMono-Regular text-xs">
                          No specific events recorded for this year.
                        </div>
                      )}
                    </div>
                  )}

                </div>

                {/* Right Side: Featured Image Carousel */}
                <div className="relative h-64 md:h-auto w-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 flex items-center justify-center group">
                  {displayImages.length > 0 ? (
                    <div className={`w-full h-full ${isFuture(activeData.year) ? "grayscale opacity-50 pointer-events-none" : ""}`}>
                       {/* CRITICAL FIX: Added key prop to force re-render when year/tab changes */}
                       <ImageCarousel 
                         images={displayImages} 
                         key={`${selectedYear}-${activeTab}-${selectedEvent?.id || 'default'}`} 
                       />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-zinc-600 animate-in fade-in">
                        <ImageIcon size={48} strokeWidth={1} />
                        <p className="text-xs font-SpaceMono-Regular uppercase tracking-widest">Select an event to preview</p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}