import React from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import Spline from '@splinetool/react-spline'

const Hero = () => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [0, 1], [8, -8])
  const rotateY = useTransform(x, [0, 1], [-8, 8])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    x.set(px)
    y.set(py)
  }

  return (
    <section id="home" className="relative h-[100svh] w-full overflow-hidden bg-gradient-to-b from-[#05060a] via-[#050816] to-black">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
        {/* soft neon vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,180,255,0.18)_0%,transparent_60%)]" />
      </div>

      <motion.div
        onMouseMove={handleMouseMove}
        style={{ rotateX, rotateY }}
        className="relative z-10 h-full flex items-center"
      >
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-5xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]"
              style={{
                fontFamily: 'Orbitron, Space Grotesk, Inter, system-ui',
                textShadow: '0 0 24px rgba(0,225,255,0.6)',
              }}
            >
              <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#69eaff_0%,#00c2ff_30%,#09f_70%,#69eaff_100%)] drop-shadow-[0_0_12px_rgba(0,200,255,0.4)]">
                Aditya Chaubey
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mt-6 text-lg sm:text-xl text-cyan-100/90 max-w-2xl"
            >
              Crafting interactive, secure, and intelligent digital experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a href="#projects" className="group relative inline-flex items-center gap-2 rounded-xl px-5 py-3 text-cyan-50 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 backdrop-blur-sm transition">
                <span className="relative z-10">View Projects</span>
                <span className="absolute inset-0 rounded-xl shadow-[0_0_32px_4px_rgba(0,200,255,0.35)_inset] group-hover:shadow-[0_0_48px_8px_rgba(0,200,255,0.55)_inset] transition" />
              </a>
              <a href="#contact" className="inline-flex rounded-xl px-5 py-3 text-cyan-200 hover:text-cyan-50 border border-cyan-400/30 hover:border-cyan-300/60/ transition">
                Contact
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* glow lines */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/60 to-transparent" />
    </section>
  )
}

export default Hero
