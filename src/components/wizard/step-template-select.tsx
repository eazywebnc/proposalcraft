'use client'

import { useWizard } from './wizard-context'
import type { Template } from '@/lib/types'
import { Crown, FileText, Check } from 'lucide-react'

const categoryColors: Record<string, string> = {
  'web-dev': 'text-blue-400 bg-blue-500/10',
  design: 'text-pink-400 bg-pink-500/10',
  marketing: 'text-amber-400 bg-amber-500/10',
  consulting: 'text-emerald-400 bg-emerald-500/10',
  photography: 'text-rose-400 bg-rose-500/10',
  video: 'text-purple-400 bg-purple-500/10',
  general: 'text-indigo-400 bg-indigo-500/10',
}

export function StepTemplateSelect({ templates }: { templates: Template[] }) {
  const { answers, updateAnswers, setStep, step } = useWizard()

  function handleNext() {
    if (!answers.template_id) return
    setStep(step + 1)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Choose a template</h2>
        <p className="text-muted-foreground">Pick a design style for your proposal.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {templates.map((template) => {
          const selected = answers.template_id === template.id
          return (
            <button
              key={template.id}
              onClick={() => updateAnswers({ template_id: template.id })}
              className={`relative p-4 rounded-xl border text-left transition-all ${
                selected
                  ? 'border-primary bg-primary/5 ring-1 ring-primary'
                  : 'border-white/5 bg-white/[2%] hover:bg-white/[4%]'
              }`}
            >
              {selected && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
              )}

              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/5 to-white/[2%] flex items-center justify-center mb-3">
                <FileText className="w-5 h-5 text-muted-foreground/50" />
              </div>

              <p className="font-medium text-foreground text-sm mb-1">{template.name}</p>
              <p className="text-xs text-muted-foreground line-clamp-2">{template.description}</p>

              <div className="flex items-center gap-2 mt-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[template.category] ?? 'text-gray-400 bg-gray-500/10'}`}>
                  {template.category}
                </span>
                {template.is_premium && (
                  <span className="text-xs px-2 py-0.5 rounded-full text-amber-400 bg-amber-500/10 flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    Pro
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </div>

      <button
        onClick={handleNext}
        disabled={!answers.template_id}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium text-sm disabled:opacity-50 transition-all hover:from-indigo-600 hover:to-violet-700"
      >
        Continue
      </button>
    </div>
  )
}
