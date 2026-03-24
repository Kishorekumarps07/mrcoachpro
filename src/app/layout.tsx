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
    default: 'Mr.Coach | India\'s Most Trusted Collective of Elite Fitness Coaches',
    template: '%s | Mr.Coach - The Elite Collective'
  },
  description: 'Connect with India\'s premier fitness professionals. The Mr.Coach Trusted Collective offers world-class personal training, physiotherapy, and performance coaching tailored for high-achievers. Choose expertise. Choose Mr.Coach.',
  keywords: [
    'elite fitness coaches India', 
    'luxury personal trainers Bangalore', 
    'Mr.Coach Elite Collective', 
    'best physiotherapists Bangalore', 
    'performance coaching India', 
    'body recomposition experts',
    'certified fitness coaches',
    'premium wellness collective'
  ],
  authors: [{ name: 'Mr.Coach Elite Team' }],
  creator: 'Mr.Coach Fitness Company',
  publisher: 'Mr.Coach Fitness Company',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://mrcoach.in',
    title: 'Mr.Coach | India\'s Most Trusted Collective of Elite Fitness Coaches',
    description: 'Join the most elite fitness collective in India. World-class coaches, physiotherapists, and performance experts in one trusted platform.',
    siteName: 'Mr.Coach Elite Collective',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mr.Coach Elite Collective - India\'s Most Trusted Coaches',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mr.Coach | Elite Fitness Collective',
    description: 'Transform your performance with India\'s premier coaching collective.',
    creator: '@mrcoach_official',
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
  alternates: {
    canonical: 'https://mrcoach.in',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Mr.Coach Elite Collective',
    image: 'https://mrcoach.in/favicon-mrcoach.jpg',
    '@id': 'https://mrcoach.in',
    url: 'https://mrcoach.in',
    telephone: '+910000000000', // Placeholder
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bangalore',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
    description: 'India\'s most trusted collective of elite fitness coaches and health professionals.',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      opens: '00:00',
      closes: '23:59',
    },
    sameAs: [
      'https://www.facebook.com/mrcoach',
      'https://www.instagram.com/mrcoach',
      'https://www.linkedin.com/company/mrcoach'
    ]
  };

  return (
    <html lang="en" className={`${roboto.variable} ${josefin.variable} ${crimsonPro.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
