import ProfileView, {
  type EngineerProfileData,
} from '@/views/Profile/ProfileView';

export const nandaYusufNurPratamaProfileData: EngineerProfileData = {
  name: 'Nanda Yusuf Nur Pratama',
  dateOfBirth: '03/08/1999',
  levelGrade: 'II/4',
  joinedDate: '24/08/2021',
  projects: ['CRING!'],
  guilds: ['Atomic Design', 'Dynamic Dashboard'],
  good: [
    {
      title: 'Kolaborasi lintas tim berjalan baik',
      description:
        'Aktif berdiskusi untuk memperjelas scope sehingga pengerjaan modul lebih tepat dan minim miskomunikasi.',
    },
    {
      title: 'Ownership pada modul kompleks',
      description:
        'Mampu mengeksekusi banyak modul dengan integrasi API dan perubahan struktur kode yang signifikan.',
    },
    {
      title: 'Peduli kualitas teknis',
      description:
        'Konsisten meningkatkan coverage, menutup CVE, serta merapikan kualitas kode melalui SonarQube.',
    },
  ],
  needsImprove: [
    {
      title: 'Eksposur kontribusi perlu ditingkatkan',
      description:
        'Dampak pekerjaan sudah besar, namun visibilitas progres dan hasil kerja ke tim yang lebih luas masih bisa diperkuat.',
    },
    {
      title: 'Coverage testing belum mencapai standar',
      description:
        'Peningkatan sudah baik, tetapi masih perlu dorongan bertahap hingga mencapai target minimum 80%.',
    },
    {
      title: 'Perlu standardisasi dokumentasi teknis',
      description:
        'Perubahan besar di modul kompleks akan lebih mudah ditransfer jika dokumentasi keputusan teknis dibuat lebih konsisten.',
    },
  ],
  activities: [
    {
      project: 'CRING!',
      description:
        'Ybs bertanggung jawab dalam pengerjaan CRING!. Ybs juga kerap aktif dalam melakukan penyesuaian terhadap perubahan-perubahan bisnis seperti melakukan perombakan struktur kode di Modul Onboard / Ubah Merchant pada bagian Product: QRIS Mandiri, QRIS Nobu, VA BRI, VA untuk Penarikan, Direct Debit, QRIS Statis, Transfer Dana, Validasi Identitas Bank dan RDL agar sesuai dengan bisnis dan juga meningkatkan performa.',
      items: [
        {
          label: 'Summary Fee Agregator',
          detail:
            'Membuat serta melakukan integrasi API dalam membangun modul Summary Fee Agregator yang berguna untuk melihat daftar transaksi VA untuk Pembayaran beserta detailnya.',
        },
        {
          label: 'Riwayat Rekonsiliasi',
          detail:
            'Membuat serta melakukan integrasi API dalam membangun modul Riwayat Rekonsiliasi yang berguna untuk melihat riwayat transaksi yang telah dilakukan rekonsiliasi.',
        },
        {
          label: 'FDS Configuration',
          detail:
            'Membuat serta melakukan integrasi API dalam membangun modul FDS Configuration yang berguna untuk mendeteksi adanya potensi penipuan saat melakukan transaksi. Pengerjaan modul ini cukup kompleks karena memiliki beberapa sub-modul seperti: pembuatan dan penambahan konfigurasi.',
        },
        {
          label: 'Disbursement CRING! to Merchant',
          detail:
            'Membuat serta melakukan integrasi API dalam membangun modul Disbursement CRING! to Merchant yang berguna untuk melihat daftar disbursement dari pihak CRING! ke Merchant. Bukan hanya melihat daftar saja, namun user juga dapat melakukan disbursement secara manual.',
        },
        {
          label: 'Config Service',
          detail:
            'Membuat serta melakukan integrasi API dalam membangun modul Config Service yang berguna untuk menentukan layanan transfer yang digunakan product terdaftar. Juga, untuk menanggulangi gangguan layanan dengan cara melakukan perubahan layanan terhadap product terdaftar apabila product tersebut menggunakan layanan yang sedang dalam gangguan sehingga product dapat digunakan dengan baik.',
        },
        {
          label: 'Riwayat Rekonsiliasi CRING! ke Merchant',
          detail:
            'Membuat serta melakukan integrasi API dalam membangun modul Riwayat Rekonsiliasi CRING! ke Merchant yang berguna untuk melihat riwayat transaksi yang telah dilakukan rekonsiliasi oleh pihak CRING! ke Merchant.',
        },
        {
          label: 'Fixing PenTest',
          detail:
            'Melakukan perbaikan PenTest berupa perubahan penyimpanan token dari cookie ke localStorage karena tercatat sebagai issue oleh pihak PenTest.',
        },
        {
          label: 'Env Dinamis',
          detail:
            'Melakukan penyesuaian kode untuk membuat proses deployment menjadi lebih mudah dan cepat berupa melakukan penyesuaian Environment yang dinamis agar tidak perlu melakukan Build apabila terjadi perubahan pada informasi Environment.',
        },
        {
          label: 'Unit Test Coverage Area',
          detail:
            'Meningkatkan Unit Test Coverage Area dari 40% menjadi 73.89%. Walaupun masih dibawah 80%, angka tersebut layak untuk diapresiasi mengingat banyaknya modul di CRING! sehingga menambah 1% saja cukup sulit.',
        },
        {
          label: 'Penanggulangan CVE',
          detail:
            'Penanggulangan Issue CVE yang tertanam pada salah satu package di CRING! yaitu React dan Next yang mampu menanamkan perintah Crypto Miner yang dapat membuat beban server menjadi lebih besar serta berdampak pada performa aplikasi. Juga, penanggulangan terhadap package axios yang dapat memberikan akses terhadap oknum untuk menjalankan perintah tidak bertanggung jawab di aplikasi web seperti perintah pencurian data.',
        },
        {
          label: 'SonarQube',
          detail:
            'Perbaikan kode demi menjaga kualitas kode agar terhindar dari berbagai macam issue seperti: halaman yang susah diakses karena terdapat kode yang error. Kualitas kode juga dapat mempengaruhi performa aplikasi secara besar.',
        },
      ],
    },
    {
      project: 'CRING! Point',
      description:
        'Ybs ikut terlibat dalam transisi perubahan brand dari Pilo POS menjadi CRING! Point dan bertanggung jawab dalam menerapkan perubahan Logo. Ybs juga aktif dalam penanggulangan masalah versi React dan Next yang sempat menjadi masalah internasional karena versi tersebut mampu menjalankan kode untuk Crypto Miner yang dapat membuat beban server menjadi berat dan berakhir dengan sulitnya mengakses halaman yang terinfeksi tersebut. Dengan langkah cepat yang dilakukan oleh ybs maka masalah tersebut berhasil dihindari. Selain itu, ybs juga aktif dalam meningkatkan Unit Testing Coverage Area.',
    },
    {
      project: 'Dynamic Dashboard',
      description:
        'Ybs berkontribusi dalam pengerjaan Dynamic Dashboard dan bertanggung jawab terhadap pengerjaan sistem AI di N8N (platform AI). Sistem yang dibangun terbilang aman karena data yang digunakan telah diolah agar AI tidak dapat mengakses database secara bebas. AI memiliki sifat Non-deterministic yaitu apabila kita menggunakan perintah yang identik sama, hasil yang diberikan dapat berbeda sehingga dibutuhkan kepiyawaian dalam hal ini agar terhindar dari hasil yang berbeda.',
    },
    {
      project: 'Atomic Design',
      description:
        'Ikut berkontribusi pada pengerjaan Atomic Design untuk membuat component reusable.',
      items: [
        {
          label: 'Tooltip',
          detail:
            'Sebuah wadah yang melayang pada sebuah konten guna memberikan pendetailan terhadap konten tersebut.',
        },
        {
          label: 'Rating',
          detail:
            'Component yang dapat menampilkan Rating dalam bentuk bintang guna memperlihatkan kepuasan user.',
        },
        {
          label: 'Document File',
          detail:
            'Sebuah input yang dapat menyimpan data file secara komprehensif (asynchronous, delete, edit and disabled).',
        },
        {
          label: 'thousand',
          detail:
            'Sebuah fungsi yang mampu merubah format angka menjadi ribuan dengan separasi yang dapat dikustomisasi. Juga, mampu menangani masalah yang sempat ramai dibicarakan yaitu redenominasi.',
        },
      ],
    },
    {
      project: 'Menjadi Mentor di SPEAcademy',
      description:
        'Menjadi Mentor di kegiatan SPEAcademy dengan Tema React Native untuk memperkenalkan React Native secara fundamental.',
    },
    {
      project: 'Course Online – Enterprise Web App Accessibility (feat. React)',
      description:
        'Mengikuti Course Online dengan Tema Aksesibilitas pada Aplikasi Web guna memahami cara kerja Aksesibilitas pada browser serta mengetahui cara integrasi hal tersebut kedalam Aplikasi Web.',
    },
  ],
  bareMinimumRatings: {
    fundamentalFrontend: 4,
    kualitasKode: 4,
    testingReliability: 4,
    kolaborasiKomunikasi: 4,
    deliveryBisnis: 5,
    securityObservability: 5,
    aiProduktivitas: 4,
  },
  bareMinimumReasons: {
    fundamentalFrontend:
      'Pada usia 26 tahun, level II/4, masa kerja hampir 5 tahun, 1 project aktif utama, dan 2 guild aktif, kapabilitas frontend ybs menunjukkan kematangan Senior staff yang kuat.',
    kualitasKode:
      'Kualitas kode tetap kuat melalui perapihan SonarQube, maintainability, dan keputusan teknis yang matang pada modul bernilai bisnis tinggi.',
    testingReliability:
      'Skor testing dinaikkan karena peningkatan coverage dari 40% ke 73.89% pada system besar menunjukkan effort reliability yang kuat, meski target 80% masih perlu dikejar.',
    kolaborasiKomunikasi:
      'Skor kolaborasi dinaikkan karena ybs konsisten menjaga kejelasan scope lintas tim dan mampu membawa koordinasi tetap stabil pada backlog yang kompleks.',
    deliveryBisnis:
      'Dengan level, masa kerja, dan kompleksitas backlog yang ditangani, delivery bisnis ybs berada pada level sangat kuat dan menjadi pembeda utama.',
    securityObservability:
      'Performa security dan observability berada pada level unggul melalui penanganan isu kritikal seperti CVE React/Next, Axios, dan tindak lanjut PenTest.',
    aiProduktivitas:
      'Kontribusi AI tetap kuat karena sudah terlibat langsung pada pengembangan sistem AI berbasis N8N dengan pendekatan yang aman dan relevan.',
  },
  careerRoadmapGoal:
    'Menjaga performa unggul sebagai Senior staff Frontend Engineer pada backlog kompleks dengan fokus reliability, quality governance, dan security hardening.',
  careerRoadmap: [
    {
      period: 'Juni 2026',
      objective:
        'Peningkatan coverage testing dan penguatan reliability engineering pada modul CRING!.',
      courseOnline: [
        {
          title: 'Testing Strategy untuk Modul Frontend Kompleks',
        },
      ],
      successIndicator:
        'Coverage unit test pada modul CRING! naik dari 73.89% menuju minimal 80% dan template dokumentasi keputusan teknis tersedia.',
    },
    {
      period: 'Juli 2026',
      objective:
        'Standarisasi dokumentasi teknis untuk transfer knowledge yang lebih efektif.',
      courseOnline: [
        {
          title: 'Dokumentasi Teknis Frontend yang Konsisten dan Ringkas',
        },
      ],
      successIndicator:
        'Template dokumentasi keputusan teknis diterapkan pada minimal 3 modul kritikal CRING! dan panduan dokumentasi tersedia untuk tim.',
    },
    {
      period: 'Agustus 2026',
      objective:
        'Penguatan visibilitas kontribusi dan komunikasi progres ke tim yang lebih luas.',
      courseOnline: [
        {
          title: 'Observability Frontend dan Analisis Error Produksi',
        },
      ],
      successIndicator:
        'Format laporan sprint lebih terstruktur dan dampak kontribusi engineering lebih tersampaikan kepada tim lintas fungsi.',
    },
    {
      period: 'September 2026',
      objective:
        'Penguatan security hardening dan observability lintas modul CRING!.',
      courseOnline: [
        {
          title: 'Web Security Frontend Berdasarkan OWASP Top 10',
        },
      ],
      successIndicator:
        'Checklist security hardening berbasis OWASP diterapkan lintas modul dan inisiatif observability untuk percepatan deteksi isu selesai.',
    },
    {
      period: 'Oktober 2026',
      objective:
        'Konsolidasi kapabilitas integrasi API dan reliability pada modul prioritas CRING!.',
      courseOnline: [
        {
          title: 'Arsitektur Aplikasi Frontend yang Scalable dan Maintainable',
        },
      ],
      successIndicator:
        'Reliability modul prioritas meningkat dan pola integrasi API terdokumentasi lebih rapi.',
    },
    {
      period: 'November 2026',
      objective:
        'Finalisasi portofolio kontribusi Senior IC dan stabilisasi performa delivery akhir periode.',
      courseOnline: [
        {
          title: 'Portfolio Engineering untuk Dampak Lintas Modul',
        },
      ],
      successIndicator:
        'Portofolio kontribusi lintas modul CRING! lengkap dan performa delivery akhir periode tetap unggul.',
    },
  ],
  softProfile: {
    collaborationType:
      'Problem-solver kolaboratif; aktif di diskusi teknis untuk menjaga ketepatan scope dan kualitas hasil.',
    workStyle:
      'High ownership dengan orientasi delivery; nyaman menangani modul besar dari implementasi hingga stabilisasi.',
    strengths:
      'Koordinasi tim baik, eksekusi modul kompleks, ketahanan terhadap isu teknis kritis, dan kepedulian kualitas.',
    developmentAreas:
      'Peningkatan visibilitas kontribusi, akselerasi coverage ke 80%+, dan penguatan dokumentasi keputusan teknis.',
    uniqueSellingPoint:
      'Mampu menangani kombinasi modul bisnis kompleks dan isu engineering kritikal dalam waktu yang berdekatan.',
  },
};

export default function NandaYusufNurPratamaProfile() {
  return (
    <ProfileView
      profile={nandaYusufNurPratamaProfileData}
      headingId="nanda-yusuf-nur-pratama-title"
    />
  );
}
