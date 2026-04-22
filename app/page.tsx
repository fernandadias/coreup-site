import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { ForWho } from "@/components/ForWho";
import { Story } from "@/components/Story";
import { Pillars } from "@/components/Pillars";
import { Process } from "@/components/Process";
import { UseCases } from "@/components/UseCases";
import { AppShowcase } from "@/components/AppShowcase";
import { Pricing } from "@/components/Pricing";
import { DiagnosticForm } from "@/components/DiagnosticForm";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <ForWho />
        <Story />
        {/* <Pillars /> */}
        {/* <Process /> */}
        <UseCases />
        <AppShowcase />
        <Pricing />
        <DiagnosticForm />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
