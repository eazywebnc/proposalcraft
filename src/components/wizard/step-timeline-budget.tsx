'use client'

import { useWizard } from './wizard-context'
import { Calendar, DollarSign } from 'lucide-react'

const timelines = ['1-2 weeks', '2-4 weeks', '1-2 months', '2-3 months', '3-6 months', '6+ months']
const paymentTerms = ['50% upfront, 50% on delivery', 'Monthly milestones', '100% upfront', 'Net 30', 'Custom']

export function StepTimelineBudget() {
  const { answers, updateAnswers, setStep, step } = useWizard()

  function handleNext() {
    if (!answers.timeline || !answers.budget_min || !answers.budget_max) return
    setStep(step + 1)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Timeline & Budget</h2>
        <p className="text-muted-foreground">Set expectations for delivery and pricing.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Timeline *</label>
          <div className="grid grid-cols-2 gap-2">
            {timelines.map((t) => (
              <button
                key={t}
                onClick={() => updateAnswers({ timeline: t })}
                className={`px-4 py-2.5 rounded-xl border text-sm transition-all flex items-center gap-2 ${
                  answers.timeline === t
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/50 hover:bg-accent'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Budget range (USD) *</label>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="number"
                value={answers.budget_min ?? ''}
                onChange={(e) => updateAnswers({ budget_min: Number(e.target.value) })}
                placeholder="Min"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm"
              />
            </div>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="number"
                value={answers.budget_max ?? ''}
                onChange={(e) => updateAnswers({ budget_max: Number(e.target.value) })}
                placeholder="Max"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Payment terms</label>
          <div className="space-y-2">
            {paymentTerms.map((term) => (
              <button
                key={term}
                onClick={() => updateAnswers({ payment_terms: term })}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm text-left transition-all ${
                  answers.payment_terms === term
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/50 hover:bg-accent'
                }`}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={!answers.timeline || !answers.budget_min || !answers.budget_max}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium text-sm disabled:opacity-50 transition-all hover:from-indigo-600 hover:to-violet-700"
      >
        Continue
      </button>
    </div>
  )
}
