import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Precision & Performance: Our Mission | Mr.Coach',
    description: 'Discover the philosophy behind India\'s most trusted fitness collective. Built on discipline, consistency, and the relentless pursuit of elite performance.',
    keywords: ['fitness philosophy', 'performance coaching mission', 'Mr.Coach history', 'elite athletic training philosophy'],
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
