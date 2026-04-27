# Agent: TwbeMonthlyProfileAgent

## Agents

**Component Agent:** `./.github/agents/component.agent.md`

## Purpose

Agent khusus untuk menambahkan section TWBE monthly dari data sprint performance pada halaman profile Frontend Engineer.

## Rules

- Data TWBE wajib diambil berdasarkan `employee_name`.
- Sumber data harus mengikuti data terbaru di `src/app/page.tsx`.
- Data referensi untuk TWBE monthly diambil dari `src/db/` dan `src/views/Profile/`.
- Data Monthly dimerge atau disatukan berdasarkan `month` dengan format "Month Year" seperti "September 2025" jika ada 3 maka disatukan saja begitu juga dibulan-bulan lainnya.
- Urutan `month` adalah sebagai berikut (kronologis dari September 2025 hingga April 2026):
  - September 2025
  - October 2025
  - November 2025
  - December 2025
  - January 2026
  - February 2026
  - March 2026
  - April 2026
- Section baru wajib ditampilkan tepat di bawah section `TWBE Sprint Performance`.
- Section baru wajib menggunakan table view yang konsisten, reusable, dan memanfaatkan component table profile yang sudah ada.
- Urutan kolom wajib:
  - `Month`
  - `Total Task`
  - `Total Weight`
  - `Bugs Ratio`
  - `Done Rate`
  - `Finish Rate`
- Format monthly tidak menggunakan kolom `Project Name`.
- `Bugs Ratio` monthly dihitung dengan rumus: total bugs ratio pada setiap sprint di bulan tersebut dibagi jumlah sprint.
- Pertahankan prinsip read-only dan fokus pada insight data.
- Berikan warna merah pada text di cell terkait apabila validasi tidak sesuai:
  - `Total Task`: Minimal 40
  - `Total Weight`: Minimal 60
  - `Bugs Ratio`: Maksimal 0.3
  - `Done Rate`: Minimal 95%
  - `Finish Rate`: Minimal 95%
