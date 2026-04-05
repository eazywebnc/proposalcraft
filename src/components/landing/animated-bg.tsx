'use client'

import { useEffect, useRef } from 'react'

interface Orb {
  x: number
  y: number
  radius: number
  dx: number
  dy: number
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

    const colors = [
      'rgba(99,102,241,0.12)',   // indigo
      'rgba(139,92,246,0.10)',   // violet
      'rgba(59,130,246,0.08)',   // blue
      'rgba(124,58,237,0.10)',   // purple
    ]

    const orbs: Orb[] = colors.map((color, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 250 + i * 60,
      dx: (0.3 + Math.random() * 0.4) * (i % 2 === 0 ? 1 : -1),
      dy: (0.2 + Math.random() * 0.3) * (i % 2 === 0 ? -1 : 1),
      color,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const orb of orbs) {
        orb.x += orb.dx
        orb.y += orb.dy

        // Bounce off edges
        if (orb.x - orb.radius < 0 || orb.x + orb.radius > canvas.width) orb.dx *= -1
        if (orb.y - orb.radius < 0 || orb.y + orb.radius > canvas.height) orb.dy *= -1

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius)
        gradient.addColorStop(0, orb.color)
        gradient.addColorStop(1, 'rgba(0,0,0,0)')

        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
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
