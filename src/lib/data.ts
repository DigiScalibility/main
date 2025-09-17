import { db } from './firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { PlaceHolderImages } from './placeholder-images';

export type Service = {
  icon: string;
  title: string;
  description: string;
  benefits: string[];
  pricing: string;
  timeline: string;
};

export type Plan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
};

export type CaseStudy = {
  image: string;
  title: string;
  description: string;
  result: string;
  imageHint: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  company: string;
};

export type TeamMember = {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  imageHint: string;
};

export const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#case-studies", label: "Case Studies" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export const staticServices: Service[] = [
  {
    icon: 'Code',
    title: "Website Development",
    description: "Next.js or Webflow builds with CMS, analytics, SEO, performance & accessibility pass.",
    benefits: [
      "Blazing-fast performance",
      "Easy content management",
      "Optimised for conversions",
    ],
    pricing: "From $7k",
    timeline: "4-8 weeks",
  },
  {
    icon: 'Search',
    title: "SEO & Site Audits",
    description: "Technical audits, content strategy, link building, research & briefs, digital PR outreach.",
    benefits: [
      "Increase organic traffic",
      "Outrank your competitors",
      "Actionable audit reports",
    ],
    pricing: "From $4k/mo",
    timeline: "Monthly",
  },
  {
    icon: 'Megaphone',
    title: "Social Media & Content",
    description: "On-brand creative, community management, content calendars.",
    benefits: [
      "Grow your audience",
      "Boost brand engagement",
      "Data-driven content strategy",
    ],
    pricing: "From $3.5k/mo",
    timeline: "Monthly",
  },
  {
    icon: 'LineChart',
    title: "Digital Marketing",
    description: "Full-funnel paid media, email & SMS, CRO experiments.",
    benefits: [
      "Maximise your ROI",
      "Targeted ad campaigns",
      "Continuous optimisation",
    ],
    pricing: "From $6k/mo",
    timeline: "Monthly",
  },
  {
    icon: 'Users',
    title: "Lead Generation",
    description: "Outbound B2B campaigns with ICP messaging, sequencing, CRM integration.",
    benefits: [
      "Fill your sales pipeline",
      "High-quality lead scoring",
      "Automated outreach",
    ],
    pricing: "From $8k/qtr",
    timeline: "Quarterly",
  },
  {
    icon: 'BarChart2',
    title: "Analytics & CRO",
    description: "GA4 setup, server events, KPI dashboards, AB & UX research.",
    benefits: [
      "Data-backed decisions",
      "Improve conversion rates",
      "Understand user behaviour",
    ],
    pricing: "From $3k/mo",
    timeline: "Monthly",
  },
];

async function fetchCollection<T>(collectionName: string, fallbackData: T[], orderByField?: string): Promise<T[]> {
  try {
    const coll = collection(db, collectionName);
    const q = orderByField ? query(coll, orderBy(orderByField)) : coll;
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      console.log(`No documents found in '${collectionName}', using static data.`);
      return fallbackData;
    }
    return snapshot.docs.map(doc => doc.data() as T);
  } catch (error) {
    console.error(`Error fetching '${collectionName}' from Firestore: `, error);
    return fallbackData; // Fallback to static data on error
  }
}

export async function getServices(): Promise<Service[]> {
  return fetchCollection<Service>('services', staticServices, 'title');
}

const staticPlans: Plan[] = [
  {
    name: "Launch",
    price: "$7k",
    period: "/mo",
    description: "Best for startups and new businesses shipping v1 of their product. Get to market quickly and efficiently.",
    features: [
      "Website Build (up to 8 pages)",
      "SEO Basics Setup",
      "Analytics & Tagging Setup",
      "1 Growth Channel (e.g., Google Ads)",
    ],
    cta: "Choose Plan",
    popular: false,
  },
  {
    name: "Scale",
    price: "$12k",
    period: "/mo",
    description: "For established teams aiming for product-market fit and accelerated growth. A comprehensive digital partnership.",
    features: [
      "Full Website & CMS",
      "Comprehensive SEO & Content Strategy",
      "Paid Marketing (2+ channels)",
      "Conversion Rate Optimisation Program",
      "Monthly Growth Reporting",
    ],
    cta: "Choose Plan",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organisations requiring advanced security, custom integrations, and dedicated support.",
    features: [
      "Advanced Security & SSO",
      "Custom Feature Roadmaps",
      "Procurement-Ready Documentation",
      "Dedicated Account Manager & SLAs",
      "Advanced Analytics & BI",
    ],
    cta: "Talk to Sales",
    popular: false,
  },
];

export async function getPlans(): Promise<Plan[]> {
    return fetchCollection<Plan>('plans', staticPlans, 'name');
}

export const howItWorks = [
    {
        step: 1,
        title: "Discovery",
        description: "We dive deep into your business goals, target audience, and success metrics to build a solid foundation."
    },
    {
        step: 2,
        title: "Strategy",
        description: "We craft a data-driven roadmap, defining key channels, milestones, and a clear path to success."
    },
    {
        step: 3,
        title: "Build",
        description: "Our team designs, develops, and implements your project with precision, ensuring robust tracking is in place."
    },
    {
        step: 4,
        title: "Optimise",
        description: "We continuously run experiments and iterate based on performance data to maximise your results."
    }
]

const staticCaseStudies: CaseStudy[] = [
    {
        image: PlaceHolderImages.find(p => p.id === '1')?.imageUrl || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
        title: "SaaS Website Revamp",
        description: "A complete overhaul of a B2B SaaS platform's marketing site to improve user journey and conversion rates.",
        result: "10x signup conversions",
        imageHint: "dashboard analytics"
    },
    {
        image: PlaceHolderImages.find(p => p.id === '2')?.imageUrl || "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=600&auto=format&fit=crop",
        title: "eCommerce Growth Engine",
        description: "Implemented a full-funnel marketing strategy for a D2C brand, combining SEO, paid social, and email.",
        result: "250% ROI in 6 months",
        imageHint: "online shopping"
    },
    {
        image: PlaceHolderImages.find(p => p.id === '3')?.imageUrl || "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=600&auto=format&fit=crop",
        title: "B2B Pipeline Boost",
        description: "Developed a targeted lead generation campaign that filled the sales pipeline with qualified opportunities.",
        result: "+$2M pipeline value",
        imageHint: "business meeting"
    }
]

export async function getCaseStudies(): Promise<CaseStudy[]> {
    return fetchCollection<CaseStudy>('caseStudies', staticCaseStudies, 'title');
}

const staticTestimonials: Testimonial[] = [
    {
        quote: "DigiScalibity transformed our online presence. Their strategic approach to SEO and content doubled our organic traffic in just a few months.",
        name: "Sarah Jones",
        company: "CEO of InnovateTech"
    },
    {
        quote: "The new website is not only beautiful but also incredibly fast. We've seen a significant increase in user engagement and lead quality.",
        name: "Michael Chen",
        company: "Founder of AussieGoods"
    },
    {
        quote: "Working with their team was a breeze. They are true experts in digital marketing and delivered results that exceeded our expectations.",
        name: "David Smith",
        company: "Marketing Director at ScaleUp"
    }
]

export async function getTestimonials(): Promise<Testimonial[]> {
    return fetchCollection<Testimonial>('testimonials', staticTestimonials, 'name');
}

const staticTeam: TeamMember[] = [
    {
        name: "Abbas",
        role: "Founder & Lead Engineer",
        avatar: PlaceHolderImages.find(p => p.id === '4')?.imageUrl || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop",
        bio: "With over a decade of experience in software engineering, Abbas leads our technical vision and ensures every project is built to the highest standards.",
        imageHint: "man portrait"
    },
    {
        name: "Hamza",
        role: "Head of Marketing",
        avatar: PlaceHolderImages.find(p => p.id === '5')?.imageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
        bio: "Hamza is a data-driven marketer who excels at creating growth strategies that deliver a measurable impact and significant ROI for our clients.",
        imageHint: "man portrait smiling"
    },
    {
        name: "Zain",
        role: "Operations Lead",
        avatar: PlaceHolderImages.find(p => p.id === '6')?.imageUrl || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
        bio: "Zain keeps the wheels turning, managing projects, and ensuring seamless communication and delivery from start to finish.",
        imageHint: "woman portrait"
    }
]

export async function getTeam(): Promise<TeamMember[]> {
    return fetchCollection<TeamMember>('team', staticTeam, 'name');
}


export const footerLinks = {
    company: [
        { href: "#services", label: "Services" },
        { href: "#case-studies", label: "Case Studies" },
        { href: "#about", label: "About" },
        { href: "#contact", label: "Contact" },
    ],
    resources: [
        { href: "/blog", label: "Blog" },
        { href: "/guides", label: "Guides" },
        { href: "/faqs", label: "FAQs" },
    ]
}

export type ContactMessage = {
    name: string;
    email: string;
    company?: string;
    budget?: string;
    timeline?: string;
    projectDetails: string;
    adjustedProjectDetails?: string;
    createdAt: Date;
}
