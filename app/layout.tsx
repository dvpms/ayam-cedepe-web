import type { Metadata } from 'next';
import { JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import { JsonLdSchema } from '@/components/seo/JsonLdSchema';
import { OUTLET_CONFIG } from '@/config/site';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['500', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(OUTLET_CONFIG.siteUrl),
  title: 'Ayam Cedepe BSD: Jagonya Ayam Goreng Bawang Special',
  description:
    'Nikmati Ayam Cedepe di Ruko YC HUB, BSD City! Ayam goreng bawang bumbu meresap, bawang utuh goreng, kremesan renyah, dan sambal bawang pete mulai 20K.',
  keywords: [
    'Ayam Cedepe',
    'Ayam Cedepe BSD',
    'Ayam Goreng Bawang BSD',
    'Ruko YC HUB BSD City',
    'Sambal Bawang Pete BSD',
    'Kuliner BSD City',
    'Nasi Box Ayam Goreng BSD',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: OUTLET_CONFIG.siteUrl,
    siteName: OUTLET_CONFIG.branchName,
    title: 'Ayam Cedepe BSD: Jagonya Ayam Goreng Bawang Special',
    description:
      'Paket Cedepe 20K dan Paket Special 30K lengkap dengan bawang goreng utuh, kremesan gurih, dan sambal bawang pedas di Ruko YC HUB, BSD City.',
    images: [
      {
        url: '/images/ayam-goreng-bawang-hero.jpg',
        width: 1200,
        height: 900,
        alt: 'Sajian Ayam Goreng Bawang Special Ayam Cedepe BSD',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayam Cedepe BSD: Jagonya Ayam Goreng Bawang Special',
    description:
      'Ayam goreng bumbu bawang gurih bertabur kremesan dan sambal bawang pete di Ruko YC HUB, BSD City. Paket mulai 20K!',
    images: ['/images/ayam-goreng-bawang-hero.jpg'],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#FAF8F5] text-[#1C1917]">
        <JsonLdSchema />
        {children}
      </body>
    </html>
  );
}
