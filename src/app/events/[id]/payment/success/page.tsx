'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { eventService } from '@/services/eventService';
import type { Event } from '@/data/events';
import { Button } from '@/components/ui/Button';
import { CheckCircle, Download, Calendar, Mail } from 'lucide-react';
import styles from './success.module.css';

export default function PaymentSuccessPage() {
    const params = useParams();
    const router = useRouter();
    const [event, setEvent] = useState<Event | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [bookingId, setBookingId] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            if (params.id) {
                const data = await eventService.getEventById(params.id as string);
                setEvent(data);
                setIsLoading(false);
            }
        };
        fetchEvent();

        // Generate booking ID only on client side to avoid hydration mismatch
        setBookingId(`BK${Date.now().toString().slice(-8)}`);
    }, [params.id]);

    if (isLoading) {
        return (
            <main className={styles.main}>
                <Navbar />
                <div className={styles.container} style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
                    <div className="spinner"></div>
                    <p>Loading registration details...</p>
                </div>
            </main>
        );
    }

    if (!event) {
        return (
            <main className={styles.main}>
                <Navbar />
                <div className={styles.container}>
                    <h1>Event Not Found</h1>
                    <Button onClick={() => router.push('/events')}>Back to Events</Button>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <Navbar />

            <div className={styles.container}>
                <div className={styles.successCard}>
                    <div className={styles.iconWrapper}>
                        <CheckCircle size={64} className={styles.successIcon} />
                    </div>

                    <h1 className={styles.title}>Registration Completed!</h1>
                    <p className={styles.subtitle}>
                        Your registration for {event.title} is confirmed
                    </p>

                    <div className={styles.bookingDetails}>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Booking ID:</span>
                            <span className={styles.detailValue}>{bookingId}</span>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Event:</span>
                            <span className={styles.detailValue}>{event.title}</span>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Date & Time:</span>
                            <span className={styles.detailValue}>{event.date} at {event.time}</span>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Location:</span>
                            <span className={styles.detailValue}>{event.location}</span>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <Button
                            size="lg"
                            className={styles.actionButton}
                            onClick={() => window.print()}
                        >
                            <Download size={18} />
                            Download Ticket
                        </Button>
                        <Button
                            size="lg"
                            variant="secondary"
                            className={styles.actionButton}
                            onClick={() => {
                                if (!event) return;

                                // Format dates for ICS (YYYYMMDDTHHMMSSZ)
                                const startDate = event.isoDate ? event.isoDate.replace(/-/g, '') : new Date().toISOString().split('T')[0].replace(/-/g, '');
                                const startTime = "050000"; // Default to 5AM as per event data

                                const icsContent = [
                                    'BEGIN:VCALENDAR',
                                    'VERSION:2.0',
                                    'BEGIN:VEVENT',
                                    `URL:${window.location.href}`,
                                    `DTSTART:${startDate}T${startTime}`,
                                    `DTEND:${startDate}T080000`, // Assume 3 hour duration
                                    `SUMMARY:${event.title}`,
                                    `DESCRIPTION:Registration confirmed. Booking ID: ${bookingId}`,
                                    `LOCATION:${event.location}`,
                                    'END:VEVENT',
                                    'END:VCALENDAR'
                                ].join('\r\n');

                                const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
                                const link = document.createElement('a');
                                link.href = window.URL.createObjectURL(blob);
                                link.setAttribute('download', 'event-ticket.ics');
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            }}
                        >
                            <Calendar size={18} />
                            Add to Calendar
                        </Button>
                    </div>

                    <div className={styles.infoBox}>
                        <Mail size={20} />
                        <p>
                            A confirmation email with your ticket and event details has been sent to your registered email address.
                        </p>
                    </div>

                    <div className={styles.navigation}>
                        <Button variant="secondary" onClick={() => router.push('/events')}>
                            Browse More Events
                        </Button>
                        <Button onClick={() => router.push('/')}>
                            Back to Home
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
