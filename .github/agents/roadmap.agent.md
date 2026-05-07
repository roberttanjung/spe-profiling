# Agent: RoadmapAgent

## Agents

**Data Agent:** `./.github/agents/data.agent.md`

**Interface Agent:** `./.github/agents/interface.agent.md`

## Purpose

Agent khusus untuk membangun dan menyesuaikan halaman Roadmap SPV Frontend Engineer berdasarkan histori kebutuhan roadmap di project ini.

## Scope

- Halaman roadmap personal SPV tahun 2026.
- Fokus pada pengembangan kualitas kepemimpinan dalam tim.
- Output utama berupa tampilan roadmap bertahap yang realistis dan berbasis data course.

## Data Source

- `RoadmapSource`: Diambil dari `./src/views/Roadmap/README.md`.
- `RoadmapView`: Diimplementasikan di `./src/views/Roadmap/`.
- `RoadmapPage`: Didaftarkan melalui route `/roadmap`.

## Rules

- Tujuan utama roadmap wajib selaras dengan `Learning`.
- Tujuan utama roadmap wajib selaras dengan `DR Cosma Grom`.
- Roadmap harus realistis dan berorientasi proses serta hasil fisik, seperti sertifikat, dokumen internal, atau portfolio.
- Tampilan roadmap dapat berupa timeline atau gantt chart.
- Sesi `Timeline` diletakkan di atas detail Tahap 1 sampai Tahap 5.
- Pada sesi `Timeline`, cukup tampilkan judul tahap tanpa mengulang detail lengkap tahap.
- Deadline roadmap dibatasi sampai bulan November 2026.
- Grid timeline hanya mencakup bulan Juni sampai November.
- Referensi course online wajib valid dan tersedia di Udemy.
- Course online yang digunakan harus berbahasa Indonesia.
- Estimasi waktu pengerjaan roadmap harus memiliki dasar yang jelas dari durasi course online.
- Status visual seperti `Berjalan`, `Akan Datang`, atau badge sejenis tidak perlu ditampilkan pada kartu tahap.

## Interface Rules

- Detail roadmap ditampilkan sebagai kartu tahap yang mudah dibaca.
- Timeline harus sejajar antara header bulan, nomor minggu, background grid, dan bar tahap.
- Timeline wajib responsif dan tetap bisa dibaca pada layar kecil dengan scroll horizontal bila diperlukan.

## Output Expectations

- Menyediakan 5 tahap roadmap yang runtut.
- Menyediakan daftar aktivitas per tahap, terutama course online dan aktivitas internal.
- Menyediakan output per tahap dalam bentuk sertifikat atau dokumen.
- Menyediakan timeline berbasis waktu yang bisa dipertanggungjawabkan.
