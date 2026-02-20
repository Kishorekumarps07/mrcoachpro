'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu, Filter, ShoppingCart, User, X } from 'lucide-react';
import styles from './ShopNavbar.module.css';
import { useShop } from '@/app/products/context/ShopContext';

export const ShopNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const { setSearchQuery, allProducts } = useShop();
    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Compute suggestions from allProducts based on current input
    const suggestions = inputValue.trim().length >= 1
        ? allProducts
            .filter(p =>
                p.title?.toLowerCase().includes(inputValue.toLowerCase()) ||
                p.category?.toLowerCase().includes(inputValue.toLowerCase())
            )
            .slice(0, 6) // max 6 suggestions
        : [];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInputValue(val);
        setSearchQuery(val);          // Real-time filtering on shop page
        setShowSuggestions(true);
    };

    const handleClear = () => {
        setInputValue('');
        setSearchQuery('');
        setShowSuggestions(false);
        inputRef.current?.focus();
    };

    const handleSuggestionClick = (title: string) => {
        setInputValue(title);
        setSearchQuery(title);
        setShowSuggestions(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') handleClear();
    };

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

                    {/* Center: Search Bar with Suggestions */}
                    <div className={styles.searchSection} ref={wrapperRef}>
                        <div className={`${styles.searchBar} ${showSuggestions && suggestions.length > 0 ? styles.searchBarOpen : ''}`}>
                            <button
                                className={styles.searchIconBtn}
                                aria-label="Search"
                                tabIndex={-1}
                            >
                                <Search size={18} className={styles.searchIcon} />
                            </button>
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search products, brands..."
                                className={styles.searchInput}
                                value={inputValue}
                                onChange={handleChange}
                                onFocus={() => setShowSuggestions(true)}
                                onKeyDown={handleKeyDown}
                                autoComplete="off"
                            />
                            {inputValue && (
                                <button
                                    onClick={handleClear}
                                    className={styles.searchClearBtn}
                                    aria-label="Clear search"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>

                        {/* Suggestions Dropdown */}
                        {showSuggestions && suggestions.length > 0 && (
                            <div className={styles.suggestionsDropdown}>
                                {suggestions.map((p) => (
                                    <button
                                        key={p.id}
                                        className={styles.suggestionItem}
                                        onMouseDown={() => handleSuggestionClick(p.title)}
                                    >
                                        <div className={styles.suggestionThumb}>
                                            <img src={p.images?.[0]} alt={p.title} />
                                        </div>
                                        <div className={styles.suggestionText}>
                                            <span className={styles.suggestionTitle}>{p.title}</span>
                                            <span className={styles.suggestionCategory}>{p.category}</span>
                                        </div>
                                        <span className={styles.suggestionPrice}>₹{p.price}</span>
                                    </button>
                                ))}
                            </div>
                        )}
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
