import { Link } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import ScrollReveal from './ScrollReveal';
import { Users, Maximize } from 'lucide-react';
import roomDeluxe from '@/assets/room-deluxe.jpg';
import roomExec from '@/assets/room-executive.jpg';
import roomPres from '@/assets/room-presidential.jpg';

const roomData = [
  { key: 'deluxe', img: roomDeluxe, sqm: 45, guests: 2, price: '$180' },
  { key: 'executive', img: roomExec, sqm: 78, guests: 3, price: '$320' },
  { key: 'presidential', img: roomPres, sqm: 150, guests: 4, price: '$750' },
];

export default function FeaturedRooms() {
  const { t } = useI18n();

  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">{t('nav.rooms')}</p>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold">{t('rooms.title')}</h2>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">{t('rooms.subtitle')}</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roomData.map((room, i) => (
            <ScrollReveal key={room.key} delay={i * 150}>
              <div className="group glass rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={room.img}
                    alt={t(`rooms.${room.key}`)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="font-serif text-xl font-semibold">{t(`rooms.${room.key}`)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(`rooms.${room.key}Desc`)}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Maximize size={12} /> {room.sqm} {t('rooms.sqm')}</span>
                    <span className="flex items-center gap-1"><Users size={12} /> {room.guests} {t('rooms.guests')}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <p className="text-accent font-semibold">
                      {t('rooms.from')} {room.price}<span className="text-xs font-normal text-muted-foreground">{t('booking.perNight')}</span>
                    </p>
                    <Link to="/rooms" className="text-sm font-medium text-accent hover:underline">
                      {t('rooms.viewDetails')}
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
