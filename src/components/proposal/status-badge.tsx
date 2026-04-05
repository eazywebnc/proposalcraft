import type { ProposalStatus } from '@/lib/types'
import { cn } from '@/lib/utils'

const statusConfig: Record<ProposalStatus, { label: string; className: string }> = {
  draft: { label: 'Draft', className: 'text-gray-400 bg-gray-500/10' },
  sent: { label: 'Sent', className: 'text-blue-400 bg-blue-500/10' },
  viewed: { label: 'Viewed', className: 'text-amber-400 bg-amber-500/10' },
  accepted: { label: 'Accepted', className: 'text-emerald-400 bg-emerald-500/10' },
  paid: { label: 'Paid', className: 'text-green-400 bg-green-500/10' },
  expired: { label: 'Expired', className: 'text-red-400 bg-red-500/10' },
}

export function StatusBadge({ status }: { status: ProposalStatus }) {
  const config = statusConfig[status]
  return (
    <span className={cn('px-2.5 py-1 rounded-full text-xs font-medium', config.className)}>
      {config.label}
    </span>
  )
}
