'use client';

import React from 'react';
import Image from 'next/image';
import { Event } from '@/data/events';
import { Button } from '@/components/ui/Button';
import { Calendar, MapPin, Clock, ShieldCheck, Globe, Users } from 'lucide-react';
import styles from './EventDetailView.module.css';

interface EventDetailViewProps {
    event: Event;
}

export const EventDetailView = ({ event }: EventDetailViewProps) => {
    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
            <div className={styles.container}>
                {/* LEFT: Main Content */}
                <div className={styles.mainContent}>
                    {/* Hero Image */}
                    <div className={styles.heroImageWrapper}>
                        <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className={styles.heroImage}
                            priority
                        />
                    </div>

                    <h1 className={styles.eventTitle}>{event.title}</h1>

                    <div className={styles.metaRow}>
                        <div className={styles.metaItem}>
                            <Calendar size={18} />
                            <span>{event.date}</span>
                        </div>
                        <div className={styles.metaItem}>
                            <Clock size={18} />
                            <span>{event.time}</span>
                        </div>
                        <div className={styles.metaItem}>
                            <MapPin size={18} />
                            <span>{event.location}</span>
                        </div>
                    </div>

                    <h2 className={styles.sectionTitle}>About the Event</h2>
                    <p className={styles.description}>
                        {event.description}
                        <br /><br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>

                    <h2 className={styles.sectionTitle}>Event Highlights</h2>
                    <div className={styles.highlightGrid}>
                        <div className={styles.highlightCard}>
                            <Globe size={24} className="text-blue-600 mb-2" />
                            <span className={styles.highlightLabel}>Language</span>
                            <span className={styles.highlightValue}>English</span>
                        </div>
                        <div className={styles.highlightCard}>
                            <Clock size={24} className="text-orange-600 mb-2" />
                            <span className={styles.highlightLabel}>Duration</span>
                            <span className={styles.highlightValue}>3 Hours</span>
                        </div>
                        <div className={styles.highlightCard}>
                            <Users size={24} className="text-green-600 mb-2" />
                            <span className={styles.highlightLabel}>Age Limit</span>
                            <span className={styles.highlightValue}>16+ Years</span>
                        </div>
                        <div className={styles.highlightCard}>
                            <ShieldCheck size={24} className="text-purple-600 mb-2" />
                            <span className={styles.highlightLabel}>Safety</span>
                            <span className={styles.highlightValue}>100% Secure</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Sticky Sidebar */}
                <div className={styles.sidebarWrapper}>
                    <div className={styles.stickyCard}>
                        <h3 className={styles.sidebarTitle}>Booking Details</h3>

                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Date</span>
                            <span className={styles.detailValue}>{event.date}</span>
                        </div>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Time</span>
                            <span className={styles.detailValue}>{event.time}</span>
                        </div>

                        <div className={styles.divider} />

                        <div className={styles.priceTag}>{event.price}</div>
                        <div className={styles.priceSub}>Checking availability...</div>

                        <Button size="lg" className={styles.bookButton}>Book Tickets Now</Button>

                        <div className={styles.secureText}>
                            <ShieldCheck size={14} /> Official Booking Partner
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
