# Modernisasi UI/UX Mantikole AI Chatbot (Off Menu Design & Avatar Looping) (2026-09-04)

Dokumen ini mencatat pembaruan antarmuka (*user interface & experience*) pada widget **Mantikole AI Chatbot** yang terinspirasi dari standar desain modern [Off Menu Design](https://www.offmenu.design/) dengan integrasi video avatar looping berlatar gelap murni, efek *depth fade-out*, **Sequenced Shape Morphing (Preservasi Geometri Kotak & Kontrol Tempo Mewah)** dengan *framer-motion*, efek **Progressive Blur Content Reveal**, indikator status berpikir (*thinking micro-animation*), serta parser markdown cerdas berlandaskan prinsip **Clean Code**, **Ponytail**, dan **Design System Monokrom (Black, White & Chrome)**.

---

## 📌 Rincian Perbaikan Berdasarkan 4 Pilar Dokumentasi

### 1. WHY (Mengapa)
- **Eliminasi Distorsi Melengkung / Oval:** Penggunaan `borderRadius: 9999px` sebelumnya menyebabkan interpolasi CSS mengubah bentuk kontainer menjadi elips/telur aneh saat tinggi bertambah sebelum lebar stabil. Dengan mengunci radius tetap `borderRadius: 24px` di kedua state, geometri persegi bersudut tumpul (*rounded rectangle*) terjaga 100% konsisten.
- **Penyempurnaan Kontrol Tempo (*Pacing & Easing Curve*):**
  - **Saat Buka (Open):** Lebar melebar perlahan dan halus (durasi 0.42s) $\rightarrow$ tinggi mengembang ke atas dengan kurva mewah `cubic-bezier(0.16, 1, 0.3, 1)` (durasi 0.52s, jeda 0.32s) $\rightarrow$ konten memudar masuk dengan Progressive Blur (durasi 0.48s, jeda 0.58s).
  - **Saat Tutup (Close):** Konten memudar keluar seketika $\rightarrow$ tinggi menyusut ke bawah (durasi 0.44s) $\rightarrow$ lebar menyusut kesamping (durasi 0.38s, jeda 0.34s) kembali ke floating button.
- **Design System Monokrom (Black & White):** Menggunakan palet obsidian dark `#0a0a0c`, background input `#18181b`, border halus `border-white/10`, teks putih bersih `text-white`, dan zinc muted `text-zinc-400`.
- **Eliminasi Default Scrollbar:** Menerapkan class `.no-scrollbar` pada seluruh area pesan dan chip rekomendasi.

---

### 2. HOW (Bagaimana)
- **Preservasi Geometri & Timing Kontrol:**
  ```tsx
  animate={
    isOpen
      ? { width: 380, height: 580, borderRadius: 24 }
      : { width: 146, height: 48, borderRadius: 24 }
  }
  transition={
    isOpen
      ? {
          width: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
          height: { duration: 0.52, delay: 0.32, ease: [0.16, 1, 0.3, 1] },
          borderRadius: { duration: 0.3 },
        }
      : {
          height: { duration: 0.44, ease: [0.16, 1, 0.3, 1] },
          width: { duration: 0.38, delay: 0.34, ease: [0.16, 1, 0.3, 1] },
          borderRadius: { duration: 0.3 },
        }
  }
  ```
- **Progressive Blur Content Inset:**
  ```tsx
  initial={{ opacity: 0, filter: 'blur(14px)', y: 12 }}
  animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
  exit={{ opacity: 0, filter: 'blur(8px)', y: 6, transition: { duration: 0.18 } }}
  transition={{ duration: 0.48, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
  ```

---

### 3. WHERE (Di Mana)

| File | Tipe Perubahan | Deskripsi |
| :--- | :--- | :--- |
| [frontend/src/components/AiChatWidget.tsx](file:///d:/KKN/Website/frontend/src/components/AiChatWidget.tsx) | `MODIFY` | Penguncian radius 24px, penyempurnaan durasi tempo dan easing kurva bezier |
| [frontend/src/lib/markdown.tsx](file:///d:/KKN/Website/frontend/src/lib/markdown.tsx) | `NEW` | Parser markdown cerdas & zero-dependency dengan palet monokrom |
| [frontend/src/components/ai/AiDotMatrixIcon.tsx](file:///d:/KKN/Website/frontend/src/components/ai/AiDotMatrixIcon.tsx) | `NEW` | Komponen SVG Dot-Matrix Icon monokrom untuk icon input dan thinking spinner |
| [frontend/src/components/ai/AiHeroView.tsx](file:///d:/KKN/Website/frontend/src/components/ai/AiHeroView.tsx) | `NEW` | Tampilan Hero Avatar looping dengan depth fade-out, sapaan & quick prompt chips |
| [frontend/src/components/ai/AiChatHeader.tsx](file:///d:/KKN/Website/frontend/src/components/ai/AiChatHeader.tsx) | `MODIFY` | Header monokrom minimalis dengan tombol kembali dan close |
| [frontend/src/components/ai/AiMessageList.tsx](file:///d:/KKN/Website/frontend/src/components/ai/AiMessageList.tsx) | `MODIFY` | Bubble chat monokrom, eliminasi scrollbar, dan state *Thinking...* |
| [frontend/src/components/ai/AiChatInput.tsx](file:///d:/KKN/Website/frontend/src/components/ai/AiChatInput.tsx) | `MODIFY` | Input bar floating pill monokrom dengan tombol send bulat |
| [frontend/src/app/globals.css](file:///d:/KKN/Website/frontend/src/app/globals.css) | `MODIFY` | Penambahan utility class `.no-scrollbar` |

---

## 🧪 Hasil Verifikasi & Build
- `npm run build` pada folder `frontend`: **Lulus dengan 0 Error**.
- Geometri bentuk kotak bersudut tumpul (`rounded-24px`) terjaga stabil tanpa distorsi melengkung.
- Gerakan transisi memiliki kontrol tempo yang mewah dan mulus (*luxury cubic-bezier pacing*).
