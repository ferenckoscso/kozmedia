import { useLanguage } from '../lib/LanguageContext';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      aria-label={language === 'hu' ? 'Switch to English' : 'Váltás magyarra'}
      className="fixed top-4 right-4 z-50 flex items-center gap-1 rounded-full border border-gold/30 bg-dark/70 backdrop-blur px-1 py-1 text-xs font-bold tracking-wide"
    >
      <span
        className={`rounded-full px-3 py-1.5 transition-colors duration-300 ${
          language === 'hu' ? 'bg-gold text-dark' : 'text-muted-foreground'
        }`}
      >
        HU
      </span>
      <span
        className={`rounded-full px-3 py-1.5 transition-colors duration-300 ${
          language === 'en' ? 'bg-gold text-dark' : 'text-muted-foreground'
        }`}
      >
        EN
      </span>
    </button>
  );
}
