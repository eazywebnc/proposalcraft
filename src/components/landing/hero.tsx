'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles, Star, Zap, Clock, Check, FileSignature } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function ProposalBuilderMockup() {
  const [step, setStep] = useState(0)
  const steps = [
    { q: 'Industry', a: 'Web Design Agency', done: true },
    { q: 'Project', a: 'Full website redesign', done: true },
    { q: 'Timeline', a: '6 weeks', done: true },
    { q: 'Budget', a: '$8,000 – $15,000', done: true },
    { q: 'Generate', a: '', done: false },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(s => (s + 1) % 6)
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  const isGenerating = step === 4
  const isDone = step === 5

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Glow behind */}
      <div className="absolute -inset-6 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-gold-500/10 rounded-3xl blur-2xl" />

      <div className="relative rounded-2xl border border-emerald-500/20 bg-black/40 backdrop-blur-xl overflow-hidden shadow-2xl shadow-emerald-500/10">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
          <FileSignature className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-medium text-white/70">Proposal Builder</span>
          <div className="ml-auto flex gap-1">
            {steps.slice(0, 4).map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
                  i < step || isDone ? 'bg-emerald-400' : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="p-4 space-y-2.5">
          {steps.slice(0, 4).map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: i <= step || isDone ? 1 : 0.3,
                x: 0,
              }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <motion.div
                animate={{
                  backgroundColor: i < step || isDone ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.05)',
                  borderColor: i < step || isDone ? 'rgba(16,185,129,0.5)' : 'rgba(255,255,255,0.1)',
                }}
                className="w-6 h-6 rounded-lg border flex items-center justify-center"
              >
                {i < step || isDone ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <span className="text-[9px] text-white/30">{i + 1}</span>
                )}
              </motion.div>
              <div className="flex-1">
                <p className="text-[10px] text-white/40">{s.q}</p>
                <AnimatePresence mode="wait">
                  {(i < step || isDone) && (
                    <motion.p
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs font-medium text-white/80"
                    >
                      {s.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}

          {/* Generate button / progress */}
          <AnimatePresence mode="wait">
            {isGenerating ? (
              <motion.div
                key="generating"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span className="text-xs text-emerald-300">Crafting your proposal...</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.8, ease: 'easeInOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                  />
                </div>
              </motion.div>
            ) : isDone ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mt-3 p-3 rounded-xl bg-gradient-to-r from-emerald-500/15 to-teal-500/15 border border-emerald-500/30"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/30 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-emerald-300">Proposal ready!</p>
                    <p className="text-[10px] text-white/40">8 pages · $12,500 project value</p>
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500 text-[10px] font-bold text-white"
                  >
                    Send
                  </motion.div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const textSectionRef = useRef<HTMLDivElement>(null)
  const mockupRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textSectionRef.current) {
        gsap.to(textSectionRef.current, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: textSectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        })
      }

      if (mockupRef.current) {
        gsap.set(mockupRef.current, { transformPerspective: 1200 })
        gsap.fromTo(
          mockupRef.current,
          { rotateY: -5, rotateX: 3, scale: 0.95 },
          {
            rotateY: 5,
            rotateX: -2,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: mockupRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 1,
            },
          }
        )
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background — emerald/gold theme */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.25_0.12_160),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,oklch(0.18_0.10_80),transparent_50%)]" />
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-amber-500/6 rounded-full blur-3xl" />
        <div className="absolute top-2/3 left-1/2 w-64 h-64 bg-teal-500/6 rounded-full blur-3xl" />
      </motion.div>

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(oklch(1_0_0_/_2%)_1px,transparent_1px),linear-gradient(90deg,oklch(1_0_0_/_2%)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left — Text */}
        <div ref={textSectionRef} className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-sm mb-8"
          >
            <Sparkles className="w-4 h-4" />
            AI-powered proposals
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6">
            {['Close', 'deals', 'faster', 'with'].map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                className="inline-block mr-[0.3em] text-foreground"
              >
                {word}
              </motion.span>
            ))}
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400 bg-clip-text text-transparent">
              {Array.from('stunning proposals').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.4, delay: 0.42 + i * 0.03 }}
                  className="inline-block"
                  style={char === ' ' ? { width: '0.3em' } : undefined}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-10"
          >
            Answer 5 questions. Our AI crafts a professional proposal in seconds.
            Share it, track views, and get paid — all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-12"
          >
            <Link
              href="/auth/login"
              className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-lg hover:from-emerald-600 hover:to-teal-700 transition-all shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 flex items-center gap-2"
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex gap-8 justify-center lg:justify-start"
          >
            {[
              { icon: Zap, label: 'AI Generation', value: '< 30s', color: 'text-emerald-400' },
              { icon: Star, label: 'Templates', value: '10+', color: 'text-teal-400' },
              { icon: Clock, label: 'Time Saved', value: '5h/wk', color: 'text-amber-400' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="text-center lg:text-left">
                <div className={`inline-flex items-center gap-1.5 ${color} mb-0.5`}>
                  <Icon className="w-4 h-4" />
                  <span className="text-xl font-bold">{value}</span>
                </div>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — Interactive mockup */}
        <motion.div
          ref={mockupRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <ProposalBuilderMockup />
        </motion.div>
      </div>
    </section>
  )
}
