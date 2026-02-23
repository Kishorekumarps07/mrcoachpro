'use client';

import React, { useState } from 'react';
import { useShop } from '@/app/products/context/ShopContext';
import { ArrowRight, ShoppingBag, Lock, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import './checkout.css';

import { initializeRazorpayPayment } from '@/utils/razorpaySetup';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
    const router = useRouter();
    const { cart, cartTotal, clearCart } = useShop();
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'upi' | 'cod'>('razorpay');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
    });

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();

        if (paymentMethod === 'cod') {
            toast.success('Order placed successfully (Cash on Delivery)');
            clearCart();
            router.push('/products/success'); // Assuming a success page exists
            return;
        }

        setIsProcessing(true);

        try {
            await initializeRazorpayPayment({
                amount: finalTotal,
                name: "Mr Coach Pro Shop",
                description: `Order for ${cart.length} items`,
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone,
                },
                onSuccess: (paymentId) => {
                    toast.success('Payment successful!');
                    clearCart();
                    window.location.href = `/products/success?payment_id=${paymentId}`;
                },
                onError: (error) => {
                    toast.error(error.message || 'Payment failed');
                    setIsProcessing(false);
                }
            });
        } catch (error) {
            console.error('Checkout error:', error);
            setIsProcessing(false);
        }
    };

    const taxAmount = cartTotal * 0.18;
    const finalTotal = cartTotal + taxAmount;

    if (cart.length === 0) {
        return (
            <div className="co-wrapper">
                <div className="co-container">
                    <div className="co-empty">
                        <ShoppingBag size={44} color="#CCC" strokeWidth={1.5} />
                        <h1>Nothing to Checkout</h1>
                        <p>Your cart is empty. Add items before proceeding.</p>
                        <Link href="/products">
                            <button className="co-submit-btn" style={{ maxWidth: '260px', margin: '0 auto' }}>
                                Shop Now <ArrowRight size={16} />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="co-wrapper">
            <div className="co-container">
                {/* Breadcrumb */}
                <div className="co-breadcrumb">
                    <Link href="/products">Retail</Link>
                    <span className="co-breadcrumb-sep">/</span>
                    <Link href="/products/cart">Cart</Link>
                    <span className="co-breadcrumb-sep">/</span>
                    <span className="co-breadcrumb-current">Checkout</span>
                </div>

                <motion.h1
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="co-headline"
                >
                    Secure Checkout
                </motion.h1>

                <form onSubmit={handleCheckout}>
                    <div className="co-layout">
                        {/* ── LEFT: Form ── */}
                        <div className="co-form-panel">

                            {/* Section 1: Contact */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 }}
                                className="co-section-card"
                            >
                                <div className="co-section-header">
                                    <span className="co-section-num">1</span>
                                    <span className="co-section-title">Contact Information</span>
                                </div>
                                <div className="co-field-grid">
                                    <div className="co-field-row">
                                        <div className="co-field">
                                            <label className="co-label">Full Name</label>
                                            <input
                                                name="name"
                                                type="text"
                                                required
                                                placeholder="John Doe"
                                                className="co-input"
                                                onChange={handleInput}
                                            />
                                        </div>
                                        <div className="co-field">
                                            <label className="co-label">Phone Number</label>
                                            <input
                                                name="phone"
                                                type="tel"
                                                required
                                                placeholder="+91 98765 43210"
                                                className="co-input"
                                                onChange={handleInput}
                                            />
                                        </div>
                                    </div>
                                    <div className="co-field">
                                        <label className="co-label">Email Address</label>
                                        <input
                                            name="email"
                                            type="email"
                                            required
                                            placeholder="you@example.com"
                                            className="co-input"
                                            onChange={handleInput}
                                        />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Section 2: Shipping */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="co-section-card"
                            >
                                <div className="co-section-header">
                                    <span className="co-section-num">2</span>
                                    <span className="co-section-title">Shipping Address</span>
                                </div>
                                <div className="co-field-grid">
                                    <div className="co-field">
                                        <label className="co-label">Street Address</label>
                                        <input
                                            name="address"
                                            type="text"
                                            required
                                            placeholder="123 Main Street, Apt 4B"
                                            className="co-input"
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div className="co-field-row">
                                        <div className="co-field">
                                            <label className="co-label">City</label>
                                            <input
                                                name="city"
                                                type="text"
                                                required
                                                placeholder="Mumbai"
                                                className="co-input"
                                                onChange={handleInput}
                                            />
                                        </div>
                                        <div className="co-field">
                                            <label className="co-label">State</label>
                                            <input
                                                name="state"
                                                type="text"
                                                required
                                                placeholder="Maharashtra"
                                                className="co-input"
                                                onChange={handleInput}
                                            />
                                        </div>
                                    </div>
                                    <div className="co-field">
                                        <label className="co-label">PIN Code</label>
                                        <input
                                            name="zip"
                                            type="text"
                                            required
                                            placeholder="400001"
                                            className="co-input"
                                            maxLength={6}
                                            onChange={handleInput}
                                        />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Section 3: Payment */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                                className="co-section-card"
                            >
                                <div className="co-section-header">
                                    <span className="co-section-num">3</span>
                                    <span className="co-section-title">Payment Method</span>
                                </div>
                                <div className="co-payment-methods">
                                    {[
                                        { key: 'razorpay', label: 'Card / Net Banking' },
                                        { key: 'upi', label: 'UPI / GPay' },
                                        { key: 'cod', label: 'Cash on Delivery' },
                                    ].map(({ key, label }) => (
                                        <button
                                            key={key}
                                            type="button"
                                            className={`co-payment-option${paymentMethod === key ? ' active' : ''}`}
                                            onClick={() => setPaymentMethod(key as typeof paymentMethod)}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                                <div className="co-payment-note">
                                    {paymentMethod === 'razorpay' && '🔒 Secure payment via Razorpay — Card, Net-Banking, Wallets'}
                                    {paymentMethod === 'upi' && '📱 Pay using UPI ID, Google Pay, PhonePe, or Paytm'}
                                    {paymentMethod === 'cod' && '📦 Pay with cash when your order arrives'}
                                </div>
                            </motion.div>

                            {/* Submit — desktop only; mobile uses sticky bar */}
                            <div className="co-submit-btn-wrapper">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <motion.button
                                        type="submit"
                                        disabled={isProcessing}
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="co-submit-btn"
                                    >
                                        <Lock size={15} strokeWidth={2.5} />
                                        {isProcessing ? 'Processing...' : `Place Order · ₹${Math.round(finalTotal).toLocaleString()}`}
                                        <ArrowRight size={15} strokeWidth={2.5} />
                                    </motion.button>
                                    <p className="co-secure-note">
                                        <Lock size={10} />
                                        SSL encrypted · Your data is safe
                                    </p>
                                </motion.div>
                            </div>
                        </div>

                        {/* ── RIGHT: Order Summary ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08 }}
                            className="co-summary-panel"
                        >
                            <h2 className="co-summary-title">Order Summary ({cart.length})</h2>

                            {/* Items */}
                            <div className="co-summary-items">
                                {cart.map(item => (
                                    <div key={item.id} className="co-summary-item">
                                        <div className="co-item-thumb">
                                            {item.images && item.images[0] ? (
                                                <img src={item.images[0]} alt={item.title} />
                                            ) : (
                                                <ShoppingBag size={18} color="#DDD" />
                                            )}
                                        </div>
                                        <div className="co-item-info">
                                            <div className="co-item-name">{item.title}</div>
                                            <div className="co-item-qty">Qty: {item.quantity}</div>
                                        </div>
                                        <div className="co-item-price">
                                            ₹{(item.price * item.quantity).toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Totals */}
                            <div className="co-summary-rows">
                                <div className="co-summary-row">
                                    <span>Subtotal</span>
                                    <span>₹{cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="co-summary-row">
                                    <span>Shipping</span>
                                    <span className="co-summary-free">Free · 3–5 Days</span>
                                </div>
                                <div className="co-summary-row">
                                    <span>GST (18%)</span>
                                    <span>₹{Math.round(taxAmount).toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="co-summary-total">
                                <span className="co-total-label">Total</span>
                                <span className="co-total-amount">₹{Math.round(finalTotal).toLocaleString()}</span>
                            </div>

                            {/* Trust */}
                            <div className="co-summary-trust">
                                <p className="co-trust-label">Accepted Payments</p>
                                <div className="co-trust-icons">
                                    <span className="co-trust-badge">Visa</span>
                                    <span className="co-trust-badge">MC</span>
                                    <span className="co-trust-badge">UPI</span>
                                    <span className="co-trust-badge">GPay</span>
                                    <span className="co-trust-badge">COD</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </form>
            </div>

            {/* Mobile sticky pay bar — hidden by default, shown via CSS on ≤767px */}
            <div className="co-mobile-pay-bar">
                <div className="co-mobile-total-info">
                    <div className="co-mobile-pay-label">Total</div>
                    <div className="co-mobile-pay-amount">₹{Math.round(finalTotal).toLocaleString()}</div>
                </div>
                <button
                    type="button"
                    className="co-mobile-pay-btn"
                    onClick={handleCheckout}
                >
                    <Lock size={14} />
                    Place Order
                </button>
            </div>
        </div>
    );
}
