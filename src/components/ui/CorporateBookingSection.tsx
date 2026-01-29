'use client';

import React from 'react';
import { Building2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import styles from './CorporateBookingSection.module.css';

export const CorporateBookingSection = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.iconWrapper}>
                        <div className={styles.iconCircle}>
                            <Building2 size={32} className={styles.icon} />
                        </div>
                    </div>

                    <h2 className={styles.title}>Corporate & Bulk Booking</h2>

                    <p className={styles.description}>
                        Planning to bring your team? Get exclusive discounts and custom<br />
                        packages for groups of 10 or more.
                    </p>

                    <Button
                        variant="secondary"
                        onClick={() => window.location.href = 'mailto:corporate@mrcoach.in?subject=Bulk Booking Inquiry'}
                        className={styles.button}
                        fullWidth
                    >
                        Get Corporate Quote
                    </Button>
                </div>
            </div>
        </section>
    );
};
