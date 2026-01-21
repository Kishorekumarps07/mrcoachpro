'use client';

import React, { useMemo } from 'react';
import { EventCard } from './EventCard';
import { EVENTS } from '@/data/events';
import styles from './EventsGrid.module.css';
import { AnimatePresence, motion } from 'framer-motion';

interface EventsGridProps {
    activeFilter: string;
}

export const EventsGrid = ({ activeFilter }: EventsGridProps) => {
    const filteredEvents = useMemo(() => {
        if (activeFilter === 'All Events') return EVENTS;

        // Handle date filters (mock logic for now as dates are strings/future)
        if (activeFilter === 'Today') return [];
        if (activeFilter === 'Tomorrow') return [];

        // Category matching
        // Handle plural/singular mismatch
        const categoryMap: Record<string, string> = {
            'Workshops': 'Workshop',
            'Competitions': 'Competition'
        };

        const targetCategory = categoryMap[activeFilter] || activeFilter;
        return EVENTS.filter(event => event.category === targetCategory);
    }, [activeFilter]);

    return (
        <section className={styles.gridSection}>
            <div className={styles.container}>
                <h2 className={styles.gridTitle}>
                    {activeFilter === 'All Events' ? 'Upcoming Events' : `${activeFilter}`}
                </h2>

                {filteredEvents.length > 0 ? (
                    <div className={styles.grid}>
                        <AnimatePresence mode='popLayout'>
                            {filteredEvents.map((event) => (
                                <motion.div
                                    key={event.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <EventCard event={event} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="py-20 text-center text-gray-500">
                        <p>No events found for &quot;{activeFilter}&quot; at this time.</p>
                        <button
                            className="mt-4 text-blue-600 font-medium hover:underline"
                            onClick={() => window.location.reload()} // Simple reset or could use a callback
                        >
                            View all events
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};
