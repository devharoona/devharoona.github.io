'use client';
import { useState } from 'react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionHeading from '@/components/ui/SectionHeading';
import ContactBg from '@/components/3d/ContactCanvas';
import { PERSONAL } from '@/lib/data';

const SOCIALS = [
  { label: 'GitHub', href: PERSONAL.github, icon: '⌥', sub: 'github.com/devharoona' },
  { label: 'LinkedIn', href: PERSONAL.linkedin, icon: '◈', sub: 'linkedin.com/in/haroonrasool' },
  { label: 'Email', href: `mailto:${PERSONAL.email}`, icon: '✉', sub: PERSONAL.email },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setFeedback('');
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setStatus('sent');
      setFeedback('Thanks. Your message is on its way.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus('error');
      setFeedback(error instanceof Error ? error.message : 'Unable to send your message.');
    }
  };

  return (
    <SectionWrapper id="contact" className="relative overflow-hidden">
      <ContactBg />

      <SectionHeading
        label="// 04. contact"
        title="Let's Work Together"
        subtitle="Have a project in mind? I'd love to hear about it."
      />

      <div className="grid md:grid-cols-2 gap-12 relative z-10">
        <div className="space-y-6">
          <p className="text-slate-400 leading-relaxed text-lg">
            I'm currently open to new opportunities — full-time roles, freelance projects, or just a chat about tech.
          </p>
          <div className="space-y-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 glass rounded-xl p-4 hover:border-[#22D3EE44] transition-colors group"
              >
                <span className="text-[#22D3EE] text-lg w-7 text-center">{s.icon}</span>
                <div>
                  <p className="font-mono text-sm text-white group-hover:text-[#22D3EE] transition-colors">{s.label}</p>
                  <p className="text-slate-500 text-xs">{s.sub}</p>
                </div>
                <span className="ml-auto text-slate-600 group-hover:text-[#22D3EE] transition-colors text-sm">↗</span>
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name' },
            { id: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
            { id: 'subject', label: 'Subject', type: 'text', placeholder: 'What are you building?' },
          ].map((f) => (
            <div key={f.id}>
              <label htmlFor={f.id} className="font-mono text-xs text-slate-500 mb-1.5 block">{f.label}</label>
              <input
                id={f.id} type={f.type} required placeholder={f.placeholder}
                value={form[f.id as 'name' | 'email' | 'subject']}
                onChange={(e) => setForm((prev) => ({ ...prev, [f.id]: e.target.value }))}
                className="w-full glass rounded-xl px-4 py-3 text-white placeholder-slate-600 font-mono text-sm border border-transparent focus:border-[#22D3EE44] focus:outline-none transition-colors"
              />
            </div>
          ))}
          <div>
            <label htmlFor="message" className="font-mono text-xs text-slate-500 mb-1.5 block">Message</label>
            <textarea
              id="message" required rows={5} placeholder="Tell me about your project..."
              value={form.message}
              onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
              className="w-full glass rounded-xl px-4 py-3 text-white placeholder-slate-600 font-mono text-sm border border-transparent focus:border-[#22D3EE44] focus:outline-none transition-colors resize-none"
            />
          </div>
          {feedback && <p role="status" className={`text-sm ${status === 'error' ? 'text-rose-300' : 'text-emerald-300'}`}>{feedback}</p>}
          <button
            type="submit"
            className={`w-full py-4 rounded-xl font-bold text-sm transition-opacity ${
              status === 'sent'
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : status === 'error'
                  ? 'border border-rose-400/30 bg-rose-400/10 text-rose-200'
                  : 'bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] text-[#05060A] hover:opacity-90 glow-cyan'
            }`}
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message sent' : 'Send Message →'}
          </button>
        </form>
      </div>
    </SectionWrapper>
  );
}
