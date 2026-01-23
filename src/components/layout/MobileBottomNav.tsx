'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Zap, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '@/context/ModalContext'; // Import context
import styles from './MobileBottomNav.module.css';

// Custom Doctor Icon to match user preference
const DoctorIcon = ({ size = 24, className }: { size?: number, className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <circle cx="12" cy="7" r="4" />
        <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        <path d="M8 14v1a4 4 0 0 0 8 0v-1" />
        <path d="M12 19v2" />
    </svg>
);

export const MobileBottomNav = () => {
    const pathname = usePathname();
    const { openModal } = useModal(); // Use context

    const navItems = [
        { href: '/', label: 'HOME', icon: Home },
        { href: '/events', label: 'EVENTS', icon: Calendar },
        { href: '#', label: 'BOOK NOW', icon: Zap, isPrimary: true, onClick: openModal }, // Use global openModal
        { href: '/services', label: 'SERVICES', icon: DoctorIcon },
        { href: '/about', label: 'ABOUT', icon: Info },
    ];

    return (
        <motion.nav
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className={styles.bottomNav}
        >
            <div className={styles.container}>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    const isPrimary = item.isPrimary;

                    const content = (
                        <>
                            {isActive && !isPrimary && (
                                <motion.div
                                    layoutId="activeTab"
                                    className={styles.activeIndicator}
                                    transition={{ type: 'spring', duration: 0.5 }}
                                />
                            )}
                            <div className={styles.iconWrapper}>
                                {isPrimary && (
                                    <motion.div
                                        className={styles.ripple}
                                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                )}
                                <motion.div
                                    animate={isActive ? { scale: 1.2, rotate: [0, -10, 10, 0] } : { scale: 1, rotate: 0 }}
                                    transition={{
                                        scale: { type: 'spring', stiffness: 400, damping: 10 },
                                        rotate: { duration: 0.4, ease: 'easeInOut' }
                                    }}
                                >
                                    <Icon size={isPrimary ? 34 : 26} strokeWidth={2} className={styles.icon} />
                                </motion.div>
                            </div>
                            <span className={styles.label}>{item.label}</span>
                        </>
                    );

                    if (item.onClick) {
                        return (
                            <motion.button
                                key={item.label}
                                onClick={item.onClick}
                                className={`${styles.navItem} ${isActive ? styles.active : ''} ${isPrimary ? styles.primary : ''}`}
                                whileTap={{ scale: 0.9 }}
                            >
                                {content}
                            </motion.button>
                        );
                    }

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${styles.navItem} ${isActive ? styles.active : ''} ${isPrimary ? styles.primary : ''}`}
                        >
                            <motion.div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }} whileTap={{ scale: 0.9 }}>
                                {content}
                            </motion.div>
                        </Link>
                    );
                })}
            </div>
        </motion.nav>
    );
};
