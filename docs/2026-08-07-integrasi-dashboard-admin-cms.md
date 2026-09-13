# Integrasi Dashboard Admin CMS & Sidebar Expandable (2026-08-07)

Dokumen ini mencatat pembangunan **Dashboard Admin CMS Desa Mantikole** berbasis Aceternity UI Expandable Sidebar untuk pengelolaan warta, verifikasi permohonan surat warga, dan penambahan fakta pengetahuan AI Chatbot.

---

## 1. Implementasi Aceternity UI Expandable Sidebar (`sidebar.tsx`)

### WHY (Mengapa)
Panel admin membutuhkan navigasi samping (*sidebar*) yang teratur, dapat diciutkan/dilebarkan (*expandable*) secara intuitif, dan tidak mengganggu area kerja utama pengelola desa.

### HOW (Bagaimana)
- Membuat komponen `Sidebar`, `SidebarBody`, dan `SidebarLink` menggunakan `framer-motion` di `src/components/ui/sidebar.tsx`.
- Mendukung mode layar desktop maupun *mobile overlay drawer*.

### WHERE (Di Mana)
- [src/components/ui/sidebar.tsx](file:///d:/KKN/Website/frontend/src/components/ui/sidebar.tsx#L1-L197)

### WHAT (Apa)
```tsx
// src/components/ui/sidebar.tsx
export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({ className, children, ...props }: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <motion.div
      className={cn("h-full px-4 py-4 hidden md:flex md:flex-col bg-white border-r border-slate-200/80 w-[300px] shrink-0", className)}
      animate={{ width: animate ? (open ? "300px" : "60px") : "300px" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      {children}
    </motion.div>
  );
};
```

---

## 2. Fitur Otentikasi Admin & Verifikasi Surat Warga (`src/app/admin/page.tsx`)

### WHY (Mengapa)
Admin desa memerlukan antarmuka terpusat untuk:
- Login aman berbasis JWT (`/auth/login`).
- Meninjau berkas permohonan surat dari warga (NIK, Nama, HP, Alamat, Jenis Surat).
- Mengubah status permohonan surat (`PENDING`, `PROCESSED`, `COMPLETED`, `REJECTED`) disertai catatan resmi admin.
- Menulis dan menerbitkan berita desa baru.
- Menyuntikkan fakta informasi baru ke dalam basis data AI Chatbot.

### HOW (Bagaimana)
- Menggunakan state JWT `mantikole_token` yang disimpan di `localStorage`.
- Menyiapkan tab interaktif: `Ringkasan Dashboard`, `Verifikasi Surat`, `Kelola Warta`, dan `Knowledge AI Chatbot`.

### WHERE (Di Mana)
- [src/app/admin/page.tsx](file:///d:/KKN/Website/frontend/src/app/admin/page.tsx#L1-L823)

### WHAT (Apa)
```tsx
// src/app/admin/page.tsx (Cuplikan Aksi Verifikasi Status Surat)
const handleUpdateLetterStatus = async (id: string, newStatus: string, notes: string) => {
  try {
    const res = await fetchApi<{ success: boolean; message: string }>(`/letters/requests/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status: newStatus, admin_notes: notes }),
    });

    if (res.success) {
      alert(`Status pengajuan surat berhasil diubah menjadi ${newStatus}.`);
      loadAdminData();
    }
  } catch (err: any) {
    alert(err.message || 'Gagal mengubah status surat.');
  }
};
```
