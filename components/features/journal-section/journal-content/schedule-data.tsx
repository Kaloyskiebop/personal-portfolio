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
          image: "/events/educational-tour/pldt/pldt-image.jpg", 
          note: "Observed network operations center and learned about fiber optic infrastructure management.",
          observation: "/events/educational-tour/pldt/pldt-observation.jpg",
          galleryId: "pldt-site"
        },
        {
          name: "Vitro Data Center",
          image: "/events/educational-tour/vitro/vitro-image.png", 
          note: "Toured the state-of-the-art server facilities, focusing on rack management, cooling systems, and physical security protocols.",
          observation: "/events/educational-tour/vitro/vitro-observation.jpg",
          galleryId: "vitro-data-center"
        }
      ]
    },
    {
      period: "Lunch",
      title: "Lunch",
      icon: <Utensils size={20} />,
      color: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      description: "Buffet lunch at Vikings, just enjoying good food and having fun with classmates.",
      locations: [
        {
          name: "Vikings Buffet",
          image: "/events/educational-tour/vikings/vikings-image.jpg", 
          note: "Enjoyed a hearty meal while discussing with fellow students.",
          galleryId: "vikings-buffet"
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
          image: "/events/educational-tour/jairosoft/jairosoft-image.jpg", 
          note: "Gained insight into agile software development workflows and client management.",
          observation: "/events/educational-tour/jairosoft/jairosoft-observation.jpg",
          galleryId: "jairosoft-inc"
        },
        {
          name: "CDRRMO Office",
          image: "/events/educational-tour/cdrrmo/cdrrmo-image.jpg", 
          note: "Observed how technology is utilized in disaster risk reduction and management.",
          observation: "/events/educational-tour/cdrrmo/cdrrmo-observation.jpg",
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