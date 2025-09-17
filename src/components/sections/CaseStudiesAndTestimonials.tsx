import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { caseStudies, testimonials } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export function CaseStudiesAndTestimonials() {
  return (
    <section id="case-studies" className="py-16 md:py-24">
      <div className="container">
        {/* Case Studies */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Proven Results
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            See how we've helped businesses like yours achieve their goals.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <Card key={study.title} className="overflow-hidden">
              <CardHeader className="p-0">
                <Image
                  src={`https://picsum.photos/seed/${study.image}/600/400`}
                  alt={study.title}
                  data-ai-hint={study.imageHint}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="p-6">
                <h3 className="font-headline text-xl font-semibold">
                  {study.title}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {study.description}
                </p>
                <div className="mt-4">
                  <p className="text-sm font-semibold text-primary">Result:</p>
                  <p className="text-lg font-bold font-headline">{study.result}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Case Study <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-24 text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            We're proud to have partnered with amazing businesses across Australia.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="bg-secondary">
              <CardContent className="p-6">
                <blockquote className="text-lg">
                  "{testimonial.quote}"
                </blockquote>
                <div className="mt-4 text-right">
                  <p className="font-semibold font-headline">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.company}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
