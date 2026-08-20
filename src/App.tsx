import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from './sections/HeroSection';
import CrisisSection from './sections/CrisisSection';
import ThreeChangesSection from './sections/ThreeChangesSection';
import TrapSection from './sections/TrapSection';
import FourPillarsSection from './sections/FourPillarsSection';
import AISection from './sections/AISection';
import ArchiveSection from './sections/ArchiveSection';
import PSOSection from './sections/PSOSection';
import FinanceSection from './sections/FinanceSection';
import ClosingSection from './sections/ClosingSection';
import ProgressBar from './components/ProgressBar';
import LanguageToggle from './components/LanguageToggle';
import { LanguageProvider } from './lib/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize scroll-triggered animations for all sections
    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-dark text-foreground overflow-x-hidden">
        <ProgressBar />
        <LanguageToggle />
        <HeroSection />
        <CrisisSection />
        <ThreeChangesSection />
        <TrapSection />
        <FourPillarsSection />
        <AISection />
        <ArchiveSection />
        <PSOSection />
        <FinanceSection />
        <ClosingSection />
      </div>
    </LanguageProvider>
  );
}

export default App;
