import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, Smartphone, Globe, Cpu, Radio as RadioIcon } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const content = {
  hu: {
    label: 'Rendszerarchitektúra',
    heading: 'A Public Service OS.',
    intro: 'Olyan rendszer, amely egyetlen, integrált platformként működteti a közszolgálati média összes funkcióját.',
    note:
      'Ez a struktúra lehetővé teszi, hogy a felhasználó az archívum alapján saját, személyre szabott „csatornát" építhessen — mind videó-, mind audiótartalomból — az interaktív streaming platformon keresztül.',
    layers: [
      {
        icon: Globe,
        title: 'Alapinfrastruktúra',
        description: 'Megbízható adatátviteli rendszerek, kiszolgálók, szerverek — mint egy modern háztartás villamos hálózata.',
        color: '#6B7280',
      },
      {
        icon: Cpu,
        title: 'Szolgáltatási réteg',
        description: 'A rendszerszintű szoftvereszközök — az operációs rendszer, ami összekapcsolja az alkalmazásokat.',
        color: '#C9A96E',
      },
      {
        icon: Smartphone,
        title: 'Alkalmazási réteg',
        description: 'Streaming, szöveges tartalmak, digitális archívum, közösségi média — a felhasználói felületek.',
        color: '#C9A96E',
      },
      {
        icon: RadioIcon,
        title: 'Tartalmi réteg',
        description: 'Hírek, dokumentumfilmek, szórakoztatás, sport, kultúra, oktatás — maga a tartalom.',
        color: '#C9A96E',
      },
      {
        icon: Layers,
        title: 'Közösségi réteg',
        description: 'Párbeszéd és visszacsatolás a közönséggel — a transzparencia és az interakció tere.',
        color: '#6B7280',
      },
    ],
  },
  en: {
    label: 'System architecture',
    heading: 'The Public Service OS.',
    intro: 'A system that runs every function of public service media as a single, integrated platform.',
    note:
      "This structure lets users build their own personalised \"channel\" from the archive — combining both video and audio content — through the interactive streaming platform.",
    layers: [
      {
        icon: Globe,
        title: 'Base infrastructure',
        description: 'Reliable data-transmission systems, hosts, servers — like a modern household\'s electrical grid.',
        color: '#6B7280',
      },
      {
        icon: Cpu,
        title: 'Service layer',
        description: 'System-level software tools — the operating system that connects the applications.',
        color: '#C9A96E',
      },
      {
        icon: Smartphone,
        title: 'Application layer',
        description: 'Streaming, text content, digital archive, social media — the user-facing surfaces.',
        color: '#C9A96E',
      },
      {
        icon: RadioIcon,
        title: 'Content layer',
        description: 'News, documentaries, entertainment, sport, culture, education — the content itself.',
        color: '#C9A96E',
      },
      {
        icon: Layers,
        title: 'Community layer',
        description: 'Dialogue and feedback with the audience — the space for transparency and interaction.',
        color: '#6B7280',
      },
    ],
  },
};

export default function PSOSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const { language } = useLanguage();
  const t = content[language];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pso-layer',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 section-padding">
      <div className="max-w-5xl mx-auto">
        <div className="mb-4">
          <span className="text-xs tracking-[0.3em] uppercase text-gold">{t.label}</span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance max-w-4xl">
          {t.heading}
        </h2>

        <p className="text-lg text-muted-foreground mb-16 max-w-2xl">
          {t.intro}
        </p>

        {/* OS Stack Visualization */}
        <div className="relative">
          {/* Connection lines */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

          <div className="space-y-3">
            {t.layers.map((layer, index) => (
              <div
                key={index}
                className="pso-layer"
                onMouseEnter={() => setActiveLayer(index)}
                onMouseLeave={() => setActiveLayer(null)}
              >
                <div
                  className={`relative glass-card border p-5 md:p-6 transition-all duration-500 cursor-pointer ${
                    activeLayer === index
                      ? 'border-gold/50 bg-dark-card translate-x-2'
                      : 'border-dark-border/50 hover:border-gold/20'
                  }`}
                  style={{
                    marginLeft: `${index * 12}px`,
                    marginRight: `${(t.layers.length - 1 - index) * 12}px`,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${layer.color}20` }}
                    >
                      <layer.icon className="w-5 h-5" style={{ color: layer.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground">{layer.title}</h3>
                      <p
                        className={`text-sm text-muted-foreground transition-all duration-500 ${
                          activeLayer === index ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0 md:max-h-20 md:opacity-100'
                        } overflow-hidden`}
                      >
                        {layer.description}
                      </p>
                    </div>
                    <div
                      className={`hidden md:block w-3 h-3 rounded-full transition-colors duration-300 ${
                        activeLayer === index ? 'bg-gold' : 'bg-dark-border'
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            {t.note}
          </p>
        </div>
      </div>
    </section>
  );
}
