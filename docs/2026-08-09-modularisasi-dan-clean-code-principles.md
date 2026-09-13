# Modularisasi & Clean Code Principles Refactoring (2026-08-09)

Dokumen ini mencatat proses **refactoring dan pemecahan file monolithic (*godlike files*)** pada frontend menjadi komponen-komponen terpisah berbasis Single Responsibility Principle (SOLID-SRP) dan prinsip minimalis **Ponytail**.

---

## 1. Pemecahan Halaman Utama Beranda (`src/app/page.tsx`)

### WHY (Mengapa)
Sebelumnya `src/app/page.tsx` menampung lebih dari 315 baris kode yang mencampur array data mentah perangkat desa, konfigurasi bento grid, serta logika penanganan state artikel. Hal ini melanggar Single Responsibility Principle (SRP) dan menyulitkan pemeliharaan kode.

### HOW (Bagaimana)
- Mengespor data statis `PERANGKAT_DESA` dan `BENTO_FEATURES` ke file terpisah [src/lib/constants.ts](file:///d:/KKN/Website/frontend/src/lib/constants.ts).
- Memisahkan seksi perangkat desa ke [src/components/home/VillageStaffSection.tsx](file:///d:/KKN/Website/frontend/src/components/home/VillageStaffSection.tsx).
- Memisahkan seksi bento grid potensi desa ke [src/components/home/BentoFeaturesSection.tsx](file:///d:/KKN/Website/frontend/src/components/home/BentoFeaturesSection.tsx).

### WHERE (Di Mana)
- [src/lib/constants.ts](file:///d:/KKN/Website/frontend/src/lib/constants.ts#L1-L70)
- [src/components/home/VillageStaffSection.tsx](file:///d:/KKN/Website/frontend/src/components/home/VillageStaffSection.tsx#L1-L29)
- [src/components/home/BentoFeaturesSection.tsx](file:///d:/KKN/Website/frontend/src/components/home/BentoFeaturesSection.tsx#L1-L37)
- [src/app/page.tsx](file:///d:/KKN/Website/frontend/src/app/page.tsx#L1-L230)

### WHAT (Apa)

#### Diff Perubahan `src/app/page.tsx`:
```diff
-const PERANGKAT_DESA = [ ... ];
-const bentoFeatures = [ ... ];
+import VillageStaffSection from '../components/home/VillageStaffSection';
+import BentoFeaturesSection from '../components/home/BentoFeaturesSection';
```

---

## 2. Pemecahan Halaman Layanan Surat Mandiri (`src/app/surat/page.tsx`)

### WHY (Mengapa)
File `src/app/surat/page.tsx` memiliki panjang 516 baris yang menggabungkan formulir permohonan surat, pelacak nomor resi tiket, modal sukses resi, serta grid unduhan template Word.

### HOW (Bagaimana)
Membagi halaman menjadi 5 komponen modular terisolasi di bawah `src/components/surat/`:
1. [LetterStatusBadge.tsx](file:///d:/KKN/Website/frontend/src/components/surat/LetterStatusBadge.tsx): Komponen lencana status (PENDING, PROCESSED, COMPLETED, REJECTED).
2. [LetterSuccessBanner.tsx](file:///d:/KKN/Website/frontend/src/components/surat/LetterSuccessBanner.tsx): Kartu konfirmasi resi sukses disertai tombol salin kode.
3. [LetterTemplatesGrid.tsx](file:///d:/KKN/Website/frontend/src/components/surat/LetterTemplatesGrid.tsx): Grid unduhan berkas template `.docx` dan info verifikasi.
4. [LetterRequestForm.tsx](file:///d:/KKN/Website/frontend/src/components/surat/LetterRequestForm.tsx): Formulir pengajuan berbasis NIK 16 digit.
5. [LetterTrackingSection.tsx](file:///d:/KKN/Website/frontend/src/components/surat/LetterTrackingSection.tsx): Tampilan pencarian & detail kartu penjejakan resi.

### WHERE (Di Mana)
- [src/components/surat/](file:///d:/KKN/Website/frontend/src/components/surat/)
- [src/app/surat/page.tsx](file:///d:/KKN/Website/frontend/src/app/surat/page.tsx#L1-L167)

### WHAT (Apa)

#### Struktur Terpisah pada `app/surat/page.tsx`:
```tsx
// src/app/surat/page.tsx
{activeTab === 'form' && (
  <LetterRequestForm
    selectedTypeCode={selectedTypeCode}
    setSelectedTypeCode={setSelectedTypeCode}
    nik={nik}
    handleNikChange={handleNikChange}
    fullName={fullName}
    setFullName={setFullName}
    phone={phone}
    setPhone={setPhone}
    address={address}
    setAddress={setAddress}
    submitting={submitting}
    formSuccess={formSuccess}
    formError={formError}
    copiedResi={copiedResi}
    onCopyResi={handleCopyResi}
    onTrackNow={(ticket) => {
      setTrackInput(ticket);
      setActiveTab('track');
      executeTrack(ticket);
    }}
    handleFormSubmit={handleFormSubmit}
    templates={templates}
  />
)}

{activeTab === 'track' && (
  <LetterTrackingSection
    trackInput={trackInput}
    setTrackInput={setTrackInput}
    trackingLoading={trackingLoading}
    trackedData={trackedData}
    trackError={trackError}
    onExecuteTrack={executeTrack}
  />
)}
```

---

## 3. Pemecahan Dashboard Admin CMS (`src/app/admin/page.tsx`)

### WHY (Mengapa)
File `src/app/admin/page.tsx` mencapai 785 baris kode (*godlike file*), menggabungkan formulir otentikasi login admin, widget statistik dashboard, tabel verifikasi surat warga, editor warta berita, dan form penginputan AI Knowledge Base.

### HOW (Bagaimana)
Membagi panel admin menjadi 5 komponen modular di bawah `src/components/admin/`:
1. [AdminLoginForm.tsx](file:///d:/KKN/Website/frontend/src/components/admin/AdminLoginForm.tsx): Tampilan layar login admin.
2. [AdminDashboardOverview.tsx](file:///d:/KKN/Website/frontend/src/components/admin/AdminDashboardOverview.tsx): Ringkasan metrik statistik & tabel permohonan surat terbaru.
3. [AdminLettersTable.tsx](file:///d:/KKN/Website/frontend/src/components/admin/AdminLettersTable.tsx): Tabel verifikasi & aksi persetujuan/penolakan surat warga.
4. [AdminArticlesManager.tsx](file:///d:/KKN/Website/frontend/src/components/admin/AdminArticlesManager.tsx): Form pembuatan berita & daftar berita terbit.
5. [AdminAiManager.tsx](file:///d:/KKN/Website/frontend/src/components/admin/AdminAiManager.tsx): Form injeksi basis pengetahuan AI Chatbot RAG.

### WHERE (Di Mana)
- [src/components/admin/](file:///d:/KKN/Website/frontend/src/components/admin/)
- [src/app/admin/page.tsx](file:///d:/KKN/Website/frontend/src/app/admin/page.tsx#L1-L245)

### WHAT (Apa)

#### Struktur Ringkas pada `app/admin/page.tsx`:
```tsx
// src/app/admin/page.tsx (Render Bersih Berdasarkan Tab Aktif)
{activeTab === 'dashboard' && (
  <AdminDashboardOverview
    letterRequests={letterRequests}
    articles={articles}
    stats={stats}
    onNavigateLetters={() => setActiveTab('letters')}
  />
)}

{activeTab === 'letters' && (
  <AdminLettersTable
    statusFilter={statusFilter}
    setStatusFilter={setStatusFilter}
    filteredRequests={filteredRequests}
    handleUpdateLetterStatus={handleUpdateLetterStatus}
  />
)}

{activeTab === 'articles' && (
  <AdminArticlesManager
    articleMsg={articleMsg}
    newArticleTitle={newArticleTitle}
    setNewArticleTitle={setNewArticleTitle}
    newArticleCategory={newArticleCategory}
    setNewArticleCategory={setNewArticleCategory}
    newArticleSummary={newArticleSummary}
    setNewArticleSummary={setNewArticleSummary}
    newArticleContent={newArticleContent}
    setNewArticleContent={setNewArticleContent}
    handleCreateArticle={handleCreateArticle}
    articles={articles}
  />
)}

{activeTab === 'ai' && (
  <AdminAiManager
    kbMsg={kbMsg}
    kbCategory={kbCategory}
    setKbCategory={setKbCategory}
    kbTitle={kbTitle}
    setKbTitle={setKbTitle}
    kbContent={kbContent}
    setKbContent={setKbContent}
    handleAddAiKnowledge={handleAddAiKnowledge}
  />
)}
```
