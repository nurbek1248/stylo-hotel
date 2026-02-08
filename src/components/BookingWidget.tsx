import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, addDays } from 'date-fns';
import { CalendarIcon, Users, Home, Tag, ArrowRight, Info } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { allRooms, Room } from '@/lib/rooms-data';

export default function BookingWidget({ className }: { className?: string }) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState<Date | undefined>(new Date());
  const [checkOut, setCheckOut] = useState<Date | undefined>(addDays(new Date(), 2));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [promo, setPromo] = useState('');
  const [results, setResults] = useState<Room[] | null>(null);

  const handleSearch = () => {
    if (!checkIn || !checkOut || checkOut <= checkIn) {
      toast({ title: 'Error', description: 'Check-out must be after check-in', variant: 'destructive' });
      return;
    }
    
    // Filter rooms based on guest capacity
    const totalGuests = adults + children;
    const available = allRooms.filter(r => r.guests >= totalGuests);
    setResults(available);
  };

  const handleViewAll = () => {
    const totalGuests = adults + children;
    navigate(`/rooms?guests=${totalGuests}`);
  };

  const handleSelectRoom = (roomId: number) => {
    navigate(`/rooms?roomId=${roomId}`);
  };

  return (
    <div className={cn('glass-strong rounded-2xl p-6 space-y-4 bg-white/60 dark:bg-background/60 backdrop-blur-3xl border border-[rgba(212,175,55,0.3)]', className)}>
      <h3 className="font-serif text-lg font-semibold text-[#1A1A1A] dark:text-foreground" style={{ textShadow: '0px 1px 2px rgba(255,255,255,0.8)' }}>{t('booking.checkAvailability')}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Check-in */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-left w-full hover:border-accent/40 transition-colors bg-white/80 dark:bg-background/30 border border-[#e0e0e0] dark:border-border">
              <CalendarIcon size={14} className="text-accent shrink-0" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t('booking.checkIn')}</div>
                <div className="font-medium">{checkIn ? format(checkIn, 'MMM d, yyyy') : '—'}</div>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} className="pointer-events-auto p-3" />
          </PopoverContent>
        </Popover>

        {/* Check-out */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-left w-full hover:border-accent/40 transition-colors bg-white/80 dark:bg-background/30 border border-[#e0e0e0] dark:border-border">
              <CalendarIcon size={14} className="text-accent shrink-0" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t('booking.checkOut')}</div>
                <div className="font-medium">{checkOut ? format(checkOut, 'MMM d, yyyy') : '—'}</div>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} className="pointer-events-auto p-3" />
          </PopoverContent>
        </Popover>

        {/* Guests */}
        <div className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm bg-white/80 dark:bg-background/30 border border-[#e0e0e0] dark:border-border">
          <Users size={14} className="text-accent shrink-0" />
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t('booking.guests')}</div>
            <div className="flex gap-3 mt-0.5">
              <label className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">{t('booking.adults')}</span>
                <select value={adults} onChange={e => setAdults(+e.target.value)} className="bg-transparent font-medium w-10">
                  {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </label>
              <label className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">{t('booking.children')}</span>
                <select value={children} onChange={e => setChildren(+e.target.value)} className="bg-transparent font-medium w-10">
                  {[0,1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </label>
            </div>
          </div>
        </div>

        {/* Rooms */}
        <div className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm bg-white/80 dark:bg-background/30 border border-[#e0e0e0] dark:border-border">
          <Home size={14} className="text-accent shrink-0" />
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t('booking.rooms')}</div>
            <select value={rooms} onChange={e => setRooms(+e.target.value)} className="bg-transparent font-medium">
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Promo */}
      <div className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm bg-white/80 dark:bg-background/30 border border-[#e0e0e0] dark:border-border">
        <Tag size={14} className="text-accent shrink-0" />
        <input
          type="text"
          value={promo}
          onChange={e => setPromo(e.target.value)}
          placeholder={t('booking.promoCode')}
          className="bg-transparent flex-1 outline-none placeholder:text-muted-foreground/50"
        />
      </div>

      <button
        onClick={handleSearch}
        className="w-full py-3 rounded-xl bg-accent text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-accent/20"
      >
        {t('booking.checkAvailability')}
      </button>

      {/* Results */}
      {results && (
        <div className="space-y-3 pt-4 border-t border-border animate-fade-in">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">{t('booking.available')}</p>
            <button 
              onClick={handleViewAll}
              className="text-xs text-accent hover:underline flex items-center gap-1"
            >
              Hammasini ko'rish <ArrowRight size={12} />
            </button>
          </div>
          
          <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1 custom-scrollbar">
            {results.map(r => (
              <div key={r.id} className="group flex justify-between items-center glass rounded-xl px-3 py-3 hover:border-accent/30 transition-all">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{t(`rooms.${r.key}`)}</span>
                  <span className="text-[10px] text-muted-foreground">{r.guests} {t('rooms.guests')} / {r.sqm} {t('rooms.sqm')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-accent">${r.price}</span>
                  <button 
                    onClick={() => handleSelectRoom(r.id)}
                    className="p-1.5 bg-accent/10 text-accent rounded-lg hover:bg-accent hover:text-white transition-colors"
                    title="Batafsil"
                  >
                    <Info size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {results.length === 0 && (
            <p className="text-xs text-center text-muted-foreground py-4">
              Afsuski, bu qidiruv bo'yicha xonalar topilmadi.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
