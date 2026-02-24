'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { TopAppBanner } from '@/components/ui/TopAppBanner';
import { AppDownloadBanner } from '@/components/ui/AppDownloadBanner';
import { AnnouncementBar } from '@/components/ui/AnnouncementBar';
import { Dumbbell, Activity, Heart, UserCheck, Laptop, Utensils } from 'lucide-react';
import styles from './services.module.css';

const SERVICES = [
    {
        id: 'fitness',
        title: 'Fitness',
        icon: Dumbbell,
        backgroundImage: '/images/fitness-bg-bright.png',
        description: 'Comprehensive fitness programs tailored to your goals. Access state-of-the-art equipment and personalized coaching.',
        features: ['Personal Training', 'Group Classes', 'Strength & Conditioning', 'Cardio Zones']
    },
    {
        id: 'physio',
        title: 'Physio',
        icon: Activity,
        backgroundImage: '/images/physio-bg.png',
        description: 'Expert physiotherapy to help you recover faster and perform better. Our specialists focus on injury prevention and rehabilitation.',
        features: ['Injury Rehabilitation', 'Sports Massage', 'Mobility Work', 'Pain Management']
    },
    {
        id: 'sports',
        title: 'Sports',
        icon: Heart,
        backgroundImage: '/images/sports-bg.png',
        description: 'Professional coaching for competitive sports. We train athletes to excel in their discipline with sport-specific drills.',
        features: ['Skill Development', 'Tactical Training', 'Team Coaching', 'Athletic Performance']
    },
    {
        id: 'yoga',
        title: 'Yoga',
        icon: UserCheck,
        backgroundImage: '/images/yoga-bg.png',
        description: 'Find balance and strength through our expert-led yoga sessions. Suitable for all levels, from beginners to advanced practitioners.',
        features: ['Hatha & Vinyasa', 'Meditation', 'Flexibility Training', 'Stress Relief']
    },
    {
        id: 'online',
        title: 'Online',
        icon: Laptop,
        backgroundImage: '/images/online-bg.png',
        description: 'Get world-class coaching from anywhere. Our online programs provide the guidance and accountability you need remotely.',
        features: ['Virtual Sessions', 'App-Based Tracking', 'Video Analysis', '24/7 Support']
    },
    {
        id: 'nutrition',
        title: 'Nutrition',
        icon: Utensils,
        backgroundImage: '/images/nutrition-bg.png',
        description: 'Fuel your body right. Our certified nutritionists create customized meal plans to support your training and lifestyle.',
        features: ['Custom Meal Plans', 'Dietary Analysis', 'Supplement Guidance', 'Weight Management']
    }
];

// ...

import { useModal } from '@/context/ModalContext'; // Import context
import { Check } from 'lucide-react'; // Import Check icon
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export default function ServicesPage() {
    const { openModal } = useModal(); // Use context

    return (
        <main className={styles.main}>
            <TopAppBanner />
            <Navbar />

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>World-Class Services</h1>
                    <p className={styles.heroSubtitle}>
                        Elevate your performance with our comprehensive range of fitness and wellness solutions designed for champions.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className={styles.gridSection}>
                <div className={styles.servicesGrid}>
                    {SERVICES.map((service, index) => (
                        <div key={index} className={styles.richCardWrapper}>
                            <div className={styles.richCard}>
                                {/* Image Header */}
                                <div className={styles.imageHeader}>
                                    <Image
                                        src={service.backgroundImage}
                                        alt={service.title}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>

                                {/* Card Body */}
                                <div className={styles.cardBody}>
                                    <h3 className={styles.cardTitle}>
                                        <service.icon size={24} className={styles.cardIcon} />
                                        {service.title}
                                    </h3>
                                    <p className={styles.cardDescription}>{service.description}</p>

                                    <ul className={styles.featuresList}>
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className={styles.featureItem}>
                                                <Check size={16} className={styles.checkIcon} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <Button
                                        fullWidth
                                        className={styles.bookBtn}
                                        onClick={openModal}
                                    >
                                        Book Now
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer Banner */}
            <AppDownloadBanner />
        </main>
    );
}
