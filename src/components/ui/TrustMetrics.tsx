'use client';

import React, { useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import styles from './TrustMetrics.module.css';

const METRICS = [
    { value: 10000, label: 'Clients' },
    { value: 5000, label: 'Coaches' },
    { value: 500, label: 'Cities in India' }
];

const CountingNumber = ({ value }: { value: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const spring = useSpring(0, {
        mass: 1,
        stiffness: 75,
        damping: 15,
        duration: 2
    });

    const displayValue = useTransform(spring, (current) => {
        if (Math.round(current) >= value) return `${value}+`;
        return `${Math.round(current).toLocaleString()}+`;
    });

    React.useEffect(() => {
        if (isInView) {
            spring.set(value);
        }
    }, [isInView, spring, value]);

    return <motion.span ref={ref}>{displayValue}</motion.span>;
};

export const TrustMetrics = () => {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <motion.div
                    className={styles.headlineContainer}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* Intro line */}
                    <p className={styles.introLine}>India's</p>

                    {/* Main title */}
                    <h2 className={styles.mainTitle}>
                        <span className={styles.titleEmphasis}>No.1</span>
                        {' '}
                        <span className={styles.titleText}>Fitness Company</span>
                        <sup className={styles.trademark}>™</sup>
                    </h2>

                    {/* Supporting line */}
                    <p className={styles.supportingLine}>Across India | All Cities Covered</p>
                </motion.div>
            </div>
            <div className={styles.container}>
                {METRICS.map((metric, index) => (
                    <motion.div
                        key={metric.label}
                        className={styles.metric}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{
                            duration: 0.8,
                            delay: index * 0.2,
                            ease: [0.215, 0.610, 0.355, 1.000]
                        }}
                        whileHover={{ y: -5 }}
                    >
                        <div className={styles.number}>
                            <CountingNumber value={metric.value} />
                        </div>
                        <div className={styles.label}>{metric.label}</div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
