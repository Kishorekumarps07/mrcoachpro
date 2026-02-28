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
                    <div className={styles.buttonGroup}>
                        <a href="https://api.whatsapp.com/send/?phone=%2B917448421134&text=I+would+like+to+apply+for+a+position+at+MR.COACH!&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className={styles.whatsappButton}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487 2.105.908 2.528.727 2.999.678.471-.049 1.503-.614 1.716-1.208.213-.594.213-1.103.149-1.208z" />
                            </svg> Apply via WhatsApp
                        </a>
                        <a href="mailto:mrcoachofficial@gmail.com?subject=Job Application - Join MR.COACH" className={styles.emailButton}>
                            <Mail size={20} /> Apply via Email
                        </a>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
