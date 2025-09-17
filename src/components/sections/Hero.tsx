import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === '7');
  return (
    <section className="relative h-[calc(100vh-4rem)] min-h-[500px] flex items-center justify-center text-center">
      <div className="absolute inset-0 -z-10">
        <Image
          src={heroImage?.imageUrl || "https://images.unsplash.com/photo-1550745165-9bc0b252726a?q=80&w=1920&auto=format&fit=crop"}
          alt="Abstract technology background"
          data-ai-hint={heroImage?.imageHint || 'abstract tech'}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>
      <div className="container relative px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            We build digital experiences that drive growth.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            From performance-driven websites to scalable marketing strategies, we create lasting value for our partners.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-glow">Request a Quote</Button>
            <Button size="lg" variant="outline">
              Book a Call
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
