'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';

const LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-white/5 py-3' : 'py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#top"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="font-mono text-[#22D3EE] font-semibold text-lg tracking-tight"
        >
          HR<span className="text-white">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => scrollTo(l.href)}
                className="font-mono text-sm text-slate-400 hover:text-[#22D3EE] transition-colors duration-200 tracking-wide"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <MagneticButton
            href="/resume.pdf"
            isDownload
            className="px-5 py-2 rounded-lg border border-[#22D3EE] text-[#22D3EE] font-mono text-sm hover:bg-[#22D3EE] hover:text-[#05060A] transition-all duration-200"
          >
            Resume
          </MagneticButton>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-slate-400 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="text-2xl">{open ? '✕' : '☰'}</span>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/5 overflow-hidden"
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => scrollTo(l.href)}
                    className="font-mono text-slate-300 hover:text-[#22D3EE] transition-colors text-sm w-full text-left"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
              <li>
                <a href="/resume.pdf" download className="font-mono text-[#22D3EE] text-sm">
                  Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
