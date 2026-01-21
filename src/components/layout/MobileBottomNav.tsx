'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Zap, Grid3x3, Info } from 'lucide-react';
import { useState } from 'react';
import { DemoModal } from '@/components/ui/DemoModal';
import styles from './MobileBottomNav.module.css';

export const MobileBottomNav = () => {
    const pathname = usePathname();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navItems = [
        { href: '/', label: 'Home', icon: Home },
        { href: '/events', label: 'Events', icon: Calendar },
        { href: '#', label: 'Demo', icon: Zap, isPrimary: true, onClick: () => setIsModalOpen(true) },
        { href: '/services', label: 'Services', icon: Grid3x3 },
        { href: '/about', label: 'About', icon: Info },
    ];

    return (
        <>
            <nav className={styles.bottomNav}>
                <div className={styles.container}>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        if (item.onClick) {
                            return (
                                <button
                                    key={item.label}
                                    onClick={item.onClick}
                                    className={`${styles.navItem} ${isActive ? styles.active : ''} ${item.isPrimary ? styles.primary : ''}`}
                                >
                                    <div className={styles.iconWrapper}>
                                        <Icon size={item.isPrimary ? 28 : 22} strokeWidth={2} className={styles.icon} />
                                    </div>
                                    <span className={styles.label}>{item.label}</span>
                                </button>
                            );
                        }

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`${styles.navItem} ${isActive ? styles.active : ''} ${item.isPrimary ? styles.primary : ''}`}
                            >
                                <div className={styles.iconWrapper}>
                                    <Icon size={item.isPrimary ? 28 : 22} strokeWidth={2} className={styles.icon} />
                                </div>
                                <span className={styles.label}>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
            <DemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};
