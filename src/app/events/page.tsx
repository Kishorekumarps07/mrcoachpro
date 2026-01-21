'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { EventsHero } from '@/components/events/EventsHero';
import { FilterBar } from '@/components/events/FilterBar';
import { EventsGrid } from '@/components/events/EventsGrid';

export default function EventsPage() {
    const [activeFilter, setActiveFilter] = useState('All Events');

    return (
        <main className="min-h-screen bg-black">
            <Navbar />
            <EventsHero />
            <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
            <EventsGrid activeFilter={activeFilter} />
        </main>
    );
}
