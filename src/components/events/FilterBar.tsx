'use client';

import React, { useRef } from 'react';
import styles from './FilterBar.module.css';
import { Calendar, MapPin, Music, Briefcase, Trophy, Activity, Dumbbell, Sun } from 'lucide-react';
import clsx from 'clsx';

const FILTERS = [
    { label: 'All Events', icon: null },
    { label: 'Workshops', icon: Briefcase },
    { label: 'Competitions', icon: Trophy },
    { label: 'Running', icon: Activity },
    { label: 'Wellness', icon: Sun },
    { label: 'Sports', icon: Dumbbell },
    { label: 'Today', icon: Calendar },
    { label: 'Tomorrow', icon: Calendar },
];

interface FilterBarProps {
    activeFilter: string;
    onFilterChange: (filter: string) => void;
}

export const FilterBar = ({ activeFilter, onFilterChange }: FilterBarProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <div className={styles.filterBarContainer}>
            <div className={styles.scrollWrapper} ref={scrollRef}>
                {FILTERS.map((filter, index) => (
                    <button
                        key={index}
                        className={clsx(styles.filterPill, {
                            [styles.active]: activeFilter === filter.label
                        })}
                        onClick={() => onFilterChange(filter.label)}
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
