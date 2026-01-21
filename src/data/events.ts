export interface Event {
    id: string;
    slug: string;
    title: string;
    date: string;
    time: string;
    location: string;
    price: string;
    image: string;
    category: 'Workshop' | 'Competition' | 'Seminar' | 'Wellness' | 'Running' | 'Sports';
    featured?: boolean;
    description: string;
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
        image: '/mumbai-marathon-hero.png', // Marathon runner
        category: 'Running',
        featured: true,
        description: 'Join thousands of athletes in the heart of Mumbai for the ultimate urban endurance challenge. Qualifiers for National Heats.'
    },
    {
        id: '2',
        slug: 'national-powerlifting-meet',
        title: 'National Powerlifting Meet',
        date: 'Sat, 28 Feb',
        time: '9:00 AM',
        location: 'Indoor Stadium, Madurai',
        price: '₹500 Entry',
        image: 'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?q=80&w=1000&auto=format&fit=crop', // Powerlifting
        category: 'Competition',
        description: 'Witness raw power as the country’s strongest athletes compete for the national title in Squat, Bench, and Deadlift.'
    },
    {
        id: '3',
        slug: 'himalayan-base-camp-trek',
        title: 'Himalayan Base Camp Trek',
        date: 'Fri, 23 Jan',
        time: '4:00 AM',
        location: 'Manali Base, Himachal',
        price: '₹14,999',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop', // Trekking (Mountain)
        category: 'Wellness',
        description: 'A 7-day high-altitude trek designed to test your endurance and reconnect you with nature. Professional guides included.'
    },
    {
        id: '4',
        slug: 'sunrise-yoga-festival',
        title: 'Sunrise Yoga Festival',
        date: 'Mon, 12 Jan',
        time: '6:00 AM',
        location: 'Eco Park, Chennai',
        price: 'Free',
        image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=1000&auto=format&fit=crop', // Yoga Pose

        category: 'Wellness',
        description: 'Start your year with mindfulness and movement. A community yoga session led by master instructors.'
    },

    {
        id: '5',
        slug: 'beach-volleyball-championship',
        title: 'Beach Volleyball Championship',
        date: 'Sat, 17 Jan',
        time: '8:00 AM',
        location: 'Marina Beach, Chennai',
        price: '₹2000 / Team',
        image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=1000&auto=format&fit=crop', // Volleyball
        category: 'Sports',
        description: '3v3 Beach Volleyball tournament with amateur and pro brackets. Cash prizes up for grabs.'
    },
    {
        id: '6',
        slug: 'charity-fun-run-5k',
        title: 'Charity Fun Run 5K',
        date: 'Sun, 05 Apr',
        time: '6:30 AM',
        location: 'Bandra Fort, Mumbai',
        price: '₹100 Donation',
        image: '/images/charity-fun-run.jpg', // Local upload
        category: 'Running',
        description: 'Run for a cause. All proceeds go to supporting underprivileged youth sports programs.'
    },
    {
        id: '7',
        slug: 'elite-strength-workshop',
        title: 'Elite Strength Workshop',
        date: 'Sat, 15 Mar',
        time: '10:00 AM',
        location: 'MrCoach HQ, NYC',
        price: '$150',
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop', // Gym/Strength
        category: 'Workshop',
        description: 'Master the big three lifts with Olympic coaches. Technique analysis and programming seminar.'
    },
    {
        id: '8',
        slug: 'mobility-flow-masterclass',
        title: 'Mobility Flow Masterclass',
        date: 'Sun, 22 Mar',
        time: '8:00 AM',
        location: 'Central Park, NYC',
        price: 'Free',
        image: '/images/mobility-flow.jpg', // Local upload
        category: 'Workshop',
        description: 'Unlock your stiff joints and improve your range of motion in this 90-minute intensive session.'
    }
];
