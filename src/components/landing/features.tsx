'use client'

import { motion } from 'framer-motion'
import {
  Sparkles,
  FileText,
  Share2,
  BarChart3,
  CreditCard,
  Palette,
} from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Generation',
    description: 'Answer 5 simple questions and our AI crafts a complete, professional proposal tailored to your industry.',
    gradient: 'from-indigo-500 to-blue-500',
    span: 'col-span-2',
  },
  {
    icon: FileText,
    title: '10+ Premium Templates',
    description: 'From bold creative to minimalist pro — every template is designed to impress.',
    gradient: 'from-violet-500 to-purple-500',
    span: 'col-span-1',
  },
  {
    icon: Share2,
    title: 'One-Click Sharing',
    description: 'Send a beautiful link. Know when your client opens it, reads it, and how long they spend.',
    gradient: 'from-pink-500 to-rose-500',
    span: 'col-span-1',
  },
  {
    icon: CreditCard,
    title: 'Accept & Get Paid',
    description: 'Clients accept proposals and pay via Stripe — right from the proposal page. No friction.',
    gradient: 'from-emerald-500 to-teal-500',
    span: 'col-span-2',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track views, opens, and conversions. Understand what works and optimize your close rate.',
    gradient: 'from-amber-500 to-orange-500',
    span: 'col-span-1',
  },
  {
    icon: Palette,
    title: 'Custom Branding',
    description: 'Add your logo, colors, and company name. Every proposal looks like it came from your brand.',
    gradient: 'from-cyan-500 to-blue-500',
    span: 'col-span-1',
  },
]

export function Features() {
  return (
    <section id="features" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.2_0.08_270),transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Everything you need to{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              close deals
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From AI generation to payment collection, ProposalCraft handles the entire proposal lifecycle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative p-6 rounded-2xl border border-white/5 bg-white/[2%] hover:bg-white/[4%] transition-all duration-300 ${
                feature.span === 'col-span-2' ? 'md:col-span-2' : ''
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover glow */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[3%] transition-opacity duration-300`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
