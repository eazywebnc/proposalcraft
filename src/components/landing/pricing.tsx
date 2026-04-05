'use client'

import { motion } from 'framer-motion'
import { PLANS } from '@/lib/constants'
import { Check } from 'lucide-react'
import Link from 'next/link'

export function Pricing() {
  return (
    <section id="pricing" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Simple,{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              transparent pricing
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Start free. Upgrade when you need more power. No hidden fees.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.is_popular
                  ? 'border-2 border-indigo-500/50 bg-gradient-to-b from-indigo-500/10 to-transparent shadow-xl shadow-indigo-500/10 scale-[1.02]'
                  : 'border border-white/10 bg-white/[2%] hover:bg-white/[3%]'
              }`}
            >
              {plan.is_popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-xs font-semibold">
                  Most popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-5xl font-bold text-foreground">
                  ${plan.price_monthly}
                </span>
                <span className="text-muted-foreground text-sm ml-1">/month</span>
              </div>

              <Link
                href="/auth/login"
                className={`block w-full text-center py-3 rounded-xl font-medium text-sm transition-all mb-8 ${
                  plan.is_popular
                    ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white hover:from-indigo-600 hover:to-violet-700 shadow-lg shadow-indigo-500/25'
                    : 'border border-border text-foreground hover:bg-accent'
                }`}
              >
                {plan.price_monthly === 0 ? 'Get started free' : 'Start free trial'}
              </Link>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
