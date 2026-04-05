import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ProposalCraft — AI-Powered Proposals for Freelancers',
  description:
    'Create stunning, professional proposals in minutes with AI. Answer a few questions, pick a template, and close deals faster. Free to start.',
  keywords: [
    'proposal generator',
    'business proposal AI',
    'client proposal template',
    'freelancer proposal',
    'AI proposal writer',
    'professional proposal maker',
    'AI proposal generator',
    'freelancer proposal tool',
    'proposal tracking',
    'business proposal template',
    'proposal software',
  ],
  authors: [{ name: 'EazyWebNC', url: 'https://eazyweb.nc' }],
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  metadataBase: new URL('https://proposalcraft.eazyweb.nc'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ProposalCraft — AI-Powered Business Proposals',
    description: 'Create stunning proposals in minutes. Close deals faster.',
    url: 'https://proposalcraft.eazyweb.nc',
    siteName: 'ProposalCraft',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProposalCraft — AI-Powered Business Proposals',
    description: 'Create stunning proposals in minutes. Close deals faster.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: 'ProposalCraft',
      url: 'https://proposalcraft.eazyweb.nc',
      publisher: {
        '@type': 'Organization',
        name: 'EazyWebNC',
        url: 'https://eazyweb.nc',
        logo: { '@type': 'ImageObject', url: 'https://eazyweb.nc/logo.png' },
        sameAs: [
          'https://www.facebook.com/eazywebnc',
          'https://www.linkedin.com/company/eazywebnc',
          'https://x.com/eazywebnc',
        ],
      },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'ProposalCraft',
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'Proposal Management',
      operatingSystem: 'Web',
      url: 'https://proposalcraft.eazyweb.nc',
      description:
        'Create stunning, professional proposals in minutes with AI. Answer a few questions, pick a template, and close deals faster.',
      featureList:
        'AI proposal generation, Professional templates, Proposal tracking, Client portal, PDF export, Analytics dashboard',
      offers: {
        '@type': 'AggregateOffer',
        lowPrice: '0',
        highPrice: '49',
        priceCurrency: 'USD',
        offerCount: '3',
      },
      creator: {
        '@type': 'Organization',
        name: 'EazyWebNC',
        url: 'https://eazyweb.nc',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is ProposalCraft?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'ProposalCraft is an AI-powered proposal generator that helps freelancers and agencies create professional business proposals in minutes instead of hours.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is ProposalCraft free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! ProposalCraft offers a free plan to get started. Create your first proposals at no cost and upgrade when you need more features.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does the AI proposal generation work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Answer 5 simple questions about your project, choose a template, and our AI generates a complete, professional proposal ready to send to your client.',
          },
        },
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-500 focus:text-white focus:rounded-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <main id="main-content" role="main" aria-label="Main content">
          {children}
        </main>
      </body>
    </html>
  )
}
