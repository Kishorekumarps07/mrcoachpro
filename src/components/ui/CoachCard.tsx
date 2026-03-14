'use client';

import React, { useState, useEffect } from 'react';
import { BadgeCheck, ArrowRight, MapPin } from 'lucide-react';
import styles from './CoachCard.module.css';

export interface Coach {
  name: string;
  role: string;
  experience: string;
  location: string;
  bio: string;
  specialties: string[];
  image: string;
  emoji: string;
}

interface CoachCardProps {
  coach: Coach;
  index: number;
  onViewProfile: (coach: Coach) => void;
}

export const CoachCard = ({ coach, index, onViewProfile }: CoachCardProps) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch support on mount
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia('(hover: none)').matches);
    };
    checkTouch();
  }, []);

  const handleCardClick = () => {
    onViewProfile(coach);
  };

  return (
    <div
      className={`${styles.card} ${isTouchDevice ? styles['no-hover-device'] : ''}`}
      onClick={handleCardClick}
    >
      {/* ── VERIFIED BADGE (Mobile Hint + Trust) ── */}
      <div className={styles.verifiedBadge}>
        <BadgeCheck size={10} className={styles.verifiedIcon} />
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
        <div className={styles.infoRow}>
          <div className={styles.expBadge}>
            <span className={styles.expDot} />
            {coach.experience}
          </div>
          <div className={styles.locationBadge}>
            <MapPin size={10} />
            {coach.location}
          </div>
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
        <button className={styles.viewProfileBtn}>
          View Profile <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
};
