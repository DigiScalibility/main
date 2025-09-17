import { db } from './firebase';
import { collection, getDocs, orderBy, query, limit as firestoreLimit, where } from 'firebase/firestore';
import { PlaceHolderImages } from './placeholder-images';
import { Timestamp } from 'firebase/firestore';

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
  name:string;
  company: string;
};

export type TeamMember = {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  imageHint: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  author: string;
  publishedAt: Timestamp;
  summary: string;
  content: string;
  tags: string[];
  imageUrl: string;
  imageHint: string;
};


export const navLinks = [
  { href: "#services", label: "Services" },
  { href: "/blog", label: "Blog"},
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

async function fetchCollection<T>(collectionName: string, fallbackData: T[], options?: { orderByField?: string; limit?: number }): Promise<T[]> {
  // Temporarily disable Firestore fetching to avoid permission errors
  // Once the Firestore API is enabled in the Google Cloud Console, this can be restored.
  const useStaticData = false; 
  if (useStaticData || typeof window !== 'undefined') {
    if (options?.limit) {
      return fallbackData.slice(0, options.limit);
    }
    return fallbackData;
  }
  
  try {
    let q = query(collection(db, collectionName));
    
    if (options?.orderByField) {
      q = query(q, orderBy(options.orderByField, 'desc'));
    }
    if (options?.limit) {
      q = query(q, firestoreLimit(options.limit));
    }

    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      console.log(`No documents found in '${collectionName}', using static data.`);
      if (options?.limit) {
        return fallbackData.slice(0, options.limit);
      }
      return fallbackData;
    }
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
    
    // Image placeholder logic...
    if (collectionName === 'caseStudies') {
      (data as unknown as CaseStudy[]).forEach((item, index) => {
        const placeholder = PlaceHolderImages.find(p => p.id === `${index + 1}`);
        if (placeholder) item.image = placeholder.imageUrl;
      });
    }
     if (collectionName === 'team') {
       (data as unknown as TeamMember[]).forEach((item, index) => {
        const placeholder = PlaceHolderImages.find(p => p.id === `${index + 4}`);
        if (placeholder) item.avatar = placeholder.imageUrl;
      });
    }

    return data;
  } catch (error) {
    console.error(`Error fetching '${collectionName}' from Firestore: `, error);
    if (options?.limit) {
      return fallbackData.slice(0, options.limit);
    }
    return fallbackData;
  }
}

export async function getServices(): Promise<Service[]> {
  return fetchCollection<Service>('services', staticServices);
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
    return fetchCollection<Plan>('plans', staticPlans);
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
        image: PlaceHolderImages.find(p => p.id === '1')?.imageUrl || "",
        title: "SaaS Website Revamp",
        description: "A complete overhaul of a B2B SaaS platform's marketing site to improve user journey and conversion rates.",
        result: "10x signup conversions",
        imageHint: PlaceHolderImages.find(p => p.id === '1')?.imageHint || "dashboard analytics"
    },
    {
        image: PlaceHolderImages.find(p => p.id === '2')?.imageUrl || "",
        title: "eCommerce Growth Engine",
        description: "Implemented a full-funnel marketing strategy for a D2C brand, combining SEO, paid social, and email.",
        result: "250% ROI in 6 months",
        imageHint: PlaceHolderImages.find(p => p.id === '2')?.imageHint || "online shopping"
    },
    {
        image: PlaceHolderImages.find(p => p.id === '3')?.imageUrl || "",
        title: "B2B Pipeline Boost",
        description: "Developed a targeted lead generation campaign that filled the sales pipeline with qualified opportunities.",
        result: "+$2M pipeline value",
        imageHint: PlaceHolderImages.find(p => p.id === '3')?.imageHint || "business meeting"
    }
]

export async function getCaseStudies(): Promise<CaseStudy[]> {
    return fetchCollection<CaseStudy>('caseStudies', staticCaseStudies);
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
    return fetchCollection<Testimonial>('testimonials', staticTestimonials);
}

const staticTeam: TeamMember[] = [
    {
        name: "Abbas",
        role: "Founder & Lead Engineer",
        avatar: PlaceHolderImages.find(p => p.id === '4')?.imageUrl || "",
        bio: "With over a decade of experience in software engineering, Abbas leads our technical vision and ensures every project is built to the highest standards.",
        imageHint: PlaceHolderImages.find(p => p.id === '4')?.imageHint || "man portrait"
    },
    {
        name: "Hamza",
        role: "Head of Marketing",
        avatar: PlaceHolderImages.find(p => p.id === '5')?.imageUrl || "",
        bio: "Hamza is a data-driven marketer who excels at creating growth strategies that deliver a measurable impact and significant ROI for our clients.",
        imageHint: PlaceHolderImages.find(p => p.id === '5')?.imageHint || "man portrait smiling"
    },
    {
        name: "Zain",
        role: "Operations Lead",
        avatar: PlaceHolderImages.find(p => p.id === '6')?.imageUrl || "",
        bio: "Zain keeps the wheels turning, managing projects, and ensuring seamless communication and delivery from start to finish.",
        imageHint: PlaceHolderImages.find(p => p.id === '6')?.imageHint || "woman portrait"
    }
]

export async function getTeam(): Promise<TeamMember[]> {
    return fetchCollection<TeamMember>('team', staticTeam);
}

const staticBlogPosts: BlogPost[] = [
    {
        id: '1',
        title: 'The Future of Headless Commerce',
        slug: 'future-of-headless-commerce',
        author: 'Hamza',
        publishedAt: Timestamp.fromDate(new Date('2024-05-15T10:00:00Z')),
        summary: 'Exploring the shift towards headless architecture and what it means for e-commerce.',
        content: 'Full markdown content here...',
        tags: ['e-commerce', 'headless', 'tech'],
        imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=600&auto=format&fit=crop',
        imageHint: 'online payment terminal'
    },
    {
        id: '2',
        title: 'Maximising ROI with Programmatic SEO',
        slug: 'programmatic-seo-roi',
        author: 'Zain',
        publishedAt: Timestamp.fromDate(new Date('2024-05-10T14:30:00Z')),
        summary: 'A deep dive into how programmatic SEO can scale your content strategy and drive organic growth.',
        content: 'Full markdown content here...',
        tags: ['seo', 'marketing', 'growth'],
        imageUrl: 'https://images.unsplash.com/photo-1554629947-334ff61d85dc?q=80&w=600&auto=format&fit=crop',
        imageHint: 'mountain landscape'
    },
    {
        id: '3',
        title: 'Core Web Vitals: A Practical Guide',
        slug: 'core-web-vitals-guide',
        author: 'Abbas',
        publishedAt: Timestamp.fromDate(new Date('2024-05-01T09:00:00Z')),
        summary: 'Understand and optimise for Google\'s Core Web Vitals to improve user experience and search rankings.',
        content: 'Full markdown content here...',
        tags: ['seo', 'performance', 'webdev'],
        imageUrl: 'https://images.unsplash.com/photo-1581472723648-90f1da82141e?q=80&w=600&auto=format&fit=crop',
        imageHint: 'website loading speed'
    },
    {
        id: '4',
        title: 'Crafting the Perfect B2B SaaS Onboarding Flow',
        slug: 'saas-onboarding-flow',
        author: 'Hamza',
        publishedAt: Timestamp.fromDate(new Date('2024-04-25T11:00:00Z')),
        summary: 'Learn the keys to creating a frictionless onboarding experience that converts trial users into paying customers.',
        content: 'Full markdown content here...',
        tags: ['saas', 'ux', 'conversion'],
        imageUrl: 'https://images.unsplash.com/photo-1573497491208-6b1acb260507?q=80&w=600&auto=format&fit=crop',
        imageHint: 'business people collaborating'
    },
    {
        id: '5',
        title: 'A/B Testing for Marketers: From Hypothesis to High-Impact',
        slug: 'ab-testing-for-marketers',
        author: 'Zain',
        publishedAt: Timestamp.fromDate(new Date('2024-04-20T16:00:00Z')),
        summary: 'A practical guide for marketers to design, implement, and analyze A/B tests that drive meaningful results.',
        content: 'Full markdown content here...',
        tags: ['cro', 'marketing', 'analytics'],
        imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=600&auto=format&fit=crop',
        imageHint: 'team working on laptops'
    }
]

export async function getBlogPosts(options?: { limit?: number }): Promise<BlogPost[]> {
    return fetchCollection<BlogPost>('blogPosts', staticBlogPosts, { orderByField: 'publishedAt', ...options });
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  const useStaticData = false;
  if (useStaticData || typeof window !== 'undefined') {
    return staticBlogPosts.find(post => post.slug === slug);
  }

  try {
    const q = query(collection(db, 'blogPosts'), where('slug', '==', slug), firestoreLimit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log(`No post found with slug '${slug}', trying static data.`);
      return staticBlogPosts.find(post => post.slug === slug);
    }
    
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as BlogPost;
  } catch (error) {
    console.error(`Error fetching post with slug '${slug}' from Firestore: `, error);
    return staticBlogPosts.find(post => post.slug === slug);
  }
}


export const footerLinks = {
    company: [
        { href: "/#services", label: "Services" },
        { href: "/#case-studies", label: "Case Studies" },
        { href: "/#about", label: "About" },
        { href: "/#contact", label: "Contact" },
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
