'use client';

import React, { useRef, useEffect, useState } from 'react';
import styles from './FilterBar.module.css';
import { Briefcase, Trophy, Activity, Dumbbell, Sun, Layers } from 'lucide-react';
import clsx from 'clsx';
import { eventService } from '@/services/eventService';

// Default filters
const STATIC_FILTERS = [
    { id: 0, label: 'All Events', icon: Layers },
];

interface FilterBarProps {
    activeFilterId: number;
    onFilterChange: (id: number) => void;
}

export const FilterBar = ({ activeFilterId, onFilterChange }: FilterBarProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [filters, setFilters] = useState<{ id: number; label: string; icon: any }[]>(STATIC_FILTERS);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await eventService.getCategories();
                // Map backend categories to UI structure
                const dynamicFilters = categories.map(cat => ({
                    id: cat.id,
                    label: cat.name,
                    icon: getIconForCategory(cat.name)
                }));

                setFilters([...STATIC_FILTERS, ...dynamicFilters]);
            } catch (err) {
                console.error('Failed to load categories', err);
            }
        };

        fetchCategories();
    }, []);

    // Helper to assign icons based on name
    const getIconForCategory = (name: string) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('workshop')) return Briefcase;
        if (lowerName.includes('competition')) return Trophy;
        if (lowerName.includes('run')) return Activity;
        if (lowerName.includes('wellness')) return Sun;
        if (lowerName.includes('sport')) return Dumbbell;
        return Activity;
    };

    return (
        <div className={styles.filterBarContainer}>
            <div className={styles.scrollWrapper} ref={scrollRef}>
                {filters.map((filter) => (
                    <button
                        key={filter.id}
                        className={clsx(styles.filterPill, {
                            [styles.active]: activeFilterId === filter.id
                        })}
                        onClick={() => onFilterChange(filter.id)}
                    >
                        {filter.icon && <filter.icon size={16} className={styles.icon} />}
                        {filter.label}
                    </button>
                ))}
            </div>
            <div className={styles.fadeRight} />
        </div>
    );
};

