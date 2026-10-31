export default function ContactBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-[#22D3EE] opacity-[0.06] blur-[80px] animate-pulse-slow" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-[#8B5CF6] opacity-[0.06] blur-[80px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
    </div>
  );
}
