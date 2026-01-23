'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import clsx from 'clsx';
import styles from './ServiceCard.module.css';

interface ServiceCardProps {
    title: string;
    icon: LucideIcon;
    backgroundImage?: string;
    onClick?: () => void;
    className?: string;
}

import Image from 'next/image';

// ...

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, icon: Icon, backgroundImage, onClick, className }) => {
    return (
        <motion.div
            className={clsx(styles.card, className)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={onClick}
        >
            {backgroundImage && (
                <Image
                    src={backgroundImage}
                    alt={title}
                    fill
                    sizes="250px"
                    className={styles.backgroundImage}
                />
            )}
            <div className={styles.overlay} />
            <div className={styles.iconWrapper}>
                <Icon size={24} strokeWidth={1.5} className={styles.icon} />
            </div>
            <span className={styles.title}>{title}</span>

            {/* Pulse effect overlay */}
            <div className={styles.borderPulse} />
        </motion.div>
    );
};
