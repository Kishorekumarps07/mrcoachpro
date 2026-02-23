import { Product } from '@/types/shop';

export const PRODUCTS: Product[] = [
    // ============================================================
    // PROTEIN
    // ============================================================
    {
        id: '11',
        title: 'Gold Standard Whey (Double Rich Chocolate)',
        slug: 'gold-standard-whey-chocolate',
        description: "24g protein per serving, 5.5g BCAAs, 4g glutamine. The world's best-selling whey.",
        price: 5499,
        images: ['/images/products/gold-standard-whey-nobg.png'],
        category: 'protein',
        stock: 180,
        isActive: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '12',
        title: 'MuscleBlaze Whey Protein (1kg)',
        slug: 'muscleblaze-whey-protein-1kg',
        description: "25g protein, 11.5g EAAs, no added sugar. India's #1 whey.",
        price: 2999,
        images: ['/images/products/muscleblaze-whey-nobg.png'],
        category: 'protein',
        stock: 220,
        isActive: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '13',
        title: 'Dymatize ISO100 Hydrolyzed',
        slug: 'dymatize-iso100-hydrolyzed',
        description: '25g ultra-pure hydrolyzed whey isolate. Fastest-absorbing protein.',
        price: 6499,
        images: ['/images/products/dymatize-iso100-nobg.png'],
        category: 'protein',
        stock: 120,
        isActive: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '14',
        title: 'MyProtein Impact Whey (Strawberry)',
        slug: 'myprotein-impact-whey-strawberry',
        description: '21g protein, 4.5g BCAAs per 25g serving. Great value protein.',
        price: 2199,
        images: ['/images/products/myprotein-impact-nobg.png'],
        category: 'protein',
        stock: 300,
        isActive: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '15',
        title: 'Casein Protein (Vanilla)',
        slug: 'casein-protein-vanilla',
        description: 'Slow-release protein. 24g per serving. Perfect for overnight recovery.',
        price: 4299,
        images: ['/images/products/casein-vanilla-nobg.png'],
        category: 'protein',
        stock: 90,
        isActive: true,
        createdAt: new Date().toISOString()
    },

    // ============================================================
    // PRE-WORKOUT
    // ============================================================
    {
        id: '16',
        title: 'C4 Original Pre-Workout',
        slug: 'c4-original-pre-workout',
        description: "150mg caffeine, 1.6g beta-alanine, 1g creatine nitrate. America's #1 pre-workout.",
        price: 2799,
        images: ['/images/products/c4-preworkout-nobg.png'],
        category: 'pre-workout',
        stock: 140,
        isActive: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '17',
        title: 'Optimum Nutrition Gold PRE',
        slug: 'on-gold-pre',
        description: '175mg caffeine, 3g citrulline, 1.5g beta-alanine, 300mg peak ATP.',
        price: 3299,
        images: ['/images/products/on-gold-pre-nobg.png'],
        category: 'pre-workout',
        stock: 100,
        isActive: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '18',
        title: 'MusclePharm Assault',
        slug: 'musclepharm-assault',
        description: 'Explosive energy matrix with 300mg caffeine. Time-release formula.',
        price: 2499,
        images: ['/images/products/musclepharm-assault-nobg.png'],
        category: 'pre-workout',
        stock: 85,
        isActive: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '19',
        title: 'MuscleTech Vapor X5',
        slug: 'muscletech-vapor-x5',
        description: '3g creatine, 4g citrulline, 200mg caffeine. Multi-stage pre-workout.',
        price: 3499,
        images: ['/images/products/muscletech-vaporx5-nobg.png'],
        category: 'pre-workout',
        stock: 70,
        isActive: true,
        createdAt: new Date().toISOString()
    },

    // ============================================================
    // VITAMINS
    // ============================================================
    {
        id: '20',
        title: 'Optimum Nutrition Opti-Men',
        slug: 'on-opti-men-multivitamin',
        description: '75+ active ingredients. Complete multi-vitamin for active men.',
        price: 1999,
        images: ['/images/products/on-opti-men-nobg.png'],
        category: 'vitamins',
        stock: 250,
        isActive: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '21',
        title: 'Vitamin D3 + K2 (5000 IU)',
        slug: 'vitamin-d3-k2-5000iu',
        description: 'D3 for immunity & bones. K2 ensures calcium goes to bones not arteries.',
        price: 899,
        images: ['/images/products/vitamin-d3-k2-nobg.png'],
        category: 'vitamins',
        stock: 400,
        isActive: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '22',
        title: 'ZMA (Zinc Magnesium + B6)',
        slug: 'zma-zinc-magnesium-b6',
        description: 'Boosts testosterone naturally. Enhances deep sleep and recovery.',
        price: 1299,
        images: ['/images/products/zma-nobg.png'],
        category: 'vitamins',
        stock: 180,
        isActive: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '23',
        title: 'Vitamin C 1000mg (60 tabs)',
        slug: 'vitamin-c-1000mg',
        description: 'High-dose antioxidant. Boosts immunity and collagen synthesis.',
        price: 599,
        images: ['/images/products/vitamin-c-nobg.png'],
        category: 'vitamins',
        stock: 500,
        isActive: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '24',
        title: 'B-Complex + Folic Acid',
        slug: 'b-complex-folic-acid',
        description: 'Complete B-vitamin complex. Energy metabolism and nerve function.',
        price: 749,
        images: ['/images/products/b-complex-nobg.png'],
        category: 'vitamins',
        stock: 350,
        isActive: true,
        createdAt: new Date().toISOString()
    },

    // ============================================================
    // GAINERS
    // ============================================================
    {
        id: '25',
        title: 'Optimum Serious Mass (6lb)',
        slug: 'on-serious-mass-6lb',
        description: '1250 calories, 50g protein, 252g carbs per serving. King of mass gainers.',
        price: 4999,
        images: ['/images/products/on-serious-mass-nobg.png'],
        category: 'gainers',
        stock: 130,
        isActive: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '26',
        title: 'BSN True-Mass 1200',
        slug: 'bsn-true-mass-1200',
        description: '1200 calories, 50g protein, 222g carbs. Premium lean gainer.',
        price: 5499,
        images: ['/images/products/bsn-true-mass-nobg.png'],
        category: 'gainers',
        stock: 90,
        isActive: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '27',
        title: 'MuscleBlaze Mass Gainer XXL',
        slug: 'muscleblaze-mass-gainer-xxl',
        description: "177g complex carbs, 30g protein per serving. India's no. 1 gainer.",
        price: 2399,
        images: ['/images/products/macroblaze-mass-gainer-nobg.png'],
        category: 'gainers',
        stock: 200,
        isActive: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '28',
        title: 'MuscleTech Mass Tech Extreme',
        slug: 'muscletech-mass-tech-extreme',
        description: '840 calories, 80g protein, 132g carbs. For hard gainers.',
        price: 6499,
        images: ['/images/products/muscletech-mass-tech-nobg.png'],
        category: 'gainers',
        stock: 60,
        isActive: true,
        createdAt: new Date().toISOString()
    },

    // ============================================================
    // GEAR
    // ============================================================
    {
        id: '29',
        title: 'Gym Wrist Wraps (Pair)',
        slug: 'gym-wrist-wraps',
        description: '18" heavy-duty cotton wraps. Velcro closure. IPF approved.',
        price: 799,
        images: ['/images/products/wrist-wraps-nobg.png'],
        category: 'gear',
        stock: 200,
        isActive: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '30',
        title: 'Lifting Straps (Cotton)',
        slug: 'lifting-straps-cotton',
        description: 'Extra-long 24" padded straps. Max grip for deadlifts and rows.',
        price: 499,
        images: ['/images/products/lifting-straps-nobg.png'],
        category: 'gear',
        stock: 250,
        isActive: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '31',
        title: 'Knee Sleeves 7mm (Pair)',
        slug: 'knee-sleeves-7mm',
        description: 'Competition-grade neoprene. Warmth, compression and stability.',
        price: 2499,
        images: ['/images/products/knee-sleeves-nobg.png'],
        category: 'gear',
        stock: 80,
        isActive: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '32',
        title: 'Gym Gloves with Wrist Support',
        slug: 'gym-gloves-wrist-support',
        description: 'Full palm protection, anti-slip grip. Breathable mesh back.',
        price: 699,
        images: ['/images/products/gym-gloves-nobg.png'],
        category: 'gear',
        stock: 150,
        isActive: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '33',
        title: 'Gallon Shaker Bottle (2.2L)',
        slug: 'gallon-shaker-bottle',
        description: 'BPA-free, leak-proof lid. Time markings for hydration tracking.',
        price: 899,
        images: ['/images/products/gallon-shaker-nobg.png'],
        category: 'gear',
        stock: 300,
        isActive: true,
        createdAt: new Date().toISOString()
    },
];
