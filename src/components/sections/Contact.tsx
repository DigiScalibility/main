"use client";

import { useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
  Loader,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { adjustProjectDetailsTone } from "@/ai/flows/adjust-project-details-tone";
import { saveContactMessage } from "@/ai/flows/save-contact-message";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  projectDetails: z
    .string()
    .min(10, { message: "Please provide some details about your project." }),
});

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAiAdjusting, setIsAiAdjusting] = useState(false);
  const [originalDetails, setOriginalDetails] = useState<string | undefined>(undefined);
  const mapImage = PlaceHolderImages.find(p => p.id === '8');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      projectDetails: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const adjustedDetails = values.projectDetails;
      
      await saveContactMessage({
        ...values,
        createdAt: new Date(),
        adjustedProjectDetails: (originalDetails && originalDetails !== adjustedDetails) ? adjustedDetails : undefined,
        projectDetails: (originalDetails && originalDetails !== adjustedDetails) ? originalDetails : adjustedDetails,
      });

      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. We'll get back to you shortly.",
      });
      form.reset();
      setOriginalDetails(undefined);
    } catch (error) {
      console.error("Failed to send message:", error);
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: "Could not send your message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleAdjustTone() {
    const currentDetails = form.getValues("projectDetails");
    if (!currentDetails || currentDetails.length < 10) {
      toast({
        variant: "destructive",
        title: "Not enough text",
        description: "Please write a few more details before using AI.",
      });
      return;
    }

    setIsAiAdjusting(true);
    if (!originalDetails) {
      setOriginalDetails(currentDetails);
    }
    try {
      const result = await adjustProjectDetailsTone({
        projectDetails: currentDetails,
      });
      form.setValue("projectDetails", result.adjustedProjectDetails, { shouldValidate: true });
      toast({
        title: "Tone Adjusted!",
        description: "Your project details have been refined by our AI.",
      });
    } catch (error) {
      console.error("AI tone adjustment failed:", error);
      toast({
        variant: "destructive",
        title: "AI Error",
        description: "Could not adjust the tone. Please try again.",
      });
    } finally {
      setIsAiAdjusting(false);
    }
  }

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Let's Build Together
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Have a project in mind? Fill out the form or contact us directly.
          </p>
        </div>
        <div className="mt-12 grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h3 className="font-headline text-lg font-semibold">
                Contact Information
              </h3>
              <div className="mt-4 space-y-3 text-muted-foreground">
                <a
                  href="mailto:contact@digiscalibity.com"
                  className="flex items-center gap-3 hover:text-primary"
                >
                  <Mail className="h-5 w-5" />
                  <span>contact@digiscalibity.com</span>
                </a>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5" />
                  <span>+61 400 000 000</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5" />
                  <span>Sydney, Australia</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-headline text-lg font-semibold">
                Follow Us
              </h3>
              <div className="mt-4 flex space-x-4 text-muted-foreground">
                <a href="#" className="hover:text-primary"><Linkedin /></a>
                <a href="#" className="hover:text-primary"><Twitter /></a>
                <a href="#" className="hover:text-primary"><Instagram /></a>
              </div>
            </div>
            <div>
                <Image
                    src={mapImage?.imageUrl || "https://images.unsplash.com/photo-1541443914731-d580d8457def?q=80&w=600&auto=format&fit=crop"}
                    alt="Map showing office location"
                    data-ai-hint={mapImage?.imageHint || 'city map'}
                    width={600}
                    height={400}
                    className="rounded-lg w-full aspect-video object-cover"
                />
            </div>
          </div>
          <div className="md:col-span-3">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="you@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Company Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget Range (AUD)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a budget" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="<5k">Under $5,000</SelectItem>
                          <SelectItem value="5-10k">$5k - $10k</SelectItem>
                          <SelectItem value="10-25k">$10k - $25k</SelectItem>
                          <SelectItem value="25-50k">$25k - $50k</SelectItem>
                          <SelectItem value="50k+">$50k+</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="timeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Timeline (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 3-6 months" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </div>
                <FormField
                  control={form.control}
                  name="projectDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your project, goals, and any specific requirements."
                          rows={6}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAdjustTone}
                    disabled={isAiAdjusting || isSubmitting}
                    className="btn"
                  >
                    {isAiAdjusting ? (
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="mr-2 h-4 w-4 text-accent" />
                    )}
                    Adjust Tone with AI
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="btn">
                    {isSubmitting && (
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Send Message
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
