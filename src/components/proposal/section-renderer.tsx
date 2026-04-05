import type { ProposalSection } from '@/lib/types'
import { formatCurrency } from '@/lib/utils'

export function SectionRenderer({ section }: { section: ProposalSection }) {
  switch (section.type) {
    case 'cover':
      return (
        <div className="text-center py-16 space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            {section.title}
          </h1>
          <p className="text-lg text-muted-foreground">{section.subtitle}</p>
          <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <span>Prepared for {section.client_name}</span>
            <span>|</span>
            <span>{section.date}</span>
          </div>
        </div>
      )

    case 'about':
      return (
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">{section.heading}</h2>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{section.body}</p>
        </div>
      )

    case 'scope':
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">{section.heading}</h2>
          <div className="space-y-3">
            {section.items.map((item, i) => (
              <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/[2%]">
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )

    case 'deliverables':
      return (
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">{section.heading}</h2>
          <ul className="space-y-2">
            {section.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-muted-foreground">
                <span className="w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )

    case 'timeline':
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">{section.heading}</h2>
          <div className="space-y-3">
            {section.milestones.map((m, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[2%]">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500/10 to-violet-500/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-indigo-400">{i + 1}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{m.phase}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400">
                      {m.duration}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )

    case 'pricing':
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">{section.heading}</h2>
          <div className="rounded-xl border border-white/5 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5 bg-white/[2%]">
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Description</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Qty</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Price</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Total</th>
                </tr>
              </thead>
              <tbody>
                {section.line_items.map((item, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="px-4 py-3 text-sm text-foreground">{item.description}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground text-right">{item.quantity}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground text-right">{formatCurrency(item.unit_price)}</td>
                    <td className="px-4 py-3 text-sm text-foreground text-right font-medium">
                      {formatCurrency(item.quantity * item.unit_price)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-indigo-500/5">
                  <td colSpan={3} className="px-4 py-3 text-sm font-semibold text-foreground text-right">
                    Total
                  </td>
                  <td className="px-4 py-3 text-lg font-bold text-primary text-right">
                    {formatCurrency(section.total)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )

    case 'terms':
      return (
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">{section.heading}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{section.body}</p>
        </div>
      )

    case 'next_steps':
      return (
        <div className="text-center py-12 space-y-4">
          <h2 className="text-2xl font-bold text-foreground">{section.heading}</h2>
          <p className="text-muted-foreground max-w-md mx-auto">{section.body}</p>
          <div className="inline-flex px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold">
            {section.cta_text}
          </div>
        </div>
      )

    default:
      return null
  }
}
