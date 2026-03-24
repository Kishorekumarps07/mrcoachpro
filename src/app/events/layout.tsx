import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Elite Fitness Events & Workshops | The Collective',
    description: 'Join exclusive athlete workshops, performance seminars, and elite fitness competitions hosted by Mr.Coach. Elevate your potential with the best.',
    keywords: ['fitness workshops India', 'athlete performance seminars', 'Mr.Coach elite events', 'coaching certifications'],
};

export default function EventsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
