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

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        },
        hover: { scale: 1.05 }
    };

    const overlayVariants = {
        rest: { opacity: 0.6 },
        hover: { opacity: 0.3 }
    };

    const iconVariants = {
        rest: { scale: 1, rotate: 0 },
        hover: {
            scale: 1.2,
            rotate: 5,
            transition: { type: "spring", stiffness: 300 }
        }
    };

    const titleVariants = {
        rest: { y: 0 },
        hover: { y: -4, transition: { duration: 0.2 } }
    };

    const shineVariants = {
        rest: { left: '-100%' },
        hover: {
            left: '200%',
            transition: { duration: 1.2, ease: "easeInOut" }
        }
    };

    return (
        <motion.div
            className={clsx(styles.card, className)}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            onClick={onClick}
        >
            {backgroundImage && (
                <Image
                    src={backgroundImage}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={styles.backgroundImage}
                />
            )}

            <motion.div
                className={styles.overlay}
                variants={overlayVariants}
                initial="rest"
            />

            {/* Shine Effect */}
            <motion.div
                className={styles.shineOverlay}
                variants={shineVariants}
                initial="rest"
            />

            <motion.div className={styles.iconWrapper} variants={iconVariants}>
                <Icon size={28} strokeWidth={1.5} className={styles.icon} />
            </motion.div>

            <motion.span className={styles.title} variants={titleVariants}>
                {title}
            </motion.span>

            {/* Pulse effect overlay */}
            <div className={styles.borderPulse} />
        </motion.div>
    );
};
