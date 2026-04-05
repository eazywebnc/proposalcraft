import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { BarChart3, Eye, CheckCircle, DollarSign } from 'lucide-react'

export default async function AnalyticsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: proposals } = await supabase
    .from('pc_proposals')
    .select('id, title, status, total_amount, slug')
    .eq('user_id', user.id)

  const allProposals = proposals ?? []
  const proposalIds = allProposals.map((p) => p.id)

  let viewCount = 0
  if (proposalIds.length > 0) {
    const { count } = await supabase
      .from('pc_analytics')
      .select('*', { count: 'exact', head: true })
      .in('proposal_id', proposalIds)
      .eq('event', 'view')
    viewCount = count ?? 0
  }

  const acceptedCount = allProposals.filter((p) => p.status === 'accepted' || p.status === 'paid').length
  const paidCount = allProposals.filter((p) => p.status === 'paid').length
  const totalRevenue = allProposals
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + (p.total_amount ?? 0), 0)

  const conversionRate = allProposals.length > 0
    ? Math.round((acceptedCount / allProposals.length) * 100)
    : 0

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track your proposal performance and close rate.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Eye} label="Total Views" value={viewCount} gradient="from-blue-500 to-cyan-500" />
        <StatCard icon={CheckCircle} label="Accepted" value={acceptedCount} gradient="from-emerald-500 to-teal-500" />
        <StatCard icon={BarChart3} label="Conversion Rate" value={`${conversionRate}%`} gradient="from-violet-500 to-purple-500" />
        <StatCard icon={DollarSign} label="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} gradient="from-amber-500 to-orange-500" />
      </div>

      {/* Proposal performance table */}
      <div className="rounded-xl border border-white/5 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5 bg-white/[2%]">
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Proposal</th>
              <th className="text-center px-4 py-3 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Amount</th>
            </tr>
          </thead>
          <tbody>
            {allProposals.map((p) => (
              <tr key={p.id} className="border-b border-white/5">
                <td className="px-4 py-3 text-sm text-foreground">{p.title}</td>
                <td className="px-4 py-3 text-sm text-center capitalize text-muted-foreground">{p.status}</td>
                <td className="px-4 py-3 text-sm text-right text-foreground">
                  {p.total_amount ? `$${p.total_amount.toLocaleString()}` : '—'}
                </td>
              </tr>
            ))}
            {allProposals.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-muted-foreground text-sm">
                  No proposals yet. Create one to see analytics.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  gradient,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string | number
  gradient: string
}) {
  return (
    <div className="p-4 rounded-xl border border-white/5 bg-white/[2%]">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground">{label}</span>
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </div>
  )
}
