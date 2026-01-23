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
    { title: 'Fitness', icon: Dumbbell, backgroundImage: '/images/fitness-bg.png', description: 'State-of-the-art equipment and personal training.' },
    { title: 'Physio', icon: Activity, backgroundImage: '/images/physio-bg.png', description: 'Expert physiotherapy for recovery and performance.' },
    { title: 'Sports', icon: Heart, backgroundImage: '/images/sports-bg.png', description: 'Professional coaching for various competitive sports.' },
    { title: 'Yoga', icon: UserCheck, backgroundImage: '/images/yoga-bg.png', description: 'Mindfulness and flexibility training for all levels.' },
    { title: 'Online', icon: Laptop, backgroundImage: '/images/online-bg.png', description: 'Virtual coaching sessions available anywhere.' },
    { title: 'Nutrition', icon: Utensils, backgroundImage: '/images/nutrition-bg.png', description: 'Customized meal plans and nutritional guidance.' }
];

// ...
import { useModal } from '@/context/ModalContext'; // Import context

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
                        <div key={index} className={styles.serviceCardWrapper}>
                            <ServiceCard
                                title={service.title}
                                icon={service.icon}
                                backgroundImage={service.backgroundImage}
                                className="" // Wrapper handles sizing
                                onClick={openModal} // OPEN MODAL ON CLICK
                            />
                        </div>
                    ))}
                </div>
            </section>
// ...


            {/* Footer Banner */}
            <AppDownloadBanner />
        </main>
    );
}
