import ProfileView, {
  type EngineerProfileData,
} from '@/views/Profile/ProfileView';

export const iNyomanArijayaPutraProfileData: EngineerProfileData = {
  name: 'I Nyoman Arijaya Putra',
  dateOfBirth: '04/01/2001',
  levelGrade: 'II/2',
  joinedDate: '10/10/2023',
  projects: ['BNI QRIS'],
  guilds: ['Atomic Design'],
  good: [
    {
      title: 'Kolaborasi yang baik',
      description:
        'Aktif berkolaborasi terutama saat pengajuan pembangunan BNI QRIS V2 melalui artikel justifikasi migrasi dari Vue 2 ke Next JS beserta timeline hingga mendapat persetujuan tim.',
    },
    {
      title: 'Peduli pada pengalaman pengguna',
      description:
        'Selalu mempertimbangkan dampak ke user experience sebelum memulai implementasi modul.',
    },
    {
      title: 'Cepat memahami konteks teknis',
      description:
        'Informasi baru dapat ditangkap dengan baik sehingga proses eksekusi modul berjalan lancar.',
    },
    {
      title: 'Kuat di area riset',
      description:
        'Aktif melakukan eksplorasi teknis dan menyiapkan arah perbaikan jangka menengah, termasuk usulan modernisasi platform.',
    },
  ],
  needsImprove: [
    {
      title: 'Penyampaian informasi perlu lebih runtut',
      description:
        'Isi pesan sudah benar, namun struktur komunikasinya perlu lebih ringkas agar cepat dipahami tim lintas fungsi.',
    },
    {
      title: 'Fokus eksekusi perlu dijaga',
      description:
        'Ketertarikan pada banyak ide baru perlu diimbangi dengan disiplin menyelesaikan prioritas utama terlebih dahulu.',
    },
    {
      title: 'Perfeksionisme perlu dibatasi',
      description:
        'Evaluasi terlalu banyak kemungkinan membuat keputusan teknis melambat; perlu batas waktu keputusan yang jelas.',
    },
  ],
  activities: [
    {
      project: 'BNI QRIS',
      description:
        'Ybs dialokasikan di Project BNI QRIS dan bertanggung jawab atas beberapa modul baru yang dibangun dengan penggunaan komponen reusable seperti: Table View, Detail Data, Tab Table View dll untuk mempermudah dan mempercepat proses development. Selain menyelesaikan tanggung jawab tersebut, ybs juga reaktif dalam perubahan-perubahan bisnis.',
      items: [
        {
          label: 'Detail Merchant',
          detail: 'Untuk melihat Merchant secara detail.',
        },
        {
          label: 'Audit Trail Merchant',
          detail: 'Untuk melihat aktifitas Merchant.',
        },
        {
          label: 'NFC Transaction Report',
          detail: 'Daftar transaksi NFC beserta detail nya.',
        },
        {
          label: 'Service Log Callback',
          detail: 'Monitoring aktifitas Callback Log.',
        },
        {
          label: 'Service Log API Mobile',
          detail:
            'Monitoring aktifitas Service API yang digunakan oleh Mobile.',
        },
        {
          label: 'Master BC/KO',
          detail:
            'Membuat halaman List Master BC/KO beserta halaman untuk menambahkan dan mengubah data tersebut.',
        },
        {
          label: 'Master CMER',
          detail:
            'Membuat halaman List Master CMER beserta halaman untuk menambahkan dan mengubah data tersebut.',
        },
        {
          label: 'Fixing Sentry',
          detail:
            'Memperbaiki error dari aplikasi BNI QRIS melalui monitoring error di Sentry.',
        },
        {
          label: 'Fixing SonarQube',
          detail: 'Menjaga kualitas kode dari issue yang muncul di SonarQube.',
        },
        {
          label: 'Unit Testing Coverage Area',
          detail:
            'Menjaga Unit Testing Coverage Area sebesar 75%. Walaupun angka tersebut masih dibawah dari minimal target yaitu 80%.',
        },
        {
          label: 'Security',
          detail:
            'Melakukan integrasi Security Headers dan Fingerprint JS untuk menanggulangi issue di masa depan.',
        },
      ],
    },
    {
      project: 'BNI QRIS V2',
      description:
        'Ybs menyadari bahwa BNI QRIS sudah menggunakan versi Vue 2 yang telah usang. Bahkan pihak Vue sendiri telah menyatakan bahwa Vue 2 tidak akan lagi ada perbaruan sehingga rentan apabila terjadi ancaman-ancaman baru yang ada di browser. Ybs telah merundingkan hal tersebut kepada Tim berupa membuat Timeline apabila dilakukan perubahan versi dan Tim telah menyetujui untuk dilakukan perubahan.',
    },
    {
      project: 'Atomic Design',
      description:
        'Ybs berkontribusi dalam pengerjaan Atomic Design dan bertanggung jawab atas Component MVP yaitu Chart untuk melihat data dengan grafik agar mudah dilakukan komparasi. Selain berfokus untuk mengerjakan Component MVP, ybs juga membuat beberapa component lain agar memperkaya component di Atomic Design.',
      items: [
        {
          label: 'Radar Chart',
          detail: 'Grafik yang menampilkan data kumulatif dari waktu ke waktu.',
        },
        {
          label: 'Bar Chart',
          detail:
            'Grafik yang menampilkan komparasi data berdasarkan kategori dengan interface berbentuk batang.',
        },
        {
          label: 'Donut Chart',
          detail:
            'Grafik yang menampilkan relasi data dalam bentuk bulat seperti halnya Donat.',
        },
        {
          label: 'Heatmap Chart',
          detail:
            'Grafik yang menampilkan data dalam bentuk Grid dengan intensitas warna sebagai indikator.',
        },
        {
          label: 'Line Chart',
          detail:
            'Grafik yang menampilkan data interval tren dalam bentuk garis.',
        },
        {
          label: 'Sankey Chart',
          detail:
            'Grafik yang menampilkan alur data dari berbagai macam sumber bak percabangan pada sungai.',
        },
        {
          label: 'Sunburst Chart',
          detail:
            'Grafik yang menampilkan hirarki data dalam bentuk lingkaran.',
        },
        {
          label: 'Chip',
          detail:
            'Sebuah component yang berguna untuk menampilkan text sebagai penanda sebuah tanda atau aksi.',
        },
        {
          label: 'QRCode',
          detail:
            'Component yang menampilkan QRCode dengan integrasi yang mudah.',
        },
        {
          label: 'Field Text',
          detail:
            'Component input yang digunakan untuk melakukan pengisian form seperti text-pendek dengan memperhatikan Aksesibilitas.',
        },
        {
          label: 'Transfer',
          detail:
            'Sebuah component yang menampilkan 2 wadah daftar data berbeda dan data-data tersebut dapat dipindahkan antar 2 wadah tersebut.',
        },
        {
          label: 'Watermark',
          detail:
            'Sebuah component yang dapat memberikan text pada background yang biasa digunakan di file-file sensitif seperti tulisan Confidential.',
        },
        {
          label: 'useMaskingData',
          detail:
            'Sebuah fungsi yang dapat digunakan untuk menyamarkan tampilan data sensitif.',
        },
      ],
    },
    {
      project: 'Research PenTest Automation',
      description:
        'Memberikan POC terkait PenTest yang dapat dilakukan secara otomatis untuk mengetahui attack-surface dari sisi client-side dengan bantuan AI. PenTest Automation ini bukan berarti 100% dilakukan secara otomatis tetapi hanya menangani masalah fundamental terhadap serangan siber. Namun, ide ini belum berlanjut lagi.',
    },
    {
      project: 'Research VSCode JSON for Preferance AI Configuration',
      description:
        'Mengatur konfigurasi AI melalui settings.json di VS Code memberikan kontrol teknis yang lebih mendalam, portabilitas tinggi untuk sinkronisasi antar perangkat, dan efisiensi kerja yang lebih baik dengan membatasi gangguan fitur otomatis pada file yang tidak relevan. Pendekatan ini memungkinkan kustomisasi presisi terhadap perilaku asisten koding sehingga menciptakan lingkungan pengembangan yang lebih stabil, cepat, dan sesuai dengan standar produktivitas profesional.',
    },
    {
      project: 'Course Online – Javascript Animation (GSAP)',
      description:
        'Mengikuti Course Online dengan tema Animasi di Javascript guna memperdalam apa yang menjadi target ybs yaitu menjadi Specialist Animation. Namun, ybs kerap merasa tidak relevan karena menurut keterangannya animasi tidak dapat diimplementasi di project terkini.',
    },
  ],
  bareMinimumRatings: {
    fundamentalFrontend: 3,
    kualitasKode: 3,
    testingReliability: 2,
    kolaborasiKomunikasi: 3,
    deliveryBisnis: 3,
    securityObservability: 3,
    aiProduktivitas: 3,
  },
  bareMinimumReasons: {
    fundamentalFrontend:
      'Pada level II/2 dengan masa kerja sekitar 2 tahun 7 bulan, 1 project aktif, dan 1 guild aktif, fondasi frontend ybs sudah cukup baik dan terus berkembang ke arah middle staff.',
    kualitasKode:
      'Perhatian terhadap kualitas implementasi sudah cukup baik melalui perbaikan SonarQube dan kontrol kualitas modul pada scope yang masih terfokus.',
    testingReliability:
      'Skor testing ditahan lebih konservatif karena coverage masih di sekitar 75% dan belum mencapai baseline reliability 80% secara konsisten.',
    kolaborasiKomunikasi:
      'Skor kolaborasi dinaikkan karena ybs menunjukkan inisiatif kolaborasi yang baik pada pengajuan BNI QRIS V2 melalui artikel justifikasi dan timeline sampai mendapat persetujuan tim.',
    deliveryBisnis:
      'Delivery bisnis sudah cukup baik karena mampu menyelesaikan beberapa modul baru secara mandiri pada project utama sambil tetap responsif terhadap perubahan bisnis.',
    securityObservability:
      'Kontribusi pada security dan observability sudah baik melalui security headers, Fingerprint JS, dan Sentry untuk scope engineer pada tahap ini.',
    aiProduktivitas:
      'Riset dan eksplorasi teknis mendukung produktivitas dengan baik, meski kontribusi AI masih lebih banyak pada tahap eksplorasi daripada implementasi rutin.',
  },
  careerRoadmapGoal:
    'Menuntaskan penguatan fondasi Middle staff Frontend Engineer melalui disiplin prioritas, reliability engineering, dan spesialisasi UI interaction.',
  careerRoadmap: [
    {
      period: 'Q2 2026',
      objective:
        'Penguatan disiplin prioritas dan struktur komunikasi operasional.',
      backlogs: [
        'Menerapkan format update harian ringkas berbasis prioritas sprint.',
        'Membatasi work-in-progress agar fokus penyelesaian task utama terjaga.',
        'Menggunakan template keputusan teknis sederhana untuk mempercepat align.',
      ],
      successIndicator:
        'Prioritas kerja lebih konsisten dan penyampaian progres lebih runtut untuk tim lintas fungsi.',
    },
    {
      period: 'Q3 2026',
      objective: 'Peningkatan reliability dan kualitas implementasi modul.',
      backlogs: [
        'Mendorong coverage unit test menuju minimal 80% pada modul prioritas.',
        'Menuntaskan backlog hardening security headers dan observability.',
        'Menutup issue SonarQube kritikal secara konsisten.',
      ],
      successIndicator:
        'Stabilitas modul meningkat dan risiko regresi menurun pada area penting.',
    },
    {
      period: 'Q4 2026',
      objective:
        'Penguatan spesialisasi UI engineering pada data visualization dan interaction.',
      backlogs: [
        'Menuntaskan 2 modul visual kompleks berbasis reusable chart components.',
        'Meningkatkan aksesibilitas komponen visual di Atomic Design.',
        'Menyusun dokumentasi implementasi komponen visual untuk reuse tim.',
      ],
      successIndicator:
        'Kapabilitas UI engineering semakin matang dengan dampak nyata pada pengalaman pengguna.',
    },
  ],
  softProfile: {
    collaborationType:
      'Explorative-collaborative; aktif riset, terbuka diskusi, dan memiliki kepedulian pada kebutuhan pengguna.',
    workStyle:
      'Analyst-builder; cenderung memvalidasi banyak opsi sebelum implementasi.',
    strengths:
      'Kolaborasi yang baik, empati pengguna, kemampuan memahami konteks, kekuatan riset, dan kontribusi teknis yang variatif.',
    developmentAreas:
      'Komunikasi yang lebih terstruktur, ketegasan prioritas, dan disiplin terhadap batas waktu keputusan.',
    uniqueSellingPoint:
      'Kombinasi empati UX dan kemampuan membangun komponen visual kompleks yang reusable.',
  },
};

export default function INyomanArijayaPutraProfile() {
  return (
    <ProfileView
      profile={iNyomanArijayaPutraProfileData}
      headingId="i-nyoman-arijaya-putra-title"
    />
  );
}
