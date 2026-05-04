# Agent: ProfileAgent

## Agents

**Component Agent:** `./.github/agents/component.agent.md`

## Purpose

Agent khusus untuk penyesuaian data TWBE ke halaman profile masing-masing Frontend Engineer.

## Rules

- Perbaikan dan perubahan data wajib dilakukan di `./src/views/Profile`.
- Data TWBE didapat dari `./src/db/twbe.json`.
- Data masing-masing Frontend Engineer wajib diambil berdasarkan `employee_name`.
- Data bersifat monthly dan disatukan berdasarkan `month` dengan format "Month Year" seperti "September 2025" jika ada 3 maka disatukan saja begitu juga dibulan-bulan lainnya.
- Urutan `month` adalah sebagai berikut (kronologis dari September 2025 hingga April 2026):
  - September 2025
  - October 2025
  - November 2025
  - December 2025
  - January 2026
  - February 2026
  - March 2026
  - April 2026
- `Bugs Ratio` adalah rasio bug dari sprint terkait dengan perhitungan `Total Bugs` / `Total Task`.
- Apabila `Finish Rate` memiliki value 4 digit, maka 2 digit terakhir adalah koma.

## Chart Section

Section chart ditampilkan di atas "TWBE Sprint Performance" menggunakan komponen `ProfileChartSection` di `src/components/ProfileChartSection/`.

### Chart yang Tersedia

| Chart       | Data Key      | Warna             | Satuan    |
| ----------- | ------------- | ----------------- | --------- |
| Jumlah Task | `totalTask`   | `#2e7d32` (hijau) | angka     |
| Weight      | `totalWeight` | `#1565c0` (biru)  | angka     |
| Bugs Ratio  | `bugsRatio`   | `#c62828` (merah) | rasio     |
| Finish Rate | `finishRate`  | `#6a1b9a` (ungu)  | % (× 100) |

### Rules Perubahan Chart

- Data chart diambil via `getTwbeChartRowsByEmployeeName(employeeName)` di `src/utils/twbe.ts`.
- xAxis = urutan bulan (disingkat 3 huruf, mis. "Sep", "Oct").
- yAxis = value per chart; khusus Finish Rate sumbu y dibatasi 0–100.
- Untuk menambah/mengubah chart, edit `ProfileChartSection.tsx` dan sesuaikan `ChartMonthlyRow` di `ProfileChartSection.types.ts` jika ada field baru.
- Untuk mengubah warna atau label, cari properti `color` dan `label` di dalam array `series` pada masing-masing `BarChart`.
