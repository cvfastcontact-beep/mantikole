# Modularisasi Halaman Publik & AI Chat Widget (2026-08-09)

Dokumen ini mencatat kelanjutan **refactoring modularisasi (Fase 2)** pada frontend aplikasi Desa Mantikole untuk halaman Wisata & Komoditas (`app/wisata-komoditas`), Warta Berita (`app/berita`), dan komponen floating AI Chatbot Widget (`components/AiChatWidget.tsx`). Perubahan ini mengikuti prinsip **SOLID-SRP** dan asas efisiensi **Ponytail**.

---

## 1. Modularisasi Halaman Wisata & Komoditas (`src/app/wisata-komoditas/page.tsx`)

### WHY (Mengapa)
Sebelumnya file `app/wisata-komoditas/page.tsx` sepanjang 338 baris menggabungkan array data mentah destinasi, logika portal modal interaktif, dan baris filter kategori. Hal ini menyulitkan pemeliharaan dan pengujian independen.

### HOW (Bagaimana)
- Mengespor data default `DEFAULT_WISATA_ITEMS` ke [src/lib/constants.ts](file:///d:/KKN/Website/frontend/src/lib/constants.ts#L84-L135).
- Memisahkan tampilan modal detail interaktif ke [HighlightDetailModal.tsx](file:///d:/KKN/Website/frontend/src/components/wisata-komoditas/HighlightDetailModal.tsx).
- Memisahkan baris filter & grid kartu ke [WisataCatalogGrid.tsx](file:///d:/KKN/Website/frontend/src/components/wisata-komoditas/WisataCatalogGrid.tsx).

### WHERE (Di Mana)
- [src/components/wisata-komoditas/HighlightDetailModal.tsx](file:///d:/KKN/Website/frontend/src/components/wisata-komoditas/HighlightDetailModal.tsx#L1-L120)
- [src/components/wisata-komoditas/WisataCatalogGrid.tsx](file:///d:/KKN/Website/frontend/src/components/wisata-komoditas/WisataCatalogGrid.tsx#L1-L115)
- [src/app/wisata-komoditas/page.tsx](file:///d:/KKN/Website/frontend/src/app/wisata-komoditas/page.tsx#L1-L95)

### WHAT (Apa)

#### Struktur Ringkas pada `app/wisata-komoditas/page.tsx`:
```tsx
// src/app/wisata-komoditas/page.tsx
<WisataCatalogGrid
  items={items}
  filterType={filterType}
  setFilterType={setFilterType}
  setActive={setActive}
  id={id}
/>

<HighlightDetailModal
  active={active}
  setActive={setActive}
  refObj={ref}
  id={id}
  mounted={mounted}
/>
```

---

## 2. Modularisasi Halaman Warta & Berita (`src/app/berita/page.tsx`)

### WHY (Mengapa)
Sebelumnya file `app/berita/page.tsx` sepanjang 370 baris mencakup pencarian berita, tab kategori, layout kartu berita, dan tampilan morphing baca artikel penuh dalam satu file tunggal.

### HOW (Bagaimana)
- Memisahkan tampilan baca artikel penuh ke [ArticleDetailModal.tsx](file:///d:/KKN/Website/frontend/src/components/berita/ArticleDetailModal.tsx).
- Memisahkan bilah pencarian & tombol kategori ke [ArticleFilterBar.tsx](file:///d:/KKN/Website/frontend/src/components/berita/ArticleFilterBar.tsx).
- Memisahkan kisi kartu berita ke [ArticleGridList.tsx](file:///d:/KKN/Website/frontend/src/components/berita/ArticleGridList.tsx).

### WHERE (Di Mana)
- [src/components/berita/ArticleDetailModal.tsx](file:///d:/KKN/Website/frontend/src/components/berita/ArticleDetailModal.tsx#L1-L140)
- [src/components/berita/ArticleFilterBar.tsx](file:///d:/KKN/Website/frontend/src/components/berita/ArticleFilterBar.tsx#L1-L40)
- [src/components/berita/ArticleGridList.tsx](file:///d:/KKN/Website/frontend/src/components/berita/ArticleGridList.tsx#L1-L80)
- [src/app/berita/page.tsx](file:///d:/KKN/Website/frontend/src/app/berita/page.tsx#L1-L105)

### WHAT (Apa)

#### Struktur Ringkas pada `app/berita/page.tsx`:
```tsx
// src/app/berita/page.tsx
{activeArticle ? (
  <ArticleDetailModal
    activeArticle={activeArticle}
    handleCloseArticle={handleCloseArticle}
    articles={articles}
    handleOpenArticle={handleOpenArticle}
  />
) : (
  <motion.div key="warta-listing-grid" className="space-y-10">
    <ArticleFilterBar
      categories={categories}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
    <ArticleGridList
      loading={loading}
      filteredArticles={filteredArticles}
      searchQuery={searchQuery}
      handleOpenArticle={handleOpenArticle}
    />
  </motion.div>
)}
```

---

## 3. Modularisasi AI Chatbot Widget (`src/components/AiChatWidget.tsx`)

### WHY (Mengapa)
Komponen widget AI menampung 237 baris yang mencampur logika state percakapan, header UI, daftar gelembung percakapan (*chat bubbles*), chip rekomendasi pertanyaan, serta form input.

### HOW (Bagaimana)
Membagi widget ke dalam sub-komponen terisolasi di bawah `src/components/ai/`:
- [AiChatHeader.tsx](file:///d:/KKN/Website/frontend/src/components/ai/AiChatHeader.tsx): Header banner status & tombol tutup.
- [AiMessageList.tsx](file:///d:/KKN/Website/frontend/src/components/ai/AiMessageList.tsx): Area scroll pesan, indikator ketik, & chip rekomendasi.
- [AiChatInput.tsx](file:///d:/KKN/Website/frontend/src/components/ai/AiChatInput.tsx): Input form teks & tombol kirim.

### WHERE (Di Mana)
- [src/components/ai/AiChatHeader.tsx](file:///d:/KKN/Website/frontend/src/components/ai/AiChatHeader.tsx#L1-L35)
- [src/components/ai/AiMessageList.tsx](file:///d:/KKN/Website/frontend/src/components/ai/AiMessageList.tsx#L1-L85)
- [src/components/ai/AiChatInput.tsx](file:///d:/KKN/Website/frontend/src/components/ai/AiChatInput.tsx#L1-L40)
- [src/components/AiChatWidget.tsx](file:///d:/KKN/Website/frontend/src/components/AiChatWidget.tsx#L1-L150)

### WHAT (Apa)

#### Struktur Terpisah pada `AiChatWidget.tsx`:
```tsx
// src/components/AiChatWidget.tsx
{isOpen && (
  <div className="fixed bottom-6 right-6 z-50 w-[360px] h-[520px] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col font-sans overflow-hidden">
    <AiChatHeader onClose={() => setIsOpen(false)} />
    <AiMessageList
      messages={messages}
      loading={loading}
      messagesEndRef={messagesEndRef}
      suggestedPrompts={suggestedPrompts}
      handleSendMessage={handleSendMessage}
    />
    <AiChatInput
      inputMessage={inputMessage}
      setInputMessage={setInputMessage}
      loading={loading}
      handleSendMessage={() => handleSendMessage()}
    />
  </div>
)}
```
