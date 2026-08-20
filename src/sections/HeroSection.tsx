import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      );
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.7 }
      );
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 1.1 }
      );

      // Parallax on scroll
      gsap.to('.hero-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background Image */}
      <div className="hero-bg absolute inset-0 w-full h-[120%] -top-[10%]">
        <img
          src="/images/parliament-night.jpg"
          alt="Hungarian Parliament at night"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-dark/60 to-dark" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center section-padding max-w-5xl mx-auto">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 text-xs tracking-[0.3em] uppercase text-gold border border-gold/30 rounded-full">
            Manifesztum 2026
          </span>
        </div>
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-balance opacity-0"
        >
          <span className="text-foreground">Merjünk nagyot</span>
          <br />
          <span className="gold-gradient-text">álmodni!</span>
        </h1>
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed opacity-0"
        >
          A magyar közmédia stratégiai újjáépítésének szükségességéről, lehetőségeiről és
          egy jövőálló közszolgálati médiamodell vázlatáról.
        </p>
        <div ref={ctaRef} className="opacity-0">
          <a
            href="#crisis"
            className="inline-flex flex-col items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors duration-300"
          >
            <span className="tracking-widest uppercase">Görgess tovább</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
