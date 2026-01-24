'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { TrustMetrics } from '@/components/ui/TrustMetrics';
import { Button } from '@/components/ui/Button';
import { Dumbbell, Trophy, Activity, Heart, Users, UserPlus, Medal, Calendar, Check, ArrowRight, Laptop, Utensils, Sun, UserCheck } from 'lucide-react';
import clsx from 'clsx';
import styles from './home.module.css';

const SERVICES = [
  { title: 'Fitness', icon: Dumbbell, backgroundImage: '/images/fitness-bg-bright.png' },
  { title: 'Physio', icon: Activity, backgroundImage: '/images/physio-bg.png' },
  { title: 'Sports', icon: Heart, backgroundImage: '/images/sports-bg.png' },
  { title: 'Yoga', icon: UserCheck, backgroundImage: '/images/yoga-bg.png' },
  { title: 'Online', icon: Laptop, backgroundImage: '/images/online-bg.png' },
  { title: 'Nutrition', icon: Utensils, backgroundImage: '/images/nutrition-bg.png' }
];

const SERVICE_TABS = ['Fitness', 'Performance', 'Recovery'];



import { AnnouncementBar } from '@/components/ui/AnnouncementBar';
import { HeroCarousel } from '@/components/ui/HeroCarousel';
import { TrendingEvents } from '@/components/ui/TrendingEvents';
import { FAQSection } from '@/components/ui/FAQSection';
import { AppDownloadBanner } from '@/components/ui/AppDownloadBanner';
import { TopAppBanner } from '@/components/ui/TopAppBanner';

// ... (existing imports)

// ...
import { useModal } from '@/context/ModalContext'; // Import context

export default function Home() {
  const [activeTab, setActiveTab] = useState(SERVICE_TABS[0]);
  const { openModal } = useModal(); // Use context

  return (
    <main className={styles.main}>
      <TopAppBanner />
      <Navbar />

      {/* HERO SECTION */}
      <section className={styles.hero}>
        <AnnouncementBar />

        <div className={styles.heroContent}>
          {/* LEFT: Floating Card */}
          <div className={styles.floatingCard}>
            <div className={styles.cardHeader}>
              <h1 className={styles.cardTitle}>CHOOSE OUR SERVICES</h1>
            </div>

            <div className={styles.serviceGrid}>
              {SERVICES.map((service, index) => {
                return (
                  <ServiceCard
                    key={index}
                    title={service.title}
                    icon={service.icon}
                    backgroundImage={service.backgroundImage}
                    className={styles.gridItemPrimary}
                    onClick={openModal} // OPEN MODAL ON CLICK
                  />
                );
              })}
            </div>
          </div>

          {/* RIGHT: Hero Carousel */}
          <div className={styles.carouselZone}>
            <HeroCarousel />
          </div>
        </div>
      </section>

      {/* TRUST METRICS */}
      <TrustMetrics />

      {/* TRENDING EVENTS */}
      <TrendingEvents />

      {/* FAQs */}
      <FAQSection />

      {/* App Download Banner */}
      <AppDownloadBanner />
    </main>
  );
}
