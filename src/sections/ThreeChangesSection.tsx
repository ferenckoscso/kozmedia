import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Smartphone, Bot, Radio } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const changes = [
  {
    icon: Smartphone,
    title: 'A platformok uralma',
    description:
      'A vezető közösségimédia-platformok tulajdonosai ma nyíltan, dokumentáltan dolgoznak azon, hogy a hagyományos, professzionális újságírást felváltsák egy platform-vezérelt nyilvánossággal. Amikor 2025 elején az egyik legnagyobb közösségimédia-vállalat megszüntette a független ténykereső programját, és azt "közösségi jegyzetek" rendszerére cserélte, a nyilvánosság egyik legnagyobb szereplője lemondott arról, hogy különbséget tegyen tény és állítás között.',
    stat: '2025. jan.',
    statLabel: 'a Meta megszünteti a független ténykeresést',
  },
  {
    icon: Bot,
    title: 'A szintetikus tartalom kora',
    description:
      'A generatív mesterséges intelligencia ma már havonta több milliárd képet és videót állít elő — olcsón, tömegesen, és egyre nehezebben megkülönböztethetően a valóditól. A mérések szerint a frissen létrehozott weboldalak több mint 70%-a már tartalmaz valamennyi AI-generált tartalmat, és egyes előrejelzések szerint az online tartalom akár 90%-a is szintetikus lehet a következő időszakban.',
    stat: '70%+',
    statLabel: 'új weboldal tartalmaz AI-generált tartalmat',
  },
  {
    icon: Radio,
    title: 'A hírfogyasztási szokások átalakulása',
    description:
      'A különböző nemzedékek ma már teljesen eltérő módon tájékozódnak. Egy húszéves jó eséllyel soha életében nem kapcsol be lineáris tévéadást — ő a közösségi médiából, rövid videókból, és egyre inkább egy mesterségesintelligencia-alapú asszisztenstől tájékozódik. Ez nem ízléskülönbség: három egymás mellett élő nemzedék három különböző információs univerzumban mozog.',
    stat: '25 alatt',
    statLabel: 'a huszonöt év alattiak jelentős része már hetente chatbottól kér híreket',
  },
];

export default function ThreeChangesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.change-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.2,
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
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="mb-4">
          <span className="text-xs tracking-[0.3em] uppercase text-gold">Három alapvető változás</span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance max-w-4xl">
          Amitől minden korábbi stratégia elavulttá vált.
        </h2>

        <p className="text-lg text-muted-foreground mb-16 max-w-2xl">
          A médiaipar az elmúlt öt évben átesett egy olyan technológiai paradigmaváltáson, amely minden korábbi stratégiát elavulttá tesz.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {changes.map((change, index) => (
            <div
              key={index}
              className="change-card group cursor-pointer"
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              <div
                className={`glass-card p-6 md:p-8 h-full transition-all duration-500 border ${
                  activeIndex === index
                    ? 'border-gold/50 bg-dark-card'
                    : 'border-dark-border/50 hover:border-gold/30'
                }`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
                    <change.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gold tabular-nums">{change.stat}</div>
                    <div className="text-xs text-muted-foreground">{change.statLabel}</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-4 text-foreground">{change.title}</h3>

                <p
                  className={`text-muted-foreground leading-relaxed transition-all duration-500 ${
                    activeIndex === index ? '' : 'line-clamp-3'
                  }`}
                >
                  {change.description}
                </p>

                <div className="mt-4 text-xs text-gold uppercase tracking-wider">
                  {activeIndex === index ? 'Kattints újra a becsukáshoz' : 'Kattints a részletekért'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
