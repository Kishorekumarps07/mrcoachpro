import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meet Our Elite Coaches | The Trusted Collective',
  description: 'Connect with India\'s highest-rated fitness coaches, physiotherapists, and wellness experts. Certified professionals dedicated to your transformation.',
  keywords: ['fitness coaches Bangalore', 'certified personal trainers', 'best physiotherapists India', 'health and wellness experts'],
  openGraph: {
    title: 'Elite Fitness Coaches | Mr.Coach Collective',
    description: 'Expert-led training and recovery by India\'s most trusted professionals.',
    url: 'https://mrcoach.in/coaches',
  }
};

export default function CoachesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
