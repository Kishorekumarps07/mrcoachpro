'use client';

import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import styles from './DemoModal.module.css';

interface DemoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface State {
    id: number;
    name: string;
}

interface District {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
    subcategories: {
        id: number;
        category_id: number;
        name: string;
    }[];
}

export const DemoModal = ({ isOpen, onClose }: DemoModalProps) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1
        name: '',
        email: '',
        phone: '',
        gender: '',
        // Step 2
        state: '',
        district: '',
        area: '',
        pincode: '',
        // Step 3
        serviceType: '',
        startDate: '',
        availability: '',
        // Step 4
        specialization: '',
        providingServices: '',
    });

    const [states, setStates] = useState<State[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [subcategories, setSubcategories] = useState<any[]>([]);
    const [isLoadingStates, setIsLoadingStates] = useState(false);
    const [isLoadingDistricts, setIsLoadingDistricts] = useState(false);
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [isLoadingSubcategories, setIsLoadingSubcategories] = useState(false);

    // Fetch States and Categories on Mount
    useEffect(() => {
        if (isOpen) {
            setIsLoadingStates(true);
            fetch('https://api.mrcoachpro.in/api/locations/states')
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setStates(data.data);
                    }
                })
                .catch((err) => console.error('Failed to fetch states:', err))
                .finally(() => setIsLoadingStates(false));

            setIsLoadingCategories(true);
            fetch('https://api.mrcoachpro.in/api/categories')
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setCategories(data.data);
                    }
                })
                .catch((err) => console.error('Failed to fetch categories:', err))
                .finally(() => setIsLoadingCategories(false));
        }
    }, [isOpen]);

    // Fetch Districts when State changes
    useEffect(() => {
        if (formData.state) {
            setIsLoadingDistricts(true);
            fetch(`https://api.mrcoachpro.in/api/locations/districts?state_id=${formData.state}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setDistricts(data.data);
                    }
                })
                .catch((err) => console.error('Failed to fetch districts:', err))
                .finally(() => setIsLoadingDistricts(false));
        } else {
            setDistricts([]);
        }
    }, [formData.state]);

    // Fetch Subcategories when Specialization changes
    useEffect(() => {
        if (formData.specialization) {
            setIsLoadingSubcategories(true);
            fetch(`https://api.mrcoachpro.in/api/categories/${formData.specialization}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.success && data.data && data.data.subcategories) {
                        setSubcategories(data.data.subcategories);
                    } else {
                        setSubcategories([]);
                    }
                })
                .catch((err) => console.error('Failed to fetch subcategories:', err))
                .finally(() => setIsLoadingSubcategories(false));
        } else {
            setSubcategories([]);
        }
    }, [formData.specialization]);

    if (!isOpen) return null;

    const handleNext = () => {
        if (step < 4) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (step < 4) {
            setStep(prev => prev + 1);
            return;
        }

        alert('Thank you! We will contact you shortly.');
        onClose();
        setStep(1);
        setFormData({
            name: '', email: '', phone: '', gender: '',
            state: '', district: '', area: '', pincode: '',
            serviceType: '', startDate: '', availability: '',
            specialization: '', providingServices: '',
        });
    };

    const getStepTitle = () => {
        switch (step) {
            case 1: return 'Start with your basic details.';
            case 2: return 'Where are you located?';
            case 3: return 'Tell us about your preferences.';
            case 4: return 'Select your expertise.';
            default: return '';
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>
                    <X size={24} />
                </button>

                <div className={styles.header}>
                    <h2 className={styles.title}>BOOK A DEMO</h2>
                    <p className={styles.subtitle}>{getStepTitle()}</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {/* STEP 1: Basic Details */}
                    {step === 1 && (
                        <div className={styles.stepContent}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Name <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Email <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="email"
                                    className={styles.input}
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Phone <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="tel"
                                    className={styles.input}
                                    placeholder="Mobile Number"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Gender <span className={styles.required}>*</span>
                                </label>
                                <select
                                    className={styles.select}
                                    value={formData.gender}
                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                    required
                                >
                                    <option value="">-- Please choose an option --</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Location */}
                    {step === 2 && (
                        <div className={styles.stepContent}>
                            <div className={styles.row}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>State</label>
                                    <select
                                        className={styles.select}
                                        value={formData.state}
                                        onChange={(e) => setFormData({ ...formData, state: e.target.value, district: '' })}
                                        disabled={isLoadingStates}
                                    >
                                        <option value="">{isLoadingStates ? 'Loading...' : 'Select State'}</option>
                                        {states.map((state) => (
                                            <option key={state.id} value={state.id}>
                                                {state.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>District</label>
                                    <select
                                        className={styles.select}
                                        value={formData.district}
                                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                                        disabled={!formData.state || isLoadingDistricts}
                                    >
                                        <option value="">{isLoadingDistricts ? 'Loading...' : 'Select District'}</option>
                                        {districts.map((district) => (
                                            <option key={district.id} value={district.id}>
                                                {district.name}
                                            </option>
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
                                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Pincode</label>
                                    <input
                                        type="text"
                                        className={styles.input}
                                        placeholder="600001"
                                        value={formData.pincode}
                                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Preferences */}
                    {step === 3 && (
                        <div className={styles.stepContent}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Service Type</label>
                                <select
                                    className={styles.select}
                                    value={formData.serviceType}
                                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                                >
                                    <option value="">--Please choose an option--</option>
                                    <option value="fitness">Fitness Training</option>
                                    <option value="physio">Physiotherapy</option>
                                    <option value="sports">Sports Training</option>
                                    <option value="yoga">Yoga</option>
                                    <option value="nutrition">Nutrition</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>When do you plan to start Personal Trainer?</label>
                                <select
                                    className={styles.select}
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                >
                                    <option value="">--Please choose an option--</option>
                                    <option value="immediately">Immediately</option>
                                    <option value="1-week">Within 1 week</option>
                                    <option value="2-weeks">Within 2 weeks</option>
                                    <option value="1-month">Within 1 month</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>What days are you generally available?</label>
                                <select
                                    className={styles.select}
                                    value={formData.availability}
                                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                                >
                                    <option value="">--Please choose an option--</option>
                                    <option value="weekdays">Weekdays</option>
                                    <option value="weekends">Weekends</option>
                                    <option value="all-days">All Days</option>
                                    <option value="flexible">Flexible</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: Expertise */}
                    {step === 4 && (
                        <div className={styles.stepContent}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Professional Specializations</label>
                                <select
                                    className={styles.select}
                                    value={formData.specialization}
                                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value, providingServices: '' })}
                                >
                                    <option value="">{isLoadingCategories ? 'Loading...' : 'Select an option'}</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Providing Services</label>
                                <select
                                    className={styles.select}
                                    value={formData.providingServices}
                                    onChange={(e) => setFormData({ ...formData, providingServices: e.target.value })}
                                    disabled={!formData.specialization || isLoadingSubcategories}
                                >
                                    <option value="">{isLoadingSubcategories ? 'Loading...' : 'Select a parent field first'}</option>
                                    {subcategories.map((sub) => (
                                        <option key={sub.id} value={sub.id}>
                                            {sub.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    <div className={styles.footer}>
                        <span className={styles.stepIndicator}>Step {step} of 4</span>
                        <div className={styles.buttonGroup}>
                            {step > 1 && (
                                <button type="button" className={styles.backBtn} onClick={handleBack}>
                                    Back
                                </button>
                            )}
                            {step < 4 ? (
                                <button type="submit" className={styles.nextBtn}>
                                    Next →
                                </button>
                            ) : (
                                <button type="submit" className={styles.nextBtn}>
                                    Submit
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
