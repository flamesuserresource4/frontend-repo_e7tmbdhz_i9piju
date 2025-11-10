import React from 'react'
import { motion } from 'framer-motion'

const skills = [
  { label: 'Frontend', value: 90 },
  { label: 'Backend', value: 85 },
  { label: 'Database', value: 80 },
  { label: 'Machine Learning', value: 75 },
  { label: 'Security', value: 70 },
]

const Skills = () => {
  return (
    <section id="skills" className="relative py-24 bg-gradient-to-b from-[#050816] via-[#03040a] to-black">
      <div className="container mx-auto px-6 md:px-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-cyan-100">Skills</h2>
        <p className="mt-2 text-cyan-200/70 max-w-2xl">A living snapshot of core strengths across the stack.</p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 3D-ish radar simplified: ringed gradient with animated dots */}
          <div className="relative h-80 rounded-3xl bg-[radial-gradient(circle_at_center,rgba(0,200,255,0.18)_0%,rgba(0,0,0,0.2)_55%,transparent_60%)] border border-cyan-400/30 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_45%,rgba(0,200,255,0.12)_46%,transparent_48%,transparent_60%,rgba(0,200,255,0.08)_61%,transparent_63%)]" />
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(0,200,255,0.18)_20deg,transparent_40deg)] animate-spin-slow" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="w-1/2 h-1/2 rounded-full border border-cyan-400/20" />
            </div>
            <div className="absolute inset-0">
              {skills.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="absolute"
                  style={{
                    left: `${10 + i * 16}%`,
                    top: `${20 + i * 10}%`
                  }}
                >
                  <div className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-200 text-xs border border-cyan-400/30 backdrop-blur-sm">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* animated bars */}
          <div className="space-y-6">
            {skills.map((s, i) => (
              <div key={s.label}>
                <div className="flex items-center justify-between text-cyan-100 mb-2">
                  <span>{s.label}</span>
                  <span className="text-cyan-300/80">{s.value}%</span>
                </div>
                <div className="h-3 rounded-full bg-white/5 overflow-hidden border border-cyan-400/20">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.1 }}
                    className="h-full bg-[linear-gradient(90deg,#0ff_0%,#09f_50%,#0ff_100%)] shadow-[0_0_24px_4px_rgba(0,200,255,0.35)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
