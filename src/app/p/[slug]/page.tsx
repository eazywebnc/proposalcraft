import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/server'
import { ProposalPreview } from '@/components/proposal/proposal-preview'
import { AcceptButton } from '@/components/proposal/accept-button'
import type { Proposal } from '@/lib/types'
import { APP_NAME } from '@/lib/constants'
import { FileText } from 'lucide-react'
import { headers } from 'next/headers'

export default async function PublicProposalPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const admin = createAdminClient()

  const { data } = await admin
    .from('pc_proposals')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!data) notFound()

  const proposal = data as Proposal

  // Track view event
  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for') ?? headersList.get('x-real-ip') ?? ''
  const ua = headersList.get('user-agent') ?? ''
  const referrer = headersList.get('referer') ?? ''

  await admin.from('pc_analytics').insert({
    proposal_id: proposal.id,
    event: 'view',
    viewer_ip: ip.split(',')[0]?.trim() ?? null,
    viewer_user_agent: ua.substring(0, 500),
    referrer: referrer.substring(0, 500) || null,
  })

  // Update status to viewed if currently sent
  if (proposal.status === 'sent') {
    await admin
      .from('pc_proposals')
      .update({ status: 'viewed', updated_at: new Date().toISOString() })
      .eq('id', proposal.id)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header bar */}
      <div className="border-b border-white/5 bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <FileText className="w-3 h-3 text-white" />
            </div>
            <span>Powered by {APP_NAME}</span>
          </div>
        </div>
      </div>

      {/* Proposal content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <ProposalPreview content={proposal.content} />

        {/* Accept & Pay section */}
        {proposal.status !== 'paid' && proposal.total_amount && (
          <div className="mt-12 text-center py-8 border-t border-white/5">
            <AcceptButton
              proposalId={proposal.id}
              slug={proposal.slug}
              totalAmount={proposal.total_amount}
              currency={proposal.currency}
            />
          </div>
        )}
      </div>
    </div>
  )
}
