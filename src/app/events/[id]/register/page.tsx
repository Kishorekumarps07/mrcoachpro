'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { EVENTS } from '@/data/events';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight, Check, MapPin, Shirt, Droplet } from 'lucide-react';
import styles from './registration.module.css';

export default function RegistrationPage() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const event = EVENTS.find(e => e.id === params.id);

    const [currentStep, setCurrentStep] = useState(1);

    // Initialize selected tier from URL or default to 0
    const initialTier = parseInt(searchParams.get('tier') || '0');

    const [formData, setFormData] = useState({
        // Step 1: Attendee Info
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        emergencyContact: '',
        emergencyPhone: '',

        // New Fields
        bloodGroup: '',
        location: '',

        // Step 2: Ticket Selection
        selectedTier: !isNaN(initialTier) ? initialTier : 0,
        quantity: 1,
        tshirtSizes: [''] as string[], // Changed to array
        addOns: [] as string[],

        // Step 3: Review
        agreeToTerms: false,
    });

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

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => {
            const updates = { ...prev, [field]: value };

            // If quantity changes, resize tshirtSizes array if needed
            if (field === 'quantity') {
                const newQuantity = value as number;
                const currentSizes = [...prev.tshirtSizes];

                // If increasing, pad with empty strings
                if (newQuantity > currentSizes.length) {
                    for (let i = currentSizes.length; i < newQuantity; i++) {
                        currentSizes.push('');
                    }
                }
                // If decreasing, trim (optional, but keeps data clean)
                else if (newQuantity < currentSizes.length) {
                    currentSizes.splice(newQuantity);
                }

                updates.tshirtSizes = currentSizes;
            }

            return updates;
        });
    };

    const handleTshirtChange = (index: number, value: string) => {
        setFormData(prev => {
            const newSizes = [...prev.tshirtSizes];
            newSizes[index] = value;
            return { ...prev, tshirtSizes: newSizes };
        });
    };

    // Ensure initial T-shirt array has at least one item
    useEffect(() => {
        if (formData.tshirtSizes.length === 0) {
            setFormData(prev => ({ ...prev, tshirtSizes: [''] }));
        }
    }, []);

    const handleNext = () => {
        // Validation for Step 1
        if (currentStep === 1) {
            if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone ||
                !formData.emergencyContact || !formData.emergencyPhone ||
                !formData.bloodGroup || !formData.location) {
                alert('Please fill in all required fields');
                return;
            }
        }

        // Validation for Step 2
        if (currentStep === 2) {
            // Check if all T-shirt sizes are selected
            const unfilledTshirts = formData.tshirtSizes.slice(0, formData.quantity).some(size => !size);
            if (unfilledTshirts) {
                alert(`Please select T-Shirt sizes for all ${formData.quantity} tickets.`);
                return;
            }
        }

        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleSubmit = () => {
        if (!formData.agreeToTerms) {
            alert('Please agree to the terms and conditions');
            return;
        }
        // Navigate to payment page
        router.push(`/events/${event.id}/payment`);
    };

    const selectedTier = event.pricingTiers[formData.selectedTier];
    const totalPrice = selectedTier ?
        (parseInt(selectedTier.price.replace(/[^0-9]/g, '')) || 0) * formData.quantity : 0;

    return (
        <main className={styles.main}>
            <Navbar />

            <div className={styles.container}>
                <div className={styles.header}>
                    <button onClick={() => router.back()} className={styles.backButton}>
                        <ChevronLeft size={20} />
                        Back to Event
                    </button>
                    <h1 className={styles.title}>Register for {event.title}</h1>
                    <p className={styles.subtitle}>{event.date} • {event.location}</p>
                </div>

                {/* Progress Indicator */}
                <div className={styles.progressBar}>
                    {[1, 2, 3].map((step) => (
                        <div key={step} className={styles.progressStep}>
                            <div className={`${styles.progressCircle} ${currentStep >= step ? styles.active : ''}`}>
                                {currentStep > step ? <Check size={16} /> : step}
                            </div>
                            <span className={styles.progressLabel}>
                                {step === 1 ? 'Your Info' : step === 2 ? 'Select Tickets' : 'Review'}
                            </span>
                        </div>
                    ))}
                </div>

                <div className={styles.contentGrid}>
                    {/* Form Section */}
                    <div className={styles.formSection}>
                        {/* Step 1: Attendee Information */}
                        {currentStep === 1 && (
                            <div className={styles.step}>
                                <h2 className={styles.stepTitle}>Attendee Information</h2>
                                <p className={styles.stepVibe}>Please provide your details for registration.</p>
                                <div className={styles.formGrid}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>First Name *</label>
                                        <input
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                                            className={styles.input}
                                            required
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Last Name *</label>
                                        <input
                                            type="text"
                                            value={formData.lastName}
                                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                                            className={styles.input}
                                            required
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Email Address *</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className={styles.input}
                                            required
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Phone Number *</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            className={styles.input}
                                            required
                                        />
                                    </div>

                                    {/* New Required Fields */}
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Blood Group *</label>
                                        <div className={styles.inputIconWrapper}>
                                            <Droplet size={16} className={styles.inputIcon} />
                                            <select
                                                value={formData.bloodGroup}
                                                onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                                                className={styles.selectInput}
                                                required
                                            >
                                                <option value="">Select Blood Group</option>
                                                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                                                    <option key={bg} value={bg}>{bg}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Current City / Location *</label>
                                        <div className={styles.inputIconWrapper}>
                                            <MapPin size={16} className={styles.inputIcon} />
                                            <input
                                                type="text"
                                                value={formData.location}
                                                onChange={(e) => handleInputChange('location', e.target.value)}
                                                className={styles.inputWithIcon}
                                                placeholder="e.g. Mumbai, Bandra"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Emergency Contact Name *</label>
                                        <input
                                            type="text"
                                            value={formData.emergencyContact}
                                            onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                                            className={styles.input}
                                            required
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Emergency Contact Phone *</label>
                                        <input
                                            type="tel"
                                            value={formData.emergencyPhone}
                                            onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                                            className={styles.input}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Ticket Selection */}
                        {currentStep === 2 && (
                            <div className={styles.step}>
                                <h2 className={styles.stepTitle}>Select Your Ticket</h2>
                                <p className={styles.stepVibe}>Choose the best package for your experience.</p>

                                <div className={styles.ticketOptions}>
                                    {event.pricingTiers.map((tier, index) => (
                                        <div
                                            key={index}
                                            className={`${styles.ticketOption} ${formData.selectedTier === index ? styles.selected : ''}`}
                                            onClick={() => handleInputChange('selectedTier', index)}
                                        >
                                            <div className={styles.ticketHeader}>
                                                <div className={styles.radioButton}>
                                                    <div className={styles.radioInner} />
                                                </div>
                                                <div className={styles.ticketInfoMain}>
                                                    <h3 className={styles.ticketName}>{tier.name}</h3>
                                                    <p className={styles.ticketPrice}>{tier.price}</p>
                                                </div>
                                            </div>
                                            <p className={styles.ticketDescription}>{tier.description}</p>
                                            <div className={styles.divider} />
                                            <ul className={styles.ticketFeatures}>
                                                {tier.features.map((feature, idx) => (
                                                    <li key={idx}><Check size={14} className={styles.check} /> {feature}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.quantitySection}>
                                    <label className={styles.label}>Number of Tickets</label>
                                    <div className={styles.quantityControl}>
                                        <button
                                            className={styles.qtyBtn}
                                            onClick={() => handleInputChange('quantity', Math.max(1, formData.quantity - 1))}
                                        >-</button>
                                        <span className={styles.qtyValue}>{formData.quantity}</span>
                                        <button
                                            className={styles.qtyBtn}
                                            onClick={() => handleInputChange('quantity', Math.min(10, formData.quantity + 1))}
                                        >+</button>
                                    </div>
                                </div>

                                {/* Dynamic T-Shirt Selection */}
                                <div style={{ marginTop: '32px' }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', color: '#1a1a1a' }}>Participant T-Shirt Sizes</h3>
                                    <div className={styles.formGrid}>
                                        {Array.from({ length: formData.quantity }).map((_, index) => (
                                            <div key={index} className={styles.formGroup}>
                                                <label className={styles.label}>Size for Ticket #{index + 1} *</label>
                                                <div className={styles.inputIconWrapper}>
                                                    <Shirt size={16} className={styles.inputIcon} />
                                                    <select
                                                        value={formData.tshirtSizes[index] || ''}
                                                        onChange={(e) => handleTshirtChange(index, e.target.value)}
                                                        className={styles.selectInput}
                                                        required
                                                    >
                                                        <option value="">Select Size</option>
                                                        {['XS - 36', 'S - 38', 'M - 40', 'L - 42', 'XL - 44', 'XXL - 46'].map(size => (
                                                            <option key={size} value={size}>{size}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Review & Confirm */}
                        {currentStep === 3 && (
                            <div className={styles.step}>
                                <h2 className={styles.stepTitle}>Review Your Registration</h2>
                                <div className={styles.reviewSection}>
                                    <div className={styles.reviewGroup}>
                                        <h3 className={styles.reviewTitle}>Attendee Information</h3>
                                        <div className={styles.reviewGrid}>
                                            <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                                            <p><strong>Email:</strong> {formData.email}</p>
                                            <p><strong>Phone:</strong> {formData.phone}</p>
                                            <p><strong>Blood Group:</strong> {formData.bloodGroup}</p>
                                            <p><strong>Location:</strong> {formData.location}</p>
                                            <p><strong>Emergency Contact:</strong> {formData.emergencyContact} ({formData.emergencyPhone})</p>
                                        </div>
                                    </div>
                                    <div className={styles.reviewGroup}>
                                        <h3 className={styles.reviewTitle}>Ticket Details</h3>
                                        <div className={styles.ticketReviewCard}>
                                            <div className={styles.ticketReviewHeader}>
                                                <span className={styles.ticketReviewName}>{selectedTier?.name}</span>
                                                <span className={styles.ticketReviewPrice}>{selectedTier?.price} x {formData.quantity}</span>
                                            </div>
                                            <div style={{ marginTop: '12px', padding: '12px 0', borderTop: '1px solid #EEE' }}>
                                                <p style={{ fontWeight: 600, marginBottom: '8px', fontSize: '0.9rem' }}>Selected T-Shirt Sizes:</p>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                                    {formData.tshirtSizes.slice(0, formData.quantity).map((size, idx) => (
                                                        <span key={idx} style={{
                                                            background: '#EEE',
                                                            padding: '4px 8px',
                                                            borderRadius: '4px',
                                                            fontSize: '0.85rem',
                                                            fontWeight: 500
                                                        }}>
                                                            #{idx + 1}: {size}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className={styles.ticketReviewTotal} style={{ marginTop: '16px' }}>Total: ₹{totalPrice.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className={styles.termsGroup}>
                                        <label className={styles.checkboxLabel}>
                                            <input
                                                type="checkbox"
                                                checked={formData.agreeToTerms}
                                                onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                                                className={styles.checkbox}
                                            />
                                            <span>I agree to the terms and conditions and cancellation policy</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className={styles.navigation}>
                            {currentStep > 1 && (
                                <Button variant="secondary" onClick={handleBack}>
                                    <ChevronLeft size={18} />
                                    Back
                                </Button>
                            )}
                            {currentStep < 3 ? (
                                <Button onClick={handleNext} className={styles.nextButton}>
                                    Next
                                    <ChevronRight size={18} />
                                </Button>
                            ) : (
                                <Button onClick={handleSubmit} className={styles.nextButton}>
                                    Proceed to Payment
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Summary Sidebar */}
                    <aside className={styles.sidebar}>
                        <div className={styles.summaryCard}>
                            <h3 className={styles.summaryTitle}>Order Summary</h3>
                            <div className={styles.summaryItem}>
                                <span>Ticket Type:</span>
                                <span>{selectedTier?.name || 'Not selected'}</span>
                            </div>
                            <div className={styles.summaryItem}>
                                <span>Quantity:</span>
                                <span>{formData.quantity}</span>
                            </div>
                            <div className={styles.summaryItem}>
                                <span>Price per ticket:</span>
                                <span>{selectedTier?.price || '₹0'}</span>
                            </div>
                            <div className={styles.summaryDivider} />
                            <div className={styles.summaryTotal}>
                                <span>Total:</span>
                                <span>₹{totalPrice.toLocaleString()}</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
