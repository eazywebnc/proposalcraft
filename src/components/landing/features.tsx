'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import {
  Sparkles,
  FileText,
  Share2,
  BarChart3,
  CreditCard,
  Palette,
  Eye,
  Clock,
  Check,
} from 'lucide-react'
import { cn } from '@/lib/utils'

function AIGenerationVisual() {
  const steps = ['Your industry?', 'Project scope?', 'Timeline?', 'Budget range?', 'Special notes?']
  return (
    <div className="mt-4 space-y-2">
      {steps.map((q, i) => (
        <motion.div
          key={q}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 * i + 0.3, duration: 0.3 }}
          className="flex items-center gap-2"
        >
          <div className={cn(
            "w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold",
            i < 4 ? "bg-emerald-500 text-white" : "bg-white/10 text-white/40"
          )}>
            {i < 4 ? <Check className="w-3 h-3" /> : i + 1}
          </div>
          <span className={cn("text-[11px]", i < 4 ? "text-white/60 line-through" : "text-white/80")}>{q}</span>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="mt-3 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-300 flex items-center gap-2"
      >
        <Sparkles className="w-3 h-3" />
        Generating proposal...
        <motion.div
          animate={{ width: ['0%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="h-1 rounded-full bg-emerald-500/50 flex-1"
        />
      </motion.div>
    </div>
  )
}

function PaymentVisual() {
  return (
    <div className="mt-4 flex gap-3 items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="flex-1 p-3 rounded-xl border border-amber-500/20 bg-amber-500/5"
      >
        <p className="text-[10px] text-white/40 mb-1">Proposal accepted</p>
        <p className="text-lg font-black text-amber-400">$4,500</p>
        <p className="text-[10px] text-white/30 mt-1">Paid via Stripe</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="flex flex-col items-center gap-1"
      >
        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <Check className="w-5 h-5 text-emerald-400" />
        </div>
        <span className="text-[9px] text-emerald-400 font-medium">Paid</span>
      </motion.div>
    </div>
  )
}

function AnalyticsVisual() {
  const bars = [40, 65, 45, 80, 60, 90, 75]
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] text-white/30">Proposals sent this month</span>
        <span className="text-[10px] font-bold text-teal-400">↑ 34%</span>
      </div>
      <div className="flex items-end gap-1.5 h-16">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i + 0.3, duration: 0.5, ease: 'easeOut' }}
            className={cn(
              "flex-1 rounded-t min-h-[4px]",
              i === bars.length - 2
                ? "bg-gradient-to-t from-emerald-500 to-emerald-400/60"
                : "bg-gradient-to-t from-emerald-500/40 to-emerald-400/15"
            )}
          />
        ))}
      </div>
    </div>
  )
}

function SharingVisual() {
  return (
    <div className="mt-4 space-y-2">
      {[
        { icon: Eye, label: 'Client opened proposal', time: '2m ago', color: 'text-teal-400' },
        { icon: Clock, label: 'Viewed for 4:32', time: '1m ago', color: 'text-emerald-400' },
      ].map((event, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 * i + 0.3, duration: 0.3 }}
          className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/5"
        >
          <event.icon className={cn('w-3.5 h-3.5', event.color)} />
          <span className="text-[10px] text-white/60 flex-1">{event.label}</span>
          <span className="text-[9px] text-white/30">{event.time}</span>
        </motion.div>
      ))}
    </div>
  )
}

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Generation',
    description: 'Answer 5 simple questions and our AI crafts a complete, professional proposal tailored to your industry.',
    gradient: 'from-emerald-500 to-teal-500',
    glow: 'bg-emerald-500/20',
    span: 'md:col-span-2',
    visual: 'ai',
    image: '/images/feature-1.webp',
  },
  {
    icon: FileText,
    title: '10+ Premium Templates',
    description: 'From bold creative to minimalist pro — every template is designed to impress.',
    gradient: 'from-teal-500 to-cyan-500',
    glow: 'bg-teal-500/20',
    span: 'md:col-span-1',
    visual: null,
  },
  {
    icon: Share2,
    title: 'One-Click Sharing',
    description: 'Send a beautiful link. Know when your client opens it and how long they spend.',
    gradient: 'from-teal-400 to-emerald-500',
    glow: 'bg-teal-400/20',
    span: 'md:col-span-1',
    visual: 'sharing',
  },
  {
    icon: CreditCard,
    title: 'Accept & Get Paid',
    description: 'Clients accept proposals and pay via Stripe — right from the proposal page. Zero friction.',
    gradient: 'from-amber-500 to-yellow-500',
    glow: 'bg-amber-500/20',
    span: 'md:col-span-2',
    visual: 'payment',
    image: '/images/feature-2.webp',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track views, opens, and conversions. Optimize your close rate.',
    gradient: 'from-emerald-500 to-green-500',
    glow: 'bg-emerald-500/20',
    span: 'md:col-span-1',
    visual: 'analytics',
  },
  {
    icon: Palette,
    title: 'Custom Branding',
    description: 'Add your logo, colors, and company name. Every proposal looks like yours.',
    gradient: 'from-amber-400 to-orange-500',
    glow: 'bg-amber-400/20',
    span: 'md:col-span-1',
    visual: null,
  },
]

export function Features() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [20, -20])

  return (
    <section ref={ref} id="features" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.18_0.06_160),transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Everything you need to{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              close deals
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From AI generation to payment collection, ProposalCraft handles the entire proposal lifecycle.
          </p>
        </motion.div>

        <motion.div style={{ y }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ scale: 1.01, y: -2 }}
              className={cn(
                'group relative p-6 rounded-2xl border border-white/5 bg-white/[2%] hover:bg-white/[4%] transition-all duration-300 overflow-hidden',
                feature.span
              )}
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform',
                  feature.gradient
                )}
              >
                <feature.icon className="w-4.5 h-4.5 text-white" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1.5">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {feature.visual === 'ai' && <AIGenerationVisual />}
              {feature.visual === 'payment' && <PaymentVisual />}
              {feature.visual === 'analytics' && <AnalyticsVisual />}
              {feature.visual === 'sharing' && <SharingVisual />}

              {'image' in feature && feature.image && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="mt-4 rounded-xl overflow-hidden border border-white/10 shadow-lg shadow-black/20"
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                </motion.div>
              )}

              <div
                className={cn(
                  'absolute -bottom-4 -right-4 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-3xl',
                  feature.glow
                )}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
