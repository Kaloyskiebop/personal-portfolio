"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom"; //

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
  maxWidth?: string;
  variant?: "standard" | "image";
}

export default function GenericModal({
  isOpen,
  onClose,
  children,
  title,
  className = "",
  maxWidth = "max-w-5xl",
  variant = "standard",
}: ModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 1. Wait for component to mount (client-side only) before using document
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. Handle Scroll Locking & Animation States
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => setIsVisible(false), 200);
      
      // Cleanup scroll lock
      setTimeout(() => {
        const openModals = document.querySelectorAll('[data-modal-active="true"]');
        if (openModals.length === 0) {
          document.body.style.overflow = "";
          document.documentElement.style.overflow = "";
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Don't render anything until client-side (avoids hydration errors)
  if (!mounted) return null;
  if (!isVisible && !isOpen) return null;

  // --- STYLES ---
  const overlayClasses = `fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm transition-all duration-200 ${
    isOpen ? "opacity-100 animate-in fade-in" : "opacity-0 animate-out fade-out"
  }`;

  const isImage = variant === "image";
  const standardContainer = `relative w-full bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden ${maxWidth}`;
  const imageContainer = `relative w-auto max-w-7xl bg-transparent shadow-none border-none p-0 overflow-visible`;

  const containerClasses = `${isImage ? imageContainer : standardContainer} transition-all duration-200 ${
    isOpen ? "scale-100 animate-in zoom-in-95" : "scale-95 animate-out zoom-out-95"
  } ${className}`;

  // createPortal moves this JSX to document.body
  return createPortal(
    <div
      data-modal-active={isOpen ? "true" : "false"}
      className={overlayClasses}
    >
      <div className="absolute inset-0 -z-10" onClick={onClose} />

      <div className={containerClasses} onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button for Image Variant */}
        {isImage && (
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 md:-right-12 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all z-50"
          >
            <X size={24} />
          </button>
        )}

        {/* Header for Standard Variant */}
        {!isImage && title && (
          <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-900/50">
            <h2 className="font-SpaceGrotesk-VariableFont_wght text-2xl font-bold text-white">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {/* Content */}
        <div className={isImage ? "" : "p-6 max-h-[70vh] overflow-y-auto custom-scrollbar"}>
          {children}
        </div>
      </div>
    </div>,
    document.body // Target container
  );
}