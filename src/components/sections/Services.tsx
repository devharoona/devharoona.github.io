import { Gauge, Layers3, Monitor, Plug, Server, Smartphone } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionHeading from '@/components/ui/SectionHeading';
import { SERVICES } from '@/lib/data';

const ICONS = { layers: Layers3, monitor: Monitor, server: Server, smartphone: Smartphone, plug: Plug, gauge: Gauge };

export default function Services() {
  return (
    <SectionWrapper id="services">
      <SectionHeading label="// 03. what I do" title="Built For The Real World" subtitle="A practical toolkit for turning ambitious ideas into useful digital products." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, index) => {
          const Icon = ICONS[service.icon as keyof typeof ICONS];
          return (
            <article key={service.title} className="service-card group">
              <div className="mb-8 flex items-center justify-between">
                <Icon className="text-[#22D3EE] transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-6" size={24} strokeWidth={1.5} aria-hidden="true" />
                <span className="font-mono text-xs text-slate-600">0{index + 1}</span>
              </div>
              <h3 className="mb-3 text-lg font-bold text-white transition-colors group-hover:text-[#22D3EE]">{service.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{service.description}</p>
            </article>
          );
        })}
      </div>
    </SectionWrapper>
  );
}