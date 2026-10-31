import dynamic from 'next/dynamic';
import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Services from '@/components/sections/Services';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

// Custom cursor — client only, no SSR
const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), { ssr: false });

export default function Home() {
  return (
    <>
      <CustomCursor />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#22D3EE] focus:text-[#05060A] focus:rounded-lg focus:font-bold"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
