'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, X, Calendar, BadgeCheck } from 'lucide-react';
import { useModal } from '@/context/ModalContext';
import styles from './TrustedCoaches.module.css';

// ─────────────────────────────────────────
//  COACH DATA — update with real details
//  Drop photos into: public/images/coaches/
// ─────────────────────────────────────────
export const COACHES = [
  {
    name: 'Govindraju',
    role: 'Personal Fitness Trainer',
    experience: '20 yrs exp.',
    bio: 'Nearly two decades as a freelance personal fitness trainer across Bangalore. Expert in functional, weight & HIIT training — serving Whitefield, Mahadevapura, Thannisandhra & Hennur.',
    specialties: ['Functional Training', 'Weight Training', 'HIIT', 'Cardio Kickboxing'],
    image: '/images/coaches/govindraju.jpeg',
    emoji: '💪',
  },
  {
    name: 'Mohammed Aslam',
    role: 'Strength & Conditioning Coach',
    experience: '6 yrs exp.',
    bio: 'Specialist in muscle building, fat loss, and post-rehab strength training. Trains cricketers, kabaddi & basketball players, and special populations including hypertensive individuals and senior citizens. Based in Pammal, Chennai.',
    specialties: ['Muscle Building', 'Fat Loss', 'Post-Rehab', 'Sports Conditioning'],
    image: '/images/coaches/mohammed-aslam.jpeg',
    emoji: '🏋️',
  },
  {
    name: 'Faraz Khan',
    role: 'Certified Transformation Coach',
    experience: '22 yrs exp.',
    bio: 'Multi-certified coach (ACE, NASM, ISSA, ACSM & more) with 22 years in fitness, bodybuilding & nutrition, plus 2 years in physiotherapy & post-operative rehab. Specialist in prehab/rehab, prenatal/postnatal, geriatric & medical exercise. Based in Aligarh, U.P.',
    specialties: ['Bodybuilding Prep', 'Clinical Nutrition', 'Prehab & Rehab', 'Medical Exercise'],
    image: '/images/coaches/faraz-khan.jpeg',
    emoji: '🏆',
  },
  {
    name: 'K. Kalyan Kumar',
    role: 'Personal Trainer',
    experience: '4 yrs exp.',
    bio: 'Results-driven personal trainer based in Bangalore, specialising in weight loss, muscle gain and body toning. Crafts structured programs tailored to individual goals and fitness levels.',
    specialties: ['Weight Loss', 'Muscle Gain', 'Body Toning', 'Strength Training'],
    image: '/images/coaches/kalyan-kumar.jpeg',
    emoji: '🏅',
  },
];

// ─────────────────────────────────────────
//  COACH CARD
// ─────────────────────────────────────────
const CoachCard = ({ coach, index, onViewProfile }: { coach: typeof COACHES[0]; index: number; onViewProfile: (coach: typeof COACHES[0]) => void }) => {
  const [tapped, setTapped] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch support on mount
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia('(hover: none)').matches);
    };
    checkTouch();
  }, []);

  const handleCardClick = () => {
    // On touch devices, click toggles the panel.
    if (isTouchDevice) {
      setTapped((prev) => !prev);
    }
  };

  const handleViewProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card from closing when clicking the button
    onViewProfile(coach);
  };

  return (
    <motion.div
      className={`${styles.card} ${tapped ? styles.tapped : ''} ${isTouchDevice ? styles['no-hover-device'] : ''}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
      onMouseEnter={() => { if (!isTouchDevice) setTapped(true); }}
      onMouseLeave={() => { if (!isTouchDevice) setTapped(false); }}
      onClick={handleCardClick}
    >
      {/* ── VERIFIED BADGE (Mobile Hint + Trust) ── */}
      <div className={styles.verifiedBadge}>
        <BadgeCheck size={12} className={styles.verifiedIcon} />
        VERIFIED
      </div>

      {/* ── PHOTO / PLACEHOLDER ── */}
      <div className={styles.photoArea}>
        {coach.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coach.image}
            alt={coach.name}
            className={styles.coachPhoto}
          />
        ) : (
          <div className={styles.photoPlaceholder}>{coach.emoji}</div>
        )}
        <div className={styles.photoOverlay} />
      </div>

      {/* ── ALWAYS-VISIBLE INFO ── */}
      <div className={styles.cardInfo}>
        <div className={styles.rolePill}>{coach.role}</div>
        <h3 className={styles.coachName}>{coach.name}</h3>
        <div className={styles.expBadge}>
          <span className={styles.expDot} />
          {coach.experience}
        </div>
      </div>

      {/* ── HOVER DETAIL PANEL ── */}
      <div className={styles.detailPanel}>
        <div className={styles.detailName}>{coach.name}</div>
        <div className={styles.detailRole}>{coach.role}</div>
        <p className={styles.detailBio}>{coach.bio}</p>
        <div className={styles.specialties}>
          {coach.specialties.map((s) => (
            <span key={s} className={styles.specialtyTag}>{s}</span>
          ))}
        </div>
        <button className={styles.viewProfileBtn} onClick={handleViewProfileClick}>
          View Profile <ArrowRight size={13} />
        </button>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────
//  MAIN SECTION
// ─────────────────────────────────────────
export const TrustedCoaches = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCoach, setSelectedCoach] = useState<typeof COACHES[0] | null>(null);
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
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.eyebrow}>Expert Team</div>
        <h2 className={styles.title}>
          Meet Our <span className={styles.titleHighlight}>Trusted</span> Coaches
        </h2>
        <p className={styles.subtitle}>
          Hand-picked professionals with proven records — hover or tap a card to learn more.
        </p>
      </motion.div>

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
      <motion.div
        className={styles.ctaRow}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <a href="/about" className={styles.ctaBtn}>
          View All Coaches <ArrowRight size={15} />
        </a>
      </motion.div>

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
                    <span className={styles.modalRolePill}>{selectedCoach.role}</span>
                    <div className={styles.modalExpBadge}>
                      <span className={styles.expDot} />
                      {selectedCoach.experience}
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
