# Prompt: Layout PR

## Objective

Buat layout untuk App Web ini untuk mempermudah navigasi dan meningkatkan pengalaman pengguna.

## Tasks

- Tambahkan header dengan logo dan nama aplikasi.
- Buat sidebar dengan menu navigasi untuk Dashboard dan Profile
- Menu sidebar memiliki level (hirarki) sebagai berikut:
  - Dashboard
  - Profile
    - [Nama Frontend Engineer]
    - [Nama Frontend Engineer]

## Rules

- Menu Profile akan menampilkan daftar Frontend Engineer yang saat ini belum tersedia.
- Untuk halaman profile engineer, gunakan component reusable `/src/components/ProfileInfoTable/` sebagai standar tampilan data.
- Pada table profile, judul row (kolom label) wajib rata kiri.
- Jika value berisi multiple item (contoh: projects/guilds), tampilkan horizontal dan wajib auto-wrap ke baris berikutnya ketika melewati lebar container.
- Layout dan seluruh section turunannya wajib mendukung Dark Mode dengan pendekatan CSS variables dan atribut `data-color-scheme`.
- Jika layout atau section memiliki header kolom / judul kolom, gunakan styling yang konsisten antar halaman melalui token heading, bukan warna hardcoded per file.
- Untuk section roadmap/tahap yang muncul di Dashboard, Profile, atau halaman Roadmap, pertahankan konsistensi visual header bulan, label stage, dan kartu tahap dengan style reusable yang sama.
