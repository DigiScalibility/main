import {
  BarChart2,
  Briefcase,
  Code,
  LineChart,
  Megaphone,
  Search,
  Users,
} from "lucide-react";

export const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#case-studies", label: "Case Studies" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export const services = [
  {
    icon: Code,
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
    icon: Search,
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
    icon: Megaphone,
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
    icon: LineChart,
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
    icon: Users,
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
    icon: BarChart2,
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

export const plans = [
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

export const caseStudies = [
    {
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
        title: "SaaS Website Revamp",
        description: "A complete overhaul of a B2B SaaS platform's marketing site to improve user journey and conversion rates.",
        result: "10x signup conversions",
        imageHint: "dashboard analytics"
    },
    {
        image: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=600&auto=format&fit=crop",
        title: "eCommerce Growth Engine",
        description: "Implemented a full-funnel marketing strategy for a D2C brand, combining SEO, paid social, and email.",
        result: "250% ROI in 6 months",
        imageHint: "online shopping"
    },
    {
        image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=600&auto=format&fit=crop",
        title: "B2B Pipeline Boost",
        description: "Developed a targeted lead generation campaign that filled the sales pipeline with qualified opportunities.",
        result: "+$2M pipeline value",
        imageHint: "business meeting"
    }
]

export const testimonials = [
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


export const team = [
    {
        name: "Abbas",
        role: "Founder & Lead Engineer",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop",
        bio: "With over a decade of experience in software engineering, Abbas leads our technical vision and ensures every project is built to the highest standards.",
        imageHint: "man portrait"
    },
    {
        name: "Hamza",
        role: "Head of Marketing",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
        bio: "Hamza is a data-driven marketer who excels at creating growth strategies that deliver measurable results and significant ROI for our clients.",
        imageHint: "man portrait smiling"
    },
    {
        name: "Zain",
        role: "Operations Lead",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
        bio: "Zain keeps the wheels turning, managing projects, and ensuring seamless communication and delivery from start to finish.",
        imageHint: "woman portrait"
    }
]

export const footerLinks = {
    company: [
        { href: "#services", label: "Services" },
        { href: "#case-studies", label: "Case Studies" },
        { href: "#about", label: "About" },
        { href: "#contact", label: "Contact" },
    ],
    resources: [
        { href: "#", label: "Blog" },
        { href: "#", label: "Guides" },
        { href: "#", label: "FAQs" },
    ]
}
