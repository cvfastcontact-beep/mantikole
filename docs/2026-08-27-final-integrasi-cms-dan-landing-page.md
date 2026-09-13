# Integrasi UI Final CMS Dashboard & Seluruh Konten Publik (2026-08-27)

Dokumen ini mencatat integrasi menyeluruh (*end-to-end*) antara data yang dikelola oleh Administrator pada panel CMS Dashboard dengan seluruh tampilan antarmuka publik Website Desa Mantikole, menghapus seluruh teks statis *hardcoded* agar sistem dapat dikelola secara mandiri tanpa menyentuh source code.

---

## 1. Integrasi Dinamis Hero Canvas Section (`src/components/HeroFrameScroll.tsx`)

### WHY (Mengapa)
Teks judul, slogan, dan deskripsi pengantar pada animasi Hero Frame Scroll 60FPS sebelumnya bersifat statis (*hardcoded*). Pengelola desa membutuhkan fleksibilitas untuk mengubah slogan atau deskripsi pengantar langsung dari menu CMS Pengaturan.

### HOW (Bagaimana)
- Mengirimkan data `settings` (`hero_slogan`, `hero_subtitle`, `hero_title`) dari [page.tsx](file:///d:/KKN/Website/frontend/src/app/page.tsx) ke dalam [HeroFrameScroll.tsx](file:///d:/KKN/Website/frontend/src/components/HeroFrameScroll.tsx).
- Menampilkan teks dinamis pada layer teks animasi Hero dengan *fallback* aman jika data belum terisi.

### WHERE (Di Mana)
- [src/components/HeroFrameScroll.tsx](file:///d:/KKN/Website/frontend/src/components/HeroFrameScroll.tsx#L14-L215)
- [src/app/page.tsx](file:///d:/KKN/Website/frontend/src/app/page.tsx#L14-L60)

### WHAT (Apa)

```tsx
// src/components/HeroFrameScroll.tsx
const sloganText = settings?.hero_slogan || 'Wisata Air Panas Alami & Pelayanan Digital Desa';
const subtitleText = settings?.hero_subtitle || 'Portal resmi Desa Mantikole, Kecamatan Dolo Barat, Kabupaten Sigi, Sulawesi Tengah.';
```

---

## 2. Sinkronisasi Data Footer Publik (`src/components/Footer.tsx`)

### WHY (Mengapa)
Informasi kontak operasional, nomor telepon/WhatsApp, alamat kantor desa, dan jam pelayanan pada Footer harus selalu sinkron dengan data yang diperbarui administrator di CMS.

### HOW (Bagaimana)
- Menambahkan pemanggilan `GET /api/v1/settings` di [Footer.tsx](file:///d:/KKN/Website/frontend/src/components/Footer.tsx) dengan *state fallback* bawaan.
- Menampilkan alamat kantor desa, jam pelayanan fisik, dan nomor kontak secara dinamis di seluruh halaman publik.

### WHERE (Di Mana)
- [src/components/Footer.tsx](file:///d:/KKN/Website/frontend/src/components/Footer.tsx#L1-L100)

---

## 3. Integrasi Katalog Wisata & Galeri Gambar Dinamis (`src/app/wisata-komoditas/page.tsx`)

### WHY (Mengapa)
Ketika admin menambahkan destinasi wisata baru atau memperbarui foto galeri melalui panel admin, halaman katalog `/wisata-komoditas` harus memprioritaskan URL gambar yang dimasukkan oleh admin (`item.gallery_urls[0]`) tanpa ditimpa oleh gambar default.

### HOW (Bagaimana)
- Memperbarui mekanisme *mapping* data pada [app/wisata-komoditas/page.tsx](file:///d:/KKN/Website/frontend/src/app/wisata-komoditas/page.tsx) agar memprioritaskan `item.gallery_urls?.[0]`.

### WHERE (Di Mana)
- [src/app/wisata-komoditas/page.tsx](file:///d:/KKN/Website/frontend/src/app/wisata-komoditas/page.tsx#L25-L45)

---

## 4. Matriks Integrasi Seluruh Komponen Publik & CMS

| Komponen Publik | Sumber Data API | Pengelola di Dashboard Admin |
|---|---|---|
| **Hero Frame Scroll** | `GET /settings` | `AdminSettingsManager` (Slogan & Subtitle) |
| **Struktur Perangkat Desa** | `GET /staff` | `AdminStaffManager` (CRUD Aparatur Desa) |
| **Statistik & Demografi Desa** | `GET /settings` | `AdminSettingsManager` (Jumlah Penduduk, KK, Luas, Dusun, Kakao) |
| **Peta Lokasi & Embed Maps** | `GET /settings` | `AdminSettingsManager` (Alamat, URL Embed, URL Direct) |
| **Warta & Publikasi Berita** | `GET /articles` | `AdminArticlesManager` (CRUD Artikel & Thumbnail) |
| **FAQ Accordion** | `GET /faqs` | `AdminFaqManager` (CRUD Tanya Jawab) |
| **Katalog Wisata & Komoditas** | `GET /highlights` | `AdminWisataManager` (CRUD Destinasi & Komoditas) |
| **Footer & Kontak Desa** | `GET /settings` | `AdminSettingsManager` (Jam Buka, Telepon, Alamat) |
