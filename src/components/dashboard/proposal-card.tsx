import Link from 'next/link'
import type { Proposal } from '@/lib/types'
import { formatCurrency, formatDate } from '@/lib/utils'
import { StatusBadge } from '@/components/proposal/status-badge'
import { FileText, ExternalLink } from 'lucide-react'

interface ProposalCardProps {
  proposal: Proposal
}

export function ProposalCard({ proposal }: ProposalCardProps) {
  return (
    <Link
      href={`/dashboard/proposals/${proposal.id}`}
      className="group block p-5 rounded-xl border border-white/5 bg-white/[2%] hover:bg-white/[4%] transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/10 to-violet-500/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {proposal.title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {proposal.client_name ?? 'No client'} {proposal.client_company ? `at ${proposal.client_company}` : ''}
            </p>
          </div>
        </div>
        <StatusBadge status={proposal.status} />
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{formatDate(proposal.created_at)}</span>
        <div className="flex items-center gap-3">
          {proposal.total_amount != null && (
            <span className="font-medium text-foreground">
              {formatCurrency(proposal.total_amount, proposal.currency)}
            </span>
          )}
          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </Link>
  )
}
