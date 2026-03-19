'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin } from 'lucide-react';
import { Coach } from '@/components/ui/CoachCard';
import { useModal } from '@/context/ModalContext';
import styles from './CoachProfileModal.module.css';

interface CoachProfileModalProps {
  coach: Coach | null;
  onClose: () => void;
}

export const CoachProfileModal = ({ coach, onClose }: CoachProfileModalProps) => {
  const [mounted, setMounted] = useState(false);
  const { openModal } = useModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (coach) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none'; // Prevent background touch-drag scrolling
      // Optional: Add padding to prevent layout shift if scrollbar disappears
      document.body.style.paddingRight = 'var(--scrollbar-width, 0px)';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.paddingRight = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.paddingRight = '';
    };
  }, [coach]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {coach && (
        <motion.div
          className={styles.modalBackdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <div className={styles.modalBackdropBlur} />
          <motion.div
            className={styles.modalContainer}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300, delay: 0.1 }}
          >
            <button 
              className={styles.modalCloseBtn} 
              onClick={onClose} 
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className={styles.modalPhotoArea}>
              {coach.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={coach.image} 
                  alt={coach.name} 
                  className={styles.modalPhoto} 
                />
              ) : (
                <div className={styles.modalPhotoPlaceholder}>{coach.emoji}</div>
              )}
            </div>

            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <div className={styles.modalRolePill}>{coach.role}</div>
                <div className={styles.modalInfoGroup}>
                  <div className={styles.modalExpBadge}>
                    <Calendar size={14} /> {coach.experience}
                  </div>
                  <div className={styles.modalLocationBadge}>
                    <MapPin size={14} /> {coach.location}
                  </div>
                </div>
              </div>

              <h3 className={styles.modalName}>{coach.name}</h3>

              <div className={styles.modalSpecialties}>
                {coach.specialties.map((s) => (
                  <span key={s} className={styles.modalSpecialtyTag}>{s}</span>
                ))}
              </div>

              <div className={styles.modalBioScroller}>
                <p className={styles.modalBioText}>{coach.bio}</p>
              </div>

              <div className={styles.modalFooter}>
                <button 
                  className={styles.bookSessionBtn}
                  onClick={() => {
                    onClose();
                    setTimeout(() => openModal(), 150);
                  }}
                >
                  <Calendar size={16} />
                  Book Session with {coach.name.split(' ')[0]}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
