import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Plans } from "@/components/sections/Plans";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { CtaSection } from "@/components/sections/CtaSection";
import { CaseStudiesAndTestimonials } from "@/components/sections/CaseStudiesAndTestimonials";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { getServices, getPlans, getCaseStudies, getTestimonials, getTeam } from "@/lib/data";

export default async function Home() {
  const services = await getServices();
  const plans = await getPlans();
  const caseStudies = await getCaseStudies();
  const testimonials = await getTestimonials();
  const team = await getTeam();

  return (
    <>
      <Hero />
      <Services services={services} />
      <Plans plans={plans} />
      <HowItWorks />
      <CaseStudiesAndTestimonials caseStudies={caseStudies} testimonials={testimonials} />
      <About team={team} />
      <CtaSection />
      <Contact />
    </>
  );
}
