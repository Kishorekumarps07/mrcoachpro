import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About MR.COACH | Coaching With Purpose and Discipline',
    description: 'Driven by discipline, consistency, and performance. We build athletes for life. Discover the mission and values behind MR.COACH.',
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
