import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calculator, PiggyBank, TrendingUp, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FinanceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [salary, setSalary] = useState(500000);
  const szjaRate = 0.15;
  const mediaContributionRate = 0.004; // 0,4 százalékpontos SZJA-kulcsemelés (15% -> 15,4%), a jövedelemre vetítve

  const monthlySZJA = salary * szjaRate;
  const monthlyMedia = salary * mediaContributionRate;
  const dailyMedia = monthlyMedia / 30;

  // yearly and total values available for future use
  // const yearlyMedia = monthlyMedia * 12;
  // const totalSZJA = monthlySZJA * 12;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.finance-card',
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

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('hu-HU').format(Math.round(num));
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 section-padding bg-dark-lighter/30"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-4">
          <span className="text-xs tracking-[0.3em] uppercase text-gold">Finanszírozás</span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance max-w-4xl">
          Mennyibe kerül egy jövőálló közmédia?
        </h2>

        <p className="text-lg text-muted-foreground mb-16 max-w-2xl">
          Az alábbi kalkulátorral megnézheted, mennyi lenne a havi közteher az SZJA 0,4 százalékpontos
          emelésével (15%-ról 15,4%-ra) — ami a Manifesztum számításai szerint kb. 125–130 milliárd
          forintos éves bevételt biztosítana a közmédiának.
        </p>

        {/* Calculator */}
        <div className="finance-card glass-card border border-gold/20 p-8 md:p-12 mb-12">
          <div className="flex items-center gap-3 mb-8">
            <Calculator className="w-6 h-6 text-gold" />
            <h3 className="text-xl font-bold text-foreground">Kalkulátor</h3>
          </div>

          <div className="mb-8">
            <label className="block text-sm text-muted-foreground mb-3">
              Havi bruttó béred (Ft):
            </label>
            <input
              type="range"
              min="250000"
              max="2000000"
              step="50000"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              className="w-full h-2 bg-dark-border rounded-lg appearance-none cursor-pointer accent-gold mb-4"
            />
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                className="bg-dark-card border border-dark-border rounded-lg px-4 py-2 text-foreground w-40 focus:outline-none focus:border-gold/50"
              />
              <span className="text-muted-foreground">Ft / hó</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-dark-card/50 rounded-lg border border-dark-border/50">
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {formatNumber(monthlySZJA)}
                <span className="text-lg"> Ft</span>
              </div>
              <div className="text-sm text-muted-foreground">Havi SZJA (15%)</div>
            </div>
            <div className="text-center p-6 bg-gold/5 rounded-lg border border-gold/20">
              <div className="text-3xl md:text-4xl font-bold gold-gradient-text mb-2">
                {formatNumber(monthlyMedia)}
                <span className="text-lg"> Ft</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Közmédia-hozzájárulás (SZJA +0,4 pp)
              </div>
            </div>
            <div className="text-center p-6 bg-dark-card/50 rounded-lg border border-dark-border/50">
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {formatNumber(dailyMedia)}
                <span className="text-lg"> Ft</span>
              </div>
              <div className="text-sm text-muted-foreground">Napi közmédia-hozzájárulás</div>
            </div>
          </div>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="finance-card glass-card p-6 border border-dark-border/50">
            <PiggyBank className="w-8 h-8 text-gold mb-4" />
            <div className="text-3xl font-bold text-foreground mb-2">125–130 Mrd Ft</div>
            <p className="text-sm text-muted-foreground">
              Éves bevétel egy 0,4 százalékpontos SZJA-kulcsemeléssel — kb. 2700 Ft/fő/hó átlagosan.
            </p>
          </div>
          <div className="finance-card glass-card p-6 border border-dark-border/50">
            <TrendingUp className="w-8 h-8 text-gold mb-4" />
            <div className="text-3xl font-bold text-foreground mb-2">8–15%</div>
            <p className="text-sm text-muted-foreground">
              A Manifesztum szerint ennyi lehet a reklám- és egyéb kereskedelmi bevétel aránya a teljes finanszírozásban.
            </p>
          </div>
          <div className="finance-card glass-card p-6 border border-dark-border/50">
            <Shield className="w-8 h-8 text-gold mb-4" />
            <div className="text-3xl font-bold text-foreground mb-2">Bizalmi index</div>
            <p className="text-sm text-muted-foreground">
              Eléréséig nem kell új adó — a meglévő forrásokból is kihozható a változás.
            </p>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            A finanszírozási modell kettős logikája: a bizalmi indexig nem kell új adó, a meglévő
            forrásokból is kihozható. Elérése után dedikált SZJA-hányad bevezethető.
          </p>
        </div>
      </div>
    </section>
  );
}
