'use client';

import React from 'react';
import { FAQList } from './FAQAccordion';
import styles from './FAQSection.module.css';

const CONSUMER_FAQS = [
    {
        question: "1. What is Mr.Coach App?",
        answer: "Mr.Coach is an on-demand home service wellness & fitness platform that connects you with certified professionals such as:\n\n• Fitness Trainers\n• Gym Coaches\n• Yoga Therapists\n• Physiotherapists\n• Sports Coaches\n• Massage Therapists\n• Acupuncturists\n• Acupressure Experts\n\nYou can book trusted experts directly to your home through the Mr.Coach App."
    },
    {
        question: "2. What services can I get through Mr.Coach?",
        answer: "Through the Mr.Coach Customer App, you can:\n\n• Book Home Personal Training Sessions\n• Online Live Fitness Classes\n• Yoga Therapy Sessions\n• Physiotherapy at Home\n• Sports Coaching\n• Massage Therapy\n• Acupuncture & Acupressure Treatments"
    },
    {
        question: "3. Can I access online classes in the app?",
        answer: "Yes. Mr.Coach provides:\n\n• Live Streaming Sessions\n• Recorded Workout Videos\n• Wellness Programs\n• Rehabilitation Exercises\n• Sports Training Modules"
    },
    {
        question: "4. Does Mr.Coach provide customized plans?",
        answer: "Absolutely. Based on your goals, our certified coaches will provide:\n\n• Personalized Workout Plans\n• Customized Diet Plans\n• Recovery & Rehab Plans\n• Sports Performance Programs"
    },
    {
        question: "5. Can I track my fitness progress?",
        answer: "Yes, you can:\n\n• Track Workouts\n• Monitor Body Progress\n• Follow Diet Plans\n• View Training Reports\n• Stay consistent with Coach Guidance"
    },
    {
        question: "6. Is Mr.Coach available across India?",
        answer: "Yes. Mr.Coach services are expanding across all major cities in India, bringing professional wellness support directly to your home."
    }
];

const PRO_FAQS = [
    {
        question: "1. What is Mr.Coach Pro App?",
        answer: "Mr.Coach Pro is a professional growth platform for coaches and therapists to:\n\n• Get verified leads\n• Connect with clients\n• Conduct online/offline sessions\n• Earn through service bookings\n• Build their own brand"
    },
    {
        question: "2. Who can join Mr.Coach Pro?",
        answer: "Professionals from the following fields can join:\n\n• Gym Trainers\n• Fitness Coaches\n• Yoga Therapists\n• Physiotherapists\n• Sports Coaches\n• Massage Therapists\n• Acupuncturists\n• Acupressure Experts\n• Wellness Trainers"
    },
    {
        question: "3. How do coaches get clients?",
        answer: "Mr.Coach Pro provides:\n\n• Verified Customer Leads\n• Booking Requests\n• Service Inquiries\n• Event Referral Opportunities\n\nCoaches can accept leads and start earning instantly."
    },
    {
        question: "4. Can coaches earn through referrals?",
        answer: "Yes. Coaches can:\n\n• Refer Events\n• Refer Clients\n• Recommend Products\n\nand earn additional incentives through the Mr.Coach referral earning model."
    },
    {
        question: "5. What is the Coach Growth Level System?",
        answer: "Mr.Coach Pro offers a Challenge-Based Growth Model where coaches:\n\n• Complete Tasks\n• Maintain Service Quality\n• Achieve Performance Levels\n• Unlock New Opportunities"
    },
    {
        question: "6. Can a coach become a Franchise Owner?",
        answer: "Yes. Mr.Coach Pro provides a Zero to Franchise Owner Pathway.\n\nBased on:\n• Task Completion\n• Customer Ratings\n• Performance Score\n• Business Growth\n\nEligible coaches can upgrade to become Mr.Coach Fitness Studio Franchise Owners."
    },
    {
        question: "7. Can coaches sell products through the app?",
        answer: "Yes. Coaches can recommend and promote wellness & fitness products through the platform and earn commissions."
    },
    {
        question: "8. Is there an opportunity for career growth?",
        answer: "Mr.Coach Pro supports:\n\n• Personal Branding\n• Lead Generation\n• Training Opportunities\n• Certification Programs\n• Business Expansion\n• Franchise Ownership"
    },
    {
        question: "9. Can coaches conduct online sessions?",
        answer: "Yes. Coaches can:\n\n• Take Online Classes\n• Conduct Workshops\n• Run Paid Programs\n• Host Certifications\n\nthrough the Mr.Coach Pro App."
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
                    {/* Column 1: Mr.Coach App */}
                    <div className={styles.column}>
                        <div className={styles.columnHeader}>
                            <h3 className={styles.columnTitle}>Mr.Coach App</h3>
                            <span className={styles.badge}>For Users</span>
                        </div>
                        <FAQList items={CONSUMER_FAQS} />
                    </div>

                    {/* Column 2: Mr.Coach Pro App */}
                    <div className={styles.column}>
                        <div className={styles.columnHeader}>
                            <h3 className={styles.columnTitle}>Mr.Coach Pro App</h3>
                            <span className={styles.badgePro}>For Coaches</span>
                        </div>
                        <FAQList items={PRO_FAQS} />
                    </div>
                </div>
            </div>
        </section>
    );
};
