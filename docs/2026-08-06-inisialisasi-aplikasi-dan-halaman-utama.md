# Inisialisasi Aplikasi & Halaman Utama Frontend (2026-08-06)

Dokumen ini mencatat inisialisasi awal proyek **Frontend Web Application Website Desa Mantikole** menggunakan Next.js 16 (App Router), React 19, TypeScript, dan Tailwind CSS.

---

## 1. Setup Framework & Layout Global

### WHY (Mengapa)
Membuat struktur dasar aplikasi web publik Desa Mantikole yang responsif, memiliki performa SEO tinggi, serta tampilan antarmuka modern yang ramah pengguna bagi warga maupun wisatawan.

### HOW (Bagaimana)
- Menyiapkan `layout.tsx` utama yang membungkus komponen `Navbar`, `Footer`, dan widget `AiChatWidget`.
- Mengonfigurasi `globals.css` dengan Tailwind CSS dan variabel font Inter & Plus Jakarta Sans.
- Menyiapkan helper utility `fetchApi` di `src/lib/api.ts` untuk komunikasi dengan backend REST API Express.js.

### WHERE (Di Mana)
- [src/app/layout.tsx](file:///d:/KKN/Website/frontend/src/app/layout.tsx#L1-L56)
- [src/lib/api.ts](file:///d:/KKN/Website/frontend/src/lib/api.ts#L1-L32)
- [src/components/Navbar.tsx](file:///d:/KKN/Website/frontend/src/components/Navbar.tsx#L1-L132)

### WHAT (Apa)
```tsx
// src/app/layout.tsx
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AiChatWidget from '../components/AiChatWidget';

export const metadata = {
  title: 'Desa Mantikole - Portal Resmi Pemerintah Desa & Wisata Air Panas',
  description: 'Sistem Informasi dan Pelayanan Mandiri Desa Mantikole, Kecamatan Dolo Barat, Kabupaten Sigi.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased font-sans bg-slate-50 text-slate-900">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <AiChatWidget />
      </body>
    </html>
  );
}
```

---

## 2. Inisialisasi Halaman Utama & Fitur Publik Initial

### WHY (Mengapa)
Menyediakan halaman awal publik untuk profil desa, berita, permohonan surat mandiri, serta katalog wisata & komoditas.

### HOW (Bagaimana)
Membuat rute Next.js App Router:
- `/` (`src/app/page.tsx`): Beranda utama.
- `/berita` (`src/app/berita/page.tsx`): Portal warta & pengumuman desa.
- `/surat` (`src/app/surat/page.tsx`): Form permohonan surat mandiri & pelacakan resi.
- `/wisata-komoditas` (`src/app/wisata-komoditas/page.tsx`): Showcase destinasi wisata & produk komoditas kakao/cengkeh.
- `/admin` (`src/app/admin/page.tsx`): Panel login CMS desa.

### WHERE (Di Mana)
- [src/app/page.tsx](file:///d:/KKN/Website/frontend/src/app/page.tsx#L1-L355)
- [src/app/surat/page.tsx](file:///d:/KKN/Website/frontend/src/app/surat/page.tsx#L1-L504)
- [src/app/berita/page.tsx](file:///d:/KKN/Website/frontend/src/app/berita/page.tsx#L1-L230)

### WHAT (Apa)
```tsx
// src/lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Request HTTP error: status ${res.status}`);
  }

  return res.json();
}
```
