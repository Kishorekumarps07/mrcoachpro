import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Join Our Team | Mr.Coach Fitness Company',
    description: 'Join Our Fitness Family - Where Passion Meets Profession! Explore career opportunities with MR.COACH.',
    keywords: ['fitness jobs', 'gym careers', 'mr coach hiring', 'personal trainer jobs'],
};

export default function JoinTeamLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
