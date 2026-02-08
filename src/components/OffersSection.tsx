import { Link } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import ScrollReveal from './ScrollReveal';
import { CalendarDays, Briefcase, Heart } from 'lucide-react';

export default function OffersSection() {
  const { t } = useI18n();

  const offers = [
    { key: 'weekend', icon: CalendarDays, price: '$399' },
    { key: 'business', icon: Briefcase, price: '$249' },
    { key: 'honeymoon', icon: Heart, price: '$599' },
  ];

  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">{t('nav.offers')}</p>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold">{t('offers.title')}</h2>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">{t('offers.subtitle')}</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {offers.map((offer, i) => (
            <ScrollReveal key={offer.key} delay={i * 150}>
              <div className="glass rounded-2xl p-6 space-y-4 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
                  <offer.icon size={18} className="text-accent" />
                </div>
                <h3 className="font-serif text-xl font-semibold">{t(`offers.${offer.key}`)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(`offers.${offer.key}Desc`)}</p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-accent font-semibold">{t('rooms.from')} {offer.price}</span>
                  <Link to="/offers" className="text-sm font-medium text-accent hover:underline">
                    {t('offers.viewOffer')}
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
