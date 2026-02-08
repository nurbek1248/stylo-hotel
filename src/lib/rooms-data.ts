import roomDeluxe from '@/assets/room-deluxe.jpg';
import roomExec from '@/assets/room-executive.jpg';
import roomPres from '@/assets/room-presidential.jpg';

export interface Room {
  id: number;
  key: string;
  img: string;
  sqm: number;
  guests: number;
  price: number;
  type: string;
  reviews: { name: string; text: Record<string, string> }[];
}

export const allRooms: Room[] = [
  { 
    id: 1,
    key: 'deluxe', 
    img: roomDeluxe, 
    sqm: 45, 
    guests: 2, 
    price: 180, 
    type: 'deluxe',
    reviews: [
      { name: 'Sarah J.', text: { en: 'Very cozy and clean. Loved the view!', ru: 'Очень уютно и чисто. Вид потрясающий!', uz: 'Juda shinam va toza. Manzara ajoyib!' } }
    ]
  },
  { 
    id: 2,
    key: 'executive', 
    img: roomExec, 
    sqm: 78, 
    guests: 3, 
    price: 320, 
    type: 'suite',
    reviews: [
      { name: 'Mark T.', text: { en: 'Perfect for business trips. High speed internet.', ru: 'Идеально для командировок. Скоростной интернет.', uz: 'Biznes sayohatlar uchun juda qulay. Yuqori tezlikdagi internet.' } }
    ]
  },
  { 
    id: 3,
    key: 'presidential', 
    img: roomPres, 
    sqm: 150, 
    guests: 4, 
    price: 750, 
    type: 'suite',
    reviews: [
      { name: 'Elena V.', text: { en: 'The pinnacle of luxury. Unforgettable experience.', ru: 'Вершина роскоши. Незабываемый опыт.', uz: 'Hashamatning cho\'qqisi. Unutilmas tajriba.' } }
    ]
  },
];
