import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Plans } from "@/components/sections/Plans";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { CtaSection } from "@/components/sections/CtaSection";
import { CaseStudiesAndTestimonials } from "@/components/sections/CaseStudiesAndTestimonials";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { getServices } from "@/lib/data";

export default async function Home() {
  const services = await getServices();
  return (
    <>
      <Hero />
      <Services services={services} />
      <Plans />
      <HowItWorks />
      <CaseStudiesAndTestimonials />
      <About />
      <CtaSection />
      <Contact />
    </>
  );
}
