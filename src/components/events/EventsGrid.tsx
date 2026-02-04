'use client';

import React from 'react';
import { EventCard } from './EventCard';
import { Event } from '@/data/events';
import styles from './EventsGrid.module.css';
import { AnimatePresence, motion } from 'framer-motion';

interface EventsGridProps {
    events: Event[];
    activeFilter?: string;
    isLoading?: boolean;
}

export const EventsGrid = ({ events, activeFilter, isLoading }: EventsGridProps) => {

    // If loading, show skeleton wrapper (or simple loading text for now)
    if (isLoading) {
        return (
            <section className={styles.gridSection}>
                <div className={styles.container}>
                    <div className={styles.loadingState}>
                        <div className={styles.spinner}></div>
                        <p>Loading events...</p>
                    </div>
                </div>
            </section>
        );
    }

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

                {events.length > 0 ? (
                    <div className={styles.grid}>
                        <AnimatePresence mode='popLayout'>
                            {events.map((event) => (
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
