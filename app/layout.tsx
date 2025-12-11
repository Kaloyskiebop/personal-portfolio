import type { Metadata } from "next";
import localFont from "next/font/local"; 
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

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
  title: "Reviz Portfolio",
  description: "All Prompt No Cap",
  icons: {
    icon: "/dev.png",
    shortcut: "/dev.png",
    apple: "/dev.png"
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
        <Footer />
      </body>
    </html>
  );
}