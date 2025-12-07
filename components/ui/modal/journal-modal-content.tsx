"use client";

import { Calendar, MapPin, Coffee, Sun, Moon } from "lucide-react";
import Image from "next/image";

interface JournalModalContentProps {
  data: any;
}

export default function JournalModalContent({ data }: JournalModalContentProps) {
  if (!data) return null;

  return (
    <div className="space-y-8">
      
      {/* 1. Hero Image Header */}
      <div className="relative h-64 w-full shrink-0 rounded-2xl overflow-hidden">
        <Image
          src={data.image || "/hero-banner.png"}
          alt={data.title || "Event"}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/60 to-transparent flex flex-col justify-end p-6">
           {/* Title is already in Modal Header, but we can keep it here for style or remove it */}
           <div className="flex items-center gap-4 text-zinc-300 text-sm font-SpaceMono-Regular">
             <span className="flex items-center gap-1"><Calendar size={14} /> 2025</span>
             <span className="flex items-center gap-1"><MapPin size={14} /> Davao City</span>
           </div>
        </div>
      </div>

      {/* 2. Main Description */}
      <div>
        <h3 className="text-lg font-bold font-SpaceGrotesk-VariableFont_wght text-white mb-2">Overview</h3>
        <p className="font-SpaceMono-Regular text-zinc-400 leading-relaxed text-sm">
          {data.description}
        </p>
      </div>

      {/* 3. The Itinerary */}
      <div className="space-y-4 pb-4">
        <h3 className="text-lg font-bold font-SpaceGrotesk-VariableFont_wght text-white border-b border-zinc-800 pb-2">
          Highlights
        </h3>
        {/* ... Rest of your agenda items (Morning, Lunch, Afternoon) ... */}
         <div className="flex gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors">
             <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg h-fit border border-blue-500/20">
               <Sun size={20} />
             </div>
             <div>
               <h4 className="font-bold text-white text-sm mb-1">Morning Session</h4>
               <p className="text-xs text-zinc-500 leading-relaxed font-SpaceMono-Regular">
                 Keynote speeches on the future of AI...
               </p>
             </div>
          </div>
      </div>
    </div>
  );
}