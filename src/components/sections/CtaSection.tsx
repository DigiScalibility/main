import { Button } from "@/components/ui/button";

export function CtaSection() {
    return (
        <section className="py-16 md:py-24">
            <div className="container">
                <div className="bg-secondary p-8 md:p-12 rounded-lg text-center">
                    <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                        Ready to Accelerate Your Growth?
                    </h2>
                    <p className="mt-4 text-muted-foreground md:text-lg max-w-2xl mx-auto">
                        Book a free 20-minute intro call. We'll discuss your goals and show you how we can create a tailored plan to get you there.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg">Book a Call</Button>
                        <Button size="lg" variant="outline">
                        Request a Quote
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
