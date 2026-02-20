'use client';

import React from 'react';
import { useShop } from '@/app/products/context/ShopContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ChevronRight, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import './cart-premium.css';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useShop();

    if (cart.length === 0) {
        return (
            <div className="cart-premium-wrapper flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="cart-empty-elite"
                >
                    <div className="empty-icon-wrap">
                        <ShoppingBag size={48} className="text-gray-200" />
                    </div>
                    <h2 className="empty-title">Your Cart is Empty</h2>
                    <p className="empty-subtitle">Looks like you haven't added any gear yet.</p>
                    <Link href="/products">
                        <motion.button
                            whileHover={{ scale: 1.05, y: -4 }}
                            whileTap={{ scale: 0.95 }}
                            className="checkout-btn-elite"
                            style={{ maxWidth: '300px', margin: '0 auto' }}
                        >
                            Start Shopping <ArrowRight size={18} />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    const taxAmount = cartTotal * 0.18;
    const finalTotal = cartTotal + taxAmount;

    return (
        <div className="cart-premium-wrapper">
            <div className="cart-container">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-3 mb-10 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                    <Link href="/products" className="hover:text-black transition-colors">Retail</Link>
                    <span className="opacity-30">/</span>
                    <span className="text-black">Cart</span>
                </div>

                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="cart-headline"
                >
                    Your Cart <span className="cart-count-pill">[{cart.length}]</span>
                </motion.h1>

                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    {/* Cart Items List */}
                    <div className="flex-1 w-full space-y-4">
                        <AnimatePresence mode='popLayout'>
                            {cart.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.23, 1, 0.32, 1] }}
                                    className="cart-item-card group"
                                >
                                    {/* Image */}
                                    <div className="cart-item-img-wrap">
                                        {item.images && item.images[0] ? (
                                            <img
                                                src={item.images[0]}
                                                alt={item.title}
                                                className="cart-item-img"
                                            />
                                        ) : (
                                            <div className="text-[10px] font-black text-gray-200">NO IMG</div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="cart-item-info">
                                        <span className="cart-item-category">{item.category}</span>
                                        <h3>{item.title}</h3>

                                        <div className="cart-qty-outer">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                    className="cart-qty-btn"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus size={14} strokeWidth={2.5} />
                                                </button>
                                                <span className="cart-qty-val">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="cart-qty-btn"
                                                >
                                                    <Plus size={14} strokeWidth={2.5} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Price and Remove */}
                                    <div className="cart-item-price-wrap">
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="cart-remove-btn"
                                        >
                                            <Trash2 size={20} strokeWidth={2} />
                                        </button>
                                        <div className="cart-price-tag">
                                            ₹{(item.price * item.quantity).toLocaleString()}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:w-[420px] w-full"
                    >
                        <div className="cart-summary-panel">
                            <h2 className="cart-summary-title">Summary</h2>

                            <div className="space-y-5">
                                <div className="summary-row">
                                    <span>Subtotal</span>
                                    <span>₹{cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Shipping</span>
                                    <span className="text-black font-black">COMPLIMENTARY</span>
                                </div>
                                <div className="summary-row">
                                    <span>Estimated Tax (GST)</span>
                                    <span>₹{taxAmount.toLocaleString()}</span>
                                </div>

                                <div className="summary-row total">
                                    <span>Total</span>
                                    <span>₹{finalTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="checkout-btn-elite shadow-2xl"
                            >
                                Secure Checkout
                                <ArrowRight size={18} strokeWidth={2.5} />
                            </motion.button>

                            <div className="mt-8 text-center">
                                <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold mb-4">
                                    Elite Protection Guaranteed
                                </p>
                                <div className="flex justify-center gap-4 grayscale opacity-20">
                                    <div className="w-8 h-5 bg-black rounded-sm" />
                                    <div className="w-8 h-5 bg-black rounded-sm" />
                                    <div className="w-8 h-5 bg-black rounded-sm" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
