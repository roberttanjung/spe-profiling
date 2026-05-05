import ProfileView, {
  type EngineerProfileData,
} from '@/views/Profile/ProfileView';

export const agmarPutraProfileData: EngineerProfileData = {
  name: 'Agmar Putra',
  dateOfBirth: '04/01/2003',
  levelGrade: 'II/3',
  joinedDate: '14/01/2022',
  projects: ['QRISAN', 'QRISAN x Kaltimtara', 'QRISAN x KB Bank'],
  guilds: ['Atomic Design', 'Dynamic Dashboard', 'SPEInside'],
  good: [
    {
      title: 'Eksekusi cepat dan konsisten',
      description:
        'Mandat langsung dikerjakan sejak awal sprint sehingga progres stabil dan target lebih mudah tercapai tepat waktu.',
    },
    {
      title: 'Fokus kerja kuat',
      description:
        'Tetap menjaga ritme kerja meskipun ada distraksi operasional seperti chat, diskusi, dan update administratif.',
    },
    {
      title: 'Riset berbasis bukti',
      description:
        'Hasil riset disertai POC sehingga tim bisa menilai kelayakan implementasi dengan data yang jelas.',
    },
    {
      title: 'Terbuka pada masukan',
      description:
        'Menerima kritik secara profesional, lalu mengonfirmasi alasan dan dampaknya agar perbaikan yang diambil benar-benar tepat.',
    },
  ],
  needsImprove: [
    {
      title: 'Komunikasi perlu lebih kontekstual',
      description:
        'Gaya penyampaian yang sangat teknis sudah kuat untuk tim engineering, namun perlu lebih disederhanakan saat berkomunikasi dengan pihak non-teknis.',
    },
    {
      title: 'Narasi lisan perlu diperkuat',
      description:
        'Pola komunikasi tertulis sudah rapi, tetapi penyampaian verbal perlu lebih terstruktur agar poin penting cepat dipahami lintas fungsi.',
    },
  ],
  activities: [
    {
      project: 'QRISAN All Variant',
      description:
        'Sebagai inisiator arsitektur QRISAN, ybs bertanggung jawab atas 8 repo: QRISAN (Core) Admin & Merchant, QRISAN x Kaltimtara Admin & Merchant, QRISAN x Jateng Admin & Merchant, dan QRISAN x KB Bank Admin & Merchant. Meski menangani 8 repo, ybs tetap bertanggung jawab atas kualitas kode dari semua project tersebut. Saat ini ybs dalam tahap pengembangan Monorepo guna mempermudah proses development di masa depan. Ybs juga berkolaborasi dengan Tim DevOps untuk menangani masalah CI/CD ketika menggunakan Monorepo, termasuk membantu penyelesaian masalah Multiple Versi dalam satu repo.',
      items: [
        {
          label: 'Unit Test Coverage Area',
          detail: 'Menjaga Unit Test Coverage Area di kisaran 80%.',
        },
        {
          label: 'SonarQube',
          detail: 'Menjaga kualitas kode dari issue yang muncul di SonarQube.',
        },
      ],
    },
    {
      project: 'QRISAN (Core)',
      description:
        'Walaupun sudah tidak ada modul baru untuk dikerjakan, ybs tetap aktif melakukan support terhadap perubahan yang terjadi pada bisnis ataupun request / response API.',
      items: [
        {
          label: 'Coverage Unit Test Area',
          detail:
            'Menjaga Coverage Unit Test Area setelah dilakukannya perubahan-perubahan agar selalu ada diatas 80%.',
        },
        {
          label: 'Upgrade Versi MUI',
          detail:
            'Melakukan upgrade versi MUI menjadi 7 agar terhindar dari vulnerability dan juga meningkatkan performa aplikasi web.',
        },
        {
          label: 'SonarQube',
          detail:
            'Selalu menjaga kualitas kode dengan cara memperbaiki issue yang muncul di SonarQube.',
        },
        {
          label: 'Menghindari Issue CVE',
          detail:
            'Menjaga keamanan aplikasi web dengan cara melakukan upgrade versi Axios menjadi v1.15 karena versi dibawah itu terkena issue yang cukup berbahaya yaitu terdapat attack-surface dari Axios yang mengijinkan attacker untuk mengeksekusi kode lain yang berbahaya didalam aplikasi web.',
        },
        {
          label: 'Konversi ke Typescript',
          detail:
            'Melakukan konversi terhadap file-file Javascript menjadi Typescript guna menerapkan Type-Safe agar terhindar dari kesalahan tipe yang dapat menyebabkan aplikasi error.',
        },
      ],
    },
    {
      project: 'QRISAN x Kaltimtara',
      description:
        'Tidak ada modul baru yang dikerjakan, tetapi ybs tetap aktif melakukan support terutama untuk melakukan implementasi Encrypt & Decrypt menggunakan AES.',
      items: [
        {
          label: 'Fingerprint JS',
          detail:
            'Implementasi Fingerprint JS yang berguna untuk menangani issue double login di 2 perangkat berbeda. Dan, menghemat biaya operasional karena tidak perlu menggunakan versi Pro dari Fingerprint JS.',
        },
        {
          label: 'Obfuscator',
          detail:
            'Implementasi Obfuscator yang berguna untuk menangani issue tereksposnya variabel rahasia yang dapat menjadi attack-surface.',
        },
        {
          label: 'Penerapan AES',
          detail:
            'Menerapkan Encrypt & Decrypt terhadap request dan response API.',
        },
        {
          label: 'Implementasi Tooltip',
          detail:
            'Melakukan implementasi Tooltip guna memberikan penjelasan terhadap konten yang perlu untuk dijelaskan seperti Card, Icon & Status dalam bentuk wadah melayang yang akan muncul ketika dilakukan hover pada konten.',
        },
      ],
    },
    {
      project: 'QRISAN x KB Bank',
      description:
        'QRISAN x KB Bank merupakan variant yang baru muncul ditahun 2025. Ybs sebagai Frontend bertugas untuk membangun beberapa backlog diantaranya: membuat UI untuk Syarat & Ketentuan sebelum melakukan Onboarding, Membuat halaman Informasi Ketentuan Settlemen dan Membuat halaman Settlemen dan sub-backlognya berupa Penambahan Settlemen, Detail Settlemen dan History Settlemen.',
      items: [
        {
          label: 'Coverage Unit Testing Area',
          detail:
            'Melakukan penyesuaian terhadap beberapa unit test guna menjaga nilai coverage tetap dikisaran 80%.',
        },
        {
          label: 'Upgrade MUI ke v7',
          detail:
            'Upgrade versi MUI ke v7 guna menghindari vulnerability dimasa depan serta meningkatkan performa aplikasi web.',
        },
        {
          label: 'Konversi ke Typescript',
          detail:
            'Melakukan konversi terhadap beberapa backlog dari Javascript menjadi Typescript guna menjaga Type-Safe untuk menghindari error pada saat aplikasi dibuka.',
        },
        {
          label: 'Fixing SonarQube',
          detail:
            'Meningkatkan kualitas kode dari issue yang muncul di SonarQube agar kualitas kode tetap baik.',
        },
      ],
    },
    {
      project: 'DRONT Vault',
      description:
        'Sebuah App Web yang berguna untuk centralize projects monitoring. Merupakan ide original yang dikembangkan oleh Agmar Putra sebagai inovasi untuk mempercepat proses pengisian informasi terkini dari masing-masing project yang sebelumnya dapat memakan waktu satu hari penuh menjadi hanya dalam hitungan menit.',
      items: [
        {
          label: 'Repository Information',
          detail: 'Detail informasi repository.',
        },
        { label: 'SonarQube', detail: 'Health Status Project.' },
        { label: 'Sentry', detail: 'Tracking dan solving issue.' },
        {
          label: 'Package',
          detail: 'Pengecekan installed package dengan versi yang tertera.',
        },
        { label: 'Tech Debt', detail: 'Tech Debt tracking.' },
        { label: 'Harvest', detail: 'Aksi untuk mendapatkan data terkini.' },
      ],
    },
    {
      project: 'Dynamic Dashboard',
      description:
        'Berkontribusi dalam pengerjaan Dynamic Dashboard sebagai Frontend Engineer untuk melakukan integrasi N8N dengan Interface. Dynamic Dashboard adalah sebuah Package Javascript yang berguna untuk membuat Dashboard secara dinamis dengan didukung oleh penggunaan AI sehingga konten yang ditampilkan sesuai dengan apa yang diinginkan oleh User. Dengan Dashboard yang Dinamis menjadikan berkurangnya backlog di Sprint dan pengerjaan di Sprint menjadi lebih cepat.',
    },
    {
      project: 'SPEInside',
      description:
        'Ikut berkontribusi dalam pengerjaan SPEInside yang saat ini sedang diminati oleh HC. Kontribusi ybs cukup penting karena ybs mengerjakan Backlog untuk Digitalisasi proses Recruitment, Hiring dan Onboarding. Selain itu, ybs juga ikut serta dalam mengembangkan alur pengerjaan pen-digitalisasi-an tersebut.',
    },
    {
      project: 'Atomic Design',
      description:
        'Berkontribusi di Atomic Design dalam pembuatan component dalam bentuk Package yang dapat digunakan kembali oleh Frontend Engineer lain agar mempermudah dan mempercepat proses development.',
      items: [
        {
          label: 'Alert',
          detail: 'Feedback pesan yang tampil setelah melakukan aktifitas.',
        },
        { label: 'Theme Manager', detail: 'Mengatur tema dengan mudah.' },
        {
          label: 'Time Machine',
          detail:
            'Kolom pengisian tanggal yang dapat diimplementasi dengan mudah.',
        },
      ],
    },
    {
      project: 'Course Online – Build AI-Powered Apps with OpenAI and Node.js',
      description:
        'Mempelajari model bahasa dari OpenAI ke dalam aplikasi Node.js serta mendapatkan sertifikasi. Materi yang dipelajari selaras dengan tujuan SPE yaitu menerapkan Aplikasi berbasis AI guna mempercepat proses development. Fundamental yang dipelajari dijadikan materi dalam Sharing Session "FE Day" guna meningkatkan pengetahuan rekan sesama Frontend Engineer tentang cara kerja AI.',
    },
    {
      project: 'Ide Self Code Review',
      description:
        'Sebuah tools yang berguna untuk melakukan Review Code secara mandiri sebelum melakukan Push dan Merge Request untuk menghindari Churn Code serta mencegah kesalahan dalam reviewing code. Ide ini belum dapat dilanjutkan karena menyebabkan penggunaan Request Prompt AI menjadi lebih boros dan harus melakukan setup tambahan.',
    },
    {
      project: 'Ide Tasks Checker',
      description:
        'Mengajukan pembuatan program untuk menyaring task yang layak dimasukan ke SPEctrum. Task akan dilakukan pemeriksaan oleh SPV lalu dengan persetujuan SPV maka task dinyatakan layak untuk dimasukan ke SPEctrum. Ide tersebut lahir berkat analisa ybs dalam melihat banyaknya task yang menurutnya tidak layak untuk dijadikan task karena terlalu kecil secara bobot (remeh) tetapi hal tersebut dapat meningkatkan KPI.',
    },
    {
      project: 'Research OpenSpec',
      description:
        'Sebuah Tools AI yang berguna untuk menentukan Spesifikasi sebuah Aplikasi untuk meningkatkan akurasi penggunakan AI Agent sehingga Request akan menjadi lebih hemat. Spesifikasi digenerate dengan pengawasan user agar spesifikasi tetap selaras dan sesuai dengan apa yang dideskripsikan oleh OpenSpec.',
    },
    {
      project: 'Research Rust Kill Token',
      description:
        'Tools AI yang berguna untuk mempersingkat sebuah prompt tanpa mengurangi akurasi dari maksud prompt tersebut agar penggunaan Token menjadi jauh lebih hemat. Research tersebut tidak dilanjutkan karena penggunaan GitHub Copilot menggunakan request prompt sebagai mata uang dengan maksimal 300 request prompt setiap bulan, sehingga penggunaan Rust Kill Token menjadi tidak relevan.',
    },
  ],
  bareMinimumRatings: {
    fundamentalFrontend: 5,
    kualitasKode: 5,
    testingReliability: 4,
    kolaborasiKomunikasi: 4,
    deliveryBisnis: 5,
    securityObservability: 5,
    aiProduktivitas: 5,
  },
  bareMinimumReasons: {
    fundamentalFrontend:
      'Pada usia 23 tahun dengan masa kerja lebih dari 4 tahun, 3 project aktif, dan 3 guild aktif, fondasi frontend ybs sudah terbukti sangat matang dan luas.',
    kualitasKode:
      'Kombinasi level II/3, masa kerja panjang, dan cakupan repo yang luas tercermin pada disiplin kualitas kode yang sangat kuat melalui SonarQube, Typescript, dan standardisasi repository.',
    testingReliability:
      'Menjaga coverage unit test di kisaran 80% pada beberapa project, menunjukkan reliability yang kuat dan konsisten untuk scope kerja yang besar.',
    kolaborasiKomunikasi:
      'Menangani banyak project dan guild secara paralel dengan koordinasi yang tetap baik lintas tim, termasuk dengan DevOps dan rekan guild.',
    deliveryBisnis:
      'Breadth mandat pada beberapa project aktif dan pengalaman kerja yang panjang membuat delivery bisnis ybs berada pada level sangat kuat dan konsisten.',
    securityObservability:
      'Level kontribusi pada security dan observability sudah sangat kuat melalui AES, Fingerprint JS, Obfuscator, serta penanganan issue CVE di beberapa area.',
    aiProduktivitas:
      'Skor tetap unggul karena kontribusi AI ybs bukan hanya pemanfaatan, tetapi sudah berbentuk inovasi, riset aktif, dan transfer insight untuk tim.',
  },
  careerRoadmapGoal:
    'Mencapai konsistensi performa Senior staff Frontend Engineer pada domain arsitektur, reliability delivery, dan AI-enabled productivity.',
  careerRoadmap: [
    {
      period: 'Q2 2026',
      objective:
        'Penguatan komunikasi teknis-ke-bisnis dan konsistensi delivery lintas repo.',
      backlogs: [
        'Membuat template status mingguan non-teknis untuk stakeholder.',
        'Melakukan 2 sesi demo bulanan dengan narasi dampak bisnis.',
        'Menetapkan checklist release readiness lintas variant QRISAN.',
      ],
      successIndicator:
        'Komunikasi progres lebih mudah dipahami lintas fungsi dan delivery lintas repo tetap stabil.',
    },
    {
      period: 'Q3 2026',
      objective:
        'Stabilisasi arsitektur monorepo dan peningkatan efisiensi pengembangan.',
      backlogs: [
        'Menyelesaikan migrasi repo prioritas ke struktur monorepo.',
        'Merapikan shared component dan shared utility agar reusable.',
        'Mengurangi waktu setup pengembangan project baru.',
      ],
      successIndicator:
        'Lead time pengembangan menurun dan konsistensi implementasi lintas project meningkat.',
    },
    {
      period: 'Q4 2026',
      objective:
        'Akselerasi AI-enabled engineering untuk peningkatan kualitas dan kecepatan delivery.',
      backlogs: [
        'Membuat guideline penggunaan AI untuk task coding rutin.',
        'Menguji workflow self code review berbasis AI di project pilot.',
        'Memonitor dampak AI terhadap kecepatan delivery dan defect.',
      ],
      successIndicator:
        'Workflow AI terukur, lebih efisien, dan berdampak nyata pada kualitas hasil kerja.',
    },
  ],
  softProfile: {
    collaborationType:
      'Koordinatif-proaktif; aktif memberi update, cepat merespons isu, dan menjaga sinkronisasi lintas tim.',
    workStyle:
      'Fast executor dengan orientasi kualitas; bekerja cepat tanpa melepas kontrol terhadap standar teknis.',
    strengths:
      'Disiplin eksekusi, fokus tinggi, kemampuan riset, komunikasi sopan, dan ownership pada sistem besar.',
    developmentAreas:
      'Penyederhanaan bahasa teknis dan penguatan storytelling saat menyampaikan argumen secara lisan.',
    uniqueSellingPoint:
      'Mampu menggabungkan stabilitas delivery harian dengan inovasi arsitektural yang berdampak langsung ke efisiensi tim.',
  },
};

export default function AgmarPutraProfile() {
  return (
    <ProfileView profile={agmarPutraProfileData} headingId="agmar-title" />
  );
}
