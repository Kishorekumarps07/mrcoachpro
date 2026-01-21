'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Event } from '@/data/events';
import styles from './EventCard.module.css';

interface EventCardProps {
    event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
    return (
        <Link href={`/events/${event.id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className={styles.image}
                />
            </div>
            <div className={styles.content}>
                <div className={styles.date}>{event.date}</div>
                <h3 className={styles.title} title={event.title}>{event.title}</h3>
                <p className={styles.location} title={event.location}>{event.location}</p>
                <p className={styles.price}>{event.price}</p>
            </div>
        </Link>
    );
};
