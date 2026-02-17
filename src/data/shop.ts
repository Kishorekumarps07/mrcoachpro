import { Product } from '@/types/shop';

export const PRODUCTS: Product[] = [
    {
        id: '1',
        title: 'Premium Performance T-Shirt',
        slug: 'premium-performance-tshirt',
        description: 'High-quality moisture-wicking fabric for endurance athletes.',
        price: 999,
        images: ['https://placehold.co/400x500/e2e8f0/1e293b?text=Performance+T-Shirt'],
        category: 'Apparel',
        stock: 50,
        isActive: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '2',
        title: 'Marathon Training Plan (Digital)',
        slug: 'marathon-training-plan',
        description: '16-week comprehensive training guide for beginners.',
        price: 499,
        images: ['https://placehold.co/400x500/fef3c7/d97706?text=Training+Plan'],
        category: 'Digital',
        stock: 9999,
        isActive: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '3',
        title: 'Recovery Foam Roller',
        slug: 'recovery-foam-roller',
        description: 'High-density foam roller for deep tissue massage.',
        price: 1299,
        images: ['https://placehold.co/400x500/dcfce7/166534?text=Foam+Roller'],
        category: 'Equipment',
        stock: 20,
        isActive: true,
        createdAt: new Date().toISOString()
    }
];
