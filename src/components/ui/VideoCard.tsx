'use client';

import React from 'react';
import { Play } from 'lucide-react';
import styles from './VideoCard.module.css';

interface VideoCardProps {
    title: string;
    thumbnail: string;
    duration?: string;
    category?: string;
}

export const VideoCard: React.FC<VideoCardProps> = ({ title, thumbnail, duration, category }) => {
    return (
        <div className={styles.card}>
            <div className={styles.thumbnailWrapper}>
                <div className={styles.overlay}>
                    <div className={styles.playButton}>
                        <Play fill="currentColor" className={styles.playIcon} size={20} />
                    </div>
                </div>
                {/* In a real app, use next/image */}
                <div className={styles.placeholderImage} style={{ backgroundImage: `url(${thumbnail})` }} />
                {duration && <span className={styles.duration}>{duration}</span>}
            </div>
            <div className={styles.content}>
                {category && <span className={styles.category}>{category}</span>}
                <h4 className={styles.title}>{title}</h4>
            </div>
        </div>
    );
};
