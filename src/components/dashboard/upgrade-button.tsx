'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export function UpgradeButton({ priceId, planName }: { priceId: string; planName: string }) {
  const [loading, setLoading] = useState(false)

  async function handleUpgrade() {
    if (!priceId) return
    setLoading(true)
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    })
    const { url } = await res.json()
    if (url) window.location.href = url
    setLoading(false)
  }

  return (
    <button
      onClick={handleUpgrade}
      disabled={loading || !priceId}
      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2"
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      Upgrade to {planName}
    </button>
  )
}
