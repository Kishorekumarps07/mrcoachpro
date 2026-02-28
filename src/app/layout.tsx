import type { Metadata } from 'next';
import { Roboto, Josefin_Sans } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { Providers } from '@/components/providers/Providers';

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
  metadataBase: new URL('https://mrcoach.in'),
  title: {
    default: 'Mr.Coach Fitness Company',
    template: '%s | Mr.Coach Fitness Company'
  },
  description: 'A performance-first coaching platform and premium supplement store for athletes of all ages. Built on discipline, consistency, and measurable results.',
  keywords: ['fitness coaching', 'performance training', 'athletic development', 'online coaching', 'Mr.Coach Fitness Company', 'personal training India', 'buy gym supplements'],
  authors: [{ name: 'Mr.Coach Team' }],
  creator: 'Mr.Coach Fitness Company',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://mrcoach.in',
    title: 'Mr.Coach Fitness Company',
    description: 'A performance-first coaching platform for athletes of all ages. Join the elite.',
    siteName: 'Mr.Coach Fitness Company',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mr.Coach Fitness Company',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mr.Coach Fitness Company',
    description: 'A performance-first coaching platform for athletes of all ages.',
    creator: '@mrcoach',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon-mrcoach.jpg',
    shortcut: '/favicon-mrcoach.jpg',
    apple: '/favicon-mrcoach.jpg',
  },
  verification: {
    google: 'verification_token', // Place holder if they want to add HTML tag verification later
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${roboto.variable} ${josefin.variable}`}>
      <body suppressHydrationWarning>
        <Providers>
          {children}
          <Suspense fallback={null}>
            <MobileBottomNav />
          </Suspense>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
