import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import {
    UserPlus,
    Gift,
    Coins,
    ShieldCheck,
    TrendingUp,
    Sparkles,
    CheckCircle2,
    Users,
    Zap,
    AlertTriangle,
    Rocket
} from 'lucide-react';
import styles from './refer.module.css';

export const metadata = {
    title: 'Refer & Rewards Information | MR.COACH',
    description: 'Earn points and rewards by referring friends to MrCoachPro.'
};

export default function ReferInfoPage() {
    return (
        <main className={styles.main}>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.header}>
                    <UserPlus className={styles.headerIcon} />
                    <h1 className={styles.title}>Refer & Rewards Information</h1>
                </div>

                <div className={styles.content}>
                    <p className={styles.paragraph}>
                        🤝 The Mr Coach Pro Refer & Rewards program allows coaches and users to earn reward points by inviting others to join the app. Points are earned for successful referrals and help recognize your contribution to the Mr Coach Pro community.
                    </p>

                    <h2 className={styles.sectionTitle}>
                        <Zap className={styles.sectionIcon} />
                        How Referrals Work ⚡
                    </h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}><Sparkles className={styles.checkIcon} size={18} /> Share your unique referral code from your profile. 📲</li>
                        <li className={styles.listItem}><CheckCircle2 className={styles.checkIcon} size={18} /> A new user installs Mr Coach Pro and signs up using your code. 📥</li>
                        <li className={styles.listItem}><Coins className={styles.checkIcon} size={18} /> Once successful, reward points are credited to your account. 💰</li>
                        <li className={styles.listItem}><TrendingUp className={styles.checkIcon} size={18} /> Your total earned points are visible in Profile → Refer & Rewards. 📊</li>
                    </ul>

                    <h2 className={styles.sectionTitle}>
                        <Gift className={styles.sectionIcon} />
                        Benefits of Referring 🎁
                    </h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>⭐ Earn reward points for every successful referral</li>
                        <li className={styles.listItem}>📈 Points reflect your activity and engagement</li>
                        <li className={styles.listItem}>🌱 Supports your growth as a coach on Mr Coach Pro</li>
                        <li className={styles.listItem}>🌍 Helps expand the sports and fitness community</li>
                    </ul>

                    <h2 className={styles.sectionTitle}>
                        <Coins className={styles.sectionIcon} />
                        Reward Points Details 🪙
                    </h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>✔️ Points are credited only after successful verification</li>
                        <li className={styles.listItem}>👁️ Accumulated points are displayed in your profile</li>
                        <li className={styles.listItem}>🛍️ Points may be redeemed for exclusive app benefits</li>
                        <li className={styles.listItem}>🏆 Points may be used in future challenge programs</li>
                    </ul>

                    <h2 className={styles.sectionTitle}>
                        <ShieldCheck className={styles.sectionIcon} />
                        Important Guidelines ⚠️
                    </h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>🆕 Each referral must be a new user</li>
                        <li className={styles.listItem}>🚫 Self-referrals are strictly not allowed</li>
                        <li className={styles.listItem}>🔒 Points cannot be transferred or exchanged for cash</li>
                        <li className={styles.listItem}>📢 Mr Coach Pro reserves the right to update referral rules</li>
                    </ul>

                    <h2 className={styles.sectionTitle}>
                        <AlertTriangle className={styles.sectionIcon} />
                        Fair Usage Policy 🛡️
                    </h2>
                    <div className={styles.policyBox}>
                        <p className={styles.paragraph}>
                            Any misuse of the referral system, including fake or duplicate accounts, may lead to:
                        </p>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>🛑 Removal of all earned points</li>
                            <li className={styles.listItem}>🚫 Temporary or permanent account restrictions</li>
                        </ul>
                    </div>

                    <h2 className={styles.sectionTitle}>
                        <Rocket className={styles.sectionIcon} />
                        Upcoming Enhancements 🚀
                    </h2>
                    <p className={styles.paragraph}>
                        Future updates of Mr Coach Pro will include:
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>✨ Advanced referral reward systems</li>
                        <li className={styles.listItem}>💎 New point-based benefits</li>
                        <li className={styles.listItem}>🏁 Special referral challenges</li>
                    </ul>
                    <p className={styles.finalMessage}>
                        Details will be announced inside the app. Let&rsquo;s grow together! 🙌
                    </p>
                </div>
            </div>
        </main>
    );
}
