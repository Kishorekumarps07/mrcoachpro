export interface PricingTier {
    id?: number;
    name: string;
    price: string;
    description: string;
    features: string[];
    // New fields for dynamic flow
    adultPrice: number;
    childPrice: number;
    isTshirtRequired: boolean;
    tshirtSizes: string[];
}

export interface AgendaItem {
    time: string;
    title: string;
    description: string;
    speaker?: string;
}

export interface Organizer {
    name: string;
    role: string;
    bio: string;
    image: string;
    credentials?: string[];
}

export interface Testimonial {
    name: string;
    role: string;
    content: string;
    image?: string;
}

export type EventCategory = 'Workshop' | 'Competition' | 'Seminar' | 'Wellness' | 'Running' | 'Sports';

export interface Event {
    id: string;
    slug: string;
    title: string;
    date: string;
    time: string;
    location: string;
    price: string;
    image: string;
    category: EventCategory;
    featured?: boolean;
    description: string;
    externalUrl?: string;
    socialMediaUrl?: string;
    isoDate?: string;

    // Enhanced fields
    detailedDescription: string[];
    highlights: string[];
    organizer: Organizer;
    capacity: number;
    spotsLeft: number;
    registrationDeadline: string;
    agenda: AgendaItem[];
    pricingTiers: PricingTier[];
    tags: string[];
    testimonials?: Testimonial[];
}

export const EVENTS: Event[] = [
    {
        id: '1',
        slug: 'mumbai-urban-marathon-2026',
        title: 'Mumbai Urban Marathon 2026',
        date: 'Sun, 19 Apr',
        time: '5:00 AM',
        location: 'Jio World Garden, Mumbai',
        price: '₹1500 onwards',
        image: '/mumbai-marathon-hero.png',
        category: 'Running',
        featured: true,
        description: 'Join thousands of athletes in the heart of Mumbai for the ultimate urban endurance challenge. Qualifiers for National Heats.',
        detailedDescription: [
            'Experience the thrill of running through Mumbai\'s iconic streets in this premier marathon event. The Mumbai Urban Marathon 2026 brings together elite athletes and passionate runners from across the country for an unforgettable race day.',
            'This year\'s route takes you through some of Mumbai\'s most scenic locations, starting at the beautiful Jio World Garden and winding through the city\'s vibrant neighborhoods. Whether you\'re aiming for a personal best or running for the experience, this event offers something for everyone.',
            'As a qualifier for the National Heats, this marathon attracts top-tier talent while maintaining an inclusive atmosphere for runners of all levels. Join us for a day of athletic excellence, community spirit, and personal achievement.'
        ],
        highlights: [
            'Official qualifier for National Championship',
            'Chip-timed race with live tracking',
            'Finisher medals and certificates for all participants',
            'Hydration stations every 2km',
            'Post-race recovery zone with physiotherapy',
            'Live music and entertainment along the route'
        ],
        organizer: {
            name: 'Rajesh Kumar',
            role: 'Race Director',
            bio: 'Former national marathon champion with 15 years of experience organizing premier running events across India.',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
            credentials: ['National Marathon Champion 2015', 'Certified Race Director', 'Sports Management MBA']
        },
        capacity: 5000,
        spotsLeft: 1247,
        registrationDeadline: '15 Apr 2026',
        agenda: [
            { time: '4:30 AM', title: 'Registration & Bib Collection', description: 'Collect your race bib and timing chip' },
            { time: '5:00 AM', title: 'Race Start - Full Marathon', description: '42.195 km race begins' },
            { time: '6:00 AM', title: 'Half Marathon Start', description: '21 km race begins' },
            { time: '7:00 AM', title: '10K Fun Run Start', description: 'Family-friendly 10km run' },
            { time: '12:00 PM', title: 'Awards Ceremony', description: 'Prize distribution for top finishers' }
        ],
        pricingTiers: [
            {
                name: 'Early Bird - Full Marathon',
                price: '₹1,500',
                description: 'Limited time offer',
                features: ['Race bib & timing chip', 'Finisher medal', 'Official t-shirt', 'Post-race meal'],
                adultPrice: 1500,
                childPrice: 1500,
                isTshirtRequired: true,
                tshirtSizes: ['S', 'M', 'L', 'XL']
            },
            {
                name: 'Regular - Full Marathon',
                price: '₹2,000',
                description: 'Standard registration',
                features: ['Race bib & timing chip', 'Finisher medal', 'Official t-shirt', 'Post-race meal', 'Digital certificate'],
                adultPrice: 2000,
                childPrice: 2000,
                isTshirtRequired: true,
                tshirtSizes: ['S', 'M', 'L', 'XL', 'XXL']
            },
            {
                name: 'Half Marathon',
                price: '₹1,200',
                description: '21 km race',
                features: ['Race bib & timing chip', 'Finisher medal', 'Official t-shirt', 'Refreshments'],
                adultPrice: 1200,
                childPrice: 1200,
                isTshirtRequired: true,
                tshirtSizes: ['S', 'M', 'L', 'XL']
            }
        ],
        tags: ['Marathon', 'Running', 'Fitness', 'Competitive', 'Outdoor'],
        testimonials: [
            {
                name: 'Priya Sharma',
                role: 'Marathon Finisher 2025',
                content: 'The best organized marathon I\'ve ever participated in. The route was scenic, support was excellent, and the atmosphere was electric!',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'
            }
        ]
    },
    {
        id: '2',
        slug: 'national-powerlifting-meet',
        title: 'National Powerlifting Meet',
        date: 'Sat, 28 Feb',
        time: '9:00 AM',
        location: 'Indoor Stadium, Madurai',
        price: '₹500 Entry',
        image: 'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?q=80&w=1000&auto=format&fit=crop',
        category: 'Competition',
        description: 'Witness raw power as the country\'s strongest athletes compete for the national title in Squat, Bench, and Deadlift.',
        detailedDescription: [
            'The National Powerlifting Meet returns for its 10th edition, bringing together India\'s elite strength athletes for three days of intense competition.',
            'Compete in the three classic powerlifting disciplines - Squat, Bench Press, and Deadlift - across multiple weight categories. This event is sanctioned by the Indian Powerlifting Federation and serves as a qualifier for international competitions.'
        ],
        highlights: [
            'IPF sanctioned competition',
            'Multiple weight categories',
            'Cash prizes for top 3 in each category',
            'International standard equipment',
            'Live streaming of all lifts',
            'Meet and greet with national champions'
        ],
        organizer: {
            name: 'Coach Vikram Singh',
            role: 'Head Coach & Meet Director',
            bio: 'National powerlifting coach with 20+ years experience. Former Asian Games medalist.',
            image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400',
            credentials: ['IPF Level 3 Coach', 'Asian Games Bronze Medalist', 'National Record Holder']
        },
        capacity: 200,
        spotsLeft: 45,
        registrationDeadline: '20 Feb 2026',
        agenda: [
            { time: '8:00 AM', title: 'Weigh-ins', description: 'Official weigh-in for all competitors' },
            { time: '9:00 AM', title: 'Opening Ceremony', description: 'Welcome address and competition briefing' },
            { time: '10:00 AM', title: 'Squat Competition', description: 'All weight categories' },
            { time: '1:00 PM', title: 'Bench Press Competition', description: 'All weight categories' },
            { time: '4:00 PM', title: 'Deadlift Competition', description: 'All weight categories' },
            { time: '7:00 PM', title: 'Awards Ceremony', description: 'Prize distribution and closing' }
        ],
        pricingTiers: [
            {
                name: 'Competitor Entry',
                price: '₹500',
                description: 'Athlete registration',
                features: ['Competition entry', 'Official weigh-in', 'Competitor kit', 'Certificate of participation'],
                adultPrice: 500,
                childPrice: 300, // Example of split pricing
                isTshirtRequired: true,
                tshirtSizes: ['S', 'M', 'L', 'XL', 'XXL']
            },
            {
                name: 'Spectator Pass',
                price: '₹200',
                description: 'Watch the competition',
                features: ['Full day access', 'Event program', 'Refreshments'],
                adultPrice: 200,
                childPrice: 100,
                isTshirtRequired: false, // No tshirt for spectators
                tshirtSizes: []
            }
        ],
        tags: ['Powerlifting', 'Strength', 'Competition', 'Indoor'],
        testimonials: [
            {
                name: 'Arjun Patel',
                role: '2025 Champion',
                content: 'Incredible organization and atmosphere. The competition was fierce but fair. Can\'t wait for next year!',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'
            }
        ]
    },
    {
        id: '3',
        slug: 'himalayan-base-camp-trek',
        title: 'Himalayan Base Camp Trek',
        date: 'Fri, 23 Jan',
        time: '4:00 AM',
        location: 'Manali Base, Himachal',
        price: '₹14,999',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop',
        category: 'Wellness',
        description: 'A 7-day high-altitude trek designed to test your endurance and reconnect you with nature. Professional guides included.',
        detailedDescription: [
            'Embark on an unforgettable journey to the Himalayan Base Camp, where breathtaking vistas and personal challenges await. This carefully curated 7-day trek combines physical endurance with spiritual rejuvenation.',
            'Led by experienced mountain guides, you\'ll traverse through pristine valleys, ancient forests, and snow-capped peaks. Each day brings new landscapes and personal discoveries as you push your limits in one of the world\'s most spectacular mountain ranges.'
        ],
        highlights: [
            'Professional mountain guides',
            'All meals and accommodation included',
            'Safety equipment provided',
            'Small group size (max 12 people)',
            'Acclimatization days built into schedule',
            'Photography workshops along the route'
        ],
        organizer: {
            name: 'Tenzin Sherpa',
            role: 'Lead Trek Guide',
            bio: 'Third-generation mountain guide with 15 years of Himalayan trekking experience. Summited Everest 3 times.',
            image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
            credentials: ['Wilderness First Responder', 'Everest Summiteer', 'Mountain Guide Certification']
        },
        capacity: 12,
        spotsLeft: 3,
        registrationDeadline: '15 Jan 2026',
        agenda: [
            { time: 'Day 1', title: 'Manali to Base Camp', description: 'Drive and initial trek (6 hours)' },
            { time: 'Day 2-3', title: 'Acclimatization Trek', description: 'Gradual altitude gain with rest periods' },
            { time: 'Day 4-5', title: 'Summit Push', description: 'Reach base camp and explore' },
            { time: 'Day 6', title: 'Descent', description: 'Return journey begins' },
            { time: 'Day 7', title: 'Return to Manali', description: 'Final trek and celebration dinner' }
        ],
        pricingTiers: [
            {
                name: 'Standard Package',
                price: '₹14,999',
                description: 'Complete trek package',
                features: ['Professional guides', 'All meals', 'Camping equipment', 'Transportation', 'First aid support'],
                adultPrice: 14999,
                childPrice: 12000,
                isTshirtRequired: false,
                tshirtSizes: []
            },
            {
                name: 'Premium Package',
                price: '₹19,999',
                description: 'Enhanced experience',
                features: ['All Standard features', 'Private tent', 'Personal porter', 'Professional photography', 'Pre-trek fitness consultation'],
                adultPrice: 19999,
                childPrice: 17000,
                isTshirtRequired: false,
                tshirtSizes: []
            }
        ],
        tags: ['Trekking', 'Adventure', 'Wellness', 'Outdoor', 'Himalaya'],
        testimonials: [
            {
                name: 'Meera Reddy',
                role: 'Trek Participant 2025',
                content: 'Life-changing experience! The guides were knowledgeable and supportive. The views were absolutely worth every step.',
                image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'
            }
        ]
    }
];
