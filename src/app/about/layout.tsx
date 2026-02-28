import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Our Story & Mission | Mr.Coach Fitness Company',
    description: 'Learn how MR.COACH is revolutionizing the fitness industry with a relentless commitment to discipline, performance, and measurable improvement.',
    keywords: ['fitness mission', 'mr.coach story', 'performance coaching philosophy'],
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
