import { NextRequest, NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import { generateProposal } from '@/lib/ai'
import { generateSlug } from '@/lib/utils'
import type { WizardAnswers } from '@/lib/types'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = (await request.json()) as Partial<WizardAnswers>

  if (!body.client_name || !body.service_type || !body.project_description) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const answers: WizardAnswers = {
    client_name: body.client_name,
    client_email: body.client_email ?? '',
    client_company: body.client_company ?? '',
    service_type: body.service_type,
    project_description: body.project_description,
    deliverables: body.deliverables ?? '',
    timeline: body.timeline ?? '2-4 weeks',
    budget_min: body.budget_min ?? 1000,
    budget_max: body.budget_max ?? 5000,
    payment_terms: body.payment_terms ?? '50% upfront, 50% on delivery',
    template_id: body.template_id ?? '',
  }

  try {
    const content = await generateProposal(answers)

    const admin = createAdminClient()
    const slug = generateSlug()

    const totalAmount = content.sections.find((s) => s.type === 'pricing')
    const total = totalAmount && 'total' in totalAmount ? totalAmount.total : null

    const title = content.sections.find((s) => s.type === 'cover')
    const proposalTitle = title && 'title' in title ? title.title : `Proposal for ${answers.client_name}`

    const { data: proposal, error } = await admin
      .from('pc_proposals')
      .insert({
        user_id: user.id,
        template_id: answers.template_id || null,
        title: proposalTitle,
        slug,
        status: 'draft',
        client_name: answers.client_name,
        client_email: answers.client_email || null,
        client_company: answers.client_company || null,
        project_description: answers.project_description,
        content,
        wizard_answers: answers,
        total_amount: total,
        currency: 'USD',
      })
      .select('id')
      .single()

    if (error) {
      console.error('[ai/generate] insert error:', error)
      return NextResponse.json({ error: 'Failed to save proposal' }, { status: 500 })
    }

    return NextResponse.json({ proposalId: proposal.id })
  } catch (err) {
    console.error('[ai/generate] error:', err)
    return NextResponse.json({ error: 'AI generation failed' }, { status: 500 })
  }
}
