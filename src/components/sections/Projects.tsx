'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionHeading from '@/components/ui/SectionHeading';
import MagneticButton from '@/components/ui/MagneticButton';
import { PROJECTS } from '@/lib/data';

type Project = typeof PROJECTS[number];

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const r = cardRef.current!.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 16;
    const y = -((e.clientY - r.top) / r.height - 0.5) * 16;
    cardRef.current!.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) scale(1.02)`;
  };
  const onLeave = () => { if (cardRef.current) cardRef.current.style.transform = ''; };

  return (
    <motion.article
      ref={cardRef}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="project-card group cursor-pointer"
      style={{ transition: 'transform 0.12s ease' }}
    >
      <div className="project-card__glow" />
      <div className="relative h-48 overflow-hidden rounded-t-[inherit]">
        <Image
          src={project.image} alt={project.title} fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080a10] via-[#080a1066] to-transparent" />
        <div className="absolute top-4 left-4 rounded-full border border-white/10 bg-[#080a10]/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-300">
          0{project.id} / {String(PROJECTS.length).padStart(2, '0')}
        </div>
      </div>
      <div className="relative p-6">
        <div className="mb-2 flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">{project.category}</p>
            <h3 className="text-xl font-bold text-white group-hover:text-[#22D3EE] transition-colors">{project.title}</h3>
          </div>
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#22D3EE] shadow-[0_0_14px_#22D3EE]" />
        </div>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((t, index) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.3 }}
              className="tech-chip tech-chip--animated font-mono text-xs px-2.5 py-1 rounded-md text-slate-300"
              style={{ animationDelay: `${index * 120}ms` }}
            >{t}</motion.span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3" onClick={(e) => e.stopPropagation()}>
          <MagneticButton href={project.github} target="_blank" rel="noopener noreferrer"
            className="project-action project-action--ghost">
            GitHub <span aria-hidden="true">↗</span>
          </MagneticButton>
          {project.live !== '#' && (
            <MagneticButton href={project.live} target="_blank" rel="noopener noreferrer"
              className="project-action project-action--primary">
              Live Demo <span aria-hidden="true">↗</span>
            </MagneticButton>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }} transition={{ duration: 0.25 }}
          className="glass rounded-2xl max-w-2xl w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-52">
            <Image src={project.image} alt={project.title} fill className="object-cover" sizes="672px" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05060A] to-transparent" />
            <button onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center text-white hover:text-[#22D3EE] transition-colors"
              aria-label="Close">✕</button>
          </div>
          <div className="p-8">
            <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
            <p className="text-slate-400 leading-relaxed mb-5">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t) => (
                <span key={t} className="font-mono text-xs px-3 py-1.5 rounded-lg glass-cyan text-[#22D3EE]">{t}</span>
              ))}
            </div>
            <div className="flex gap-4">
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-lg border border-[#22D3EE] text-[#22D3EE] font-mono text-sm hover:bg-[#22D3EE] hover:text-[#05060A] transition-all">
                View on GitHub
              </a>
              {project.live !== '#' && (
                <a href={project.live} target="_blank" rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] text-[#05060A] font-bold text-sm hover:opacity-90 transition-opacity">
                  Live Demo ↗
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  return (
    <SectionWrapper id="projects">
      <SectionHeading label="// 02. projects" title="Featured Work" subtitle="A selection of projects I've built — from concept to production." />
      <div className="grid md:grid-cols-2 gap-6">
        {PROJECTS.map((p) => <ProjectCard key={p.id} project={p} onClick={() => setSelected(p)} />)}
      </div>
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </SectionWrapper>
  );
}
