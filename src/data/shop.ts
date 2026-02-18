import { Product } from '@/types/shop';

export const PRODUCTS: Product[] = [
    // --- EQUIPMENT (HEAVY DUTY) ---
    {
        id: '1',
        title: 'Olympic Barbell (20kg)',
        slug: 'olympic-barbell-20kg',
        description: 'Cerakote finish, 190k PSI tensile strength. Built for heavy compounds.',
        price: 14999,
        images: ['https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2069&auto=format&fit=crop'],
        category: 'Equipment',
        stock: 15,
        isActive: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '2',
        title: 'Adjustable Bench Pro',
        slug: 'adjustable-bench-pro',
        description: 'Zero-gap pad, 1000lb weight capacity, 7 incline positions.',
        price: 8999,
        images: ['https://images.unsplash.com/photo-1598971639058-211a74a1091a?q=80&w=2070&auto=format&fit=crop'],
        category: 'Equipment',
        stock: 25,
        isActive: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '3',
        title: 'Hex Dumbbell Set (5-25kg)',
        slug: 'hex-dumbbell-set',
        description: 'Rubber encased, knurled chrome handles. Commercial grade.',
        price: 34999,
        images: ['https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?q=80&w=2070&auto=format&fit=crop'],
        category: 'Equipment',
        stock: 10,
        isActive: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '4',
        title: 'Power Rack System',
        slug: 'power-rack-system',
        description: '3x3" 11-gauge steel uprights. Includes J-cups and safeties.',
        price: 49999,
        images: ['https://images.unsplash.com/photo-1590487988256-9ed24133863e?q=80&w=2028&auto=format&fit=crop'],
        category: 'Equipment',
        stock: 5,
        isActive: true,
        createdAt: new Date().toISOString()
    },

    // --- SUPPLEMENTS (CLINICAL) ---
    {
        id: '5',
        title: 'Isolate Whey (Chocolate)',
        slug: 'isolate-whey-chocolate',
        description: '25g Protein, 0g Sugar. Hydrolyzed for rapid absorption.',
        price: 4999,
        images: ['https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=2070&auto=format&fit=crop'],
        category: 'Supplements',
        stock: 200,
        isActive: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '6',
        title: 'Pre-Wkt 5000 (Fruit Punch)',
        slug: 'pre-wkt-5000',
        description: 'Clinical doses of Citrulline (6g) and Beta-Alanine (3.2g).',
        price: 2499,
        images: ['https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=2070&auto=format&fit=crop'],
        category: 'Supplements',
        stock: 150,
        isActive: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '7',
        title: 'Creatine Monohydrate',
        slug: 'creatine-monohydrate',
        description: 'Micronized, 100% pure. Unflavored for stacking.',
        price: 1499,
        images: ['https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=2070&auto=format&fit=crop'],
        category: 'Supplements',
        stock: 300,
        isActive: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '8',
        title: 'Omega-3 Fish Oil',
        slug: 'omega-3-fish-oil',
        description: 'High EPA/DHA potency for joint and heart health.',
        price: 999,
        images: ['https://images.unsplash.com/photo-1616671276245-05d51b119a02?q=80&w=2070&auto=format&fit=crop'],
        category: 'Supplements',
        stock: 500,
        isActive: true,
        createdAt: new Date().toISOString()
    }
];
