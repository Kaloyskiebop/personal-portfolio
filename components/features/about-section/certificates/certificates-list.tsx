import { Award, Calendar, ExternalLink } from "lucide-react";
import Image from "next/image";

export default function CertificatesList() {
  const certificates = [
    {
      title: "Operating Systems Basics",
      issuer: "Cisco Networking Academy",
      date: "2025",
      image: "/certificates/operating-systems.jpg", 
      description: "Core concepts of OS, virtualization, and basic administration.",
      link: "#"
    },
    {
      title: "Computer Hardware Basics",
      issuer: "Cisco Networking Academy",
      date: "2025",
      image: "/certificates/computer-hardware.jpg", 
      description: "PC assembly, safety protocols, and hardware troubleshooting.",
      link: "#"
    },
    {
      title: "Information Management",
      issuer: "Codechum",
      date: "2025",
      image: "/certificates/codechum-cert.png", 
      description: "Covers organizing, storing, and retrieving information and data.",
      link: "#"
    },
    {
      title: "Gemini Certified Student",
      issuer: "Google",
      date: "2025",
      image: "/certificates/gemini-certificate.jpg", 
      description: "Successfully demonstrated the knowledge, skills, and basic competencies required to effectively use Google AI tools.",
      link: "#"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {certificates.map((cert, index) => (
        <div 
          key={index} 
          className="group relative flex flex-col overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-colors"
        >
          {/* 1. Certificate Image Area */}
          <div className="relative h-48 w-full overflow-hidden bg-zinc-950">
             {/* The Image */}
             <Image
               src={cert.image}
               alt={cert.title}
               fill
               className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
             />
             
             {/* Gradient Overlay (Makes text pop if you put text over image, adds depth) */}
             <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-transparent to-transparent opacity-90" />
             
             {/* Floating Icon Badge */}
             <div className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md rounded-xl border border-white/10 text-white">
                <Award size={20} />
             </div>
          </div>

          {/* 2. Details Section */}
          <div className="p-6 relative">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="font-SpaceGrotesk-VariableFont_wght text-xl font-bold text-white mb-1">
                        {cert.title}
                    </h3>
                    <p className="font-SpaceMono-Regular text-xs text-zinc-400">
                        Issued by <span className="text-zinc-200">{cert.issuer}</span>
                    </p>
                </div>
                
                {/* Date Tag */}
                <span className="shrink-0 flex items-center gap-1.5 rounded-full bg-zinc-800 px-3 py-1 text-[10px] font-SpaceMono-Regular text-zinc-400 border border-zinc-700">
                    <Calendar size={12} />
                    {cert.date}
                </span>
            </div>
            
            <p className="font-SpaceMono-Regular text-sm text-zinc-500 leading-relaxed mb-6">
              {cert.description}
            </p>

            {/* View Button */}
            <a 
                href={cert.link} 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-zinc-300 transition-colors uppercase tracking-wider"
            >
                View Credential <ExternalLink size={12} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}