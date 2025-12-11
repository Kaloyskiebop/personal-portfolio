"use client";

import { Facebook, Github, Instagram, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#050505] border-t border-zinc-900 py-12 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left: Copyright */}
        <div className="text-center md:text-left">
          <p className="font-SpaceGrotesk-VariableFont_wght text-lg font-bold">
            John Carl Imarga
          </p>
          <p className="font-SpaceMono-Regular text-xs text-zinc-500 mt-1">
            © {currentYear} All rights reserved.
          </p>
        </div>

        {/* Right: Social Links */}
        <div className="flex items-center gap-6">
          <Link href="https://github.com/Kaloyskiebop" target="_blank" className="text-zinc-500 hover:text-white transition-colors">
            <Github size={20} />
          </Link>
          <Link href="https://www.linkedin.com/in/john-carl-imarga-9016a4398/" target="_blank" className="text-zinc-500 hover:text-white transition-colors">
            <Linkedin size={20} />
          </Link>
          <Link href="https://web.facebook.com/carl.john.660860" target="_blank" className="text-zinc-500 hover:text-white transition-colors">
            <Facebook size={20} />
          </Link>
          <Link href="mailto:carljohnimarga@gmail.com" className="text-zinc-500 hover:text-white transition-colors">
            <Mail size={20} />
          </Link>
        </div>

      </div>
    </footer>
  );
}