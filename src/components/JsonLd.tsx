import React from 'react';

interface JsonLdProps {
  data: Record<string, any> | Array<Record<string, any>>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mantikole.my.id';

/**
 * GovernmentOffice & AdministrativeArea Schema (E-E-A-T Authority)
 */
export const villageGovernmentSchema = {
  '@context': 'https://schema.org',
  '@type': 'GovernmentOffice',
  '@id': `${BASE_URL}/#government`,
  name: 'Kantor Pemerintah Desa Mantikole',
  alternateName: ['Pemerintah Desa Mantikole', 'Pemdes Mantikole', 'Desa Mantikole'],
  description:
    'Kantor Pelayanan Resmi Pemerintah Desa Mantikole, Kecamatan Dolo Barat, Kabupaten Sigi, Provinsi Sulawesi Tengah. Pusat pelayanan administrasi surat mandiri dan informasi pariwisata pemandian air panas alami.',
  url: BASE_URL,
  logo: `${BASE_URL}/logo-asli.jpeg`,
  image: `${BASE_URL}/logo-asli.jpeg`,
  telephone: '+62-812-3456-7890',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jl. Poros Palu - Kulawi, Desa Mantikole',
    addressLocality: 'Dolo Barat',
    addressRegion: 'Kabupaten Sigi',
    postalCode: '94361',
    addressCountry: 'ID',
    addressState: 'Sulawesi Tengah',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -1.0745,
    longitude: 119.8322,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '15:00',
    },
  ],
  sameAs: [
    'https://www.facebook.com/desamantikole',
    'https://www.instagram.com/desamantikole',
  ],
};

/**
 * WebSite & Sitelinks SearchBox Schema
 */
export const websiteSearchSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  url: BASE_URL,
  name: 'Website Resmi Desa Mantikole',
  description: 'Portal Digital Resmi Pemerintah Desa Mantikole, Kecamatan Dolo Barat, Kabupaten Sigi.',
  publisher: {
    '@id': `${BASE_URL}/#government`,
  },
  inLanguage: 'id-ID',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/berita?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

/**
 * TouristAttraction Schema: Pemandian Air Panas Alami Mantikole
 */
export const airPanasSchema = {
  '@context': 'https://schema.org',
  '@type': 'TouristAttraction',
  '@id': `${BASE_URL}/wisata-komoditas#air-panas`,
  name: 'Pemandian Air Panas Alami Mantikole',
  description:
    'Destinasi wisata sumber mata air panas alami pegunungan yang kaya akan kandungan belerang untuk terapi kesehatan kulit dan kebugaran tubuh di Kabupaten Sigi, Sulawesi Tengah.',
  url: `${BASE_URL}/wisata-komoditas`,
  touristType: ['Ekowisata', 'Wisata Relaksasi', 'Wisata Kesehatan Alami'],
  isAccessibleForFree: false,
  publicAccess: true,
  openingHours: 'Mo-Su 07:00-18:00',
  priceRange: 'Rp 3.000 - Rp 5.000',
  location: {
    '@type': 'Place',
    name: 'Kawasan Wisata Air Panas Mantikole',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Desa Mantikole',
      addressLocality: 'Dolo Barat',
      addressRegion: 'Kabupaten Sigi',
      addressCountry: 'ID',
      addressState: 'Sulawesi Tengah',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -1.0745,
      longitude: 119.8322,
    },
  },
};

/**
 * TouristAttraction Schema: Wisata Air Terjun Mantikole
 */
export const airTerjunSchema = {
  '@context': 'https://schema.org',
  '@type': 'TouristAttraction',
  '@id': `${BASE_URL}/wisata-komoditas#air-terjun`,
  name: 'Wisata Air Terjun Mantikole',
  description:
    'Air terjun alami berair jernih dengan suasana hutan tropis asri di lereng pegunungan Desa Mantikole, Dolo Barat, Sigi.',
  url: `${BASE_URL}/wisata-komoditas`,
  isAccessibleForFree: true,
  publicAccess: true,
};

/**
 * FAQPage Schema (Highly cited by Google AI Overviews & Perplexity)
 */
export const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Berapa harga tiket masuk Pemandian Air Panas Alami Mantikole?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tiket masuk Pemandian Air Panas Alami Mantikole adalah Rp 5.000 untuk dewasa dan Rp 3.000 untuk anak-anak. Wisata buka setiap hari pukul 07:00 - 18:00 WITA dengan fasilitas gazebo, kamar bilas, kantin, dan area parkir luas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kapan jam operasional pelayanan Kantor Desa Mantikole?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pelayanan fisik di Kantor Desa Mantikole buka setiap hari kerja Senin hingga Jumat, pukul 08:00 - 15:00 WITA di Jl. Poros Palu - Kulawi. Sedangkan permohonan surat digital mandiri dan asisten AI Chatbot aktif 24 jam nonstop.',
      },
    },
    {
      '@type': 'Question',
      name: 'Bagaimana cara mengajukan Surat Keterangan Usaha (SKU) secara online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Warga dapat mengajukan SKU online melalui menu "Layanan Surat" di website resmi desamantikole.id dengan mengisi formulir NIK, Nama Lengkap, Nomor HP, dan detail usaha. Setelah diverifikasi perangkat desa, surat dapat diunduh langsung atau dicek melalui fitur lacak resi tiket.',
      },
    },
    {
      '@type': 'Question',
      name: 'Siapa nama Kepala Desa Mantikole saat ini?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pemerintah Desa Mantikole, Kecamatan Dolo Barat, Kabupaten Sigi saat ini dipimpin oleh Kepala Desa Drs. H. Moh. Rizal bersama Sekretaris Desa Ahmad Subagyo, S.Sos.',
      },
    },
    {
      '@type': 'Question',
      name: 'Apa komoditas perkebunan unggulan di Desa Mantikole?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Komoditas perkebunan unggulan Desa Mantikole meliputi biji kakao (cokelat) fermentasi berkualitas tinggi dengan estimasi produksi tahunan mencapai lebih dari 120 ton, serta hasil perkebunan cengkeh dan kelapa.',
      },
    },
  ],
};

/**
 * Generate BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

/**
 * Generate NewsArticle Schema for Blog/News Detail Pages
 */
export function generateArticleSchema(article: {
  title: string;
  summary?: string;
  content?: string;
  featured_image_url?: string;
  author_name?: string;
  created_at?: string;
  updated_at?: string;
  slug?: string;
  id?: string;
}) {
  const articleUrl = `${BASE_URL}/berita/${article.slug || article.id}`;
  const imageUrl = article.featured_image_url || `${BASE_URL}/images/wisata/air_panas.png`;

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    headline: article.title,
    description: article.summary || article.content?.slice(0, 160) || article.title,
    image: [imageUrl],
    datePublished: article.created_at || new Date().toISOString(),
    dateModified: article.updated_at || article.created_at || new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: article.author_name || 'Pemerintah Desa Mantikole',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Pemerintah Desa Mantikole',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo-asli.jpeg`,
      },
    },
    inLanguage: 'id-ID',
  };
}
