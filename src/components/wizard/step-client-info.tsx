'use client'

import { useWizard } from './wizard-context'
import { User, Building2, Mail } from 'lucide-react'

export function StepClientInfo() {
  const { answers, updateAnswers, setStep, step } = useWizard()

  function handleNext() {
    if (!answers.client_name?.trim()) return
    setStep(step + 1)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Who is this proposal for?</h2>
        <p className="text-muted-foreground">Tell us about your client.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Client name *</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={answers.client_name ?? ''}
              onChange={(e) => updateAnswers({ client_name: e.target.value })}
              placeholder="John Smith"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Client email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="email"
              value={answers.client_email ?? ''}
              onChange={(e) => updateAnswers({ client_email: e.target.value })}
              placeholder="john@company.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Company name</label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={answers.client_company ?? ''}
              onChange={(e) => updateAnswers({ client_company: e.target.value })}
              placeholder="Acme Corp"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={!answers.client_name?.trim()}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium text-sm disabled:opacity-50 transition-all hover:from-indigo-600 hover:to-violet-700"
      >
        Continue
      </button>
    </div>
  )
}
