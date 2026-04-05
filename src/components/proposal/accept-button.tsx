'use client'

import { useState } from 'react'
import { formatCurrency } from '@/lib/utils'
import { CheckCircle, Loader2, CreditCard } from 'lucide-react'

interface AcceptButtonProps {
  proposalId: string
  slug: string
  totalAmount: number
  currency: string
}

export function AcceptButton({ proposalId, slug, totalAmount, currency }: AcceptButtonProps) {
  const [loading, setLoading] = useState(false)
  const [accepted, setAccepted] = useState(false)

  async function handleAccept() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/payment-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proposalId, slug }),
      })

      if (res.ok) {
        const { url } = await res.json()
        if (url) {
          window.location.href = url
          return
        }
      }

      // If no Stripe, just mark as accepted
      await fetch(`/api/analytics/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proposalId, event: 'accepted' }),
      })
      setAccepted(true)
    } catch {
      setAccepted(true)
    }
    setLoading(false)
  }

  if (accepted) {
    return (
      <div className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-500/10 text-emerald-400 font-semibold text-lg">
        <CheckCircle className="w-6 h-6" />
        Proposal Accepted!
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handleAccept}
        disabled={loading}
        className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-lg hover:from-emerald-600 hover:to-teal-700 transition-all shadow-xl shadow-emerald-500/25 disabled:opacity-70"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <CreditCard className="w-5 h-5" />
        )}
        Accept & Pay {formatCurrency(totalAmount, currency)}
      </button>
      <p className="text-xs text-muted-foreground">Secure payment via Stripe</p>
    </div>
  )
}
