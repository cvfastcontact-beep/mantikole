import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AiChatWidget from '../components/AiChatWidget';
import JsonLd, { villageGovernmentSchema } from '../components/JsonLd';
import { ToastProvider } from '../context/ToastContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Website Resmi Desa Mantikole - Wisata Air Panas & Perkebunan Sigi',
  description: 'Portal resmi Desa Mantikole, Kecamatan Dolo Barat, Kabupaten Sigi. Informasi wisata pemandian air panas alami belerang, komoditas kakao, dan layanan surat mandiri digital.',
  keywords: [
    'Desa Mantikole',
    'Air Panas Mantikole',
    'Wisata Sigi',
    'Dolo Barat',
    'Pemandian Air Panas Alami',
    'Kakao Mantikole',
    'Layanan Surat Mantikole',
    'SKU Mantikole',
  ],
  authors: [{ name: 'Pemerintah Desa Mantikole' }],
  openGraph: {
    title: 'Website Resmi Desa Mantikole - Wisata Air Panas & Perkebunan Sigi',
    description: 'Portal digital resmi Desa Mantikole, Kecamatan Dolo Barat, Kabupaten Sigi, Sulawesi Tengah.',
    url: 'https://desamantikole.id',
    siteName: 'Desa Mantikole',
    locale: 'id_ID',
    type: 'website',
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
        <JsonLd data={villageGovernmentSchema} />
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
