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
          <div className={styles.eyebrow}>THE ELITE COLLECTIVE</div>
          <h1 className={styles.title}>
            Train with the <span className={styles.titleHighlight}>Masters</span>
          </h1>
          <p className={styles.subtitle}>
            Unlock your ultimate potential. Our hand-picked specialists bridge the gap between where you are and where you belong.
          </p>
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
