import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { plans } from "@/lib/data";
import { Check } from "lucide-react";

export function Plans() {
  return (
    <section id="plans" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Bundled for Growth
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Choose a plan that scales with you. From launching your first
            product to enterprise-level demands.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-3 items-start">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`flex flex-col ${
                plan.popular ? "border-primary shadow-primary/20 shadow-lg" : ""
              }`}
            >
              <CardHeader>
                {plan.popular && (
                  <Badge
                    variant="default"
                    className="absolute -top-4 right-6 bg-primary"
                  >
                    Most Popular
                  </Badge>
                )}
                <CardTitle className="font-headline text-2xl">{plan.name}</CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold font-headline">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
