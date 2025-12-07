"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  variant?: "standard" | "image";
}

export default function Modal({ 
  isOpen, 
  onClose, 
  children, 
  title, 
  variant = "standard" 
}: ModalProps) {
  
  // --- ROBUST SCROLL LOCK LOGIC ---
  useEffect(() => {
    if (isOpen) {
      // 1. Lock scroll immediately
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }

    // 2. Cleanup function (Runs when modal closes or component unmounts)
    return () => {
      // Use a small timeout to let React finish removing this modal from the DOM
      setTimeout(() => {
        // 3. Check if ANY other modals are still open
        // We look for elements with the 'data-modal-active' attribute
        const openModals = document.querySelectorAll('[data-modal-active="true"]');
        
        // 4. Only UNLOCK if 0 modals remain
        if (openModals.length === 0) {
          document.body.style.overflow = "";
          document.documentElement.style.overflow = "";
        }
      }, 0);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // --- VARIANT 1: STANDARD ---
  if (variant === "standard") {
    return (
      // Added 'data-modal-active' attribute to track this modal
      <div 
        data-modal-active="true"
        className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      >
        <div className="relative w-full max-w-6xl bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-900/50">
            <h2 className="font-SpaceGrotesk-VariableFont_wght text-2xl font-bold text-white">{title}</h2>
            <button 
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {children}
          </div>
        </div>
        <div className="absolute inset-0 -z-10" onClick={onClose} />
      </div>
    );
  }

  // --- VARIANT 2: IMAGE ---
  return (
    // Added 'data-modal-active' attribute here too
    <div 
      data-modal-active="true"
      className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-200"
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all z-50"
      >
        <X size={24} />
      </button>

      <div 
        className="relative max-w-7xl max-h-[90vh] overflow-hidden rounded-lg shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()} 
      >
        {children}
      </div>

      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
}