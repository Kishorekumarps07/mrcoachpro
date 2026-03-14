'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ArrowRight, MapPin } from 'lucide-react';
import { useModal } from '@/context/ModalContext';
import { Navbar } from '@/components/layout/Navbar';
import { TopAppBanner } from '@/components/ui/TopAppBanner';
import { CoachCard, Coach } from '@/components/ui/CoachCard';
import { COACHES } from '@/data/coaches';
import styles from './coaches.module.css';
import cardStyles from '@/components/ui/TrustedCoaches.module.css'; // Reuse modal styles for now

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
          <div className={styles.eyebrow}>Professional Team</div>
          <h1 className={styles.title}>
            Our <span className={styles.titleHighlight}>Expert</span> Coaches
          </h1>
          <p className={styles.subtitle}>
            Connect with the best fitness professionals dedicated to your growth and performance.
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

      {/* ── COACH PROFILE MODAL (REUSED LOGIC) ── */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedCoach && (
            <motion.div
              className={cardStyles.modalBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedCoach(null)}
            >
              <div className={cardStyles.modalBackdropBlur} />
              <motion.div
                className={cardStyles.modalContainer}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300, delay: 0.1 }}
              >
                <button className={cardStyles.modalCloseBtn} onClick={() => setSelectedCoach(null)}>
                  <X size={20} />
                </button>

                <div className={cardStyles.modalPhotoArea}>
                  {selectedCoach.image ? (
                    <img src={selectedCoach.image} alt={selectedCoach.name} className={cardStyles.modalPhoto} />
                  ) : (
                    <div className={cardStyles.modalPhotoPlaceholder}>{selectedCoach.emoji}</div>
                  )}
                </div>

                <div className={cardStyles.modalContent}>
                  <div className={cardStyles.modalHeader}>
                    <div className={cardStyles.modalRolePill}>{selectedCoach.role}</div>
                    <div className={cardStyles.modalInfoGroup}>
                      <div className={cardStyles.modalExpBadge}>
                        <Calendar size={14} /> {selectedCoach.experience}
                      </div>
                      <div className={cardStyles.modalLocationBadge}>
                        <MapPin size={14} /> {selectedCoach.location}
                      </div>
                    </div>
                  </div>

                  <h2 className={cardStyles.modalName}>{selectedCoach.name}</h2>

                  <div className={cardStyles.modalSpecialties}>
                    {selectedCoach.specialties.map((s) => (
                      <span key={s} className={cardStyles.modalSpecialtyTag}>{s}</span>
                    ))}
                  </div>

                  <div className={cardStyles.modalBioScroller}>
                    <p className={cardStyles.modalBioText}>{selectedCoach.bio}</p>
                  </div>

                  <div className={cardStyles.modalFooter}>
                    <button 
                      className={cardStyles.bookSessionBtn}
                      onClick={() => {
                        setSelectedCoach(null);
                        openModal();
                      }}
                    >
                      Book 1-on-1 Session <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </main>
  );
}
