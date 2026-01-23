'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';
import styles from './TopAppBanner.module.css';
import { AnimatePresence, motion } from 'framer-motion';

export const TopAppBanner = () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className={styles.banner}
                >
                    <div className={styles.container}>
                        <div className={styles.content}>
                            <p className={styles.text}>
                                <strong>Get exclusive discounts</strong> by booking on the app!
                            </p>
                            <a
                                href="https://play.google.com/store/apps/details?id=fitness.mrcoach.india"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.link}
                            >
                                <button className={styles.downloadBtn}>
                                    Download the App
                                </button>
                            </a>
                        </div>
                        <button
                            className={styles.closeBtn}
                            onClick={() => setIsVisible(false)}
                            aria-label="Close banner"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
