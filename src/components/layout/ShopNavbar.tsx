'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu, Filter, ShoppingCart, User, X } from 'lucide-react';
import styles from './ShopNavbar.module.css';
import { useShop } from '@/app/products/context/ShopContext';

export const ShopNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const {
        setSearchQuery,
        allProducts,
        activeCategory,
        setActiveCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice
    } = useShop();

    // Local filter states
    const [localMinPrice, setLocalMinPrice] = useState<string>(minPrice ? minPrice.toString() : '');
    const [localMaxPrice, setLocalMaxPrice] = useState<string>(maxPrice ? maxPrice.toString() : '');

    // Reset local state when drawer opens to reflect global
    useEffect(() => {
        if (isFilterOpen) {
            setLocalMinPrice(minPrice ? minPrice.toString() : '');
            setLocalMaxPrice(maxPrice ? maxPrice.toString() : '');
        }
    }, [isFilterOpen, minPrice, maxPrice]);

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
                    {/* Top Row: Menu, Logo, and Icons (User, Cart) */}
                    <div className={styles.topRow}>
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
                                    width={220}
                                    height={50}
                                    priority
                                    className={styles.logoImage}
                                />
                            </Link>
                        </div>

                        <div className={styles.rightSectionMobile}>
                            <button className={styles.iconBtn} aria-label="User Profile">
                                <User size={24} />
                            </button>
                            <Link href="/products/cart" className={styles.iconBtn} aria-label="Cart">
                                <ShoppingCart size={24} />
                            </Link>
                        </div>
                    </div>

                    {/* Bottom Row / Search Section for Mobile & Desktop */}
                    <div className={styles.bottomRow}>
                        {/* Search Bar with Suggestions */}
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

                        {/* Actions for Desktop / Filter for Mobile */}
                        <div className={styles.actionsSection}>
                            <button
                                className={styles.actionBtn}
                                aria-label="Filter"
                                onClick={() => setIsFilterOpen(true)}
                            >
                                <span className={styles.btnLabel}>Filter</span>
                                <Filter size={20} />
                            </button>
                            <div className={styles.desktopOnlyActions}>
                                <div className={styles.divider}></div>
                                <button className={styles.iconBtn} aria-label="User Profile">
                                    <User size={24} />
                                </button>
                                <Link href="/products/cart" className={styles.iconBtn} aria-label="Cart">
                                    <ShoppingCart size={24} />
                                </Link>
                            </div>
                        </div>
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

            {/* Filter Sidebar Overlay */}
            {isFilterOpen && (
                <div className={styles.overlay} onClick={() => setIsFilterOpen(false)}>
                    <div className={`${styles.drawer} ${styles.filterDrawer}`} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.drawerHeader}>
                            <h2 className={styles.drawerTitle}>Filters</h2>
                            <button onClick={() => setIsFilterOpen(false)} className={styles.closeBtn}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className={styles.filterContent}>
                            <div className={styles.filterGroup}>
                                <h3 className={styles.filterGroupTitle}>Categories</h3>
                                <div className={styles.filterOptions}>
                                    <button
                                        className={`${styles.filterOption} ${!activeCategory ? styles.activeOption : ''}`}
                                        onClick={() => {
                                            setActiveCategory(null);
                                            setIsFilterOpen(false);
                                        }}
                                    >
                                        All Products
                                    </button>
                                    {['Protein', 'Pre-Workout', 'Vitamins', 'Gainers', 'Gear'].map(cat => (
                                        <button
                                            key={cat}
                                            className={`${styles.filterOption} ${activeCategory?.toLowerCase() === cat.toLowerCase() ? styles.activeOption : ''}`}
                                            onClick={() => {
                                                setActiveCategory(cat.toLowerCase());
                                                setIsFilterOpen(false);
                                            }}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.filterGroup}>
                                <h3 className={styles.filterGroupTitle}>Price Range</h3>
                                <div className={styles.priceInputs}>
                                    <div className={styles.priceField}>
                                        <span>Min</span>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            className={styles.priceInput}
                                            value={localMinPrice}
                                            onChange={(e) => setLocalMinPrice(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.priceField}>
                                        <span>Max</span>
                                        <input
                                            type="number"
                                            placeholder="5000"
                                            className={styles.priceInput}
                                            value={localMaxPrice}
                                            onChange={(e) => setLocalMaxPrice(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.drawerFooter}>
                            <button
                                className={styles.clearBtn}
                                onClick={() => {
                                    setActiveCategory(null);
                                    setSearchQuery('');
                                    setInputValue('');
                                    setMinPrice(null);
                                    setMaxPrice(null);
                                    setLocalMinPrice('');
                                    setLocalMaxPrice('');
                                    setIsFilterOpen(false);
                                }}
                            >
                                Clear All
                            </button>
                            <button
                                className={styles.applyBtn}
                                onClick={() => {
                                    // Apply local filter state to global context
                                    setMinPrice(localMinPrice === '' ? null : Number(localMinPrice));
                                    setMaxPrice(localMaxPrice === '' ? null : Number(localMaxPrice));
                                    setIsFilterOpen(false);
                                }}
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
