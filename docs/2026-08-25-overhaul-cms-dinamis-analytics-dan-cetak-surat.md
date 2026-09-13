# Overhaul CMS Dinamis, Visual Analytics, & Cetak Surat (2026-08-25)

Dokumen ini mencatat pembaruan menyeluruh antarmuka dan fungsionalitas admin CMS pada frontend Website Desa Mantikole, menghadirkan sistem pengelolaan konten 100% dinamis (teks hero, demografi, perangkat desa, FAQ, warta dengan thumbnail, wisata & komoditas), **UI/UX Transisi Modal In-Place / Detail Morphing** (konsisten dengan halaman landing page), visualisasi grafik statistik, serta generator cetak surat resmi format PDF.

---

## 1. Modularisasi Self-Contained Domain Managers & Admin Shell

### WHY (Mengapa)
Sebelumnya komponen induk `AdminPage` menampung state lokal formulir warta (judul, konten, kategori, ringkasan, dll) yang menyebabkan coupling tinggi antara parent shell dan child manager. Sesuai prinsip SOLID-SRP dan Ponytail, setiap modul manager harus mengelola lifecycle data dan dialognya sendiri (*self-contained*).

### HOW (Bagaimana)
- Menyederhanakan [app/admin/page.tsx](file:///d:/KKN/Website/frontend/src/app/admin/page.tsx) menjadi sebuah shell routing tab yang bersih dan ramping.
- Menjadikan [AdminArticlesManager.tsx](file:///d:/KKN/Website/frontend/src/components/admin/AdminArticlesManager.tsx) mandiri dalam pengambilan data artikel warta, pembuatan, pembaruan, dan penghapusan.

### WHERE (Di Mana)
- [src/app/admin/page.tsx](file:///d:/KKN/Website/frontend/src/app/admin/page.tsx)
- [src/components/admin/AdminArticlesManager.tsx](file:///d:/KKN/Website/frontend/src/components/admin/AdminArticlesManager.tsx)

---

## 2. UI/UX Modal Detail & Edit In-Place Terpadu

### WHY (Mengapa)
Sebelumnya pengeditan data menggunakan form kaku di bagian atas yang mengharuskan scrolling dan tidak memberikan pengalaman pratinjau detail yang mulus. Sesuai prinsip desain landing page, pengeditan dan pratinjau detail seharusnya menggunakan **in-place modal dialog dengan animasi Framer Motion** (`AnimatePresence`) yang elegan dan konsisten.

### HOW (Bagaimana)
- Mengganti form atas di [AdminArticlesManager.tsx](file:///d:/KKN/Website/frontend/src/components/admin/AdminArticlesManager.tsx) dengan kartu warta interaktif: klik kartu untuk membuka modal detail warta, membaca ringkasan (TL;DR), serta beralih ke mode edit/hapus.
- Mengganti form atas di [AdminWisataManager.tsx](file:///d:/KKN/Website/frontend/src/components/admin/AdminWisataManager.tsx) dengan kartu destinasi: klik kartu untuk membuka modal detail foto galeri, rute, tarif tiket, serta formulir pembaruan data.
- Mengganti form atas di [AdminStaffManager.tsx](file:///d:/KKN/Website/frontend/src/components/admin/AdminStaffManager.tsx) & [AdminFaqManager.tsx](file:///d:/KKN/Website/frontend/src/components/admin/AdminFaqManager.tsx) dengan modal dialog transisi halus saat tombol tambah atau kartu di-klik.

### WHERE (Di Mana)
- [src/components/admin/AdminArticlesManager.tsx](file:///d:/KKN/Website/frontend/src/components/admin/AdminArticlesManager.tsx#L1-L260)
- [src/components/admin/AdminWisataManager.tsx](file:///d:/KKN/Website/frontend/src/components/admin/AdminWisataManager.tsx#L1-L260)
- [src/components/admin/AdminStaffManager.tsx](file:///d:/KKN/Website/frontend/src/components/admin/AdminStaffManager.tsx#L1-L210)
- [src/components/admin/AdminFaqManager.tsx](file:///d:/KKN/Website/frontend/src/components/admin/AdminFaqManager.tsx#L1-L210)

---

## 3. Modul Cetak Dokumen Surat PDF Resmi (`src/components/admin/AdminLetterPrintModal.tsx`)

### WHY (Mengapa)
Permohonan surat warga yang telah disetujui (`COMPLETED`) membutuhkan format fisik resmi yang dapat dicetak langsung oleh perangkat desa dengan Kop Surat Resmi Pemerintah Kabupaten Sigi, tanda tangan/cap digital, dan QR Code verifikasi tiket resi.

### HOW (Bagaimana)
- Mengembangkan komponen modal [AdminLetterPrintModal.tsx](file:///d:/KKN/Website/frontend/src/components/admin/AdminLetterPrintModal.tsx) dengan struktur Kop Surat ganda, format nomor surat resmi (`470 / MNT-YYYY-XXXXX / MNT / YYYY`), biodata pemohon, QR Code resi, dan tombol `window.print()` yang secara otomatis memicu cetak / ekspor PDF browser.

### WHERE (Di Mana)
- [src/components/admin/AdminLetterPrintModal.tsx](file:///d:/KKN/Website/frontend/src/components/admin/AdminLetterPrintModal.tsx#L1-L150)
- [src/components/admin/AdminLettersTable.tsx](file:///d:/KKN/Website/frontend/src/components/admin/AdminLettersTable.tsx#L1-L140)

---

## 4. Visualisasi Grafik Tren & Analitik Dashboard (`src/components/admin/AdminAnalyticsCharts.tsx`)

### WHY (Mengapa)
Dashboard admin membutuhkan representasi visual interaktif untuk memantau perbandingan surat masuk vs surat disetujui mingguan serta metrik efisiensi birokrasi digital desa.

### HOW (Bagaimana)
- Mengembangkan [AdminAnalyticsCharts.tsx](file:///d:/KKN/Website/frontend/src/components/admin/AdminAnalyticsCharts.tsx) berbasis diagram batang interaktif dengan efek *tooltip* saat disentuh dan indikator progres efisiensi otomatisasi.

### WHERE (Di Mana)
- [src/components/admin/AdminAnalyticsCharts.tsx](file:///d:/KKN/Website/frontend/src/components/admin/AdminAnalyticsCharts.tsx#L1-L100)
- [src/components/admin/AdminDashboardOverview.tsx](file:///d:/KKN/Website/frontend/src/components/admin/AdminDashboardOverview.tsx#L1-L130)

---

## 5. Sinkronisasi Data Live Landing Page (Perangkat Desa, FAQ, Demografi)

### WHY (Mengapa)
Seluruh data awal (Perangkat Desa, FAQ, Destinasi Wisata, Komoditas, Demografi Kependudukan) harus terhubung langsung tanpa pernah menampilkan data kosong (*0 items*) pada initial load.

### HOW (Bagaimana)
- [VillageStaffSection.tsx](file:///d:/KKN/Website/frontend/src/components/home/VillageStaffSection.tsx): Sinkronisasi dengan `GET /staff` dan fallback aman `PERANGKAT_DESA`.
- [FaqAccordion.tsx](file:///d:/KKN/Website/frontend/src/components/FaqAccordion.tsx): Sinkronisasi dengan `GET /faqs` dan fallback aman `DEFAULT_FAQS`.
- [VillageDemographicsSection.tsx](file:///d:/KKN/Website/frontend/src/components/home/VillageDemographicsSection.tsx): Mengambil data demografi resmi kependudukan dan tonase panen dari `site_settings`.

### WHERE (Di Mana)
- [src/components/home/VillageStaffSection.tsx](file:///d:/KKN/Website/frontend/src/components/home/VillageStaffSection.tsx)
- [src/components/FaqAccordion.tsx](file:///d:/KKN/Website/frontend/src/components/FaqAccordion.tsx)
- [src/components/home/VillageDemographicsSection.tsx](file:///d:/KKN/Website/frontend/src/components/home/VillageDemographicsSection.tsx)
- [src/app/page.tsx](file:///d:/KKN/Website/frontend/src/app/page.tsx)
