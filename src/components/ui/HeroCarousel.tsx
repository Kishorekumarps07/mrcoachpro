'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './HeroCarousel.module.css';
import clsx from 'clsx';

const CAROUSEL_IMAGES = [
    {
        src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop',
        alt: 'Gym & Fitness',
        label: 'Gym & Fitness'
    },
    {
        src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1470&auto=format&fit=crop',
        alt: 'Physio & Rehab',
        label: 'Physiotherapy'
    },
    {
        src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1470&auto=format&fit=crop',
        alt: 'Sports Massage',
        label: 'Sports Massage'
    },
    {
        src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop',
        alt: 'Personal Training',
        label: 'Personal Training'
    },
    {
        src: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1470&auto=format&fit=crop',
        alt: 'Online Programs',
        label: 'Online Fitness'
    },
    {
        src: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1470&auto=format&fit=crop',
        alt: 'Nutrition & Diet',
        label: 'Nutrition'
    }
];

export const HeroCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
        }, 4000); // 4 seconds per slide

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.carouselContainer}>
            {CAROUSEL_IMAGES.map((image, index) => (
                <div
                    key={index}
                    className={`${styles.slide} ${index === activeIndex ? styles.active : ''}`}
                >
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority={index === 0}
                    />
                    <div className={styles.overlay}>
                        <span className={styles.label}>{image.label}</span>
                    </div>
                </div>
            ))}

            {/* Indicators removed as per user request */}
        </div>
    );
};
