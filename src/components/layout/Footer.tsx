'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';
import styles from './Footer.module.css';

const FOOTER_LINKS = [
    { label: 'About', href: '/about' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
];

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.topSection}>
                    <div className={styles.brandCol}>
                        <Link href="/" className={styles.logo}>
                            <Image
                                src="/mrcoach-logo-new.png"
                                alt="MR.COACH"
                                width={160}
                                height={40}
                                className={styles.logoImage}
                                style={{ objectFit: 'contain' }}
                            />
                        </Link>
                        <p className={styles.tagline}>Performance. Discipline. Energy.</p>
                    </div>

                    <nav className={styles.navCol}>
                        {FOOTER_LINKS.map(link => (
                            <Link key={link.label} href={link.href} className={styles.link}>
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className={styles.socialCol}>
                        <a href="#" className={styles.socialIcon} aria-label="Instagram"><Instagram size={20} /></a>
                        <a href="#" className={styles.socialIcon} aria-label="Twitter"><Twitter size={20} /></a>
                        <a href="#" className={styles.socialIcon} aria-label="LinkedIn"><Linkedin size={20} /></a>
                    </div>
                </div>

                <div className={styles.bottomSection}>
                    <p className={styles.copyright}>&copy; {new Date().getFullYear()} MR.COACH. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
