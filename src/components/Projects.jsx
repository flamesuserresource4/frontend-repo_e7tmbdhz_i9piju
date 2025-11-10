import React from 'react'
import { motion } from 'framer-motion'

const projects = [
  {
    title: 'Service Sarthi',
    description: 'Local Service Finder platform built using React, Tailwind, and Vite.',
    image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop',
    tags: ['React', 'Tailwind', 'Vite'],
    link: '#'
  },
  {
    title: 'NutriSnap',
    description: 'AI-powered Nutrition Analyzer built using Next.js and Machine Learning.',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1600&auto=format&fit=crop',
    tags: ['Next.js', 'AI', 'ML'],
    link: '#'
  }
]

const ProjectCard = ({ title, description, image, tags, link }) => (
  <motion.a
    href={link}
    whileHover={{ y: -8 }}
    className="group relative overflow-hidden rounded-2xl bg-white/5 border border-cyan-400/20 hover:border-cyan-300/60 transition backdrop-blur-md"
  >
    <div className="aspect-[16/10] overflow-hidden">
      <img src={image} alt={title} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
    </div>
    <div className="p-5">
      <div className="flex items-center gap-2 mb-2">
        {tags.map((t) => (
          <span key={t} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-200 border border-cyan-400/30">{t}</span>
        ))}
      </div>
      <h3 className="text-xl font-semibold text-cyan-50">{title}</h3>
      <p className="mt-1 text-cyan-200/80 text-sm">{description}</p>
      <div className="mt-4 inline-flex items-center gap-2 text-cyan-300 group-hover:text-cyan-200">
        <span>View Project</span>
        <span className="translate-x-0 group-hover:translate-x-1 transition">→</span>
      </div>
    </div>
    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-b from-transparent via-transparent to-cyan-500/10" />
  </motion.a>
)

const Projects = () => {
  return (
    <section id="projects" className="relative py-24 bg-gradient-to-b from-[#03040a] via-black to-[#050816]">
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-cyan-100">Featured Projects</h2>
            <p className="mt-2 text-cyan-200/70 max-w-2xl">A selection of work blending delightful UX with robust engineering.</p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
