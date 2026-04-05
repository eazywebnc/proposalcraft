'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { APP_URL } from '@/lib/constants'
import { ExternalLink, Copy, Send, Check, Trash2 } from 'lucide-react'
import type { ProposalStatus } from '@/lib/types'

interface ProposalActionsProps {
  proposalId: string
  slug: string
  status: ProposalStatus
}

export function ProposalActions({ proposalId, slug, status }: ProposalActionsProps) {
  const [copied, setCopied] = useState(false)
  const router = useRouter()
  const shareUrl = `${APP_URL}/p/${slug}`

  async function copyLink() {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function markAsSent() {
    await fetch(`/api/proposals/${proposalId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'sent' }),
    })
    router.refresh()
  }

  async function deleteProposal() {
    if (!confirm('Are you sure you want to delete this proposal?')) return
    await fetch(`/api/proposals/${proposalId}`, { method: 'DELETE' })
    router.push('/dashboard')
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={copyLink}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-accent transition-colors"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        {copied ? 'Copied!' : 'Copy link'}
      </button>

      <a
        href={shareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-accent transition-colors"
      >
        <ExternalLink className="w-4 h-4" />
        Preview
      </a>

      {status === 'draft' && (
        <button
          onClick={markAsSent}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-medium hover:from-indigo-600 hover:to-violet-700 transition-all"
        >
          <Send className="w-4 h-4" />
          Mark as sent
        </button>
      )}

      <button
        onClick={deleteProposal}
        className="p-2 rounded-xl border border-border text-muted-foreground hover:text-destructive hover:border-destructive/50 transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  )
}
