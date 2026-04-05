import { FileText, Eye, CheckCircle, DollarSign } from 'lucide-react'

interface StatsCardsProps {
  totalProposals: number
  totalViews: number
  acceptedCount: number
  totalRevenue: number
}

export function StatsCards({ totalProposals, totalViews, acceptedCount, totalRevenue }: StatsCardsProps) {
  const stats = [
    {
      label: 'Total Proposals',
      value: totalProposals,
      icon: FileText,
      gradient: 'from-indigo-500 to-blue-500',
    },
    {
      label: 'Total Views',
      value: totalViews,
      icon: Eye,
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      label: 'Accepted',
      value: acceptedCount,
      icon: CheckCircle,
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      label: 'Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      gradient: 'from-amber-500 to-orange-500',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="p-4 rounded-xl border border-white/5 bg-white/[2%] space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{stat.label}</span>
            <div
              className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}
            >
              <stat.icon className="w-4 h-4 text-white" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}
