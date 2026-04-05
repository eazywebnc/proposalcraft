'use client'

import { motion } from 'framer-motion'
import { MessageSquare, Wand2, Send } from 'lucide-react'

const steps = [
  {
    icon: MessageSquare,
    number: '01',
    title: 'Answer 5 Questions',
    description: 'Tell us about your client, the project scope, timeline, and budget. Takes less than 2 minutes.',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    icon: Wand2,
    number: '02',
    title: 'AI Generates Your Proposal',
    description: 'Our AI crafts a professional, tailored proposal with all sections — scope, pricing, timeline, terms.',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: Send,
    number: '03',
    title: 'Send & Get Paid',
    description: 'Share a beautiful link. Your client reviews, accepts, and pays — all from one page.',
    color: 'from-emerald-500 to-teal-500',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Three steps to a{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              winning proposal
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            From blank page to signed deal in minutes, not hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-[17%] right-[17%] h-px bg-gradient-to-r from-indigo-500/30 via-violet-500/30 to-emerald-500/30" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative text-center"
            >
              <div className="relative inline-flex mb-8">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl`}
                >
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-background border-2 border-border flex items-center justify-center text-xs font-bold text-muted-foreground">
                  {step.number}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
