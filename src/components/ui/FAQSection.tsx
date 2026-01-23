'use client';

import React from 'react';
import { FAQList } from './FAQAccordion';
import styles from './FAQSection.module.css';

const CONSUMER_FAQS = [
    {
        question: "How do I book a personal trainer?",
        answer: "Simply browse our 'Trainers' section, filter by your location and goal (e.g., Weight Loss, Strength), and click 'Book Now' on their profile. You can choose a slot that fits your schedule."
    },
    {
        question: "Can I book sports venues for tournaments?",
        answer: "Yes! Use our 'Venues' tab to find courts and grounds near you. You can book hourly slots or reserve entire venues for corporate or private tournaments."
    },
    {
        question: "Is there a free trial for online coaching?",
        answer: "Many of our elite coaches offer a complimentary 3-day trial or a free consultation call. Look for the 'Free Trial Available' tag on coach profiles."
    },
    {
        question: "How does the cancellation policy work?",
        answer: "Cancellations made 24 hours before the scheduled session are fully refundable. Late cancellations may incur a small fee depending on the coach's policy."
    }
];

const PRO_FAQS = [
    {
        question: "How does Mr. Coach Pro help venue owners?",
        answer: "Mr. Coach Pro provides a dashboard to manage bookings, track revenue, and handle memberships efficiently. It also lists your venue on our user app for maximum visibility."
    },
    {
        question: "What are the commission rates?",
        answer: "We offer competitive rates starting at 0% for your own leads and a small commission for leads generated through our platform. Contact our sales team for a tailored plan."
    },
    {
        question: "Can I manage multiple staff members?",
        answer: "Absolutely. The Pro app allows you to create staff accounts with different permissions, assign shifts, and track individual performance."
    },
    {
        question: "Is marketing support included?",
        answer: "Yes, Pro partners get featured placement in search results, social media shoutouts, and access to our marketing assets to grow their business."
    }
];

export const FAQSection = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.mainTitle}>FREQUENTLY ASKED QUESTIONS</h2>
                    <p className={styles.subtitle}>Everything you need to know about our platforms.</p>
                </div>

                <div className={styles.grid}>
                    {/* Column 1: Mr. Coach App */}
                    <div className={styles.column}>
                        <div className={styles.columnHeader}>
                            <h3 className={styles.columnTitle}>Mr. Coach App</h3>
                            <span className={styles.badge}>For Users</span>
                        </div>
                        <FAQList items={CONSUMER_FAQS} />
                    </div>

                    {/* Column 2: Mr. Coach Pro App */}
                    <div className={styles.column}>
                        <div className={styles.columnHeader}>
                            <h3 className={styles.columnTitle}>Mr. Coach Pro App</h3>
                            <span className={styles.badgePro}>For Partners</span>
                        </div>
                        <FAQList items={PRO_FAQS} />
                    </div>
                </div>
            </div>
        </section>
    );
};
