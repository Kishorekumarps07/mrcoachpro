'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import clsx from 'clsx';
import { Menu, X, Search, ChevronDown, Sparkles, Calendar, Info, ShoppingBag, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SearchOverlay } from '@/components/ui/SearchOverlay';
import { useModal } from '@/context/ModalContext';
import { LocationPicker } from './LocationPicker';
import styles from './Navbar.module.css';
import { CORE_SERVICES } from '@/data/services';

const NAV_LINKS = [
    { href: '/services', label: 'Services', icon: Sparkles },
    { href: '/events', label: 'Events', icon: Calendar },
    { href: '/products', label: 'Shop', icon: ShoppingBag },
    { href: '/about', label: 'About', icon: Info },
];

export const Navbar = () => {
    const pathname = usePathname();
    const isEventsPage = pathname === '/events';
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
                            {/* Dynamic Search Bar - Conditional based on route */}
                            <div className={styles.searchBar} onClick={() => setIsSearchOpen(true)}>
                                <Search size={18} className={styles.searchIcon} />
                                <input
                                    type="text"
                                    readOnly
                                    placeholder={isEventsPage ? "Search for events, locations, dates..." : `Search for '${placeholders[placeholderIndex]}'`}
                                    className={styles.searchInput}
                                />
                            </div>

                            <LocationPicker />
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

                        <button
                            className={styles.desktopToggle}
                            onClick={() => setIsMobileMenuOpen(true)}
                            aria-label="Open Menu"
                        >
                            <Menu size={24} />
                        </button>
                    </nav>

                    {/* Mobile Search Bar (New) */}
                    <div className={styles.mobileSearchBar} onClick={() => setIsSearchOpen(true)}>
                        <Search size={18} className={styles.mobileSearchIcon} />
                        <span className={styles.mobileSearchPlaceholder}>
                            {isEventsPage ? "Search for events, locations, dates..." : `Search for '${placeholders[placeholderIndex]}'`}
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
                            <Link href="/" className={styles.mobileMenuLogo} onClick={() => setIsMobileMenuOpen(false)}>
                                <Image
                                    src="/mrcoach-logo-new.png"
                                    alt="MR.COACH"
                                    width={140}
                                    height={40}
                                    style={{ objectFit: 'contain' }}
                                />
                            </Link>
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

                        <a
                            href="https://chat.whatsapp.com/F1cDrGmE8VhHNHbamTO0Me"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.whatsappHighlight}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={styles.whatsappIcon}>
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487 2.105.908 2.528.727 2.999.678.471-.049 1.503-.614 1.716-1.208.213-.594.213-1.103.149-1.208z" />
                            </svg>
                            Join Community (for coaches)
                        </a>

                        <div className={styles.mobileMenuFooter}>
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

                            <div className={styles.mobileSocials}>
                                <p className={styles.socialTitle}>Follow Us</p>
                                <div className={styles.socialIcons}>
                                    <a href="https://www.facebook.com/people/MrCoach-J/61554733148919/" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.facebookIcon}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                    </a>
                                    <a href="https://www.instagram.com/mrcoachapp/" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.instagramIcon}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                    </a>
                                    <a href="https://api.whatsapp.com/send/?phone=%2B917448421134&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.whatsappIconColor}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487 2.105.908 2.528.727 2.999.678.471-.049 1.503-.614 1.716-1.208.213-.594.213-1.103.149-1.208z" /></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <SearchOverlay
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                type={isEventsPage ? 'events' : 'default'}
            />
        </>
    );
};
