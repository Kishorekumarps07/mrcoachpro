import type { Metadata } from 'next';
import { ShopClientWrapper } from './ShopClientWrapper';

export const metadata: Metadata = {
    title: 'Premium Supplements & Elite Gear | Mr.Coach Shop',
    description: 'Fuel your transformation with high-performance supplements and elite training gear curated by the Mr.Coach Collective. Quality without compromise.',
    keywords: ['buy gym supplements India', 'elite workout gear', 'Mr.Coach products', 'performance nutrition'],
};

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <ShopClientWrapper>{children}</ShopClientWrapper>;
}
