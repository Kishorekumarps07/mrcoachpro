import { Metadata } from 'next';
import { BookDemoForm } from '@/components/ui/BookDemoForm';
import { Navbar } from '@/components/layout/Navbar';

export const metadata: Metadata = {
    title: 'Book a Demo | MR.COACH',
    description: 'Schedule a demo session with MR.COACH and start your performance journey.',
};

export default function BookDemoPage() {
    return (
        <main style={{ minHeight: '100vh', background: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <BookDemoForm isPage={true} />
            </div>
        </main>
    );
}
