# Agent: ProfileAgent

## Agents

**Interface Agent:** `./.github/agents/interface.agent.md`
**Data Agent:** `./.github/agents/data.agent.md`

## Purpose

Agent khusus untuk penyesuaian data TWBE (sprint dan monthly) ke halaman profile masing-masing Frontend Engineer.

## Rules

- Perbaikan dan perubahan data wajib dilakukan di `./src/views/Profile`.
- Data TWBE didapat dari `./src/db/twbe.json`.
- Data masing-masing Frontend Engineer wajib diambil berdasarkan `employee_name`.
- Sumber data harus mengikuti data terbaru di `src/app/page.tsx`.
- Data referensi TWBE diambil dari `src/db/` dan `src/views/Profile/`.
- Data profile mencakup section sprint performance dan monthly performance.
- Data monthly wajib dimerge berdasarkan `month` dengan format "Month Year" seperti "September 2025" jika ada 3 maka disatukan saja begitu juga dibulan-bulan lainnya.
- Urutan `month` adalah sebagai berikut (kronologis dari September 2025 hingga April 2026):
  - September 2025
  - October 2025
  - November 2025
  - December 2025
  - January 2026
  - February 2026
  - March 2026
  - April 2026
- `Bugs Ratio` sprint dihitung dengan rumus `Total Bugs` / `Total Task`.
- `Bugs Ratio` monthly dihitung dengan rumus: total bugs ratio pada setiap sprint di bulan tersebut dibagi jumlah sprint.
- Apabila `Finish Rate` memiliki value 4 digit, maka 2 digit terakhir adalah koma.
- Tampilkan section `TWBE Sprint Performance` dalam table view yang konsisten dan reusable.
- Urutan kolom section sprint wajib: `Project Name`, `Month`, `Sprint Name`, `Total Task`, `Total Weights`, `Bugs Ratio`, `Done Rate`, `Finish Rate`.
- Tampilkan section `TWBE Monthly Performance` tepat di bawah section `TWBE Sprint Performance`.
- Section monthly wajib menggunakan table view konsisten, reusable, dan memanfaatkan component table profile yang sudah ada.
- Urutan kolom section monthly wajib: `Month`, `Total Task`, `Total Weight`, `Bugs Ratio`, `Done Rate`, `Finish Rate`.
- Format monthly tidak menggunakan kolom `Project Name`.
- Pertahankan prinsip read-only dan fokus pada insight data.
- Berikan warna merah pada text di cell terkait apabila validasi tidak sesuai.
  - Sprint: `Bugs Ratio` maksimal 0.3, `Done Rate` minimal 95%, `Finish Rate` minimal 95%.
  - Monthly: `Total Task` minimal 40, `Total Weight` minimal 60, `Bugs Ratio` maksimal 0.3, `Done Rate` minimal 95%, `Finish Rate` minimal 95%.

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

## Bare Minimum Section

Section "Bare Minimum Frontend Engineer" ditampilkan di antara `ProfileChartSection` dan `ProfileMonthlyTable` menggunakan komponen `BareMinimumSection` yang didefinisikan langsung di `ProfileView.tsx`.

### Struktur

- **Tabel transposed**: setiap aspek menjadi kolom header, terdapat satu baris data berisi bintang (★/☆).
- **Star rating** per kolom setelah di-adjust dengan KPI achievement dari data TWBE monthly engineer:
  - Base rating dari `profile.bareMinimumRatings`
  - Di-adjust per fungsi `withKpiAdjustedRatings()` di `src/db/bareMinimum.ts`
  - Tampilkan rating yang sudah di-adjust (bukan raw)
- Nilai adjusted rating identik antara Profile View dan Dashboard — keduanya menerapkan logika KPI adjustment yang sama
- Data aspek diambil dari konstanta `BARE_MINIMUM_MATRIX` di `src/db/bareMinimum.ts`.

### Tooltip ⓘ

- Setiap header kolom memiliki ikon **ⓘ** yang saat di-hover memunculkan CSS tooltip.
- Tooltip menampilkan deskripsi untuk semua 4 level (★★ II/2, ★★★ II/3, ★★★★ II/4, ★★★★★ II/5) untuk aspek yang bersangkutan.
- Tooltip diimplementasikan murni CSS (`.bmInfoWrap:hover .bmTooltip`) tanpa JavaScript.

### Rules Perubahan

- Untuk mengubah isi aspek (deskripsi per level), edit konstanta `BARE_MINIMUM_MATRIX` di `src/db/bareMinimum.ts` — **bukan** di `ProfileView.tsx`.
- Untuk menambah aspek baru, tambahkan objek baru di `BARE_MINIMUM_MATRIX` (`src/db/bareMinimum.ts`) dengan key `aspect`, `ratingKey`, `level1`, `level2`, `level3`, `level4`, `level5`.
- Untuk mengubah tampilan, edit class `bm*` di `ProfileCommon.module.css`.
- Field `bareMinimum` **tidak ada** di `ProfileSoftAspect` dan tidak perlu diisi di masing-masing engineer file.
- Posisi section: setelah `ProfileChartSection`, sebelum `ProfileMonthlyTable`.
- `BARE_MINIMUM_MATRIX` dan `BARE_MINIMUM_TOOLTIP_LEVELS` dipakai bersama oleh Dashboard dan Profile View — perubahan di sini otomatis memperbarui kedua halaman.
- **KPI Adjustment**: Fungsi `withKpiAdjustedRatings()` dan `getKpiAchievement()` di `src/db/bareMinimum.ts` menerapkan adjustment untuk setiap engineer. Dashboard dan Profile View keduanya menerapkan adjustment sebelum display, menjamin nilai Bare Minimum identik.

## Aspek Profil

Section "Aspek Profil" menampilkan soft aspect profile (collaborationType, workStyle, strengths, developmentAreas, uniqueSellingPoint) dengan tabel vertikal di halaman profile individual engineer.

### Label Konsistensi

- Label kolom Aspek Profil tersentralisasi di `src/db/softProfile.ts`:
  - `SOFT_PROFILE_TEXT_KEYS`: 5 key soft profile
  - `SOFT_PROFILE_TEXT_LABELS`: Mapping key → label Indonesia
- Profile View dan Dashboard keduanya derive tabel Aspek Profil dari konstanta ini
- Perubahan label otomatis sync di semua halaman tanpa manual update

## Reference Date (Kalkulasi Umur & Tenure)

Konstanta `REFERENCE_DATE` di `src/db/constants.ts` (5 Mei 2026, akhir periode profiling) digunakan sebagai baseline kalkulasi umur dan lama bekerja di semua halaman.

### Rules

- Profile View dan Dashboard keduanya import dan menggunakan `REFERENCE_DATE` yang sama
- Umur engineer = selisih tahun dari REFERENCE_DATE ke dateOfBirth, adjusted per bulan/tanggal
- Tenure engineer = selisih tahun/bulan dari REFERENCE_DATE ke joinedDate
- Jangan gunakan `new Date()` untuk kalkulasi umur/tenure — selalu gunakan `REFERENCE_DATE`
- Perubahan reference date di satu file otomatis memperbarui nilai di Dashboard dan semua Profile engineer

## Career Roadmap Section

Section "Roadmap Karir" menampilkan rencana pengembangan dan arah karir Engineer fokus pada Peningkatan dan Arah Karir dengan timeline tahapan, aktivitas course online, dan output fisik.

### Tujuan dan Alignment

- Tujuan roadmap karir wajib selaras dengan `DR Cosma Grom` (Discipline, Resilience, Collaboration, Smart Working, Growth Mindset)
- Roadmap harus realistis dan berorientasi pada proses serta hasil fisik seperti sertifikat, dokumen internal, atau portfolio pengembangan kemampuan

### Struktur dan Konten

- Career roadmap ditampilkan menggunakan komponen `CareerRoadmapSection` di `src/components/CareerRoadmapSection/`
- Roadmap terdiri dari **6 tahap** — satu tahap per bulan, mulai Juni 2026 hingga November 2026
- Schema setiap tahap: `period` (string), `objective` (string), `courseOnline` (array `{ title, url? }`), `successIndicator` (string)
- TypeScript types lengkap ada di `src/views/Profile/ProfileView/ProfileView.types.ts` (`ProfileRoadmapStage`, `ProfileRoadmapCourse`) dan `src/components/CareerRoadmapSection/CareerRoadmapSection.types.ts` (`CareerRoadmapStage`, `CareerRoadmapCourse`)
- Sesi `Timeline` diletakkan di atas detail Tahap 1 sampai Tahap 6, menampilkan hanya judul tahap tanpa detail lengkap
- Grid timeline mencakup bulan Juni sampai November 2026
- Bar tahap ditampilkan sejajar dengan header bulan, nomor minggu, dan background grid

### Aktivitas dan Course Online

- Referensi course online wajib valid dan tersedia di platform yang tepat (preferensi: Udemy)
- Course online yang digunakan wajib berbahasa Indonesia
- Setiap course menggunakan field `title` (wajib) dan `url` (opsional) — **bukan** `courseTitle`/`courseUrl`/`courseHours`
- Badge "Course Online" hanya ditampilkan pada item yang memiliki field `url`
- Aktivitas internal cukup mengisi field `title` tanpa `url`
- Estimasi waktu pengerjaan roadmap memiliki dasar jelas dari durasi course online dengan standar study hours per minggu

### Rules Perubahan

- Perbaikan dan perubahan career roadmap wajib dilakukan di `./src/views/Profile/<EngineerName>/`
- Setiap engineer memiliki roadmap yang dikurasi berdasarkan area peningkatan dan arah karir individual
- Untuk mengubah timeline atau tahap, edit schema di file engineer yang relevan, maka `CareerRoadmapSection` akan otomatis render perubahan
- Untuk mengubah styling atau layout timeline, edit `src/components/CareerRoadmapSection/` dan `src/views/Roadmap/RoadmapView.module.css`
- Jika mengubah struktur schema roadmap, pastikan konsistensi dengan TypeScript types di `src/components/CareerRoadmapSection/CareerRoadmapSection.types.ts`
- Perubahan data roadmap di satu file engineer otomatis tampil di halaman profile engineer tersebut

### Output Expectations

- Setiap tahap roadmap wajib memiliki output yang spesifik dan terukur
- Output tahap dapat berupa: sertifikat course, dokumen keputusan, proposal, design proposal, presentasi teknis, atau portfolio pengembangan kemampuan
- Timeline roadmap wajib responsif dan tetap terbaca pada layar kecil dengan scroll horizontal jika diperlukan
- Validasi: deadline roadmap tidak melampaui November 2026
