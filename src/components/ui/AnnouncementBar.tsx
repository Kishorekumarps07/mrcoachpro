'use client';

import React from 'react';
import styles from './AnnouncementBar.module.css';

const ITEMS = [
    "Elite Performance Training • Join Now",
    "Free Assessment Session Available",
    "Wellness & Recovery Center • Open Daily",
    "Certified Coaches • Data-Driven Results",
    "Visit Our Pro Shop • Gear Up"
];

export const AnnouncementBar = () => {
    // Duplicate items enough times to fill width + buffer for loop
    const displayItems = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

    return (
        <div className={styles.bar}>
            <div className={styles.scroller}>
                <div className={styles.scrollTrack}>
                    {displayItems.map((text, idx) => (
                        <div key={idx} className={styles.item}>
                            {text}
                            <span className={styles.separator} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
