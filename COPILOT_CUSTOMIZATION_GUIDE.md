# Panduan Customization di GitHub Copilot

Dokumen ini menjawab 4 topik customization yang paling sering dipakai saat bekerja dengan GitHub Copilot, dengan fokus pada dua hal:

- cara mendefinisikan
- cara mengeksekusi

## 1) Apa itu copilot-instructions.md dan cara penggunaannya?

### Definisi

`copilot-instructions.md` adalah instruksi level repository yang dibaca Copilot sebagai konteks tambahan saat memberi saran atau menjawab di chat.

### Lokasi

- `.github/copilot-instructions.md`

### Cara mendefinisikan

1. Buat file di `.github/copilot-instructions.md`.
2. Tulis aturan yang spesifik dan bisa diverifikasi.
3. Kelompokkan aturan per topik: stack, style, testing, security.
4. Simpan dan commit agar seluruh tim memakai aturan yang sama.

### Cara mengeksekusi

1. Buka Copilot Chat di repository ini.
2. Beri task seperti biasa, misalnya "buat unit test untuk komponen ini".
3. Copilot otomatis mempertimbangkan aturan di `.github/copilot-instructions.md`.
4. Verifikasi dengan prompt cepat: "Sebutkan aturan repo yang kamu ikuti untuk task ini".

### Contoh isi

```md
# Copilot Instructions

## Stack

- Gunakan TypeScript strict mode.

## Coding Style

- Hindari any kecuali ada justifikasi.
- Gunakan async/await.

## Testing

- Util function wajib unit test.

## API Rules

- Validasi input di layer route.
```

---

## 2) Apa itu Prompt Files dan cara penggunaannya?

### Definisi

Prompt Files adalah template prompt yang dapat dipakai ulang agar cara meminta bantuan ke Copilot konsisten.

### Lokasi

- User level: folder prompts milik pengguna VS Code
- Repo level (disarankan untuk tim): `.github/prompts/`

### Cara mendefinisikan

1. Buat file prompt per use-case, bukan satu prompt untuk semua hal.
2. Gunakan struktur standar: objective, input, constraints, output format.
3. Simpan dengan nama jelas, misalnya `review-frontend.prompt.md`.

### Cara mengeksekusi

1. Buka file prompt yang ingin dipakai.
2. Gunakan isi prompt tersebut sebagai input ke Copilot Chat.
3. Tambahkan konteks task saat ini (misalnya scope file yang berubah).
4. Jalankan prompt dan cek hasil sesuai output format yang diminta.

### Contoh file di repo ini

- `.github/prompts/review-frontend.prompt.md`

---

## 3) Apa itu Custom Agents dan cara penggunaannya?

### Definisi

Custom Agents adalah agen dengan peran khusus untuk jenis tugas tertentu. Mereka membantu menjaga gaya analisis dan output tetap konsisten pada workflow yang berulang.

### Cara mendefinisikan

1. Tentukan satu objective utama agent.
2. Definisikan scope file/module yang boleh dianalisis.
3. Tetapkan rules, workflow, dan output contract.
4. Simpan definisi agent dalam file dokumentasi tim.

### Cara mengeksekusi

1. Mulai chat untuk task terkait.
2. Panggil agent sesuai namanya.
3. Beri objective yang jelas (contoh: review PR frontend).
4. Minta output mengikuti output contract agent.

Contoh kalimat eksekusi:

"Jalankan FrontendQualityAgent untuk review perubahan branch ini. Fokus pada accessibility, responsive behavior, dan semantic HTML."

### Contoh file di repo ini

- `.github/agents/frontend-quality-agent.md`

---

## 4) Apa itu Agent Skills dan cara penggunaannya?

### Definisi

Agent Skills adalah prosedur modular yang dipakai agent saat menjalankan tugas. Jika agent adalah "siapa", maka skill adalah "cara kerja" yang dipakai berulang.

### Cara mendefinisikan

1. Pilih aktivitas berulang yang perlu distandarkan.
2. Definisikan input, langkah prosedur, output, dan definition of done.
3. Pastikan skill ringkas dan bisa dipakai ulang lintas task.

### Cara mengeksekusi

1. Saat menjalankan task, sebutkan skill yang harus dipakai.
2. Minta agent mengikuti langkah di skill secara berurutan.
3. Validasi bahwa output skill lengkap sesuai definition of done.

Contoh kalimat eksekusi:

"Gunakan AccessibilityAuditSkill untuk mengevaluasi semua file UI yang berubah dan laporkan temuan per severity."

### Contoh file di repo ini

- `.github/skills/accessibility-audit-skill.md`

---

## Peta Implementasi Cepat (Siap Pakai)

1. Atur aturan global di `.github/copilot-instructions.md`.
2. Jalankan template task dari prompt file `.github/prompts/review-frontend.prompt.md`.
3. Delegasikan analisis ke custom agent `.github/agents/frontend-quality-agent.md`.
4. Paksa prosedur audit yang konsisten lewat skill `.github/skills/accessibility-audit-skill.md`.

Dengan pola ini, kamu mendapatkan alur yang jelas dari policy (instructions), eksekusi task (prompt), spesialisasi analisis (agent), sampai prosedur detail (skill).
