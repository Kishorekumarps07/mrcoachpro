'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { EventCard } from '../events/EventCard';
import { eventService } from '@/services/eventService';
import type { Event } from '@/data/events';
import styles from './TrendingEvents.module.css';

export const TrendingEvents = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEvents() {
            try {
                setLoading(true);
                const data = await eventService.getEvents();
                // Get first 4 events for trending section
                setEvents(data.slice(0, 4));
            } catch (error) {
                console.error('Error fetching trending events:', error);
                setEvents([]);
            } finally {
                setLoading(false);
            }
        }
        fetchEvents();
    }, []);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>TOP TRENDING EVENTS</h2>
                </div>

                <div className={styles.scrollContainer}>
                    <div className={styles.grid}>
                        {loading ? (
                            // Loading state - show 4 placeholder cards
                            Array.from({ length: 4 }).map((_, index) => (
                                <div key={`skeleton-${index}`} className={styles.cardWrapper}>
                                    <div className={styles.skeletonCard}>
                                        <div className={styles.skeletonImage}></div>
                                        <div className={styles.skeletonContent}>
                                            <div className={styles.skeletonTitle}></div>
                                            <div className={styles.skeletonText}></div>
                                            <div className={styles.skeletonText}></div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : events.length > 0 ? (
                            events.map((event) => (
                                <div key={event.id} className={styles.cardWrapper}>
                                    <EventCard event={event} />
                                </div>
                            ))
                        ) : (
                            <div className={styles.noEvents}>
                                <p>No events available at the moment.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.footer}>
                    <Link href="/events">
                        <Button variant="secondary">View All Events</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};
