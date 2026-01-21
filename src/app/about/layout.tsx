import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About MR.COACH | Coaching With Purpose',
    description: 'Driven by discipline, consistency, and performance. We build athletes for life.',
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
