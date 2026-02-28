import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Shop Premium Supplements & Gym Gear | Mr.Coach Fitness Company',
    description: 'Buy authentic whey protein, pre-workouts, mass gainers, vitamins, and premium gym gear directly from Mr.Coach.',
    keywords: ['buy whey protein online', 'gym supplements india', 'mr coach store', 'fitness gear'],
};

export default function ShopSeoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
