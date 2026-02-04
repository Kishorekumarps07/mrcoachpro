import { Event, EventCategory } from '@/data/events';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api-dev.mrcoachpro.in/api';

// Backend Interface (snake_case)
// Backend Interface (snake_case)
interface BackendEvent {
    id: number;
    title: string;
    description: string | null;
    about_event: string;
    start_date: string; // "2026-02-27"
    start_time: string; // "5:00 AM"
    end_date: string;
    end_time: string;
    location: string;
    image_url: string;
    price: string; // "300.00"
    registration_link: string | null;
    category: {
        id: number;
        name: string;
        slug: string;
        image_url: string;
    };
    capacity: number;
    // Optional/Derived fields
    tickets?: {
        id: number;
        title: string;
        description: string;
        price: string;
        features: string[];
    }[];
    features?: string[];
    features_json?: string;
}

interface BackendCategory {
    id: number;
    name: string;
    slug: string;
    image_url: string;
}

interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

/**
 * Maps backend event to frontend Event interface
 */
const mapBackendEventToFrontend = (backendEvent: BackendEvent): Event => {
    // Parse features from JSON string if array is null
    let features: string[] = backendEvent.features || [];
    if (!features.length && backendEvent.features_json) {
        try {
            features = JSON.parse(backendEvent.features_json);
        } catch (e) {
            console.error('Failed to parse features_json', e);
        }
    }

    // Format Date: "2026-02-27" -> "Feb 27"
    const dateObj = new Date(backendEvent.start_date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });

    // Determine category based on name
    let category: EventCategory = 'Running'; // Default
    const backendCatName = backendEvent.category?.name?.toLowerCase() || '';

    if (backendCatName.includes('workshop') || backendCatName.includes('wellness')) {
        category = 'Wellness';
    } else if (backendCatName.includes('competition')) {
        category = 'Competition';
    } else if (backendCatName.includes('marathon') || backendCatName.includes('run')) {
        category = 'Running';
    } else if (backendCatName.includes('sport')) {
        category = 'Sports';
    }

    const priceFormatted = `₹${parseFloat(backendEvent.price).toLocaleString()}`;

    // Map Tickets to Pricing Tiers
    let pricingTiers = [
        {
            name: 'Standard Entry',
            price: priceFormatted,
            description: 'General admission access',
            features: features
        }
    ];

    if (backendEvent.tickets && backendEvent.tickets.length > 0) {
        pricingTiers = backendEvent.tickets.map(ticket => ({
            id: ticket.id,
            name: ticket.title,
            price: `₹${parseFloat(ticket.price).toLocaleString()}`,
            description: ticket.description || '',
            features: ticket.features || [] // Explicitly use features from ticket
        }));
    }

    return {
        id: String(backendEvent.id),
        slug: backendEvent.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        title: backendEvent.title,
        date: formattedDate,
        time: backendEvent.start_time,
        location: backendEvent.location,
        image: backendEvent.image_url,
        price: priceFormatted,
        category: category,
        description: backendEvent.about_event || backendEvent.description || '',
        highlights: features, // Map features to highlights

        // Default values for fields not in API
        detailedDescription: [backendEvent.description || ''],

        organizer: {
            name: 'Mr. Coach Team',
            role: 'Organizer',
            bio: 'Official event organizer',
            image: '/images/default-organizer.jpg'
        },
        capacity: backendEvent.capacity,
        spotsLeft: backendEvent.capacity, // Default to capacity if not tracked
        registrationDeadline: backendEvent.end_date,

        // Map start/end times to Agenda
        agenda: [
            {
                time: backendEvent.start_time,
                title: 'Event Starts',
                description: 'Registration and entry begins'
            },
            {
                time: backendEvent.end_time,
                title: 'Event Concludes',
                description: 'Closing remarks and departure'
            }
        ],

        // Use mapped pricing tiers
        pricingTiers: pricingTiers,

        tags: [category],
        testimonials: [],
        featured: false
    };
};

export const eventService = {
    /**
     * Fetch all events or by category
     */
    async getEvents(categoryId?: number): Promise<Event[]> {
        try {
            let url = `${API_BASE_URL}/events`;
            if (categoryId && categoryId !== 0) {
                url += `?category_id=${categoryId}`;
            }

            const res = await fetch(url, { cache: 'no-store' });
            if (!res.ok) throw new Error('Failed to fetch events');

            const json: ApiResponse<BackendEvent[]> = await res.json();

            if (!json.success || !Array.isArray(json.data)) {
                return [];
            }

            return json.data.map(mapBackendEventToFrontend);
        } catch (error) {
            console.error('Error fetching events:', error);
            return [];
        }
    },

    /**
     * Fetch single event by ID
     */
    async getEventById(id: string): Promise<Event | null> {
        try {
            const res = await fetch(`${API_BASE_URL}/events/${id}`, { cache: 'no-store' });
            if (!res.ok) return null;

            const json: ApiResponse<BackendEvent> = await res.json();

            if (!json.success || !json.data) {
                return null;
            }

            return mapBackendEventToFrontend(json.data);
        } catch (error) {
            console.error(`Error fetching event ${id}:`, error);
            return null;
        }
    },

    /**
     * Fetch all categories
     */
    async getCategories(): Promise<{ id: number; name: string }[]> {
        try {
            const res = await fetch(`${API_BASE_URL}/events/categories`, { cache: 'force-cache' });
            if (!res.ok) throw new Error('Failed to fetch categories');

            const json: ApiResponse<BackendCategory[]> = await res.json();

            if (!json.success || !Array.isArray(json.data)) {
                return [];
            }

            return json.data.map(cat => ({
                id: cat.id,
                name: cat.name
            }));
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    },

    /**
     * Create a new order
     */
    async createOrder(orderData: any): Promise<{ success: boolean; message?: string; data?: any }> {
        try {
            const res = await fetch(`${API_BASE_URL}/events/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            const json = await res.json();

            if (!res.ok) {
                return { success: false, message: json.message || 'Failed to create order' };
            }

            return { success: true, data: json };
        } catch (error) {
            console.error('Error creating order:', error);
            return { success: false, message: 'Network error occurred' };
        }
    }
};
