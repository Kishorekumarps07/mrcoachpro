'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Phone, Mail, Instagram, MessageCircle, MapPin, ArrowRight, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './contact-us.module.css';

const CONTACT_METHODS = [
    {
        icon: <Phone size={32} />,
        title: 'Call Us',
        info: '+91 74484 21134',
        action: 'Call Now',
        href: 'tel:+917448421134'
    },
    {
        icon: <MessageCircle size={32} />,
        title: 'WhatsApp',
        info: 'Chat with our team',
        action: 'Start Chat',
        href: 'https://api.whatsapp.com/send/?phone=%2B917448421134&text=Hello+MR.COACH!&type=phone_number&app_absent=0'
    },
    {
        icon: <Mail size={32} />,
        title: 'Email Us',
        info: 'mrcoachofficial@gmail.com',
        action: 'Send Email',
        href: 'mailto:mrcoachofficial@gmail.com'
    }
];

const SOCIAL_LINKS = [
    { name: 'Instagram', icon: <Instagram size={20} />, href: 'https://www.instagram.com/mrcoachapp/' },
    { name: 'Facebook', icon: <Facebook size={20} />, href: 'https://www.facebook.com/people/MrCoach-J/61554733148919/' },
];

export default function ContactUsPage() {
    return (
        <main className={styles.main}>
            <Navbar />

            <motion.div
                className={styles.container}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className={styles.header}>
                    <motion.h1
                        className={styles.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        Get In Touch
                    </motion.h1>
                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        Ready to elevate your fitness journey? Reach out to us through any of the channels below and our team will get back to you immediately.
                    </motion.p>
                </div>

                <div className={styles.grid}>
                    {CONTACT_METHODS.map((method, index) => (
                        <motion.a
                            key={method.title}
                            href={method.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.card}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + (index * 0.1), duration: 0.5 }}
                        >
                            <div className={styles.iconWrapper}>
                                {method.icon}
                            </div>
                            <h3 className={styles.cardTitle}>{method.title}</h3>
                            <p className={styles.cardInfo}>{method.info}</p>
                            <span className={styles.actionText}>
                                {method.action} <ArrowRight size={16} className={styles.arrow} />
                            </span>
                        </motion.a>
                    ))}
                </div>

                <motion.div
                    className={styles.socialGrid}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    {SOCIAL_LINKS.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialLink}
                        >
                            {link.icon} {link.name}
                        </a>
                    ))}
                </motion.div>
            </motion.div>
        </main>
    );
}
