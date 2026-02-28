import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | Mr.Coach Fitness Company',
    description: 'Get in touch with the MR.COACH team for fitness programs, sports events, or corporate bookings.',
    keywords: ['contact mr coach', 'fitness app support', 'corporate wellness coaching'],
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
