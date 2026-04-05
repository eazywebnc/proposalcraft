'use client'

import { useWizard } from './wizard-context'
import { SERVICE_TYPES } from '@/lib/constants'
import { Briefcase } from 'lucide-react'

export function StepProjectScope() {
  const { answers, updateAnswers, setStep, step } = useWizard()

  function handleNext() {
    if (!answers.service_type || !answers.project_description?.trim()) return
    setStep(step + 1)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">What's the project about?</h2>
        <p className="text-muted-foreground">Describe the scope of work.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Service type *</label>
          <div className="grid grid-cols-2 gap-2">
            {SERVICE_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => updateAnswers({ service_type: type })}
                className={`px-4 py-2.5 rounded-xl border text-sm text-left transition-all ${
                  answers.service_type === type
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/50 hover:bg-accent'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Project description *</label>
          <textarea
            value={answers.project_description ?? ''}
            onChange={(e) => updateAnswers({ project_description: e.target.value })}
            placeholder="Describe the project in detail — what the client needs, goals, any specific requirements..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Key deliverables</label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <textarea
              value={answers.deliverables ?? ''}
              onChange={(e) => updateAnswers({ deliverables: e.target.value })}
              placeholder="List the main deliverables, one per line (e.g., responsive website, admin dashboard, mobile app...)"
              rows={3}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm resize-none"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={!answers.service_type || !answers.project_description?.trim()}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium text-sm disabled:opacity-50 transition-all hover:from-indigo-600 hover:to-violet-700"
      >
        Continue
      </button>
    </div>
  )
}
