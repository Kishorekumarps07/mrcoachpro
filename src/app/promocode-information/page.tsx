import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import Image from 'next/image';
import styles from './promo.module.css';

export const metadata = {
    title: 'Promo Code Information | MR.COACH',
    description: 'Learn how to use promo codes on MrCoachPro to unlock special discounts.'
};

export default function PromoInfoPage() {
    return (
        <main className={styles.main}>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Promo Code Information</h1>
                </div>

                <div className={styles.content}>
                    <div className={styles.imageSection}>
                        <div className={styles.imageWrapper}>
                            {/* Assuming the image is named promo-instruction.png. 
                                User can replace this with the exact filename */}
                            <Image
                                src="/images/promocode-flow.png"
                                alt="How to apply promo code"
                                width={350}
                                height={700}
                                className={styles.promoImage}
                                priority
                            />
                        </div>
                        <div className={styles.introText}>
                            <p className={styles.paragraph}>
                                Promo codes on MrCoachPro help you unlock special discounts on coin purchases. Follow the instructions below to use them correctly and avoid common issues.
                            </p>

                            <h2 className={styles.sectionTitle}>What is a Promo Code?</h2>
                            <p className={styles.paragraph}>
                                A promo code is a limited-time alphanumeric code provided by MrCoachPro that allows you to receive discounts, bonus coins, or special offers during checkout.
                            </p>
                        </div>
                    </div>

                    <div className={styles.gridSection}>
                        <div className={styles.card}>
                            <h2 className={styles.sectionTitle}>How to Apply</h2>
                            <ul className={styles.list}>
                                <li className={styles.listItem}>Go to the Pricing or Coins Purchase section.</li>
                                <li className={styles.listItem}>Select your preferred coin package.</li>
                                <li className={styles.listItem}>Enter your promo code in the <strong>“Promo Code”</strong> field.</li>
                                <li className={styles.listItem}>Tap <strong>Apply</strong>.</li>
                                <li className={styles.listItem}>The discount will reflect instantly in the Promo Apply section before payment.</li>
                            </ul>
                        </div>

                        <div className={styles.card}>
                            <h2 className={styles.sectionTitle}>Rules & Conditions</h2>
                            <ul className={styles.list}>
                                <li className={styles.listItem}>Promo codes are <strong>case-sensitive</strong>.</li>
                                <li className={styles.listItem}>Each code can be used only once per user.</li>
                                <li className={styles.listItem}>Codes may have an expiry date.</li>
                                <li className={styles.listItem}>Discounts apply only to eligible coin plans.</li>
                                <li className={styles.listItem}>Cannot be combined with other offers.</li>
                                <li className={styles.listItem}>Taxes (GST) are calculated after discount.</li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.infoGrid}>
                        <div className={styles.infoBox}>
                            <h2 className={styles.sectionTitle}>Why My Code Is Not Working?</h2>
                            <ul className={styles.list}>
                                <li className={styles.listItem}>The code has expired or already been used.</li>
                                <li className={styles.listItem}>The selected coin plan is not eligible.</li>
                                <li className={styles.listItem}>Incorrect entry (check spelling and case).</li>
                            </ul>
                        </div>

                        <div className={styles.infoBox}>
                            <h2 className={styles.sectionTitle}>Need Help?</h2>
                            <p className={styles.paragraph}>
                                If your promo code is valid but not applying, please contact our support team with:
                            </p>
                            <ul className={styles.list}>
                                <li className={styles.listItem}>Your registered email ID</li>
                                <li className={styles.listItem}>The promo code used</li>
                                <li className={styles.listItem}>Screenshot of the issue</li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.footerNotes}>
                        <p className={styles.paragraph}>
                            Once payment is completed, promo codes cannot be applied or reversed. MrCoachPro reserves the right to modify or cancel promo codes at any time.
                        </p>
                        <p className={styles.finalNote}>We are happy to help.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
