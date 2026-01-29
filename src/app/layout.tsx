import type { Metadata } from 'next';
import { Roboto, Josefin_Sans } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { ModalProvider } from '@/context/ModalContext';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-roboto',
  display: 'swap',
});

const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-josefin',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MR.COACH | Performance. Discipline. Energy.',
  description: 'A performance-first coaching platform for athletes of all ages.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${roboto.variable} ${josefin.variable}`}>
      <body suppressHydrationWarning>
        <ModalProvider>
          {children}
          <MobileBottomNav />
          <Footer />
        </ModalProvider>
      </body>
    </html>
  );
}
