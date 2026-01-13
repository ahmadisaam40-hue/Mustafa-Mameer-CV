import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WelcomeOverlay from '@/components/WelcomeOverlay';

const Index = () => {
  const [showOverlay, setShowOverlay] = useState(true);

  return (
    <>
      {showOverlay && (
        <WelcomeOverlay onComplete={() => setShowOverlay(false)} />
      )}
      <main className={`min-h-screen bg-background text-foreground overflow-x-hidden ${showOverlay ? 'overflow-hidden h-screen' : ''}`}>
        <Navigation />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export default Index;
