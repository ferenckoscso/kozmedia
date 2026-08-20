import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CrisisSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
          <span className="text-xs tracking-[0.3em] uppercase text-gold">A helyzet diagnózisa</span>
        </div>

        <h2 className="crisis-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-16 text-balance">
          A közmédia paradoxon: több forrás, kevesebb bizalom.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: paradox box */}
          <div className="crisis-panel bg-dark-card border border-dark-border/50 rounded-2xl p-8 md:p-10 flex flex-col">
            <div className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6 text-center">
              A közmédia paradoxona
            </div>

            <div className="text-center mb-3">
              <span className="text-6xl md:text-7xl font-bold gold-gradient-text tabular-nums">0,19</span>
              <span className="text-3xl md:text-4xl font-bold text-gold">%</span>
            </div>
            <p className="text-sm text-muted-foreground text-center mb-8 leading-relaxed">
              a GDP-ből közmédia-finanszírozásra, 2025
              <br />
              (MTVA keretösszeg / KSH GDP)
            </p>

            <div className="bg-white/5 rounded-lg p-5 mb-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm text-foreground/80 w-36 flex-shrink-0">Magyarország (2025)</span>
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
                <span className="text-sm text-foreground/80 w-36 flex-shrink-0">Európai (EBU) átlag</span>
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
                A hazai arány az európai átlag kb. 1,8-szorosa.
              </p>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-dark-border" />
              <span className="font-serif italic text-gold text-lg">mégis</span>
              <div className="flex-1 h-px bg-dark-border" />
            </div>

            <div className="text-center mb-3">
              <span className="text-6xl md:text-7xl font-bold text-foreground tabular-nums">17</span>
              <span className="text-3xl md:text-4xl font-bold text-foreground">%</span>
            </div>
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              bizalmi index — 2026, a 48 ország közül
              <br />
              önmagában a legalacsonyabb
            </p>
          </div>

          {/* Right: trend chart */}
          <div className="crisis-panel bg-dark-card border border-dark-border/50 rounded-2xl p-8 md:p-10 flex flex-col">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">
              Közbizalom a hírekben — Magyarország
            </h3>
            <p className="text-sm text-muted-foreground mb-10">
              Reuters Institute, Digital News Report 2024–2026
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
              A bizalom három év alatt <span className="text-red-400 font-medium not-italic">5 százalékponttal zuhant</span>,
              miközben a hazai közmédia-finanszírozás GDP-aránya nem csökkent, és tartósan az európai átlag felett marad.
            </p>
          </div>
        </div>

        {/* Methodology footnote */}
        <div className="crisis-panel mt-8 pt-6 border-t border-dark-border/50">
          <p className="text-xs text-muted-foreground/70 leading-relaxed">
            <span className="text-muted-foreground font-medium">A számítás módszertana.</span> Hazai
            GDP-arány: az MTVA Országgyűlés által elfogadott éves keretösszege osztva a KSH által
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
          </p>
        </div>
      </div>
    </section>
  );
}
