import React from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const skills = [
  { label: 'Frontend', value: 92, details: ['React', 'Tailwind', 'Framer Motion'] },
  { label: 'Backend', value: 86, details: ['Node.js', 'Express', 'FastAPI'] },
  { label: 'Database', value: 82, details: ['MongoDB', 'MySQL'] },
  { label: 'Machine Learning', value: 76, details: ['Vision', 'NLP', 'Model Ops'] },
  { label: 'Security', value: 74, details: ['Cybersec', 'NetSec', 'VAPT'] },
]

const phrases = [
  'Frontend — React, Tailwind, Framer Motion',
  'Backend — Node.js, Express, FastAPI',
  'Database — MongoDB, MySQL',
  'Machine Learning — Vision, NLP, Model Ops',
  'Security — Cybersec, NetSec, VAPT'
]

const Skills = () => {
  return (
    <section id="skills" className="relative py-24 bg-gradient-to-b from-[#040714] via-[#03040a] to-black">
      <div className="container mx-auto px-6 md:px-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-cyan-100">Skills</h2>
        <p className="mt-2 text-cyan-200/70 max-w-2xl">Interactive visualization of strengths, now with a typewriter showcase.</p>

        <div className="mt-10 grid grid-cols-1 xl:grid-cols-2 gap-10">
          <KeyboardTypePanel />
          <HoloBars />
        </div>
      </div>
    </section>
  )
}

const KeyboardTypePanel = () => {
  return (
    <div className="relative h-[20rem] rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/5 via-black/30 to-cyan-500/10 backdrop-blur-md overflow-hidden">
      {/* top bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-cyan-400/20 bg-black/30">
        <span className="h-3 w-3 rounded-full bg-red-500/70" />
        <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
        <span className="h-3 w-3 rounded-full bg-green-500/70" />
        <span className="ml-3 text-xs text-cyan-200/70">skills.tsx</span>
      </div>
      {/* typing body */}
      <div className="relative h-[calc(100%-44px)] p-5 font-mono text-sm leading-7">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(rgba(0,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(0,155,255,0.25) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
        <div className="relative space-y-2">
          <TypeLine prefix="export const skills = [" />
          {phrases.map((p, i) => (
            <TypeLine key={p} prefix={`  // ${String(i + 1).padStart(2, '0')}`} text={` ${p}`} delay={i * 900} speed={28} />
          ))}
          <TypeLine prefix="] as const" delay={phrases.length * 900} />
        </div>
      </div>
    </div>
  )
}

const TypeLine = ({ prefix = '', text = '', delay = 0, speed = 35 }) => {
  const [shown, setShown] = React.useState('')
  const [started, setStarted] = React.useState(false)

  React.useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  React.useEffect(() => {
    if (!started) return
    let i = 0
    const id = setInterval(() => {
      i++
      setShown(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [started, text, speed])

  return (
    <div className="text-cyan-100/90">
      <span className="text-cyan-400/80">{prefix}</span>
      <span> {shown}</span>
      <span className="inline-block w-2 h-4 ml-1 align-middle bg-cyan-300/70 animate-pulse" />
    </div>
  )
}

const HoloBars = () => {
  return (
    <div className="space-y-6">
      {skills.map((s, i) => (
        <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="relative rounded-2xl border border-cyan-400/20 bg-white/5 backdrop-blur-md p-4 overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="text-cyan-100 font-medium">
              <InlineType text={s.label} delay={i * 250} speed={22} />
            </div>
            <div className="text-cyan-300/80 text-sm">{s.value}%</div>
          </div>
          <div className="mt-3 h-3 rounded-full bg-black/40 border border-cyan-400/20 overflow-hidden">
            <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.value}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.04 }} className="h-full relative">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,#0ff_0%,#09f_50%,#0ff_100%)]" />
              <div className="absolute inset-0 opacity-50 mix-blend-screen animate-[pulseGlow_1.8s_ease-in-out_infinite] bg-[radial-gradient(circle_at_10%_50%,rgba(255,255,255,0.25),transparent_35%),radial-gradient(circle_at_90%_50%,rgba(255,255,255,0.25),transparent_35%)]" />
              <style>{`@keyframes pulseGlow { 0%,100%{opacity:.35} 50%{opacity:.85} }`}</style>
            </motion.div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {s.details.map((d, j) => (
              <span key={d} className="px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-200 text-xs border border-cyan-400/30">
                <InlineType text={d} delay={i * 250 + j * 180} speed={18} />
              </span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
        </motion.div>
      ))}
    </div>
  )
}

const InlineType = ({ text, delay = 0, speed = 25 }) => {
  const [shown, setShown] = React.useState('')
  React.useEffect(() => {
    let i = 0
    const start = setTimeout(() => {
      const id = setInterval(() => {
        i++
        setShown(text.slice(0, i))
        if (i >= text.length) clearInterval(id)
      }, speed)
    }, delay)
    return () => clearTimeout(start)
  }, [text, delay, speed])
  return <span>{shown}</span>
}

export default Skills
