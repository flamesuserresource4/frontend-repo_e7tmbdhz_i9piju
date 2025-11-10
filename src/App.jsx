import React from 'react'
import { motion } from 'framer-motion'
import Hero from './components/Hero'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'

function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-400/40 selection:text-cyan-50">
      {/* navbar */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md/ bg-black/30 border-b border-white/5">
        <div className="container mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <a href="#home" className="text-cyan-200 font-semibold tracking-wide">AC</a>
          <nav className="hidden sm:flex items-center gap-6 text-cyan-200/80">
            <a href="#stack" className="hover:text-cyan-100">Stack</a>
            <a href="#projects" className="hover:text-cyan-100">Projects</a>
            <a href="#skills" className="hover:text-cyan-100">Skills</a>
            <a href="#contact" className="hover:text-cyan-100">Contact</a>
          </nav>
        </div>
      </header>

      <main className="pt-14">
        <Hero />
        <TechStack />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <footer className="py-10 text-center text-cyan-200/60 bg-black/60 border-t border-white/5">
        © {new Date().getFullYear()} Aditya Chaubey. All rights reserved.
      </footer>

      {/* floating cursor light */}
      <CursorLight />
    </div>
  )
}

const CursorLight = () => {
  const [pos, setPos] = React.useState({ x: 0, y: 0 })
  React.useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[5]"
      style={{
        background: `radial-gradient(600px 300px at ${pos.x}px ${pos.y}px, rgba(0,200,255,0.12), transparent 50%)`
      }}
    />
  )
}

export default App
