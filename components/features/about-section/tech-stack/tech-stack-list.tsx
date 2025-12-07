import React from "react";
import Image from "next/image";

export default function TechStackList() {
  const technologies = [
    { name: "HTML5", icon: "/logos/html-logo.svg" },
    { name: "CSS3", icon: "/logos/css-logo.svg" },
    { name: "JavaScript", icon: "/logos/javascript-logo.svg" },
    { name: "Java", icon: "/logos/java-logo.svg" },
    { name: "C++", icon: "/logos/cpp-logo.svg" },
    { name: "Tailwind", icon: "/logos/tailwindcss-logo.svg" },
  ];

  return (
    <div className="flex flex-wrap gap-4 overflow-y-auto scrollbar-hide p-2">
      {technologies.map((tech, index) => (
        <div 
          key={tech.name} 
          className="flex flex-col items-center justify-center p-3 rounded-xl border border-zinc-800 bg-zinc-900/20 animate-float"
          title={tech.name}
          // Stagger the animation so they don't all move at once
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <div className="relative w-8 h-8">
            <Image 
                src={tech.icon}
                alt={tech.name}
                fill
                className="object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
}