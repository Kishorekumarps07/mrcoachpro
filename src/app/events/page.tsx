'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { EventsHero } from '@/components/events/EventsHero';
import { FilterBar } from '@/components/events/FilterBar';
import { EventsGrid } from '@/components/events/EventsGrid';
import { eventService } from '@/services/eventService';

export default function EventsPage() {
    const [activeFilterId, setActiveFilterId] = useState(0); // 0 = All Events
    const [events, setEvents] = useState<any[]>([]);
    const [allEvents, setAllEvents] = useState<any[]>([]); // Keep copy for Hero
    const [isLoading, setIsLoading] = useState(true);

    // Fetch Events when filter changes
    React.useEffect(() => {
        const loadEvents = async () => {
            setIsLoading(true);
            try {
                // If filter is 0 (All), we fetch all. 
                // If filter is set, we fetch filtered from API.
                const fetchedEvents = await eventService.getEvents(activeFilterId);
                setEvents(fetchedEvents);

                // If this is the "All Events" fetch, save it for the Hero
                if (activeFilterId === 0) {
                    setAllEvents(fetchedEvents);
                }
            } catch (error) {
                console.error('Failed to load events', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadEvents();
    }, [activeFilterId]);

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero always shows events, preferably from 'All' list to keep carousel running smoothly */}
            {/* If allEvents is empty (initial load), it might show nothing until data arrives */}
            <EventsHero events={allEvents.length > 0 ? allEvents : events} />

            <FilterBar
                activeFilterId={activeFilterId}
                onFilterChange={setActiveFilterId}
            />

            <EventsGrid
                events={events}
                activeFilter={activeFilterId === 0 ? 'All Events' : 'Filtered Results'}
                isLoading={isLoading}
            />
        </main>
    );
}
