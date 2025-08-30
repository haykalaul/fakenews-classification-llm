# Real nih — Fake News Detection Landing Page (AI-powered)

## Deskripsi
Proyek ini adalah aplikasi web Next.js untuk mendeteksi berita palsu (fake news) menggunakan model AI. Aplikasi menyediakan antarmuka untuk memeriksa teks, dokumentasi integrasi API, dan utilitas untuk pengembang.

## Teknologi yang digunakan
- Next.js (App Router)
- React, TypeScript
- Tailwind CSS
- Framer Motion
- Model & API: Hugging Face, Grok.ai
- Node.js (disarankan: >= 18.18.0 atau >= 20.0.0)

## Fitur
- Deteksi teks berita menggunakan model AI
- Integrasi API untuk pemanggilan model di server
- Halaman dokumentasi dan FAQ
- Footer dengan link sosial dan informasi proyek
- Desain responsif dengan Tailwind CSS dan animasi ringan

## Persiapan & Instalasi (Setup)
1. Pastikan Node.js memenuhi versi yang disarankan:
   - Disarankan: Node.js ^18.18.0 || ^19.8.0 || >=20.0.0
   - Gunakan nvm-windows jika perlu mengelola versi Node di Windows.

2. Clone repo dan masuk ke folder:
   - buka terminal (di Windows/Cmder/VS Code) dan jalankan:
     - git clone <repo-url>
     - cd fakenews-classification-main

3. Install dependency:
   - npm install

4. Buat file environment (server-side) di root proyek:
   - nama file: .env.local
   - isi minimal:
     HUGGINGFACE_API_TOKEN=YOUR_HUGGINGFACE_TOKEN_HERE
     HUGGINGFACE_MODEL=owner/model-name
     GROK_API_TOKEN=YOUR_GROKAI_TOKEN_HERE
   - Pastikan .env.local ada di .gitignore (jangan commit token).

5. Jalankan development server:
   - npm run dev
   - Jika muncul error "next is not recognized", jalankan `npm install` lalu coba lagi dan pastikan Node versi sudah sesuai.

6. Build & production:
   - npm run build
   - npm run start

7. Deploy ke Vercel
   - Prasyarat: punya akun Vercel dan repository (GitHub/GitLab/Bitbucket).
   - Langkah singkat:
     1. Buka https://vercel.com dan login.
     2. Klik "New Project" → pilih repository project ini.
     3. Pilih framework: Next.js (Vercel mendeteksi otomatis).
     4. Atur Build Command: npm run build (default biasanya terdeteksi).
     5. Atur Output Directory: kosongkan (Next.js App Router tidak memerlukan folder build khusus).
     6. Tambahkan Environment Variables (PENTING):
        - HUGGINGFACE_API_TOKEN (Production & Preview)
        - HUGGINGFACE_MODEL
        - GROK_API_TOKEN
        - Pastikan nilainya benar dan jangan gunakan prefix NEXT_PUBLIC_ untuk token sensitif.
     7. Jika perlu memaksa versi Node tertentu, tambahkan field "engines" di package.json:
        {
          "engines": { "node": ">=18.18.0" }
        }
        atau atur NODE version di Vercel Project Settings → General → Node.js Version.
     8. Klik Deploy. Setelah berhasil, setiap push ke branch yang dikonfigurasi akan memicu build & deploy otomatis.
   - Catatan:
     - Simpan token hanya di Environment Variables Vercel, bukan di repo.
     - Setelah mengubah env vars, redeploy manual jika diperlukan.

## Penjelasan Dukungan AI (AI support)
- Aplikasi memanggil model AI dari layanan pihak ketiga (Hugging Face, Grok.ai) pada sisi server (API routes / server components).
- Token API sensitif disimpan di .env.local dan diakses di kode server melalui:
  - process.env.HUGGINGFACE_API_TOKEN
  - process.env.HUGGINGFACE_MODEL
  - process.env.GROK_API_TOKEN
- Jangan menambahkan prefix NEXT_PUBLIC_ pada token agar tidak terekspos ke client.
- Contoh alur singkat:
  1. Client POST teks ke API route Next.js.
  2. API route memanggil endpoint Hugging Face / Grok dengan token dari process.env.
  3. API route memproses respon model lalu mengembalikan hasil ke client.

## Catatan Penting
- Jangan commit file .env.local yang berisi token.
- Restart server setiap kali mengubah .env.local.
- Untuk debugging: periksa versi Node dan jalur executable (where node di terminal) jika ada perbedaan antar terminal (Cmder vs Command Prompt).

Jika butuh contoh implementasi API route atau template .env.example, 
beri tahu dengan 
1.kontak email: haikalaulilalbab@gmail.com ,atau
2. hubungi pada medsos yang ada pada footer medsos information
