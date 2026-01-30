'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, ChevronRight } from 'lucide-react';
import styles from './SearchOverlay.module.css';
import { EVENTS } from '@/data/events';
import { ALL_SERVICES } from '@/data/services';

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    type?: 'default' | 'events';
}

type Category = 'Service' | 'Program' | 'Event' | 'Page';

interface SearchItem {
    id: string;
    title: string;
    category: Category | string;
    href: string;
}

// Generate dynamic search data for Services
const SERVICE_ITEMS: SearchItem[] = ALL_SERVICES.map((service, index) => ({
    id: `svc-${index}`,
    title: service,
    category: 'Service',
    href: `/services`
}));

const STATIC_SERVICE_ITEMS: SearchItem[] = [
    { id: 'static-1', title: 'Start Personal Training', category: 'Action', href: '/contact' },
    { id: 'static-2', title: 'View Class Schedule', category: 'Page', href: '/events' },
    { id: 'static-3', title: 'Location & Contact', category: 'Page', href: '/contact' },
    { id: 'static-4', title: 'About the Coach', category: 'Page', href: '/about' },
];

// Generate dynamic search data for Events
const EVENT_ITEMS: SearchItem[] = EVENTS.map((event) => ({
    id: `evt-${event.id}`,
    title: event.title,
    category: event.category,
    href: `/events/${event.id}`
}));

const STATIC_EVENT_ITEMS: SearchItem[] = [
    { id: 'evt-static-1', title: 'All Marathons', category: 'Events', href: '/events' },
    { id: 'evt-static-2', title: 'Wellness Workshops', category: 'Events', href: '/events' },
    { id: 'evt-static-3', title: 'Upcoming Competitions', category: 'Events', href: '/events' },
    { id: 'evt-static-4', title: 'Running Events', category: 'Category', href: '/events' },
];

const SERVICE_SEARCH_DATA = [...STATIC_SERVICE_ITEMS, ...SERVICE_ITEMS];
const EVENT_SEARCH_DATA = [...STATIC_EVENT_ITEMS, ...EVENT_ITEMS];

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, type = 'default' }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchItem[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    // Select data based on type
    const searchData = type === 'events' ? EVENT_SEARCH_DATA : SERVICE_SEARCH_DATA;
    const staticItems = type === 'events' ? STATIC_EVENT_ITEMS : STATIC_SERVICE_ITEMS;
    const placeholder = type === 'events' ? 'Search events, locations, categories...' : 'Search programs, services, sports...';

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setTimeout(() => inputRef.current?.focus(), 50);
        } else {
            document.body.style.overflow = '';
            setQuery('');
            setResults([]);
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    useEffect(() => {
        if (!query.trim()) {
            setResults(staticItems.slice(0, 5)); // Show recent/static items by default
            return;
        }

        const lowerQuery = query.toLowerCase();
        const filtered = searchData.filter(item =>
            item.title.toLowerCase().includes(lowerQuery) ||
            item.category.toLowerCase().includes(lowerQuery)
        ).slice(0, 10); // Limit results
        setResults(filtered);
        setSelectedIndex(0);
    }, [query, searchData, staticItems]);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === 'Escape') onClose();

            if (results.length > 0) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
                }
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
                }
                if (e.key === 'Enter' && selectedIndex >= 0) {
                    window.location.href = results[selectedIndex].href;
                    onClose();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, results, selectedIndex, onClose]);

    if (!isOpen) return null;

    // Helper to highlight match
    const HighlightText = ({ text, highlight }: { text: string; highlight: string }) => {
        if (!highlight.trim()) return <>{text}</>;
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <>
                {parts.map((part, i) =>
                    part.toLowerCase() === highlight.toLowerCase() ?
                        <span key={i} className={styles.highlight}>{part}</span> : part
                )}
            </>
        );
    };

    return (
        <div className={styles.overlay} onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
        }}>
            <div className={styles.container}>
                <div className={styles.inputWrapper}>
                    <Search className={styles.searchIcon} size={20} />
                    <input
                        ref={inputRef}
                        type="text"
                        className={styles.input}
                        placeholder={placeholder}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        aria-label="Search"
                    />
                </div>

                <div className={styles.results}>
                    {results.length === 0 && query && (
                        <div className={styles.noResults}>
                            No results found for "{query}"
                        </div>
                    )}

                    {results.map((item, index) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={styles.resultItem}
                            data-active={index === selectedIndex}
                            onClick={onClose}
                            onMouseEnter={() => setSelectedIndex(index)}
                        >
                            <span className={styles.itemTitle}>
                                <HighlightText text={item.title} highlight={query} />
                            </span>
                            <span className={styles.itemCategory}>{item.category}</span>
                        </Link>
                    ))}
                </div>

                <div className={styles.helperText}>
                    Pro tip: Press <span style={{ color: '#fff', border: '1px solid #ffffff33', borderRadius: '4px', padding: '1px 4px', fontSize: '10px', margin: '0 4px' }}>ESC</span> to close
                </div>
            </div>
        </div>
    );
};
