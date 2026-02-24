'use client';

import React, { useState } from 'react';
import { useShop } from '@/app/products/context/ShopContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft, X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import './cart-premium.css';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useShop();
    const [couponCode, setCouponCode] = useState('');

    const taxAmount = cartTotal * 0.18;
    const finalTotal = cartTotal + taxAmount;

    return (
        <div className="cart-premium-wrapper">
            {/* MOBILE NAVIGATION HEADER */}
            <div className="cart-mobile-nav">
                <Link href="/products" className="mobile-nav-back">
                    <ArrowLeft size={20} strokeWidth={2.5} />
                    <span>Back to shopping</span>
                </Link>
                <Link href="/products" className="mobile-nav-close" aria-label="Close Cart">
                    <X size={24} strokeWidth={2.5} />
                </Link>
            </div>

            {cart.length === 0 ? (
                <div className="flex items-center justify-center" style={{ minHeight: '60vh' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="cart-empty-elite"
                    >
                        <motion.div
                            className="empty-icon-wrap"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <ShoppingBag size={44} strokeWidth={1.5} color="#CCCCCC" />
                        </motion.div>
                        <h2 className="empty-title">Your Cart is Empty</h2>
                        <p className="empty-subtitle">Looks like you haven't added any gear yet.</p>
                        <Link href="/products">
                            <motion.button
                                whileHover={{ scale: 1.04, y: -3 }}
                                whileTap={{ scale: 0.96 }}
                                className="checkout-btn-elite"
                                style={{ maxWidth: '280px', margin: '0 auto' }}
                            >
                                Start Shopping <ArrowRight size={16} />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            ) : (
                <div className="cart-container">
                    {/* Breadcrumb */}
                    <div className="cart-breadcrumb">
                        <Link href="/products" className="">Retail</Link>
                        <span className="cart-breadcrumb-sep">/</span>
                        <span className="cart-breadcrumb-current">Cart</span>
                    </div>

                    <motion.h1
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="cart-headline"
                    >
                        Your Cart <span className="cart-count-pill">[{cart.length}]</span>
                    </motion.h1>
                    {/* Two-column desktop layout */}
                    <div className="cart-layout">
                        {/* ── LEFT: Items ── */}
                        <div className="cart-items-column">
                            <AnimatePresence mode="popLayout">
                                {cart.map((item, idx) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 24 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -24, scale: 0.97 }}
                                        transition={{ duration: 0.35, delay: idx * 0.04, ease: [0.23, 1, 0.32, 1] }}
                                        className="cart-item-card"
                                    >
                                        {/* Image */}
                                        <div className="cart-item-img-wrap">
                                            {item.images && item.images[0] ? (
                                                <img src={item.images[0]} alt={item.title} className="cart-item-img" />
                                            ) : (
                                                <ShoppingBag size={28} color="#DDD" />
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="cart-item-info">
                                            <span className="cart-item-category">{item.category}</span>
                                            <h3>{item.title}</h3>

                                            {/* Quantity */}
                                            <div className="cart-qty-outer">
                                                <button
                                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                    className="cart-qty-btn"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus size={12} strokeWidth={2.5} />
                                                </button>
                                                <span className="cart-qty-val">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="cart-qty-btn"
                                                >
                                                    <Plus size={12} strokeWidth={2.5} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Price + Remove */}
                                        <div className="cart-item-price-wrap">
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="cart-remove-btn"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 size={16} strokeWidth={2} />
                                            </button>
                                            <div>
                                                <div className="cart-price-tag">
                                                    ₹{(item.price * item.quantity).toLocaleString()}
                                                </div>
                                                {item.quantity > 1 && (
                                                    <div className="cart-unit-price">
                                                        ₹{item.price.toLocaleString()} each
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* Continue Shopping */}
                            <Link href="/products" className="cart-continue-link">
                                <ArrowLeft size={14} strokeWidth={2.5} />
                                Continue Shopping
                            </Link>
                        </div>

                        {/* ── RIGHT: Order Summary (desktop only) ── */}
                        <div className="cart-summary-panel-wrapper">
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="cart-summary-panel"
                            >
                                <h2 className="cart-summary-title">Order Summary</h2>

                                {/* Coupon Code */}
                                <div className="cart-coupon-row">
                                    <input
                                        type="text"
                                        placeholder="Coupon Code"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                        className="cart-coupon-input"
                                    />
                                    <button className="cart-coupon-apply-btn">Apply</button>
                                </div>

                                {/* Rows */}
                                <div className="cart-summary-rows">
                                    <div className="summary-row">
                                        <span>Subtotal</span>
                                        <span>₹{cartTotal.toLocaleString()}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>Shipping</span>
                                        <span className="summary-free-tag">Free · 3–5 days</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>GST (18%)</span>
                                        <span>₹{Math.round(taxAmount).toLocaleString()}</span>
                                    </div>

                                    <div className="summary-row total">
                                        <span>Total</span>
                                        <span className="summary-total-amount">
                                            ₹{Math.round(finalTotal).toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                <Link href="/products/checkout">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="checkout-btn-elite"
                                    >
                                        Secure Checkout
                                        <ArrowRight size={16} strokeWidth={2.5} />
                                    </motion.button>
                                </Link>

                                {/* Trust Badges */}
                                <div className="cart-trust-row">
                                    <p className="cart-trust-label">Secured & Encrypted</p>
                                    <div className="cart-trust-badges">
                                        <span className="cart-trust-badge">Visa</span>
                                        <span className="cart-trust-badge">Mastercard</span>
                                        <span className="cart-trust-badge">UPI</span>
                                        <span className="cart-trust-badge">GPay</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── MOBILE STICKY CHECKOUT BAR ── */}
            <div className="cart-mobile-sticky-bar">
                <div className="cart-mobile-sticky-content">
                    <div className="cart-mobile-total-section">
                        <div className="cart-mobile-total-label">Total</div>
                        <div className="cart-mobile-total-amount">
                            ₹{Math.round(finalTotal).toLocaleString()}
                        </div>
                    </div>
                    <Link href="/products/checkout" style={{ flex: 1 }}>
                        <button className="checkout-btn-mobile">
                            Checkout <ArrowRight size={16} />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
