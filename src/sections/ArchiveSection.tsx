import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Brain, Landmark, Users } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const content = {
  hu: {
    label: 'Közadat',
    heading: 'Az archívum nem raktár — alap.',
    intro: 'A közmédia archívuma a közadat központi tartópillére. Metaadatolás, leiratozás, AI-támogatás — ez a jövő alapja.',
    layers: [
      {
        icon: BookOpen,
        title: 'Digitális archívum',
        description: 'A teljes audiovizuális örökség metaadatolása, leiratozása és feltárása AI-támogatással.',
      },
      {
        icon: Brain,
        title: 'Tudásasszisztens',
        description: 'Magyar nyelvű, forrásmegjelölt AI-asszisztens, amely az archívumra épülve válaszol a felhasználók kérdéseire.',
      },
      {
        icon: Landmark,
        title: 'Nemzeti tudásvagyon',
        description: 'Nemcsak kutatók és alkotók, hanem minden állampolgár számára hozzáférhető közadat.',
      },
      {
        icon: Users,
        title: 'AI-szuverenitás',
        description: 'A magyar mesterséges intelligencia szuverenitás technológiai alapja — nem külföldi platformokra támaszkodunk.',
      },
    ],
  },
  en: {
    label: 'Public data',
    heading: "The archive isn't storage — it's the foundation.",
    intro: "Public media's archive is the central pillar of public data. Tagging, transcription, AI support — that's the foundation of the future.",
    layers: [
      {
        icon: BookOpen,
        title: 'Digital archive',
        description: 'AI-assisted tagging, transcription and exploration of the entire audiovisual heritage.',
      },
      {
        icon: Brain,
        title: 'Knowledge assistant',
        description: 'A Hungarian-language, source-citing AI assistant that answers user questions by drawing on the archive.',
      },
      {
        icon: Landmark,
        title: 'National knowledge asset',
        description: 'Public data accessible not just to researchers and creators, but to every citizen.',
      },
      {
        icon: Users,
        title: 'AI sovereignty',
        description: "The technological foundation of Hungarian AI sovereignty — not reliant on foreign platforms.",
      },
    ],
  },
};

export default function ArchiveSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = content[language];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.archive-layer',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.12,
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
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 section-padding bg-dark-lighter/30"
    >
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

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/20 to-transparent hidden md:block" />

          <div className="space-y-8">
            {t.layers.map((layer, index) => (
              <div key={index} className="archive-layer relative pl-0 md:pl-16">
                {/* Dot on the line */}
                <div className="hidden md:flex absolute left-4 top-6 w-5 h-5 rounded-full bg-gold/20 border-2 border-gold items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-gold" />
                </div>

                <div className="glass-card p-6 md:p-8 border border-dark-border/50 hover:border-gold/30 transition-colors duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <layer.icon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{layer.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{layer.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
