import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — ProposalCraft',
  description:
    'ProposalCraft privacy policy. Learn how we collect, use, and protect your personal data.',
  metadataBase: new URL('https://proposalcraft.eazyweb.nc'),
  alternates: { canonical: '/privacy' },
}

const sections = [
  {
    title: '1. Information We Collect',
    content: [
      '**Account data:** Your email address and display name, collected via Supabase Auth when you sign up or log in with a social provider.',
      '**Proposal content:** All proposals you create — including client names, project descriptions, pricing, and template selections — are stored in our Supabase database.',
      '**AI usage data:** Prompts you submit to the AI proposal generator are processed to generate your content. We do not use your proposal content to train AI models.',
      '**Usage analytics:** Anonymised data on feature usage and session behaviour to improve the product. No personally identifiable information is included.',
      '**Technical data:** IP address, browser type, device, and referral source collected automatically.',
    ],
  },
  {
    title: '2. How We Use Your Data',
    content: [
      'To create, store, and manage your proposals and templates.',
      'To authenticate you and maintain a secure session.',
      'To generate AI-powered proposal content via the AI engine.',
      'To send transactional emails (proposal export links, account notifications). You may opt out of marketing emails at any time.',
      'To improve product features based on aggregated, anonymised usage patterns.',
      'To comply with legal and regulatory obligations.',
    ],
  },
  {
    title: '3. Data Storage & Security',
    content: [
      'All data is stored in Supabase (PostgreSQL) on secure cloud infrastructure. Data is encrypted at rest and in transit via TLS/HTTPS.',
      'Row-level security (RLS) policies ensure each user can only access their own proposals.',
      'Exported PDF proposals are generated server-side and are not stored permanently — they are streamed directly to you.',
      'We retain your data for as long as your account is active. You may request deletion at any time.',
    ],
  },
  {
    title: '4. Cookies',
    content: [
      '**Authentication cookies:** Secure, HTTP-only cookies used to maintain your login session via Supabase Auth.',
      '**Preference cookies:** UI settings (theme, default template) stored in localStorage.',
      '**Analytics cookies:** Privacy-respecting analytics that do not track individuals across sites.',
      'You can disable cookies in your browser settings, but this may prevent you from logging in.',
    ],
  },
  {
    title: '5. AI & Third-Party Processing',
    content: [
      'ProposalCraft uses an AI API to generate proposal content. Your prompts and project details are sent to this API solely to generate your proposal.',
      'We do not permit the AI provider to use your data for training purposes.',
      'Other subprocessors: Supabase (database & auth), Cloudflare (CDN), Stripe (payments).',
      'We do not sell or share your data with advertisers or data brokers.',
    ],
  },
  {
    title: '6. Your Rights (GDPR & Privacy)',
    content: [
      '**Access:** Request a copy of all personal data we hold about you.',
      '**Rectification:** Correct inaccurate or incomplete personal data.',
      '**Erasure:** Request deletion of your account and all proposals.',
      '**Portability:** Export all your proposals as JSON or PDF at any time from your dashboard.',
      '**Objection:** Object to processing based on legitimate interests.',
      'To exercise these rights, email contact@eazyweb.nc. We respond within 30 days.',
    ],
  },
  {
    title: '7. Proposal Data & Confidentiality',
    content: [
      'Your proposal content is private by default. It is never shared with other users.',
      'Shareable proposal links (if enabled) are access-controlled via a unique, unguessable URL token.',
      'We do not read your proposal content except for technical support when you explicitly request it.',
    ],
  },
  {
    title: '8. Children\'s Privacy',
    content: [
      'ProposalCraft is a professional tool not directed at children under 16. We do not knowingly collect data from minors.',
    ],
  },
  {
    title: '9. Changes to This Policy',
    content: [
      'We may update this policy to reflect changes in our practices or legal requirements. We will notify you via email or in-app notice at least 14 days before material changes take effect.',
    ],
  },
  {
    title: '10. Contact',
    content: [
      'EazyWebNC — contact@eazyweb.nc',
      'Nouméa, New Caledonia',
      'eazyweb.nc',
    ],
  },
]

export default function PrivacyPage() {
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
          Privacy{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Policy
          </span>
        </h1>
        <p className="text-lg text-white/50 max-w-2xl leading-relaxed">
          ProposalCraft is operated by EazyWebNC. This policy explains what data we
          collect, how we use it, and the rights you have over your information.
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
                  <li key={i} className="text-white/60 leading-relaxed text-sm">
                    {item.startsWith('**') ? (
                      <span>
                        <span className="font-semibold text-white/80">
                          {item.match(/\*\*(.*?)\*\*/)?.[1]}
                        </span>
                        {item.replace(/\*\*(.*?)\*\*/, '')}
                      </span>
                    ) : (
                      item
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-indigo-500/[0.08] to-violet-500/[0.08] border border-violet-500/20 text-center">
          <p className="text-white/50 mb-4 text-sm">
            Questions about your privacy or data? We&apos;re here to help.
          </p>
          <a
            href="mailto:contact@eazyweb.nc"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium text-sm hover:from-indigo-500 hover:to-violet-500 transition-all"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}
