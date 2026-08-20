import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { XCircle, BarChart3, Siren, TrendingDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const traps = [
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
];

export default function TrapSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
          <span className="text-xs tracking-[0.3em] uppercase text-red-400">Figyelmeztetés</span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance max-w-4xl">
          A csapda, amibe ne essünk bele.
        </h2>

        <p className="text-lg text-muted-foreground mb-16 max-w-2xl">
          Nem elég tudni, mit kell tenni — tudni kell azt is, mi az, ami elronthatja.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {traps.map((trap, index) => (
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
