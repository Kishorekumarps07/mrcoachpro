'use client';

import React, { useState, useEffect } from 'react';
import { X, Check, Loader2, ChevronRight, ChevronLeft } from 'lucide-react';
import styles from './BookDemoModal.module.css';
import { createPortal } from 'react-dom';
import { SPECIALIZATION_SERVICES } from '@/data/services';

interface BookDemoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const BookDemoModal = ({ isOpen, onClose }: BookDemoModalProps) => {
    const [mounted, setMounted] = useState(false);
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({
        // Step 1: Personal
        name: '',
        email: '',
        phone: '',
        gender: '',
        // Step 2: Location
        state: '',
        district: '',
        area: '',
        pincode: '',
        // Step 3: Service
        serviceType: '',
        startPreference: '',
        availability: '',
        // Step 4: Specifics
        specializations: '',
        servicesProvided: ''
    });

    // --- Dynamic Data State ---
    const [statesList, setStatesList] = useState<{ id: number; name: string }[]>([]);
    const [districtsList, setDistrictsList] = useState<{ id: number; name: string }[]>([]);
    const [categoriesList, setCategoriesList] = useState<{ id: number; name: string; subcategories: { id: number; name: string }[] }[]>([]);
    const [loadingDistricts, setLoadingDistricts] = useState(false);

    // Initial Fetch
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch States
                const statesRes = await fetch('https://api.mrcoachpro.in/api/locations/states');
                const statesData = await statesRes.json();
                if (statesData.success) setStatesList(statesData.data);

                // Fetch Categories (Specializations)
                const catsRes = await fetch('https://api.mrcoachpro.in/api/categories');
                const catsData = await catsRes.json();
                if (catsData.success) setCategoriesList(catsData.data);
            } catch (err) {
                console.error("Failed to fetch initial data", err);
            }
        };

        if (isOpen) {
            fetchData();
        }
    }, [isOpen]);

    // Fetch Districts when State changes
    useEffect(() => {
        if (!formData.state) {
            setDistrictsList([]);
            return;
        }

        const fetchDistricts = async () => {
            setLoadingDistricts(true);
            try {
                // Find state ID from name (not ideal, but form stores name currently)
                const selectedState = statesList.find(s => s.name === formData.state);
                if (selectedState) {
                    const res = await fetch(`https://api.mrcoachpro.in/api/locations/districts?state_id=${selectedState.id}`);
                    const data = await res.json();
                    if (data.success) {
                        setDistrictsList(data.data);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch districts", err);
            } finally {
                setLoadingDistricts(false);
            }
        };

        fetchDistricts();
    }, [formData.state, statesList]);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setStep(1); // Reset to start
            setIsSuccess(false);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        // Basic validation could go here
        setStep(prev => Math.min(prev + 1, 4));
    };

    const handleBack = () => {
        setStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // If not on the final step, treat "Enter" as "Next"
        if (step < 4) {
            handleNext();
            return;
        }

        // Validate required fields before submission
        if (!formData.name || !formData.email) {
            console.error('Missing required fields:', { name: formData.name, email: formData.email });
            alert('Please fill in your name and email in Step 1');
            setStep(1);
            return;
        }

        setIsSubmitting(true);

        try {
            // lookup IDs
            const selectedState = statesList.find(s => s.name === formData.state);
            const selectedDistrict = districtsList.find(d => d.name === formData.district);
            const selectedCategory = categoriesList.find(c => c.name === formData.specializations);

            const subcategoryIds = selectedCategory
                ? selectedCategory.subcategories
                    .filter(sub => formData.servicesProvided.includes(sub.name))
                    .map(sub => sub.id)
                : [];

            // Map Payload
            const payload = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                gender: formData.gender.toLowerCase(), // "Male" -> "male"
                area: formData.area,
                pincode: formData.pincode,
                start_plan: formData.startPreference === 'Immediately' ? 'immediately'
                    : formData.startPreference === 'Within a Month' ? 'within_a_month'
                        : 'not_sure', // simplistic mapping
                available_days: formData.availability === 'Any Day' ? 'any'
                    : formData.availability === 'Weekdays' ? 'weekday'
                        : 'weekend',
                source_website: 'mrcoachpro_web', // hardcoded identifier
                state_id: selectedState ? selectedState.id : 0,
                district_id: selectedDistrict ? selectedDistrict.id : 0,
                service_type: formData.serviceType === 'Home Services' ? 'home_services' : 'online_services',
                category_id: selectedCategory ? selectedCategory.id : 0,
                subcategory_ids: subcategoryIds
            };

            console.log('Submitting payload:', payload);

            const res = await fetch('/api/demo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (data.success) {
                setIsSuccess(true);
            } else {
                console.error('Submission failed response:', data);
                // Show specific validation errors if available
                const errorMsg = data.message || 'Unknown error';
                const details = data.details ? JSON.stringify(data.details) : '';
                alert(`Submission failed: ${errorMsg}\n${details}`);
            }

        } catch (error) {
            console.error('Submission error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!mounted || !isOpen) return null;

    const renderStep = () => {
        switch (step) {
            case 1: // Personal
                return (
                    <div className={styles.stepContainer}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Name <span className={styles.required}>*</span></label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Email <span className={styles.required}>*</span></label>
                            <input
                                type="email"
                                className={styles.input}
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Phone <span className={styles.required}>*</span></label>
                            <input
                                type="tel"
                                className={styles.input}
                                placeholder="Mobile Number"
                                value={formData.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Gender <span className={styles.required}>*</span></label>
                            <select
                                className={styles.select}
                                value={formData.gender}
                                onChange={(e) => handleChange('gender', e.target.value)}
                            >
                                <option value="">-- Please choose an option --</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                );
            case 2: // Location
                return (
                    <div className={styles.stepContainer}>
                        <div className={styles.row}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>State</label>
                                <select
                                    className={styles.select}
                                    value={formData.state}
                                    onChange={(e) => {
                                        handleChange('state', e.target.value);
                                        handleChange('district', ''); // Reset district when state changes
                                    }}
                                >
                                    <option value="">Select State</option>
                                    {statesList.map((s) => (
                                        <option key={s.id} value={s.name}>{s.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>District</label>
                                <select
                                    className={styles.select}
                                    value={formData.district}
                                    onChange={(e) => handleChange('district', e.target.value)}
                                    disabled={!formData.state}
                                >
                                    <option value="">
                                        {loadingDistricts ? 'Loading...' : 'Select District'}
                                    </option>
                                    {districtsList.map((d) => (
                                        <option key={d.id} value={d.name}>{d.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Area</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="Area / Locality"
                                    value={formData.area}
                                    onChange={(e) => handleChange('area', e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Pincode</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="600001"
                                    value={formData.pincode}
                                    onChange={(e) => handleChange('pincode', e.target.value)}
                                    maxLength={6}
                                />
                            </div>
                        </div>
                    </div>
                );
            case 3: // Service
                return (
                    <div className={styles.stepContainer}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Service Type</label>
                            <select
                                className={styles.select}
                                value={formData.serviceType}
                                onChange={(e) => handleChange('serviceType', e.target.value)}
                            >
                                <option value="">--Please choose an option--</option>
                                <option value="Home Services">Home Services</option>
                                <option value="Online Services">Online Services</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>When do you plan to start Personal Trainer?</label>
                            <select
                                className={styles.select}
                                value={formData.startPreference}
                                onChange={(e) => handleChange('startPreference', e.target.value)}
                            >
                                <option value="">--Please choose an option--</option>
                                <option value="Immediately">Immediately</option>
                                <option value="Within a Month">Within a Month</option>
                                <option value="Not Sure,just want to look at options">Not Sure,just want to look at options</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>What days are you generally available?</label>
                            <select
                                className={styles.select}
                                value={formData.availability}
                                onChange={(e) => handleChange('availability', e.target.value)}
                            >
                                <option value="">--Please choose an option--</option>
                                <option value="Any Day">Any Day</option>
                                <option value="Weekdays">Weekdays</option>
                                <option value="Weekends">Weekends</option>
                            </select>
                        </div>
                    </div>
                );
            case 4: // Specifics
                return (
                    <div className={styles.stepContainer}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Professional Specializations</label>
                            <select
                                className={styles.select}
                                value={formData.specializations}
                                onChange={(e) => {
                                    handleChange('specializations', e.target.value);
                                    handleChange('servicesProvided', ''); // Reset services
                                }}
                            >
                                <option value="">Select an option</option>
                                {categoriesList.map((c) => (
                                    <option key={c.id} value={c.name}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Providing Services</label>
                            {formData.specializations && getActiveSubcategories().length > 0 ? (
                                <div className={styles.checkboxGrid}>
                                    {getActiveSubcategories().map((sub) => (
                                        <label key={sub.id} className={styles.checkboxLabel}>
                                            <input
                                                type="checkbox"
                                                className={styles.checkbox}
                                                checked={formData.servicesProvided.includes(sub.name)}
                                                onChange={() => handleServiceToggle(sub.name)}
                                            />
                                            {sub.name}
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                <div className={styles.placeholderBox}>
                                    Select a parent field first
                                </div>
                            )}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };


    // Handle Service Toggle (remains mostly same, but uses dynamic IDs if needed, staying with string names for now)
    const handleServiceToggle = (serviceName: string) => {
        setFormData(prev => {
            const currentServices = prev.servicesProvided ? prev.servicesProvided.split(', ') : [];
            if (currentServices.includes(serviceName)) {
                return { ...prev, servicesProvided: currentServices.filter(s => s !== serviceName).join(', ') };
            } else {
                return { ...prev, servicesProvided: [...currentServices, serviceName].join(', ') };
            }
        });
    };

    // Helper to get active subcategories based on selected specialization
    const getActiveSubcategories = () => {
        const activeCat = categoriesList.find(c => c.name === formData.specializations);
        return activeCat ? activeCat.subcategories : [];
    };

    const modalContent = (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                {!isSuccess ? (
                    <>
                        <div className={styles.header}>
                            <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close">
                                <X size={20} />
                            </button>
                            <h2 className={styles.title}>Book a Demo</h2>
                            <p className={styles.subtitle}>
                                {step === 1 && "Start with your basic details."}
                                {step === 2 && "Where are you located?"}
                                {step === 3 && "Tell us about your preferences."}
                                {step === 4 && "Select your expertise."}
                            </p>
                        </div>

                        <form
                            className={styles.form}
                            onSubmit={(e) => e.preventDefault()} // Disable default submit
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    if (step < 4) handleNext();
                                }
                            }}
                        >
                            {renderStep()}

                            {/* Footer Navigation */}
                            <div className={styles.footer}>
                                {/* Modern Progress Dots */}
                                <div className={styles.stepIndicator}>
                                    {[1, 2, 3, 4].map((dotStep) => (
                                        <div
                                            key={dotStep}
                                            style={{
                                                width: '8px',
                                                height: '8px',
                                                borderRadius: '50%',
                                                background: dotStep <= step ? '#F9D949' : '#E5E5E5',
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                            }}
                                        />
                                    ))}
                                </div>
                                <div className={styles.buttonGroup}>
                                    {step > 1 && (
                                        <button type="button" className={styles.backButton} onClick={handleBack}>
                                            Back
                                        </button>
                                    )}

                                    {step < 4 ? (
                                        <button type="button" className={styles.submitButton} onClick={handleNext}>
                                            Next <ChevronRight size={16} style={{ marginLeft: 6, display: 'inline' }} />
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className={styles.submitButton}
                                            disabled={isSubmitting}
                                            onClick={handleSubmit} // Manually trigger submit
                                        >
                                            {isSubmitting ? (
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <Loader2 size={18} className="animate-spin" /> ...
                                                </span>
                                            ) : (
                                                'Submit'
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </>
                ) : (
                    // Success View
                    <div className={styles.successState}>
                        <div className={styles.successIcon}>
                            <Check size={40} strokeWidth={3} />
                        </div>
                        <h3 className={styles.successTitle}>Demo Booked Successfully</h3>
                        <p className={styles.successText}>
                            Our team will contact you shortly to schedule your session.
                        </p>
                        <p className={styles.microCopy}>
                            Thank you for choosing MR.COACH.
                        </p>
                        <button className={styles.closeSuccessButton} onClick={onClose}>
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};
