import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative h-[calc(100vh-4rem)] min-h-[500px] flex items-center justify-center text-center">
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726a?q=80&w=1920&auto=format&fit=crop"
          alt="Abstract technology background"
          data-ai-hint="abstract tech"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>
      <div className="container relative px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Building the digital backbone for tomorrow's businesses
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            We deliver performance-focused design, development, and marketing solutions that drive growth and create lasting value for our partners.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Request a Quote</Button>
            <Button size="lg" variant="outline">
              Book a Call
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
