'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, CheckCircle, Smartphone, ArrowRight, Activity, Utensils, TrendingUp } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { TopAppBanner } from '@/components/ui/TopAppBanner';
import styles from './AppPage.module.css';

export default function AppPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className={styles.main}>
      <TopAppBanner />
      <Navbar />

      <div className={styles.container}>
        {/* LEFT COLUMN: Text + Downloads */}
        <div className={styles.leftColumn}>
          {/* HERO SECTION */}
          <section className={styles.hero}>
            <motion.h1 
              className={styles.headline}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Welcome to Mr.Coach
            </motion.h1>
            <motion.p 
              className={styles.subtext}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              India's most trusted platform for Personal Training.<br />
              Choose your app store to download the Mr.Coach App.
            </motion.p>
          </section>

          {/* DOWNLOAD SECTION */}
          <section className={styles.downloadSection}>
            <h2 className={styles.downloadHeading}>Download the Mr.Coach App</h2>
            <div className={styles.divider} />
            
            <div className={styles.storeButtons}>
              <a 
                href="https://play.google.com/store/apps/details?id=fitness.mrcoach.india" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.storeBtn}
              >
                <div className={styles.storeIcon}>
                  <svg viewBox="30 336.7 447 430.3" width="20" height="20">
                    <path fill="#4DB6AC" d="M48.5 765.3l188.1-188.1-188.1-188.1z"/>
                    <path fill="#FF7043" d="M363.8 577.2L48.5 765.3l188.1-188.1"/>
                    <path fill="#FFEB3B" d="M363.8 577.2l113.2-65.4-113.2-65.3z"/>
                    <path fill="#F44336" d="M48.5 389.1l315.3 188.1-115.3 65.4z"/>
                    <path fill="#4CAF50" d="M48.5 389.1l188.1 188.1L48.5 765.3z"/>
                  </svg>
                </div>
                <div className={styles.storeText}>
                  <span className={styles.storeType}>GET IT ON</span>
                  <span className={styles.storeName}>Google Play</span>
                </div>
              </a>

              <a 
                href="https://apps.apple.com/in/app/mrcoach-pro-for-coaches/id6760490034" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.storeBtn}
              >
                <div className={styles.storeIcon}>
                  <svg viewBox="0 0 384 512" width="20" height="20">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41-84.5-43.2-39.2-2.1-71.1 27.6-88.7 27.6-17.6 0-45.1-24.8-77.3-24.2-40 0-82.3 22-103.5 59-45.9 80-11.7 197.6 32.8 261.2 21.8 31.6 48.1 66.8 82.2 65.5 31.8-1.3 43.1-20.9 82.9-20.9 39.8 0 51.5 20.9 82.2 20.2 36.1-.7 59.8-31 82.1-63.6 24.2-35.4 33.1-69.6 33.3-71.3-.8-.3-63.5-24.3-63.8-95.5zM290.3 80.3c18.1-21.7 30.1-51.5 26.6-80.3-25.2 1-56 16.8-74 38.3-16.1 19.3-30.2 49.3-26.4 77.4 28 2.2 56.6-14 73.8-35.4z"/>
                  </svg>
                </div>
                <div className={styles.storeText}>
                  <span className={styles.storeType}>Download on the</span>
                  <span className={styles.storeName}>App Store</span>
                </div>
              </a>
            </div>

            {/* TRUST BADGES INSIDE LEFT COLUMN */}
            <footer className={styles.trustBadges}>
              <div className={styles.badge}>
                <ShieldCheck size={16} className={styles.badgeIcon} />
                <span>Safe</span>
              </div>
              <div className={styles.badgeSeparator} />
              <div className={styles.badge}>
                <Lock size={16} className={styles.badgeIcon} />
                <span>Secure</span>
              </div>
              <div className={styles.badgeSeparator} />
              <div className={styles.badge}>
                <CheckCircle size={16} className={styles.badgeIcon} />
                <span>Verified</span>
              </div>
            </footer>
          </section>
        </div>

        {/* RIGHT COLUMN: Phone Mockup */}
        <section className={styles.mockupContainer}>
          <motion.div 
            className={styles.iphoneFrame}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          >
            {/* iPhone Notch/Island */}
            <div className={styles.notch} />
            
            {/* Screen Content */}
            <div className={styles.screen}>
              <div className={styles.statusBar}>
                <span>9:41</span>
                <div className={styles.statusIcons}>
                  <div className={styles.signalIcon} />
                  <div className={styles.wifiIcon} />
                  <div className={styles.batteryIcon} />
                </div>
              </div>

              <div className={styles.appPadding}>
                <div className={styles.appHeader}>
                  <ArrowRight className={styles.backArrow} size={16} />
                </div>
                
                <h2 className={styles.greeting}>Hello, Rahul 👋</h2>
                <h3 className={styles.appHeadline}>Ready to achieve your fitness goals?</h3>
                <p className={styles.appSubtext}>Your personal coach is <span className={styles.highlightText}>here</span> to help you!</p>

                <div className={styles.featureGrid}>
                  <div className={styles.featureItem}>
                    <div className={`${styles.featureIcon} ${styles.workoutIcon}`}>
                      <Activity size={18} />
                    </div>
                    <span className={styles.featureTitle}>Workouts</span>
                    <span className={styles.featureDesc}>Plans</span>
                  </div>
                  <div className={styles.featureItem}>
                    <div className={`${styles.featureIcon} ${styles.nutritionIcon}`}>
                      <Utensils size={18} />
                    </div>
                    <span className={styles.featureTitle}>Nutrition</span>
                    <span className={styles.featureDesc}>Meals</span>
                  </div>
                  <div className={styles.featureItem}>
                    <div className={`${styles.featureIcon} ${styles.progressIcon}`}>
                      <TrendingUp size={18} />
                    </div>
                    <span className={styles.featureTitle}>Progress</span>
                    <span className={styles.featureDesc}>Track</span>
                  </div>
                </div>

                <div className={styles.appCta}>
                  <button className={styles.startJourneyBtn}>
                    Start Your Journey <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
