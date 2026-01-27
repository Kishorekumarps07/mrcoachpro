'use client';

import React, { useMemo, useState } from 'react';
import { EventCard } from './EventCard';
import { EVENTS } from '@/data/events';
import { Search } from 'lucide-react';
import styles from './EventsGrid.module.css';
import { AnimatePresence, motion } from 'framer-motion';

interface EventsGridProps {
    activeFilter: string;
}

export const EventsGrid = ({ activeFilter }: EventsGridProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'date' | 'price' | 'popularity'>('date');

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

        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(event =>
                event.title.toLowerCase().includes(query) ||
                event.location.toLowerCase().includes(query) ||
                event.description.toLowerCase().includes(query) ||
                event.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }

        // Apply sorting
        filtered = [...filtered].sort((a, b) => {
            if (sortBy === 'price') {
                const priceA = parseInt(a.price.replace(/[^0-9]/g, '')) || 0;
                const priceB = parseInt(b.price.replace(/[^0-9]/g, '')) || 0;
                return priceA - priceB;
            }
            if (sortBy === 'popularity') {
                return (b.capacity - b.spotsLeft) - (a.capacity - a.spotsLeft);
            }
            return 0; // date sorting (default order)
        });

        return filtered;
    }, [activeFilter, searchQuery, sortBy]);

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

                {/* Search and Sort Controls */}
                <div className={styles.controls}>
                    <div className={styles.searchWrapper}>
                        <Search size={20} className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search events by name, location, or tags..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className={styles.sortSelect}
                    >
                        <option value="date">Sort by Date</option>
                        <option value="price">Sort by Price</option>
                        <option value="popularity">Sort by Popularity</option>
                    </select>
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
                            onClick={() => {
                                setSearchQuery('');
                                window.location.reload();
                            }}
                        >
                            View all events
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};
