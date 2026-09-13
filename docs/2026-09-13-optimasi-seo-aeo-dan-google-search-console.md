# Dokumentasi Teknis: Optimasi SEO, AEO (Answer Engine Optimization), dan Integrasi Google Search Console

**Tanggal:** 13 September 2026  
**Topik:** Search Engine Optimization (SEO), Answer Engine Optimization (AEO), Schema.org JSON-LD Structured Data, Dynamic Sitemap, AI Crawler Robots.txt, dan Google Search Console Verification  
**Standar Koding:** Minimalis, zero useless dependencies (/ponytail), clean architecture (/clean-code-principles), dan komprehensif (/code-documentation).

---

## 1. WHY (Mengapa)

1. **Visibilitas Mesin Pencari Tradisional (SEO):** Website Desa Mantikole membutuhkan visibilitas tinggi di Google, Bing, dan mesin pencari lainnya untuk kata kunci strategis seperti *"Desa Mantikole"*, *"Pemandian Air Panas Mantikole"*, *"Air Terjun Mantikole"*, dan *"Layanan Surat Desa Mantikole"*.
2. **Kesiapan Generative AI & Citasi AI Search (AEO):** Pengguna modern mencari informasi melalui Answer Engines seperti **Perplexity AI**, **ChatGPT (SearchGPT)**, **Claude**, dan **Google AI Overviews (SGE)**. Tanpa data terstruktur (JSON-LD) dan izin perayap khusus AI, informasi desa berisiko diabaikan atau disajikan secara keliru oleh LLM.
3. **Verifikasi Instan Google Search Console (GSC):** Pengelola website memerlukan cara mudah untuk mengklaim kepemilikan domain di Google Search Console tanpa harus mengedit kode sumber setiap kali token verifikasi berubah.
4. **Perayapan Dinamis & Lengkap:** Google dan bot AI memerlukan peta situs (sitemap) yang terupdate secara otomatis setiap ada warta/artikel baru yang dipublikasikan oleh aparatur desa.

---

## 2. HOW (Bagaimana)

Penerapan dilakukan secara terpadu melalui standar modern Next.js App Router (Turbopack):

1. **AI-Permissive & Secure `robots.txt` (`src/app/robots.ts`):**
   - Mengizinkan perayapan umum (`User-Agent: *`).
   - Secara eksplisit mengizinkan bot AI terkemuka (`GPTBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended`, `Meta-ExternalAgent`, `Amazonbot`, `Bytespider`, `cohere-ai`, `Diffbot`, `CCBot`).
   - Memblokir akses ke area privat/manajerial (`/admin`, `/admin/*`, `/api/*`).
   - Mengarahkan bot langsung ke URL sitemap XML (`/sitemap.xml`).

2. **Dynamic XML Sitemap (`src/app/sitemap.ts`):**
   - Mendefinisikan seluruh rute statis inti (`/`, `/berita`, `/wisata-komoditas`, `/surat`, `/profil`, dll.) beserta bobot prioritas (`priority`) dan frekuensi perubahan (`changeFrequency`).
   - Mengambil seluruh daftar artikel warta publikasi secara dinamis via API backend `/articles` untuk menambahkan URL dinamis (`/berita/[id]`) beserta stempel waktu `lastModified` aktual.

3. **Komprehensif Schema.org JSON-LD (`src/components/JsonLd.tsx`):**
   - `villageGovernmentSchema`: Tipe `GovernmentOffice` lengkap dengan koordinat geospasial (`geo`), alamat fisik (`PostalAddress`), jam operasional layanan (`openingHoursSpecification`), dan kontak resmi.
   - `websiteSearchSchema`: Tipe `WebSite` dengan aksi pencarian terintegrasi (`SearchAction`).
   - `airPanasSchema` & `airTerjunSchema`: Tipe `TouristAttraction` lengkap dengan informasi geo-lokasi, deskripsi keindahan alam, dan struktur harga tiket masuk (`offers`).
   - `faqPageSchema`: Tipe `FAQPage` berisi 5 tanya-jawab fakta kunci (Nama Kepala Desa, Lokasi & Rute, Jam Buka Pemandian Air Panas, Pengurusan Surat Online, dan Komoditas Unggulan) yang diformat khusus agar langsung dikutip oleh AI Overviews & Perplexity.
   - `generateArticleSchema()`: Tipe `NewsArticle` untuk halaman detail berita.
   - `generateBreadcrumbSchema()`: Tipe `BreadcrumbList` untuk navigasi hirarki halaman di SERP Google.

4. **Root Metadata & GSC Verification (`src/app/layout.tsx`):**
   - Pengaturan `metadataBase` dengan URL resmi desa.
   - Integrasi `verification.google` yang membaca variabel lingkungan `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
   - Konfigurasi `openGraph` dan `twitter:card: summary_large_image` untuk tampilan thumbnail pratinjau sosial media.

---

## 3. WHERE (Di Mana)

File-file yang dibuat dan dimodifikasi:

- [robots.ts](file:///d:/KKN/Website/frontend/src/app/robots.ts) — Konfigurasi aturan perayapan bot mesin pencari dan AI agent.
- [sitemap.ts](file:///d:/KKN/Website/frontend/src/app/sitemap.ts) — Generator peta situs XML dinamis terintegrasi API warta.
- [JsonLd.tsx](file:///d:/KKN/Website/frontend/src/components/JsonLd.tsx) — Modul komponen reaktif & generator skema data terstruktur Schema.org JSON-LD.
- [layout.tsx](file:///d:/KKN/Website/frontend/src/app/layout.tsx) — Root layout metadata, canonical, OpenGraph, GSC verification tag, dan injeksi skema global.
- [page.tsx (Landing Page)](file:///d:/KKN/Website/frontend/src/app/page.tsx) — Injeksi skema FAQPage desa.
- [page.tsx (Wisata & Komoditas)](file:///d:/KKN/Website/frontend/src/app/wisata-komoditas/page.tsx) — Injeksi skema TouristAttraction dan BreadcrumbList.
- [page.tsx (Layanan Surat)](file:///d:/KKN/Website/frontend/src/app/surat/page.tsx) — Injeksi skema BreadcrumbList.
- [page.tsx (Warta Desa)](file:///d:/KKN/Website/frontend/src/app/berita/page.tsx) — Injeksi skema BreadcrumbList.
- [[id]/page.tsx (Detail Warta)](file:///d:/KKN/Website/frontend/src/app/berita/[id]/page.tsx) — Injeksi skema NewsArticle dan BreadcrumbList dinamis.
- [.env.local](file:///d:/KKN/Website/frontend/.env.local) — Konfigurasi environment URL domain & token Google Search Console.

---

## 4. WHAT (Apa)

### A. Contoh Injeksi Schema.org pada Komponen

```tsx
// src/components/JsonLd.tsx
export const villageGovernmentSchema = {
  "@context": "https://schema.org",
  "@type": "GovernmentOffice",
  "@id": "https://desamantikole.id/#government",
  name: "Pemerintah Desa Mantikole",
  alternateName: "Kantor Desa Mantikole",
  description: "Pusat Pelayanan Publik dan Administrasi Pemerintahan Desa Mantikole...",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Poros Palu - Kulawi, Desa Mantikole",
    addressLocality: "Dolo Barat",
    addressRegion: "Sulawesi Tengah",
    postalCode: "94361",
    addressCountry: "ID",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -1.0833,
    longitude: 119.8333,
  },
  // ...
};
```

### B. Injeksi Dinamis pada Halaman Warta Detail

```tsx
// src/app/berita/[id]/page.tsx
<JsonLd
  schema={[
    generateBreadcrumbSchema([
      { name: "Beranda", url: "/" },
      { name: "Warta Desa", url: "/berita" },
      { name: article.title, url: `/berita/${article.id}` },
    ]),
    generateArticleSchema({
      title: article.title,
      description: article.summary || article.content.substring(0, 160),
      url: `/berita/${article.id}`,
      imageUrl: article.image_url,
      datePublished: article.published_at || article.created_at,
      dateModified: article.updated_at || article.created_at,
      authorName: article.author || "Pemerintah Desa Mantikole",
    }),
  ]}
/>
```

---

## 5. Panduan Verifikasi Google Search Console

1. Buka [Google Search Console](https://search.google.com/search-console).
2. Tambahkan properti baru dengan memilih tipe **URL Prefix** (contoh: `https://desamantikole.id` atau domain Vercel/VPS Anda).
3. Pada metode verifikasi, pilih **HTML Tag**.
4. Salin kode meta tag bagian content: `google-site-verification=KODE_UNIK_ANDA`.
5. Masukkan kode tersebut ke dalam file `frontend/.env.local`:
   ```env
   NEXT_PUBLIC_SITE_URL=https://desamantikole.id
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=KODE_UNIK_ANDA
   ```
6. Build dan jalankan website. Klik tombol **Verify** pada Google Search Console.
7. Setelah terverifikasi, buka menu **Sitemaps** pada Search Console dan submit:
   ```text
   https://desamantikole.id/sitemap.xml
   ```
