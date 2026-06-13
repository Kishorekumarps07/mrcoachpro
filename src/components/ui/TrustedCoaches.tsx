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
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Use existing modal context for booking
  const { openModal } = useModal();

  // Next.js hydration safety for Portals and responsive resize detection
  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const numColumns = isMobile ? Math.ceil(COACHES.length / 3) : Math.ceil(COACHES.length / 2);

  const scrollTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cardIndex = isMobile ? index * 3 : index * 2;
    const card = track.children[cardIndex] as HTMLElement;
    if (!card) return;
    const offset = card.offsetLeft - track.offsetLeft - 32;
    track.scrollTo({ left: offset, behavior: 'smooth' });
    setActiveIndex(index);
  }, [isMobile]);

  const handlePrev = () => scrollTo(Math.max(0, activeIndex - 1));
  const handleNext = () => scrollTo(Math.min(numColumns - 1, activeIndex + 1));

  return (
    <section className={styles.section}>
      {/* ── HEADER ── */}
      <div className={styles.header}>
        <h2 className={styles.title}>
          <span className={styles.titleSerif}>India's Most Trusted Coaching Platform</span>
          <span className={styles.titleMain}>Verified coaches, Real results</span>
        </h2>
      </div>

      {/* ── CAROUSEL ── */}
      <div className={styles.carouselWrapper}>
        <div className={styles.carouselTrack} ref={trackRef}>
          {COACHES.map((coach, i) => (
            <CoachCard key={coach.name} coach={coach} index={i} onViewProfile={setSelectedCoach} />
          ))}
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          <button className={styles.navBtn} onClick={handlePrev} aria-label="Previous page">
            <ChevronLeft size={18} />
          </button>

          <div className={styles.dots}>
            {Array.from({ length: numColumns }).map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
                onClick={() => scrollTo(i)}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>

          <button className={styles.navBtn} onClick={handleNext} aria-label="Next page">
            <ChevronRight size={18} />
          </button>
        </div>
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
