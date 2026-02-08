import { useState, useEffect } from 'react';
import logoWhite from '@/assets/logo-white.png';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Hide the loader after 1.5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    // Remove from DOM after transition ends
    const renderTimer = setTimeout(() => {
      setShouldRender(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(renderTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-500 ease-in-out ${
        loading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative animate-pulse">
          <img
            src={logoWhite}
            alt="STYLO Logo"
            className="h-[240px] md:h-[360px] w-auto object-contain animate-fade-in"
          />
        </div>
        
        {/* Animated Loading Bar (Optional, but adds to premium feel) */}
        <div className="w-48 h-[1px] bg-white/10 overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 bg-accent w-full -translate-x-full animate-[progress_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
