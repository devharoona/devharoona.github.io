import Image from 'next/image';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionHeading from '@/components/ui/SectionHeading';
import { PERSONAL, SKILLS } from '@/lib/data';

export default function About() {
  return (
    <SectionWrapper id="about">
      <SectionHeading label="// 01. about" title="Who I Am" subtitle="A little bit about me and what I do." />

      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div className="space-y-6">
          <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border border-[#22D3EE22] glow-cyan">
            <Image
              src={PERSONAL.avatar}
              alt="Haroon Rasool"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 192px, 224px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05060A66] to-transparent" />
          </div>

          <p className="text-slate-400 leading-relaxed text-lg">{PERSONAL.bio}</p>

          <p className="font-mono text-sm text-slate-500">
            <span className="text-[#22D3EE]">// based in</span> {PERSONAL.location}
          </p>

          <div className="flex gap-4">
            {[
              { label: 'GitHub', href: PERSONAL.github },
              { label: 'LinkedIn', href: PERSONAL.linkedin },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs px-4 py-2 rounded-lg border border-[#22D3EE33] text-[#22D3EE] hover:bg-[#22D3EE11] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-slate-500 text-sm mb-5">// tools I work with</p>
          <div className="flex flex-wrap gap-2.5">
            {SKILLS.map((skill) => (
              <span
                key={skill.name}
                className="px-3.5 py-1.5 rounded-lg glass font-mono text-sm hover:scale-105 hover:-translate-y-0.5 transition-transform duration-150 cursor-default"
                style={{ color: skill.color, border: `1px solid ${skill.color}33` }}
              >
                {skill.name}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mt-10">
            {[
              { value: '3+', label: 'Projects' },
              { value: '2+', label: 'Years Coding' },
              { value: 'B.Tech', label: 'CS Engineering' },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-xl p-4 text-center">
                <p className="text-2xl font-black gradient-text">{stat.value}</p>
                <p className="font-mono text-xs text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
