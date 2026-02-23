'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { eventService } from '@/services/eventService';
import { Event } from '@/data/events';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight, Check, MapPin, Shirt, Droplet, Lock } from 'lucide-react';
import styles from './registration.module.css';
import { initializeRazorpayPayment } from '@/utils/razorpaySetup';
import toast from 'react-hot-toast';

export default function RegistrationPage() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [event, setEvent] = useState<Event | null>(null);
    const [isLoadingEvent, setIsLoadingEvent] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch Event Data
    useEffect(() => {
        const fetchEvent = async () => {
            if (params.id) {
                const data = await eventService.getEventById(params.id as string);
                setEvent(data);
                setIsLoadingEvent(false);
            }
        };
        fetchEvent();
    }, [params.id]);

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
        participants: [{ name: '', ageCategory: 'adult', tshirtSize: '' }] as Array<{ name: string; ageCategory: 'adult' | 'kid'; tshirtSize: string }>,
        addOns: [] as string[],

        // Step 3: Review
        agreeToTerms: false,
    });

    // Handle early loading/error states
    if (isLoadingEvent) {
        return (
            <main className={styles.main}>
                <Navbar />
                <div className={styles.container} style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
                    <div className="spinner"></div>
                    <p>Loading event details...</p>
                </div>
            </main>
        );
    }

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

    const isSoldOut = event.spotsLeft <= 0;
    const isRegistrationClosed = new Date(event.registrationDeadline) < new Date();

    if (isSoldOut || isRegistrationClosed) {
        return (
            <main className={styles.main}>
                <Navbar />
                <div className={styles.container}>
                    <div className={styles.header}>
                        <button onClick={() => router.back()} className={styles.backButton}>
                            <ChevronLeft size={20} />
                            Back to Event
                        </button>
                        <h1 className={styles.title}>{event.title}</h1>
                        <p className={styles.subtitle}>{event.date} • {event.location}</p>
                    </div>
                    <div style={{ textAlign: 'center', padding: '60px 0' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '16px', color: '#d32f2f' }}>
                            {isSoldOut ? 'Event Sold Out' : 'Registration Closed'}
                        </h2>
                        <p style={{ color: '#666', marginBottom: '24px' }}>
                            {isSoldOut
                                ? 'We are fully booked! Please check back later for potential openings or future events.'
                                : `Registration for this event closed on ${event.registrationDeadline}.`
                            }
                        </p>
                        <Button onClick={() => router.push('/events')}>Explore Other Events</Button>
                    </div>
                </div>
            </main>
        );
    }

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => {
            const updates = { ...prev, [field]: value };

            // If quantity changes, resize participants array
            if (field === 'quantity') {
                const newQuantity = value as number;
                const currentParticipants = [...prev.participants];

                // If increasing, add new participants
                if (newQuantity > currentParticipants.length) {
                    for (let i = currentParticipants.length; i < newQuantity; i++) {
                        currentParticipants.push({ name: '', ageCategory: 'adult', tshirtSize: '' });
                    }
                }
                // If decreasing, trim
                else if (newQuantity < currentParticipants.length) {
                    currentParticipants.splice(newQuantity);
                }

                updates.participants = currentParticipants;
            }

            return updates;
        });
    };

    const handleParticipantChange = (index: number, field: 'name' | 'ageCategory' | 'tshirtSize', value: string) => {
        setFormData(prev => {
            const newParticipants = [...prev.participants];
            newParticipants[index] = { ...newParticipants[index], [field]: value };
            return { ...prev, participants: newParticipants };
        });
    };

    const handleNext = () => {
        // Validation for Step 1
        if (currentStep === 1) {
            if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone ||
                !formData.bloodGroup || !formData.location) {
                alert('Please fill in all required fields');
                return;
            }
        }

        // Validation for Step 2
        if (currentStep === 2) {
            // Check if all participant details are filled
            // For T-shirt logic: check if T-shirt is required for the selected tier
            const tier = event.pricingTiers[formData.selectedTier];
            const needsTshirt = tier?.isTshirtRequired;

            const unfilledParticipants = formData.participants.slice(0, formData.quantity).some(p => {
                const nameMissing = !p.name;
                const tshirtMissing = needsTshirt && !p.tshirtSize;
                return nameMissing || tshirtMissing;
            });

            if (unfilledParticipants) {
                alert(`Please provide name${tier?.isTshirtRequired ? ' and T-shirt size' : ''} for all ${formData.quantity} participants.`);
                return;
            }
        }

        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const selectedTier = event.pricingTiers[formData.selectedTier] || event.pricingTiers[0];

    // Calculate total price based on individual participant age category
    const totalPrice = formData.participants.slice(0, formData.quantity).reduce((sum, p) => {
        const price = p.ageCategory === 'adult' ? (selectedTier.adultPrice || 0) : (selectedTier.childPrice || 0);
        return sum + price;
    }, 0);

    const handleSubmit = async () => {
        if (!formData.agreeToTerms) {
            toast.error('Please agree to the terms and conditions');
            return;
        }

        setIsSubmitting(true);

        try {
            // 1. Create Order on Backend first (this is simulated in eventService.createOrder)
            // But for a robust integration, we should call our generic razorpay order API
            // OR use the eventService.createOrder if it returns a razorpay order ID.

            // Looking at the existing code, eventService.createOrder seems to handle the database part.
            const payload = {
                event_id: parseInt(event.id) || 0,
                user_id: 0, // Guest Checkout
                user_name: `${formData.firstName} ${formData.lastName}`.trim(),
                user_email: formData.email,
                user_phone: formData.phone,
                user_address: formData.location,
                total_amount: totalPrice,
                payment_provider: "Razorpay",
                attendees: formData.participants.slice(0, formData.quantity).map(p => ({
                    ticket_id: selectedTier?.id || 0,
                    name: p.name,
                    age_group: p.ageCategory,
                    tshirt_size: p.tshirtSize || 'NA'
                }))
            };

            const response = await eventService.createOrder(payload);

            if (response.success) {
                // Now trigger Razorpay payment
                await initializeRazorpayPayment({
                    amount: totalPrice,
                    name: "Mr Coach Pro Events",
                    description: `Registration for ${event.title}`,
                    prefill: {
                        name: `${formData.firstName} ${formData.lastName}`,
                        email: formData.email,
                        contact: formData.phone,
                    },
                    onSuccess: async (paymentId: string) => {
                        toast.success('Payment successful!');
                        const orderId = response.data?.data?.order_id;

                        if (orderId) {
                            const paymentPayload = {
                                payment_status: "success",
                                payment_provider: "Razorpay",
                                payment_id: paymentId,
                                payment_signature: "verified_by_frontend" // In reality, the utility verifies it
                            };
                            try {
                                await eventService.confirmPayment(orderId, paymentPayload);
                            } catch (err) {
                                console.warn('Payment confirmation warning:', err);
                            }
                            router.push(`/events/${event.id}/payment/success?orderId=${orderId}`);
                        } else {
                            router.push(`/events/${event.id}/payment/success`);
                        }
                    },
                    onError: (error: any) => {
                        toast.error(error.message || 'Payment failed');
                        setIsSubmitting(false);
                    }
                });
            } else {
                toast.error(`Registration failed: ${response.message}`);
                setIsSubmitting(false);
            }

        } catch (error) {
            console.error('Registration Error:', error);
            toast.error('An unexpected error occurred. Please try again.');
            setIsSubmitting(false);
        }
    };

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
                                {step === 1 ? 'Your Info' : step === 2 ? 'Select Tickets' : 'Review & Pay'}
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

                                    <div className={styles.emergencySection}>
                                        <h3 className={styles.emergencySectionTitle}>Emergency Contact (Optional)</h3>
                                        <p className={styles.emergencySectionSubtitle}>Provide contact details for emergencies</p>
                                        <div className={styles.emergencyFields}>
                                            <div className={styles.formGroup}>
                                                <label className={styles.label}>Contact Name</label>
                                                <input
                                                    type="text"
                                                    value={formData.emergencyContact}
                                                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                                                    className={styles.input}
                                                />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label className={styles.label}>Contact Phone</label>
                                                <input
                                                    type="tel"
                                                    value={formData.emergencyPhone}
                                                    onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                                                    className={styles.input}
                                                />
                                            </div>
                                        </div>
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
                                                {tier.features?.map((feature, idx) => (
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

                                <div style={{ marginTop: '32px' }}>
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '24px', color: '#1a1a1a' }}>Participant Details</h3>
                                    <div className={styles.participantsContainer}>
                                        {Array.from({ length: formData.quantity }).map((_, index) => (
                                            <div key={index} className={styles.participantCard}>
                                                <div className={styles.ageCategorySelector}>
                                                    <button
                                                        type="button"
                                                        className={`${styles.ageCategoryBtn} ${formData.participants[index]?.ageCategory === 'adult' ? styles.active : ''}`}
                                                        onClick={() => handleParticipantChange(index, 'ageCategory', 'adult')}
                                                    >
                                                        Adult
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className={`${styles.ageCategoryBtn} ${formData.participants[index]?.ageCategory === 'kid' ? styles.active : ''}`}
                                                        onClick={() => handleParticipantChange(index, 'ageCategory', 'kid')}
                                                    >
                                                        Kid
                                                    </button>
                                                </div>

                                                <h4 className={styles.participantTitle}>Participant #{index + 1}</h4>

                                                <div className={styles.formGroup}>
                                                    <label className={styles.label}>Full Name *</label>
                                                    <input
                                                        type="text"
                                                        value={formData.participants[index]?.name || ''}
                                                        onChange={(e) => handleParticipantChange(index, 'name', e.target.value)}
                                                        className={styles.input}
                                                        placeholder="Enter participant's name"
                                                        required
                                                    />
                                                </div>

                                                {/* Dynamic Pricing Display */}
                                                <p className={styles.ticketPrice} style={{ fontSize: '0.9rem', color: '#666', marginBottom: '12px' }}>
                                                    Price: ₹{(formData.participants[index]?.ageCategory === 'adult' ? selectedTier.adultPrice : selectedTier.childPrice)?.toLocaleString()}
                                                </p>

                                                {/* Conditional T-Shirt Selection */}
                                                {selectedTier.isTshirtRequired && (
                                                    <div className={styles.formGroup}>
                                                        <label className={styles.label}>T-Shirt Size *</label>
                                                        <div className={styles.inputIconWrapper}>
                                                            <Shirt size={16} className={styles.inputIcon} />
                                                            <select
                                                                value={formData.participants[index]?.tshirtSize || ''}
                                                                onChange={(e) => handleParticipantChange(index, 'tshirtSize', e.target.value)}
                                                                className={styles.selectInput}
                                                                required
                                                            >
                                                                <option value="">Select Size</option>
                                                                {selectedTier.tshirtSizes?.map((size: string) => (
                                                                    <option key={size} value={size}>{size}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Review & Confirm */}
                        {currentStep === 3 && (
                            <div className={styles.step}>
                                <h2 className={styles.stepTitle}>Review & Pay</h2>
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
                                            </div>
                                            <div style={{ marginTop: '12px', padding: '12px 0', borderTop: '1px solid #EEE' }}>
                                                <p style={{ fontWeight: 600, marginBottom: '12px', fontSize: '0.9rem' }}>Participants:</p>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                    {formData.participants.slice(0, formData.quantity).map((participant, idx) => (
                                                        <div key={idx} style={{
                                                            background: '#F9F9F9',
                                                            padding: '12px',
                                                            borderRadius: '8px',
                                                            border: '1px solid #EEE'
                                                        }}>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                                                <span style={{
                                                                    background: participant.ageCategory === 'adult' ? '#D4A000' : '#4CAF50',
                                                                    color: '#fff',
                                                                    padding: '2px 8px',
                                                                    borderRadius: '4px',
                                                                    fontSize: '0.75rem',
                                                                    fontWeight: 600,
                                                                    textTransform: 'uppercase'
                                                                }}>
                                                                    {participant.ageCategory}
                                                                </span>
                                                                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>#{idx + 1}: {participant.name}</span>
                                                            </div>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#666', marginLeft: '8px' }}>
                                                                <span>T-Shirt: {participant.tshirtSize || 'NA'}</span>
                                                                <span>₹{(participant.ageCategory === 'adult' ? selectedTier.adultPrice : selectedTier.childPrice)?.toLocaleString()}</span>
                                                            </div>
                                                        </div>
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

                                    <div style={{ marginTop: '24px', padding: '16px', borderRadius: '8px', background: '#e0f7fa', border: '1px solid #b2ebf2' }}>
                                        <p style={{ fontSize: '0.9rem', color: '#006064', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Lock size={16} />
                                            Payment will be handled via Razorpay (Simulation Mode).
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className={styles.navigation}>
                            {currentStep > 1 && (
                                <Button variant="secondary" onClick={handleBack} disabled={isSubmitting}>
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
                                <Button onClick={handleSubmit} className={styles.nextButton} disabled={isSubmitting}>
                                    {isSubmitting ? 'Processing...' : `Pay ₹${totalPrice.toLocaleString()}`}
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
                                <span>{selectedTier?.name || 'Standard Entry'}</span>
                            </div>
                            <div className={styles.summaryItem}>
                                <span>Quantity:</span>
                                <span>{formData.quantity}</span>
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
