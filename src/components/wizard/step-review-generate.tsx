'use client'

import { useWizard } from './wizard-context'
import { useRouter } from 'next/navigation'
import { Sparkles, Loader2, User, Briefcase, Calendar, DollarSign } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export function StepReviewGenerate() {
  const { answers, isGenerating, setIsGenerating } = useWizard()
  const router = useRouter()

  async function handleGenerate() {
    setIsGenerating(true)
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers),
      })

      if (!res.ok) {
        const err = await res.json()
        alert(err.error || 'Failed to generate proposal')
        setIsGenerating(false)
        return
      }

      const { proposalId } = await res.json()
      router.push(`/dashboard/proposals/${proposalId}`)
    } catch {
      alert('Something went wrong. Please try again.')
      setIsGenerating(false)
    }
  }

  const summaryItems = [
    { icon: User, label: 'Client', value: `${answers.client_name ?? ''}${answers.client_company ? ` at ${answers.client_company}` : ''}` },
    { icon: Briefcase, label: 'Service', value: answers.service_type ?? '' },
    { icon: Calendar, label: 'Timeline', value: answers.timeline ?? '' },
    { icon: DollarSign, label: 'Budget', value: answers.budget_min && answers.budget_max ? `${formatCurrency(answers.budget_min)} — ${formatCurrency(answers.budget_max)}` : '' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Review & Generate</h2>
        <p className="text-muted-foreground">Review your answers, then let AI do the magic.</p>
      </div>

      <div className="space-y-3">
        {summaryItems.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-white/[2%]">
            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-sm font-medium text-foreground">{value || 'Not set'}</p>
            </div>
          </div>
        ))}

        {answers.project_description && (
          <div className="p-4 rounded-xl border border-white/5 bg-white/[2%]">
            <p className="text-xs text-muted-foreground mb-1">Project description</p>
            <p className="text-sm text-foreground">{answers.project_description}</p>
          </div>
        )}

        {answers.payment_terms && (
          <div className="p-4 rounded-xl border border-white/5 bg-white/[2%]">
            <p className="text-xs text-muted-foreground mb-1">Payment terms</p>
            <p className="text-sm text-foreground">{answers.payment_terms}</p>
          </div>
        )}
      </div>

      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold text-base disabled:opacity-70 transition-all hover:from-indigo-600 hover:to-violet-700 shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating your proposal...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Generate with AI
          </>
        )}
      </button>

      {isGenerating && (
        <p className="text-center text-sm text-muted-foreground">
          Our AI is crafting a professional proposal tailored to your project. This usually takes 10-20 seconds.
        </p>
      )}
    </div>
  )
}
