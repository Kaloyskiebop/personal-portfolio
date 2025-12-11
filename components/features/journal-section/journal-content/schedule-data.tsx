import { Sun, Utensils, Building2, Code, Users, Mic } from "lucide-react";

// Define interfaces for type safety
export interface ScheduleLocation {
  name: string;
  image: string;
  note: string;
  observation?: string;
  galleryId?: string; // Optional field
}

export interface ScheduleItem {
  period: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  locations: ScheduleLocation[];
}

export const eventSchedules: Record<string, ScheduleItem[]> = {
  // Key matches the 'id' in timeline-data.ts
  "edu-tour-2025": [
    {
      period: "Morning",
      title: "Industry Immersion",
      icon: <Sun size={20} />,
      color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      description: "Visited key technology infrastructures to understand enterprise-level operations.",
      locations: [
        {
          name: "PLDT Inc.",
          image: "/hero-banner.png", 
          note: "Observed network operations center and learned about fiber optic infrastructure management.",
          observation: "/observations/pldt-notes.jpg",
          galleryId: "pldt-site"
        },
        {
          name: "Vitro Data Center",
          image: "/hero-banner.png", 
          note: "Toured the state-of-the-art server facilities, focusing on rack management, cooling systems, and physical security protocols.",
          observation: "/observations/vitro-notes.jpg",
          galleryId: "vitro-data-center"
        }
      ]
    },
    {
      period: "Lunch",
      title: "Networking Lunch",
      icon: <Utensils size={20} />,
      color: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      description: "Buffet lunch at Vikings, providing an opportunity to network with peers and mentors.",
      locations: [
        {
          name: "Vikings Buffet",
          image: "/hero-banner.png", 
          note: "Enjoyed a hearty meal while discussing industry trends with fellow developers."
        }
      ]
    },
    {
      period: "Afternoon",
      title: "Company Visits",
      icon: <Building2 size={20} />,
      color: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      description: "Explore software development environments and disaster management operations.",
      locations: [
        {
          name: "Jairosoft Inc.",
          image: "/hero-banner.png", 
          note: "Gained insight into agile software development workflows and client management.",
          observation: "/observations/jairosoft-notes.jpg",
          galleryId: "jairosoft-inc"
        },
        {
          name: "CDRRMO Office",
          image: "/hero-banner.png", 
          note: "Observed how technology is utilized in disaster risk reduction and management.",
          observation: "/observations/cdrrmo-notes.jpg",
          galleryId: "cdrrmo-office"
        }
      ]
    }
  ],

  // Placeholder for DevFest - You can fill this in!
  "devfest-2025": [
    {
      period: "All Day",
      title: "Conference Sessions",
      icon: <Mic size={20} />,
      color: "bg-green-500/10 text-green-400 border-green-500/20",
      description: "Attended various tech talks and workshops.",
      locations: [
        {
          name: "Main Hall",
          image: "/hero-banner.png",
          note: "Keynote on the future of AI."
        }
      ]
    }
  ]
};