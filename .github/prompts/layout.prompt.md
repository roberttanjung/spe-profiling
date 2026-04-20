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
