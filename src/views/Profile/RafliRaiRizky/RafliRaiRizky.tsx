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
      title: 'Strategis dan reflektif',
      description:
        'Mampu melihat langkah implementasi secara bertahap saat membangun modul baru sekaligus cepat menerima evaluasi untuk memperbaiki kualitas kerja.',
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
        'Menyiapkan portal baru Simulator dari tahap inisiasi dan konfigurasi awal, termasuk pengembangan simulasi pembayaran QRIS (saat ini non-aktif), simulasi pembayaran VA, dan implementasi Docker. Kontribusi berjalan di 3 portal utama, yaitu Simulator, Admin, dan Customer. Di Portal Admin, mengerjakan modul pengguna secara menyeluruh (daftar, detail, tambah, ubah user). Di Portal Customer, mengerjakan alur autentikasi (aktivasi akun, lupa kata sandi, pembuatan kata sandi baru). Aktif menyesuaikan kebutuhan bisnis, merapikan struktur kode pada modul Fee Merchant (daftar, detail, ubah), memperkuat monitoring issue melalui Sentry, meningkatkan coverage pengujian (Simulator 0% ke 33.94%, Admin 94.01%, Customer 92% ke 98.69%), dan ikut menangani perbaikan risiko keamanan Axios (CVE).',
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
      'Fondasi frontend sudah terlihat melalui kontribusi lintas 3 portal utama, termasuk simulasi pembayaran, modul user, dan alur autentikasi, namun stabilitas penguasaan teknis masih perlu terus dimatangkan.',
    kualitasKode:
      'Kualitas implementasi cukup baik melalui refactor struktur kode, rebuild berbasis Typescript, serta perapihan modul Fee Merchant, namun konsistensi kedalaman kualitas masih perlu diperkuat.',
    testingReliability:
      'Unit test sudah memberi dampak yang terukur, dengan coverage Simulator naik dari 0% ke 33.94%, Admin mencapai 94.01%, dan Customer naik dari 92% ke 98.69%, namun kedalaman reliability masih perlu diperkuat agar lebih konsisten.',
    kolaborasiKomunikasi:
      'Komunikasi tulisan cukup jelas dan sudah terlihat melalui sharing aksesibilitas, namun sinkronisasi dependensi lintas tim dan disiplin update operasional masih menjadi area penguatan utama.',
    deliveryBisnis:
      'Delivery bisnis sudah cukup kuat melalui penyesuaian kebutuhan di 3 portal utama dan beberapa modul penting, namun konsistensi finish rate dan koordinasi lintas dependensi masih perlu diperkuat.',
    securityObservability:
      'Kontribusi pada security dan observability sudah cukup baik melalui implementasi Sentry dan penanganan risiko keamanan Axios (CVE), sehingga layanan lebih aman dan mudah dimonitor.',
    aiProduktivitas:
      'Aspek AI dibuat lebih konservatif karena pemanfaatannya masih berada pada level dasar dan belum menjadi pembeda yang konsisten pada delivery.',
  },
  careerRoadmapGoal:
    'Menguatkan fondasi menuju Middle staff Frontend Engineer melalui peningkatan kualitas keputusan, kolaborasi lintas tim, pendalaman fundamental aksesibilitas, dan reliability delivery lintas 3 portal.',
  careerRoadmap: [
    {
      period: 'Juni 2026',
      objective:
        'Penguatan verifikasi analisis, critical thinking, dan kedisiplinan komunikasi operasional.',
      courseOnline: [
        {
          title: 'Analisis Akar Masalah untuk Incident Frontend',
        },
      ],
      successIndicator:
        'Checklist validasi akar masalah sebelum eskalasi tersedia dan format update status harian di kanal tim diterapkan secara konsisten.',
    },
    {
      period: 'Juli 2026',
      objective:
        'Pendalaman fundamental aksesibilitas web dan audit komponen lintas portal CRING! Point.',
      courseOnline: [
        {
          title: 'Aksesibilitas Web Fundamental untuk Aplikasi React',
        },
      ],
      successIndicator:
        'Audit aksesibilitas pada 3 portal CRING! Point selesai disertai dokumen perbaikan terstruktur mencakup struktur semantik dan atribut bantu yang relevan.',
    },
    {
      period: 'Agustus 2026',
      objective:
        'Peningkatan reliability delivery melalui testing yang lebih komprehensif.',
      courseOnline: [
        {
          title: 'Reliability Testing Frontend End to End',
        },
      ],
      successIndicator:
        'Coverage Portal Simulator naik ke minimal 60%, Portal Admin dan Customer tetap di atas 90% dan issue SonarQube prioritas tetap rendah per sprint.',
    },
    {
      period: 'September 2026',
      objective:
        'Penguatan koordinasi lintas tim dan manajemen dependency agar finish rate meningkat.',
      courseOnline: [
        {
          title: 'Dependency Mapping untuk Delivery Lintas Portal',
        },
      ],
      successIndicator:
        'Framework koordinasi dependency lintas tim diterapkan di 3 portal dan konfirmasi dependency dilakukan sebelum eksekusi task kritikal.',
    },
    {
      period: 'Oktober 2026',
      objective:
        'Penyelesaian backlog kompleks end-to-end dengan kontrol kualitas implementasi lintas fungsi.',
      courseOnline: [
        {
          title: 'Dokumentasi Arsitektur dan Best Practices Frontend',
        },
      ],
      successIndicator:
        'Backlog kompleks end-to-end selesai dengan kualitas implementasi yang konsisten.',
    },
    {
      period: 'November 2026',
      objective:
        'Finalisasi portofolio delivery lintas 3 portal dengan dokumentasi metrik kualitas yang terukur.',
      courseOnline: [
        {
          title: 'Ringkasan Delivery dan Quality Metrics Frontend',
        },
      ],
      successIndicator:
        'Portofolio delivery lintas 3 portal terdokumentasi lengkap dengan quality metrics akhir periode.',
    },
  ],
  softProfile: {
    collaborationType:
      'Individual contributor dengan eksposur kerja lintas 3 portal; kuat di eksekusi dan adaptif, namun masih perlu peningkatan sinkronisasi dependensi lintas tim.',
    workStyle:
      'Cepat bergerak, result-oriented, dan cukup responsif terhadap evaluasi; efektif untuk delivery cepat jika ada guardrail validasi yang jelas.',
    strengths:
      'Produktivitas tinggi, komunikasi tulisan baik, kemampuan menyusun strategi implementasi bertahap, dan cepat berbenah setelah menerima evaluasi.',
    developmentAreas:
      'Penguatan critical thinking berbasis verifikasi, pendalaman fundamental aksesibilitas, disiplin komunikasi tim, dan kolaborasi dependensi.',
    uniqueSellingPoint:
      'Kombinasi kecepatan delivery lintas 3 portal, kemampuan menyusun narasi teknis yang mudah dipahami, dan kesadaran cepat terhadap area perbaikan.',
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
