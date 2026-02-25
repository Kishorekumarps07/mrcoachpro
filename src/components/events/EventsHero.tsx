'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Event } from '@/data/events'; // Type only
import styles from './EventsHero.module.css';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface EventsHeroProps {
    events: Event[];
}

export const EventsHero = ({ events }: EventsHeroProps) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    // Reset index if out of bounds (e.g. detailed filter change)
    // Needs to be before any potential early return if used in useEffect dependencies? 
    // Actually, useEffect must be called unconditionally.
    React.useEffect(() => {
        if (events && currentIndex >= events.length) setCurrentIndex(0);
    }, [events, currentIndex]);

    const featuredEvent = (events && events.length > 0) ? events[currentIndex] : null;

    const handleNext = React.useCallback(() => {
        if (!events || events.length === 0) return;
        setCurrentIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
    }, [events?.length]);

    const handlePrevious = React.useCallback(() => {
        if (!events || events.length === 0) return;
        setCurrentIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1));
    }, [events?.length]);

    React.useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 4000);

        return () => clearInterval(timer);
    }, [handleNext]);

    // Countdown Logic
    const [timeLeft, setTimeLeft] = React.useState({ days: 0, hours: 0, mins: 0, secs: 0 });

    React.useEffect(() => {
        if (!featuredEvent) return;

        const calculateTimeLeft = () => {
            // Construct target date from isoDate and time
            // isoDate: "YYYY-MM-DD", time: "5:00 AM"
            let targetDate = new Date();
            if (featuredEvent.isoDate) {
                targetDate = new Date(featuredEvent.isoDate);
                // Reset time to 00:00 if time parsing is complex, or try to parsing time
                // For simplicity/robustness, let's assume isoDate is the primary day. 
                // If we want to be precise with time:
                if (featuredEvent.time) {
                    const timeParts = featuredEvent.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
                    if (timeParts) {
                        let hours = parseInt(timeParts[1]);
                        const minutes = parseInt(timeParts[2]);
                        const ampm = timeParts[3].toUpperCase();
                        if (ampm === 'PM' && hours < 12) hours += 12;
                        if (ampm === 'AM' && hours === 12) hours = 0;
                        targetDate.setHours(hours, minutes, 0, 0);
                    }
                }
            } else {
                // Fallback if no isoDate (shouldn't happen with new logic, but safety)
                return { days: 0, hours: 0, mins: 0, secs: 0 };
            }

            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    mins: Math.floor((difference / 1000 / 60) % 60),
                    secs: Math.floor((difference / 1000) % 60)
                };
            }
            return { days: 0, hours: 0, mins: 0, secs: 0 };
        };

        // Initial calculation
        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [featuredEvent]);

    // Helper to format with leading zero
    const fmt = (n: number) => n.toString().padStart(2, '0');

    // Guard clause: if no events, return nothing or placeholder
    // Placed AFTER all hooks have been called
    if (!events || events.length === 0) return null;

    // Safety check for current index
    if (!featuredEvent) return null;

    return (
        <section className={styles.heroSection}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={featuredEvent.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className={styles.blurBackground}
                >
                    <Image
                        src={featuredEvent.image}
                        alt="Background"
                        fill
                        className={styles.bgImage}
                        priority
                    />
                    <div className={styles.bgOverlay} />
                </motion.div>
            </AnimatePresence>

            <div className={styles.container}>
                <div className={styles.contentGrid}>
                    {/* Left: Info */}
                    <div className={styles.infoColumn}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={featuredEvent.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                <div className={styles.dateBadge}>
                                    {featuredEvent.date}, {featuredEvent.time}
                                </div>
                                <h1 className={styles.title}>{featuredEvent.title}</h1>
                                <p className={styles.location}>
                                    <MapPin size={18} className={styles.locationIcon} />
                                    {featuredEvent.location}
                                </p>

                                {/* Countdown Timer */}
                                <div className={styles.countdownWrapper}>
                                    <div className={styles.timerBlock}>
                                        <span className={styles.timerValue}>{fmt(timeLeft.days)}</span>
                                        <span className={styles.timerLabel}>Days</span>
                                    </div>
                                    <span className={styles.timerSeparator}>:</span>
                                    <div className={styles.timerBlock}>
                                        <span className={styles.timerValue}>{fmt(timeLeft.hours)}</span>
                                        <span className={styles.timerLabel}>Hrs</span>
                                    </div>
                                    <span className={styles.timerSeparator}>:</span>
                                    <div className={styles.timerBlock}>
                                        <span className={styles.timerValue}>{fmt(timeLeft.mins)}</span>
                                        <span className={styles.timerLabel}>Mins</span>
                                    </div>
                                    <span className={styles.timerSeparator}>:</span>
                                    <div className={styles.timerBlock}>
                                        <span className={styles.timerValue}>{fmt(timeLeft.secs)}</span>
                                        <span className={styles.timerLabel}>Secs</span>
                                    </div>
                                </div>


                                <div className={styles.actions}>
                                    <Link href={`/events/${featuredEvent.id}/register`}>
                                        <Button size="lg" className={styles.bookBtn}>Book tickets</Button>
                                    </Link>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right: Poster */}
                    <div className={styles.posterColumn}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={featuredEvent.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className={styles.posterWrapper}
                            >
                                <Link href={`/events/${featuredEvent.id}/register`} className={styles.posterLink}>
                                    <Image
                                        src={featuredEvent.image}
                                        alt={featuredEvent.title}
                                        width={500}
                                        height={600}
                                        className={styles.posterImage}
                                        priority
                                    />
                                </Link>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Navigation Arrows (Screen Edges) */}
            <div className={styles.navArrows}>
                <button className={styles.arrowBtn} onClick={handlePrevious} aria-label="Previous">
                    <ArrowLeft size={24} />
                </button>
                <button className={styles.arrowBtn} onClick={handleNext} aria-label="Next">
                    <ArrowRight size={24} />
                </button>
            </div>
        </section>
    );
};
