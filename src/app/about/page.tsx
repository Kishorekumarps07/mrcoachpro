'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Target, Timer, Zap, Heart } from 'lucide-react';
import styles from './about.module.css';

const CORE_VALUES = [
    {
        title: 'Discipline',
        desc: 'The bridge between goals and accomplishment.',
        icon: Target
    },
    {
        title: 'Consistency',
        desc: 'Showing up when motivation runs out.',
        icon: Timer
    },
    {
        title: 'Performance',
        desc: 'Measured improvement, not just effort.',
        icon: Zap
    },
    {
        title: 'Longevity',
        desc: 'Training for a lifetime of strength.',
        icon: Heart
    }
];

export default function AboutPage() {
    return (
        <main className={styles.main}>
            <Navbar />

            {/* HERO SECTION */}
            <section className={styles.hero}>
                <div className={styles.heroOverlay} />
                {/* Abstract dark texture background */}
                <div className={styles.heroBackground} />

                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Coaching With Purpose</h1>
                    <div className={styles.divider} />
                    <p className={styles.heroSubtitle}>No shortcuts. No fluff. Just results.</p>
                </div>
            </section>

            {/* BRAND STORY */}
            <section className={styles.storySection}>
                <div className={styles.container}>
                    <div className={styles.storyContent}>
                        <h2 className={styles.sectionHeading}>Built relationships. <span className={styles.highlight}>Forged in sweat.</span></h2>
                        <p className={styles.text}>
                            MR.COACH wasn't founded to be another fitness brand. It was built to challenge the mediocrity of modern training.
                            We believe that true capability comes from a relentless commitment to the basics performed at an elite level.
                        </p>
                        <p className={styles.text}>
                            Whether you are 5 or 55, the principles remain the same. Respect the process. Own your effort.
                            Our mission is to arm you with the physical and mental tools to dominate your potential.
                        </p>
                    </div>
                </div>
            </section>

            {/* CORE VALUES */}
            <section className={styles.valuesSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionHeading}>Core Values</h2>
                    <div className={styles.grid}>
                        {CORE_VALUES.map((val, idx) => (
                            <div key={idx} className={styles.card}>
                                <val.icon size={32} className={styles.icon} />
                                <h3 className={styles.cardTitle}>{val.title}</h3>
                                <p className={styles.cardDesc}>{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
