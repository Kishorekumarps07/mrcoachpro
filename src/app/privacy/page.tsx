import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import styles from './privacy.module.css';

export const metadata = {
    title: 'Privacy Policy | MR.COACH',
    description: 'Privacy Policy for MR.COACH - Learn how we collect, use, and protect your personal data'
};

export default function PrivacyPage() {
    return (
        <main className={styles.main}>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Privacy Policy</h1>
                    <p className={styles.date}>Last updated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>

                <div className={styles.content}>
                    <p className={styles.paragraph}>
                        At <strong>MR.COACH</strong>, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our fitness application and website.
                    </p>

                    <h2 className={styles.sectionTitle}>1. Information We Collect</h2>
                    <p className={styles.paragraph}>
                        We collect information that you provide directly to us, including:
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.listItem}><strong>Personal Information:</strong> Name, email address, phone number, and profile details</li>
                        <li className={styles.listItem}><strong>Fitness Data:</strong> Workout history, fitness goals, health metrics, and progress tracking</li>
                        <li className={styles.listItem}><strong>Payment Information:</strong> Billing details for subscription and event registration (processed securely through Razorpay)</li>
                        <li className={styles.listItem}><strong>Usage Data:</strong> App interaction, features used, and session duration</li>
                        <li className={styles.listItem}><strong>Device Information:</strong> Device type, operating system, and unique identifiers</li>
                    </ul>

                    <h2 className={styles.sectionTitle}>2. How We Use Your Information</h2>
                    <p className={styles.paragraph}>
                        We use the collected information to:
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>Provide and personalize our fitness coaching services</li>
                        <li className={styles.listItem}>Process event registrations and payments</li>
                        <li className={styles.listItem}>Send you important updates, notifications, and promotional offers</li>
                        <li className={styles.listItem}>Improve our app features and user experience</li>
                        <li className={styles.listItem}>Analyze usage patterns to enhance service quality</li>
                        <li className={styles.listItem}>Ensure platform security and prevent fraud</li>
                        <li className={styles.listItem}>Comply with legal obligations</li>
                    </ul>

                    <h2 className={styles.sectionTitle}>3. Data Sharing and Disclosure</h2>
                    <p className={styles.paragraph}>
                        We do not sell your personal information. We may share your data with:
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.listItem}><strong>Service Providers:</strong> Third-party vendors who assist in app operations (e.g., payment processing, hosting)</li>
                        <li className={styles.listItem}><strong>Event Organizers:</strong> When you register for events, necessary details are shared with organizers</li>
                        <li className={styles.listItem}><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                    </ul>

                    <h2 className={styles.sectionTitle}>4. Data Security</h2>
                    <p className={styles.paragraph}>
                        We implement industry-standard security measures to protect your data, including encryption, secure servers, and regular security audits. However, no internet transmission is 100% secure, and we cannot guarantee absolute security.
                    </p>

                    <h2 className={styles.sectionTitle}>5. Your Rights</h2>
                    <p className={styles.paragraph}>
                        You have the right to:
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>Access and download your personal data</li>
                        <li className={styles.listItem}>Correct inaccurate or incomplete information</li>
                        <li className={styles.listItem}>Request deletion of your account and data</li>
                        <li className={styles.listItem}>Opt-out of marketing communications</li>
                        <li className={styles.listItem}>Withdraw consent for data processing (where applicable)</li>
                    </ul>

                    <h2 className={styles.sectionTitle}>6. Cookies and Tracking</h2>
                    <p className={styles.paragraph}>
                        We use cookies and similar technologies to enhance your experience, analyze usage, and deliver personalized content. You can manage cookie preferences through your browser settings.
                    </p>

                    <h2 className={styles.sectionTitle}>7. Children's Privacy</h2>
                    <p className={styles.paragraph}>
                        Our services are not intended for children under 13. We do not knowingly collect personal information from children. If you believe we have collected such data, please contact us immediately.
                    </p>

                    <h2 className={styles.sectionTitle}>8. Changes to This Policy</h2>
                    <p className={styles.paragraph}>
                        We may update this privacy policy from time to time. We will notify you of significant changes via email or app notification. Continued use of our services after changes constitutes acceptance.
                    </p>

                    <h2 className={styles.sectionTitle}>9. Contact Us</h2>
                    <p className={styles.paragraph}>
                        If you have any questions or concerns about this privacy policy, please contact us:
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.listItem}><strong>Email:</strong> mrcoachofficial@gmail.com</li>
                        <li className={styles.listItem}><strong>Phone:</strong> +91 74484 21134</li>
                        <li className={styles.listItem}><strong>Address:</strong> 38A/98, KalathuMettu Street, Chengalpattu, Tamil Nadu 603002, India</li>
                    </ul>

                    <p className={styles.disclaimer}>
                        By using MR.COACH's services, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
                    </p>
                </div>
            </div>
        </main>
    );
}
