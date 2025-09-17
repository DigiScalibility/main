import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Plans } from "@/components/sections/Plans";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { CtaSection } from "@/components/sections/CtaSection";
import { CaseStudiesAndTestimonials } from "@/components/sections/CaseStudiesAndTestimonials";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Plans />
      <HowItWorks />
      <CaseStudiesAndTestimonials />
      <About />
      <CtaSection />
      <Contact />
    </>
  );
}
