/**
 * Site-wide constants for Hybetech
 */

export const SITE: {
  name: string;
  title: string;
  description: string;
  url: string;
  author: string;
  email: string;
  phone: string;
  address: string;
} = {
  name: 'Hybetech',
  title: 'Hybetech - Boutique AI Solutions',
  description:
    'Boutique AI solutions that drive real business results. Consultation, training, implementation, and development services for businesses of all sizes.',
  url: 'https://www.hybe.tech',
  author: 'Hybetech',
  email: 'contact@hybe.tech',
  phone: '', // Add phone number when available
  address: '', // Add address when available
};

export const SOCIAL = {
  twitter: '', // Add Twitter handle when available
  linkedin: '', // Add LinkedIn URL when available
  github: '', // Add GitHub URL when available
} as const;

type NavItemWithChildren = {
  label: string;
  href: string;
  children: readonly { label: string; href: string }[];
};

type NavItemSimple = {
  label: string;
  href: string;
  children?: undefined;
};

export type NavItem = NavItemWithChildren | NavItemSimple;

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Consultation', href: '/services/consultation' },
      { label: 'Training', href: '/services/training' },
      { label: 'Implementation', href: '/services/implementation' },
      { label: 'Development', href: '/services/development' },
    ],
  },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Insights', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export const SERVICES = [
  {
    id: 'consultation',
    title: 'AI Consultation',
    shortTitle: 'Consult',
    description:
      'Strategic AI assessment to identify opportunities and create a roadmap for your business.',
    icon: 'brain', // Lucide icon name
    href: '/services/consultation',
    features: [
      'AI readiness assessment',
      'Opportunity identification',
      'ROI analysis',
      'Implementation roadmap',
    ],
  },
  {
    id: 'training',
    title: 'AI Training',
    shortTitle: 'Train',
    description:
      'Hands-on training to empower your team with AI tools and best practices.',
    icon: 'graduation-cap',
    href: '/services/training',
    features: [
      'Team workshops',
      'Tool-specific training',
      'Best practices',
      'Ongoing support',
    ],
  },
  {
    id: 'implementation',
    title: 'AI Implementation',
    shortTitle: 'Implement',
    description:
      'Deploy AI solutions seamlessly into your existing workflows and systems.',
    icon: 'rocket',
    href: '/services/implementation',
    features: [
      'System integration',
      'Workflow automation',
      'Data pipeline setup',
      'Performance optimization',
    ],
  },
  {
    id: 'development',
    title: 'Boutique AI Development',
    shortTitle: 'Develop',
    description:
      'Custom AI solutions built specifically for your unique business challenges.',
    icon: 'code',
    href: '/services/development',
    features: [
      'Custom AI models',
      'Bespoke solutions',
      'API development',
      'Ongoing maintenance',
    ],
  },
] as const;

export const FOOTER_LINKS = {
  services: SERVICES.map((s) => ({ label: s.title, href: s.href })),
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Insights', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
} as const;

export const CTA = {
  primary: {
    label: 'Book a Free Assessment',
    href: '/contact',
  },
  secondary: {
    label: 'See Our Work',
    href: '/case-studies',
  },
} as const;
