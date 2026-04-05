'use client'

import { motion } from 'framer-motion'
import { SEED_TEMPLATES } from '@/lib/templates'
import { Crown, FileText } from 'lucide-react'

const categoryColors: Record<string, string> = {
  'web-dev': 'text-blue-400 bg-blue-500/10',
  design: 'text-pink-400 bg-pink-500/10',
  marketing: 'text-amber-400 bg-amber-500/10',
  consulting: 'text-emerald-400 bg-emerald-500/10',
  photography: 'text-rose-400 bg-rose-500/10',
  video: 'text-purple-400 bg-purple-500/10',
  general: 'text-indigo-400 bg-indigo-500/10',
}

export function TemplatesShowcase() {
  return (
    <section id="templates" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,oklch(0.2_0.08_270),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Beautiful templates for{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              every industry
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            10+ professionally designed templates. Pick one, and our AI fills it with your content.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {SEED_TEMPLATES.map((template, i) => (
            <motion.div
              key={template.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative rounded-xl border border-white/5 bg-white/[2%] hover:bg-white/[4%] p-4 transition-all duration-300 cursor-pointer"
            >
              {/* Template preview */}
              <div className="aspect-[3/4] rounded-lg bg-gradient-to-br from-white/5 to-white/[2%] border border-white/5 mb-3 flex flex-col items-center justify-center p-3 overflow-hidden relative">
                <FileText className="w-8 h-8 text-muted-foreground/30 mb-2" />
                <div className="space-y-1.5 w-full">
                  <div className="h-1.5 w-3/4 rounded-full bg-white/10 mx-auto" />
                  <div className="h-1 w-1/2 rounded-full bg-white/5 mx-auto" />
                  <div className="h-1 w-2/3 rounded-full bg-white/5 mx-auto" />
                </div>
                {template.is_premium && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <Crown className="w-3 h-3 text-amber-400" />
                  </div>
                )}
              </div>

              <p className="text-sm font-medium text-foreground truncate">{template.name}</p>
              <span
                className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${
                  categoryColors[template.category] ?? 'text-gray-400 bg-gray-500/10'
                }`}
              >
                {template.category}
              </span>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
