import React from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'

const Contact = () => {
  return (
    <section id="contact" className="relative py-24 bg-gradient-to-b from-black via-[#050816] to-[#05060a]">
      <div className="container mx-auto px-6 md:px-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-cyan-100">Get in touch</h2>
        <p className="mt-2 text-cyan-200/70 max-w-2xl">Open to collaborations, freelance, or just saying hi.</p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl p-6 bg-white/5 border border-cyan-400/20 backdrop-blur-md"
            onSubmit={(e) => { e.preventDefault(); alert('Thanks! Your message has been noted for this demo.'); }}
          >
            <div className="grid grid-cols-1 gap-4">
              <input placeholder="Your name" className="rounded-xl px-4 py-3 bg-black/40 border border-cyan-400/30 focus:border-cyan-300/60 outline-none text-cyan-100 placeholder:text-cyan-300/40 shadow-[inset_0_0_20px_rgba(0,200,255,0.08)]" />
              <input placeholder="Email" type="email" className="rounded-xl px-4 py-3 bg-black/40 border border-cyan-400/30 focus:border-cyan-300/60 outline-none text-cyan-100 placeholder:text-cyan-300/40 shadow-[inset_0_0_20px_rgba(0,200,255,0.08)]" />
              <textarea placeholder="Message" rows="5" className="rounded-xl px-4 py-3 bg-black/40 border border-cyan-400/30 focus:border-cyan-300/60 outline-none text-cyan-100 placeholder:text-cyan-300/40 shadow-[inset_0_0_20px_rgba(0,200,255,0.08)]" />
              <button className="mt-2 inline-flex justify-center rounded-xl px-5 py-3 text-cyan-50 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 transition shadow-[0_0_30px_rgba(0,200,255,0.2)]">
                Send Message
              </button>
            </div>
          </motion.form>

          <div className="flex items-center">
            <div>
              <div className="text-cyan-200/80">Prefer socials?</div>
              <div className="mt-4 flex items-center gap-4">
                <a href="https://github.com/" className="group inline-flex items-center gap-2 text-cyan-200 hover:text-cyan-50">
                  <Github className="h-6 w-6" />
                  <span>GitHub</span>
                </a>
                <a href="https://linkedin.com/" className="group inline-flex items-center gap-2 text-cyan-200 hover:text-cyan-50">
                  <Linkedin className="h-6 w-6" />
                  <span>LinkedIn</span>
                </a>
                <a href="mailto:aditya@example.com" className="group inline-flex items-center gap-2 text-cyan-200 hover:text-cyan-50">
                  <Mail className="h-6 w-6" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
