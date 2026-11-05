import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { DeveloperPresence } from "@/components/sections/DeveloperPresence";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { PersonJsonLd } from "@/components/seo/PersonJsonLd";

export default function Home() {
  return (
    <>
      <PersonJsonLd />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <DeveloperPresence />
        <Contact />
      </main>
    </>
  );
}
