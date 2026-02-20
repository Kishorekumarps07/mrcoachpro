'use client';

import React, { useEffect, useState } from 'react';
import './shop-rugged.css';
import ShopHeroCarousel from './ShopHeroCarousel';
import { productService } from '@/services/shop/productService';
import { Product } from '@/types/shop';
import { ShoppingBag } from 'lucide-react';
import { useShop } from '@/app/products/context/ShopContext';
import Link from 'next/link';

// RETAIL CATEGORIES (Horizontal Rail)
const RETAIL_CATS = [
    { id: 'protein', label: 'Protein', img: '/images/categories/protein-3d.png' },
    { id: 'pre', label: 'Pre-Wkt', img: '/images/categories/preworkout-3d.png' },
    { id: 'vitamins', label: 'Vitamins', img: '/images/categories/vitamins-3d.png' },
    { id: 'gainers', label: 'Gainers', img: '/images/categories/gainer-3d.png' },
    { id: 'equip', label: 'Gear', img: '/images/categories/gear-3d.png' },
];

// ── Reusable horizontal-scroll category section ──────────────────
function CategorySection({
    title,
    emoji,
    categoryKey,
    products,
    addToCart,
}: {
    title: string;
    emoji: string;
    categoryKey: string;
    products: Product[];
    addToCart: (p: Product) => void;
}) {
    const filtered = products.filter(
        (p) => p.category?.toLowerCase() === categoryKey.toLowerCase()
    );
    if (filtered.length === 0) return null;

    return (
        <section className="retail-section cat-section">
            <div className="retail-section-header">
                <h2 className="retail-section-title">
                    <span className="cat-section-emoji">{emoji}</span> {title}
                </h2>
                <span className="retail-view-all">View All</span>
            </div>
            <div className="cat-scroll-row">
                {filtered.map((product, index) => (
                    <div key={product.id} className="cat-product-card">
                        <div className={`card-badge badge-${index % 3 === 0 ? 'popular' : index % 3 === 1 ? 'lowest' : 'hot'}`}>
                            {index % 3 === 0 ? 'Popular' : index % 3 === 1 ? 'Best Price' : 'Hot'}
                        </div>
                        <Link href={`/products/${product.slug}`} className="cat-card-img-wrap">
                            <img src={product.images[0]} alt={product.title} className="cat-card-img" />
                        </Link>
                        <div className="cat-card-body">
                            <span className="cat-card-tag">{product.category}</span>
                            <h3 className="cat-card-title">{product.title}</h3>
                            <div className="cat-card-price-row">
                                <span className="cat-card-price">₹{product.price.toLocaleString('en-IN')}</span>
                                <button
                                    className="cat-card-atc"
                                    onClick={() => addToCart(product)}
                                    aria-label={`Add ${product.title} to cart`}
                                >
                                    <ShoppingBag size={14} />
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

// ── Reusable product card (shared by Trending + category rows) ───
function ProductCard({ product, index, addToCart }: { product: Product; index: number; addToCart: (p: Product) => void }) {
    return (
        <div className="cat-product-card">
            <div className={`card-badge badge-${index % 3 === 0 ? 'popular' : index % 3 === 1 ? 'lowest' : 'hot'}`}>
                {index % 3 === 0 ? 'Popular' : index % 3 === 1 ? 'Best Price' : 'Hot'}
            </div>
            <Link href={`/products/${product.slug}`} className="cat-card-img-wrap">
                <img src={product.images[0]} alt={product.title} className="cat-card-img" />
            </Link>
            <div className="cat-card-body">
                <span className="cat-card-tag">{product.category}</span>
                <h3 className="cat-card-title">{product.title}</h3>
                <div className="cat-card-price-row">
                    <span className="cat-card-price">₹{product.price.toLocaleString('en-IN')}</span>
                    <button
                        className="cat-card-atc"
                        onClick={() => addToCart(product)}
                        aria-label={`Add ${product.title} to cart`}
                    >
                        <ShoppingBag size={14} />
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Main Shop Page ───────────────────────────────────────────────
export default function ShopPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { addToCart, searchQuery, setAllProducts } = useShop();

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await productService.getAllProducts();
                setProducts(data);
                setAllProducts(data);
            } catch (error) {
                console.error("Failed to load products", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadProducts();
    }, []);

    const q = searchQuery.toLowerCase().trim();

    // During search: show all matches. No search: 1 product per category.
    const filteredProducts = q
        ? products.filter(p =>
            p.title?.toLowerCase().includes(q) ||
            p.category?.toLowerCase().includes(q) ||
            (p as any).brand?.toLowerCase().includes(q)
        )
        : (() => {
            const seen = new Set<string>();
            return products.filter(p => {
                const cat = p.category?.toLowerCase() ?? 'other';
                if (seen.has(cat)) return false;
                seen.add(cat);
                return true;
            });
        })();

    return (
        <div className="shop-wrapper">

            {/* CATEGORY RAIL */}
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

            {/* HERO CAROUSEL */}
            <section className="retail-hero-section">
                <ShopHeroCarousel />
            </section>

            {/* POPULAR BRANDS */}
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

            {/* TRENDING NOW — same card style as category sections */}
            <section className="retail-section cat-section">
                <div className="retail-section-header">
                    {searchQuery ? (
                        <h2 className="retail-section-title">
                            {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for &ldquo;{searchQuery}&rdquo;
                        </h2>
                    ) : (
                        <h2 className="retail-section-title">🔥 Trending Now</h2>
                    )}
                </div>

                {isLoading ? (
                    <div className="cat-scroll-row">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="cat-product-card" style={{ height: 260, background: '#F4F4F4' }} />
                        ))}
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 24px', color: '#999' }}>
                        <p style={{ fontSize: 18, fontWeight: 700 }}>No products found for &ldquo;{searchQuery}&rdquo;</p>
                        <p style={{ fontSize: 13, marginTop: 8 }}>Try a different keyword or browse categories above.</p>
                    </div>
                ) : (
                    <div className="cat-scroll-row">
                        {filteredProducts.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} addToCart={addToCart} />
                        ))}
                    </div>
                )}
            </section>

            {/* CATEGORY SECTIONS — hidden during search */}
            {!isLoading && !searchQuery && (
                <>
                    <CategorySection title="Protein Supplements" emoji="🥤" categoryKey="protein" products={products} addToCart={addToCart} />
                    <CategorySection title="Pre-Workout" emoji="⚡" categoryKey="pre-workout" products={products} addToCart={addToCart} />
                    <CategorySection title="Vitamins & Wellness" emoji="💊" categoryKey="vitamins" products={products} addToCart={addToCart} />
                    <CategorySection title="Mass Gainers" emoji="💪" categoryKey="gainers" products={products} addToCart={addToCart} />
                    <CategorySection title="Gym Gear" emoji="🏋️" categoryKey="gear" products={products} addToCart={addToCart} />
                </>
            )}
        </div>
    );
}
