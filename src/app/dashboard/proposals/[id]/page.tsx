import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ProposalPreview } from '@/components/proposal/proposal-preview'
import { StatusBadge } from '@/components/proposal/status-badge'
import type { Proposal } from '@/lib/types'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Copy, Download, Send } from 'lucide-react'
import { APP_URL } from '@/lib/constants'
import { formatCurrency, formatDate } from '@/lib/utils'
import { ProposalActions } from '@/components/proposal/proposal-actions'

export default async function ProposalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data } = await supabase
    .from('pc_proposals')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (!data) notFound()

  const proposal = data as Proposal
  const shareUrl = `${APP_URL}/p/${proposal.slug}`

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-foreground">{proposal.title}</h1>
              <StatusBadge status={proposal.status} />
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {proposal.client_name}
              {proposal.client_company ? ` at ${proposal.client_company}` : ''}
              {' | '}
              {formatDate(proposal.created_at)}
              {proposal.total_amount != null && (
                <> | {formatCurrency(proposal.total_amount, proposal.currency)}</>
              )}
            </p>
          </div>
        </div>

        <ProposalActions proposalId={proposal.id} slug={proposal.slug} status={proposal.status} />
      </div>

      {/* Proposal content */}
      <div className="rounded-2xl border border-white/5 bg-card/50 p-8">
        <ProposalPreview content={proposal.content} />
      </div>
    </div>
  )
}
