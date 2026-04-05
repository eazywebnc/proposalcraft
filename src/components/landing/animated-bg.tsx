'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  dx: number
  dy: number
  rotation: number
  rotationSpeed: number
  opacity: number
  type: 'doc' | 'orb'
  color: string
}

export function AnimatedMeshBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Emerald/gold floating orbs + subtle document shapes
    const particles: Particle[] = []

    // Large ambient orbs
    const orbColors = [
      'rgba(16,185,129,0.10)',   // emerald
      'rgba(234,179,8,0.07)',    // gold
      'rgba(20,184,166,0.08)',   // teal
      'rgba(168,162,158,0.05)',  // warm gray
    ]
    orbColors.forEach((color, i) => {
      particles.push({
        x: Math.random() * (canvas.width || 1920),
        y: Math.random() * (canvas.height || 1080),
        size: 220 + i * 80,
        dx: (0.2 + Math.random() * 0.3) * (i % 2 === 0 ? 1 : -1),
        dy: (0.15 + Math.random() * 0.25) * (i % 2 === 0 ? -1 : 1),
        rotation: 0,
        rotationSpeed: 0,
        opacity: 1,
        type: 'orb',
        color,
      })
    })

    // Floating tiny document shapes
    for (let i = 0; i < 6; i++) {
      particles.push({
        x: Math.random() * (canvas.width || 1920),
        y: Math.random() * (canvas.height || 1080),
        size: 12 + Math.random() * 18,
        dx: (0.1 + Math.random() * 0.2) * (Math.random() > 0.5 ? 1 : -1),
        dy: -0.15 - Math.random() * 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (0.002 + Math.random() * 0.004) * (Math.random() > 0.5 ? 1 : -1),
        opacity: 0.04 + Math.random() * 0.04,
        type: 'doc',
        color: i % 2 === 0 ? 'rgba(16,185,129,1)' : 'rgba(234,179,8,1)',
      })
    }

    const drawDoc = (p: Particle) => {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)
      ctx.globalAlpha = p.opacity

      // Document rectangle with folded corner
      const w = p.size
      const h = p.size * 1.3
      const fold = p.size * 0.3

      ctx.beginPath()
      ctx.moveTo(-w / 2, -h / 2)
      ctx.lineTo(w / 2 - fold, -h / 2)
      ctx.lineTo(w / 2, -h / 2 + fold)
      ctx.lineTo(w / 2, h / 2)
      ctx.lineTo(-w / 2, h / 2)
      ctx.closePath()
      ctx.strokeStyle = p.color
      ctx.lineWidth = 1
      ctx.stroke()

      // Fold line
      ctx.beginPath()
      ctx.moveTo(w / 2 - fold, -h / 2)
      ctx.lineTo(w / 2 - fold, -h / 2 + fold)
      ctx.lineTo(w / 2, -h / 2 + fold)
      ctx.stroke()

      // Text lines
      for (let i = 0; i < 3; i++) {
        const lineY = -h / 2 + fold + 4 + i * (p.size * 0.22)
        const lineW = w * (0.5 + Math.random() * 0.2)
        ctx.beginPath()
        ctx.moveTo(-w / 2 + 3, lineY)
        ctx.lineTo(-w / 2 + 3 + lineW, lineY)
        ctx.stroke()
      }

      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.x += p.dx
        p.y += p.dy
        p.rotation += p.rotationSpeed

        if (p.type === 'orb') {
          if (p.x - p.size < 0 || p.x + p.size > canvas.width) p.dx *= -1
          if (p.y - p.size < 0 || p.y + p.size > canvas.height) p.dy *= -1

          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
          gradient.addColorStop(0, p.color)
          gradient.addColorStop(1, 'rgba(0,0,0,0)')

          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
        } else {
          // Wrap documents around screen
          if (p.y + p.size < 0) p.y = canvas.height + p.size
          if (p.x < -p.size) p.x = canvas.width + p.size
          if (p.x > canvas.width + p.size) p.x = -p.size

          drawDoc(p)
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  )
}
