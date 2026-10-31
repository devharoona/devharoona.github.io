import { NextResponse } from 'next/server';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!name || !emailPattern.test(email) || !subject || !message) {
      return NextResponse.json({ error: 'Please complete every field with valid information.' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Contact delivery is not configured yet. Please email me directly.' }, { status: 503 });
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? 'Portfolio <onboarding@resend.dev>',
        to: [process.env.CONTACT_TO_EMAIL ?? 'haroonrasool2@gmail.com'],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Unable to send your message right now. Please try email instead.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Something went wrong. Please try again or email me directly.' }, { status: 500 });
  }
}
