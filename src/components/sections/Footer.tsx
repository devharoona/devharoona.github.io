import { PERSONAL } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-slate-600">
          © {new Date().getFullYear()} {PERSONAL.name}. Built with Next.js & ♥
        </p>
        <div className="flex gap-6">
          {[
            { label: 'GitHub', href: PERSONAL.github },
            { label: 'LinkedIn', href: PERSONAL.linkedin },
            { label: 'Email', href: `mailto:${PERSONAL.email}` },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-slate-600 hover:text-[#22D3EE] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
