'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MapPin, ChevronDown, Search, Navigation } from 'lucide-react';
import styles from './LocationPicker.module.css';

const POPULAR_CITIES = [
    // Chennai
    'Nungambakkam, Chennai',
    'Anna Nagar, Chennai',
    'T. Nagar, Chennai',
    'Velachery, Chennai',
    'Adyar, Chennai',
    'OMR, Chennai',
    'Porur, Chennai',
    'Tambaram, Chennai',
    // Mumbai
    'Bandra, Mumbai',
    'Andheri, Mumbai',
    'Powai, Mumbai',
    'Juhu, Mumbai',
    'Malad, Mumbai',
    'Thane, Mumbai',
    // Bangalore
    'Koramangala, Bangalore',
    'Indiranagar, Bangalore',
    'Whitefield, Bangalore',
    'HSR Layout, Bangalore',
    'JP Nagar, Bangalore',
    'Marathahalli, Bangalore',
    // Hyderabad
    'Banjara Hills, Hyderabad',
    'Jubilee Hills, Hyderabad',
    'Gachibowli, Hyderabad',
    'Madhapur, Hyderabad',
    'Hitec City, Hyderabad',
    // Delhi / NCR
    'Connaught Place, Delhi',
    'Lajpat Nagar, Delhi',
    'Dwarka, Delhi',
    'Noida Sector 18, Noida',
    'Gurgaon Sector 29, Gurgaon',
    // Pune
    'Koregaon Park, Pune',
    'Viman Nagar, Pune',
    'Hinjewadi, Pune',
    'Baner, Pune',
    // Others
    'Salt Lake, Kolkata',
    'Park Street, Kolkata',
    'Navrangpura, Ahmedabad',
    'C G Road, Ahmedabad',
    'Coimbatore',
    'Kochi',
    'Jaipur',
    'Surat',
];

const STORAGE_KEY = 'mrcoach_user_location';

export const LocationPicker = () => {
    const [location, setLocation] = useState('Nungambakkam, Chennai');
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [isLocating, setIsLocating] = useState(false);
    const searchRef = useRef<HTMLInputElement>(null);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) setLocation(saved);
    }, []);

    // Focus search input when popover opens
    useEffect(() => {
        if (isOpen && searchRef.current) {
            setTimeout(() => searchRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const saveLocation = (city: string) => {
        setLocation(city);
        localStorage.setItem(STORAGE_KEY, city);
        setIsOpen(false);
        setSearch('');
    };

    const handleGeolocate = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser.');
            return;
        }
        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                try {
                    const { latitude, longitude } = pos.coords;
                    const res = await fetch(
                        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                    );
                    const data = await res.json();

                    // Walk admin levels from most specific → least specific to get exact area
                    const adminLevels: { name: string; order: number }[] =
                        data.localityInfo?.administrative ?? [];
                    // Sort descending by order (higher = more granular)
                    const sorted = [...adminLevels].sort((a, b) => b.order - a.order);
                    // Pick the most granular level that has a real name and isn't already the city
                    const city = data.city || data.principalSubdivision || '';
                    const exactArea = sorted.find(
                        (l) => l.name && l.name !== city && l.name.length > 2
                    )?.name || data.locality || '';

                    const label = exactArea && city && exactArea !== city
                        ? `${exactArea}, ${city}`
                        : city || exactArea || 'Your Location';

                    saveLocation(label);
                } catch {
                    saveLocation('Your Location');
                } finally {
                    setIsLocating(false);
                }
            },
            () => {
                setIsLocating(false);
                alert('Unable to retrieve your location. Please allow location access.');
            }
        );
    };

    const filtered = POPULAR_CITIES.filter((c) =>
        c.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={styles.wrapper}>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className={styles.backdrop}
                    onClick={() => { setIsOpen(false); setSearch(''); }}
                />
            )}

            {/* Trigger Button */}
            <button
                className={`${styles.locationBtn} ${isOpen ? styles.open : ''}`}
                onClick={() => setIsOpen((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <MapPin size={15} className={styles.mapIcon} />
                <span className={styles.locationText}>{location}</span>
                <ChevronDown
                    size={14}
                    className={`${styles.chevIcon} ${isOpen ? styles.chevOpen : ''}`}
                />
            </button>

            {/* Popover */}
            {isOpen && (
                <div className={styles.popover} role="listbox">
                    {/* Use My Location */}
                    <button
                        className={styles.geoBtn}
                        onClick={handleGeolocate}
                        disabled={isLocating}
                    >
                        <Navigation size={16} className={styles.geoIcon} />
                        {isLocating ? 'Detecting location...' : 'Use My Location'}
                    </button>

                    <div className={styles.divider} />

                    {/* Search */}
                    <div className={styles.searchWrap}>
                        <Search size={14} className={styles.searchIcon} />
                        <input
                            ref={searchRef}
                            type="text"
                            placeholder="Search city..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>

                    {/* City List */}
                    <div className={styles.cityList}>
                        {filtered.length > 0 ? (
                            filtered.map((city) => (
                                <button
                                    key={city}
                                    className={styles.cityItem}
                                    onClick={() => saveLocation(city)}
                                    role="option"
                                >
                                    <span className={styles.cityDot} />
                                    {city}
                                </button>
                            ))
                        ) : (
                            <p className={styles.noResults}>No cities found</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
