'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { Menu, X, Search, MapPin, ChevronDown, Sparkles, Calendar, Info } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SearchOverlay } from '@/components/ui/SearchOverlay';
import { useModal } from '@/context/ModalContext'; // Import Context
import styles from './Navbar.module.css';
import { CORE_SERVICES } from '@/data/services';

const NAV_LINKS = [
    { href: '/services', label: 'Services', icon: Sparkles },
    { href: '/events', label: 'Events', icon: Calendar },
    { href: '/about', label: 'About', icon: Info },
];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { openModal } = useModal(); // Use Context

    // Search Placeholder Cycling Logic
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const placeholders = CORE_SERVICES;

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
                        <Image
                            src="/mobile-logo.png"
                            alt="MR.COACH Logo"
                            width={40}
                            height={40}
                            className={styles.logoMobile}
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
                            onClick={openModal} // Use Context
                        >
                            Book a Demo
                        </Button>
                    </nav>

                    {/* Mobile Search Bar (New) */}
                    <div className={styles.mobileSearchBar} onClick={() => setIsSearchOpen(true)}>
                        <Search size={18} className={styles.mobileSearchIcon} />
                        <span className={styles.mobileSearchPlaceholder}>
                            Search for '{placeholders[placeholderIndex]}'
                        </span>
                    </div>

                    {/* Mobile Toggle */}
                    <div className={styles.mobileControls}>
                        {/* Removed independent search icon trigger since we have the bar now */}
                        <button
                            className={styles.mobileToggle}
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                    </div>

                </div>
            </header>

            {/* Mobile Side Drawer */}
            {isMobileMenuOpen && (
                <>
                    <div
                        className={styles.mobileMenuOverlay}
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <div className={styles.mobileMenu}>
                        <div className={styles.mobileMenuHeader}>
                            <button
                                className={styles.closeButton}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={styles.mobileNavLink}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <link.icon size={20} className={styles.menuIcon} />
                                {link.label}
                            </Link>
                        ))}
                        <div className={styles.mobileCta}>
                            <Button
                                fullWidth
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    openModal(); // Use Context
                                }}
                            >
                                Book a Demo
                            </Button>
                        </div>
                    </div>
                </>
            )}

            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
};
