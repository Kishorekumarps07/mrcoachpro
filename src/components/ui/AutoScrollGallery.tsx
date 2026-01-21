'use client';

import React from 'react';
import clsx from 'clsx';
import styles from './AutoScrollGallery.module.css';

const PLACEHOLDERS = [
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&q=80",
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80",
    "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=500&q=80",
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&q=80",
    "https://images.unsplash.com/photo-1546519638-68e109498ee2?w=500&q=80",
    "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500&q=80"
];

const COLUMN_1 = [PLACEHOLDERS[0], PLACEHOLDERS[2], PLACEHOLDERS[4], PLACEHOLDERS[0], PLACEHOLDERS[2], PLACEHOLDERS[4]]; // Doubled
const COLUMN_2 = [PLACEHOLDERS[1], PLACEHOLDERS[3], PLACEHOLDERS[5], PLACEHOLDERS[1], PLACEHOLDERS[3], PLACEHOLDERS[5]]; // Doubled

export const AutoScrollGallery = () => {
    return (
        <div className={styles.galleryWrapper} data-testid="gallery-root">
            <div className={styles.galleryContainer}>
                <div className={styles.column}>
                    <div className={clsx(styles.scrollTrack, styles.scrollTrackSlow)}>
                        {COLUMN_1.map((src, idx) => (
                            <ImageItem key={`c1-${idx}`} src={src} />
                        ))}
                    </div>
                </div>
                <div className={styles.column} style={{ marginTop: '-100px' }}>
                    <div className={clsx(styles.scrollTrack, styles.scrollTrackFast)}>
                        {COLUMN_2.map((src, idx) => (
                            <ImageItem key={`c2-${idx}`} src={src} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ImageItem = ({ src }: { src: string }) => (
    <div className={styles.imageWrapper}>
        <img src={src} alt="Training atmosphere" className={styles.image} loading="lazy" />
    </div>
);
