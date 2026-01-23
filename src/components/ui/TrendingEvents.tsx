'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { EventCard } from '../events/EventCard';
import { EVENTS } from '@/data/events';
import styles from './TrendingEvents.module.css';

export const TrendingEvents = () => {
    // Get top 4 featured or upcoming events
    const trendingEvents = EVENTS.slice(0, 4);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>TOP TRENDING EVENTS</h2>
                </div>

                <div className={styles.scrollContainer}>
                    <div className={styles.grid}>
                        {trendingEvents.map((event) => (
                            <div key={event.id} className={styles.cardWrapper}>
                                <EventCard event={event} />
                            </div>
                        ))}
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
