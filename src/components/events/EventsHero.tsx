'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { EVENTS } from '@/data/events';
import styles from './EventsHero.module.css';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const EventsHero = () => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const featuredEvent = EVENTS[currentIndex];

    const handleNext = React.useCallback(() => {
        setCurrentIndex((prev) => (prev === EVENTS.length - 1 ? 0 : prev + 1));
    }, []);

    const handlePrevious = React.useCallback(() => {
        setCurrentIndex((prev) => (prev === 0 ? EVENTS.length - 1 : prev - 1));
    }, []);

    React.useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 4000);

        return () => clearInterval(timer);
    }, [handleNext]);

    // Countdown Logic
    const [timeLeft, setTimeLeft] = React.useState({ days: 2, hours: 14, mins: 45, secs: 10 });

    React.useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { days, hours, mins, secs } = prev;
                if (secs > 0) secs--;
                else {
                    secs = 59;
                    if (mins > 0) mins--;
                    else {
                        mins = 59;
                        if (hours > 0) hours--;
                        else {
                            hours = 23;
                            if (days > 0) days--;
                        }
                    }
                }
                return { days, hours, mins, secs };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Helper to format with leading zero
    const fmt = (n: number) => n.toString().padStart(2, '0');

    return (
        <section className={styles.heroSection}>
            <div key={featuredEvent.id} className={styles.blurBackground}>
                <Image
                    src={featuredEvent.image}
                    alt="Background"
                    fill
                    className={styles.bgImage}
                    priority
                />
                <div className={styles.bgOverlay} />
            </div>

            <div className={styles.container}>
                <div className={styles.contentGrid}>
                    {/* Left: Info */}
                    <div className={styles.infoColumn}>
                        <div className={styles.dateBadge}>
                            {featuredEvent.date}, {featuredEvent.time}
                        </div>
                        <h1 className={styles.title}>{featuredEvent.title}</h1>
                        <p className={styles.location}>{featuredEvent.location}</p>

                        {/* Countdown Timer */}
                        <div className={styles.countdownWrapper}>
                            <div className={styles.timerBlock}>
                                <span className={styles.timerValue}>{fmt(timeLeft.days)}</span>
                                <span className={styles.timerLabel}>Days</span>
                            </div>
                            <div className={styles.timerBlock}>
                                <span className={styles.timerValue}>{fmt(timeLeft.hours)}</span>
                                <span className={styles.timerLabel}>Hrs</span>
                            </div>
                            <div className={styles.timerBlock}>
                                <span className={styles.timerValue}>{fmt(timeLeft.mins)}</span>
                                <span className={styles.timerLabel}>Mins</span>
                            </div>
                            <div className={styles.timerBlock}>
                                <span className={styles.timerValue}>{fmt(timeLeft.secs)}</span>
                                <span className={styles.timerLabel}>Secs</span>
                            </div>
                        </div>

                        <p className={styles.price}>{featuredEvent.price}</p>

                        <div className={styles.actions}>
                            <Link href={`/events/${featuredEvent.id}/register`}>
                                <Button size="lg" className={styles.bookBtn}>Book tickets</Button>
                            </Link>
                        </div>
                    </div>

                    {/* Right: Poster */}
                    <div className={styles.posterColumn}>
                        <div key={featuredEvent.id} className={styles.posterWrapper}>
                            <Image
                                src={featuredEvent.image}
                                alt={featuredEvent.title}
                                width={500}
                                height={600}
                                className={styles.posterImage}
                                priority
                            />
                        </div>

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
