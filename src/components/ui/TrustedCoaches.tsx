'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useModal } from '@/context/ModalContext';
import { CoachCard, Coach } from './CoachCard';
import { COACHES } from '@/data/coaches';
import { CoachProfileModal } from '@/components/modals/CoachProfileModal';
import styles from './TrustedCoaches.module.css';

// (Moved to standalone files)

// ─────────────────────────────────────────
//  MAIN SECTION
// ─────────────────────────────────────────
export const TrustedCoaches = () => {
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) return null;

  // Partition coaches into rows
  const rows = isMobile
    ? [
        COACHES.filter((_, i) => i % 3 === 0),
        COACHES.filter((_, i) => i % 3 === 1),
        COACHES.filter((_, i) => i % 3 === 2),
      ]
    : [
        COACHES.filter((_, i) => i % 2 === 0),
        COACHES.filter((_, i) => i % 2 === 1),
      ];

  return (
    <section className={styles.section}>
      {/* ── HEADER ── */}
      <div className={styles.header}>
        <h2 className={styles.title}>
          <span className={styles.titleSerif}>India's Most Trusted Coaching Platform</span>
          <span className={styles.titleMain}>Verified coaches, Real results</span>
        </h2>
      </div>

      {/* ── CAROUSEL (INFINITE MARQUEE) ── */}
      <div className={styles.carouselWrapper}>
        {rows.map((rowCoaches, rowIndex) => {
          // Duplicate the coaches list to ensure seamless looping marquee
          const doubledCoaches = [...rowCoaches, ...rowCoaches];
          // Alternate direction: first row LTR, second RTL, third LTR
          const isLTR = rowIndex % 2 === 0;

          return (
            <div key={rowIndex} className={styles.trackViewport}>
              <div 
                className={`${styles.carouselTrack} ${isLTR ? styles.scrollLTR : styles.scrollRTL}`}
              >
                {doubledCoaches.map((coach, i) => (
                  <CoachCard 
                    key={`${coach.name}-${rowIndex}-${i}`} 
                    coach={coach} 
                    index={i} 
                    onViewProfile={setSelectedCoach} 
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── CTA ── */}
      <div className={styles.ctaRow}>
        <a href="/coaches" className={styles.ctaBtn}>
          View All Coaches <ArrowRight size={15} />
        </a>
      </div>

      {/* ── COACH PROFILE MODAL (CENTRALIZED) ── */}
      <CoachProfileModal 
        coach={selectedCoach} 
        onClose={() => setSelectedCoach(null)} 
      />
    </section>
  );
};

