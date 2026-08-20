import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../lib/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const content = {
  hu: {
    label: 'A helyzet diagnózisa',
    heading: 'A közmédia paradoxon: több forrás, kevesebb bizalom.',
    paradoxLabel: 'A közmédia paradoxona',
    fundingCaption1: 'a GDP-ből közmédia-finanszírozásra, 2025',
    fundingCaption2: '(MTVA keretösszeg / KSH GDP)',
    hungaryLabel: 'Magyarország (2025)',
    europeLabel: 'Európai (EBU) átlag',
    ratioNote: 'A hazai arány az európai átlag kb. 1,8-szorosa.',
    yet: 'mégis',
    trustCaption1: 'bizalmi index — 2026, a 48 ország közül',
    trustCaption2: 'önmagában a legalacsonyabb',
    chartTitle: 'Közbizalom a hírekben — Magyarország',
    chartSource: 'Reuters Institute, Digital News Report 2024–2026',
    trendNote1: 'A bizalom három év alatt',
    trendNote1b: '5 százalékponttal zuhant',
    trendNote2:
      ', miközben a hazai közmédia-finanszírozás GDP-aránya nem csökkent, és tartósan az európai átlag felett marad.',
    methodTitle: 'A számítás módszertana.',
    methodology: (
      <>
        Hazai GDP-arány: az MTVA Országgyűlés által elfogadott éves keretösszege osztva a KSH által
        közölt, folyó áron számított éves GDP-vel. 2024: 142,06 mrd Ft / 81 447,7 mrd Ft = 0,174%.
        2025: 165 mrd Ft / 86 893 mrd Ft (KSH, teljes évre vonatkozó első becslés) = 0,190%.
        (2026-ra nincs még hivatalos KSH-GDP; a 154,7 mrd Ft-os elfogadott keretösszeg és egy 2026
        áprilisi, független gazdaságkutatói előrejelzés — Egyensúly Intézet: +1,5% reál növekedés,
        +3,9% átlagos infláció — alapján becsült GDP mellett az arány kb. 0,17% lenne.){' '}
        <span className="text-muted-foreground font-medium">Európai átlag:</span> az EBU „Funding
        of Public Service Media” jelentése szerint az EBU-tagországokban 2024-ben átlagosan havi
        3,6 euró volt az egy főre jutó állami hozzájárulás a közmédiához (évi 43,2 euró); ezt egy
        hozzávetőleges, kb. 40 000 eurós EU-átlag egy főre jutó GDP-vel osztva adódik a kb.
        0,11%-os arány. Ez a szám becslés, nem hivatalos, egységes EU-statisztika — pontosabb,
        országonkénti GDP-arányos összevetés az EBU tagdíjas adatbázisában érhető el.{' '}
        <span className="text-muted-foreground font-medium">Bizalmi index:</span> Reuters
        Institute Digital News Report, Magyarország: 2024 — 23% (holtversenyben Görögországgal, a
        47 vizsgált piac közül a legalacsonyabb); 2025 — 22% (holtversenyben Görögországgal, 48
        piac közül a legalacsonyabb); 2026 — 17% (önmagában a legalacsonyabb, Görögország
        18%-kal követi).
      </>
    ),
  },
  en: {
    label: 'Diagnosing the situation',
    heading: 'The public media paradox: more funding, less trust.',
    paradoxLabel: 'The public media paradox',
    fundingCaption1: 'of GDP spent on public media funding, 2025',
    fundingCaption2: '(MTVA budget / KSH GDP)',
    hungaryLabel: 'Hungary (2025)',
    europeLabel: 'European (EBU) average',
    ratioNote: 'The domestic ratio is about 1.8× the European average.',
    yet: 'yet',
    trustCaption1: 'trust index — 2026, the lowest of all',
    trustCaption2: '48 countries surveyed',
    chartTitle: 'Trust in the news — Hungary',
    chartSource: 'Reuters Institute, Digital News Report 2024–2026',
    trendNote1: 'Trust',
    trendNote1b: 'dropped 5 percentage points',
    trendNote2:
      ' in three years, while domestic public media funding as a share of GDP did not fall, and remains durably above the European average.',
    methodTitle: 'Methodology.',
    methodology: (
      <>
        Domestic GDP ratio: MTVA's annual budget as approved by parliament, divided by the annual
        current-price GDP reported by the Hungarian statistical office (KSH). 2024: HUF 142.06bn /
        HUF 81,447.7bn = 0.174%. 2025: HUF 165bn / HUF 86,893bn (KSH's first full-year estimate) =
        0.190%. (No official 2026 KSH GDP figure exists yet; against the approved HUF 154.7bn
        budget and an independent April 2026 forecast — Equilibrium Institute: +1.5% real growth,
        +3.9% average inflation — the estimated ratio would be about 0.17%.){' '}
        <span className="text-muted-foreground font-medium">European average:</span> per the
        EBU's "Funding of Public Service Media" report, EBU member states averaged €3.6 per capita
        in monthly state contribution to public media in 2024 (€43.2/year); dividing this by a
        rough EU per-capita GDP average of about €40,000 yields the ~0.11% ratio. This figure is
        an estimate, not an official, uniform EU statistic — a more precise, country-by-country
        GDP-weighted comparison is available in the EBU's member database.{' '}
        <span className="text-muted-foreground font-medium">Trust index:</span> Reuters Institute
        Digital News Report, Hungary: 2024 — 23% (tied with Greece, lowest of the 47 markets
        surveyed); 2025 — 22% (tied with Greece, lowest of 48 markets); 2026 — 17% (lowest on its
        own, Greece follows at 18%).
      </>
    ),
  },
};

export default function CrisisSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = content[language];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.crisis-heading',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.crisis-panel',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.2,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
        }
      );

      gsap.fromTo(
        '.compare-fill',
        { width: 0 },
        {
          width: (_i: number, el: Element) => (el.getAttribute('data-width') || '0') + '%',
          duration: 1.2,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 55%' },
        }
      );

      gsap.fromTo(
        '.trend-bar',
        { height: 0 },
        {
          height: (_i: number, el: Element) => (el.getAttribute('data-height') || '0') + 'px',
          duration: 1,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 55%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="crisis" className="relative py-24 md:py-32 section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="crisis-heading mb-4">
          <span className="text-xs tracking-[0.3em] uppercase text-gold">{t.label}</span>
        </div>

        <h2 className="crisis-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-16 text-balance">
          {t.heading}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: paradox box */}
          <div className="crisis-panel bg-dark-card border border-dark-border/50 rounded-2xl p-8 md:p-10 flex flex-col">
            <div className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6 text-center">
              {t.paradoxLabel}
            </div>

            <div className="text-center mb-3">
              <span className="text-6xl md:text-7xl font-bold gold-gradient-text tabular-nums">0,19</span>
              <span className="text-3xl md:text-4xl font-bold text-gold">%</span>
            </div>
            <p className="text-sm text-muted-foreground text-center mb-8 leading-relaxed">
              {t.fundingCaption1}
              <br />
              {t.fundingCaption2}
            </p>

            <div className="bg-white/5 rounded-lg p-5 mb-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm text-foreground/80 w-36 flex-shrink-0">{t.hungaryLabel}</span>
                <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="compare-fill h-full rounded-full bg-gold"
                    data-width="100"
                    style={{ width: 0 }}
                  />
                </div>
                <span className="text-sm font-bold text-foreground w-16 text-right">0,19%</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm text-foreground/80 w-36 flex-shrink-0">{t.europeLabel}</span>
                <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="compare-fill h-full rounded-full bg-muted-foreground/60"
                    data-width="58"
                    style={{ width: 0 }}
                  />
                </div>
                <span className="text-sm font-bold text-foreground w-16 text-right">~0,11%</span>
              </div>
              <p className="text-xs text-muted-foreground italic mt-2">
                {t.ratioNote}
              </p>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-dark-border" />
              <span className="font-serif italic text-gold text-lg">{t.yet}</span>
              <div className="flex-1 h-px bg-dark-border" />
            </div>

            <div className="text-center mb-3">
              <span className="text-6xl md:text-7xl font-bold text-foreground tabular-nums">17</span>
              <span className="text-3xl md:text-4xl font-bold text-foreground">%</span>
            </div>
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              {t.trustCaption1}
              <br />
              {t.trustCaption2}
            </p>
          </div>

          {/* Right: trend chart */}
          <div className="crisis-panel bg-dark-card border border-dark-border/50 rounded-2xl p-8 md:p-10 flex flex-col">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">
              {t.chartTitle}
            </h3>
            <p className="text-sm text-muted-foreground mb-10">
              {t.chartSource}
            </p>

            <div className="flex items-end justify-center gap-8 md:gap-12 border-b border-dark-border pb-0 mb-6 flex-1">
              <div className="flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-bold text-muted-foreground mb-3">23%</span>
                <div
                  className="trend-bar w-16 md:w-20 rounded-t-lg bg-[#8B98AC]"
                  data-height="140"
                  style={{ height: 0 }}
                />
                <span className="text-sm text-muted-foreground mt-3 font-bold">2024</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-bold text-muted-foreground mb-3">22%</span>
                <div
                  className="trend-bar w-16 md:w-20 rounded-t-lg bg-[#5A6B87]"
                  data-height="134"
                  style={{ height: 0 }}
                />
                <span className="text-sm text-muted-foreground mt-3 font-bold">2025</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-bold text-red-400 mb-3">17%</span>
                <div
                  className="trend-bar w-16 md:w-20 rounded-t-lg bg-red-500/80"
                  data-height="104"
                  style={{ height: 0 }}
                />
                <span className="text-sm text-muted-foreground mt-3 font-bold">2026</span>
              </div>
            </div>

            <p className="text-sm md:text-base text-muted-foreground italic leading-relaxed">
              {t.trendNote1} <span className="text-red-400 font-medium not-italic">{t.trendNote1b}</span>{t.trendNote2}
            </p>
          </div>
        </div>

        {/* Methodology footnote */}
        <div className="crisis-panel mt-8 pt-6 border-t border-dark-border/50">
          <p className="text-xs text-muted-foreground/70 leading-relaxed">
            <span className="text-muted-foreground font-medium">{t.methodTitle}</span> {t.methodology}
          </p>
        </div>
      </div>
    </section>
  );
}
