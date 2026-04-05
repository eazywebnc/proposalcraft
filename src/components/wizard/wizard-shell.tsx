'use client'

import { useWizard, WizardProvider } from './wizard-context'
import { StepClientInfo } from './step-client-info'
import { StepProjectScope } from './step-project-scope'
import { StepTimelineBudget } from './step-timeline-budget'
import { StepTemplateSelect } from './step-template-select'
import { StepReviewGenerate } from './step-review-generate'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import type { Template } from '@/lib/types'

const steps = [
  { title: 'Client Info', component: StepClientInfo },
  { title: 'Project Scope', component: StepProjectScope },
  { title: 'Timeline & Budget', component: StepTimelineBudget },
  { title: 'Template', component: StepTemplateSelect },
  { title: 'Review & Generate', component: StepReviewGenerate },
]

function WizardContent({ templates }: { templates: Template[] }) {
  const { step, setStep, isGenerating } = useWizard()
  const CurrentStep = steps[step].component

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        {step > 0 && !isGenerating ? (
          <button
            onClick={() => setStep(step - 1)}
            className="p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        ) : (
          <Link
            href="/dashboard"
            className="p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        )}
        <div>
          <h1 className="text-xl font-bold text-foreground">New Proposal</h1>
          <p className="text-sm text-muted-foreground">
            Step {step + 1} of {steps.length} — {steps[step].title}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1.5 mb-10">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= step ? 'bg-gradient-to-r from-indigo-500 to-violet-600' : 'bg-white/10'
            }`}
          />
        ))}
      </div>

      {/* Step content */}
      <CurrentStep templates={templates} />
    </div>
  )
}

export function WizardShell({ templates }: { templates: Template[] }) {
  return (
    <WizardProvider>
      <WizardContent templates={templates} />
    </WizardProvider>
  )
}
