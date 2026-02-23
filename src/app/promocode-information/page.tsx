import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import {
    Tag,
    Gift,
    Zap,
    CheckCircle2,
    AlertCircle,
    Info,
    HelpCircle,
    Mail,
    ShieldCheck,
    Clock,
    Check
} from 'lucide-react';
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
                    <Tag className={styles.headerIcon} />
                    <h1 className={styles.title}>Promo Code Information</h1>
                </div>

                <div className={styles.content}>
                    <p className={styles.paragraph}>
                        ✨ Promo codes on MrCoachPro help you unlock special discounts on coin purchases. Follow the instructions below to use them correctly and avoid common issues.
                    </p>

                    <h2 className={styles.sectionTitle}>
                        <Gift className={styles.sectionIcon} />
                        What is a Promo Code? 🎁
                    </h2>
                    <p className={styles.paragraph}>
                        A promo code is a limited-time alphanumeric code provided by MrCoachPro that allows you to receive discounts, bonus coins, or special offers during checkout.
                    </p>

                    <h2 className={styles.sectionTitle}>
                        <Zap className={styles.sectionIcon} />
                        How to Apply a Promo Code ⚡
                    </h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}><Check className={styles.checkIcon} /> Go to the Pricing or Coins Purchase section. 💰</li>
                        <li className={styles.listItem}><Check className={styles.checkIcon} /> Select your preferred coin package. 📦</li>
                        <li className={styles.listItem}><Check className={styles.checkIcon} /> Enter your promo code in the “Promo Code” field. ✍️</li>
                        <li className={styles.listItem}><Check className={styles.checkIcon} /> Tap Apply. ✅</li>
                        <li className={styles.listItem}><Check className={styles.checkIcon} /> The discount will reflect instantly in the Promo Apply section. 🚀</li>
                    </ul>

                    <h2 className={styles.sectionTitle}>
                        <ShieldCheck className={styles.sectionIcon} />
                        Rules & Conditions 📜
                    </h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}><Clock className={styles.checkIcon} /> Promo codes are case-sensitive. 🔠</li>
                        <li className={styles.listItem}><CheckCircle2 className={styles.checkIcon} size={18} /> Each promo code can be used only once per user. 👤</li>
                        <li className={styles.listItem}><Clock className={styles.checkIcon} /> Promo codes may have an expiry date. 📅</li>
                        <li className={styles.listItem}><CheckCircle2 className={styles.checkIcon} size={18} /> Discounts apply only to eligible coin plans. 📋</li>
                        <li className={styles.listItem}><AlertCircle className={styles.checkIcon} size={18} /> Cannot be combined with other offers. 🚫</li>
                    </ul>

                    <h2 className={styles.sectionTitle}>
                        <AlertCircle className={styles.sectionIcon} />
                        Why My Promo Code Is Not Working? 🧐
                    </h2>
                    <p className={styles.paragraph}>Your promo code may not work due to one of the following reasons:</p>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>❌ The code has expired.</li>
                        <li className={styles.listItem}>🔒 The code has already been used.</li>
                        <li className={styles.listItem}>🚫 The selected coin plan is not eligible.</li>
                        <li className={styles.listItem}>✏️ Incorrect spelling or case.</li>
                    </ul>

                    <h2 className={styles.sectionTitle}>
                        <Info className={styles.sectionIcon} />
                        Important Notes 📝
                    </h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>💡 Promo discounts are shown under “Promo Apply” before checkout.</li>
                        <li className={styles.listItem}>⚠️ Promo codes cannot be applied or reversed after payment.</li>
                        <li className={styles.listItem}>📢 MrCoachPro reserves the right to modify codes at any time.</li>
                    </ul>

                    <h2 className={styles.sectionTitle}>
                        <HelpCircle className={styles.sectionIcon} />
                        Need Help? 🤝
                    </h2>
                    <p className={styles.paragraph}>
                        If your promo code is valid but not applying, please contact our support team with:
                    </p>
                    <div className={styles.supportBox}>
                        <ul className={styles.list}>
                            <li className={styles.listItem}><Mail className={styles.checkIcon} size={18} /> Your registered email ID</li>
                            <li className={styles.listItem}><Tag className={styles.checkIcon} size={18} /> The promo code used</li>
                            <li className={styles.listItem}><AlertCircle className={styles.checkIcon} size={18} /> Screenshot of the issue</li>
                        </ul>
                    </div>
                    <p className={styles.finalMessage}>
                        We are happy to help! 😊
                    </p>
                </div>
            </div>
        </main>
    );
}
