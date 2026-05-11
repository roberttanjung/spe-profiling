# Prompt: Profile Update PR

## Objective

Fokus sesi ini adalah memperbarui profile Frontend Engineer yang sudah ada secara presisi, konsisten, dan sinkron di seluruh sesi yang terdampak.

## Scope

- Hanya mode Update/Edit.
- Tidak membuat halaman profile baru.
- Tidak mengubah struktur routing profile.

## Source of Truth

- README engineer di `./src/views/Profile/<EngineerName>/README.md` adalah referensi utama untuk perubahan konten.
- Data tampilan profile engineer wajib disinkronkan ke object profile pada file `.tsx` engineer yang relevan.
- Untuk aturan teknis TWBE, chart, monthly, dan validasi, ikuti source of truth di `./.github/agents/profile.agent.md`.
- Untuk sesi dashboard atau modul turunan, telusuri terlebih dahulu apakah data bersumber dari object profile engineer atau dari `src/db/twbe.json`.

## Prinsip Update

- Ubah kalimat agar lebih mudah dipahami, spesifik, dan konsisten.
- Gunakan bahasa yang mudah dipahami user non-teknis tanpa mengurangi makna.
- Ringkas boleh, tetapi tidak boleh menghilangkan evidence valid.
- Evidence valid mencakup aktivitas nyata, nama modul/fitur, nama portal/project, area kontribusi, angka, persentase, rasio, coverage, total, jumlah portal, dan detail lain yang menunjukkan dampak kerja.
- Jika ada informasi berbentuk angka, persentase, rasio, coverage, total, atau jumlah yang masih relevan, angka tersebut wajib tetap muncul pada hasil akhir.
- Jika daftar aktivitas teknis diubah menjadi paragraf non-teknis, seluruh poin penting tetap harus terwakili secara eksplisit.
- Prioritaskan perbaikan data/isi di area profile yang sudah ada.

## Aspek yang Dicari

- Tipe kolaborasi
- Gaya kerja
- Daftar kelebihan dari `Good`
- Daftar kekurangan dari `Needs Improve`
- Arah karir berbasis roadmap
- Potensi atau unique selling point
- Bare minimum sebagai Front End Engineer

## Sesi yang Wajib Dicek

- Halaman profile engineer:
  - `Bare Minimum Frontend Engineer`
  - `Kelebihan`
  - `Perlu Ditingkatkan`
  - `Aspek Profil`
  - `Roadmap Karir`
  - `Aktivitas yang Sudah Dilakukan`
  - `TWBE Monthly Chart`
  - `TWBE Monthly Performance`
  - `TWBE Sprint Performance`
- Halaman dashboard:
  - `TWBE Total Comparison Chart`
  - `Bare Minimum Frontend Engineer`
  - `Aspek Profil Komparasi`
  - `Summary Komparasi`
- Modul turunan lain yang membaca object profile engineer yang sama, termasuk generator atau utilitas yang mengambil `good`, `needsImprove`, `softProfile`, `activities`, `careerRoadmap`, atau `bareMinimumReasons`.

## Workflow

1. Baca README engineer sebagai referensi utama.
2. Identifikasi sesi yang berubah, terutama bagian bertanda `[updated]`, `POINTS`, `Good`, `Needs Improve`, `Personal`, dan aktivitas project.
3. Turunkan perubahan ke object profile engineer pada file `.tsx` yang relevan.
4. Sinkronkan seluruh sesi turunan yang membaca data tersebut.
5. Jika chart berasal dari `src/db/twbe.json`, jangan ubah manual isinya; cukup verifikasi engineer yang dipakai sebagai sumber data sudah benar.
6. Hapus tanda `[updated]` setelah perubahan selesai diterapkan.
7. Jika `POINTS` sudah selesai diimplementasikan, pindahkan dampaknya ke sesi yang relevan lalu kosongkan isi `POINTS`.
8. Lakukan pengecekan akhir untuk memastikan tidak ada evidence penting yang hilang akibat peringkasan narasi.

## Career Roadmap Update

Sesi ini mengelola pembaruan career roadmap Engineer yang fokus pada Peningkatan dan Arah Karir.

### Objectives

- Buat atau sesuaikan career roadmap Engineer tahun 2026 berdasarkan area peningkatan dan arah karir personal
- Tampilkan roadmap dalam bentuk 5 tahap dengan timeline kuartal (Juni-November 2026)
- Integrasikan aktivitas course online dari platform terpercaya sebagai bagian roadmap
- Tentukan output fisik yang terukur dan realistis untuk setiap tahap

### Source

- Gunakan referensi dari `./src/views/Profile/<EngineerName>/README.md` sebagai sumber area peningkatan dan arah karir
- Gunakan `./src/views/Profile/<EngineerName>/` sebagai lokasi data career roadmap
- Gunakan `./.github/agents/profile.agent.md` untuk aturan teknis career roadmap section

### Tasks Career Roadmap

- Identifikasi area peningkatan utama Engineer berdasarkan bagian `DEVELOPMENT` di README.md
- Sesuaikan atau buat 5 tahap roadmap yang runtut dengan focus dan learning objectives yang jelas
- Tambahkan aktivitas course online dengan metadata lengkap: `courseTitle`, `courseUrl`, `courseHours`
- Gunakan hanya course dari platform terpercaya (preferensi: Udemy) yang tersedia dan valid
- Gunakan hanya course berbahasa Indonesia
- Hitung estimasi timeline berdasarkan total durasi course agar dasar penentuan waktunya jelas
- Tentukan output per tahap: sertifikat, dokumen keputusan, design proposal, presentasi, atau portfolio pengembangan
- Batasi deadline roadmap sampai November 2026
- Pastikan timeline responsive dan terbaca pada layar kecil dengan scroll horizontal jika diperlukan
- Pastikan tujuan roadmap selaras dengan DR Cosma Grom dan kemampuan Learning yang perlu ditingkatkan

### Rules Career Roadmap Update

- Tujuan roadmap wajib selaras dengan `DR Cosma Grom` (Discipline, Resilience, Collaboration, Smart Working, Growth Mindset)
- Roadmap harus realistis berdasarkan proses dan hasil yang bisa dilihat secara fisik (course completion, dokumentasi, presentasi)
- Pada sesi Timeline, tampilkan hanya judul tahap karena detail lengkap sudah tersedia di card tahap di bawahnya
- Timeline harus sejajar secara visual antara label bulan, grid background, nomor minggu, dan bar tahap
- Setiap tahap wajib memiliki aktivitas yang jelas dan terukur
- Jika ada aktivitas internal, aktivitas tersebut dapat ditampilkan tanpa link course
- Grid timeline hanya mencakup bulan Juni sampai November
- Validasi: deadline tidak melampaui November 2026

### Checklist Career Roadmap

- [ ] Baca bagian DEVELOPMENT di README engineer untuk identifikasi area peningkatan utama
- [ ] Tentukan 5 tahap roadmap yang runtut dengan alignment jelas terhadap DR Cosma Grom
- [ ] Verifikasi semua course online tersedia dan valid di platform yang dipilih
- [ ] Verifikasi semua course berbahasa Indonesia
- [ ] Hitung estimasi minggu berdasarkan durasi course Udemy per tahap dengan standar study hours
- [ ] Tentukan output fisik yang spesifik dan terukur untuk setiap tahap
- [ ] Pastikan timeline responsive pada berbagai ukuran layar
- [ ] Perbarui object career roadmap di file `.tsx` engineer yang relevan
- [ ] Verifikasi komponen `CareerRoadmapSection` merender timeline dan tahap dengan benar
- [ ] Jika timeline berubah, sinkronkan data durasi, label periode, dan konsistensi visual

## Checklist Eksekusi

- [ ] Jalankan penyesuaian perubahan yang dibutuhkan pada mode Update/Edit.
- [ ] Ubah kalimat Kelebihan dan Kekurangan agar lebih mudah dipahami dan lebih spesifik.
- [ ] Gunakan `Personal` di README.md untuk menggali tambahan konteks kelebihan dan kekurangan.
- [ ] Generate informasi dari bagian README.md selain `Personal`, `Good`, dan `Needs Improve` untuk menjelaskan aktivitas engineer.
- [ ] Generate `Aspek yang Dicari` berdasarkan data yang sudah didapatkan.
- [ ] Lakukan perubahan terhadap sesi yang memiliki tanda `[updated]` di README.md, lalu hapus tanda tersebut setelah selesai diperbarui.
- [ ] Jika `POINTS` berubah dan sudah diimplementasikan, perbarui sesi yang relevan lalu kosongkan isi `POINTS`.
- [ ] Pastikan perubahan README telah disinkronkan ke object profile engineer pada file `.tsx` yang relevan.
- [ ] Pastikan seluruh halaman atau modul terdampak ikut diperiksa dan disesuaikan.
- [ ] Pastikan semua evidence valid tetap ada setelah perombakan kalimat, termasuk aktivitas nyata, nama modul, nama portal/project, dan semua angka penting.
- [ ] Pastikan tidak ada sesi dashboard atau modul turunan yang tertinggal apabila membaca data dari object profile engineer yang sama.
- [ ] Setelah implementasi selesai, cek ulang apakah ada informasi penting yang hilang akibat peringkasan narasi. Jika ada, kembalikan ke versi akhir yang tetap mudah dipahami.
- [ ] **Career Roadmap:** Identifikasi area peningkatan dari bagian DEVELOPMENT di README engineer
- [ ] **Career Roadmap:** Buat atau sesuaikan 5 tahap roadmap dengan tujuan jelas dan selaras dengan DR Cosma Grom
- [ ] **Career Roadmap:** Verifikasi semua course online tersedia, valid, dan berbahasa Indonesia
- [ ] **Career Roadmap:** Hitung estimasi timeline berdasarkan durasi course dengan standar study hours per minggu
- [ ] **Career Roadmap:** Tentukan output fisik terukur untuk setiap tahap (sertifikat, dokumen, presentasi, dll)
- [ ] **Career Roadmap:** Perbarui object career roadmap di file `.tsx` engineer
- [ ] **Career Roadmap:** Verifikasi `CareerRoadmapSection` merender timeline dan tahap dengan benar
- [ ] **Career Roadmap:** Sinkronkan konsistensi visual dan data durasi timeline
