import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { WizardShell } from '@/components/wizard/wizard-shell'
import type { Template } from '@/lib/types'

export default async function NewProposalPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: templates } = await supabase
    .from('pc_templates')
    .select('*')
    .order('sort_order')

  return (
    <div className="py-4">
      <WizardShell templates={(templates ?? []) as Template[]} />
    </div>
  )
}
