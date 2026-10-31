'use client';
import { useRef, useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';
import { PERSONAL } from '@/lib/data';

const HeroCanvas = lazy(() => import('@/components/3d/HeroCanvas'));

export default function Hero() {
  const mouse = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth - 0.5) * 2,
        -(e.clientY / window.innerHeight - 0.5) * 2,
      ];
    };
    window.addEventListener('mousemove', h, { passive: true });
    return () => window.removeEventListener('mousemove', h);
  }, []);

  return (
    <section id="top" className="relative flex min-h-[100svh] items-start overflow-hidden bg-grid md:min-h-screen md:items-center">
      {/* Glow blobs — CSS only */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#22D3EE] opacity-[0.04] blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] rounded-full bg-[#8B5CF6] opacity-[0.04] blur-[90px]" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-6 px-4 pb-20 pt-32 sm:gap-8 md:grid-cols-2 md:gap-12 md:px-8 md:pb-8 md:pt-32">
        {/* Text — single fade-in */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="z-10 w-full max-w-2xl space-y-5"
        >
          <div className="flex max-w-full items-start gap-3 font-mono text-[10px] leading-5 tracking-[0.16em] text-[#22D3EE] uppercase sm:text-xs sm:tracking-[0.2em]">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#22D3EE] shadow-[0_0_14px_#22D3EE]" />
            <span>Available for new opportunities</span>
          </div>

          <h1 className="text-5xl font-black leading-[1.05] text-white sm:text-6xl md:text-7xl">
            <span className="block">Haroon</span>
            <span className="block gradient-text">Rasool</span>
          </h1>

          <p className="font-mono text-base text-[#22D3EE] sm:text-lg">{PERSONAL.role}</p>

          <p className="max-w-xl text-lg leading-relaxed text-slate-400 sm:text-xl">{PERSONAL.tagline}</p>
          <p className="max-w-lg text-sm leading-relaxed text-slate-500">Turning ideas into elegant digital products through thoughtful engineering and creative problem-solving.</p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:gap-4">
            <MagneticButton
              href="#projects"
              className="w-full rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] px-8 py-3.5 text-center text-sm font-bold text-[#05060A] transition-opacity hover:opacity-90 glow-cyan sm:w-auto"
            >
              View Projects
            </MagneticButton>
            <MagneticButton
              href={PERSONAL.resume}
              isDownload
              className="w-full rounded-xl border border-[#22D3EE44] px-8 py-3.5 text-center text-sm font-semibold text-white transition-colors glass hover:border-[#22D3EE] sm:w-auto"
            >
              Download Resume
            </MagneticButton>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
            {[
              { label: 'GitHub', href: PERSONAL.github },
              { label: 'LinkedIn', href: PERSONAL.linkedin },
              { label: 'Email', href: `mailto:${PERSONAL.email}` },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="font-mono text-xs text-slate-500 hover:text-[#22D3EE] transition-colors tracking-wider">
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* 3D Canvas */}
        <div className="h-[280px] w-full sm:h-[360px] md:h-[520px]">
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-28 h-28 border border-[#22D3EE22] rounded-xl animate-pulse" />
            </div>
          }>
            <HeroCanvas mouse={mouse} />
          </Suspense>
        </div>
      </div>

      {/* Scroll indicator — CSS animation only */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <span className="font-mono text-xs text-slate-600 tracking-widest">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#22D3EE] to-transparent animate-float" />
      </div>
    </section>
  );
}
