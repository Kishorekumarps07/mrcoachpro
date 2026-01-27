'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { EVENTS } from '@/data/events';
import { Button } from '@/components/ui/Button';
import { CreditCard, Smartphone, Wallet, Lock, ChevronLeft } from 'lucide-react';
import styles from './payment.module.css';

export default function PaymentPage() {
    const params = useParams();
    const router = useRouter();
    const event = EVENTS.find(e => e.id === params.id);

    const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'wallet'>('card');
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
    });
    const [upiId, setUpiId] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    if (!event) {
        return (
            <main className={styles.main}>
                <Navbar />
                <div className={styles.container}>
                    <h1>Event Not Found</h1>
                    <Button onClick={() => router.push('/events')}>Back to Events</Button>
                </div>
            </main>
        );
    }

    const handlePayment = async () => {
        if (!agreeToTerms) {
            alert('Please agree to the terms and conditions');
            return;
        }

        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            router.push(`/events/${event.id}/payment/success`);
        }, 2000);
    };

    // Mock order details
    const orderDetails = {
        ticketType: event.pricingTiers[0].name,
        quantity: 1,
        pricePerTicket: parseInt(event.pricingTiers[0].price.replace(/[^0-9]/g, '')) || 1500,
    };

    const subtotal = orderDetails.pricePerTicket * orderDetails.quantity;
    const processingFee = Math.round(subtotal * 0.02);
    const total = subtotal + processingFee;

    return (
        <main className={styles.main}>
            <Navbar />

            <div className={styles.container}>
                <div className={styles.header}>
                    <button onClick={() => router.back()} className={styles.backButton}>
                        <ChevronLeft size={20} />
                        Back to Registration
                    </button>
                    <h1 className={styles.title}>Complete Your Payment</h1>
                    <p className={styles.subtitle}>Secure checkout for {event.title}</p>
                </div>

                <div className={styles.contentGrid}>
                    {/* Payment Section */}
                    <div className={styles.paymentSection}>
                        {/* Payment Method Selection */}
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Select Payment Method</h2>
                            <div className={styles.paymentMethods}>
                                <button
                                    className={`${styles.paymentMethod} ${paymentMethod === 'card' ? styles.active : ''}`}
                                    onClick={() => setPaymentMethod('card')}
                                >
                                    <CreditCard size={24} />
                                    <span>Credit/Debit Card</span>
                                </button>
                                <button
                                    className={`${styles.paymentMethod} ${paymentMethod === 'upi' ? styles.active : ''}`}
                                    onClick={() => setPaymentMethod('upi')}
                                >
                                    <Smartphone size={24} />
                                    <span>UPI</span>
                                </button>
                                <button
                                    className={`${styles.paymentMethod} ${paymentMethod === 'wallet' ? styles.active : ''}`}
                                    onClick={() => setPaymentMethod('wallet')}
                                >
                                    <Wallet size={24} />
                                    <span>Wallet</span>
                                </button>
                            </div>
                        </div>

                        {/* Payment Form */}
                        <div className={styles.section}>
                            {paymentMethod === 'card' && (
                                <div className={styles.cardForm}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Card Number</label>
                                        <input
                                            type="text"
                                            placeholder="1234 5678 9012 3456"
                                            value={cardDetails.cardNumber}
                                            onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                                            className={styles.input}
                                            maxLength={19}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Cardholder Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            value={cardDetails.cardName}
                                            onChange={(e) => setCardDetails({ ...cardDetails, cardName: e.target.value })}
                                            className={styles.input}
                                        />
                                    </div>
                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Expiry Date</label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                value={cardDetails.expiryDate}
                                                onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                                                className={styles.input}
                                                maxLength={5}
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>CVV</label>
                                            <input
                                                type="text"
                                                placeholder="123"
                                                value={cardDetails.cvv}
                                                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                                className={styles.input}
                                                maxLength={3}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {paymentMethod === 'upi' && (
                                <div className={styles.upiForm}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>UPI ID</label>
                                        <input
                                            type="text"
                                            placeholder="yourname@upi"
                                            value={upiId}
                                            onChange={(e) => setUpiId(e.target.value)}
                                            className={styles.input}
                                        />
                                    </div>
                                    <p className={styles.upiNote}>
                                        You will receive a payment request on your UPI app
                                    </p>
                                </div>
                            )}

                            {paymentMethod === 'wallet' && (
                                <div className={styles.walletForm}>
                                    <p className={styles.walletNote}>
                                        Select your preferred wallet to continue
                                    </p>
                                    <div className={styles.walletOptions}>
                                        <button className={styles.walletOption}>Paytm</button>
                                        <button className={styles.walletOption}>PhonePe</button>
                                        <button className={styles.walletOption}>Google Pay</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Terms */}
                        <div className={styles.termsSection}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={agreeToTerms}
                                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                                    className={styles.checkbox}
                                />
                                <span>I agree to the terms and conditions and cancellation policy</span>
                            </label>
                        </div>

                        {/* Pay Button */}
                        <Button
                            fullWidth
                            size="lg"
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className={styles.payButton}
                        >
                            <Lock size={18} />
                            {isProcessing ? 'Processing...' : `Pay ₹${total.toLocaleString()}`}
                        </Button>

                        <p className={styles.secureNote}>
                            <Lock size={14} />
                            Your payment information is secure and encrypted
                        </p>
                    </div>

                    {/* Order Summary Sidebar */}
                    <aside className={styles.sidebar}>
                        <div className={styles.summaryCard}>
                            <h3 className={styles.summaryTitle}>Order Summary</h3>
                            <div className={styles.eventInfo}>
                                <h4 className={styles.eventName}>{event.title}</h4>
                                <p className={styles.eventDate}>{event.date} • {event.time}</p>
                                <p className={styles.eventLocation}>{event.location}</p>
                            </div>
                            <div className={styles.summaryDivider} />
                            <div className={styles.summaryItem}>
                                <span>Ticket Type:</span>
                                <span>{orderDetails.ticketType}</span>
                            </div>
                            <div className={styles.summaryItem}>
                                <span>Quantity:</span>
                                <span>{orderDetails.quantity}</span>
                            </div>
                            <div className={styles.summaryItem}>
                                <span>Subtotal:</span>
                                <span>₹{subtotal.toLocaleString()}</span>
                            </div>
                            <div className={styles.summaryItem}>
                                <span>Processing Fee:</span>
                                <span>₹{processingFee.toLocaleString()}</span>
                            </div>
                            <div className={styles.summaryDivider} />
                            <div className={styles.summaryTotal}>
                                <span>Total:</span>
                                <span>₹{total.toLocaleString()}</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
