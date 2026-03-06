import type { Workshop } from '@/types';

export const workshops: Workshop[] = [
  {
    id: 'workshop-1',
    title: 'Spring Hand-Tied Bouquet',
    description: 'Master the art of the spiraled hand-tied bouquet using fresh spring blooms.',
    fullDescription: `Join us for a delightful morning learning the art of floral arranging. In this beginner-friendly workshop, you'll discover how to select, condition, and arrange seasonal flowers into a beautiful hand-tied bouquet.
    
    Our experienced florists will guide you through:
    • Flower selection and seasonal availability
    • Proper conditioning techniques
    • The spiral technique for hand-tied bouquets
    • Wrapping and presentation
    
    All materials are included, and you'll take home your own creation. Tea, coffee, and light refreshments will be served.`,
    image: '/images/workshops/workshop_action_1.jpg',
    gallery: ['/images/workshops/workshop_detail.jpg', '/images/studio_interior.jpg'],
    date: '2026-03-15',
    time: '10:00 - 13:00',
    duration: '3 hours',
    price: 85,
    maxParticipants: 12,
    currentParticipants: 8,
    location: 'The Old Forge Studio',
    instructor: 'Tommy Kearney',
    includes: ['Fresh flowers', 'Tools provided', 'Tea & Treats', 'Take-home bouquet'],
    level: 'beginner',
    category: 'floral-arranging',
    reviews: [
      {
        id: 'r1',
        author: 'Mary O\'Connor',
        rating: 5,
        text: 'Absolutely wonderful experience! Sarah is a fantastic teacher and I left with a beautiful bouquet and so much knowledge.',
        date: '2025-02-10',
      },
      {
        id: 'r2',
        author: 'John Byrne',
        rating: 5,
        text: 'Bought this as a gift for my wife and we both ended up having the best time. Highly recommend!',
        date: '2025-01-28',
      },
    ],
  },
  {
    id: 'workshop-2',
    title: 'Living Wreath Making',
    description: 'Create a stunning, sustainable wreath using moss and seasonal bulbs.',
    fullDescription: `Welcome the arrival of spring with your own handcrafted living wreath.`,
    image: '/images/workshops/workshop_detail.jpg',
    gallery: ['/images/workshops/workshop_table.jpg'],
    date: '2026-03-22',
    time: '14:00 - 17:00',
    duration: '3 hours',
    price: 95,
    maxParticipants: 10,
    currentParticipants: 6,
    location: 'The Old Forge Garden',
    instructor: 'Tommy Kearney',
    includes: ['Moss base', 'Seasonal bulbs', 'Tools', 'Refreshments'],
    level: 'beginner',
    category: 'wreath-making',
    reviews: []
  },
  {
    id: 'workshop-6',
    title: 'Garden to Vase Masterclass',
    description: 'Harvest directly from the garden and arrange a wild, organic centerpiece.',
    fullDescription: `Experience the full journey from garden to vase. We start with a tour of the cutting garden, harvesting our own blooms, before returning to the studio to arrange them.`,
    image: '/images/workshops/workshop_group.jpg',
    gallery: ['/images/workshops/workshop_action_1.jpg'],
    date: '2026-04-20',
    time: '10:00 - 14:00',
    duration: '4 hours',
    price: 120,
    maxParticipants: 8,
    currentParticipants: 2,
    location: 'Kearney\'s Cutting Garden',
    instructor: 'Tommy Kearney',
    includes: ['Garden tour', 'Freshly cut flowers', 'Vase included', 'Lunch provided'],
    level: 'intermediate',
    category: 'arranging',
    reviews: []
  },
];

export const getWorkshopById = (id: string): Workshop | undefined => {
  return workshops.find(w => w.id === id);
};

export const getUpcomingWorkshops = (): Workshop[] => {
  const today = new Date().toISOString().split('T')[0];
  return workshops.filter(w => w.date >= today);
};

export const getWorkshopsByCategory = (category: string): Workshop[] => {
  return workshops.filter(w => w.category === category);
};
