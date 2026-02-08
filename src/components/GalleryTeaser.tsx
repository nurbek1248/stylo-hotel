import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { X } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import heroImg from '@/assets/hero-hotel.jpg';
import roomDeluxe from '@/assets/room-deluxe.jpg';
import roomExec from '@/assets/room-executive.jpg';
import roomPres from '@/assets/room-presidential.jpg';
import gallerySpa from '@/assets/gallery-spa.jpg';
import galleryRestaurant from '@/assets/gallery-restaurant.jpg';

const images = [heroImg, roomDeluxe, roomExec, roomPres, gallerySpa, galleryRestaurant];

export default function GalleryTeaser() {
  const { t } = useI18n();
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">{t('nav.gallery')}</p>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold">{t('gallery.title')}</h2>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">{t('gallery.subtitle')}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.map((img, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <button
                onClick={() => setLightbox(i)}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl glass"
              >
                <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[60] bg-background/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 p-2 glass rounded-full" onClick={() => setLightbox(null)}>
            <X size={20} />
          </button>
          <img src={images[lightbox]} alt="" className="max-h-[85vh] max-w-full rounded-xl object-contain" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}
