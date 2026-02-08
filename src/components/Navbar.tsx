import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, User, LogOut } from 'lucide-react';
import { useI18n, Lang } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import { useAuth } from '@/lib/auth';
import logoBlack from '@/assets/logo-black.png';
import logoWhite from '@/assets/logo-white.png';

const navKeys = ['home', 'rooms', 'amenities', 'gallery', 'offers', 'about', 'contact'] as const;
const paths = ['/', '/rooms', '/amenities', '/gallery', '/offers', '/about', '/contact'];
const langs: Lang[] = ['en', 'ru', 'uz'];

export default function Navbar() {
  const { t, lang, setLang } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <nav className="container mx-auto flex items-center justify-between h-20 px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <img 
            src={theme === 'dark' ? logoWhite : logoBlack} 
            alt="STYLO Residence & Suites" 
            className="h-[150px] md:h-[190px] w-auto object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navKeys.map((key, i) => (
            <Link
              key={key}
              to={paths[i]}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors hover:text-accent ${
                location.pathname === paths[i] ? 'text-accent' : 'text-[#1A1A1A] dark:text-foreground/70'
              }`}
            >
              {t(`nav.${key}`)}
            </Link>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <div className="hidden sm:flex items-center glass rounded-full px-1 py-0.5 gap-0.5">
            {langs.map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-1 text-xs font-medium rounded-full transition-all ${
                  lang === l ? 'bg-accent text-accent-foreground' : 'text-[#1A1A1A] dark:text-foreground/60 hover:text-foreground'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full glass hover:scale-105 transition-transform"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Book Now CTA */}
          <Link
            to="/#booking"
            className="hidden sm:inline-flex px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {t('nav.bookNow')}
          </Link>

          {/* User Profile or Login */}
          {user ? (
            <div className="relative group hidden sm:block">
              <Link to="/profile" className="flex items-center gap-2 px-3 py-2 glass rounded-full hover:border-accent/30 transition-all">
                <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">
                  {user.name[0].toUpperCase()}
                </div>
                <span className="text-sm font-medium">{user.name}</span>
              </Link>
              <div className="absolute right-0 top-full mt-2 w-48 glass-strong rounded-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <Link
                  to="/profile"
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-accent/10 transition-colors"
                >
                  <User size={14} />
                  Shaxsiy kabinet
                </Link>
                <button
                  onClick={() => {
                    logout();
                    window.location.href = '/';
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-colors"
                >
                  <LogOut size={14} />
                  Chiqish
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden sm:flex items-center gap-2 px-4 py-2 glass rounded-full text-sm font-medium hover:bg-accent/10 transition-all"
            >
              <User size={16} />
              {t('nav.login')}
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-md"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden glass-strong border-t border-border animate-fade-in">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navKeys.map((key, i) => (
              <Link
                key={key}
                to={paths[i]}
                onClick={() => setOpen(false)}
                className="text-lg font-serif hover:text-accent transition-colors"
              >
                {t(`nav.${key}`)}
              </Link>
            ))}
            <div className="flex gap-2 pt-4 border-t border-border">
              {langs.map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1.5 text-sm rounded-full ${
                    lang === l ? 'bg-accent text-accent-foreground' : 'glass'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <Link
              to="/#booking"
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-full bg-accent text-accent-foreground text-center font-medium"
            >
              {t('nav.bookNow')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
