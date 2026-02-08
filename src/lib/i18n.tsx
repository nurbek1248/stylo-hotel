import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type Lang = 'en' | 'ru' | 'uz';

const translations: Record<string, Record<Lang, string>> = {
  // Nav
  'nav.home': { en: 'Home', ru: 'Главная', uz: 'Bosh sahifa' },
  'nav.rooms': { en: 'Rooms & Suites', ru: 'Номера', uz: 'Xonalar' },
  'nav.amenities': { en: 'Amenities', ru: 'Удобства', uz: 'Qulayliklar' },
  'nav.gallery': { en: 'Gallery', ru: 'Галерея', uz: 'Galereya' },
  'nav.offers': { en: 'Offers', ru: 'Спецпредложения', uz: 'Takliflar' },
  'nav.about': { en: 'About', ru: 'О нас', uz: 'Biz haqimizda' },
  'nav.contact': { en: 'Contact', ru: 'Контакты', uz: 'Aloqa' },
  'nav.bookNow': { en: 'Book Now', ru: 'Забронировать', uz: 'Band qilish' },
  'nav.back': { en: 'Back', ru: 'Назад', uz: 'Orqaga' },
  'nav.login': { en: 'Login', ru: 'Войти', uz: 'Kirish' },
  'auth.title': { en: 'Welcome to STYLO', ru: 'Добро пожаловать в STYLO', uz: 'STYLO-ga xush kelibsiz' },
  'auth.subtitle': { en: 'Experience luxury at your fingertips', ru: 'Испытайте роскошь на кончиках ваших пальцев', uz: 'Hashamatni barmoqlaringiz uchida his eting' },
  'auth.email': { en: 'Email Address', ru: 'Электронная почта', uz: 'Email manzili' },
  'auth.password': { en: 'Password', ru: 'Пароль', uz: 'Parol' },
  'auth.signIn': { en: 'Sign In', ru: 'Войти', uz: 'Kirish' },
  'auth.signUp': { en: 'Sign Up', ru: 'Регистрация', uz: 'Ro\'yxatdan o\'tish' },
  'auth.or': { en: 'or continue with', ru: 'или войти через', uz: 'yoki quyidagilar orqali' },
  'auth.google': { en: 'Continue with Google', ru: 'Войти через Google', uz: 'Google orqali davom etish' },
  'auth.apple': { en: 'Continue with Apple', ru: 'Войти через Apple', uz: 'Apple orqali davom etish' },
  'auth.noAccount': { en: "Don't have an account?", ru: 'Нет аккаунта?', uz: 'Hisobingiz yo\'qmi?' },
  'auth.hasAccount': { en: 'Already have an account?', ru: 'Уже есть аккаунт?', uz: 'Hisobingiz bormi?' },
  'auth.success': { en: 'Successfully signed in!', ru: 'Успешный вход!', uz: 'Muvaffaqiyatli kirdingiz!' },
  'auth.error': { en: 'Authentication failed', ru: 'Ошибка входа', uz: 'Kirishda xatolik' },

  // Hero
  'hero.title': { en: 'Where Elegance\nMeets Serenity', ru: 'Где элегантность\nвстречает покой', uz: 'Nafislik va\ntinchlik uyg\'unligi' },
  'hero.subtitle': { en: 'Experience the pinnacle of luxury hospitality in the heart of the city', ru: 'Испытайте вершину роскошного гостеприимства в сердце города', uz: 'Shahar markazida hashamatli mehmondo\'stlikning cho\'qqisini his eting' },
  'hero.explore': { en: 'Explore Rooms', ru: 'Наши номера', uz: 'Xonalarni ko\'rish' },

  // Booking
  'booking.checkIn': { en: 'Check-in', ru: 'Заезд', uz: 'Kirish' },
  'booking.checkOut': { en: 'Check-out', ru: 'Выезд', uz: 'Chiqish' },
  'booking.guests': { en: 'Guests', ru: 'Гости', uz: 'Mehmonlar' },
  'booking.adults': { en: 'Adults', ru: 'Взрослые', uz: 'Kattalar' },
  'booking.children': { en: 'Children', ru: 'Дети', uz: 'Bolalar' },
  'booking.rooms': { en: 'Rooms', ru: 'Номера', uz: 'Xonalar' },
  'booking.promoCode': { en: 'Promo code', ru: 'Промокод', uz: 'Promo kod' },
  'booking.checkAvailability': { en: 'Check Availability', ru: 'Проверить наличие', uz: 'Mavjudligini tekshirish' },
  'booking.available': { en: 'Available rooms', ru: 'Доступные номера', uz: 'Bo\'sh xonalar' },
  'booking.continue': { en: 'Continue Booking', ru: 'Продолжить', uz: 'Davom etish' },
  'booking.perNight': { en: '/ night', ru: '/ ночь', uz: '/ kecha' },
  'booking.requestSent': { en: 'Request sent successfully!', ru: 'Запрос успешно отправлен!', uz: 'So\'rov muvaffaqiyatli yuborildi!' },

  // Trust
  'trust.fiveStar': { en: '5-Star Service', ru: 'Сервис 5 звёзд', uz: '5 yulduzli xizmat' },
  'trust.cityView': { en: 'Stunning City Views', ru: 'Потрясающие виды', uz: 'Ajoyib shahar manzarasi' },
  'trust.spa': { en: 'Spa & Wellness', ru: 'Спа и велнес', uz: 'Spa va salomatlik' },
  'trust.dining': { en: 'Fine Dining', ru: 'Изысканная кухня', uz: 'Noyob taomlar' },
  'trust.rating': { en: 'Guest Rating', ru: 'Оценка гостей', uz: 'Mehmonlar bahosi' },

  // Rooms
  'rooms.title': { en: 'Exquisite Accommodations', ru: 'Изысканные номера', uz: 'Nafis xonalar' },
  'rooms.subtitle': { en: 'Each room is a sanctuary of comfort and refined taste', ru: 'Каждый номер — оазис комфорта и утончённого вкуса', uz: 'Har bir xona — qulaylik va nozik didning maskani' },
  'rooms.viewDetails': { en: 'View Details', ru: 'Подробнее', uz: 'Batafsil' },
  'rooms.from': { en: 'from', ru: 'от', uz: 'dan' },
  'rooms.deluxe': { en: 'Deluxe Room', ru: 'Номер Делюкс', uz: 'Deluxe xona' },
  'rooms.deluxeDesc': { en: 'Spacious comfort with breathtaking panoramic city views', ru: 'Просторный комфорт с захватывающими панорамными видами', uz: 'Ajoyib shahar manzarasi bilan keng qulaylik' },
  'rooms.executive': { en: 'Executive Suite', ru: 'Представительский люкс', uz: 'Executive Suite' },
  'rooms.executiveDesc': { en: 'Elevated living with a separate lounge and premium amenities', ru: 'Возвышенный отдых с отдельной гостиной и премиальными удобствами', uz: 'Alohida dam olish xonasi va premium qulayliklar' },
  'rooms.presidential': { en: 'Presidential Suite', ru: 'Президентский люкс', uz: 'Prezident Suite' },
  'rooms.presidentialDesc': { en: 'The ultimate indulgence — grand spaces, bespoke luxury, and unrivaled exclusivity', ru: 'Высшая роскошь — просторные залы, эксклюзивный комфорт', uz: 'Eng yuqori hashamat — keng zal, betakror qulaylik' },
  'rooms.sqm': { en: 'm²', ru: 'м²', uz: 'm²' },
  'rooms.guests': { en: 'guests', ru: 'гостей', uz: 'mehmon' },
  'rooms.filterType': { en: 'Room type', ru: 'Тип номера', uz: 'Xona turi' },
  'rooms.filterPrice': { en: 'Max price', ru: 'Макс. цена', uz: 'Maks. narx' },
  'rooms.filterGuests': { en: 'Guests', ru: 'Гости', uz: 'Mehmonlar' },
  'rooms.all': { en: 'All Rooms', ru: 'Все номера', uz: 'Barcha xonalar' },
  'rooms.amenities': { en: 'Amenities', ru: 'Удобства', uz: 'Qulayliklar' },
  'rooms.wifi': { en: 'Wi-Fi', ru: 'Wi-Fi', uz: 'Wi-Fi' },
  'rooms.ac': { en: 'Air Conditioning', ru: 'Кондиционер', uz: 'Konditsioner' },
  'rooms.kingsize': { en: 'King Size Bed', ru: 'Кровать King Size', uz: 'King Size yotoq' },
  'rooms.safe': { en: 'Safe', ru: 'Сейф', uz: 'Seyf' },
  'rooms.tv': { en: 'TV', ru: 'Телевизор', uz: 'Televizor' },
  'rooms.reviews': { en: 'Guest Reviews', ru: 'Отзывы гостей', uz: 'Mehmonlar sharhlari' },
  'rooms.select': { en: 'SELECT', ru: 'ВЫБРАТЬ', uz: 'TANLASH' },
  'rooms.availability': { en: '2 rooms left', ru: 'Осталось 2 номера', uz: '2 ta xona qoldi' },

  // Amenities
  'amenities.title': { en: 'World-Class Amenities', ru: 'Удобства мирового класса', uz: 'Jahon darajasidagi qulayliklar' },
  'amenities.subtitle': { en: 'Every detail crafted for your perfect stay', ru: 'Каждая деталь продумана для идеального отдыха', uz: 'Har bir tafsilot mukammal dam olish uchun' },
  'amenities.spa': { en: 'Spa & Wellness', ru: 'Спа и велнес', uz: 'Spa va salomatlik' },
  'amenities.pool': { en: 'Rooftop Pool', ru: 'Бассейн на крыше', uz: 'Tom ustidagi hovuz' },
  'amenities.restaurant': { en: 'Restaurant & Bar', ru: 'Ресторан и бар', uz: 'Restoran va bar' },
  'amenities.gym': { en: 'Fitness Center', ru: 'Фитнес-центр', uz: 'Fitnes markazi' },
  'amenities.concierge': { en: 'Concierge 24/7', ru: 'Консьерж 24/7', uz: 'Konsyerj 24/7' },
  'amenities.transfer': { en: 'Airport Transfer', ru: 'Трансфер', uz: 'Aeroport transferi' },

  // Gallery
  'gallery.title': { en: 'Visual Journey', ru: 'Визуальное путешествие', uz: 'Vizual sayohat' },
  'gallery.subtitle': { en: 'Glimpses of extraordinary experiences', ru: 'Мгновения необыкновенных впечатлений', uz: 'Ajoyib tajribalar ko\'rinishi' },
  'gallery.all': { en: 'All', ru: 'Все', uz: 'Barchasi' },
  'gallery.rooms': { en: 'Rooms', ru: 'Номера', uz: 'Xonalar' },
  'gallery.lobby': { en: 'Lobby', ru: 'Лобби', uz: 'Lobbi' },
  'gallery.spa': { en: 'Spa', ru: 'Спа', uz: 'Spa' },
  'gallery.restaurant': { en: 'Restaurant', ru: 'Ресторан', uz: 'Restoran' },

  // Offers
  'offers.title': { en: 'Exclusive Offers', ru: 'Эксклюзивные предложения', uz: 'Eksklyuziv takliflar' },
  'offers.subtitle': { en: 'Curated packages for unforgettable moments', ru: 'Специальные пакеты для незабываемых моментов', uz: 'Unutilmas lahzalar uchun maxsus paketlar' },
  'offers.weekend': { en: 'Weekend Escape', ru: 'Уик-энд', uz: 'Dam olish kunlari' },
  'offers.weekendDesc': { en: 'Two nights of pure luxury with spa access and gourmet dining', ru: 'Две ночи чистой роскоши со спа и ужином', uz: 'Spa va gurme ovqatlanish bilan ikki kecha' },
  'offers.business': { en: 'Business Class Stay', ru: 'Бизнес-пребывание', uz: 'Biznes turar joy' },
  'offers.businessDesc': { en: 'Premium workspace, express services, and executive lounge access', ru: 'Премиальное рабочее пространство и доступ в бизнес-зал', uz: 'Premium ish maydoni va biznes zal' },
  'offers.honeymoon': { en: 'Honeymoon Package', ru: 'Медовый месяц', uz: 'Asal oyi paketi' },
  'offers.honeymoonDesc': { en: 'Romantic suite, champagne, couples spa, and sunset dinner', ru: 'Романтический номер, шампанское и ужин на закате', uz: 'Romantik xona, shampan va quyosh botishi kechki ovqati' },
  'offers.viewOffer': { en: 'View Offer', ru: 'Подробнее', uz: 'Batafsil' },

  // Testimonials
  'testimonials.title': { en: 'Voices of Our Guests', ru: 'Голоса наших гостей', uz: 'Mehmonlarimiz ovozi' },
  'testimonials.subtitle': { en: 'Stories of exceptional experiences', ru: 'Истории об исключительном опыте', uz: 'Ajoyib tajribalar haqida hikoyalar' },

  // Location
  'location.title': { en: 'Find Us', ru: 'Как нас найти', uz: 'Bizni toping' },
  'location.address': { en: 'Tashkent, Mirabad district, Mirabad street, 66a', ru: 'г. Ташкент, Мирабадский район, ул. Мирабад, дом 66а', uz: 'Toshkent shahri, Mirobod tumani, Mirobod ko\'chasi, 66a-uy' },
  'location.phone': { en: 'Phone', ru: 'Телефон', uz: 'Telefon' },
  'location.email': { en: 'Email', ru: 'Эл. почта', uz: 'Email' },
  'location.whatsapp': { en: 'WhatsApp', ru: 'WhatsApp', uz: 'WhatsApp' },
  'location.telegram': { en: 'Telegram', ru: 'Telegram', uz: 'Telegram' },
  'location.getDirections': { en: 'Get Directions', ru: 'Проложить маршрут', uz: 'Yo\'nalish olish' },
  'location.chat': { en: 'Chat on WhatsApp', ru: 'Написать в WhatsApp', uz: 'WhatsApp orqali yozish' },

  // Footer
  'footer.tagline': { en: 'Where timeless elegance meets modern luxury', ru: 'Где вечная элегантность встречает современную роскошь', uz: 'Abadiy nafislik zamonaviy hashamat bilan uchrashadigan joy' },
  'footer.quickLinks': { en: 'Quick Links', ru: 'Быстрые ссылки', uz: 'Tezkor havolalar' },
  'footer.contactInfo': { en: 'Contact', ru: 'Контакты', uz: 'Aloqa' },
  'footer.newsletter': { en: 'Newsletter', ru: 'Рассылка', uz: 'Yangiliklar' },
  'footer.newsletterDesc': { en: 'Subscribe for exclusive offers', ru: 'Подпишитесь на эксклюзивные предложения', uz: 'Eksklyuziv takliflar uchun obuna bo\'ling' },
  'footer.subscribe': { en: 'Subscribe', ru: 'Подписаться', uz: 'Obuna bo\'lish' },
  'footer.emailPlaceholder': { en: 'Your email', ru: 'Ваш email', uz: 'Email manzilingiz' },
  'footer.rights': { en: 'All rights reserved', ru: 'Все права защищены', uz: 'Barcha huquqlar himoyalangan' },

  // About
  'about.title': { en: 'Our Story', ru: 'Наша история', uz: 'Bizning hikoyamiz' },
  'about.subtitle': { en: 'A legacy of excellence since 2020', ru: 'Наследие совершенства с 2020 года', uz: '2020 yildan beri mukammallik merosi' },
  'about.story': { en: 'STYLO Residence & Suites was born from a vision to redefine luxury hospitality. Every detail — from the curated art to the bespoke service — reflects our unwavering commitment to excellence.', ru: 'STYLO Residence & Suites родился из стремления переосмыслить роскошное гостеприимство. Каждая деталь отражает наше стремление к совершенству.', uz: 'STYLO Residence & Suites hashamatli mehmondo\'stlikni qayta belgilash istagi bilan tug\'ilgan. Har bir tafsilot mukammallikka intilishimizni aks ettiradi.' },
  'about.values': { en: 'Our Values', ru: 'Наши ценности', uz: 'Bizning qadriyatlarimiz' },
  'about.excellence': { en: 'Excellence', ru: 'Совершенство', uz: 'Mukammallik' },
  'about.elegance': { en: 'Elegance', ru: 'Элегантность', uz: 'Nafislik' },
  'about.hospitality': { en: 'Hospitality', ru: 'Гостеприимство', uz: 'Mehmondo\'stlik' },

  // Contact
  'contact.title': { en: 'Get in Touch', ru: 'Свяжитесь с нами', uz: 'Biz bilan bog\'laning' },
  'contact.subtitle': { en: 'We would love to hear from you', ru: 'Мы будем рады вашему обращению', uz: 'Sizning murojaatingizni kutamiz' },
  'contact.name': { en: 'Full Name', ru: 'Полное имя', uz: 'To\'liq ism' },
  'contact.email': { en: 'Email', ru: 'Email', uz: 'Email' },
  'contact.phone': { en: 'Phone', ru: 'Телефон', uz: 'Telefon' },
  'contact.message': { en: 'Message', ru: 'Сообщение', uz: 'Xabar' },
  'contact.send': { en: 'Send Message', ru: 'Отправить', uz: 'Xabar yuborish' },
  'contact.success': { en: 'Message sent successfully!', ru: 'Сообщение отправлено!', uz: 'Xabar muvaffaqiyatli yuborildi!' },
  'contact.hours': { en: 'Working Hours', ru: 'Часы работы', uz: 'Ish vaqti' },
  'contact.hoursValue': { en: '24/7 — Always at your service', ru: '24/7 — Всегда к вашим услугам', uz: '24/7 — Doim xizmatingizda' },
};

interface I18nContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key) => key,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('stylo-lang');
    return (saved as Lang) || 'en';
  });

  const changeLang = useCallback((l: Lang) => {
    setLang(l);
    localStorage.setItem('stylo-lang', l);
  }, []);

  const t = useCallback((key: string) => {
    return translations[key]?.[lang] || key;
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
