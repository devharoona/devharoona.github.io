'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const aura = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring_pos = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };

    const loop = () => {
      // Dot follows instantly
      if (dot.current) {
        dot.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      // Ring lerps behind
      ring_pos.current.x += (pos.current.x - ring_pos.current.x) * 0.18;
      ring_pos.current.y += (pos.current.y - ring_pos.current.y) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate(${ring_pos.current.x - 16}px, ${ring_pos.current.y - 16}px)`;
      }
      if (aura.current) {
        aura.current.style.transform = `translate(${ring_pos.current.x - 42}px, ${ring_pos.current.y - 42}px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };

    const onEnter = () => {
      dot.current?.classList.add('scale-[2.5]');
      ring.current?.classList.add('cursor-ring-active');
      aura.current?.classList.add('cursor-aura-active');
    };
    const onLeave = () => {
      dot.current?.classList.remove('scale-[2.5]');
      ring.current?.classList.remove('cursor-ring-active');
      aura.current?.classList.remove('cursor-aura-active');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="cursor-dot fixed top-0 left-0 w-2 h-2 rounded-full bg-[#22D3EE]/70 pointer-events-none z-[99999] will-change-transform transition-transform duration-100"
        style={{ transform: 'translate(-100px,-100px)' }}
      />
      <div
        ref={ring}
        className="cursor-ring fixed top-0 left-0 w-8 h-8 rounded-full border border-[#22D3EE]/40 pointer-events-none z-[99998] will-change-transform transition-all duration-200"
        style={{ transform: 'translate(-100px,-100px)' }}
      />
      <div
        ref={aura}
        className="cursor-aura fixed top-0 left-0 w-[84px] h-[84px] rounded-full pointer-events-none z-[99997] will-change-transform"
        style={{ transform: 'translate(-100px,-100px)' }}
      >
        <span className="cursor-spark cursor-spark-one" />
        <span className="cursor-spark cursor-spark-two" />
        <span className="cursor-spark cursor-spark-three" />
      </div>
    </>
  );
}
