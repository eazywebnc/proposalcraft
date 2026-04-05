'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Star, Zap, Clock } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.3_0.15_270),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,oklch(0.2_0.12_300),transparent_50%)]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(oklch(1_0_0_/_3%)_1px,transparent_1px),linear-gradient(90deg,oklch(1_0_0_/_3%)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm mb-8"
        >
          <Sparkles className="w-4 h-4" />
          AI-powered proposal generation
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          <span className="text-foreground">Win more clients with</span>
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
            stunning proposals
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Answer 5 questions. Our AI crafts a professional proposal in seconds.
          Share it, track views, and get paid — all in one place.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/auth/login"
            className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold text-lg hover:from-indigo-600 hover:to-violet-700 transition-all shadow-2xl shadow-indigo-500/25 hover:shadow-indigo-500/40 flex items-center gap-2"
          >
            Create your first proposal
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#how-it-works"
            className="px-8 py-4 rounded-2xl border border-border text-foreground font-medium text-lg hover:bg-accent transition-colors"
          >
            See how it works
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-3 max-w-lg mx-auto gap-8"
        >
          {[
            { icon: Zap, label: 'AI Generation', value: '< 30s' },
            { icon: Star, label: 'Templates', value: '10+' },
            { icon: Clock, label: 'Time Saved', value: '5h/wk' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 mb-2">
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Floating proposal mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 relative"
        >
          <div className="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-card/50 backdrop-blur-sm shadow-2xl shadow-black/20 overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 mx-4">
                <div className="h-6 rounded-md bg-white/5 max-w-sm mx-auto flex items-center justify-center text-xs text-muted-foreground">
                  proposalcraft.eazyweb.nc/p/your-proposal
                </div>
              </div>
            </div>
            {/* Mockup content */}
            <div className="p-8 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="h-8 w-64 rounded bg-gradient-to-r from-indigo-500/20 to-violet-500/20 animate-shimmer mb-3" />
                  <div className="h-4 w-48 rounded bg-white/5" />
                </div>
                <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                  Sent
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/[2%] space-y-2">
                    <div className="h-3 w-20 rounded bg-white/10" />
                    <div className="h-2 w-full rounded bg-white/5" />
                    <div className="h-2 w-3/4 rounded bg-white/5" />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 flex-1 rounded-xl bg-gradient-to-r from-indigo-500/20 to-violet-500/20" />
                <div className="h-10 w-32 rounded-xl bg-emerald-500/20" />
              </div>
            </div>
          </div>
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/5 via-violet-500/5 to-purple-500/5 rounded-3xl blur-xl -z-10" />
        </motion.div>
      </div>
    </section>
  )
}
