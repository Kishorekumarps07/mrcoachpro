'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, X, Calendar, MapPin } from 'lucide-react';
import { useModal } from '@/context/ModalContext';
import { CoachCard, Coach } from './CoachCard';
import { COACHES } from '@/data/coaches';
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
  
  // Use existing modal context for booking
  const { openModal } = useModal();

  // Next.js hydration safety for Portals
  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement;
    if (!card) return;
    const offset = card.offsetLeft - track.offsetLeft - 32;
    track.scrollTo({ left: offset, behavior: 'smooth' });
    setActiveIndex(index);
  }, []);

  const handlePrev = () => scrollTo(Math.max(0, activeIndex - 1));
  const handleNext = () => scrollTo(Math.min(COACHES.length - 1, activeIndex + 1));

  return (
    <section className={styles.section}>
      {/* ── HEADER ── */}
      <div className={styles.header}>
        <div className={styles.eyebrow}>Expert Team</div>
        <h2 className={styles.title}>
          Meet Our <span className={styles.titleHighlight}>Trusted</span> Coaches
        </h2>
        <p className={styles.subtitle}>
          Hand-picked professionals with proven records — hover or tap a card to learn more.
        </p>
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
          <button className={styles.navBtn} onClick={handlePrev} aria-label="Previous coach">
            <ChevronLeft size={18} />
          </button>

          <div className={styles.dots}>
            {COACHES.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
                onClick={() => scrollTo(i)}
                aria-label={`Go to coach ${i + 1}`}
              />
            ))}
          </div>

          <button className={styles.navBtn} onClick={handleNext} aria-label="Next coach">
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

      {/* ── COACH PROFILE MODAL (PORTALED) ── */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedCoach && (
            <motion.div
              className={styles.modalBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedCoach(null)}
            >
              <div className={styles.modalBackdropBlur} />
              <motion.div
                className={styles.modalContainer}
                onClick={(e: React.MouseEvent) => e.stopPropagation()} // Prevent closing when clicking inside modal
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300, delay: 0.1 }}
              >
                <button className={styles.modalCloseBtn} onClick={() => setSelectedCoach(null)} aria-label="Close modal">
                  <X size={20} />
                </button>

                <div className={styles.modalPhotoArea}>
                  {selectedCoach.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={selectedCoach.image} alt={selectedCoach.name} className={styles.modalPhoto} />
                  ) : (
                    <div className={styles.modalPhotoPlaceholder}>{selectedCoach.emoji}</div>
                  )}
                </div>

                <div className={styles.modalContent}>
                  <div className={styles.modalHeader}>
                    <div className={styles.modalRolePill}>{selectedCoach.role}</div>
                    <div className={styles.modalInfoGroup}>
                      <div className={styles.modalExpBadge}>
                        <Calendar size={14} /> {selectedCoach.experience}
                      </div>
                      <div className={styles.modalLocationBadge}>
                        <MapPin size={14} /> {selectedCoach.location}
                      </div>
                    </div>
                  </div>

                  <h3 className={styles.modalName}>{selectedCoach.name}</h3>

                  <div className={styles.modalSpecialties}>
                    {selectedCoach.specialties.map((s) => (
                      <span key={s} className={styles.modalSpecialtyTag}>{s}</span>
                    ))}
                  </div>

                  <div className={styles.modalBioScroller}>
                    <p className={styles.modalBioText}>{selectedCoach.bio}</p>
                  </div>

                  <div className={styles.modalFooter}>
                    <button 
                      className={styles.bookSessionBtn}
                      onClick={() => {
                        setSelectedCoach(null);
                        // Add small delay to let coach modal shrink before opening booking modal
                        setTimeout(() => openModal(), 150);
                      }}
                    >
                      <Calendar size={16} />
                      Book Session with {selectedCoach.name.split(' ')[0]}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};
