'use client';
import { useRef, ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface BaseProps { children: ReactNode; className?: string; }

type AnchorProps = BaseProps & {
  href: string; target?: string; rel?: string; isDownload?: boolean;
  onClick?: never; type?: never;
};
type ButtonProps = BaseProps & {
  href?: never; target?: never; rel?: never; isDownload?: never;
  onClick?: () => void; type?: 'button' | 'submit';
};
type Props = AnchorProps | ButtonProps;

export default function MagneticButton({ children, className = '', ...rest }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  if ('href' in rest && rest.href) {
    const { href, target, rel, isDownload } = rest as AnchorProps;
    return (
      <a
        href={href} target={target} rel={rel}
        {...(isDownload ? { download: true } : {})}
        className={`inline-flex align-middle ${className}`}
      >
        <motion.span
          ref={ref} style={{ x: sx, y: sy }}
          onMouseMove={onMove} onMouseLeave={onLeave}
          className="block"
        >
          {children}
        </motion.span>
      </a>
    );
  }

  const { onClick, type } = rest as ButtonProps;
  return (
    <button type={type ?? 'button'} onClick={onClick} className={`inline-flex align-middle ${className}`}>
      <motion.span
        ref={ref} style={{ x: sx, y: sy }}
        onMouseMove={onMove} onMouseLeave={onLeave}
        className="block"
      >
        {children}
      </motion.span>
    </button>
  );
}