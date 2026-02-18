'use client';

import React, { useEffect, useState } from 'react';
import './shop-rugged.css';
import { productService } from '@/services/shop/productService';
import { Product } from '@/types/shop';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, User, Menu, Dumbbell, Zap, Heart, Flame, Star, ChevronRight, Plus } from 'lucide-react';

// RETAIL CATEGORIES (Horizontal Rail)
const RETAIL_CATS = [
    { id: 'protein', label: 'Protein', icon: <Dumbbell size={24} /> },
    { id: 'pre', label: 'Pre-Wkt', icon: <Zap size={24} /> },
    { id: 'vitamins', label: 'Vitamins', icon: <Heart size={24} /> },
    { id: 'gainers', label: 'Gainers', icon: <Flame size={24} /> },
    { id: 'equip', label: 'Gear', icon: <Dumbbell size={24} /> },
];

export default function ShopPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await productService.getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error("Failed to load products", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadProducts();
    }, []);

    return (
        <div className="shop-wrapper">
            {/* 1. RETAIL HEADER (YELLOW) */}
            <header className="retail-header">
                <Menu size={24} className="md:hidden" />
                <div className="retail-search-container">
                    <Search className="retail-search-icon" size={18} />
                    <input
                        type="text"
                        placeholder="Search for products, brands..."
                        className="retail-search-input"
                    />
                </div>
                <div className="retail-header-icons">
                    <User size={24} />
                    <ShoppingCart size={24} />
                </div>
            </header>

            {/* 2. CATEGORY RAIL */}
            <div className="category-rail">
                {RETAIL_CATS.map((cat) => (
                    <div key={cat.id} className="category-item">
                        <div className="category-icon-box">
                            {cat.id === 'protein' ? <Dumbbell size={24} /> : cat.icon}
                        </div>
                        <span className="category-label">{cat.label}</span>
                    </div>
                ))}
            </div>

            {/* 3. HERO BANNER (CONTAINED) */}
            <section className="retail-hero-section">
                <div className="retail-hero-banner">
                    <div className="retail-hero-content">
                        <h1 className="retail-hero-title">BIG SAVINGS<br />ON WHEY.</h1>
                        <p className="retail-hero-subtitle">Up to 40% OFF this week.</p>
                        <button className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold uppercase">
                            Shop Now
                        </button>
                    </div>
                </div>
            </section>

            {/* 4. POPULAR BRANDS */}
            <section className="retail-section">
                <div className="retail-section-header">
                    <h2 className="retail-section-title">Popular Brands</h2>
                    <span className="retail-view-all">View All</span>
                </div>
                <div className="brand-grid">
                    {['On', 'MuscleTech', 'Dymatize', 'BPI', 'GNC', 'MyProtein'].map((brand, i) => (
                        <div key={i} className="brand-card">
                            {brand}
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. ALL PRODUCTS GRID */}
            <section className="retail-section">
                <div className="retail-section-header">
                    <h2 className="retail-section-title">Trending Now</h2>
                </div>

                {isLoading ? (
                    <div className="ms-grid">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="ms-card h-[250px] bg-gray-50 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="ms-grid">
                        {products.map((product) => (
                            <div key={product.id} className="ms-card">
                                <span className="ms-card-badge">
                                    {product.category === 'Equipment' ? 'HEAVY' : 'BESTSELLER'}
                                </span>

                                <div className="ms-card-image-wrapper">
                                    <img
                                        src={product.images[0]}
                                        alt={product.title}
                                        className="ms-card-image"
                                    />
                                </div>

                                <div className="ms-card-info">
                                    <h3 className="ms-card-title">{product.title}</h3>
                                    <div className="ms-card-meta">
                                        50 Servings • 2kg
                                    </div>
                                    <div className="ms-buybox">
                                        <div className="ms-card-price">
                                            ₹{product.price}
                                        </div>
                                        <button className="ms-card-action">
                                            <Plus size={16} strokeWidth={3} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
