import { Link } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import BookingWidget from './BookingWidget';
import heroImg from '@/assets/hero-hotel.jpg';

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" id="hero">
      {/* BG image */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="STYLO Residence" className="w-full h-full object-cover" />
        {/* Light mode premium gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent dark:from-transparent dark:via-transparent dark:to-transparent" />
        {/* Main gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-background/20 to-transparent dark:from-background/80 dark:via-background/40" />
      </div>

      <div className="relative container mx-auto px-4 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left text */}
          <div className="space-y-6 animate-fade-up">
            <p className="text-xs uppercase tracking-[0.3em] text-accent font-medium">STYLO Residence & Suites</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold leading-tight text-balance whitespace-pre-line text-[#1A1A1A] dark:text-foreground" style={{ textShadow: '0px 1px 2px rgba(255,255,255,0.8)' }}>
              {t('hero.title')}
            </h1>
            <p className="text-lg max-w-md leading-relaxed text-[#1A1A1A]/90 dark:text-muted-foreground">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#booking"
                className="px-6 py-3 rounded-full bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity"
              >
                {t('nav.bookNow')}
              </a>
              <Link
                to="/rooms"
                className="px-6 py-3 rounded-full glass font-medium hover:scale-[1.02] transition-transform"
              >
                {t('hero.explore')}
              </Link>
            </div>
          </div>

          {/* Right booking widget */}
          <div className="animate-fade-up" style={{ animationDelay: '200ms' }} id="booking">
            <BookingWidget />
          </div>
        </div>
      </div>
    </section>
  );
}
