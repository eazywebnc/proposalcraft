import { createAdminClient } from '@/lib/supabase/server'

/**
 * Ensures the authenticated user has a pc_users record.
 * Called on first dashboard access to support cross-SaaS login.
 */
export async function ensureUserProfile(userId: string, email: string) {
  const supabase = createAdminClient()

  const { data: existing } = await supabase
    .from('pc_users')
    .select('auth_id')
    .eq('auth_id', userId)
    .single()

  if (existing) return

  await supabase.from('pc_users').upsert(
    {
      auth_id: userId,
      email,
      plan: 'free',
    },
    { onConflict: 'auth_id' }
  )
}
