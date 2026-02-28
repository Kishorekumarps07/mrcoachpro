'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Briefcase, Users, Star, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './join.module.css';

const PERKS = [
    {
        title: 'Elite Environment',
        desc: 'Work alongside top-tier athletes and industry-leading fitness professionals.',
        icon: <Star size={32} />
    },
    {
        title: 'Career Growth',
        desc: 'Continuous learning, certifications, and upward mobility within our expanding network.',
        icon: <Briefcase size={32} />
    },
    {
        title: 'Impactful Work',
        desc: 'Directly transform lives by delivering disciplined, performance-oriented coaching.',
        icon: <Users size={32} />
    }
];

export default function JoinTeamPage() {
    return (
        <main className={styles.main}>
            <Navbar />

            <section className={styles.hero}>
                <motion.div
                    className={styles.heroContent}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className={styles.title}>Join Our <span className={styles.highlight}>Team</span></h1>
                    <p className={styles.subtitle}>
                        Where Passion Meets Profession. We are always looking for driven, disciplined, and capable individuals to join the MR.COACH family.
                    </p>
                </motion.div>
            </section>

            <section className={styles.contentSection}>
                <motion.div
                    className={styles.grid}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {PERKS.map((perk, idx) => (
                        <div key={idx} className={styles.card}>
                            <div className={styles.iconWrapper}>
                                {perk.icon}
                            </div>
                            <h3 className={styles.cardTitle}>{perk.title}</h3>
                            <p className={styles.cardDesc}>{perk.desc}</p>
                        </div>
                    ))}
                </motion.div>

                <motion.div
                    className={styles.ctaSection}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h2 className={styles.ctaTitle}>Ready to build athletes for life?</h2>
                    <p className={styles.ctaText}>
                        Send your resume and a brief introduction about why you want to join MR.COACH to our recruitment team.
                    </p>
                    <a href="mailto:mrcoachofficial@gmail.com?subject=Job Application - Join MR.COACH" className={styles.emailButton}>
                        <Mail size={20} /> Apply Now <ArrowRight size={18} />
                    </a>
                </motion.div>
            </section>
        </main>
    );
}
