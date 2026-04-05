import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { ProposalCard } from '@/components/dashboard/proposal-card'
import type { Proposal } from '@/lib/types'
import Link from 'next/link'
import { Plus, FileText } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: proposals } = await supabase
    .from('pc_proposals')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const allProposals = (proposals ?? []) as Proposal[]

  const totalViews = 0
  const acceptedCount = allProposals.filter((p) => p.status === 'accepted' || p.status === 'paid').length
  const totalRevenue = allProposals
    .filter((p) => p.is_paid && p.total_amount)
    .reduce((sum, p) => sum + (p.total_amount ?? 0), 0)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Proposals</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create, manage, and track your proposals.
          </p>
        </div>
        <Link
          href="/dashboard/proposals/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium text-sm hover:from-indigo-600 hover:to-violet-700 transition-all shadow-lg shadow-indigo-500/25"
        >
          <Plus className="w-4 h-4" />
          New Proposal
        </Link>
      </div>

      <StatsCards
        totalProposals={allProposals.length}
        totalViews={totalViews}
        acceptedCount={acceptedCount}
        totalRevenue={totalRevenue}
      />

      {allProposals.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border border-dashed border-white/10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-indigo-400/60" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No proposals yet</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Create your first AI-powered proposal in minutes.
          </p>
          <Link
            href="/dashboard/proposals/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium text-sm"
          >
            <Plus className="w-4 h-4" />
            Create your first proposal
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allProposals.map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))}
        </div>
      )}
    </div>
  )
}
