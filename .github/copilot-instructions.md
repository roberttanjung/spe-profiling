# Copilot Instructions

## Introduction

Ini adalah App Web yang dibangun untuk monitoring bagi para SPV Frontend Engineer. Profiling dilakukan dalam periode September 2025 hingga April 2026.

## Purpose

Aplikasi ini mampu menunjukan alasan mengapa seorang Front End Engineer layak untuk berada di perusahaan ini yang bernama SPE. Adapun alasan yang dimaksud adalah:

- `Discipline`: Kemampuan untuk bekerja dengan disiplin tinggi, termasuk manajemen waktu yang baik dan konsistensi dalam menyelesaikan tugas.
- `Resilience`: Kemampuan untuk tetap tenang dan fokus dalam menghadapi tekanan atau tantangan, serta kemampuan untuk bangkit kembali setelah mengalami kegagalan.
- `Collaboration`: Kemampuan untuk bekerja sama dengan baik dalam tim, termasuk kemampuan untuk berkomunikasi secara efektif, mendengarkan orang lain, dan memberikan kontribusi yang berarti dalam proyek bersama.
- `Smart Working`: Kemampuan untuk bekerja dengan cerdas, termasuk kemampuan untuk memprioritaskan tugas, menggunakan alat dan teknologi yang tepat, serta mencari cara untuk meningkatkan efisiensi kerja.
- `Growth Mindset`: Kemampuan untuk terus belajar dan berkembang, serta kemampuan untuk menerima kritik dan menggunakan umpan balik untuk meningkatkan diri.

Atau dapat disingkat menjadi **DR Cosma Grom** (Discipline, Resilience, Collaboration, Smart Working, Growth Mindset).

### Hal yang dimonitoring

- Profiling Frontend Engineer
- Roadmap Personal sebagai SPV Frontend Engineer

## Stack

- **Next JS v16**: Framework utama untuk membangun aplikasi web
- **mui/material v9**: Library UI untuk komponen antarmuka pengguna

## Conditions

- Pada saat ini belum ada authentication, jadi semua user bisa akses semua data
- Pada saat ini data masih bersifat statis, belum terhubung dengan database atau API
- Data yang ditampilkan bersifat read-only, tidak ada fitur edit atau delete

## Structure

- `src/app`: Folder utama untuk halaman
- `src/components`: Folder untuk komponen UI yang bisa digunakan ulang
- `src/utils`: Folder untuk utilitas dan helper functions yang bisa digunakan di berbagai tempat
- `src/views`: Folder untuk komponen yang spesifik untuk halaman tertentu agar lebih terorganisir

## Style Guide

- Gunakan camelCase untuk penamaan variabel dan fungsi
- Gunakan PascalCase untuk penamaan komponen React
- Gunakan kebijakan single responsibility principle untuk komponen, pastikan setiap komponen hanya memiliki satu tanggung jawab
- Hindari nested components yang terlalu dalam, usahakan untuk memecahnya menjadi komponen yang lebih kecil jika diperlukan
- Nested hanya 1 level, jika lebih dari itu, pertimbangkan untuk memecahnya menjadi komponen yang lebih kecil

### Example

#### Folder Structure

src/
├── app/
│ ├── dashboard/
│ │ ├── page.tsx
│ └── profile/
│ | ├── page.tsx
├── views/
│ ├── Dashboard/
│ │ ├── Dashboard.tsx
│ │ ├── Dashboard.module.css
│ │ ├── Dashboard.types.ts
│ │ └── index.ts
│ └── Profile/
│ ├── Profile.tsx
│ ├── Profile.module.css
│ ├── Profile.types.ts
│ └── index.ts
├── components/
│ ├── Button/
│ │ ├── Button.tsx
│ │ ├── Button.module.css
│ │ ├── Button.types.ts
│ │ └── index.ts
│ └── Card/
│ ├── Card.tsx
│ ├── Card.module.css
│ ├── Card.types.ts
│ └── index.ts
├── utils/
│ ├── api.ts
│ ├── constants.ts
│ └── helpers.ts

## Rules

- Utama tampilan minimalis dengan fokus pada data dan insight
- User experience yang intuitif dan mudah dinavigasi
- Aksesibilitas untuk semua pengguna, termasuk yang memiliki disabilitas
- Responsif untuk berbagai ukuran layar, termasuk mobile
- Konsistensi dalam desain dan interaksi di seluruh interface
- Gunakan warna dan tipografi yang sesuai untuk meningkatkan keterbacaan
- Sertakan elemen visual seperti grafik atau ikon untuk membantu pemahaman data
- Pastikan component mudah digunakan tanpa memerlukan pelatihan khusus
- Selalu update file agents dan prompts sesuai dengan perubahan

## Career Roadmap Section

Section "Roadmap Karir" menampilkan rencana pengembangan dan arah karir Engineer fokus pada Peningkatan dan Arah Karir dengan timeline tahapan, aktivitas course online, dan output fisik.

### Tujuan dan Alignment

- Tujuan roadmap karir wajib selaras dengan `DR Cosma Grom` (Discipline, Resilience, Collaboration, Smart Working, Growth Mindset)
- Roadmap harus realistis dan berorientasi pada proses serta hasil fisik seperti sertifikat, dokumen internal, atau portfolio pengembangan kemampuan

### Struktur dan Konten

- Career roadmap ditampilkan menggunakan komponen `CareerRoadmapSection` di `src/components/CareerRoadmapSection/`
- Roadmap terdiri dari 5 tahap yang runtut dengan skema: `period`, `objective`, `courseOnline`, `successIndicator`
- Timeline berbasis kuartal (quarter-based) dengan 4 minggu per tahap, mulai Juni 2026 hingga November 2026
- Sesi `Timeline` diletakkan di atas detail Tahap 1 sampai Tahap 5, menampilkan hanya judul tahap tanpa detail lengkap
- Grid timeline mencakup bulan Juni sampai November 2026
- Bar tahap ditampilkan sejajar dengan header bulan, nomor minggu, dan background grid

### Aktivitas dan Course Online

- Referensi course online wajib valid dan tersedia di platform yang tepat (preferensi: Udemy)
- Course online yang digunakan wajib berbahasa Indonesia
- Setiap course wajib memiliki metadata: `title`, `url` (opsional untuk aktivitas internal)
- Estimasi waktu pengerjaan roadmap memiliki dasar jelas dari durasi course online dengan standar study hours per minggu
- Aktivitas dapat berupa course online atau aktivitas internal (dokumentasi, presentasi, review, dll)
- Aktivitas internal tidak memerlukan link course, cukup deskripsi jelas di field `title`

### Rules Perubahan Chart

- Perbaikan dan perubahan career roadmap wajib dilakukan di `./src/views/Profile/<EngineerName>/`
- Setiap engineer memiliki roadmap yang dikurasi berdasarkan area peningkatan dan arah karir individual
- Untuk mengubah timeline atau tahap, edit schema di file engineer yang relevan, maka `CareerRoadmapSection` akan otomatis render perubahan
- Untuk mengubah styling atau layout timeline, edit `src/components/CareerRoadmapSection/` dan `src/views/Roadmap/RoadmapView.module.css`
- Jika mengubah struktur schema roadmap, pastikan konsistensi dengan TypeScript types di `src/components/CareerRoadmapSection/CareerRoadmapSection.types.ts`
- Perubahan data roadmap di satu file engineer otomatis tampil di halaman profile engineer tersebut

### Output Expectations

- Setiap tahap roadmap wajib memiliki output yang spesifik dan terukur (field `successIndicator`)
- Output tahap dapat berupa: sertifikat course, dokumen keputusan, proposal, design proposal, presentasi teknis, atau portfolio pengembangan kemampuan
- Timeline roadmap wajib responsif dan tetap terbaca pada layar kecil dengan scroll horizontal jika diperlukan
- Validasi: deadline roadmap tidak melampaui November 2026

## Tasks

Selalu sesuai data di ./src/app/page.tsx setelah prompting. Data dapat diambil dari:

- `src/db/`
- `src/views/Profile/`

## Takeaway

- Berikan tanda X untuk setiap task yang sudah selesai contoh [x]
- Lakukan adjustment di setiap file yang ada di `.github/` apabila ada perubahan-perubahan yang berdampak dari sesi prompting, terutama di file `data.agent.md` dan `profile.agent.md` untuk penyesuaian data profile engineer.
