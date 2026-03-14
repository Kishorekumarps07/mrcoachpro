import type { Metadata } from 'next';
import Script from 'next/script';
import { Roboto, Josefin_Sans, Crimson_Pro } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { Providers } from '@/components/providers/Providers';
import { TicketWidget } from '@/components/ticketing/TicketWidget';

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

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-crimson',
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
    <html lang="en" className={`${roboto.variable} ${josefin.variable} ${crimsonPro.variable}`}>
      <body suppressHydrationWarning>
        <Script id="meta-pixel" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '26230170606645325');
            fbq('track', 'PageView');
          `
        }} />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=26230170606645325&ev=PageView&noscript=1"
            alt="Meta Pixel"
          />
        </noscript>
        <Providers>
          {children}
          <Suspense fallback={null}>
            <MobileBottomNav />
          </Suspense>
          <Footer />
          <TicketWidget />
        </Providers>
      </body>
    </html>
  );
}
