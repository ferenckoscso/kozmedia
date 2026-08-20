import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Shield, Eye, Database, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: Zap,
    title: 'Hatékonyság',
    subtitle: 'Agilis, adatvezérelt működés',
    description:
      'A közmédia az EU-ban a legbürokratikusabb felépítésű közszolgálati szervezetek közé tartozik. A szervezeti átalakítás a tartalomstruktúra átalakításával kezdődik. Nem önmagában a leépítés vagy a centralizáció a cél, hanem a hatékonyság növelése.',
    points: [
      'A bürokratikus akadályok lebontása',
      'Automatizálás következetes alkalmazása',
      'Az archívum teljes feldolgozása és a tudásbázis kiépítése',
      'A hibázás lehetőségének fenntartása — és az abból való tanulás',
    ],
  },
  {
    icon: Shield,
    title: 'Hitelesség',
    subtitle: 'Kriptográfiai tartalom-hitelesítés',
    description:
      'A hitelesség a közmédia legfontosabb értéke. C2PA szabvány szerinti hitelesítéssel a közmédia számára megőrizhető a megbízhatóság. A klasszikus nézettségmérés helyett cross-platform elérést és társadalmi hasznosságot mérő rendszer szükséges.',
    points: [
      'C2PA szabvány szerinti hitelesítés bevezetése',
      'Transzparens szerkesztői döntéshozatal',
      'Strukturális garanciák az intézményi függetlenség védelmére',
      'A szerkesztői függetlenség abszolút prioritása',
    ],
  },
  {
    icon: Eye,
    title: 'Transzparencia',
    subtitle: 'Radikális nyitottság minden szinten',
    description:
      'A jövőálló közmédia transzparenciájának fokozása nemcsak közérdekű adatként kezeli a vezetői értekezletek jegyzőkönyveit, a produkciós és szállítási szerződéseket, hanem az ajánlóalgoritmusok logikáját is alapértelmezetten nyilvánossá teszi.',
    points: [
      'Vezetői értekezletek jegyzőkönyvei nyilvánosak',
      'Produkciós és szállítási szerződések nyilvánossága',
      'Ajánlóalgoritmusok logikájának transzparenciája',
      'Nyilvános, szakmai egyeztetésen alapuló mutatórendszer',
    ],
  },
  {
    icon: Database,
    title: 'Közadat',
    subtitle: 'Az archívum, mint nemzeti közvagyon',
    description:
      'Az archívum a közadat központi tartópillére. A teljes audiovizuális örökség metaadatolása, leiratozása és feltárása nemcsak a közmédia belső munkáját segíti, hanem a magyar mesterséges intelligencia szuverenitás és egy jövőbeli tudásasszisztens technológiai alapja is.',
    points: [
      'Teljes audiovizuális örökség metaadatolása AI-támogatással',
      'Nemcsak kutatók és alkotók, hanem minden állampolgár számára hozzáférhető',
      'A magyar AI-szuverenitás technológiai alapja',
      'Tudásasszisztens platform építése az archívumra',
    ],
  },
];

export default function FourPillarsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pillar-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
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
        <div className="mb-4 text-center">
          <span className="text-xs tracking-[0.3em] uppercase text-gold">A megoldás</span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance text-center max-w-4xl mx-auto">
          Négy pillér, egy cél.
        </h2>

        <p className="text-lg text-muted-foreground mb-16 text-center max-w-2xl mx-auto">
          A jövőálló közmédia nem a múlt restaurációja, hanem a jelen kihívásaira adott válasz.
        </p>

        <div className="space-y-4">
          {pillars.map((pillar, index) => (
            <div key={index} className="pillar-card">
              <div
                className={`glass-card border transition-all duration-500 overflow-hidden ${
                  openIndex === index
                    ? 'border-gold/50 bg-dark-card'
                    : 'border-dark-border/50 hover:border-gold/20'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 md:p-8 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                        openIndex === index ? 'bg-gold/20' : 'bg-gold/10'
                      }`}
                    >
                      <pillar.icon
                        className={`w-6 h-6 transition-colors duration-300 ${
                          openIndex === index ? 'text-gold' : 'text-gold/70'
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground">
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{pillar.subtitle}</p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-muted-foreground transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`transition-all duration-500 ease-in-out ${
                    openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2">
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {pillar.description}
                    </p>
                    <ul className="space-y-3">
                      {pillar.points.map((point, pidx) => (
                        <li key={pidx} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                          <span className="text-sm text-foreground/80">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
