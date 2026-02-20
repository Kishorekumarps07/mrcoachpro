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
    },

    // --- APPAREL ---
    {
        id: '9',
        title: 'Performance Tee (Black)',
        slug: 'performance-tee-black',
        description: 'Sweat-wicking, athletic fit. minimal branding.',
        price: 1299,
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop'],
        category: 'Apparel',
        stock: 100,
        isActive: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '10',
        title: 'Pro Lifting Belt',
        slug: 'pro-lifting-belt',
        description: '10mm thickness, lever buckle. IPF approved specs.',
        price: 4499,
        images: ['https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=2070&auto=format&fit=crop'],
        category: 'Accessories',
        stock: 50,
        isActive: true,
        createdAt: new Date().toISOString()
    },

    // ============================================================
    // PROTEIN
    // ============================================================
    {
        id: '11',
        title: 'Gold Standard Whey (Double Rich Chocolate)',
        slug: 'gold-standard-whey-chocolate',
        description: "24g protein per serving, 5.5g BCAAs, 4g glutamine. The world's best-selling whey.",
        price: 5499,
        images: ['https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=2070&auto=format&fit=crop'],
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
        images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2030&auto=format&fit=crop'],
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
        images: ['https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=2070&auto=format&fit=crop'],
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
        images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop'],
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
        images: ['https://images.unsplash.com/photo-1616671276245-05d51b119a02?q=80&w=2070&auto=format&fit=crop'],
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
        images: ['https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=2070&auto=format&fit=crop'],
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
        images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop'],
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
        images: ['https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=2070&auto=format&fit=crop'],
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
        images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2030&auto=format&fit=crop'],
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
        images: ['https://images.unsplash.com/photo-1616671276245-05d51b119a02?q=80&w=2070&auto=format&fit=crop'],
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
        images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2030&auto=format&fit=crop'],
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
        images: ['https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=2070&auto=format&fit=crop'],
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
        images: ['https://images.unsplash.com/photo-1616671276245-05d51b119a02?q=80&w=2070&auto=format&fit=crop'],
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
        images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2030&auto=format&fit=crop'],
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
        images: ['https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=2070&auto=format&fit=crop'],
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
        images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop'],
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
        images: ['https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=2070&auto=format&fit=crop'],
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
        images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2030&auto=format&fit=crop'],
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
        images: ['https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=2070&auto=format&fit=crop'],
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
        images: ['https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2069&auto=format&fit=crop'],
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
        images: ['https://images.unsplash.com/photo-1590487988256-9ed24133863e?q=80&w=2028&auto=format&fit=crop'],
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
        images: ['https://images.unsplash.com/photo-1598971639058-211a74a1091a?q=80&w=2070&auto=format&fit=crop'],
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
        images: ['https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=2070&auto=format&fit=crop'],
        category: 'gear',
        stock: 300,
        isActive: true,
        createdAt: new Date().toISOString()
    },
];
