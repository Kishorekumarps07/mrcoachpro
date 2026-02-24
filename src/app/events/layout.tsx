import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Upcoming Fitness Events & Workshops | MR.COACH',
    description: 'Join elite fitness marathons, intensive performance workshops, and competitive sports tournaments. View our upcoming events calendar.',
};

export default function EventsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
