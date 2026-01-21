import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact | MR.COACH',
    description: 'Start your training journey. Get in touch with a coach today.',
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
