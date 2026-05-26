import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { InvestmentSection } from '@/components/ui/InvestmentSection';

export const metadata: Metadata = {
  title: 'Invest in the Future of Fitness | Mr.Coach',
  description:
    'Partner with MrCoachPro — India\'s fastest growing fitness & coaching platform. Explore investment, franchise, and partnership opportunities.',
  alternates: {
    canonical: 'https://mrcoach.in/invest',
  },
};

export default function InvestPage() {
  return (
    <main style={{ background: '#ffffff' }}>
      <Navbar />
      <div style={{ paddingTop: '64px', background: '#ffffff' }}>
        <InvestmentSection />
      </div>
    </main>
  );
}
