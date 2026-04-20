# Prompt: Profile PR

## Objective

Buat halaman baru untuk menampilkan profil dari seorang Frontend Engineer.

## Variabel

- `name`: Nama lengkap dari Frontend Engineer.
- `date_of_birth`: Tanggal lahir dari Frontend Engineer.
- `level_grade`: Tingkat atau grade dari Frontend Engineer dalam perusahaan.
- `joined_date`: Tanggal bergabung dengan perusahaan.
- `projects`: Daftar proyek yang saat sedang dikerjakan oleh Frontend Engineer.
- `guilds`: Daftar guild yang saat sedang dikerjakan oleh Frontend Engineer.

## Navigasi

- **Path**: `/profile/{name}`

### Rules

- Path url berformat kebab-case dengan nama lengkap dari Frontend Engineer.

## Conditions

- Jika nama telah digunakan maka akan menjadi mode Edit, jika belum maka akan menjadi mode Create.
- Edit Flow akan dijalankan jika mode adalah Edit
- Create Flow akan dijalankan jika mode adalah Create
- Sesuaikan tampilan apabila mode Edit tidak sesuai dengan hasil Create Flow

## Create Flow

- Tambahkan halaman baru dengan cara membuat file baru di `/src/app/(admin)/profile/{name}.tsx` dengan format nama file menggunakan kebab-case.
- Daftarkan halaman profil baru ini ke dalam sidebar menu Profil.
- Gunakan folder `/src/views/Profile/{name}/` dengan format PascalCase untuk menyimpan komponen-komponen yang digunakan di halaman profil.
- Gunakan component reusable `/src/components/ProfileInfoTable/` untuk menampilkan data profil dalam format tabel vertikal.
- Tampilkan informasi yang relevan seperti nama, tanggal lahir, umur, tingkat atau grade, tanggal bergabung, lama bekerja di perusahaan, proyek yang sedang dikerjakan, dan guilds yang sedang dikerjakan di halaman profil dalam bentuk yang mudah dibaca dan menarik secara visual.
- Tambahkan file README.md di dalam folder profil yang berisi dokumentasi singkat tentang halaman profil tersebut, termasuk informasi tentang data yang ditampilkan dan cara menggunakannya.

## Edit Flow

- Berfokus terhadap apa yang ingin di ubah

## Interface

- Tampilan berbentuk Table view dalam dalam mode vertikal dengan informasi yang ditampilkan secara jelas dan terstruktur
- Judul row (kolom label) wajib rata kiri.
- Jika value berisi multiple item (contoh: projects atau guilds), tampilkan secara horizontal menggunakan chip/list item dan harus otomatis pindah baris (wrap) saat melewati lebar wadah.
- Untuk value multiple, kirim data dalam bentuk array agar dirender konsisten oleh component reusable table.
