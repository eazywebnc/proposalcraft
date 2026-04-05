import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service — ProposalCraft',
  description:
    'ProposalCraft terms of service. The rules and conditions governing your use of the platform.',
  metadataBase: new URL('https://proposalcraft.eazyweb.nc'),
  alternates: { canonical: '/terms' },
}

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: [
      'By creating an account or using ProposalCraft ("the Service"), you agree to be bound by these Terms of Service.',
      'If you are using the Service on behalf of an organisation, you represent that you have authority to bind that organisation to these Terms.',
      'These Terms are governed by the laws of New Caledonia (French legal framework). Disputes shall be resolved in the courts of Nouméa.',
    ],
  },
  {
    title: '2. Description of Service',
    content: [
      'ProposalCraft is an AI-powered proposal generation platform. It enables freelancers and agencies to create professional business proposals using AI, customisable templates, and a guided questionnaire.',
      'The Service is operated by EazyWebNC, based in Nouméa, New Caledonia.',
    ],
  },
  {
    title: '3. Account Responsibilities',
    content: [
      'You must provide accurate, current information when registering.',
      'You are responsible for keeping your credentials secure. Do not share your password.',
      'You are responsible for all activity that occurs under your account.',
      'You must be at least 16 years old to use the Service.',
    ],
  },
  {
    title: '4. Acceptable Use',
    content: [
      'You may only use ProposalCraft for lawful business purposes.',
      'You must not use the AI generation feature to produce misleading, fraudulent, or defamatory content.',
      'You must not attempt to reverse-engineer, scrape, or abuse the platform, API, or AI generation infrastructure.',
      'You must not resell or sublicense access to the Service without written permission from EazyWebNC.',
    ],
  },
  {
    title: '5. AI-Generated Content',
    content: [
      'ProposalCraft uses AI to generate proposal drafts. You are responsible for reviewing, editing, and validating all AI-generated content before sending it to clients.',
      'EazyWebNC does not guarantee the accuracy, completeness, or fitness for purpose of AI-generated text.',
      'AI outputs are not legal or financial advice. Consult a qualified professional for such needs.',
      'You retain ownership of proposals you create, including AI-generated portions incorporated into them.',
    ],
  },
  {
    title: '6. Content & Intellectual Property',
    content: [
      'You retain ownership of all proposals, templates, and content you create using the Service.',
      'By using the Service, you grant EazyWebNC a limited, non-exclusive license to store and process your content to provide the Service.',
      'ProposalCraft\'s branding, proprietary templates, UI, and codebase remain the exclusive property of EazyWebNC.',
    ],
  },
  {
    title: '7. Plans, Billing & Cancellation',
    content: [
      'ProposalCraft offers Free, Pro, and Scale plans. Details are listed on the pricing page.',
      'Paid plans are billed monthly or annually via Stripe. All prices are in USD unless stated otherwise.',
      'You may cancel at any time. Access continues until the end of the billing period. No refunds are issued for unused partial periods.',
      'We reserve the right to change pricing with 30 days\' notice. Existing subscribers are not affected mid-period.',
    ],
  },
  {
    title: '8. Free Plan Limits',
    content: [
      'Free accounts are subject to limits on the number of proposals, AI generations per month, and template access as defined on the pricing page.',
      'We may adjust free plan limits with reasonable notice.',
    ],
  },
  {
    title: '9. Service Availability',
    content: [
      'We aim for 99.9% uptime but do not guarantee uninterrupted availability.',
      'AI generation availability depends on third-party API providers. Downtime caused by such providers is beyond our control.',
      'Scheduled maintenance will be announced in advance where possible.',
    ],
  },
  {
    title: '10. Termination',
    content: [
      'We may suspend or terminate accounts that violate these Terms, with or without prior notice.',
      'You may delete your account at any time from Settings. All data is permanently deleted within 30 days.',
      'We recommend exporting your proposals before deleting your account.',
    ],
  },
  {
    title: '11. Disclaimer of Warranties',
    content: [
      'The Service is provided "as is" without warranties of any kind. EazyWebNC disclaims all implied warranties, including merchantability and fitness for a particular purpose.',
      'We do not warrant that proposals generated will result in closed deals or successful client engagements.',
    ],
  },
  {
    title: '12. Limitation of Liability',
    content: [
      'To the maximum extent permitted by law, EazyWebNC shall not be liable for indirect, incidental, or consequential damages.',
      'Our total liability shall not exceed the amount you paid in the 12 months preceding the claim.',
    ],
  },
  {
    title: '13. Changes to Terms',
    content: [
      'We may update these Terms at any time. Material changes will be communicated by email or in-app notice at least 14 days in advance.',
      'Continued use after changes constitutes acceptance.',
    ],
  },
  {
    title: '14. Contact',
    content: [
      'EazyWebNC — contact@eazyweb.nc',
      'Nouméa, New Caledonia',
      'eazyweb.nc',
    ],
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      {/* Header */}
      <div className="border-b border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to ProposalCraft
          </Link>
          <div className="text-sm text-white/30">Last updated: April 2026</div>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-medium mb-6">
          Legal
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Terms of{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Service
          </span>
        </h1>
        <p className="text-lg text-white/50 max-w-2xl leading-relaxed">
          These terms govern your use of ProposalCraft, operated by EazyWebNC.
          Please read them carefully before using the platform.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        <div className="space-y-8">
          {sections.map((section) => (
            <div
              key={section.title}
              className="border border-white/[0.08] rounded-2xl p-8 bg-white/[0.025] hover:bg-white/[0.04] transition-colors"
            >
              <h2 className="text-lg font-semibold mb-5 text-white">{section.title}</h2>
              <ul className="space-y-3">
                {section.content.map((item, i) => (
                  <li key={i} className="text-white/60 leading-relaxed text-sm flex gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500/50 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Links */}
        <div className="mt-12 flex flex-wrap gap-4 items-center justify-between p-6 rounded-xl border border-white/[0.08] bg-white/[0.025]">
          <p className="text-white/40 text-sm">
            Also review our{' '}
            <Link
              href="/privacy"
              className="text-violet-400 hover:text-violet-300 underline underline-offset-2"
            >
              Privacy Policy
            </Link>
          </p>
          <a
            href="mailto:contact@eazyweb.nc"
            className="text-sm text-white/50 hover:text-white transition-colors"
          >
            contact@eazyweb.nc
          </a>
        </div>
      </div>
    </div>
  )
}
