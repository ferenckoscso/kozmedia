import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { XCircle, BarChart3, Siren, TrendingDown } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const content = {
  hu: {
    label: 'Figyelmeztetés',
    heading: 'A csapda, amibe ne essünk bele.',
    intro: 'Nem elég tudni, mit kell tenni — tudni kell azt is, mi az, ami elronthatja.',
    traps: [
      {
        icon: XCircle,
        title: 'A nyilvánosság nem helyettesíti a minőségi vezetést',
        description:
          'A transzparencia — éppúgy, mint az AI-alkalmazás — csak eszköz. A belső szervezeti kultúra, a szerkesztőségek szakmai autonómiája, a kollegialitás, a sokszínűség és a szerkesztői döntéshozatali mechanizmusok építése nélkül a transzparencia csupán egy másik csődbe juttató forma marad.',
      },
      {
        icon: BarChart3,
        title: 'A minőségi mérőszámok elutasítása',
        description:
          'A minőségi mutatók bevezetésétől ódzkodó vezetők "megmérettetéstől való félelme" nem elvetendő: a minőségi mérés nem lehet sem politikai célzatú, sem bürokratikus teher. Ezért a mutatórendszer kidolgozása szakmai egyeztetésen alapuljon.',
      },
      {
        icon: Siren,
        title: 'Vészhelyzeti tartalomkezelés és dezinformáció',
        description:
          'A jövőálló közmédia független dezinformációs monitoring rendszerrel működjön, amely valós időben figyeli a hazai és nemzetközi hírteret, és riasztást ad veszélyes szintű dezinformációs kampány esetén.',
      },
      {
        icon: TrendingDown,
        title: 'A régi modell utánzása',
        description:
          'A magyar közmédia nem alakítható át reklámbevétel-orientált, kereskedelmi logika mentén működő szereplővé. A célközönség-konfliktus — a hirdetők preferált rétegei vs. a teljes társadalom — örökre elvenné a közmédia legitimitását.',
      },
    ],
  },
  en: {
    label: 'A warning',
    heading: "The trap not to fall into.",
    intro: "It's not enough to know what to do — you also have to know what can ruin it.",
    traps: [
      {
        icon: XCircle,
        title: "Openness doesn't replace quality leadership",
        description:
          "Transparency — just like AI adoption — is only a tool. Without building internal organisational culture, editorial professional autonomy, collegiality, diversity, and editorial decision-making mechanisms, transparency remains just another way to fail.",
      },
      {
        icon: BarChart3,
        title: 'Rejecting quality metrics',
        description:
          "Leaders who shy away from introducing quality indicators out of a \"fear of being measured\" aren't wrong to be cautious: quality measurement must be neither politically motivated nor a bureaucratic burden. That's precisely why the indicator system should be built on professional consensus.",
      },
      {
        icon: Siren,
        title: 'Emergency content handling and disinformation',
        description:
          'A future-proof public media organisation needs an independent disinformation monitoring system that watches the domestic and international news space in real time and raises an alert when a dangerous disinformation campaign is detected.',
      },
      {
        icon: TrendingDown,
        title: 'Copying the old model',
        description:
          "Hungarian public media cannot be turned into an advertising-revenue-driven, commercial-logic actor. The target-audience conflict — advertisers' preferred segments vs. society as a whole — would permanently strip public media of its legitimacy.",
      },
    ],
  },
};

export default function TrapSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = content[language];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.trap-item',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
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

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <span className="text-xs tracking-[0.3em] uppercase text-red-400">{t.label}</span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance max-w-4xl">
          {t.heading}
        </h2>

        <p className="text-lg text-muted-foreground mb-16 max-w-2xl">
          {t.intro}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {t.traps.map((trap, index) => (
            <div key={index} className="trap-item">
              <div className="glass-card p-6 md:p-8 border border-red-500/10 hover:border-red-500/30 transition-colors duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <trap.icon className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-3 text-foreground">{trap.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {trap.description}
                    </p>
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
