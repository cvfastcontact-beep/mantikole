import React from 'react';

interface JsonLdProps {
  data: Record<string, any>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const villageGovernmentSchema = {
  '@context': 'https://schema.org',
  '@type': 'GovernmentOffice',
  name: 'Kantor Desa Mantikole',
  description: 'Kantor Pelayanan Pemerintah Desa Mantikole, Kecamatan Dolo Barat, Kabupaten Sigi, Sulawesi Tengah.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jalan Utama Desa Mantikole',
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
  openingHours: 'Mo-Fr 08:00-15:00',
  url: 'https://desamantikole.id',
};

export const airPanasSchema = {
  '@context': 'https://schema.org',
  '@type': 'TouristAttraction',
  name: 'Pemandian Air Panas Alami Mantikole',
  description: 'Destinasi wisata sumber mata air panas alami pegunungan yang kaya akan belerang di Kabupaten Sigi, Sulawesi Tengah.',
  location: {
    '@type': 'Place',
    name: 'Desa Mantikole',
    address: {
      '@type': 'PostalAddress',
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
  isAccessibleForFree: false,
  publicAccess: true,
};
