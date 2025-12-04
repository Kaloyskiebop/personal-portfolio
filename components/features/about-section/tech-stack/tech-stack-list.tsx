import React from "react";
import Image from "next/image";

export default function TechStackList() {
  const technologies = [
    {
      name: "HTML5",
      icon: "/logos/html-logo.svg",
      className: "grayscale group-hover:grayscale-0", 
    },
    {
      name: "CSS3",
      icon: "/logos/css-logo.svg",
      className: "grayscale group-hover:grayscale-0",
    },
    {
      name: "JavaScript",
      icon: "/logos/javascript-logo.svg",
      className: "grayscale group-hover:grayscale-0",
    },
    {
      name: "Java",
      icon: "/logos/java-logo.svg",
      className: "grayscale group-hover:grayscale-0",
    },
    {
      name: "C++",
      icon: "/logos/cpp-logo.svg",
      className: "grayscale group-hover:grayscale-0",
    },
    {
      name: "Tailwind",
      icon: "/logos/tailwindcss-logo.svg",
      className: "grayscale group-hover:grayscale-0",
    },
  ];

  return (
    <div className="flex flex-wrap gap-4 overflow-y-auto scrollbar-hide p-1">
      {technologies.map((tech) => (
        <div 
          key={tech.name} 
          // UPDATED STYLES:
          // border-transparent: Hides border by default
          // hover:bg-zinc-800/50: Adds subtle background ONLY on hover
          // hover:border-zinc-700: Adds border ONLY on hover
          className="group flex flex-col items-center justify-center p-3 rounded-xl border border-transparent hover:border-zinc-700 hover:bg-zinc-800/50 transition-all duration-300 hover:scale-110"
          title={tech.name}
        >
          {/* Container for Next.js Image */}
          <div className="relative w-8 h-8 transition-colors">
            <Image 
                src={tech.icon}
                alt={tech.name}
                fill
                className={`object-contain transition-all duration-300 ${tech.className}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}