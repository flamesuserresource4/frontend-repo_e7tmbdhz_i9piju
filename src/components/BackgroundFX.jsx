import React from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

// Faster neon background: snappier parallax blobs + quicker neon grid + brisker particles
const BackgroundFX = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <ParallaxBlobs />
      <NeonGrid />
      <Particles />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_32%,rgba(0,8,16,0.55)_80%,#000_100%)]" />
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

  // Wider range for a more energetic feel
  const x1 = useTransform(mx, [0, 1], ['-16%', '16%'])
  const y1 = useTransform(my, [0, 1], ['-10%', '10%'])
  const x2 = useTransform(mx, [0, 1], ['12%', '-12%'])
  const y2 = useTransform(my, [0, 1], ['16%', '-16%'])

  return (
    <>
      <motion.div
        style={{ x: x1, y: y1 }}
        className="absolute -top-28 -left-40 w-[52vw] h-[52vw] rounded-full blur-3xl opacity-35"
      >
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(0,230,255,0.42),transparent_58%)]" />
      </motion.div>
      <motion.div
        style={{ x: x2, y: y2 }}
        className="absolute -bottom-40 -right-40 w-[58vw] h-[58vw] rounded-full blur-3xl opacity-30"
      >
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle_at_70%_70%,rgba(0,150,255,0.40),transparent_58%)]" />
      </motion.div>
    </>
  )
}

const NeonGrid = () => {
  return (
    <div className="absolute inset-0">
      {/* quicker moving grid lines */}
      <div className="absolute inset-0 opacity-[0.08]" style={{
        backgroundImage:
          `linear-gradient(rgba(0,255,255,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(0,155,255,0.28) 1px, transparent 1px)` ,
        backgroundSize: '54px 54px',
        backgroundPosition: '0 0, 0 0',
        animation: 'grid-pan 12s linear infinite'
      }} />
      <style>{`
        @keyframes grid-pan { 0% { background-position: 0 0, 0 0; } 100% { background-position: 0 720px, 720px 0; } }
      `}</style>

      {/* conic shimmer */}
      <div className="absolute inset-0 mix-blend-screen opacity-25 animate-spin-fast" style={{
        background: 'conic-gradient(from 0deg, rgba(0,220,255,0.0), rgba(0,220,255,0.16), rgba(0,220,255,0.0))'
      }} />
      <style>{`
        .animate-spin-fast { animation: spinFast 10s linear infinite; }
        @keyframes spinFast { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
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
      particles.current = Array.from({ length: 100 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 1.2, // faster
        vy: (Math.random() - 0.5) * 1.2, // faster
        r: 1 + Math.random() * 1.6,
        c: `rgba(0, 220, 255, ${0.28 + Math.random() * 0.35})`
      }))
    }

    const step = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { x: mx, y: my } = mouse.current
      for (const p of particles.current) {
        const dx = mx - p.x
        const dy = my - p.y
        const d2 = dx*dx + dy*dy
        if (d2 < 200*200) {
          const force = -0.0012 // stronger, quicker reaction
          p.vx += force * dx
          p.vy += force * dy
        }
        p.x += p.vx
        p.y += p.vy

        if (p.x < -10) p.x = window.innerWidth + 10
        if (p.x > window.innerWidth + 10) p.x = -10
        if (p.y < -10) p.y = window.innerHeight + 10
        if (p.y > window.innerHeight + 10) p.y = -10

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.c
        ctx.shadowColor = 'rgba(0,220,255,0.75)'
        ctx.shadowBlur = 10
        ctx.fill()
      }
      raf = requestAnimationFrame(step)
    }

    const onMove = (e) => { mouse.current.x = e.clientX; mouse.current.y = e.clientY }
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
