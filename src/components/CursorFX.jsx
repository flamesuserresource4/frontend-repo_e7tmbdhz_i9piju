import React from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Faster custom cursor ring + brisk comet trail
const CursorFX = () => {
  const canvasRef = React.useRef(null)
  const clickPulseRef = React.useRef(0)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  // snappier spring
  const sx = useSpring(mx, { stiffness: 1200, damping: 30, mass: 0.45 })
  const sy = useSpring(my, { stiffness: 1200, damping: 30, mass: 0.45 })

  React.useEffect(() => {
    const onMove = (e) => { mx.set(e.clientX); my.set(e.clientY) }
    const onClick = () => { clickPulseRef.current = 1 }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onClick)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mousedown', onClick) }
  }, [mx, my])

  // Canvas comet trail
  React.useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    const points = []

    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight
      canvas.width = w * DPR
      canvas.height = h * DPR
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }

    const step = () => {
      const x = sx.get(), y = sy.get()
      points.push({ x, y })
      if (points.length > 40) points.shift() // shorter, snappier trail

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < points.length; i++) {
        const p = points[i]
        const t = i / points.length
        const r = 1.5 + 6 * (1 - t)
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 220, 255, ${0.1 + 0.4 * (1 - t)})`
        ctx.shadowColor = 'rgba(0,220,255,0.7)'
        ctx.shadowBlur = 14
        ctx.fill()
      }

      // faster click pulse
      if (clickPulseRef.current > 0) {
        const k = clickPulseRef.current
        const radius = 8 + 70 * (1 - (1 - k) * (1 - k))
        ctx.beginPath()
        ctx.arc(sx.get(), sy.get(), radius, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(0,240,255,0.55)'
        ctx.lineWidth = 2
        ctx.shadowColor = 'rgba(0,240,255,0.8)'
        ctx.shadowBlur = 18
        ctx.stroke()
        clickPulseRef.current = Math.max(0, k - 0.09) // fade faster
      }

      raf = requestAnimationFrame(step)
    }

    resize()
    step()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [sx, sy])

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ left: sx, top: sy }}
      >
        <div className="relative">
          <div className="h-5 w-5 rounded-full border border-cyan-400/60 shadow-[0_0_20px_rgba(0,240,255,0.5)]" />
          <div className="absolute inset-0 -m-2 rounded-full border border-cyan-400/30" />
        </div>
      </motion.div>
    </div>
  )
}

export default CursorFX
