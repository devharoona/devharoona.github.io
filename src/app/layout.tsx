import type { Metadata } from 'next';
import './globals.css';

const siteUrl = 'https://haroonrasool.me';
const description =
  'Haroon Rasool is a software developer focused on full-stack development, artificial intelligence and building practical digital products. Explore projects, skills and professional work.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Haroon Rasool | Software Developer & AI Enthusiast',
    template: '%s | Haroon Rasool',
  },
  description,
  keywords: ['Haroon Rasool', 'haroonrasool', 'Software Developer', 'AI', 'Full-Stack Engineering', 'Portfolio'],
  authors: [{ name: 'Haroon Rasool' }],
  creator: 'Haroon Rasool',
  publisher: 'Haroon Rasool',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Haroon Rasool | Software Developer & AI Enthusiast',
    description,
    url: siteUrl,
    siteName: 'Haroon Rasool Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Haroon Rasool — Software Developer and AI Enthusiast' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Haroon Rasool | Software Developer & AI Enthusiast',
    description,
    images: ['/og-image.svg'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Haroon Rasool',
    url: siteUrl,
    jobTitle: 'Software Developer',
    sameAs: ['https://github.com/devharoona', 'https://linkedin.com/in/haroonrasool'],
  };
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Haroon Rasool',
    url: siteUrl,
    description,
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body id="top" className="bg-bg antialiased">{children}</body>
    </html>
  );
}
