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
        let filtered = EVENTS;

        // Apply category filter
        if (activeFilter !== 'All Events') {
            if (activeFilter === 'Today' || activeFilter === 'Tomorrow') {
                filtered = [];
            } else {
                const categoryMap: Record<string, string> = {
                    'Workshops': 'Workshop',
                    'Competitions': 'Competition'
                };
                const targetCategory = categoryMap[activeFilter] || activeFilter;
                filtered = filtered.filter(event => event.category === targetCategory);
            }
        }

        return filtered;
    }, [activeFilter]);

    return (
        <section className={styles.gridSection}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.gridTitle}>
                        {activeFilter === 'All Events' ? 'Upcoming Events' : `${activeFilter}`}
                    </h2>
                    <p className={styles.subtitle}>
                        Discover amazing fitness events, workshops, and competitions
                    </p>
                </div>

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
                    <div className={styles.emptyState}>
                        <p className={styles.emptyText}>No events found for "{activeFilter}"</p>
                        <button
                            className={styles.resetButton}
                            onClick={() => window.location.reload()}
                        >
                            View all events
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};
