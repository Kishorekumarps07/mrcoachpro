import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | Get in Touch with MR.COACH',
    description: 'Have questions about our fitness programs, sports events, or corporate bookings? Reach out to the MR.COACH team today.',
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
