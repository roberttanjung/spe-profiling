import ProfileView, {
  type EngineerProfileData,
} from '@/views/Profile/ProfileView';

export const rafliRaiRizkyProfileData: EngineerProfileData = {
  name: 'Rafli Rai Rizky',
  dateOfBirth: '09/05/2002',
  levelGrade: 'II/3',
  joinedDate: '30/09/2025',
  projects: ['CRING! Point', 'CRING!'],
  guilds: ['Atomic Design'],
  good: [
    {
      title: 'Produktivitas eksekusi tinggi',
      description:
        'Mampu menyelesaikan banyak task sprint, termasuk inisiasi portal baru dan penyesuaian modul berjalan.',
    },
    {
      title: 'Komunikasi tulisan kuat',
      description:
        'Mampu menyusun kalimat dengan jelas saat membuat penjelasan teknis.',
    },
    {
      title: 'Memiliki pola pikir strategis',
      description:
        'Dapat melihat langkah implementasi secara bertahap saat membangun modul baru.',
    },
  ],
  needsImprove: [
    {
      title: 'Kolaborasi dependensi perlu diperkuat',
      description:
        'Koordinasi pada task lintas tim perlu lebih dini agar bottleneck dependensi tidak menurunkan finish rate.',
    },
    {
      title: 'Perlu validasi sebelum menyimpulkan',
      description:
        'Keputusan awal kadang terlalu cepat; perlu kebiasaan konfirmasi data agar akar masalah lebih akurat.',
    },
    {
      title: 'Kedisiplinan komunikasi operasional',
      description:
        'Respons pada kanal grup dan konsistensi format update perlu ditingkatkan agar sinkronisasi tim lebih lancar.',
    },
  ],
  activities: [
    {
      project: 'CRING! Point',
      description:
        'Bertanggung jawab dalam pengerjaan berbagai macam modul terutama dalam inisiasi pembuatan Portal baru Simulator. Adapun aktifitas yang dikerjakan meliputi: Setup Portal Simulator, Page Active Account, Page Forgot Password, Page Create New Password, Implement Docker, Setup SonarQube, Enhancement, Adjustment, Implement Sentry, Unit Testing, dan Fixing CVE Axios.',
    },
    {
      project: 'CRING!',
      description:
        'Bertanggung jawab dalam pengerjaan Modul Suspicious Transaksi beserta sub-modulnya History yang digunakan untuk melihat daftar transaksi yang mencurigakan dan berpotensi penipuan. Ybs juga aktif dalam penyesuaian perubahan-perubahan bisnis.',
      items: [
        {
          label: 'List Role',
          detail:
            'Membangun ulang halaman List Role yang berbasis Typescript untuk meningkatkan performa modul tersebut yang digunakan untuk melihat daftar Role.',
        },
        {
          label: 'Modul User',
          detail:
            'Membangun ulang Modul User seperti: penambahan, perubahan dan hapus user yang berbasis Typescript untuk meningkatkan performa modul tersebut yang digunakan untuk monitoring User.',
        },
        {
          label: 'Unit Test',
          detail:
            'Menerapkan Unit Test di berbagai modul terutama di Modul Role dan User serta memperbaiki beberapa test-file.',
        },
      ],
    },
    {
      project: 'Atomic Design',
      description:
        'Ikut berkontribusi dalam pengerjaan Atomic Design khususnya untuk membuat component yang menampilkan data dengan tampilan yang mudah untuk dipahami.',
      items: [
        {
          label: 'Avatar',
          detail:
            'Sebuah wadah untuk menampilkan foto, inisial atau ikon dari user ataupun entitas.',
        },
        {
          label: 'Gantt Chart',
          detail: 'Sebuah chart yang menampilkan Timeline dari suatu kegiatan.',
        },
        {
          label: 'Timeline Tree',
          detail:
            'Tampilan yang menampilkan tahapan-tahapan proses berdasarkan status.',
        },
        {
          label: 'Countdown',
          detail:
            'Tampilan waktu hitung mundur pada kegiatan, info ataupun acara yang dapat diakses ketika waktu telah mencapai titik 0.',
        },
        {
          label: 'Skeleton',
          detail:
            'Tampilan tunggu untuk menandakan sebuah data sedang diproses.',
        },
      ],
    },
    {
      project: 'Research Accessibility',
      description:
        'Melakukan Research tentang Aksesibilitas di browser serta melakukan sharing knowledge agar rekan-rekan sesama FE memahami pentingnya aksesibilitas dan juga bagaimana cara memperbaiki kekurangan aksesibilitas yang di project. Aksesibilitas sendiri mampu bertujuan untuk memberikan pengenalan terhadap seluruh elemen-elemen yang ada di aplikasi web agar dapat berinteraksi dengan mesin di browser sehingga orang-orang disabilitas mampu menggunakan aplikasi web sebagaimana orang normal pada umumnya.',
    },
  ],
  bareMinimumRatings: {
    fundamentalFrontend: 3,
    kualitasKode: 3,
    testingReliability: 2,
    kolaborasiKomunikasi: 2,
    deliveryBisnis: 3,
    securityObservability: 3,
    aiProduktivitas: 2,
  },
  bareMinimumReasons: {
    fundamentalFrontend:
      'Pada usia 23 tahun, level II/3, dan masa kerja yang masih sekitar 7 bulan dengan 2 project aktif serta 1 guild aktif, fondasi frontend ybs sudah baik namun masih dalam fase penguatan stabilitas.',
    kualitasKode:
      'Kualitas implementasi sudah cukup baik melalui setup SonarQube, refactor ke Typescript, dan perbaikan modul, tetapi konsistensi kedalaman kualitas masih perlu diperkuat.',
    testingReliability:
      'Skor testing dibuat lebih konservatif karena unit test sudah mulai diterapkan, namun coverage dan kedalaman reliability masih belum kuat untuk masa kerja saat ini.',
    kolaborasiKomunikasi:
      'Komunikasi tulisan cukup jelas, namun koordinasi dependensi lintas tim dan disiplin update operasional masih menjadi area penguatan utama.',
    deliveryBisnis:
      'Delivery bisnis tetap baik untuk masa kerja yang singkat, namun skor disesuaikan agar lebih proporsional dengan kebutuhan penguatan konsistensi finish dan koordinasi lintas dependensi.',
    securityObservability:
      'Kontribusi pada security dan observability sudah cukup baik melalui penanganan CVE Axios, implementasi Sentry, dan observability dasar.',
    aiProduktivitas:
      'Aspek AI dibuat lebih konservatif karena pemanfaatannya masih berada pada level dasar dan belum menjadi pembeda yang konsisten pada delivery.',
  },
  careerRoadmapGoal:
    'Meningkatkan kematangan eksekusi menuju Middle staff Frontend Engineer melalui penguatan kolaborasi lintas tim, kualitas delivery, dan ketepatan keputusan teknis.',
  careerRoadmap: [
    {
      period: 'Q2 2026',
      objective:
        'Penguatan kolaborasi dependensi dan kedisiplinan komunikasi operasional.',
      backlogs: [
        'Menerapkan format update status harian yang konsisten di kanal tim.',
        'Melakukan konfirmasi dependency lintas tim sebelum eksekusi task kritikal.',
        'Membuat checklist validasi akar masalah sebelum eskalasi issue.',
      ],
      successIndicator:
        'Sinkronisasi kerja lintas tim lebih lancar dan bottleneck dependency berkurang.',
    },
    {
      period: 'Q3 2026',
      objective:
        'Peningkatan reliability delivery melalui test dan quality hardening.',
      backlogs: [
        'Menambah cakupan unit test pada modul baru dan modul hasil rebuild.',
        'Menjaga temuan SonarQube prioritas tetap rendah per sprint.',
        'Memonitor issue produksi melalui Sentry secara lebih disiplin.',
      ],
      successIndicator:
        'Kualitas rilis meningkat dengan regresi yang lebih rendah pada modul aktif.',
    },
    {
      period: 'Q4 2026',
      objective:
        'Penguatan fondasi Middle staff IC dengan fokus delivery dan kualitas keputusan teknis.',
      backlogs: [
        'Menyelesaikan 1 backlog kompleks end-to-end dengan dependency lintas fungsi.',
        'Meningkatkan kualitas analisis solusi sebelum implementasi.',
        'Menyusun dokumentasi singkat arsitektur modul yang dikerjakan.',
      ],
      successIndicator:
        'Kematangan eksekusi meningkat pada aspek kecepatan delivery dan ketepatan keputusan teknis.',
    },
  ],
  softProfile: {
    collaborationType:
      'Individual contributor dengan potensi kolaboratif; kuat di eksekusi, perlu peningkatan sinkronisasi dependensi lintas tim.',
    workStyle:
      'Cepat bergerak dan result-oriented; efektif untuk delivery cepat jika ada guardrail validasi yang jelas.',
    strengths:
      'Produktivitas tinggi, komunikasi tulisan baik, dan kemampuan menyusun strategi implementasi.',
    developmentAreas:
      'Penguatan critical thinking berbasis verifikasi, disiplin komunikasi tim, dan kolaborasi dependensi.',
    uniqueSellingPoint:
      'Kombinasi kecepatan delivery dan kemampuan menyusun narasi teknis yang mudah dipahami.',
  },
};

export default function RafliRaiRizkyProfile() {
  return (
    <ProfileView
      profile={rafliRaiRizkyProfileData}
      headingId="rafli-rai-rizky-title"
    />
  );
}
