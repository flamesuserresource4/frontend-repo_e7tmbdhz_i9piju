import React from 'react'
import { motion } from 'framer-motion'
import { Code2, Database, Cpu, Shield, Network } from 'lucide-react'

const icons = [
  { label: 'React', src: 'https://cdn.simpleicons.org/react/61dafb' },
  { label: 'HTML', src: 'https://cdn.simpleicons.org/html5/e34f26' },
  { label: 'CSS', src: 'https://images.unsplash.com/photo-1760764541302-e3955fbc6b2b?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjI2OTY2NDJ8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80' },
  { label: 'JavaScript', src: 'https://cdn.simpleicons.org/javascript/f7df1e' },
  { label: 'Tailwind', src: 'https://cdn.simpleicons.org/tailwindcss/06b6d4' },
  { label: 'Java', src: 'https://images.unsplash.com/photo-1760764541302-e3955fbc6b2b?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjI2OTY2NDJ8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80' },
  { label: 'MySQL', src: 'https://cdn.simpleicons.org/mysql/4479A1' },
  { label: 'MongoDB', src: 'https://cdn.simpleicons.org/mongodb/47A248' },
  { label: 'Express', src: 'https://cdn.simpleicons.org/express/ffffff' },
  { label: 'Node.js', src: 'https://cdn.simpleicons.org/nodedotjs/5FA04E' },
  { label: 'Machine Learning', icon: Cpu },
  { label: 'Cybersecurity', icon: Shield },
  { label: 'Network Security', icon: Network },
  { label: 'VAPT', icon: Code2 },
]

const TechCard = ({ label, src, icon: Icon }) => (
  <motion.div
    whileHover={{ y: -6, scale: 1.04 }}
    className="group rounded-2xl p-4 bg-white/5 border border-cyan-400/20 hover:border-cyan-300/50 transition backdrop-blur-md shadow-[0_0_0_0_rgba(0,200,255,0)] hover:shadow-[0_0_30px_2px_rgba(0,200,255,0.35)]"
  >
    <div className="h-16 w-16 mx-auto flex items-center justify-center">
      {src ? (
        <img src={src} alt={label} className="h-12 w-12 object-contain drop-shadow-[0_0_12px_rgba(0,200,255,0.35)]" />
      ) : (
        <Icon className="h-12 w-12 text-cyan-300 drop-shadow-[0_0_12px_rgba(0,200,255,0.35)]" />
      )}
    </div>
    <div className="mt-3 text-center text-sm text-cyan-100/90">{label}</div>
  </motion.div>
)

const TechStack = () => {
  return (
    <section id="stack" className="relative py-20 bg-gradient-to-b from-black via-[#050816] to-[#03040a]">
      <div className="container mx-auto px-6 md:px-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-cyan-100">
          Tech Stack
        </h2>
        <p className="mt-2 text-cyan-200/70 max-w-2xl">Floating, glowing icons for the tools and domains I work with.</p>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {icons.map((item) => (
            <TechCard key={item.label} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStack
