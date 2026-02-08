import { Star, Mountain, Sparkles, UtensilsCrossed } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import ScrollReveal from './ScrollReveal';

export default function TrustStrip() {
  const { t } = useI18n();

  const items = [
    { icon: Star, label: t('trust.fiveStar') },
    { icon: Mountain, label: t('trust.cityView') },
    { icon: Sparkles, label: t('trust.spa') },
    { icon: UtensilsCrossed, label: t('trust.dining') },
  ];

  return (
    <section className="py-12 border-y border-border">
      <ScrollReveal>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12">
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-2 glass-subtle rounded-full px-5 py-2.5">
                <item.icon size={16} className="text-accent" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 glass-subtle rounded-full px-5 py-2.5">
              <Star size={14} className="text-accent fill-accent" />
              <span className="text-sm font-semibold">4.9/5</span>
              <span className="text-xs text-muted-foreground">{t('trust.rating')}</span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
