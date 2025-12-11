"use client";

import { useState } from "react";
import { ArrowUpRight, Send, Loader2 } from "lucide-react";
import Image from "next/image"; 

export default function Contacts() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate sending delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSent(true);
    // Reset success message after 3 seconds
    setTimeout(() => setIsSent(false), 3000);
  };

  const socialLinks = [
    { name: "LinkedIn", href: "https://linkedin.com/in/yourusername", label: "/in/yourusername" },
    { name: "GitHub", href: "https://github.com/yourusername", label: "@yourusername" },
    { name: "Instagram", href: "https://instagram.com/yourusername", label: "@yourusername" },
  ];

  return (
    <section id="contacts" className="relative w-full py-32 bg-[#050505] text-white overflow-hidden">
      
      {/* 2. BACKGROUND IMAGE INTEGRATION */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/hero-banner.svg" 
          alt="Hero Banner"
          fill
          className="object-cover" 
          priority
          quality={100}
        />
        {/* Gradient overlay to blend it into the dark background - BOTTOM ONLY */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>

      {/* 3. Content Container (Added z-10 to sit on top of image) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-20 text-center md:text-left">         
          <h2 className="font-SpaceGrotesk-VariableFont_wght text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Let's work together.
          </h2>
          <p className="font-SpaceMono-Regular text-zinc-400 max-w-xl text-lg">
            Have a project in mind or just want to say hi? I'm currently open for new opportunities and collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Contact Form */}
          <div className="p-8 md:p-10 rounded-3xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 flex flex-col h-full">
            <h3 className="font-SpaceGrotesk-VariableFont_wght text-2xl font-bold text-white mb-6">
              Send a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-grow">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-SpaceMono-Regular text-zinc-500 uppercase tracking-widest">Your Email</label>
                <input 
                  type="email" 
                  id="email"
                  required
                  placeholder="name@example.com"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/50 transition-colors font-SpaceMono-Regular text-sm"
                />
              </div>

              <div className="flex flex-col gap-2 flex-grow">
                <label htmlFor="message" className="text-xs font-SpaceMono-Regular text-zinc-500 uppercase tracking-widest">Message</label>
                <textarea 
                  id="message"
                  required
                  placeholder="Hey, I'd like to discuss a project..."
                  className="w-full h-full min-h-[120px] bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/50 transition-colors font-SpaceMono-Regular text-sm resize-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || isSent}
                className={`mt-2 w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
                  ${isSent 
                    ? "bg-green-500/10 text-green-500 border border-green-500/20" 
                    : "bg-white text-black hover:bg-zinc-200"
                  }
                `}
              >
                {isSubmitting ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : isSent ? (
                  "Message Sent!"
                ) : (
                  <>Send Message <Send size={18} /></>
                )}
              </button>
            </form>
          </div>

          {/* Social Links Stack */}
          <div className="flex flex-col gap-4 h-full">
            {socialLinks.map((social) => (
              <a 
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-1 flex items-center justify-between p-6 md:p-8 rounded-3xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900/80 transition-all"
              >
                <div className="flex flex-col">
                  <span className="font-SpaceGrotesk-VariableFont_wght text-xl font-bold text-white">{social.name}</span>
                  <span className="font-SpaceMono-Regular text-zinc-500 text-sm group-hover:text-zinc-300 transition-colors">{social.label}</span>
                </div>
                <div className="p-3 rounded-full border border-zinc-800 text-zinc-500 group-hover:text-white group-hover:border-white transition-all transform group-hover:-translate-y-1 group-hover:translate-x-1">
                  <ArrowUpRight size={24} />
                </div>
              </a>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}