import type { PricingPlan } from '@/lib/types'

export const APP_NAME = 'ProposalCraft'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://proposalcraft.eazyweb.nc'
export const SUPPORT_EMAIL = 'support@proposalcraft.eazyweb.nc'

export const PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for trying out AI-powered proposals.',
    price_monthly: 0,
    stripe_price_id: '',
    is_popular: false,
    limits: {
      proposals_per_month: 3,
      premium_templates: false,
      custom_branding: false,
      analytics: false,
      pdf_export: true,
      payment_links: false,
      team_members: 1,
    },
    features: [
      '3 proposals per month',
      'AI-powered generation',
      '5 starter templates',
      'PDF export',
      'Shareable links',
      'ProposalCraft branding',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For freelancers who close deals faster.',
    price_monthly: 19,
    stripe_price_id: 'price_pro_placeholder',
    is_popular: true,
    limits: {
      proposals_per_month: 'unlimited',
      premium_templates: true,
      custom_branding: true,
      analytics: true,
      pdf_export: true,
      payment_links: true,
      team_members: 1,
    },
    features: [
      'Unlimited proposals',
      'All 10+ premium templates',
      'Custom branding & logo',
      'Accept & Pay via Stripe',
      'Analytics dashboard',
      'PDF export',
      'Remove ProposalCraft branding',
      'Priority support',
    ],
  },
  {
    id: 'team',
    name: 'Team',
    description: 'For agencies and growing teams.',
    price_monthly: 49,
    stripe_price_id: 'price_team_placeholder',
    is_popular: false,
    limits: {
      proposals_per_month: 'unlimited',
      premium_templates: true,
      custom_branding: true,
      analytics: true,
      pdf_export: true,
      payment_links: true,
      team_members: 10,
    },
    features: [
      'Everything in Pro',
      'Up to 10 team members',
      'Team analytics',
      'Shared template library',
      'API access (coming soon)',
      'Dedicated support',
    ],
  },
]

export const PLAN_MAP = Object.fromEntries(PLANS.map((p) => [p.id, p])) as Record<
  string,
  PricingPlan
>

export const SERVICE_TYPES = [
  'Web Development',
  'Mobile App Development',
  'UI/UX Design',
  'Graphic Design',
  'Marketing & SEO',
  'Copywriting',
  'Video Production',
  'Photography',
  'Consulting',
  'Other',
] as const

export const TEMPLATE_CATEGORIES = [
  'web-dev',
  'design',
  'marketing',
  'consulting',
  'photography',
  'video',
  'general',
] as const
