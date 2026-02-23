import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import {
    Building2,
    HelpCircle,
    Unlock,
    Box,
    Award,
    Briefcase,
    Users,
    MessageCircle,
    Target,
    Zap
} from 'lucide-react';
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
                    <Building2 className={styles.headerIcon} />
                    <h1 className={styles.title}>Franchise Model</h1>
                </div>

                <div className={styles.content}>
                    <p className={styles.mainDescription}>
                        🚀 Are you ready to take your coaching career to the next level? Our franchise model is designed to empower elite coaches to build their own business with MrCoach Fitness Company.
                    </p>

                    <div className={styles.qaGrid}>
                        <div className={styles.qaCard}>
                            <div className={styles.question}>
                                <HelpCircle className={styles.qaIcon} size={20} />
                                <h3>How does the MrCoach franchise model work? 🤔</h3>
                            </div>
                            <div className={styles.answer}>
                                <p>
                                    Coaches, this is <strong>YOUR moment</strong> on Mr.Coachpro! Through active referrals and platform engagement, you&rsquo;ll climb exclusive levels to unlock MrCoach Fitness Company&rsquo;s franchise opportunity. We&rsquo;re here to help you build and scale a thriving MrCoach-backed fitness business. 💼
                                </p>
                            </div>
                        </div>

                        <div className={styles.qaCard}>
                            <div className={styles.question}>
                                <Unlock className={styles.qaIcon} size={20} />
                                <h3>When will franchise details unlock? ⏳</h3>
                            </div>
                            <div className={styles.answer}>
                                <p>
                                    Get ready &mdash; franchise details appear directly in your Coach profile on Mr.Coachpro as you <strong>level up</strong>! Complete milestone tasks and hit performance targets to unlock new perks at every stage, building toward our complete franchise support package. 🔓
                                </p>
                            </div>
                        </div>

                        <div className={styles.qaCard}>
                            <div className={styles.question}>
                                <Box className={styles.qaIcon} size={20} />
                                <h3>What support does MrCoach provide? 🏗️</h3>
                            </div>
                            <div className={styles.answer}>
                                <p>
                                    Elite Coaches receive MrCoach Fitness Company&rsquo;s <strong>comprehensive success package</strong>: powerful brand leverage, expert operations blueprint, proven marketing firepower, and seamless platform integration. We&rsquo;re with you every step to dominate your fitness market! 🔥
                                </p>
                            </div>
                        </div>

                        <div className={styles.qaCard}>
                            <div className={styles.question}>
                                <Award className={styles.qaIcon} size={20} />
                                <h3>Is franchise guaranteed at the top level? 🏆</h3>
                            </div>
                            <div className={styles.answer}>
                                <p>
                                    Top-level Coaches on Mr.Coachpro become <strong>prime franchise candidates</strong>! We personally review your achievements and fast-track your custom franchise agreement. Your hard work + our support = unstoppable success! 🤝
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.callToAction}>
                        <Zap className={styles.ctaIcon} />
                        <h2>Ready to build your empire?</h2>
                        <p>Keep coaching, keep referring, and watch the opportunities unlock! 🚀</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
