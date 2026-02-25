export const SPECIALIZATION_SERVICES: Record<string, string[]> = {
    "Fitness & Personal Training": [
        "Aerobics Instructor", "Body transformation", "CrossFit Trainer",
        "Fitness Trainer at Home", "Functional Trainer", "Group Fitness Trainer",
        "Home Yoga Trainer", "Muscle building Trainer", "Online Personal Trainer",
        "Online Yoga Instructor", "Personal Trainer", "Strength & Conditioning Coach",
        "Weight Loss Trainer", "Zumba Trainer"
    ],
    "Health & Wellness": [
        "Accupressure Therapist", "Accupuncture Therapist", "Body Massage Therapist",
        "Cupping Therapist", "Meditation Coach", "Nutritionist / Dietitian",
        "Pain Relief Therapy", "Physiotherapist", "Power Yoga", "Rehab Specialist",
        "Sports Nutrition Coach", "Touch Healing Therapist", "Yoga Classes"
    ],
    "Sports Coaching": [
        "Athletic Coach", "Badminton Coaching", "Boxing Coach", "Cricket Coaching",
        "Football Coaching", "Kick Boxing Coach", "Kids Fitness Coach",
        "Marathon Training", "Running Coach", "Shuttle Badminton Coach",
        "Table Tennis Coaching"
    ]
};

// Core services for search placeholders
export const CORE_SERVICES = [
    "Fitness",
    "Physio",
    "Sports",
    "Yoga",
    "Online",
    "Nutrition"
];

// Flatten all services into a single array for the search bar with category info
export const SEARCHABLE_SERVICES = Object.entries(SPECIALIZATION_SERVICES).flatMap(([category, services]) =>
    services.map(service => ({
        name: service,
        category: category.split(' & ')[0], // Simplify category name
        slug: category.toLowerCase().includes('fitness') ? 'fitness' :
            category.toLowerCase().includes('health') ? 'physio' :
                category.toLowerCase().includes('sports') ? 'sports' : 'services'
    }))
);

export const ALL_SERVICES = SEARCHABLE_SERVICES.map(s => s.name);
