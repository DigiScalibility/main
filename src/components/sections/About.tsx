import Image from "next/image";
import type { TeamMember } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export function About({ team }: { team: TeamMember[] }) {
  const values = ["Growth", "Product Content", "Passion", "Social Responsibility"];
  return (
    <section id="about" className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              The Team Behind the Tech
            </h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              We are a passionate team of designers, engineers, and marketers
              dedicated to helping businesses succeed in the digital world.
            </p>
            <div className="mt-8 space-y-8">
              {team.map((member) => (
                <div key={member.name} className="flex items-start gap-4">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    data-ai-hint={member.imageHint}
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-headline text-lg font-semibold">{member.name}</h3>
                    <p className="text-primary font-medium">{member.role}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="bg-background p-8 rounded-lg shadow-lg">
                <h3 className="font-headline text-2xl font-bold tracking-tighter">Our Mission</h3>
                <p className="mt-4 text-xl text-muted-foreground font-light">
                “We help businesses grow through exceptional digital experiences and measurable marketing.”
                </p>
                <div className="mt-6">
                    <h4 className="font-headline font-semibold">Our Values</h4>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {values.map(value => (
                            <Badge key={value} variant="secondary" className="text-sm">{value}</Badge>
                        ))}
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
