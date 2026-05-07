# Prompt: KPI Generator

## Objective

Membuat dan mengelola halaman KPI yang berguna untuk mempermudah proses pengelolaan dan pemantauan kinerja. Konsep utama dari halaman ini adalah Dinamis dan Otomatis. Dinamis berarti halaman ini dapat menyesuaikan dengan kebutuhan pengguna, sedangkan Otomatis berarti proses pengisian dan pengelolaan KPI dapat dilakukan secara otomatis dengan bantuan AI. Halaman ini akan memiliki dua fitur utama, yaitu Form Builder dan KPI Generator.

## Variables

- `Template`: Sebuah file xlsx yang berisi format dan struktur KPI yang akan digunakan sebagai dasar untuk membuat form pengisian dan menghasilkan KPI.
- `Daftar Engineer`: Sebuah daftar yang berisi nama-nama engineer yang akan diisi KPI-nya. Untuk sekarang ada: `Agmar Putra`, `Bagus Nur Solayman`, `I Nyoman Arijaya Putra`, `Nanda Yusuf Nur Pratama`, dan `Rafli Rai Rizky`.

## Features

### 1. Form Builder

Membuat sebuah Form pengisian yang dibangun berdasarkan `Template` KPI dalam bentuk xlsx. User hanya perlu melakukan import file xlsx yang sudah disediakan, kemudian sistem akan secara otomatis mengenerate form berdasarkan `Template` tersebut.

### 2. KPI Generator

Setelah user mengisi form yang sudah di generate, sistem akan secara otomatis mengenerate KPI berdasarkan data yang sudah diinputkan oleh user. User dapat melihat hasil KPI yang sudah di generate dalam bentuk yang sama seperti `Template` dengan data yang sudah diisi.

## Rules

- Template KPI dapat dilihat di `KPI.xlsx` yang tersedia di folder public/documents
- Pelajari semua rumus yang ada di xlsx tersebut agar ketika di generate kembali menjadi xlsx tetap menggunakan rumus yang sama
- Label input diambil dari `Individual Key Results` yang ada di sesi `Main` & `Development`
- Description Label diambil dari `Description` yang ada di sesi `Main` & `Development`
- Pengisian Kolom Input dari `Actual` yang ada di sesi `Main` & `Development`
- `Success` adalah hal-hal baik yang telah dilakukan atau sedang dilakukan tapi berpotensi baik
- `Strength Area` merupakan pengisian hal-hal baik atau Kelebihan
- `Development Area` hal-hal yang perlu ditingkatkan
- `Competencies Suggested` adalah kegiatan yang direkomendasikan untuk meningkatkan kualitas
- `Activity` aktifitas detail dari `Competencies Suggested`
- `Target` adalah hal yang diharapkan ketika `Competencies Suggested` berhasil dilakukan
- Semua rumus harus dipertahankan saat export hasil KPI kembali ke format xlsx

### Contoh Form saat di generate berdasarkan `Template`:

- Field 1:
  - Label: `Ketepatan pengerjaan Sprint (done dev) dalam project yg diberikan`
  - Description: `Ketepatan penyelesaian sprint development secara waktu dan kesesuaian dengan requirement sistem. Dalam persentase`
  - Input: Text Input dengan value yang otomatis terisi berdasarkan `Achievement/Actual` dari `Template` KPI, namun user dapat mengubahnya secara manual jika diperlukan.
- Field 2:
  - Label: `Rasio bugs tidak melebihi rasio 1:0,3 (setiap 10 task boleh menghasilkan tidak lebih dari 3 bugs)`
  - Description: `Rasio bugs yang dihasilkan dalam development. Dalam persentase. Jika rasio bugs kurang dari 0,3 maka nilai maksimum yang dapat diambil adalah 0,2`
  - Input: Text Input dengan value yang otomatis terisi berdasarkan `Achievement/Actual` dari `Template` KPI, namun user dapat mengubahnya secara manual jika diperlukan.
- Field 3:
  - Label: `Success`
  - Input: Text Input dengan value yang otomatis terisi berdasarkan `Data`
- Field 4:
  - Label: `Strength Area`
  - Input: Text Input dengan value yang otomatis terisi berdasarkan `Data`

## Alur

1. User mengupload file xlsx yang berisi `Template` KPI.
2. Sistem memproses file xlsx dan mengenerate form pengisian berdasarkan `Template` yang diupload.
3. User memilih daftar Engineer yang akan diisi KPI-nya, kemudian sistem akan secara otomatis mengisi data yang valid ke dalam form berdasarkan `Template` yang sudah diupload. Pengisian otomatis tersebut dilakukan oleh AI yang data nya dapat diambil dari `Data`.
4. User mengisi form yang sudah di generate dengan data yang terisi otomatis oleh sistem, namun hanya data yang memiliki nilai yang valid saja, selebihnya dapat diisi secara manual.
5. Sistem mengenerate KPI berdasarkan data yang sudah diinputkan oleh user.
6. User dapat melihat hasil KPI yang sudah di generate dalam bentuk yang sama seperti `Template` dengan data yang sudah diisi.
7. Halaman menampilkan pesan Sukses dengan sebuah button yang berfungsi untuk kembali ke halaman utama setelah user melihat hasil KPI yang sudah di generate.
