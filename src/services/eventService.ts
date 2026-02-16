import { Event, EventCategory } from '@/data/events';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api-dev.mrcoachpro.in/api';

// Backend Interface (snake_case)
// Backend Interface (snake_case)
interface BackendEvent {
    id: number;
    title: string;
    description: string | null;
    about_event: string;
    event_date: string; // "2026-02-28" (Changed from start_date)
    end_date: string;
    registration_close_date?: string;
    location: string;
    state?: string;
    district?: string;
    image: string; // List View uses this
    image_url?: string; // Detail View uses this
    event_image?: string; // Potential other variation
    external_url?: string;
    social_media_url?: string;
    total_slots: number; // Changed from capacity
    booked_slots?: number;

    // Optional/Derived fields
    tickets?: {
        id: number;
        title: string;
        description: string;
        price: string;
        features: string[];
    }[];
    event_highlights?: string; // JSON string or array
    event_schedule?: string; // JSON string
    status: string;
    created_at: string;
    updated_at: string;
    category?: {
        id: number;
        name: string;
        slug: string;
        image_url: string;
    };
    category_id?: number;
    organizers?: BackendOrganizer[]; // Changed from string
}

interface BackendOrganizer {
    id: number;
    event_id: number;
    name: string;
    designation: string;
    short_description: string;
    image: string;
    created_at: string;
    tags: any[];
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
    // Parse highlights/features
    let highlights: string[] = [];
    if (backendEvent.event_highlights) {
        try {
            // Check if already an array or needs parsing
            if (Array.isArray(backendEvent.event_highlights)) {
                highlights = backendEvent.event_highlights;
            } else {
                highlights = JSON.parse(backendEvent.event_highlights);
            }
        } catch (e) {
            // If parse fails, maybe it's a comma separated string or plain text
            if (typeof backendEvent.event_highlights === 'string') {
                highlights = [backendEvent.event_highlights];
            }
        }
    }

    // Format Date: "2026-02-27" -> "Feb 27"
    // Handle invalid dates gracefully
    let formattedDate = 'Date TBA';
    try {
        if (backendEvent.event_date) {
            const dateObj = new Date(backendEvent.event_date);
            if (!isNaN(dateObj.getTime())) {
                formattedDate = dateObj.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                });
            }
        }
    } catch (e) {
        console.error('Date parsing error', e);
    }

    // Determine category
    // If category object is missing, try to infer or default
    let category: EventCategory = 'Sports';
    const catName = backendEvent.category?.name?.toLowerCase() || '';

    if (catName.includes('workshop') || catName.includes('wellness') || catName.includes('yoga')) {
        category = 'Wellness';
    } else if (catName.includes('competition') || catName.includes('tournament')) {
        category = 'Competition';
    } else if (catName.includes('marathon') || catName.includes('run')) {
        category = 'Running';
    }

    // Pricing Logic
    // If tickets exist, get lowest price. If not, check if 'price' field exists (legacy?). 
    // If all fail, "Free" or "Register"
    let priceFormatted = 'Free';
    let pricingTiers: any[] = [];

    if (backendEvent.tickets && backendEvent.tickets.length > 0) {
        // Find lowest price
        const prices = backendEvent.tickets.map(t => parseFloat(t.price)).filter(p => !isNaN(p));
        if (prices.length > 0) {
            const minPrice = Math.min(...prices);
            priceFormatted = minPrice === 0 ? 'Free' : `₹${minPrice.toLocaleString()}`;
        }

        pricingTiers = backendEvent.tickets.map(ticket => ({
            id: ticket.id,
            name: ticket.title,
            price: `₹${parseFloat(ticket.price).toLocaleString()}`,
            description: ticket.description || '',
            features: ticket.features || []
        }));
    } else {
        // Create a default tier if needed, or leave empty
        pricingTiers = [{
            name: 'Standard Entry',
            price: priceFormatted,
            description: 'General admission',
            features: highlights
        }];
    }

    // Location construction
    const locationStr = backendEvent.location || backendEvent.district || backendEvent.state || 'Location TBA';

    // Slots
    const totalSlots = backendEvent.total_slots || 0;
    const bookedSlots = backendEvent.booked_slots || 0;
    const spotsLeft = Math.max(0, totalSlots - bookedSlots);

    // List View (`/api/events`) returns `image`
    // Detail View (`/api/events/:id`) returns `image_url`
    const imageUrl = backendEvent.image ||
        backendEvent.image_url ||
        backendEvent.event_image ||
        '/images/event-placeholder.jpg';

    return {
        id: String(backendEvent.id),
        slug: backendEvent.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        title: backendEvent.title,
        date: formattedDate,
        time: '5:00 AM', // Default or fetch if available (API didn't show time field in logs)
        location: locationStr,
        image: imageUrl,
        price: priceFormatted,
        category: category,
        description: backendEvent.about_event || backendEvent.description || '',
        highlights: highlights.length > 0 ? highlights : ['Join us for this event!'],

        detailedDescription: [backendEvent.description || backendEvent.about_event || ''],

        organizer: backendEvent.organizers && backendEvent.organizers.length > 0 ? {
            name: backendEvent.organizers[0].name,
            role: backendEvent.organizers[0].designation,
            bio: backendEvent.organizers[0].short_description,
            image: backendEvent.organizers[0].image ?
                (backendEvent.organizers[0].image.startsWith('http') ?
                    backendEvent.organizers[0].image :
                    `https://api-dev.mrcoachpro.in/uploads/${backendEvent.organizers[0].image}`) :
                '/images/default-organizer.svg'
        } : {
            name: 'Mr. Coach Team',
            role: 'Organizer',
            bio: 'Official event organizer',
            image: '/images/default-organizer.svg'
        },
        capacity: totalSlots,
        spotsLeft: spotsLeft,
        registrationDeadline: backendEvent.registration_close_date || backendEvent.end_date,

        agenda: [], // API doesn't seem to have agenda structure yet
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
    },

    /**
     * Confirm payment for an order
     */
    async confirmPayment(orderId: string | number, paymentData: any): Promise<{ success: boolean; message?: string; data?: any }> {
        try {
            const res = await fetch(`${API_BASE_URL}/events/orders/${orderId}/payment`, {
                method: 'PUT', // Changed to PUT based on API probe
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(paymentData)
            });

            const json = await res.json();

            if (!res.ok) {
                return { success: false, message: json.message || 'Failed to confirm payment' };
            }

            return { success: true, data: json };
        } catch (error) {
            console.error('Error confirming payment:', error);
            return { success: false, message: 'Network error during payment confirmation' };
        }
    }
};
