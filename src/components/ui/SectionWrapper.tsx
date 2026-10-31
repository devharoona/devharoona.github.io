'use client';
import { ReactNode, useEffect, useRef } from 'react';

interface Props { id: string; children: ReactNode; className?: string; }

export default function SectionWrapper({ id, children, className = '' }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('section-visible'); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`section-animate py-24 px-4 md:px-8 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </section>
  );
}
