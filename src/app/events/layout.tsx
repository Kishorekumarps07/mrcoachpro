import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Upcoming Fitness Events & Competitions | Mr.Coach Fitness',
    description: 'Register for the biggest fitness events, hackathons, and marathons hosted by MR.COACH. Join the elite fitness community.',
    keywords: ['fitness events india', 'mr.coach marathons', 'sports competitions'],
};

export default function EventsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
