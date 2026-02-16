import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import styles from './application.module.css';

export const metadata = {
    title: 'Application Information | MR.COACH',
    description: 'Information regarding MR.COACH applications and processes.'
};

export default function ApplicationInfoPage() {
    return (
        <main className={styles.main}>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Application Information</h1>
                </div>

                <div className={styles.content}>
                    <p className={styles.paragraph}>
                        Content pending. Please provide the details for the Application Information page.
                    </p>
                </div>
            </div>
        </main>
    );
}
