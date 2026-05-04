# Agmar Putra

## QRISAN All Variant

- Menangani 8 Repo berbeda dengan tema design yang sama. Jika ada 1 perubahan di salah satu repo maka 7 repo lainnya harus dilakukan perubahan.
- Mampu menjaga Unit Test Coverage Area untuk semua variant pada kisaran 80%
- QRISAN Monorepo
- Research NX

Sebagai inisiator arsitektur QRISAN, ybs bertanggung jawab atas 8 repo dari keseluruhan semua project QRISAN yaitu: QRISAN (Core) Admin & Merchant, QRISAN x Kaltimtara Admin & Merchant, QRISAN x Jateng Admin & Merchant dan QRISAN x KB Bank Admin & Merchant. Meski ybs menangani 8 repo, ybs tetap bertanggung jawab atas kualitas kode dari project-project tersebut, diantaranya:

- `Unit Test Coverage Area`: Menjaga Unit Test Coverage Area di kisaran 80%.
- `SonarQube`: Menjaga kualitas kode dari issue yang muncul di SonarQube.

Pada saat ini ybs dalam tahap pengembangan Monorepo guna mempermudah proses development dimasa depan walaupun harus menangani 8 repo berbeda karena semua repo akan disatukan menjadi 1 kesatuan dengan tujuan yang berbeda-beda. Ybs juga berkolaborasi dengan Tim DevOps untuk menangani masalah CI/CD ketika menggunakan Monorepo. Ybs juga membantu dalam penyelesaian masalah Multiple Versi dalam satu repo yang menjadi kekhawatiran dari pihak Tim DevOps.

## QRISAN (Core)

Walaupun sudah tidak ada modul baru untuk dikerjakan tetapi ybs tetap aktif melakukan support terhadap perubahan yang terjadi pada bisnis ataupun request / response API. Namun selain itu, ybs juga aktif dalam beberapa tindakan, diantaranya:

- `Coverage Unit Test Area`: Menjaga Coverage Unit Test Area setelah dilakukannya perubahan-perubahan agar selalu ada diatas 80%.
- `Upgrade Versi MUI`: Melakukan upgrade versi MUI menjadi 7 agar terhindar dari vulnerability dan juga meningkatkan performa aplikasi web.
- `SonarQube`: Selalu menjaga kualitas kode dengan cara memperbaiki issue yang muncul di SonarQube.
- `Menghindari Issue CVE`: Menjaga keamanan aplikasi web dengan cara melakukan upgrade versi Axios menjadi v1.15 karena versi dibawah itu terkena issue yang cukup berbahaya yaitu: terdapat attack-surface dari Axios yang mengijinkan attacker untuk mengeksekusi kode lain yang berbahaya didalam aplikasi web.
- `Konversi ke Typescript`: Juga melakukan konversi terhadap file-file Javascript menjadi Typescript guna menerapkan Type-Safe (pengamanan tipe) agar terhindar dari kesalahan tipe yang dapat menyebabkan aplikasi error.

## QRISAN x Kaltimtara

Tidak ada modul baru yang dikerjakan, tetapi ybs tetap aktif melakukan support terutama untuk melakukan implementasi Encrypt & Decrypt menggunakan AES. Namun, tak hanya itu, ybs juga turut memiliki aktifitas lain, diantaranya:

- `Fingerprint JS`: Implementasi Fingerprint JS yang berguna untuk menangani issue double login di 2 perangkat berbeda. Dan, menghemat biaya operasional karena tidak perlu menggunakan versi Pro dari Fingerprint JS.
- `Obfuscator`: Implementasi Obfuscator yang berguna untuk menangani issue tereksposnya variabel rahasia yang dapat menjadi attack-surface.
- `Penerapan AES`: Menerapkan Encrypt & Decrypt terhadap request dan response API.
- `Implementasi Tooltip`: Melakukan impelemtasi Tooltip guna memberikan penjelasan terhadap konten yang perlu untuk dijelaskan seperti Card, Icon & Status dalam bentuk wadah melayang yang akan muncul ketika dilakukan hover pada konten.

## QRISAN x KB Bank

QRISAN x KB Bank merupakan variant yang baru muncul ditahun 2025. Ybs sebagai Frontend bertugas untuk membangun beberapa backlog diantaranya: membuat UI untuk Syarat & Ketentuan sebelum melakukan Onboarding, Membuat halaman Informasi Ketentuan Settlemen dan Membuat halaman Settlemen dan sub-backlognya berupa Penambahan Settlemen, Detail Settlemen dan History Settlemen.

Adapun aktifitas lain yang dilakukan oleh ybs adalah sebagai berikut:

- `Coverage Unit Testing Area`: Melakukan penyesuaian terhadap beberapa unit test guna menjaga nilai coverage tetap dikisaran 80%.
- `Upgrade MUI ke v7`: Upgrade versi MUI ke v7 guna menghindari vulnerability dimasa depan serta meningkatkan performa aplikasi web.
- `Konversi ke Typescript`: Melakukan konversi terhadap beberapa backlog dari Javascript menjadi Typescript guna menjaga Type-Safe (keamanan tipe data) untuk menghindari error pada saat aplikasi dibuka.
- `Fixing SonarQube`: Meningkatkan kualitas kode dari issue yang muncul di SonarQube agar kualitas kode tetap baik.

## [next] QRISAN x Jateng

## DRONT Vault

Sebuah App Web yang berguna untuk centralize projects monitoring. App Web ini merupakan ide original yang dikembangkan oleh Agmar Putra sendiri sebagai inovasi. Ybs merasa cukup memakan waktu apabila Frontend Engineer mendapat mandat untuk melakukan pengisian informasi terkini dari masing-masing project seperti: Unit Test Coverage, Status SonarQube, Status Sentry dll. Menurut ybs, hal tersebut mudah untuk dilakukan tetapi cukup memakang waktu karena tidak semua Frontend Engineer memiliki waktu luang untuk melakukan pengisian informasi tersebut dan akhirnya untuk mendapatkan semua informasi akan memakan waktu setidaknya satu hari. Dengan adanya DRONT Vault, diharapkan proses tersebut dapat dilakukan hanya dalam hitungan menit.

Adapun monitoring yang dapat dilakukan adalah sebagai berikut:

- `Repository Information`: Detail informasi repository
- `SonarQube`: Health Status Project
- `Sentry`: Tracking dan solving issue
- `Package`: Pengecekan installed package dengan versi yang tertera
- `Tech Debt`: Tech Debt tracking
- `Harvest`: Aksi untuk mendapatkan data terkini

## Dynamic Dashboard

Ybs berkontribusi dalam pengerjaan Dynamic Dashboard sebagai Frontend Engineer untuk melakukan integrasi N8N dengan Interface. Dynamic Dashboard sendiri juga terinspirasi oleh Dynamic Dashboard yang telah ia buat dengan konsep serupa tetapi belum terintegrasi oleh AI.

Dynamic Dashboard adalah sebuah Package Javascript yang berguna untuk membuat Dashboard secara dinamis dengan didukung oleh penggunaan AI sehingga konten yang ditampilkan sesuai dengan apa yang diinginkan oleh User. Dengan Dashboard yang Dinamis menjadikan berkurangnya backlog di Sprint yang berupa menampilkan konten Dashboard secara statik. Dengan terpangkas nya backlog maka pengerjaan di Sprint pula menjadi lebih cepat.

## SPEInside

Ikut berkontribusi dalam perngerjaan SPEInside yang saat ini sedang diminati oleh HC. Kontribusi ybs didalam SPEInside juga terbilang cukup penting karena ybs mengerjakan Backlog untuk Digitalisasi proses Recruitment, Hiring dan Onboarding. Selain itu, ybs juga ikut serta dalam mengembangkan alur pengerjaan pen-digitalisasi-an tersebut.

## Atomic Design

Berkontribusi di Atomic Design dalam pembuatan component dalam bentuk Package yang dapat digunakan kembali oleh Frontend Engineer lain agar mempermudah dan mempercepat proses development.

Adapun component yang telah ia buat adalah sebagai berikut:

- `Alert`: Feedback pesan yang tampil setelah melakukan aktitifas
- `Theme Manager`: Mengatur tema dengan mudah
- `Time Machine`: Kolom pengisian tanggal yang dapat diimplementasi dengan mudah

## Course Online Build AI-Powered Apps with OpenAI and Node.js

Mempelajari model bahasa dari OpenAI ke dalam aplikasi Node.js serta mendapatkan sertifikasi sebagai bukti telah berhasil mengikuti course online tersebut. Materi yang dipelajari selaras dengan tujuan SPE yaitu menerapkan Aplikasi berbasis AI guna mempercepat proses development serta meningkatkan kualitas aplikasi. Fundamental yang dipelajari dijadikan materi dalam Sharing Session "FE Day" guna meningkatkan pengetahuan rekan sesama Frontend Engingeer tentang cara kerja AI.

**Link**: [Build AI-Powered Apps with OpenAI and Node.js](https://solusipembayaranelektronik-my.sharepoint.com/:f:/r/personal/robert_tanjung_spesolution_com/Documents/Reports/SPV/Raker/2025/evidences/Certificate?csf=1&web=1&e=CIz1nv)

## Ide Self Code Review

Sebuah tools yang berguna untuk melakukan Review Code secara mandiri sebelum melakukan Push dan Merge Request. Menghindari Churn Code serta dapat mencegah Code Reviewer dalam kesalahan dalam melakukan reviewing code.

Ide ini belum dapat dilanjutkan karena:

- Menyebabkan penggunaan Request Prompt AI menjadi lebih boros
- Harus melakukan setup tambahan untuk menggunakan tools ini

## Ide Tasks Checker

Mengajukan pembuatan progam untuk menyaring task yang layak dimasukan ke SPEctrum. Task akan dilakukan pemeriksaan oleh SPV lalu dengan persetujuan SPV maka task dinyatakan layak untuk dimasukan ke SPEctrum. Ide tersebut lahir berkat analisa ybs dalam melihat banyaknya task yang menurutnya tidak layak untuk dijadikan task karena terlalu kecil secara bobot (remeh) tetapi hal tersebut dapat meningkatkan KPI.

## Research OpenSpec

Sebuah Tools AI yang berguna untuk menentukan Spesifikasi sebuah Aplikasi untuk meningkatkan akurasi penggunakan AI Agent sehingga Request akan menjadi lebih hemat. Spesifikasi digenerate dengan pengawasan user agar spesifikasi tetap selaras dan sesuai dengan apa yang dideskripsikan oleh OpenSpec.

## Research Rust Kill Token

Tools AI yang berguna untuk mempersingkat sebuah prompt tanpa mengurangi akurasi dari maksud prompt tersebut agar penggunaan Token (mata uang LLM) menjadi jauh lebih hemat. Namun, Research tersebut tidak dilanjutkan karena penggunaan GitHub Copilot menggunakan request prompt sebagai mata uang dengan maksimal 300 request prompt setiap bulan. Sehingga penggunaan Rust Kill Token menjadi tidak relevan.

## Good

- `Tidak menunda-nunda`: Memulai mandat sedini mungkin sehingga apa yang telah didelegasikan dapat dicapai sesuai deadline dan optimal.
- `Memiliki Fokus yang baik`: Tetap dapat menjaga fokus walaupun terdistraksi oleh hal lain seperti: membalasa pesan, mengisi form hingga diskusi daring. Dengan fokus yang baik ini, semua tugas dan KPI mampu ia capai dengan baik.
- `Research Skill`: Riset yang dilakukan rinci beserta penyediaan POC sehingga Tim dapat mempertimbangan hasil riset tersebut dengan baik.
- `Menerima Masukan`: Ybs menerima kritik dan masukan secara terbuka dengan memberitahukan kepada Tim apabila ia melakukan kesalahan. Namun, ybs tidak menerima secara buta, ia juga membutuhkan alasan yang empiris sehingga ybs mengetahui maksud serta tujuan dari hal tersebut.

## Needs Improve

- `Pemikiran sangat teknis`: Cara berpikir ybs sangat teknis yang dapat dilihat dari setiap argumen yang ia tulis. Argumen yang ia tulis selalu memiliki format _why_, _what_ dan _how_. Dikhawatirkan ybs tidak dapat membuat argumen secara lisan karena selalu terpaku dengan pola teknis sehingga perlu dilatih untuk membuat argumen yang memiliki narasi sehingga dapat dipahami dengan mudah oleh semua pihak.
