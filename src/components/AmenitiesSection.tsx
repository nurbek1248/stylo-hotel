import { Sparkles, Waves, UtensilsCrossed, Dumbbell, Headphones, Plane } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import ScrollReveal from './ScrollReveal';

export default function AmenitiesSection() {
  const { t } = useI18n();

  const amenities = [
    { icon: Sparkles, key: 'spa' },
    { icon: Waves, key: 'pool' },
    { icon: UtensilsCrossed, key: 'restaurant' },
    { icon: Dumbbell, key: 'gym' },
    { icon: Headphones, key: 'concierge' },
    { icon: Plane, key: 'transfer' },
  ];

  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">{t('nav.amenities')}</p>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold">{t('amenities.title')}</h2>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">{t('amenities.subtitle')}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {amenities.map((a, i) => (
            <ScrollReveal key={a.key} delay={i * 100}>
              <div className="glass rounded-xl p-6 text-center hover:-translate-y-1 transition-transform duration-300 group">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full glass flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                  <a.icon size={20} className="text-accent" />
                </div>
                <p className="font-medium text-sm">{t(`amenities.${a.key}`)}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
