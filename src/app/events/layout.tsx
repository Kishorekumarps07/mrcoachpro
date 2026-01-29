import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Upcoming Events | MR.COACH',
    description: 'Explore upcoming fitness marathons, workshops, and sports tournaments near you.',
};

export default function EventsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
