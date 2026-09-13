# Implementasi Sistem Custom Toast & ConfirmDialog UI (2026-08-27)

Dokumen ini mencatat eliminasi penuh terhadap seluruh interface default browser (seperti `window.alert()` dan `window.confirm()`) dan penggantiannya dengan sistem notifikasi **Toast / Snackbar** dan modal dialog **ConfirmDialog** kustom yang selaras dengan sistem desain Website Desa Mantikole berbasis prinsip **/ponytail** dan **/clean-code-principles**.

---

## 1. Floating Toast & Snackbar Context Provider (`src/context/ToastContext.tsx`)

### WHY (Mengapa)
Interface bawaan browser `alert()` memblokir eksekusi JavaScript thread (*synchronous modal*), merusak pengalaman pengguna (*user experience*), dan tidak sesuai dengan identitas visual modern website.

### HOW (Bagaimana)
- Mengembangkan [ToastContext.tsx](file:///d:/KKN/Website/frontend/src/context/ToastContext.tsx) dengan hook `useToast()` yang menyediakan API ringkas:
  - `toast.success(message)`
  - `toast.error(message)`
  - `toast.warning(message)`
  - `toast.info(message)`
- Dilengkapi dengan *Framer Motion layout animations* (`spring` physics), auto-dismiss setelah 3.5 detik, dismiss manual (tombol `X`), dan tema gelap minimalis (*dark slate glassmorphism*).
- Didaftarkan secara global pada [RootLayout](file:///d:/KKN/Website/frontend/src/app/layout.tsx).

### WHERE (Di Mana)
- [src/context/ToastContext.tsx](file:///d:/KKN/Website/frontend/src/context/ToastContext.tsx)
- [src/app/layout.tsx](file:///d:/KKN/Website/frontend/src/app/layout.tsx)

---

## 2. Modern Custom Confirmation Dialog (`src/components/ui/ConfirmDialog.tsx`)

### WHY (Mengapa)
Operasi kritis seperti penghapusan data warta, perangkat desa, atau FAQ membutuhkan dialog konfirmasi yang elegan dengan feedback visual yang jelas tanpa menggunakan `window.confirm()`.

### HOW (Bagaimana)
- Membuat komponen [ConfirmDialog.tsx](file:///d:/KKN/Website/frontend/src/components/ui/ConfirmDialog.tsx) dengan:
  - Backdrop blur halus dan tombol ESC listener.
  - Ikon visual (Trash / Warning / Question) dan teks aksi destruktif berbasis palet warna merah rose / netral slate.
  - Callback terisolasi `onConfirm` dan `onCancel`.

### WHERE (Di Mana)
- [src/components/ui/ConfirmDialog.tsx](file:///d:/KKN/Website/frontend/src/components/ui/ConfirmDialog.tsx)
- [src/components/admin/AdminStaffManager.tsx](file:///d:/KKN/Website/frontend/src/components/admin/AdminStaffManager.tsx)
- [src/components/admin/AdminArticlesManager.tsx](file:///d:/KKN/Website/frontend/src/components/admin/AdminArticlesManager.tsx)
- [src/components/admin/AdminFaqManager.tsx](file:///d:/KKN/Website/frontend/src/components/admin/AdminFaqManager.tsx)

---

## 3. Eliminasi Alert & Confirm di Seluruh Komponen

### WHY (Mengapa)
Memastikan 100% konsistensi interaksi di seluruh alur publik dan dashboard admin.

### HOW (Bagaimana)
- Mengganti `alert('Tautan artikel berhasil disalin!')` pada [ArticleDetailModal.tsx](file:///d:/KKN/Website/frontend/src/components/berita/ArticleDetailModal.tsx) dan [app/berita/[id]/page.tsx](file:///d:/KKN/Website/frontend/src/app/berita/%5Bid%5D/page.tsx) dengan `toast.success()`.
- Mengganti alert feedback status verifikasi surat pada [app/admin/page.tsx](file:///d:/KKN/Website/frontend/src/app/admin/page.tsx).
- Menghubungkan seluruh aksi hapus CMS pada modul Staff, Warta, dan FAQ ke `ConfirmDialog`.
