"use client";

import { useState } from "react";
import { ArrowRight, Lock, Ticket, MapPin, BookOpen, Sparkles, Image as ImageIcon, Maximize2 } from "lucide-react"; 
import Image from "next/image";
import ImageCarousel from "@/components/ui/carousel/image-carousel"; 
import Modal from "@/components/ui/modal/modal"; 
import JournalModalContent from "@/components/ui/modal/journal-modal/journal-modal-content"; 

interface JournalDetailCardProps {
  data: any;
  year: string;
}

export default function JournalDetailCard({ data, year }: JournalDetailCardProps) {
  const [activeTab, setActiveTab] = useState<"learnings" | "events">("learnings");
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const isFuture = parseInt(year) > 2025;

  const handleTabChange = (tab: "learnings" | "events") => {
    setActiveTab(tab);
    if (tab === "learnings") {
      setSelectedEvent(null); 
    }
  };

  const getDisplayImages = () => {
    if (activeTab === "learnings") {
      const mainImages = data.gallery || (data.image ? [data.image] : []);
      return mainImages.filter((img: string) => img !== ""); 
    }
    if (activeTab === "events" && selectedEvent) {
      return selectedEvent.image ? [selectedEvent.image] : [];
    }
    return []; 
  };

  const displayImages = getDisplayImages();

  // Helper to get data for the modal (either selected event or main year data)
  const modalData = activeTab === "events" && selectedEvent ? selectedEvent : data;

  // Logic: Image is clickable ONLY if not future, has content, AND we are in the Events tab
  const isClickable = !isFuture && displayImages.length > 0 && activeTab === "events";

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 p-8 md:p-12 rounded-3xl backdrop-blur-sm animate-in fade-in slide-in-from-top-8 duration-500 shadow-2xl">
      
      <div className="grid md:grid-cols-2 gap-12 items-stretch">
        
        {/* --- LEFT SIDE: CONTENT --- */}
        <div className="flex flex-col h-full justify-center">
          
          <div className="mb-6">
            <div className="inline-block px-3 py-1 mb-3 rounded-full bg-zinc-800 text-xs font-SpaceMono-Regular text-zinc-400">
              {isFuture ? "Future Goal" : `Year ${year}`}
            </div>
            <h3 className="text-3xl md:text-5xl font-bold font-SpaceGrotesk-VariableFont_wght mb-2">
              {data.title}
            </h3>
          </div>

          <div className="flex items-center gap-6 border-b border-zinc-800 mb-6">
            <button 
              onClick={() => handleTabChange("learnings")}
              className={`pb-3 text-sm font-bold flex items-center gap-2 transition-all border-b-2 
                ${activeTab === "learnings" ? "text-white border-white" : "text-zinc-500 border-transparent hover:text-zinc-300"}
              `}
            >
              <BookOpen size={16} /> Learnings
            </button>
            <button 
              onClick={() => handleTabChange("events")}
              className={`pb-3 text-sm font-bold flex items-center gap-2 transition-all border-b-2 
                ${activeTab === "events" ? "text-white border-white" : "text-zinc-500 border-transparent hover:text-zinc-300"}
              `}
            >
              <Sparkles size={16} /> Highlights
            </button>
          </div>

          {/* Tab 1: Learnings Content */}
          {activeTab === "learnings" && (
            <div className="animate-in fade-in duration-300">
              <p className="font-SpaceMono-Regular text-zinc-400 leading-relaxed text-sm md:text-base mb-8">
                {data.description || "Details for this year are coming soon."}
              </p>
              
              <button className={`flex items-center gap-2 font-bold text-base hover:gap-3 transition-all ${isFuture ? "text-zinc-500 cursor-not-allowed" : "text-white"}`}>
                {isFuture ? "Coming Soon" : `View Projects`} 
                {!isFuture && <ArrowRight size={16} />}
              </button>
            </div>
          )}

          {/* Tab 2: Events List */}
          {activeTab === "events" && (
            <div className="animate-in fade-in duration-300 space-y-4">
              {data.events && data.events.length > 0 ? (
                data.events.map((event: any, idx: number) => (
                  <div 
                    key={idx} 
                    onClick={() => setSelectedEvent(event)} 
                    className={`flex gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200
                      ${selectedEvent === event 
                        ? "bg-zinc-800 border-white shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
                        : "bg-zinc-950/50 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900" 
                      }
                    `}
                  >
                    <div className="shrink-0 p-3 bg-zinc-900 rounded-lg h-fit text-zinc-400 border border-zinc-800">
                      {event.type === 'Community' ? <Ticket size={20} /> : <MapPin size={20} />}
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-sm mb-1">{event.title}</h5>
                      <p className="text-xs text-zinc-400 font-SpaceMono-Regular leading-relaxed line-clamp-2">
                        {event.description}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center border border-dashed border-zinc-800 rounded-xl text-zinc-500 font-SpaceMono-Regular text-sm">
                  No specific events recorded for this year.
                </div>
              )}
            </div>
          )}
        </div>

        {/* --- RIGHT SIDE: DYNAMIC IMAGE --- */}
        <div 
          className={`relative h-80 md:h-auto w-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 flex items-center justify-center group min-h-[450px]
            ${isClickable ? "cursor-pointer hover:border-zinc-600" : ""}
          `}
          // Open Modal ONLY if clickable condition is met
          onClick={() => {
            if (isClickable) setIsModalOpen(true);
          }}
        >
           {displayImages.length > 0 ? (
             <div className={`w-full h-full ${isFuture ? "grayscale opacity-50 pointer-events-none" : ""}`}>
                <ImageCarousel 
                  images={displayImages} 
                  key={`${year}-${activeTab}-${selectedEvent?.id || 'main'}`} 
                />
                
                {/* Hover Overlay Hint - Only shows if clickable */}
                {isClickable && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-10">
                    <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2 text-white text-sm font-bold">
                      <Maximize2 size={16} /> Expand Details
                    </div>
                  </div>
                )}
             </div>
           ) : (
             <div className="flex flex-col items-center gap-4 text-zinc-600 animate-in fade-in">
                <ImageIcon size={64} strokeWidth={1} />
                <p className="text-sm font-SpaceMono-Regular uppercase tracking-widest">Select an event to preview</p>
             </div>
           )}
        </div>

      </div>

      {/* --- MODAL FOR DETAILS --- */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={activeTab === "events" && selectedEvent ? "Event Details" : "Year Overview"}
      >
        <JournalModalContent data={modalData} />
      </Modal>

    </div>
  );
}