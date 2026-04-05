export type Plan = 'free' | 'pro' | 'team'

export type ProposalStatus = 'draft' | 'sent' | 'viewed' | 'accepted' | 'paid' | 'expired'

export type AnalyticsEvent = 'view' | 'link_click' | 'download_pdf' | 'accepted' | 'paid'

// ---------------------------------------------------------------------------
// Database row types
// ---------------------------------------------------------------------------

export interface User {
  id: string
  auth_id: string
  email: string
  name: string | null
  avatar_url: string | null
  plan: Plan
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  proposals_this_month: number
  brand_logo_url: string | null
  brand_color: string
  brand_name: string | null
  created_at: string
  updated_at: string
}

export interface Template {
  id: string
  name: string
  slug: string
  description: string | null
  category: string
  thumbnail_url: string | null
  structure: ProposalSection[]
  is_premium: boolean
  sort_order: number
  created_at: string
}

export interface Proposal {
  id: string
  user_id: string
  template_id: string | null
  title: string
  slug: string
  status: ProposalStatus
  client_name: string | null
  client_email: string | null
  client_company: string | null
  project_description: string | null
  content: ProposalContent
  wizard_answers: WizardAnswers | null
  total_amount: number | null
  currency: string
  valid_until: string | null
  stripe_payment_link: string | null
  stripe_payment_intent_id: string | null
  is_paid: boolean
  brand_override: BrandOverride | null
  created_at: string
  updated_at: string
}

export interface Analytics {
  id: string
  proposal_id: string
  event: AnalyticsEvent
  viewer_ip: string | null
  viewer_user_agent: string | null
  referrer: string | null
  created_at: string
}

// ---------------------------------------------------------------------------
// Proposal content structure
// ---------------------------------------------------------------------------

export interface ProposalContent {
  sections: ProposalSection[]
}

export type ProposalSection =
  | CoverSection
  | AboutSection
  | ScopeSection
  | DeliverablesSection
  | TimelineSection
  | PricingSection
  | TermsSection
  | NextStepsSection

export interface CoverSection {
  type: 'cover'
  title: string
  subtitle: string
  client_name: string
  date: string
}

export interface AboutSection {
  type: 'about'
  heading: string
  body: string
}

export interface ScopeSection {
  type: 'scope'
  heading: string
  items: { title: string; description: string }[]
}

export interface DeliverablesSection {
  type: 'deliverables'
  heading: string
  items: string[]
}

export interface TimelineSection {
  type: 'timeline'
  heading: string
  milestones: { phase: string; duration: string; description: string }[]
}

export interface PricingSection {
  type: 'pricing'
  heading: string
  line_items: { description: string; quantity: number; unit_price: number }[]
  total: number
}

export interface TermsSection {
  type: 'terms'
  heading: string
  body: string
}

export interface NextStepsSection {
  type: 'next_steps'
  heading: string
  body: string
  cta_text: string
}

// ---------------------------------------------------------------------------
// Wizard
// ---------------------------------------------------------------------------

export interface WizardAnswers {
  client_name: string
  client_email: string
  client_company: string
  service_type: string
  project_description: string
  deliverables: string
  timeline: string
  budget_min: number
  budget_max: number
  payment_terms: string
  template_id: string
}

// ---------------------------------------------------------------------------
// Branding
// ---------------------------------------------------------------------------

export interface BrandOverride {
  logo_url?: string
  color?: string
  name?: string
}

// ---------------------------------------------------------------------------
// Pricing / plan metadata
// ---------------------------------------------------------------------------

export interface PlanLimits {
  proposals_per_month: number | 'unlimited'
  premium_templates: boolean
  custom_branding: boolean
  analytics: boolean
  pdf_export: boolean
  payment_links: boolean
  team_members: number
}

export interface PricingPlan {
  id: Plan
  name: string
  description: string
  price_monthly: number
  stripe_price_id: string
  features: string[]
  limits: PlanLimits
  is_popular: boolean
}
