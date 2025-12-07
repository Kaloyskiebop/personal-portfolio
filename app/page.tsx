import Image from "next/image";
import Hero from "../components/features/home-section/hero-banner";
import About from "../components/features/about-section/about"
import Journal from "@/components/features/journal-section/journal";
import Contacts from "@/components/features/contacts-section/contacts";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-zinc-950">
      <section id="home"><Hero/></section>
      <section id="about"><About/></section>
      <section id="journal"><Journal/></section>
      {/* <section id="contacts"><Contacts/></section> */}
      {/* You can add <About /> or <Projects /> here later */}
    </main>
  );
}
