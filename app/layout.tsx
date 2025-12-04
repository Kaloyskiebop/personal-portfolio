import type { Metadata } from "next";
import localFont from "next/font/local"; 
import "./globals.css";
import Navbar from "@/components/layout/navbar";

// 1. Load Space Grotesk (Variable Font)
// This handles all weights (Bold, Light, Regular) automatically
const spaceGrotesk = localFont({
  src: "./fonts/SpaceGrotesk-VariableFont_wght.ttf", 
  display: "swap",
  variable: "--font-grotesk", 
});

// 2. Load Space Mono (Static Files)
// We map the specific files to their weights
const spaceMono = localFont({
  src: [
    {
      path: "./fonts/SpaceMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/SpaceMono-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/SpaceMono-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Built with Next.js and Tailwind",
  icons: {
    icon: "/code.png",
    shortcut: "/code.png",
    apple: "/code.png"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={`
          ${spaceGrotesk.className} 
          ${spaceMono.variable} 
          bg-zinc-950 
          antialiased 
          text-white
        `}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}