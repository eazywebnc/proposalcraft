'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import type { WizardAnswers } from '@/lib/types'

interface WizardContextType {
  step: number
  setStep: (step: number) => void
  answers: Partial<WizardAnswers>
  updateAnswers: (partial: Partial<WizardAnswers>) => void
  isGenerating: boolean
  setIsGenerating: (v: boolean) => void
}

const WizardContext = createContext<WizardContextType | null>(null)

export function WizardProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Partial<WizardAnswers>>({})
  const [isGenerating, setIsGenerating] = useState(false)

  const updateAnswers = (partial: Partial<WizardAnswers>) => {
    setAnswers((prev) => ({ ...prev, ...partial }))
  }

  return (
    <WizardContext.Provider value={{ step, setStep, answers, updateAnswers, isGenerating, setIsGenerating }}>
      {children}
    </WizardContext.Provider>
  )
}

export function useWizard() {
  const ctx = useContext(WizardContext)
  if (!ctx) throw new Error('useWizard must be used within WizardProvider')
  return ctx
}
