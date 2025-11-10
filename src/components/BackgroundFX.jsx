import React from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// Fixed, low-cost animated background: parallax blobs + neon grid + lightweight particles
const BackgroundFX = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <ParallaxBlobs />
      <NeonGrid />
      <Particles />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,10,20,0.6)_80%,#000_100%)]" />
    </div>
  )
}

const ParallaxBlobs = () => {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  React.useEffect(() => {
    const onMove = (e) => {
      mx.set(e.clientX / window.innerWidth)
      my.set(e.clientY / window.innerHeight)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  const x1 = useTransform(mx, [0, 1], ['-10%', '10%'])
  const y1 = useTransform(my, [0, 1], ['-6%', '6%'])
  const x2 = useTransform(mx, [0, 1], ['6%', '-6%'])
  const y2 = useTransform(my, [0, 1], ['10%', '-10%'])

  return (
    <>
      <motion.div
        style={{ x: x1, y: y1 }}
        className="absolute -top-28 -left-40 w-[50vw] h-[50vw] rounded-full blur-3xl opacity-30"
        
      >
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(0,220,255,0.35),transparent_60%)]" />
      </motion.div>
      <motion.div
        style={{ x: x2, y: y2 }}
        className="absolute -bottom-40 -right-40 w-[55vw] h-[55vw] rounded-full blur-3xl opacity-25"
      >
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle_at_70%_70%,rgba(0,140,255,0.35),transparent_60%)]" />
      </motion.div>
    </>
  )
}

const NeonGrid = () => {
  return (
    <div className="absolute inset-0">
      {/* subtle moving grid lines */}
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage:
          `linear-gradient(rgba(0,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(0,155,255,0.25) 1px, transparent 1px)` ,
        backgroundSize: '60px 60px',
        backgroundPosition: '0 0, 0 0',
        animation: 'grid-pan 30s linear infinite'
      }} />
      <style>{`
        @keyframes grid-pan { 0% { background-position: 0 0, 0 0; } 100% { background-position: 0 600px, 600px 0; } }
      `}</style>

      {/* conic shimmer */}
      <div className="absolute inset-0 mix-blend-screen opacity-20 animate-spin-slow" style={{
        background: 'conic-gradient(from 0deg, rgba(0,200,255,0.0), rgba(0,200,255,0.12), rgba(0,200,255,0.0))'
      }} />
    </div>
  )
}

const Particles = () => {
  const canvasRef = React.useRef(null)
  const mouse = React.useRef({ x: -9999, y: -9999 })
  const particles = React.useRef([])
  const DPR = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1

  React.useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf

    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window
      canvas.width = w * DPR
      canvas.height = h * DPR
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }

    const init = () => {
      particles.current = Array.from({ length: 90 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: 1 + Math.random() * 1.6,
        c: `rgba(0, 200, 255, ${0.25 + Math.random() * 0.35})`
      }))
    }

    const step = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { x: mx, y: my } = mouse.current
      for (const p of particles.current) {
        // simple attraction/repulsion
        const dx = mx - p.x
        const dy = my - p.y
        const d2 = dx*dx + dy*dy
        if (d2 < 220*220) {
          const force = -0.0004 // slight repulsion
          p.vx += force * dx
          p.vy += force * dy
        }
        p.x += p.vx
        p.y += p.vy

        // wrap
        if (p.x < -10) p.x = window.innerWidth + 10
        if (p.x > window.innerWidth + 10) p.x = -10
        if (p.y < -10) p.y = window.innerHeight + 10
        if (p.y > window.innerHeight + 10) p.y = -10

        // draw
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.c
        ctx.shadowColor = 'rgba(0,200,255,0.7)'
        ctx.shadowBlur = 8
        ctx.fill()
      }
      raf = requestAnimationFrame(step)
    }

    const onMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }
    const onLeave = () => { mouse.current.x = -9999; mouse.current.y = -9999 }

    resize()
    init()
    step()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [DPR])

  return <canvas ref={canvasRef} className="absolute inset-0" />
}

export default BackgroundFX
