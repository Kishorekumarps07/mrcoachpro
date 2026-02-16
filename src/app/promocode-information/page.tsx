import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
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
                    <p className={styles.paragraph}>
                        Promo codes on MrCoachPro help you unlock special discounts on coin purchases. Follow the instructions below to use them correctly and avoid common issues.
                    </p>

                    <h2 className={styles.sectionTitle}>What is a Promo Code?</h2>
                    <p className={styles.paragraph}>
                        A promo code is a limited-time alphanumeric code provided by MrCoachPro that allows you to receive discounts, bonus coins, or special offers during checkout.
                    </p>

                    <h2 className={styles.sectionTitle}>How to Apply a Promo Code</h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>Go to the Pricing or Coins Purchase section.</li>
                        <li className={styles.listItem}>Select your preferred coin package.</li>
                        <li className={styles.listItem}>Enter your promo code in the “Promo Code” field.</li>
                        <li className={styles.listItem}>Tap Apply.</li>
                        <li className={styles.listItem}>The discount will reflect instantly in the Promo Apply section before payment.</li>
                    </ul>

                    <h2 className={styles.sectionTitle}>Promo Code Rules & Conditions</h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>Promo codes are case-sensitive.</li>
                        <li className={styles.listItem}>Each promo code can be used only once per user, unless stated otherwise.</li>
                        <li className={styles.listItem}>Promo codes may have an expiry date.</li>
                        <li className={styles.listItem}>Discounts apply only to eligible coin plans.</li>
                        <li className={styles.listItem}>Promo codes cannot be combined with other offers.</li>
                        <li className={styles.listItem}>Taxes (GST) are calculated after the discount is applied.</li>
                    </ul>

                    <h2 className={styles.sectionTitle}>Why My Promo Code Is Not Working?</h2>
                    <p className={styles.paragraph}>Your promo code may not work due to one of the following reasons:</p>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>The code has expired.</li>
                        <li className={styles.listItem}>The code has already been used.</li>
                        <li className={styles.listItem}>The selected coin plan is not eligible.</li>
                        <li className={styles.listItem}>The code was entered incorrectly (check spelling and case).</li>
                    </ul>

                    <h2 className={styles.sectionTitle}>Important Notes</h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>Promo discounts are shown under “Promo Apply” before checkout.</li>
                        <li className={styles.listItem}>Once payment is completed, promo codes cannot be applied or reversed.</li>
                        <li className={styles.listItem}>MrCoachPro reserves the right to modify or cancel promo codes at any time without prior notice.</li>
                    </ul>

                    <h2 className={styles.sectionTitle}>Need Help?</h2>
                    <p className={styles.paragraph}>
                        If your promo code is valid but not applying, please contact our support team with:
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>Your registered email ID</li>
                        <li className={styles.listItem}>The promo code used</li>
                        <li className={styles.listItem}>Screenshot of the issue (if possible)</li>
                    </ul>
                    <p className={styles.paragraph}>
                        We are happy to help.
                    </p>
                </div>
            </div>
        </main>
    );
}
