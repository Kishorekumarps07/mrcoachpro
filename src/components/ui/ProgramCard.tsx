'use client';

import React from 'react';
import { Button } from './Button';
import clsx from 'clsx';
import styles from './ProgramCard.module.css';

interface ProgramCardProps {
    title: string;
    description: string;
    image: string;
    tags?: string[];
    onClick?: () => void;
    variant?: 'vertical' | 'horizontal'; // For potential layout shifts
}

export const ProgramCard: React.FC<ProgramCardProps> = ({
    title,
    description,
    image,
    tags = [],
    onClick
}) => {
    return (
        <div className={styles.card} onClick={onClick}>
            <div className={styles.imageWrapper} style={{ backgroundImage: `url(${image})` }}>
                <div className={styles.gradientOverlay} />
                <div className={styles.content}>
                    <div className={styles.tags}>
                        {tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
                    </div>

                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.description}>{description}</p>

                    <div className={styles.buttonGroup}>
                        <Button variant="secondary" size="sm" className={styles.cta}>Download Brochure</Button>
                        <Button variant="primary" size="sm" className={styles.cta}>Apply Now</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
