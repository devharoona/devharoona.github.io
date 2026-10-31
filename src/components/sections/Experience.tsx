import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionHeading from '@/components/ui/SectionHeading';
import { EXPERIENCE } from '@/lib/data';

const TYPE_COLORS: Record<string, string> = {
  Internship: '#22D3EE',
  Freelance: '#8B5CF6',
  Education: '#F59E0B',
  Certification: '#22D3EE',
};

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <SectionHeading label="// 03. experience" title="My Journey" />

      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px timeline-line opacity-30 -translate-x-1/2" />

        <div className="space-y-10">
          {EXPERIENCE.map((exp, i) => {
            const isLeft = i % 2 === 0;
            const color = TYPE_COLORS[exp.type] ?? '#22D3EE';
            return (
              <div
                key={i}
                className={`relative flex items-start gap-8 md:gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-[#22D3EE] bg-[#05060A] z-10 mt-6" />
                <div className="hidden md:block md:w-1/2" />
                <div className={`ml-12 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="glass rounded-2xl p-6 hover:border-[#22D3EE22] transition-colors group">
                    <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-[#22D3EE] transition-colors">{exp.role}</h3>
                        <p className="text-slate-400 text-sm">{exp.company}</p>
                      </div>
                      <div className="text-right">
                        <span
                          className="font-mono text-xs px-2.5 py-1 rounded-full"
                          style={{ color, background: `${color}15`, border: `1px solid ${color}33` }}
                        >
                          {exp.type}
                        </span>
                        <p className="font-mono text-xs text-slate-500 mt-1">{exp.period}</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {exp.achievements.map((a, j) => (
                        <li key={j} className="flex items-start gap-2 text-slate-400 text-sm">
                          <span className="text-[#22D3EE] mt-0.5 shrink-0">▸</span>{a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
