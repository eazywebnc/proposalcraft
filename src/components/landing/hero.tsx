'use client'
import Image from "next/image";

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles, Star, Zap, Clock } from 'lucide-react'

export function Hero() {
  const mockupRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: mockupRef,
    offset: ['start end', 'end start'],
  })
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const mockupRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -3])

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
          {' '}<br />
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

        {/* Floating proposal mockup with scroll parallax */}
        <motion.div
          ref={mockupRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ y: mockupY, rotateX: mockupRotateX, perspective: 1200 }}
          className="mt-20 relative"
        >
          <div className="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-card/50 backdrop-blur-sm shadow-2xl shadow-black/20 overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-black/20">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 mx-4">
                <div className="h-6 rounded-md bg-white/5 max-w-sm mx-auto flex items-center justify-center text-xs text-muted-foreground font-mono gap-2">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  proposalcraft.eazyweb.nc/p/acme-redesign
                </div>
              </div>
            </div>
            {/* Detailed mockup content */}
            <div className="p-6 md:p-8 space-y-5">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0 }}
                    className="text-lg md:text-xl font-bold text-foreground"
                  >
                    Website Redesign Proposal
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="text-sm text-muted-foreground"
                  >
                    Prepared for Acme Corp — April 2026
                  </motion.p>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 }}
                  className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20"
                >
                  Accepted
                </motion.div>
              </div>

              {/* Summary cards */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Project Value', value: '$12,500', color: 'text-indigo-400' },
                  { label: 'Timeline', value: '6 weeks', color: 'text-violet-400' },
                  { label: 'Start Date', value: 'Apr 14', color: 'text-purple-400' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 + i * 0.1 }}
                    className="p-3 rounded-xl border border-white/5 bg-white/[2%]"
                  >
                    <p className="text-[10px] text-muted-foreground mb-1">{item.label}</p>
                    <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Scope section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="space-y-2"
              >
                <p className="text-xs font-semibold text-foreground/80">Scope of Work</p>
                <div className="space-y-1.5">
                  {['UX audit & wireframes', 'Visual design (3 concepts)', 'Frontend development', 'CMS integration & testing'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-4 h-4 rounded-full bg-indigo-500/20 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* CTA row */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
                className="flex items-center gap-3"
              >
                <div className="h-10 flex-1 rounded-xl bg-gradient-to-r from-indigo-500/30 to-violet-500/30 flex items-center justify-center text-xs text-indigo-300 font-medium">
                  Download PDF
                </div>
                <div className="h-10 w-36 rounded-xl bg-gradient-to-r from-emerald-500/30 to-teal-500/30 flex items-center justify-center text-xs text-emerald-300 font-medium">
                  Pay $12,500
                </div>
              </motion.div>
            </div>
          </div>
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/5 via-violet-500/5 to-purple-500/5 rounded-3xl blur-xl -z-10" />
        </motion.div>

        {/* Dashboard Preview */}
        <div className="mt-20 max-w-5xl mx-auto px-4">
          <div className="relative rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-violet-500/10">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
            <Image
              src="/images/dashboard.webp"
              alt="ProposalCraft proposal builder dashboard"
              width={1200}
              height={800}
              className="w-full h-auto"
              priority
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 z-20" />
          </div>
        </div>
      </div>
    </section>
  )
}
