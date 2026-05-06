# Prompt: KPI Generator

## Objective

Membuat dan mengelola halaman KPI Generator yang berguna untuk mempermudah proses pengelolaan dan pemantauan kinerja.

## Variables

- `Template`: Sebuah file xlsx yang berisi format dan struktur KPI yang akan digunakan sebagai dasar untuk membuat form pengisian dan menghasilkan KPI.
- `Daftar Engineer`: Sebuah daftar yang berisi nama-nama engineer yang akan diisi KPI-nya. Untuk sekarang ada: `Agmar Putra`, `Bagus Nur Solayman`, `I Nyoman Arijaya Putra`, `Nanda Yusuf Nur Pratama`, dan `Rafli Rai Rizky`.

## Features

### 1. Form Builder

Membuat sebuah Form pengisian yang dibangun berdasarkan `Template` KPI dalam bentuk xlsx. User hanya perlu melakukan import file xlsx yang sudah disediakan, kemudian sistem akan secara otomatis mengenerate form berdasarkan `Template` tersebut.

_Masih butuh penjelasan detail disini_

### 2. KPI Generator

Setelah user mengisi form yang sudah di generate, sistem akan secara otomatis mengenerate KPI berdasarkan data yang sudah diinputkan oleh user. User dapat melihat hasil KPI yang sudah di generate dalam bentuk yang sama seperti `Template` dengan data yang sudah diisi.

## Alur

1. User mengupload file xlsx yang berisi `Template` KPI.
2. Sistem memproses file xlsx dan mengenerate form pengisian berdasarkan `Template` yang diupload.
3. User memilih daftar Engineer yang akan diisi KPI-nya, kemudian sistem akan secara otomatis mengisi data yang valid ke dalam form berdasarkan `Template` yang sudah diupload.
4. User mengisi form yang sudah di generate dengan data yang terisi otomatis oleh sistem, namun hanya data yang memiliki nilai yang valid saja, selebihnya dapat diisi secara manual.
5. Sistem mengenerate KPI berdasarkan data yang sudah diinputkan oleh user.
6. User dapat melihat hasil KPI yang sudah di generate dalam bentuk yang sama seperti `Template` dengan data yang sudah diisi.
