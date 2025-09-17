import { howItWorks } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Our Proven Process
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            We follow a structured, agile process to ensure your project is a
            resounding success.
          </p>
        </div>
        <div className="relative mt-12">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 hidden md:block"></div>
            <div className="grid gap-8 md:grid-cols-4">
            {howItWorks.map((step) => (
                <div key={step.step} className="relative">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold font-headline text-xl mx-auto md:mb-4">
                        {step.step}
                    </div>
                    <div className="text-center mt-4">
                        <h3 className="font-headline text-xl font-semibold">{step.title}</h3>
                        <p className="mt-2 text-muted-foreground">{step.description}</p>
                    </div>
                </div>
            ))}
            </div>
        </div>
      </div>
    </section>
  );
}
