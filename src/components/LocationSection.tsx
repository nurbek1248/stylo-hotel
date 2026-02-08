import { MapPin, Phone, Mail, Navigation, MessageCircle, Send } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import ScrollReveal from './ScrollReveal';

export default function LocationSection() {
  const { t } = useI18n();

  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">{t('nav.contact')}</p>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold">{t('location.title')}</h2>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Google Map */}
          <ScrollReveal>
            <div className="glass rounded-2xl overflow-hidden aspect-[4/3] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.9!2d69.271742!3d41.291504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE3JzI5LjQiTiA2OcKwMTYnMTguMyJF!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="STYLO Residence Location"
                className="absolute inset-0"
              />
            </div>
          </ScrollReveal>

          {/* Info */}
          <ScrollReveal delay={150}>
            <div className="space-y-4">
              <div className="glass rounded-xl p-4 flex items-start gap-3">
                <MapPin size={18} className="text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{t('location.address')}</p>
                  <p className="text-sm">{t('location.address')}</p>
                </div>
              </div>
              <a href="tel:+998555206777" className="glass rounded-xl p-4 flex items-start gap-3 hover:border-accent/30 transition-colors">
                <Phone size={18} className="text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{t('location.phone')}</p>
                  <p className="text-sm">+998 55 520 67 77</p>
                </div>
              </a>
              <a href="mailto:info@bookstylo.com" className="glass rounded-xl p-4 flex items-start gap-3 hover:border-accent/30 transition-colors">
                <Mail size={18} className="text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{t('location.email')}</p>
                  <p className="text-sm">info@bookstylo.com</p>
                </div>
              </a>

              <div className="flex gap-3 pt-2">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=41.291504,69.271742" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 glass rounded-xl py-3 text-sm font-medium hover:-translate-y-0.5 transition-transform"
                >
                  <Navigation size={16} className="text-accent" />
                  {t('location.getDirections')}
                </a>
                <a href="https://wa.me/998770041800" target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-xl py-3 text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <MessageCircle size={16} />
                  {t('location.chat')}
                </a>
              </div>
              <a href="https://t.me/stylo_residence_suite" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 glass rounded-xl py-3 text-sm font-medium hover:border-accent/30 transition-colors"
              >
                <Send size={16} className="text-accent" />
                {t('location.telegram')}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
