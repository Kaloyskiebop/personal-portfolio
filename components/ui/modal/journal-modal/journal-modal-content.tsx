"use client";

import { useState } from "react";
import { Calendar, MapPin, ChevronDown, FileText, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import Modal from "@/components/ui/modal/modal"; // Reusing generic modal
import ImageCarousel from "@/components/ui/carousel/image-carousel"; // Import Carousel
import { eventSchedules } from "@/components/features/journal-section/journal-content/schedule-data";
import { locationGalleries } from "@/components/features/journal-section/journal-content/gallery-data";

interface JournalModalContentProps {
  data: any; 
}

export default function JournalModalContent({ data }: JournalModalContentProps) {
  // State for accordion dropdowns
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  
  // State for Viewers
  const [observationImage, setObservationImage] = useState<string | null>(null);
  
  // UPDATED: State for Gallery Modal (Array of images)
  const [galleryImages, setGalleryImages] = useState<string[] | null>(null);

  if (!data) return null;

  const scheduleData = eventSchedules[data.id] || [];

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // UPDATED: Handler to open gallery modal
  const openGallery = (galleryId: string) => {
    const photos = locationGalleries[galleryId];
    if (photos && photos.length > 0) {
      setGalleryImages(photos);
    }
  };

  return (
    <>
      <div className="h-full flex flex-col space-y-8">
        
        {/* Header Image */}
        <div className="relative h-72 w-full shrink-0 rounded-2xl overflow-hidden">
          <Image
            src={data.image || "/hero-banner.png"}
            alt={data.title || "Event"}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0D0D0D] via-[#0D0D0D]/60 to-transparent flex flex-col justify-end p-8">
             <h2 className="text-4xl font-bold font-SpaceGrotesk-VariableFont_wght text-white mb-3">
               {data.title}
             </h2>
             <div className="flex items-center gap-6 text-zinc-300 text-base font-SpaceMono-Regular">
               <span className="flex items-center gap-2"><Calendar size={16} /> 2025</span>
               <span className="flex items-center gap-2"><MapPin size={16} /> Event Location</span>
             </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-10 pb-4">
          <div>
            <h3 className="text-xl font-bold font-SpaceGrotesk-VariableFont_wght text-white mb-3">Overview</h3>
            <p className="font-SpaceMono-Regular text-zinc-400 leading-relaxed text-base">
              {data.description} This event was a significant milestone in my journey.
            </p>
          </div>

          {/* Schedule List */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-SpaceGrotesk-VariableFont_wght text-white border-b border-zinc-800 pb-3">
              Highlights & Agenda
            </h3>
            
            {scheduleData.map((item, index) => (
              <div 
                key={index} 
                className={`rounded-xl border transition-all duration-300 overflow-hidden 
                  ${expandedIndex === index ? "bg-zinc-900 border-zinc-700" : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"}
                `}
              >
                {/* Accordion Header */}
                <button 
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div className="flex gap-5">
                    <div className={`p-3 rounded-lg h-fit border ${item.color}`}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg mb-1">{item.title}</h4>
                      <p className="text-sm text-zinc-400 leading-relaxed font-SpaceMono-Regular">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className={`transition-transform duration-300 ${expandedIndex === index ? "rotate-180" : ""}`}>
                    <ChevronDown size={20} className="text-zinc-500" />
                  </div>
                </button>

                {/* Accordion Body */}
                <div className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${expandedIndex === index ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="p-5 pt-0 space-y-6">
                    <div className="w-full h-px bg-zinc-800 mb-4" /> 
                    
                    {item.locations.map((loc, idx) => {
                      // Check if gallery exists for this location
                      const hasPhotos = loc.galleryId && locationGalleries[loc.galleryId]?.length > 0;

                      return (
                        <div key={idx} className="flex flex-col sm:flex-row gap-5 animate-in fade-in slide-in-from-top-2 duration-500">
                          {/* Location Image */}
                          <div className="relative w-full sm:w-32 h-24 shrink-0 rounded-lg overflow-hidden border border-zinc-700 bg-zinc-950">
                            <Image src={loc.image} alt={loc.name} fill className="object-cover" />
                          </div>
                          
                          {/* Location Details & Buttons */}
                          <div className="flex-1">
                            <h5 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                               <MapPin size={14} className="text-blue-400"/> {loc.name}
                            </h5>
                            <p className="text-sm text-zinc-400 font-SpaceMono-Regular leading-relaxed mb-3">
                              {loc.note}
                            </p>

                            <div className="flex flex-wrap gap-2">
                              {/* Button: View Observation */}
                              {(loc as any).observation && (
                                <button 
                                  onClick={() => setObservationImage((loc as any).observation || null)}
                                  className="flex items-center gap-2 text-xs font-bold text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 px-3 py-1.5 rounded-md transition-colors"
                                >
                                  <FileText size={12} /> Observations
                                </button>
                              )}

                              {/* UPDATED Button: View Site Photos (Opens Modal) */}
                              {hasPhotos && (
                                <button 
                                  onClick={() => openGallery(loc.galleryId!)}
                                  className="flex items-center gap-2 text-xs font-bold text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 px-3 py-1.5 rounded-md transition-colors"
                                >
                                  <ImageIcon size={12} /> View Gallery
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- MODAL 1: OBSERVATION NOTES --- */}
      <Modal 
        isOpen={!!observationImage} 
        onClose={() => setObservationImage(null)}
        variant="image"
      >
        {observationImage && (
          <img 
            src={observationImage} 
            alt="Observation Notes" 
            className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-md shadow-2xl"
          />
        )}
      </Modal>

      {/* --- MODAL 2: CAROUSEL GALLERY --- */}
      <Modal 
        isOpen={!!galleryImages} 
        onClose={() => setGalleryImages(null)}
        variant="image"
      >
        {galleryImages && (
           // FIXED: Added explicit dimensions (w-[90vw] md:w-[80vw]) to prevent collapse inside flex center
           <div className="w-[90vw] md:w-[40vw] h-[80vh] bg-black rounded-xl overflow-hidden relative">
             <ImageCarousel images={galleryImages} />
           </div>
        )}
      </Modal>
    </>
  );
}