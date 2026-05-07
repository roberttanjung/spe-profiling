# Prompt: Roadmap PR

## Objective

Buat atau sesuaikan halaman Roadmap SPV Frontend Engineer tahun 2026 berdasarkan kebutuhan roadmap yang telah disepakati di project ini.

## Source

- Gunakan referensi utama dari `./src/views/Roadmap/README.md`.
- Gunakan `./src/views/Roadmap/` sebagai source page.

## Navigasi

- **Path**: `/roadmap`

## Tasks

- Buat halaman Roadmap untuk menampilkan rencana pengembangan SPV selama 2026.
- Tampilkan roadmap dalam bentuk tahapan dengan waktu yang telah ditentukan.
- Tambahkan sesi `Timeline` di atas detail Tahap 1 sampai Tahap 5.
- Tampilkan roadmap dalam format timeline atau gantt chart.
- Tampilkan detail tiap tahap dalam bentuk kartu berisi fokus, aktivitas, dan output.
- Gunakan course online dari Udemy sebagai bagian dari aktivitas.
- Gunakan hanya course Udemy yang tersedia dan valid.
- Gunakan course Udemy berbahasa Indonesia.
- Hitung estimasi timeline berdasarkan total durasi course agar dasar penentuan waktunya jelas.
- Batasi deadline roadmap sampai bulan November.
- Adjust timeline agar hanya tampil sampai November.

## Rules

- Tujuan roadmap wajib selaras dengan `Learning`.
- Tujuan roadmap wajib selaras dengan `DR Cosma Grom`.
- Roadmap harus realistis berdasarkan proses dan hasil yang bisa dilihat secara fisik.
- Output hasil sebaiknya berupa sertifikat, dokumen internal, framework kerja, atau portfolio kepemimpinan.
- Pada sesi `Timeline`, cukup tampilkan judul tahap karena detail lengkap sudah tersedia di Tahap 1 sampai Tahap 5.
- Timeline harus sejajar secara visual antara label, grid background, nomor minggu, dan bar tahap.

## Data Expectations

- Setiap aktivitas course Udemy idealnya memiliki:
  - `courseTitle`
  - `courseUrl`
  - `courseHours`
- Estimasi minggu dihitung dari durasi course Udemy per tahap.
- Jika ada aktivitas internal, aktivitas tersebut dapat ditampilkan tanpa link course.

## Interface

- Tampilan roadmap harus minimalis, informatif, dan fokus pada insight.
- Gunakan timeline/gantt yang mudah dipahami dan tetap nyaman di mobile.
- Timeline diletakkan di atas detail tahap.
- Detail roadmap tetap ditampilkan sebagai daftar tahapan yang runtut.

## Edit Flow

- Jika halaman roadmap sudah ada, fokus pada penyesuaian data, timeline, validitas referensi course, dan konsistensi visual.
- Jika timeline berubah, sinkronkan data durasi, label periode, dan grid CSS.
