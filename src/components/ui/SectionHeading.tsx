interface Props {
  label: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ label, title, subtitle }: Props) {
  return (
    <div className="mb-16">
      <p className="font-mono text-[#22D3EE] text-sm tracking-widest uppercase mb-3">
        {label}
      </p>
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h2>
      {subtitle && <p className="text-slate-400 text-lg max-w-2xl">{subtitle}</p>}
      <div className="mt-4 h-px w-24 bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6]" />
    </div>
  );
}
