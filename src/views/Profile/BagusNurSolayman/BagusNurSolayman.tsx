import ProfileView, {
  type EngineerProfileData,
} from '@/views/Profile/ProfileView';

export const bagusNurSolaymanProfileData: EngineerProfileData = {
  name: 'Bagus Nur Solayman',
  dateOfBirth: '22/07/2001',
  levelGrade: 'II/3',
  joinedDate: '30/05/2022',
  projects: ['QRISAN x Jateng', 'QRISAN x KB Bank', 'SPD', 'DKI QRIS'],
  guilds: ['Atomic Design'],
  good: [
    {
      title: 'Eksekusi tanpa menunda',
      description:
        'Delegasi langsung dikerjakan dan kebutuhan klarifikasi cepat dikonfirmasi sehingga sprint tetap bergerak.',
    },
    {
      title: 'Adaptif lintas konteks',
      description:
        'Mampu berpindah project dan menyesuaikan pendekatan kerja saat menghadapi kebutuhan teknis yang berbeda.',
    },
    {
      title: 'Kolaboratif dan responsif',
      description:
        'Aktif menyampaikan kendala ke tim sehingga isu bisa ditangani sebelum membesar.',
    },
    {
      title: 'Memanfaatkan AI secara praktis',
      description:
        'Menggunakan AI untuk percepatan migrasi Javascript ke Typescript dan otomasi task repetitif.',
    },
    {
      title: 'Berorientasi efisiensi',
      description:
        'Menginisiasi Table View reusable yang mempercepat delivery modul dengan implementasi yang lebih sederhana.',
    },
  ],
  needsImprove: [
    {
      title: 'Empati saat eskalasi masalah perlu ditingkatkan',
      description:
        'Respons awal cenderung berfokus pada kekhawatiran teknis, sehingga perlu lebih menonjolkan pemahaman terhadap konteks tim dan pengguna.',
    },
    {
      title: 'Perlu lebih nyaman dengan perubahan',
      description:
        'Preferensi terhadap kondisi yang sangat stabil perlu diseimbangkan agar tetap agile saat requirement berkembang.',
    },
  ],
  activities: [
    {
      project: 'QRISAN x Jateng',
      description:
        'Ybs bertanggung jawab untuk mengerjakan modul Transaction API Log dan Callback Log menggunakan Table component yang ia kembangkan sendiri untuk mempermudah serta mempercepat proses development. Ybs juga membuat Prompt AI khusus untuk modul tersebut agar pengerjaan bukan hanya mudah dan cepat, namun otomatis. Ybs juga bertanggung jawab dalam pengerjaan backlog Konfigurasi Close Merchant yang memiliki sub-backlog kompleks seperti: membuat halaman List Konfigurasi Close Merchant, halaman Penambahan, Detail serta Edit Konfigurasi Close Merchant. Juga, membantu melakukan perubahan terhadap beberapa backlog agar sesuai dengan kebutuhan Sprint.',
      items: [
        {
          label: 'Unit Testing Coverage Area',
          detail: 'Menjaga Coverage Area pada Unit Testing dikisaran 80%.',
        },
        {
          label: 'Monitoring SonarQube',
          detail:
            'Menjaga serta meningkatkan kualitas kode dari issue yang muncul di SonarQube.',
        },
        {
          label: 'Upgrade MUI version ke v7',
          detail:
            'Meningkatkan versi MUI menjadi versi 7 guna meningkatkan performa aplikasi web serta terhindar dari versi yang rentan.',
        },
        {
          label: 'Penanggulangan CVE',
          detail:
            'Melakukan penanggulangan dini terhadap issue CVE di package Axios dan CASL serta secara cepat memberitahukan kabar tersebut kepada Tim agar lekas dilakukan Hotfix.',
        },
        {
          label: 'Konversi kode ke Typescript',
          detail:
            'Melakukan konversi beberapa modul yang sebelumnya masih menggunakan Javascript menjadi Typescript guna menjaga Type-Safe agar terhindar dari error tipe data sehingga aplikasi web terhindar dari app-crash. Konversi tersebut dilakukan dengan menggunakan AI yang Prompt-nya ia buat sendiri guna mempermudah dan mempercepat pengerjaan secara otomatis.',
        },
      ],
    },
    {
      project: 'QRISAN x KB Bank',
      description:
        'Ybs bertanggung jawab atas pengerjaan di Portal Merchant, termasuk pengerjaan OTP untuk verifikasi 2 langkah. Ybs juga bertanggung jawab atas pengerjaan Modul Konfigurasi Close Merchant beserta sub-modul yang cukup kompleks yaitu: membuat halaman List Konfigurasi Close Merchant dan membuat halaman Tambah, Detail serta Ubah Konfigurasi Merchant. Ybs juga bertanggung jawab atas penyesuaian sesuai kebutuhan bisnis.',
    },
    {
      project: 'DKI QRIS',
      description:
        'Walaupun tidak ada aktifitas Sprint, ybs tetap aktif terutama dalam melakukan perubahan-perubahan kode guna menyesuaikan kebutuhan bisnis.',
    },
    {
      project: 'SPD',
      description:
        'Walaupun tidak ada aktifitas Sprint, ybs tetap aktif untuk meningkatkan Unit Testing Coverage Area hingga 72%. Juga, melakukan perbaikan issue yang muncul di SonarQube guna menjaga kualitas kode tetap baik dan terhindar dari error. Ybs juga berperan aktif dalam melakukan perubahan-perubahan kode dibeberapa modul guna menyesuaikan terhadap kebutuhan bisnis.',
    },
    {
      project: 'Atomic Design',
      description:
        'Ybs ikut berkontribusi dalam membangun Guild Atomic Design terutama terhadap hal-hal yang berhubungan dengan halaman pengisian formulir. Semua pengerjaan sudah dikerjakan sesuai kebutuhan dengan mengutamakan kemudahan implementasi serta kemudahan penggunaan dengan cara menyediakan dokumentasi lengkap di Atomic Design.',
      items: [
        {
          label: 'Button',
          detail:
            'Sebuah UI yang menampilkan Button yang telah disesuaikan penggunaannya demi kebutuhan klien serta implementasi aksesibilitas.',
        },
        {
          label: 'Progress Bar',
          detail:
            'Menampilkan tampilan proses dalam bentuk batang yang berguna untuk melihat seberapa jauh proses telah berjalan.',
        },
        {
          label: 'Progress Circle',
          detail:
            'Menampilkan tampilan proses dalam bentuk lingkaran yang berguna untuk melihat seberapa lama proses telah berjalan.',
        },
        {
          label: 'Progress Tracker',
          detail:
            'Menampilkan tahapan-tahapan yang harus dilewati oleh klien dalam mengisi formulir.',
        },
        {
          label: 'Upload Documentation',
          detail:
            'Sebuah kolom input yang dapat menerima lampiran dan mudah untuk dilakukan pergantian lampiran, kosongkan lampiran atau kunci lampiran.',
        },
      ],
    },
    {
      project: 'Course Online – Fundamental Web Aplikasi',
      description:
        'Mengikuti 3 Course Online guna memahami Fundamental Web Aplikasi serta mendapat sertifikasi: Bootcamp Online Fullstack Web, Certificate Javascript & Jquery, dan Certificate HTML, CSS, and Javascript.',
    },
  ],
  bareMinimumRatings: {
    fundamentalFrontend: 4,
    kualitasKode: 4,
    testingReliability: 3,
    kolaborasiKomunikasi: 3,
    deliveryBisnis: 4,
    securityObservability: 4,
    aiProduktivitas: 4,
  },
  bareMinimumReasons: {
    fundamentalFrontend:
      'Dengan level II/3, masa kerja hampir 4 tahun, 4 project aktif, dan 1 guild aktif, fondasi frontend ybs layak dinilai kuat karena mampu menangani modul kompleks lintas konteks.',
    kualitasKode:
      'Kualitas kode tetap kuat melalui SonarQube, migrasi Typescript, dan upgrade dependency, sejalan dengan ekspektasi engineer berpengalaman hampir 4 tahun.',
    testingReliability:
      'Coverage testing pada project utama sudah cukup baik, namun untuk breadth project yang ditangani aspek ini masih berada pada level solid dan belum unggul.',
    kolaborasiKomunikasi:
      'Koordinasi sprint berjalan responsif, namun untuk engineer dengan scope 4 project aktif masih ada ruang penguatan pada empati dan kestabilan saat eskalasi.',
    deliveryBisnis:
      'Skor delivery dinaikkan karena ybs mampu menjaga kecepatan eksekusi di banyak project aktif dan tetap menyelesaikan backlog bisnis yang kompleks.',
    securityObservability:
      'Menunjukkan kematangan yang baik pada security melalui penanggulangan CVE Axios dan CASL serta upgrade dependency secara proaktif.',
    aiProduktivitas:
      'Pemanfaatan AI sudah cukup kuat dan praktis karena dipakai untuk otomasi migrasi serta percepatan kerja berulang di beberapa konteks project.',
  },
  careerRoadmapGoal:
    'Memperkuat kesiapan menuju Senior staff Frontend Engineer melalui peningkatan adaptabilitas perubahan, kualitas delivery, dan stabilitas komunikasi lintas fungsi.',
  careerRoadmap: [
    {
      period: 'Q2 2026',
      objective:
        'Penguatan adaptabilitas perubahan requirement dan peningkatan empati saat eskalasi.',
      backlogs: [
        'Menerapkan format analisis perubahan sebelum estimasi ulang backlog.',
        'Membuat pola komunikasi eskalasi yang menekankan konteks pengguna.',
        'Melakukan retrospective pribadi untuk 3 insiden eskalasi utama.',
      ],
      successIndicator:
        'Respons perubahan lebih agile dan kualitas komunikasi saat tekanan meningkat.',
    },
    {
      period: 'Q3 2026',
      objective:
        'Penguatan delivery optimization melalui reusable component dan automation.',
      backlogs: [
        'Ekspansi reusable table view ke modul yang memiliki pola serupa.',
        'Standarisasi prompt AI untuk migrasi dan refactor berulang.',
        'Peningkatan coverage testing pada modul prioritas.',
      ],
      successIndicator:
        'Waktu implementasi modul menurun dan kualitas output tetap terjaga.',
    },
    {
      period: 'Q4 2026',
      objective:
        'Konsolidasi kapabilitas sebagai Senior-ready staff Frontend Engineer.',
      backlogs: [
        'Menyelesaikan 1 backlog kompleks end-to-end dengan dependency lintas tim.',
        'Menjaga konsistensi kualitas SonarQube dan security hardening per sprint.',
        'Menyusun dokumentasi implementasi komponen kritikal.',
      ],
      successIndicator:
        'Kinerja delivery dan kualitas teknis stabil pada skenario backlog kompleks.',
    },
  ],
  softProfile: {
    collaborationType:
      'Aktif-komunikatif; cepat meminta konfirmasi dan menjaga alur koordinasi saat eksekusi sprint.',
    workStyle:
      'Action-oriented dan pragmatis; fokus menyelesaikan pekerjaan dengan pendekatan yang bisa langsung dipakai tim.',
    strengths:
      'Cepat eksekusi, adaptif lintas project, kolaboratif, dan mampu meningkatkan produktivitas lewat AI.',
    developmentAreas:
      'Penguatan empati pada saat tekanan tinggi dan peningkatan fleksibilitas terhadap dinamika perubahan.',
    uniqueSellingPoint:
      'Kombinasi kecepatan delivery dan otomasi berbasis AI yang langsung berdampak pada waktu pengerjaan tim.',
  },
};

export default function BagusNurSolaymanProfile() {
  return (
    <ProfileView
      profile={bagusNurSolaymanProfileData}
      headingId="bagus-nur-solayman-title"
    />
  );
}
