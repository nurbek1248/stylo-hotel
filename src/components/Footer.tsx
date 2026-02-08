import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import { toast } from '@/hooks/use-toast';
import logoBlack from '@/assets/logo-black.png';
import logoWhite from '@/assets/logo-white.png';

const navKeys = ['home', 'rooms', 'amenities', 'gallery', 'offers', 'about', 'contact'] as const;
const paths = ['/', '/rooms', '/amenities', '/gallery', '/offers', '/about', '/contact'];

export default function Footer() {
  const { t } = useI18n();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setEmail('');
    toast({ title: '✓', description: t('booking.requestSent') });
  };

  return (
    <footer className="glass-strong border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <img 
              src={theme === 'dark' ? logoWhite : logoBlack} 
              alt="STYLO Residence & Suites" 
              className="h-14 w-auto object-contain" 
            />
            <p className="text-sm text-muted-foreground leading-relaxed">{t('footer.tagline')}</p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-accent/10 transition-colors">
                <Instagram size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-accent/10 transition-colors">
                <Facebook size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-accent/10 transition-colors">
                <Twitter size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <div className="space-y-2">
              {navKeys.map((key, i) => (
                <Link key={key} to={paths[i]} className="block text-sm text-muted-foreground hover:text-accent transition-colors">
                  {t(`nav.${key}`)}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-semibold mb-4">{t('footer.contactInfo')}</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>{t('location.address')}</p>
              <a href="tel:+998555206777" className="block hover:text-accent transition-colors">
                +998 55 520 67 77
              </a>
              <a href="https://wa.me/998770041800" target="_blank" rel="noopener noreferrer" className="block hover:text-accent transition-colors">
                WhatsApp: +998 77 004 18 00
              </a>
              <a href="mailto:info@bookstylo.com" className="block hover:text-accent transition-colors">
                info@bookstylo.com
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif font-semibold mb-2">{t('footer.newsletter')}</h4>
            <p className="text-sm text-muted-foreground mb-4">{t('footer.newsletterDesc')}</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t('footer.emailPlaceholder')}
                className="flex-1 glass rounded-lg px-3 py-2 text-sm bg-transparent outline-none placeholder:text-muted-foreground/50"
                required
              />
              <button type="submit" className="px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                {t('footer.subscribe')}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} STYLO Residence & Suites. {t('footer.rights')}.
        </div>
      </div>
    </footer>
  );
}
