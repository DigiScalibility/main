import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Service } from "@/lib/data";
import { CheckCircle } from "lucide-react";
import * as LucideIcons from "lucide-react";

type IconName = keyof typeof LucideIcons;

const IconComponent = ({ name }: { name: string }) => {
  const LucideIcon = LucideIcons[name as IconName] as React.FC<React.SVGProps<SVGSVGElement>>;
  if (!LucideIcon) {
    return <LucideIcons.HelpCircle className="h-6 w-6 text-primary service-icon transition-transform duration-300" />;
  }
  return <LucideIcon className="h-6 w-6 text-primary service-icon transition-transform duration-300" />;
};


export function Services({ services }: { services: Service[] }) {
  return (
    <section id="services" className="py-16 md:py-24 bg-background/30">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Our Digital Services
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            A suite of solutions designed to launch, scale, and optimise your
            digital presence.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.title}
              className="flex flex-col bg-background/50 card"
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                     <IconComponent name={service.icon} />
                  </div>
                  <CardTitle className="font-headline text-xl">
                    {service.title}
                  </CardTitle>
                </div>
                <CardDescription className="pt-2">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex justify-between items-baseline font-headline">
                    <span className="text-sm text-muted-foreground">{service.timeline}</span>
                    <span className="text-2xl font-bold">{service.pricing}</span>
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button variant="outline" className="w-full btn">Learn More</Button>
                <Button className="w-full btn">Get Started</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
