'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { productService } from '@/services/shop/productService';
import { Product } from '@/types/shop';
import { useShop } from '@/app/products/context/ShopContext';
import { Button } from '@/components/ui/Button';
import { ShoppingCart, Truck, RefreshCw, ShieldCheck, ChevronLeft, Zap } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import styles from './ProductDetail.module.css';

export default function ProductDetailPage() {
    const params = useParams();
    const [product, setProduct] = useState<Product | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const { addToCart } = useShop();

    useEffect(() => {
        const loadProduct = async () => {
            if (params.slug) {
                const data = await productService.getProductBySlug(params.slug as string);
                setProduct(data);
                setIsLoading(false);
            }
        };
        loadProduct();
    }, [params.slug]);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="spinner mx-auto mb-4" />
                <p>Loading product...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
                <Link href="/products" className="text-amber-600 hover:underline">Return to Shop</Link>
            </div>
        );
    }

    // Calculated simulated MRP and savings for the "Deal" effect
    const mrp = Math.round(product.price * 1.35); // Add ~35%
    const discountPercent = Math.round(((mrp - product.price) / mrp) * 100);

    return (
        <div className={styles.wrapper}>
            {/* Contextual Header / Breadcrumb Area */}
            <div className={styles.breadcrumbBar}>
                <nav className={styles.breadcrumbNav}>
                    <Link href="/" className={styles.breadcrumbLink}>Home</Link>
                    <span style={{ margin: '0 8px' }}>›</span>
                    <Link href="/products" className={styles.breadcrumbLink}>Shop</Link>
                    <span style={{ margin: '0 8px' }}>›</span>
                    <span style={{ textTransform: 'capitalize' }}>{product.category}</span>
                    <span style={{ margin: '0 8px' }}>›</span>
                    <span className={styles.breadcrumbTitle}>{product.title}</span>
                </nav>
            </div>

            <div className={styles.mainContainer}>
                <div className={styles.card}>
                    <div className={styles.grid}>

                        {/* LEFT: Image Gallery */}
                        <div className={styles.leftCol}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={styles.imageBox}
                            >
                                <div className={styles.imageGradient}></div>

                                {product.images?.[0] ? (
                                    <>
                                        {product.stock === 0 && (
                                            <div style={{
                                                position: 'absolute', inset: 0, backgroundColor: 'rgba(255,255,255,0.7)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 15
                                            }}>
                                                <span style={{
                                                    backgroundColor: '#EF4444', color: 'white', padding: '8px 16px',
                                                    borderRadius: '6px', fontSize: '18px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.05em'
                                                }}>Out of Stock</span>
                                            </div>
                                        )}
                                        <img
                                            src={product.images[0]}
                                            alt={product.title}
                                            className={styles.mainImage}
                                            style={{ filter: product.stock === 0 ? 'grayscale(100%) opacity(50%)' : 'none' }}
                                        />
                                    </>
                                ) : (
                                    <div className={styles.noImage}>No Image</div>
                                )}

                                <div className={styles.topRatedBadge}>
                                    Top Rated
                                </div>
                            </motion.div>
                        </div>

                        {/* RIGHT: Product Details */}
                        <div className={styles.rightCol}>
                            <div>
                                {/* Title & Meta */}
                                <div className={styles.titleBox}>
                                    <h1 className={styles.title}>{product.title}</h1>
                                    <div className={styles.metaRow}>
                                        <div className={styles.ratingBadge}>
                                            4.8
                                            <svg width="10" height="10" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                        </div>
                                        <span className={styles.reviewText}>1,248 Ratings & 184 Reviews</span>
                                    </div>
                                </div>

                                {/* Price Box */}
                                <div className={styles.priceBox}>
                                    <p className={styles.specialPriceLabel}>
                                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4M12 16h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"></path></svg>
                                        Special Price
                                    </p>
                                    <div className={styles.priceRow}>
                                        <span className={styles.priceMain}>₹{product.price.toLocaleString()}</span>
                                        <span className={styles.priceStrike}>₹{mrp.toLocaleString()}</span>
                                        <span className={styles.priceOff}>{discountPercent}% off</span>
                                    </div>
                                    <p className={styles.taxInfo}>Inclusive of all taxes</p>
                                </div>

                                {/* Mobile Inline Actions (under price) */}
                                <div className={styles.mobileInlineActions}>
                                    <motion.button
                                        whileTap={{ scale: product.stock > 0 ? 0.96 : 1 }}
                                        onClick={() => product.stock > 0 && addToCart(product)}
                                        className={`${styles.btnMobile} ${styles.btnMobileWhite}`}
                                        disabled={product.stock === 0}
                                        style={{
                                            opacity: product.stock === 0 ? 0.5 : 1,
                                            cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                                            backgroundColor: product.stock === 0 ? '#F3F4F6' : '',
                                            color: product.stock === 0 ? '#9CA3AF' : ''
                                        }}
                                    >
                                        <ShoppingCart size={18} />
                                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                    </motion.button>
                                    <motion.button
                                        whileTap={{ scale: product.stock > 0 ? 0.96 : 1 }}
                                        onClick={() => { if (product.stock > 0) { addToCart(product); window.location.href = '/products/cart'; } }}
                                        className={`${styles.btnMobile} ${styles.btnMobileBlack}`}
                                        disabled={product.stock === 0}
                                        style={{
                                            opacity: product.stock === 0 ? 0.4 : 1,
                                            cursor: product.stock === 0 ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        {product.stock === 0 ? 'Unavailable' : 'Buy Now'}
                                    </motion.button>
                                </div>

                                {/* Description */}
                                <div className={styles.descBox}>
                                    <h3 className={styles.descTitle}>Product Description</h3>
                                    <p className={styles.descText}>
                                        {product.description}
                                    </p>
                                </div>

                                {/* Trust/Delivery Badges */}
                                <div className={styles.trustGrid}>
                                    <div className={styles.trustBadge}>
                                        <div className={styles.trustIconWrap}><ShieldCheck size={16} strokeWidth={2.5} /></div>
                                        <span className={styles.trustText}>100% Original</span>
                                    </div>
                                    <div className={styles.trustBadge}>
                                        <div className={styles.trustIconWrap}><RefreshCw size={16} strokeWidth={2.5} /></div>
                                        <span className={styles.trustText}>14-Day Return</span>
                                    </div>
                                    <div className={styles.trustBadge}>
                                        <div className={styles.trustIconWrap}><Truck size={16} strokeWidth={2.5} /></div>
                                        <span className={styles.trustText}>Express Del.</span>
                                    </div>
                                    <div className={styles.trustBadge}>
                                        <div className={styles.trustIconWrap}>
                                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                        </div>
                                        <span className={styles.trustText}>Secure Pay</span>
                                    </div>
                                </div>
                            </div>

                            {/* Desktop Actions */}
                            <div className={styles.desktopActions}>
                                <motion.button
                                    whileHover={{ scale: product.stock > 0 ? 1.02 : 1 }}
                                    whileTap={{ scale: product.stock > 0 ? 0.98 : 1 }}
                                    onClick={() => product.stock > 0 && addToCart(product)}
                                    className={`${styles.btn} ${styles.btnYellow}`}
                                    disabled={product.stock === 0}
                                    style={{
                                        opacity: product.stock === 0 ? 0.5 : 1,
                                        cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                                        backgroundColor: product.stock === 0 ? '#E5E7EB' : '',
                                        borderColor: product.stock === 0 ? '#E5E7EB' : '',
                                        color: product.stock === 0 ? '#6B7280' : ''
                                    }}
                                >
                                    <ShoppingCart size={18} strokeWidth={2.5} />
                                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: product.stock > 0 ? 1.02 : 1 }}
                                    whileTap={{ scale: product.stock > 0 ? 0.98 : 1 }}
                                    onClick={() => { if (product.stock > 0) { addToCart(product); window.location.href = '/products/cart'; } }}
                                    className={`${styles.btn} ${styles.btnBlack}`}
                                    disabled={product.stock === 0}
                                    style={{
                                        opacity: product.stock === 0 ? 0.5 : 1,
                                        cursor: product.stock === 0 ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    <Zap size={18} strokeWidth={2.5} className="fill-current" />
                                    {product.stock === 0 ? 'Unavailable' : 'Buy Now'}
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
