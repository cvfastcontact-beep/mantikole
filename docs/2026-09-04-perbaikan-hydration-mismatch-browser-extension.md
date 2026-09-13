# Perbaikan Hydration Mismatch Akibat Ekstensi Browser

Dokumentasi perbaikan error *React Hydration Mismatch* pada tag root `<html>` dan `<body>` yang disebabkan oleh injeksi atribut dari ekstensi browser pihak ketiga (seperti *Scribe Recorder*, *Grammarly*, dll).

---

## 1. WHY (Mengapa)
- **Problem**: Next.js App Router menampilkan peringatan/error overlay di development mode:
  ```text
  [browser] A tree hydrated but some attributes of the server rendered HTML didn't match the client properties.
  - data-scribe-recorder-ready="true"
  ```
- **Root Cause**: Ekstensi browser pengguna (khususnya *Scribe* / screen & workflow recorder) menyuntikkan atribut HTML kustom (`data-scribe-recorder-ready="true"`) langsung ke elemen `<html>` atau `<body>` di DOM client sebelum proses React hydration selesai. Hal ini menyebabkan ketidaksinkronan atribut antara output SSR dari server Next.js dengan DOM client.

---

## 2. HOW (Bagaimana)
- Sesuai standar resmi React & Next.js ([React Hydration Docs](https://react.dev/link/hydration-mismatch)), atribut `suppressHydrationWarning` disematkan pada tag `<html>` dan `<body>`.
- Fitur bawaan React ini memberi instruksi pada reconciler untuk mengabaikan perbedaan atribut di tingkat elemen tersebut (1-level deep) yang timbul dari intervensi ekstensi browser/theme injector, tanpa mematikan validasi hidrasi pada komponen-komponen anak di dalamnya.

---

## 3. WHERE (Di Mana)
- [frontend/src/app/layout.tsx](file:///d:/KKN/Website/frontend/src/app/layout.tsx#L45-L51)

---

## 4. WHAT (Apa)
Cuplikan perubahan kode pada `layout.tsx`:

```diff
-    <html lang="id" className={inter.variable}>
+    <html lang="id" className={inter.variable} suppressHydrationWarning>
       <head>
         <JsonLd data={villageGovernmentSchema} />
       </head>
-      <body className={`${inter.className} bg-white text-[#0a0a0a] antialiased flex flex-col min-h-screen`}>
+      <body
+        className={`${inter.className} bg-white text-[#0a0a0a] antialiased flex flex-col min-h-screen`}
+        suppressHydrationWarning
+      >
```
