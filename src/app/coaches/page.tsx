'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useModal } from '@/context/ModalContext';
import { Navbar } from '@/components/layout/Navbar';
import { TopAppBanner } from '@/components/ui/TopAppBanner';
import { CoachCard, Coach } from '@/components/ui/CoachCard';
import { COACHES } from '@/data/coaches';
import { CoachProfileModal } from '@/components/modals/CoachProfileModal';
import styles from './coaches.module.css';

export default function CoachesPage() {
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [mounted, setMounted] = useState(false);
  const { openModal } = useModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className={styles.pageContainer}>
      <TopAppBanner />
      <Navbar />
      <div className={styles.maxContent}>
        {/* ── HEADER ── */}
        <header className={styles.header}>
          <div className={styles.eyebrowContainer}>
            <div className={styles.eyebrowLine} />
            <span className={styles.eyebrow}>THE ELITE COLLECTIVE</span>
            <div className={styles.eyebrowLine} />
          </div>
          
          <h1 className={styles.title}>
            <span className={styles.titleSerif}>Train with India's Trusted</span>
            <span className={styles.titleMain}>Health & Wellness Coaches</span>
          </h1>
          
          <div className={styles.subtitleContainer}>
            <p className={styles.subtitleTop}>
              Book certified physiotherapists ,fitness trainers, yoga instructors and wellness experts near you.
            </p>
            <div className={styles.subtitleBottom}>
              <div className={styles.decorationLine} />
              <p className={styles.subtitleText}></p>
              <div className={styles.decorationLine} />
            </div>
          </div>
          <div className={styles.bottomSeparator} />
        </header>

        {/* ── GRID ── */}
        <div className={styles.grid}>
          {COACHES.map((coach, i) => (
            <CoachCard 
              key={coach.name} 
              coach={coach} 
              index={i} 
              onViewProfile={setSelectedCoach} 
            />
          ))}
        </div>

        {/* ── FOOTER CTA ── */}
        <footer className={styles.footer}>
          <p className={styles.footerText}>Ready to start your journey?</p>
          <button onClick={() => openModal()} className={styles.ctaBtn}>
            Book a Demo Now <ArrowRight size={18} />
          </button>
        </footer>
      </div>

      {/* ── COACH PROFILE MODAL (CENTRALIZED) ── */}
      <CoachProfileModal 
        coach={selectedCoach} 
        onClose={() => setSelectedCoach(null)} 
      />
    </main>
  );
}
