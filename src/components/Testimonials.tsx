import { Star } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import ScrollReveal from './ScrollReveal';

const testimonials = [
  { name: 'Alexander M.', country: 'Germany', stars: 5, text: { en: 'An extraordinary experience. The attention to detail and service quality surpassed every expectation.', ru: 'Необыкновенный опыт. Внимание к деталям и качество сервиса превзошли все ожидания.', uz: 'Ajoyib tajriba. Tafsilotlarga e\'tibor va xizmat sifati barcha kutishlardan oshdi.' } },
  { name: 'Maria K.', country: 'Russia', stars: 5, text: { en: 'The Presidential Suite was breathtaking. True luxury with an impeccable personal touch.', ru: 'Президентский люкс поразил. Настоящая роскошь с безупречным личным подходом.', uz: 'Prezident Suite hayratlanarli edi. Mukammal shaxsiy yondashuv bilan haqiqiy hashamat.' } },
  { name: 'James W.', country: 'USA', stars: 5, text: { en: 'From the rooftop pool to the fine dining — every moment at STYLO was unforgettable.', ru: 'От бассейна на крыше до изысканного ужина — каждый момент в STYLO незабываем.', uz: 'Tom ustidagi hovuzdan noyob kechki ovqatgacha — STYLO dagi har bir lahza unutilmas.' } },
  { name: 'Dmitry P.', country: 'Kazakhstan', stars: 5, text: { en: 'Modern design combined with classical service. The best stay in Tashkent.', ru: 'Современный дизайн в сочетании с классическим сервисом. Лучший отдых в Ташкенте.', uz: 'Klassik xizmat bilan uyg\'unlashgan zamonaviy dizayn. Toshkentdagi eng yaxshi dam olish.' } },
  { name: 'Sophie L.', country: 'France', stars: 5, text: { en: 'Elegant atmosphere and very helpful staff. Highly recommended.', ru: 'Элегантная атмосфера и очень отзывчивый персонал. Очень рекомендую.', uz: 'Nafis muhit va juda yordamchi xodimlar. Tavsiya qilaman.' } },
];

export default function Testimonials() {
  const { t, lang } = useI18n();
  const doubledTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-20 lg:py-28 overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">{t('testimonials.title')}</p>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold">{t('testimonials.title')}</h2>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">{t('testimonials.subtitle')}</p>
          </div>
        </ScrollReveal>

        <div className="relative">
          <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused]">
            {doubledTestimonials.map((item, i) => (
              <div key={i} className="flex-none w-[300px] md:w-[400px] glass rounded-2xl p-6 space-y-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: item.stars }).map((_, j) => (
                    <Star key={j} size={14} className="text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed italic">"{item.text[lang]}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-border">
                  <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">
                    {item.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Fading gradients for smooth edges */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
        </div>
      </div>
    </section>
  );
}
