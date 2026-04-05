import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const { proposalId, event } = await request.json()

  if (!proposalId || !event) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const admin = createAdminClient()

  const ip = request.headers.get('x-forwarded-for') ?? ''
  const ua = request.headers.get('user-agent') ?? ''

  await admin.from('pc_analytics').insert({
    proposal_id: proposalId,
    event,
    viewer_ip: ip.split(',')[0]?.trim() ?? null,
    viewer_user_agent: ua.substring(0, 500),
  })

  if (event === 'accepted') {
    await admin
      .from('pc_proposals')
      .update({ status: 'accepted', updated_at: new Date().toISOString() })
      .eq('id', proposalId)
  }

  return NextResponse.json({ success: true })
}
