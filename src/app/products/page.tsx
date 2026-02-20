'use client';

import React, { useEffect, useState } from 'react';
import './shop-rugged.css';
import ShopHeroCarousel from './ShopHeroCarousel';
import { productService } from '@/services/shop/productService';
import { Product } from '@/types/shop';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, User, Menu, Dumbbell, Zap, Heart, Flame, Star, ChevronRight, Plus, ShoppingBag } from 'lucide-react';
import { useShop } from '@/app/products/context/ShopContext';

// RETAIL CATEGORIES (Horizontal Rail)
const RETAIL_CATS = [
    { id: 'protein', label: 'Protein', img: '/images/categories/protein-3d.png' },
    { id: 'pre', label: 'Pre-Wkt', img: '/images/categories/preworkout-3d.png' },
    { id: 'vitamins', label: 'Vitamins', img: '/images/categories/vitamins-3d.png' },
    { id: 'gainers', label: 'Gainers', img: '/images/categories/gainer-3d.png' },
    { id: 'equip', label: 'Gear', img: '/images/categories/gear-3d.png' },
];

export default function ShopPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { addToCart } = useShop();

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
            {/* 2. CATEGORY RAIL */}
            <div className="category-rail">
                {RETAIL_CATS.map((cat) => (
                    <div key={cat.id} className="category-item">
                        <div className="category-icon-box">
                            <img src={cat.img} alt={cat.label} className="category-3d-img" />
                        </div>
                        <span className="category-label">{cat.label}</span>
                    </div>
                ))}
            </div>

            {/* 3. HERO CAROUSEL */}
            <section className="retail-hero-section">
                <ShopHeroCarousel />
            </section>

            {/* 4. POPULAR BRANDS */}
            <section className="retail-section">
                <div className="retail-section-header">
                    <h2 className="retail-section-title">Popular Brands</h2>
                    <span className="retail-view-all">View All</span>
                </div>
                <div className="brand-grid">
                    {[
                        { name: 'On', img: '/images/brands/on.png' },
                        { name: 'MuscleTech', img: '/images/brands/muscletech.png' },
                        { name: 'Dymatize', img: '/images/brands/dynamite.png' },
                        { name: 'BPI', img: '/images/brands/bpisports.png' },
                        { name: 'GNC', img: '/images/brands/gnc.png' },
                        { name: 'MyProtein', img: '/images/brands/myprotein.png' }
                    ].map((brand, i) => (
                        <div key={i} className="brand-card">
                            <img src={brand.img} alt={brand.name} className="brand-logo" />
                            <span className="brand-name">{brand.name}</span>
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
                    <div className="retail-grid">
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                className="premium-product-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                {/* Badge Logic */}
                                <div className={`card-badge badge-${index % 3 === 0 ? 'popular' :
                                    index % 3 === 1 ? 'lowest' : 'hot'
                                    }`}>
                                    {index % 3 === 0 ? 'Popular' :
                                        index % 3 === 1 ? 'Lowest Price' : 'Hot Selling'}
                                </div>

                                <div className="card-image-container">
                                    <div className="image-backdrop"></div>
                                    <img
                                        src={product.images[0]}
                                        alt={product.title}
                                        className="card-image"
                                    />
                                </div>

                                <div className="card-details">
                                    <div className="card-category-tag">{product.category}</div>
                                    <h3 className="card-title">{product.title}</h3>

                                    <div className="card-pricing-row">
                                        <span className="current-price">₹{product.price}</span>
                                        <span className="original-price">₹17999</span>
                                        <span className="discount-badge">
                                            {Math.round(((17999 - product.price) / 17999) * 100)}% off
                                        </span>
                                    </div>

                                    <button
                                        className="add-to-cart-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addToCart(product);
                                        }}
                                    >
                                        <ShoppingBag size={16} />
                                        Add to Cart
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
