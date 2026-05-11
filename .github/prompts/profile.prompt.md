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
