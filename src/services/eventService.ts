import { Event, EventCategory } from '@/data/events';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.mrcoachpro.in/api';
const UPLOADS_BASE_URL = `${API_BASE_URL.replace(/\/api\/?$/, '')}/uploads`;


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
    eventsUrl?: string; // Added this variation seen in API
    external_url?: string;
    social_media_url?: string;
    total_slots: number; // Changed from capacity
    booked_slots?: number;
    booked_count?: number; // Potential alternative
    ticket_price?: string | number; // Potential for detail view
    min_ticket_price?: string | number; // List view uses this

    // Optional/Derived fields
    tickets?: {
        id: number;
        title: string;
        description: string;
        price: string;
        features?: string | string[];
        features_json?: string;
        adult_price?: string | number;
        kids_price?: string | number;
        tshirt_required?: string | boolean; // "yes"/"no" or true/false
        tshirt_sizes?: string | string[]; // "S, M, L" or ["S", "M", "L"]
        tshirt_sizes_json?: string;
    }[];
    event_highlights?: string | string[]; // JSON string or array
    highlights?: { highlight_text: string }[];
    event_schedule?: string | any[]; // JSON string or array
    schedule?: { schedule_time: string; title: string; short_description: string }[];
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
    if (backendEvent.highlights && Array.isArray(backendEvent.highlights)) {
        highlights = backendEvent.highlights.map(h => h.highlight_text);
    } else if (backendEvent.event_highlights) {
        try {
            // Check if already an array or needs parsing
            if (Array.isArray(backendEvent.event_highlights)) {
                highlights = backendEvent.event_highlights;
            } else {
                highlights = JSON.parse(backendEvent.event_highlights as string);
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

    // Check for fixed price fields if tickets array is empty
    const directPrice = backendEvent.min_ticket_price || backendEvent.ticket_price;
    if (directPrice && parseFloat(String(directPrice)) > 0) {
        priceFormatted = `₹${parseFloat(String(directPrice)).toLocaleString()}`;
    }

    let pricingTiers: any[] = [];

    if (backendEvent.tickets && backendEvent.tickets.length > 0) {
        // Find lowest price
        const prices = backendEvent.tickets.map(t => parseFloat(t.price)).filter(p => !isNaN(p));
        if (prices.length > 0) {
            const minPrice = Math.min(...prices);
            priceFormatted = minPrice === 0 ? 'Free' : `₹${minPrice.toLocaleString()}`;
        }

        pricingTiers = backendEvent.tickets.map(ticket => {
            // Parse prices
            const basePrice = parseFloat(ticket.price) || 0;
            // Parse adult price (fallback to base price if missing/zero)
            const adultPrice = ticket.adult_price ? (typeof ticket.adult_price === 'string' ? parseFloat(ticket.adult_price) : ticket.adult_price) : basePrice;
            // Parse kids price (fallback to base price if missing/zero)
            const childPrice = ticket.kids_price ? (typeof ticket.kids_price === 'string' ? parseFloat(ticket.kids_price) : ticket.kids_price) : basePrice;

            // Parse T-shirt requirement
            let isTshirtRequired = false;
            if (typeof ticket.tshirt_required === 'string') {
                isTshirtRequired = ticket.tshirt_required.toLowerCase() === 'yes';
            } else if (typeof ticket.tshirt_required === 'boolean') {
                isTshirtRequired = ticket.tshirt_required;
            }

            // Parse features
            let features: string[] = [];
            if (Array.isArray(ticket.features)) {
                features = ticket.features;
            } else if (ticket.features_json) {
                try {
                    features = JSON.parse(ticket.features_json);
                } catch (e) { }
            } else if (typeof ticket.features === 'string') {
                features = (ticket.features as string).split(',').map(f => f.trim()).filter(f => f.length > 0);
            }

            // Parse T-shirt sizes
            let tshirtSizes: string[] = ['S', 'M', 'L', 'XL', 'XXL']; // Default
            if (Array.isArray(ticket.tshirt_sizes)) {
                tshirtSizes = ticket.tshirt_sizes;
            } else if (ticket.tshirt_sizes_json) {
                try {
                    tshirtSizes = JSON.parse(ticket.tshirt_sizes_json);
                } catch (e) { }
            } else if (ticket.tshirt_sizes && typeof ticket.tshirt_sizes === 'string') {
                tshirtSizes = ticket.tshirt_sizes.split(',').map(s => s.trim()).filter(s => s.length > 0);
            }

            return {
                id: ticket.id,
                name: ticket.title,
                price: `₹${basePrice.toLocaleString()}`,
                description: ticket.description || '',
                features: features.length > 0 ? features : (Array.isArray(ticket.features) ? ticket.features : []),
                adultPrice: adultPrice || basePrice,
                childPrice: childPrice || basePrice,
                isTshirtRequired,
                tshirtSizes
            };
        });
    } else {
        // Create a default tier if needed, or leave empty
        pricingTiers = [{
            name: 'Standard Entry',
            price: priceFormatted,
            description: 'General admission',
            features: highlights,
            adultPrice: 0,
            childPrice: 0,
            isTshirtRequired: false,
            tshirtSizes: []
        }];
    }

    // Location construction
    const locationStr = backendEvent.location || backendEvent.district || backendEvent.state || 'Location TBA';

    // Slots
    const totalSlots = backendEvent.total_slots || 0;
    // Check for both booked_slots and booked_count
    const bookedSlots = backendEvent.booked_slots ?? backendEvent.booked_count ?? 0;
    const spotsLeft = Math.max(0, totalSlots - bookedSlots);

    // List View (`/api/events`) returns `image`
    // Detail View (`/api/events/:id`) returns `image_url`
    const rawImage = backendEvent.image ||
        backendEvent.image_url ||
        backendEvent.event_image;

    const imageUrl = rawImage
        ? (rawImage.startsWith('http') ? rawImage : `${UPLOADS_BASE_URL}/${rawImage.replace(/^\//, '')}`)
        : '/images/event-placeholder.jpg';

    return {
        id: String(backendEvent.id),
        slug: backendEvent.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        title: backendEvent.title,
        date: formattedDate,
        isoDate: backendEvent.event_date, // "YYYY-MM-DD"
        time: '5:00 AM', // Default or fetch if available (API didn't show time field in logs)
        location: locationStr,
        image: imageUrl,
        price: priceFormatted,
        category: category,
        description: backendEvent.description || '',
        highlights: highlights.length > 0 ? highlights : ['Join us for this event!'],

        detailedDescription: (backendEvent.about_event || backendEvent.description || '').split('\n').filter(p => p.trim() !== ''),

        organizer: backendEvent.organizers && backendEvent.organizers.length > 0 ? {
            name: backendEvent.organizers[0].name,
            role: backendEvent.organizers[0].designation,
            bio: backendEvent.organizers[0].short_description,
            image: backendEvent.organizers[0].image ?
                (backendEvent.organizers[0].image.startsWith('http') ?
                    backendEvent.organizers[0].image :
                    `${UPLOADS_BASE_URL}/${backendEvent.organizers[0].image}`) :
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

        externalUrl: backendEvent.external_url,
        socialMediaUrl: backendEvent.social_media_url,

        agenda: (() => {
            if (backendEvent.schedule && Array.isArray(backendEvent.schedule)) {
                return backendEvent.schedule.map(item => ({
                    time: item.schedule_time || '',
                    title: item.title || '',
                    description: item.short_description || '',
                    speaker: ''
                }));
            }
            if (!backendEvent.event_schedule) return [];
            try {
                // If it's already an object/array
                if (typeof backendEvent.event_schedule === 'object') {
                    // @ts-ignore
                    return Array.isArray(backendEvent.event_schedule) ? backendEvent.event_schedule : [backendEvent.event_schedule];
                }
                // If it's a string, try to parse details
                let items: any[] = [];
                if (typeof backendEvent.event_schedule === 'string') {
                    const parsed = JSON.parse(backendEvent.event_schedule);
                    items = Array.isArray(parsed) ? parsed : [];
                } else if (Array.isArray(backendEvent.event_schedule)) {
                    items = backendEvent.event_schedule;
                }

                return items.map((item: any) => ({
                    time: item.time || item.Time || '',
                    title: item.title || item.Title || '',
                    description: item.description || item.Description || item.short_description || item['Short Description'] || '',
                    speaker: item.speaker || item.Speaker || ''
                }));
            } catch (e) {
                console.error('Agenda parsing error for event', backendEvent.id, e);
                return [];
            }
        })(),
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
