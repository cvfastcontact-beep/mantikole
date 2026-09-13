import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AiChatWidget from '../components/AiChatWidget';
import JsonLd, { villageGovernmentSchema, websiteSearchSchema } from '../components/JsonLd';
import { ToastProvider } from '../context/ToastContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mantikole.my.id';
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Website Resmi Desa Mantikole - Wisata Air Panas Alami & Pelayanan Digital Sigi',
    template: '%s | Desa Mantikole',
  },
  description:
    'Portal digital resmi Pemerintah Desa Mantikole, Kecamatan Dolo Barat, Kabupaten Sigi, Sulawesi Tengah. Pusat informasi destinasi wisata pemandian air panas alami, perkebunan kakao, warta pembangunan, dan layanan pengajuan surat mandiri digital.',
  keywords: [
    'Desa Mantikole',
    'Pemandian Air Panas Mantikole',
    'Wisata Air Panas Sigi',
    'Wisata Mantikole',
    'Dolo Barat',
    'Kabupaten Sigi',
    'Sulawesi Tengah',
    'Perkebunan Kakao Mantikole',
    'Layanan Surat Desa Mantikole',
    'Surat Keterangan Usaha Mantikole',
    'SKU Mantikole',
    'Pemerintah Desa Mantikole',
    'Kepala Desa Mantikole',
  ],
  authors: [{ name: 'Pemerintah Desa Mantikole', url: siteUrl }],
  creator: 'Pemerintah Desa Mantikole',
  publisher: 'Pemerintah Desa Mantikole',
  category: 'Government & Tourism',
  alternates: {
    canonical: '/',
    languages: {
      'id-ID': '/',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Website Resmi Desa Mantikole - Wisata Air Panas Alami & Pelayanan Digital Sigi',
    description:
      'Portal resmi Pemerintah Desa Mantikole, Kecamatan Dolo Barat, Kabupaten Sigi. Informasi destinasi wisata air panas alami belerang, hasil bumi kakao, dan layanan surat mandiri online 24 jam.',
    url: siteUrl,
    siteName: 'Website Resmi Desa Mantikole',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/images/wisata/air_panas.png`,
        width: 1200,
        height: 630,
        alt: 'Pemandian Air Panas Alami Desa Mantikole, Kabupaten Sigi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Resmi Desa Mantikole - Wisata Air Panas & Pelayanan Digital',
    description:
      'Portal resmi Pemerintah Desa Mantikole, Kecamatan Dolo Barat, Kabupaten Sigi, Sulawesi Tengah. Destinasi wisata air panas alami & layanan surat mandiri.',
    images: [`${siteUrl}/images/wisata/air_panas.png`],
  },
  icons: {
    icon: [
      { url: '/logo-asli.jpeg', sizes: 'any' },
      { url: '/icon.jpeg', type: 'image/jpeg' },
    ],
    apple: [
      { url: '/logo-asli.jpeg', sizes: '180x180', type: 'image/jpeg' },
    ],
    shortcut: ['/logo-asli.jpeg'],
  },
  verification: {
    google: googleVerification || undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable} suppressHydrationWarning>
      <head>
        <JsonLd data={[villageGovernmentSchema, websiteSearchSchema]} />
      </head>
      <body
        className={`${inter.className} bg-white text-[#0a0a0a] antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        <ToastProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <AiChatWidget />
        </ToastProvider>
      </body>
    </html>
  );
}
