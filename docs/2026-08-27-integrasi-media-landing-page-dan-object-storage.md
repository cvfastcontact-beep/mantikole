# Integrasi Dinamis Media & Gambar Landing Page ke Neon Database (2026-08-27)

Dokumen ini mencatat sinkronisasi dan integrasi menyeluruh seluruh komponen media gambar di Landing Page utama, Grid Potensi (Bento Grid), Warta Berita, serta Perangkat Desa agar 100% dinamis memuat gambar live dari database Neon PostgreSQL dan Neon Object Storage tanpa ada aset media yang ter-hardcoded statis.

---

## 1. Bento Features Section Dinamis (`BentoFeaturesSection.tsx`)

### WHY (Mengapa)
Sebelumnya kartu potensi alam di Beranda masih menggunakan data array konstan statis. Perlu dihubungkan secara langsung ke endpoint `GET /highlights` agar gambar galeri wisata/komoditas yang diunggah administrator melalui CMS langsung tampil sebagai visual latar belakang kartu interaktif.

### HOW (Bagaimana)
- Mengambil data dari endpoint `/highlights` saat komponen di-mount.
- Memetakan `gallery_urls[0]` ke elemen visual latar belakang kartu Bento dengan efek *subtle hover zoom* dan *gradient contrast overlay*.

### WHERE (Di Mana)
- [src/components/home/BentoFeaturesSection.tsx](file:///d:/KKN/Website/frontend/src/components/home/BentoFeaturesSection.tsx#L1-L115)

### WHAT (Apa)

```tsx
// frontend/src/components/home/BentoFeaturesSection.tsx
const background = feature.imageUrl ? (
  <div className="absolute inset-0 w-full h-full overflow-hidden">
    <img
      src={feature.imageUrl}
      alt={feature.name}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-20 group-hover:opacity-30"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
  </div>
) : null;
```

---

## 2. Thumbnail Warta & Berita Dinamis di Landing Page & Katalog Berita

### WHY (Mengapa)
Kartu warta berita di halaman Beranda (`/`) dan halaman arsip berita (`/berita`) sebelumnya hanya menampilkan teks judul dan ringkasan. Diperlukan tampilan visual *featured image* di bagian atas kartu agar gambar warta yang diunggah ke Neon Object Storage langsung tampil memikat.

### HOW (Bagaimana)
- Memperbarui komponen [page.tsx](file:///d:/KKN/Website/frontend/src/app/page.tsx) dan [ArticleGridList.tsx](file:///d:/KKN/Website/frontend/src/components/berita/ArticleGridList.tsx) untuk merender `art.featured_image_url` secara responsif dengan badge kategori di atas gambar.

### WHERE (Di Mana)
- [src/app/page.tsx](file:///d:/KKN/Website/frontend/src/app/page.tsx#L138-L170)
- [src/components/berita/ArticleGridList.tsx](file:///d:/KKN/Website/frontend/src/components/berita/ArticleGridList.tsx#L40-L85)
