import React from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const skills = [
  { label: 'Frontend', value: 92, details: ['React', 'Tailwind', 'Framer Motion'] },
  { label: 'Backend', value: 86, details: ['Node.js', 'Express', 'FastAPI'] },
  { label: 'Database', value: 82, details: ['MongoDB', 'MySQL'] },
  { label: 'Machine Learning', value: 76, details: ['Vision', 'NLP', 'Model Ops'] },
  { label: 'Security', value: 74, details: ['Cybersec', 'NetSec', 'VAPT'] },
]

const Skills = () => {
  return (
    <section id="skills" className="relative py-24 bg-gradient-to-b from-[#050816] via-[#03040a] to-black">
      <div className="container mx-auto px-6 md:px-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-cyan-100">Skills</h2>
        <p className="mt-2 text-cyan-200/70 max-w-2xl">Interactive visualization of strengths, with depth and motion.</p>

        <div className="mt-10 grid grid-cols-1 xl:grid-cols-2 gap-10">
          <HoloRadar />
          <HoloBars />
        </div>
      </div>
    </section>
  )
}

const HoloRadar = () => {
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 40, damping: 20 })
  const sy = useSpring(my, { stiffness: 40, damping: 20 })
  const rotX = useTransform(sy, [0, 1], [8, -8])
  const rotY = useTransform(sx, [0, 1], [-8, 8])

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }

  return (
    <motion.div
      onMouseMove={onMove}
      style={{ rotateX: rotX, rotateY: rotY }}
      className="relative h-[26rem] rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/5 via-black/20 to-cyan-500/10 backdrop-blur-md overflow-hidden"
    >
      {/* rings */}
      <div className="absolute inset-0 opacity-60 [mask-image:radial-gradient(circle_at_center,black_60%,transparent_100%)]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at center, rgba(0,180,255,0.18) 0%, transparent 60%)`
        }} />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute inset-0 rounded-full border border-cyan-400/15" style={{ transform: `scale(${0.35 + i * 0.11})` }} />
        ))}
      </div>

      {/* sweep */}
      <div className="absolute inset-0 animate-spin-slow opacity-25" style={{
        background: 'conic-gradient(from 0deg, transparent 0deg, rgba(0,220,255,0.25) 20deg, transparent 40deg)'
      }} />

      {/* nodes */}
      <div className="absolute inset-0">
        {skills.map((s, i) => {
          const angle = (i / skills.length) * Math.PI * 2
          const radius = 140
          const cx = 0.5 + Math.cos(angle) * (radius / 600)
          const cy = 0.5 + Math.sin(angle) * (radius / 600)
          const left = `calc(${cx * 100}% - 14px)`
          const top = `calc(${cy * 100}% - 14px)`
          return (
            <motion.div key={s.label} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="absolute" style={{ left, top }}>
              <div className="relative">
                <div className="h-7 w-7 rounded-full bg-cyan-400/30 border border-cyan-300/50 shadow-[0_0_22px_rgba(0,200,255,0.5)]" />
                <div className="absolute -left-1/2 top-7 whitespace-nowrap text-xs text-cyan-200/90">{s.label}</div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* grid */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage:
          `linear-gradient(rgba(0,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(0,155,255,0.25) 1px, transparent 1px)` ,
        backgroundSize: '50px 50px'
      }} />
    </motion.div>
  )
}

const HoloBars = () => {
  return (
    <div className="space-y-6">
      {skills.map((s, i) => (
        <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="relative rounded-2xl border border-cyan-400/20 bg-white/5 backdrop-blur-md p-4 overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="text-cyan-100 font-medium">{s.label}</div>
            <div className="text-cyan-300/80 text-sm">{s.value}%</div>
          </div>
          <div className="mt-3 h-3 rounded-full bg-black/40 border border-cyan-400/20 overflow-hidden">
            <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.value}%` }} viewport={{ once: true }} transition={{ duration: 1.2, delay: i * 0.08 }} className="h-full relative">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,#0ff_0%,#09f_50%,#0ff_100%)]" />
              <div className="absolute inset-0 opacity-50 mix-blend-screen animate-[pulseGlow_2.5s_ease-in-out_infinite] bg-[radial-gradient(circle_at_10%_50%,rgba(255,255,255,0.25),transparent_35%),radial-gradient(circle_at_90%_50%,rgba(255,255,255,0.25),transparent_35%)]" />
              <style>{`@keyframes pulseGlow { 0%,100%{opacity:.35} 50%{opacity:.8} }`}</style>
            </motion.div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {s.details.map((d) => (
              <span key={d} className="px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-200 text-xs border border-cyan-400/30">{d}</span>
            ))}
          </div>
          {/* glow overlay */}
          <div className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
        </motion.div>
      ))}
    </div>
  )
}

export default Skills
