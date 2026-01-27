'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Event } from '@/data/events';
import { MapPin, Users, Clock } from 'lucide-react';
import styles from './EventCard.module.css';

interface EventCardProps {
    event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
    const getRegistrationStatus = () => {
        const percentageFilled = ((event.capacity - event.spotsLeft) / event.capacity) * 100;
        if (event.spotsLeft === 0) return { text: 'Sold Out', className: styles.soldOut };
        if (percentageFilled >= 80) return { text: 'Filling Fast', className: styles.fillingFast };
        if (percentageFilled >= 50) return { text: 'Limited Spots', className: styles.limitedSpots };
        return { text: `${event.spotsLeft} Spots Left`, className: styles.available };
    };

    const status = getRegistrationStatus();

    return (
        <Link href={`/events/${event.id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.image}
                />
                <div className={`${styles.statusBadge} ${status.className}`}>
                    {status.text}
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.header}>
                    <div className={styles.date}>
                        <Clock size={12} />
                        {event.date}
                    </div>
                    <div className={styles.categoryTag}>{event.category}</div>
                </div>

                <h3 className={styles.title} title={event.title}>{event.title}</h3>

                <p className={styles.location} title={event.location}>
                    <MapPin size={14} />
                    {event.location}
                </p>

                {/* Highlights Preview */}
                <ul className={styles.highlights}>
                    {event.highlights.slice(0, 3).map((highlight, index) => (
                        <li key={index} className={styles.highlightItem}>
                            {highlight}
                        </li>
                    ))}
                </ul>

                <div className={styles.footer}>
                    <p className={styles.price}>{event.price}</p>
                    <div className={styles.capacity}>
                        <Users size={14} />
                        <span>{event.spotsLeft}/{event.capacity}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};
