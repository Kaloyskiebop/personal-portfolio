"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, MapPin } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isScrolled, setIsScrolled] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Paths are correctly set to IDs for Single Page scrolling
  const menuItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Journal", href: "#journal" },
    { label: "Contacts", href: "#contacts" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20); // Trigger slightly later (20px)

      const sections = menuItems.map(item => item.href.substring(1));
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if ((rect.top >= 0 && rect.top <= 300) || (rect.top < 0 && rect.bottom > 150)) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const targetId = href.substring(1);
    const elem = document.getElementById(targetId);
    
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
      setActiveSection(targetId);
    }
  };

  return (
    <>
      {/* FLOATING NAVBAR CONTAINER */}
      <nav 
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out px-6
          w-[95%] max-w-5xl rounded-3xl border
          ${isScrolled 
            ? "bg-black/20 backdrop-blur-xl border-white/10 shadow-xl py-2" // Glass effect when scrolled
            : "bg-transparent border-transparent py-4" // Clean when at top
          }
        `}
      >
        <div className="flex justify-between items-center h-14"> 
            
            {/* Logo */}
            <div className="shrink-0">
              <Link href="#home" onClick={(e) => handleScrollTo(e, "#home")} className="flex items-center">
                <Image 
                  src="/signature.svg"
                  alt="Signature Logo"
                  width={150}
                  height={60}
                  className="invert h-18 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]"
                  priority
                />
              </Link>
            </div>

            {/* Hamburger / Close Button - Visible on ALL screens */}
            <div>
              <button
                onClick={toggleMenu}
                // UPDATED STYLES:
                // border border-white/20: Adds the border
                // rounded-full: Makes it a circle (change to rounded-lg for a square)
                // bg-white/5: Adds a subtle background
                // hover:bg-white/10: Lightens on hover
                className="inline-flex items-center justify-center p-3 text-white border border-white/20 bg-white/5 rounded-2xl hover:bg-white/10 hover:border-white/40 transition-all focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={25} /> : <Menu size={25} />}
              </button>
            </div>
          </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/70 backdrop-blur-md transition-all duration-300 ease-in-out
          ${isOpen 
            ? "opacity-100 visible translate-y-0" 
            : "opacity-0 invisible -translate-y-5"
          }
        `}
      >
        <div className="flex flex-col items-center space-y-8 text-center">
          {menuItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative w-fit text-6xl font-bold transition-colors font-SpaceGrotesk-VariableFont_wght
                  ${isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"}
                `}
                onClick={(e) => handleScrollTo(e, item.href)}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -right-5 top-0 text-red-500 animate-bounce">
                    <MapPin size={24} fill="currentColor" className="rotate-12"/>
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  )
}