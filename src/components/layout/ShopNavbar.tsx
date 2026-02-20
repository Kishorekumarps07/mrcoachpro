'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu, Filter, ShoppingCart, User, X } from 'lucide-react';
import styles from './ShopNavbar.module.css';

export const ShopNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className={styles.shopNavbar}>
                <div className={styles.container}>
                    {/* Left: Menu & Logo */}
                    <div className={styles.leftSection}>
                        <button
                            className={styles.iconBtn}
                            onClick={() => setIsMenuOpen(true)}
                            aria-label="Toggle Menu"
                        >
                            <Menu size={24} />
                        </button>
                        <Link href="/" className={styles.logo}>
                            <Image
                                src="/mrcoach-logo-new.png"
                                alt="MR.COACH"
                                width={140}
                                height={36}
                                priority
                                style={{ objectFit: 'contain' }}
                            />
                        </Link>
                    </div>

                    {/* Center: Search Bar */}
                    <div className={styles.searchSection}>
                        <div className={styles.searchBar}>
                            <Search size={18} className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Search products, brands..."
                                className={styles.searchInput}
                            />
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className={styles.rightSection}>
                        <button className={styles.actionBtn} aria-label="Filter">
                            <span className={styles.btnLabel}>Filter</span>
                            <Filter size={20} />
                        </button>
                        <div className={styles.divider}></div>
                        <button className={styles.iconBtn} aria-label="User Profile">
                            <User size={24} />
                        </button>
                        <Link href="/products/cart" className={styles.iconBtn} aria-label="Cart">
                            <ShoppingCart size={24} />
                        </Link>
                    </div>
                </div>
            </header>

            {/* Shop Side Menu Overlay */}
            {isMenuOpen && (
                <div className={styles.overlay} onClick={() => setIsMenuOpen(false)}>
                    <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.drawerHeader}>
                            <h2 className={styles.drawerTitle}>Shop Menu</h2>
                            <button onClick={() => setIsMenuOpen(false)} className={styles.closeBtn}>
                                <X size={24} />
                            </button>
                        </div>
                        <nav className={styles.drawerNav}>
                            <Link href="/products" className={styles.drawerLink} onClick={() => setIsMenuOpen(false)}>All Products</Link>
                            <Link href="/products?cat=protein" className={styles.drawerLink} onClick={() => setIsMenuOpen(false)}>Proteins</Link>
                            <Link href="/products?cat=vitamins" className={styles.drawerLink} onClick={() => setIsMenuOpen(false)}>Vitamins</Link>
                            <Link href="/products?cat=gear" className={styles.drawerLink} onClick={() => setIsMenuOpen(false)}>Gym Gear</Link>
                            <div className={styles.drawerDivider}></div>
                            <Link href="/" className={styles.drawerLink} onClick={() => setIsMenuOpen(false)}>Back to Coaching</Link>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};
