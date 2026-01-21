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

// Flatten all services into a single array for the search bar
export const ALL_SERVICES = Object.values(SPECIALIZATION_SERVICES).flat();
