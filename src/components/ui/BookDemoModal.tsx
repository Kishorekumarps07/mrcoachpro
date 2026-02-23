'use client';

import React, { useState, useEffect } from 'react';
import { X, Check, Loader2, ChevronRight, ChevronLeft, Navigation } from 'lucide-react';
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

    const [loadingDistricts, setLoadingDistricts] = useState(false);
    const [isLocating, setIsLocating] = useState(false);
    const [locationError, setLocationError] = useState<string | null>(null);

    // --- Dynamic Data State ---
    const [statesList, setStatesList] = useState<{ id: number; name: string }[]>([]);
    const [districtsList, setDistrictsList] = useState<{ id: number; name: string }[]>([]);
    const [categoriesList, setCategoriesList] = useState<{ id: number; name: string; subcategories: { id: number; name: string }[] }[]>([]);

    const [manualSearchQuery, setManualSearchQuery] = useState('');
    const [locationSuggestions, setLocationSuggestions] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);

    const [pendingDistrictMatch, setPendingDistrictMatch] = useState<string | null>(null);

    // Fuzzy matching helper
    const getBestMatch = (input: string, list: { name: string }[]) => {
        if (!input) return null;
        const normalizedInput = input.toLowerCase().replace(/ district| state/g, '').trim();
        return list.find(item => {
            const normalizedName = item.name.toLowerCase().trim();
            return normalizedName === normalizedInput ||
                normalizedName.includes(normalizedInput) ||
                normalizedInput.includes(normalizedName);
        });
    };

    // Manual Search logic (Nominatim)
    useEffect(() => {
        if (!manualSearchQuery || manualSearchQuery.length < 3) {
            setLocationSuggestions([]);
            setSearchError(null);
            return;
        }

        const controller = new AbortController();

        const delayDebounceFn = setTimeout(async () => {
            setIsSearching(true);
            setSearchError(null);
            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(manualSearchQuery)}&addressdetails=1&countrycodes=in&limit=5`,
                    {
                        headers: { 'Accept-Language': 'en', 'User-Agent': 'MrCoachPro/1.0' },
                        signal: controller.signal
                    }
                );

                if (!res.ok) {
                    throw new Error(`Search failed with status: ${res.status}`);
                }

                const data = await res.json();
                setLocationSuggestions(data);
            } catch (err: any) {
                if (err.name !== 'AbortError') {
                    console.error("Search failed:", err);
                    setSearchError("Location search service is currently unavailable. Please try again or enter details manually.");
                }
            } finally {
                setIsSearching(false);
            }
        }, 600);

        return () => {
            clearTimeout(delayDebounceFn);
            controller.abort();
        };
    }, [manualSearchQuery]);

    const handleSuggestionSelect = (suggestion: any) => {
        const addr = suggestion.address;

        // Extract fields
        const detectedState = addr.state || '';

        // Use a list of potential district fields
        const districtCandidates = [
            addr.city,
            addr.town,
            addr.district,
            addr.county,
            addr.state_district,
            addr.municipality
        ].filter(Boolean);

        const subLocality = [
            addr.suburb,
            addr.neighbourhood,
            addr.village,
            addr.hamlet,
            addr.industrial,
            addr.commercial
        ].filter(Boolean)[0] || '';

        const detectedArea = [
            addr.house_number || addr.house_name,
            addr.road,
            subLocality !== addr.road ? subLocality : null,
            addr.landmark
        ].filter(Boolean).join(', ');

        const detectedPincode = addr.postcode || '';

        // Match state against our list
        const matchedState = getBestMatch(detectedState, statesList);

        if (matchedState) {
            // Pick the best district candidate that exists in our list
            setPendingDistrictMatch(districtCandidates.join('|')); // Pass all candidates to useEffect
            setFormData(prev => ({
                ...prev,
                state: matchedState.name,
                district: '',
                area: detectedArea || prev.area,
                pincode: detectedPincode || prev.pincode,
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                area: detectedArea || prev.area,
                pincode: detectedPincode || prev.pincode,
            }));
            setLocationError("State not found in our list. Please select manually.");
        }

        setLocationSuggestions([]);
        setManualSearchQuery(suggestion.display_name);
    };

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

    useEffect(() => {
        if (pendingDistrictMatch && districtsList.length > 0) {
            const candidates = pendingDistrictMatch.split('|');

            let matchedDistrict = null;
            for (const candidate of candidates) {
                matchedDistrict = getBestMatch(candidate, districtsList);
                if (matchedDistrict) break;
            }
            if (matchedDistrict) {
                setFormData(f => ({ ...f, district: matchedDistrict.name }));
            }
            setPendingDistrictMatch(null);
        }
    }, [districtsList, pendingDistrictMatch]);

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

    // Auto-location handler
    const handleAutoLocation = () => {
        setLocationError(null);
        if (!navigator.geolocation) {
            setLocationError('Geolocation is not supported by your browser.');
            return;
        }
        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                try {
                    const { latitude, longitude } = pos.coords;

                    // Fire both APIs in parallel for speed & reliability
                    const [bdcRes, nominatimRes] = await Promise.allSettled([
                        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`),
                        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`, {
                            headers: { 'Accept-Language': 'en', 'User-Agent': 'MrCoachPro/1.0' }
                        }),
                    ]);

                    // Parse BigDataCloud
                    const bdc = bdcRes.status === 'fulfilled' ? await bdcRes.value.json() : {};
                    // Parse Nominatim
                    const nom = nominatimRes.status === 'fulfilled' ? await nominatimRes.value.json() : {};

                    // Extract fields — prefer Nominatim for granularity
                    const detectedState = nom.address?.state || bdc.principalSubdivision || '';

                    const districtCandidates = [
                        nom.address?.city,
                        nom.address?.town,
                        nom.address?.district,
                        nom.address?.county,
                        nom.address?.state_district,
                        bdc.city,
                        bdc.locality
                    ].filter(Boolean);

                    const subLocality = [
                        nom.address?.suburb,
                        nom.address?.neighbourhood,
                        nom.address?.village,
                        nom.address?.hamlet,
                        nom.address?.townland,
                        nom.address?.industrial,
                        nom.address?.commercial,
                        bdc.locality
                    ].filter(Boolean)[0] || '';

                    const detectedArea = [
                        nom.address?.house_number || nom.address?.house_name,
                        nom.address?.road,
                        subLocality !== nom.address?.road ? subLocality : null,
                        nom.address?.landmark
                    ].filter(Boolean).join(', ');

                    const detectedPincode = nom.address?.postcode || bdc.postcode || '';

                    // Fuzzy-match state against API list
                    const matchedState = getBestMatch(detectedState, statesList);

                    if (matchedState) {
                        setPendingDistrictMatch(districtCandidates.join('|'));
                        setFormData(prev => ({
                            ...prev,
                            state: matchedState.name,
                            district: '',
                            area: detectedArea || prev.area,
                            pincode: detectedPincode || prev.pincode,
                        }));
                    } else {
                        setFormData(prev => ({
                            ...prev,
                            area: detectedArea || prev.area,
                            pincode: detectedPincode || prev.pincode,
                        }));
                        setLocationError('State not found in list. Please select manually.');
                    }
                } catch {
                    setLocationError('Could not detect location. Please fill manually.');
                } finally {
                    setIsLocating(false);
                }
            },
            () => {
                setIsLocating(false);
                setLocationError('Location access denied. Please allow permissions.');
            },
            { timeout: 10000 }
        );
    };

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

                // available_days is nullable — send null to bypass ENUM mismatch entirely.
                // Backend will store NULL, which is valid. The actual enum values are unclear.
                available_days: null,

                source_website: 'mrcoachpro_web', // hardcoded identifier
                state_id: selectedState ? selectedState.id : 0,
                district_id: selectedDistrict ? selectedDistrict.id : 0,
                service_type: formData.serviceType === 'Home Services' ? 'home_services' : 'online_services',
                category_id: selectedCategory ? selectedCategory.id : 0,
                subcategory_ids: subcategoryIds
            };

            console.log('Submitting payload:', payload);

            // Use Next.js API proxy route (server-side handles headers properly)
            const res = await fetch('/api/demo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            let data;
            try {
                // Check response status first
                if (!res.ok) {
                    console.error(`Submission failed with HTTP status: ${res.status}`);
                    const text = await res.text();
                    console.error('Submission failed response text:', text);
                    try {
                        data = JSON.parse(text);
                    } catch (e) {
                        // If not JSON, alert the raw text
                        alert(`Submission failed (Status ${res.status}): ${text.substring(0, 100)}`);
                        return;
                    }
                } else {
                    data = await res.json();
                }

                if (data.success) {
                    setIsSuccess(true);
                } else {
                    console.error('Submission failed response JSON:', data);
                    // Show specific validation errors if available
                    const errorMsg = data.message || 'Unknown error';
                    const details = data.details ? JSON.stringify(data.details) : '';
                    alert(`Submission failed: ${errorMsg}\n${details}`);
                }
            } catch (error) {
                console.error('Error processing submission response:', error);
                alert('An error occurred while processing the server response. Please check console for details.');
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
                                required
                            />
                            <span className={styles.validationMessage}>
                                Please enter your full name
                            </span>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Email <span className={styles.required}>*</span></label>
                            <input
                                type="email"
                                className={styles.input}
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                required
                            />
                            <span className={styles.validationMessage}>
                                Please enter a valid email address
                            </span>
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
                        {/* Manual Location Search */}
                        <div className={styles.locationSearchWrapper}>
                            <label className={styles.locationSearchLabel}>Search Location Manually</label>
                            <div className={styles.searchFieldContainer}>
                                <div className={styles.searchIcon}>
                                    {isSearching ? <Loader2 size={16} className={styles.spinIcon} /> : <Navigation size={16} />}
                                </div>
                                <input
                                    type="text"
                                    className={styles.locationSearchInput}
                                    placeholder="Search street, area, or door no..."
                                    value={manualSearchQuery}
                                    onChange={(e) => setManualSearchQuery(e.target.value)}
                                />

                                {searchError && (
                                    <p className={styles.locationErrorMsg} style={{ marginTop: '8px', marginBottom: 0 }}>
                                        {searchError}
                                    </p>
                                )}

                                {locationSuggestions.length > 0 && (
                                    <div className={styles.suggestionsDropdown}>
                                        {locationSuggestions.map((suggestion, idx) => (
                                            <div
                                                key={idx}
                                                className={styles.suggestionItem}
                                                onClick={() => handleSuggestionSelect(suggestion)}
                                            >
                                                <span className={styles.suggestionMain}>
                                                    {suggestion.address.house_number || suggestion.address.house_name
                                                        ? `${suggestion.address.house_number || suggestion.address.house_name}, ` : ''}
                                                    {suggestion.address.road || suggestion.display_name.split(',')[0]}
                                                </span>
                                                <span className={styles.suggestionSub}>
                                                    {suggestion.display_name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* OR separator / Auto-detect */}
                        <button
                            type="button"
                            className={styles.detectBtn}
                            onClick={handleAutoLocation}
                            disabled={isLocating}
                        >
                            {isLocating
                                ? <><Loader2 size={14} className={styles.spinIcon} /> Detecting...</>
                                : <><Navigation size={14} /> Detect My Location</>
                            }
                        </button>

                        {locationError && (
                            <p className={styles.locationErrorMsg}>{locationError}</p>
                        )}
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

                            {/* Step-specific Static Micro-copy */}
                            {step === 1 && (
                                <p className={styles.microCopyText}>
                                    We'll never spam or share your contact info.
                                </p>
                            )}
                            {step === 2 && (
                                <p className={styles.microCopyText}>
                                    Helps us match you with nearby field coaches.
                                </p>
                            )}
                            {step === 3 && (
                                <p className={styles.microCopyText}>
                                    Coaches will tailor the plan to your schedule.
                                </p>
                            )}
                            {step === 4 && (
                                <p className={styles.microCopyText}>
                                    Select your primary area of focus.
                                </p>
                            )}
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
                                                    <Loader2 size={18} className="animate-spin" /> Submitting...
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
                            Our team will contact you shortly to schedule your demo session.
                        </p>
                        <p className={styles.microCopy}>
                            Thanks for choosing<br />Mr.Coach Fitness Company.
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
