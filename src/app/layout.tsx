import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://devharoona.github.io'),
  title: 'Haroon Rasool - Full Stack Developer',
  description:
    'Full Stack Developer from Jammu and Kashmir, India. I build fast, beautiful, production-ready web experiences.',
  keywords: ['Haroon Rasool', 'Full-Stack Developer', 'React', 'Next.js', 'Portfolio', 'Jammu and Kashmir'],
  authors: [{ name: 'Haroon Rasool' }],
  openGraph: {
    title: 'Haroon Rasool - Full Stack Developer',
    description: 'I build scalable, high-performance web applications with clean design and seamless user experiences.',
    url: 'https://devharoona.github.io',
    siteName: 'Haroon Rasool Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Haroon Rasool Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Haroon Rasool — Full-Stack Developer',
    description: 'I build fast, beautiful, production-ready web experiences.',
    images: ['/og-image.svg'],
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-bg antialiased">{children}</body>
    </html>
  );
}
