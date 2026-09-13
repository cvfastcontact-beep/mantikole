import { Flame, Trees, FileText } from 'lucide-react';
import React from 'react';

export interface PerangkatDesa {
  name: string;
  role: string;
  desc: string;
  image: string;
}

export const PERANGKAT_DESA: PerangkatDesa[] = [
  {
    name: "Drs. H. Moh. Rizal",
    role: "Kepala Desa",
    desc: "Pemimpin Pemerintah Desa Mantikole",
    image: "/images/perangkat/kepala_desa.png",
  },
  {
    name: "Ahmad Subagyo, S.Sos",
    role: "Sekretaris Desa",
    desc: "Koordinator Administrasi & Keuangan",
    image: "/images/perangkat/sekretaris_desa.png",
  },
  {
    name: "Ir. Hendra Prasetyo",
    role: "Ketua BPD",
    desc: "Badan Permusyawaratan Desa",
    image: "/images/perangkat/ketua_bpd.png",
  },
  {
    name: "Siti Rahmawati, S.E",
    role: "Kaur Keuangan",
    desc: "Pengelola Anggaran & Keuangan Desa",
    image: "/images/perangkat/kaur_keuangan.png",
  },
  {
    name: "Rahmat Hidayat, S.IP",
    role: "Kasi Pemerintahan",
    desc: "Pelayanan Publik & Tataprama Desa",
    image: "/images/perangkat/kasi_pemerintahan.png",
  },
];

export const BENTO_FEATURES = [
  {
    Icon: Flame,
    name: "Pemandian Air Panas Alami Mantikole",
    description: "Mata air panas alami pegunungan Sigi kaya belerang murni. Berkhasiat tinggi untuk relaksasi otot, kesehatan kulit, dan kebugaran tubuh.",
    href: "/wisata-komoditas",
    cta: "Lihat Rute & Informasi Tiket",
    className: "col-span-1 md:col-span-2",
    badgeText: "Wisata Utama • Rp 5.000",
  },
  {
    Icon: Trees,
    name: "Perkebunan Kakao Superior",
    description: "Pilar ekonomi utama warga Desa Mantikole. Menghasilkan biji kakao mentah fermentasi berkualitas tinggi yang dipasok ke industri nasional.",
    href: "/wisata-komoditas",
    cta: "Lihat Detail Komoditas",
    className: "col-span-1 md:col-span-1",
    badgeText: "Komoditas • Rp 35.000/Kg",
  },
  {
    Icon: Trees,
    name: "Wisata Air Terjun Mantikole",
    description: "Gemericik air pegunungan jernih dan segar di tengah hutan tropis pegunungan Dolo Barat. Cocok untuk trekking dan rekreasi keluarga.",
    href: "/wisata-komoditas",
    cta: "Lihat Jalur Trekking",
    className: "col-span-1 md:col-span-1",
    badgeText: "Wisata Alam • Gratis",
  },
  {
    Icon: FileText,
    name: "Portal Layanan Surat Mandiri",
    description: "Ajukan permohonan Surat Keterangan Usaha (SKU), Domisili (SKD), atau SKTM secara mandiri berbasis NIK tanpa mengantre di kantor desa.",
    href: "/surat",
    cta: "Buat Surat Mandiri Sekarang",
    className: "col-span-1 md:col-span-2",
    badgeText: "Pelayanan 24/7",
  },
];

export const DEFAULT_WISATA_ITEMS = [
  {
    id: 1,
    title: 'Pemandian Air Panas Alami Mantikole',
    type: 'wisata',
    price_info: 'Rp 5.000 / Orang',
    location_details: 'Mantikole, Dolo Barat, Sigi, Sulteng',
    src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop',
    description: 'Mata air panas belerang alami pegunungan Sigi untuk terapi dan kesehatan.',
    ctaText: 'Rute Google Maps',
    ctaLink: 'https://www.google.com/maps/search/?api=1&query=-1.0745,119.8322',
    full_description:
      'Sumber air panas alami Mantikole berasal dari kedalaman bumi lereng pegunungan Dolo Barat. Air panas murni kaya akan mineral belerang alami yang dipercaya oleh masyarakat sekitar berkhasiat tinggi untuk menyembuhkan penyakit kulit, merelaksasi otot yang kaku, serta menyegarkan kebugaran tubuh setelah beraktivitas.',
  },
  {
    id: 2,
    title: 'Perkebunan Kakao (Cokelat) Superior',
    type: 'komoditas',
    price_info: 'Rp 35.000 / Kg',
    location_details: 'Lahan Perkebunan Warga Mantikole',
    src: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=1200&auto=format&fit=crop',
    description: 'Komoditas utama perkebunan warga Desa Mantikole penghasil biji kakao mentah berkualitas.',
    ctaText: 'Informasi Komoditas',
    ctaLink: '/berita',
    full_description:
      'Kakao merupakan komoditas perkebunan andalan utama warga Desa Mantikole. Biji kakao mentah difermentasi secara tradisional untuk menghasilkan aroma khas dan cita rasa cokelat terbaik yang dipasok ke berbagai pengolah cokelat lokal dan industri nasional.',
  },
  {
    id: 3,
    title: 'Air Terjun Pegunungan Mantikole',
    type: 'wisata',
    price_info: 'Gratis (Akses Terbuka)',
    location_details: 'Hutan Tropis Pegunungan Mantikole',
    src: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=1200&auto=format&fit=crop',
    description: 'Air terjun alami di tengah hutan hujan tropis Sigi dengan gemericik air yang jernih dan segar.',
    ctaText: 'Rute Google Maps',
    ctaLink: 'https://www.google.com/maps/search/?api=1&query=-1.0745,119.8322',
    full_description:
      'Tersembunyi di rimbunnya hutan tropis Dolo Barat, Air Terjun Mantikole menyuguhkan pemandangan alur sungai alami dan kolam jernih yang dikelilingi batuan sungai besar. Tempat yang sangat tenang untuk trekking dan rekreasi bersama keluarga.',
  },
  {
    id: 4,
    title: 'Komoditas Cengkeh & Kelapa Mantikole',
    type: 'komoditas',
    price_info: 'Hasil Panen Musiman',
    location_details: 'Dusun I & II Mantikole',
    src: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop',
    description: 'Rempah aromatik cengkeh kualifikasi ekspor dan kelapa murni perkebunan rakyat.',
    ctaText: 'Informasi Komoditas',
    ctaLink: '/berita',
    full_description:
      'Selain kakao, pertanian rakyat Mantikole menghasilkan rempah cengkeh aromatik kering dan komoditas kelapa segar yang menopang perekonomian keluarga tani secara berkelanjutan.',
  },
];

export const DEFAULT_ARTICLES = [
  {
    id: '22222222-2222-2222-2222-222222222221',
    title: 'Pengembangan Destinasi Wisata Pemandian Air Panas Mantikole Berbasis Ekowisata',
    slug: 'pengembangan-destinasi-wisata-pemandian-air-panas-mantikole',
    content: `Pemerintah Desa Mantikole bersama Tim KKN menginisiasi program revitalisasi fasilitas Pemandian Air Panas Alami Mantikole. Program ini mencakup penataan area sanitasi, penyediaan fasilitas informasi digital berbasis QR code, serta peningkatan aksesibilitas bagi pengunjung.\n\nPemandian air panas ini memiliki kandungan belerang alami dari sumber air pegunungan yang sangat berkhasiat untuk relaksasi otot dan kesehatan kulit. Melalui sentuhan inovasi digital, wisatawan kini dapat mengakses peta digital dan reservasi tiket secara efisien.`,
    summary: 'Pemerintah Desa Mantikole bersama Tim KKN merevitalisasi fasilitas Pemandian Air Panas Alami berbasis ekowisata dan integrasi informasi digital.',
    category: 'Pembangunan',
    featured_image_url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    author_name: 'Perangkat Desa Mantikole',
    views_count: 142,
    created_at: '2026-08-01T09:00:00.000Z',
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    title: 'Peluncuran Portal Pelayanan Administrasi Digital Warga Mantikole',
    slug: 'peluncuran-portal-pelayanan-administrasi-digital-warga-mantikole',
    content: `Untuk mempermudah kepengurusan surat keterangan usaha (SKU), surat domisili (SKD), dan surat keterangan tidak mampu (SKTM), Desa Mantikole kini meluncurkan portal layanan surat mandiri secara online.\n\nWarga cukup memasukkan NIK dan identitas tanpa perlu membuat akun, mengunduh berkas template resmi, dan menerima Nomor Tiket Resi unik (contoh: MNT-2026-08001) untuk memantau proses verifikasi dari perangkat desa.`,
    summary: 'Desa Mantikole merilis portal pengajuan surat mandiri berbasis nomor resi unik tanpa perlu mengantre lama di kantor desa.',
    category: 'Pengumuman',
    featured_image_url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    author_name: 'Sekretariat Desa Mantikole',
    views_count: 98,
    created_at: '2026-08-03T10:30:00.000Z',
  },
  {
    id: '22222222-2222-2222-2222-222222222223',
    title: 'Program Pendampingan Petani Kakao Mantikole Peningkatan Mutu Biji Kering',
    slug: 'program-pendampingan-petani-kakao-mantikole',
    content: `Upaya mendorong perekonomian desa dilakukan melalui sosialisasi teknik fermentasi biji kakao modern agar nilai jual di tingkat kelompok tani semakin meningkat. Kakao Mantikole merupakan pilar ekonomi utama warga yang diminati oleh berbagai industri cokelat.`,
    summary: 'Sosialisasi teknik fermentasi biji kakao modern digelar untuk meningkatkan daya saing hasil panen petani kakao Mantikole.',
    category: 'Edukasi',
    featured_image_url: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=80',
    author_name: 'Tim Penyuluh Pertanian',
    views_count: 76,
    created_at: '2026-08-05T14:15:00.000Z',
  },
];
