'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './TrustMetrics.module.css';

const METRICS = [
    { value: 1000, label: 'Clients' },
    { value: 100, label: 'Trainers' },
    { value: 25, label: 'Locations' }
];

const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

export const TrustMetrics = () => {
    const [counts, setCounts] = useState<number[]>([0, 0, 0]);
    const [hasAnimated, setHasAnimated] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        setHasAnimated(true);
                        animateCounts();
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [hasAnimated]);

    const animateCounts = () => {
        const duration = 1000; // 1 second
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);

            setCounts(METRICS.map((metric) => Math.floor(metric.value * easedProgress)));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    };

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className={styles.container}>
                {METRICS.map((metric, index) => (
                    <div key={metric.label} className={styles.metric}>
                        <div className={styles.number}>
                            {counts[index].toLocaleString()}
                            {hasAnimated && counts[index] === metric.value && '+'}
                        </div>
                        <div className={styles.label}>{metric.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};
