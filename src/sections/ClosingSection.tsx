import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const HU_ESSAY_URL =
  'https://medium.com/@mediaengineering/merj%C3%BCnk-nagyot-%C3%A1lmodni-30a047442c1c?sharedUserId=mediaengineering';
const EN_ESSAY_URL = 'https://mediaengineering.medium.com/lets-dare-to-dream-big-5ef59f76d537';

const content = {
  hu: {
    tag: 'Cselekvésre felhívás',
    titlePre: 'Merjünk nagyot ',
    titleGold: 'álmodni.',
    body: 'A jövőálló közmédia nem egy önmagában létező, mindenható entitás, hanem egy szervezet, amely csak akkor válhat azzá, ha a társadalom és az intézmények is készek a vele való együttműködésre.',
    quote: '„A világ elmozdult, és gyorsabban mozog, mint valaha. A kérdés csak az, hogy a közmédia vele mozdul-e."',
    essayCta: 'Olvasd el a teljes esszét',
    essayUrl: HU_ESSAY_URL,
    topCta: 'Ugrás az elejére',
    signature: 'Koscsó Ferenc — Koscso Media Engineering Kft., 2026',
  },
  en: {
    tag: 'A call to action',
    titlePre: 'Dare to dream ',
    titleGold: 'big.',
    body: "Future-proof public media isn't an all-powerful entity that exists on its own — it's an organisation that can only become one if society and its institutions are also ready to work with it.",
    quote: '"The world has shifted, and it\'s moving faster than ever. The only question is whether public media moves with it."',
    essayCta: 'Read the full essay',
    essayUrl: EN_ESSAY_URL,
    topCta: 'Back to top',
    signature: 'Ferenc Koscsó — Koscso Media Engineering Kft., 2026',
  },
};

export default function ClosingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = content[language];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.closing-content',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
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
      className="relative py-24 md:py-40 section-padding bg-gradient-to-b from-dark to-dark-lighter/20"
    >
      <div className="max-w-4xl mx-auto text-center closing-content">
        <div className="mb-8">
          <span className="inline-block px-4 py-2 text-xs tracking-[0.3em] uppercase text-gold border border-gold/30 rounded-full">
            {t.tag}
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 text-balance leading-tight">
          {t.titlePre}
          <span className="gold-gradient-text">{t.titleGold}</span>
        </h2>

        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          {t.body}
        </p>

        <div className="glass-card border border-gold/20 p-8 md:p-12 max-w-2xl mx-auto mb-12">
          <blockquote className="text-xl md:text-2xl font-medium text-foreground leading-relaxed italic">
            {t.quote}
          </blockquote>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={t.essayUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-dark font-bold rounded-lg hover:bg-gold-light transition-colors duration-300"
          >
            <span>{t.essayCta}</span>
            <ArrowUpRight className="w-5 h-5" />
          </a>
          <a
            href="#crisis"
            className="inline-flex items-center gap-2 px-8 py-4 border border-gold/30 text-gold font-bold rounded-lg hover:bg-gold/10 transition-colors duration-300"
          >
            <span>{t.topCta}</span>
          </a>
        </div>

        <div className="mt-20 pt-8 border-t border-dark-border/50">
          <p className="text-sm text-muted-foreground">
            {t.signature}
          </p>
        </div>
      </div>
    </section>
  );
}
