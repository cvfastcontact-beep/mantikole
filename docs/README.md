# Dokumentasi Frontend Website Desa Mantikole

Selamat datang di direktori dokumentasi teknis untuk **Frontend Website Desa Mantikole** (Next.js 14/16 App Router + React + TypeScript + Tailwind CSS + Framer Motion + Neon Storage).

## 📚 Daftar Dokumentasi Riwayat Perubahan

Seluruh dokumentasi disusun berdasarkan tanggal dan judul fitur sesuai perkembangan riwayat commit repository:

| Tanggal | File Dokumentasi | Ringkasan Fitur & Perubahan |
|---|---|---|
| **2026-08-06** | [`2026-08-06-setup-arsitektur-dan-landing-page.md`](./2026-08-06-setup-arsitektur-dan-landing-page.md) | Inisialisasi Next.js 14 App Router, Tailwind CSS, struktur komponen modular, Bento Grid, dan desain dasar. |
| **2026-08-07** | [`2026-08-07-halaman-publik-dan-integrasi-api.md`](./2026-08-07-halaman-publik-dan-integrasi-api.md) | Implementasi halaman Warta, Wisata, Layanan Surat, Pelacakan Resi, dan AI Chat Widget. |
| **2026-08-08** | [`2026-08-08-portal-admin-cms-dan-verifikasi.md`](./2026-08-08-portal-admin-cms-dan-verifikasi.md) | Dashboard CMS admin untuk verifikasi surat warga, kelola warta, kelola wisata, dan statistik desa. |
| **2026-08-25** | [`2026-08-25-pengembangan-desain-dan-fitur-lanjutan.md`](./2026-08-25-pengembangan-desain-dan-fitur-lanjutan.md) | Redesain Hero Carousel Framer Motion, FAQ Accordion, dan modul aparatur desa. |
| **2026-08-27** | [`2026-08-27-integrasi-media-landing-page-dan-object-storage.md`](./2026-08-27-integrasi-media-landing-page-dan-object-storage.md) | Komponen `ImageUploader` Neon Storage dan koneksi media live database pada seluruh landing & detail page. |
| **2026-08-27** | [`2026-08-27-custom-toast-dan-dialog-pengganti-chrome-interface.md`](./2026-08-27-custom-toast-dan-dialog-pengganti-chrome-interface.md) | Sistem notifikasi Toast/Snackbar dan modal ConfirmDialog kustom pengganti `alert()` dan `confirm()` browser. |
| **2026-09-04** | [`2026-09-04-modernisasi-ui-ux-chatbot-avatar-morphing.md`](./2026-09-04-modernisasi-ui-ux-chatbot-avatar-morphing.md) | Modernisasi UI/UX Mantikole AI Chatbot (Off Menu Design): Looping avatar video dengan depth fade, spring morphing, thinking state, dan zero-dependency markdown parser. |
| **2026-09-04** | [`2026-09-04-perbaikan-hydration-mismatch-browser-extension.md`](./2026-09-04-perbaikan-hydration-mismatch-browser-extension.md) | Perbaikan error React Hydration Mismatch dari injeksi atribut ekstensi browser (Scribe) via `suppressHydrationWarning`. |

---

## 🛠️ Format Standar Dokumentasi

Setiap file dokumen teknis mengikuti struktur baku **WHY, HOW, WHERE, WHAT**:
- **WHY (Mengapa):** Alasan bisnis/teknis di balik penambahan, perubahan, atau penghapusan kode.
- **HOW (Bagaimana):** Pendekatan arsitektur & mekanisme teknis yang diterapkan.
- **WHERE (Di Mana):** Path file persis dan area baris kode yang terdampak.
- **WHAT (Apa):** Cuplikan kode (*snippet diff*) dari perubahan yang dilakukan.
