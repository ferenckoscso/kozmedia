import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const content = {
  hu: {
    label: 'Mesterséges intelligencia',
    heading: 'Ne tiltsuk — szabályozzuk.',
    intro: 'A háromsávos AI-felhasználási keretrendszer. A zöldek alkalmazhatók, a sárgák ellenőrzéssel, a pirosak soha.',
    more: 'Kattints a részletekért',
    less: 'Kattints a becsukáshoz',
    zones: [
      {
        color: 'green',
        icon: CheckCircle,
        title: 'Zöld sáv',
        items: ['Időjárás-vizualizáció', 'Sport-statisztika', 'Archív feliratozás', 'Akadálymentesítés'],
        description: 'Mély AI-integráció. Az AI önállóan dolgozhat, ember csak szúrópróbaszerűen jóváhagy — de az eredetjelölés kötelező.',
      },
      {
        color: 'yellow',
        icon: AlertCircle,
        title: 'Sárga sáv',
        items: ['Kulturális háttéranyag', 'Riport-kontextus', 'Műsorajánló szöveg', 'Interjú-előkészítés'],
        description: 'Az AI minden lépésnél emberi jóváhagyással dolgozik. Az AI asszisztens, nem szerző — a végső szöveg emberé.',
      },
      {
        color: 'red',
        icon: XCircle,
        title: 'Piros sáv',
        items: ['Hírszerkesztőség', 'Politikai tartalom', 'Bírósági tudósítás', 'Választási riport'],
        description: 'Az AI alapból tiltott, vagy csak kivételesen, két független szerkesztő egyidejű jóváhagyásával használható.',
      },
    ],
  },
  en: {
    label: 'Artificial intelligence',
    heading: "Don't ban it — govern it.",
    intro: 'A three-zone framework for AI use. Green is free to use, yellow needs human review, red is never.',
    more: 'Click for details',
    less: 'Click to close',
    zones: [
      {
        color: 'green',
        icon: CheckCircle,
        title: 'Green zone',
        items: ['Weather visualisation', 'Sports statistics', 'Archive captioning', 'Accessibility'],
        description: 'Deep AI integration. AI can work autonomously, with only spot-check human review — but disclosure of AI origin is mandatory.',
      },
      {
        color: 'yellow',
        icon: AlertCircle,
        title: 'Yellow zone',
        items: ['Cultural background material', 'Report context', 'Programme-guide text', 'Interview preparation'],
        description: 'AI works with human sign-off at every step. AI is an assistant, not an author — the final text is always human.',
      },
      {
        color: 'red',
        icon: XCircle,
        title: 'Red zone',
        items: ['News desk', 'Political content', 'Court reporting', 'Election coverage'],
        description: 'AI is off-limits by default, or usable only exceptionally, with simultaneous sign-off from two independent editors.',
      },
    ],
  },
};

export default function AISection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeZone, setActiveZone] = useState<number | null>(null);
  const { language } = useLanguage();
  const t = content[language];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ai-zone',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getZoneColors = (color: string, isActive: boolean) => {
    switch (color) {
      case 'green':
        return isActive
          ? 'border-green-500/50 bg-green-500/10'
          : 'border-green-500/20 bg-green-500/5 hover:border-green-500/40';
      case 'yellow':
        return isActive
          ? 'border-yellow-500/50 bg-yellow-500/10'
          : 'border-yellow-500/20 bg-yellow-500/5 hover:border-yellow-500/40';
      case 'red':
        return isActive
          ? 'border-red-500/50 bg-red-500/10'
          : 'border-red-500/20 bg-red-500/5 hover:border-red-500/40';
      default:
        return '';
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'green':
        return 'text-green-400';
      case 'yellow':
        return 'text-yellow-400';
      case 'red':
        return 'text-red-400';
      default:
        return '';
    }
  };

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

        <div className="space-y-4">
          {t.zones.map((zone, index) => (
            <div
              key={index}
              className="ai-zone"
              onClick={() => setActiveZone(activeZone === index ? null : index)}
            >
              <div
                className={`glass-card border p-6 md:p-8 cursor-pointer transition-all duration-500 ${getZoneColors(
                  zone.color,
                  activeZone === index
                )}`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <zone.icon className={`w-8 h-8 ${getIconColor(zone.color)}`} />
                  <h3 className="text-2xl font-bold text-foreground">{zone.title}</h3>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-4">{zone.description}</p>

                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    activeZone === index ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <ul className="space-y-2 pt-4 border-t border-white/10">
                    {zone.items.map((item, iidx) => (
                      <li key={iidx} className="flex items-start gap-3">
                        <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${getIconColor(zone.color)}`} />
                        <span className="text-sm text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 text-xs text-muted-foreground uppercase tracking-wider">
                  {activeZone === index ? t.less : t.more}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
