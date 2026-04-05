'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function CTA() {
  return (
    <section className="relative py-32">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(1_0_0_/_15%),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(oklch(1_0_0_/_5%)_1px,transparent_1px),linear-gradient(90deg,oklch(1_0_0_/_5%)_1px,transparent_1px)] bg-[size:32px_32px]" />

          <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Stop writing proposals from scratch
            </h2>
            <p className="text-lg text-white/80 max-w-xl mx-auto mb-10">
              Join thousands of freelancers who close more deals with AI-powered proposals.
              Start for free — no credit card required.
            </p>

            <Link
              href="/auth/login"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-indigo-600 font-semibold text-lg hover:bg-white/90 transition-colors shadow-2xl"
            >
              Create your free account
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
