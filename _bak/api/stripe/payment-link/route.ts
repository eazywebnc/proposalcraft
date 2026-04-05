import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { getStripe } from '@/lib/stripe'
import { APP_URL } from '@/lib/constants'

export async function POST(request: NextRequest) {
  const { proposalId, slug } = await request.json()

  if (!proposalId) {
    return NextResponse.json({ error: 'Missing proposalId' }, { status: 400 })
  }

  const admin = createAdminClient()

  const { data: proposal } = await admin
    .from('pc_proposals')
    .select('total_amount, currency, title, client_email, user_id')
    .eq('id', proposalId)
    .single()

  if (!proposal || !proposal.total_amount) {
    return NextResponse.json({ error: 'Proposal not found or no amount' }, { status: 404 })
  }

  const stripe = getStripe()
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: (proposal.currency ?? 'usd').toLowerCase(),
          product_data: { name: proposal.title },
          unit_amount: Math.round(proposal.total_amount * 100),
        },
        quantity: 1,
      },
    ],
    customer_email: proposal.client_email ?? undefined,
    success_url: `${APP_URL}/p/${slug}?paid=true`,
    cancel_url: `${APP_URL}/p/${slug}`,
    metadata: {
      proposal_id: proposalId,
      type: 'proposal_payment',
    },
  })

  return NextResponse.json({ url: session.url })
}
