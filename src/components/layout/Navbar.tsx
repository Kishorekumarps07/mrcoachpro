'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { Menu, X, Search, MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SearchOverlay } from '@/components/ui/SearchOverlay';
import { BookDemoModal } from '@/components/ui/BookDemoModal';
import styles from './Navbar.module.css';
import { ALL_SERVICES } from '@/data/services';

const NAV_LINKS = [
    { href: '/events', label: 'Events' },
    { href: '/about', label: 'About' },
];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Search Placeholder Cycling Logic
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const placeholders = ALL_SERVICES;

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((current) => (current + 1) % placeholders.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

    return (
        <>
            <header className={clsx(styles.header, { [styles.scrolled]: isScrolled })}>
                <div className={styles.container}>
                    <Link href="/" className={styles.logo}>
                        <Image
                            src="/mrcoach-logo-new.png"
                            alt="MR.COACH"
                            width={180}
                            height={48}
                            className={styles.logoImage}
                            priority
                            style={{ objectFit: 'contain' }}
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className={styles.desktopNav}>
                        {/* New Location & Search Section */}
                        <div className={styles.navTools}>
                            {/* Dynamic Search Bar */}
                            <div className={styles.searchBar} onClick={() => setIsSearchOpen(true)}>
                                <Search size={18} className={styles.searchIcon} />
                                <input
                                    type="text"
                                    readOnly
                                    placeholder={`Search for '${placeholders[placeholderIndex]}'`}
                                    className={styles.searchInput}
                                />
                            </div>

                            <button className={styles.locationBtn}>
                                <MapPin size={18} className={styles.toolIcon} />
                                <span className={styles.locationText}>Nungambakkam, Chennai</span>
                                <ChevronDown size={16} className={styles.chevIcon} />
                            </button>


                        </div>

                        {NAV_LINKS.map((link) => (
                            <Link key={link.href} href={link.href} className={styles.navLink}>
                                {link.label}
                            </Link>
                        ))}

                        <Button
                            size="sm"
                            className={styles.ctaButton}
                            onClick={() => setIsDemoModalOpen(true)}
                        >
                            Book a Demo
                        </Button>
                    </nav>

                    {/* Mobile Toggle */}
                    <div className={styles.mobileControls}>
                        <button
                            className={styles.searchTriggerMobile}
                            onClick={() => setIsSearchOpen(true)}
                        >
                            <Search size={24} />
                        </button>
                        <button
                            className={styles.mobileToggle}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                </div>
            </header>

            {/* Mobile Menu - Moved outside header to avoid stacking context issues */}
            {isMobileMenuOpen && (
                <div className={styles.mobileMenu}>
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={styles.mobileNavLink}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className={styles.mobileCta}>
                        <Button
                            fullWidth
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsDemoModalOpen(true);
                            }}
                        >
                            Book a Demo
                        </Button>
                    </div>
                </div>
            )}

            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            <BookDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
        </>
    );
};
