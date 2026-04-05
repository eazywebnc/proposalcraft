import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PLANS } from '@/lib/constants'
import { Check, Sparkles } from 'lucide-react'
import { UpgradeButton } from '@/components/dashboard/upgrade-button'

export default async function BillingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('pc_users')
    .select('plan, stripe_subscription_id')
    .eq('auth_id', user.id)
    .single()

  const currentPlan = profile?.plan ?? 'free'

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Billing</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your subscription and billing.
        </p>
      </div>

      <div className="p-5 rounded-xl border border-white/5 bg-white/[2%]">
        <p className="text-sm text-muted-foreground">Current plan</p>
        <p className="text-xl font-bold text-foreground mt-1 flex items-center gap-2">
          {currentPlan === 'free' ? 'Free' : currentPlan === 'pro' ? 'Pro' : 'Team'}
          {currentPlan !== 'free' && <Sparkles className="w-5 h-5 text-indigo-400" />}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLANS.map((plan) => {
          const isCurrent = plan.id === currentPlan
          return (
            <div
              key={plan.id}
              className={`p-6 rounded-xl transition-all ${
                isCurrent
                  ? 'border-2 border-primary bg-primary/5'
                  : 'border border-white/5 bg-white/[2%]'
              }`}
            >
              <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
              <p className="text-3xl font-bold text-foreground mt-2">
                ${plan.price_monthly}<span className="text-sm text-muted-foreground">/mo</span>
              </p>
              <ul className="mt-4 space-y-2">
                {plan.features.slice(0, 5).map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                {isCurrent ? (
                  <span className="block text-center py-2 text-sm text-muted-foreground">Current plan</span>
                ) : (
                  <UpgradeButton priceId={plan.stripe_price_id} planName={plan.name} />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
