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
                    <h1 className={styles.title}>Franchise Model</h1>
                </div>

                <div className={styles.content}>
                    <p className={styles.paragraph}><br />
                        Q: How does the MrCoach franchise model work?<br />
                        A: Coaches, this is YOUR moment on Mr.Coachpro! Through active referrals and platform
                        engagement, you'l climb exclusive levels to unlock MrCoach Fitness Company's franchise
                        opportunity. We're here to help you build and scale a thriving MrCoach-backed fitness
                        business. <br />
                        <br />
                        Q: When wil franchise details unlock?<br />
                        A: Get ready - franchise details appear directly in your Coach profile on Mr.Coachpro as you
                        level up! Complete milestone tasks and hit performance targets to unlock new perks at every
                        stage, building toward our complete franchise support package. <br /><br />
                        Q: What kind of franchise support does MrCoach provide?<br />
                        A: Elite Coaches receive MrCoach Fitness Company's comprehensive success package:
                        powerful brand leverage, expert operations blueprint, proven marketing firepower, and
                        seamless platform integration. We're with you every step to dominate your fitness market! <br /><br />
                        Q: Is franchise guaranteed when I reach the top level?<br />
                        A: Top-level Coaches on Mr.Coachpro become prime franchise candidates! We personaly
                        review your achievements and fast-track your custom franchise agreement. Your hard work +
                        our support = unstoppable success!
                    </p>
                </div>
            </div>
        </main>
    );
}
