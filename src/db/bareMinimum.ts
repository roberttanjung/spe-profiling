import type { BareMinimumRatings } from '@/views/Profile/ProfileView/ProfileView.types';

export type BareMinimumLevelKey =
  | 'level1'
  | 'level2'
  | 'level3'
  | 'level4'
  | 'level5';

export interface BareMinimumMatrixItem {
  aspect: string;
  ratingKey: keyof BareMinimumRatings;
  level1: string;
  level2: string;
  level3: string;
  level4: string;
  level5: string;
}

export const BARE_MINIMUM_MATRIX: BareMinimumMatrixItem[] = [
  {
    aspect: 'Fundamental Frontend',
    ratingKey: 'fundamentalFrontend',
    level1: 'Membangun halaman sederhana mengikuti panduan yang diberikan.',
    level2:
      'Mampu membangun UI responsif dengan komponen reusable secara mandiri.',
    level3:
      'Mampu merancang arsitektur komponen modular dan scalable lintas modul.',
    level4:
      'Mampu menangani arsitektur frontend kompleks lintas modul dengan hasil yang stabil dan mudah dikembangkan.',
    level5:
      'Menunjukkan penguasaan frontend yang sangat kuat melalui solusi arsitektural yang matang, efisien, dan konsisten berdampak.',
  },
  {
    aspect: 'Kualitas Kode',
    ratingKey: 'kualitasKode',
    level1: 'Menulis kode yang berfungsi dengan bantuan review dari senior.',
    level2: 'Menjaga code style dan menyelesaikan issue review secara mandiri.',
    level3:
      'Aktif mengurangi tech debt dan menutup issue SonarQube secara proaktif.',
    level4:
      'Secara konsisten menghasilkan kode yang rapi, maintainable, dan minim temuan kualitas pada modul yang dikerjakan.',
    level5:
      'Menunjukkan kualitas implementasi yang sangat tinggi sehingga hasil kerjanya menjadi acuan mutu teknis pada area yang ditangani.',
  },
  {
    aspect: 'Testing & Reliability',
    ratingKey: 'testingReliability',
    level1: 'Menulis unit test sederhana dengan panduan yang diberikan.',
    level2:
      'Membuat dan memperbaiki unit test pada modul yang dikerjakan secara mandiri.',
    level3:
      'Menjaga coverage di atas 70% dan menstabilkan skenario critical flow.',
    level4:
      'Menjaga coverage minimal 80% serta konsisten memastikan alur penting berjalan stabil setelah perubahan.',
    level5:
      'Menunjukkan kualitas reliability yang sangat kuat dengan test dan stabilitas modul yang terjaga secara konsisten.',
  },
  {
    aspect: 'Kolaborasi & Komunikasi',
    ratingKey: 'kolaborasiKomunikasi',
    level1: 'Merespons pertanyaan tim dan mengikuti rapat yang diperlukan.',
    level2: 'Memberi update progres yang jelas dan responsif pada blocker.',
    level3:
      'Aktif sinkron lintas fungsi dan mengelola dependensi secara proaktif.',
    level4:
      'Menunjukkan komunikasi yang matang, jelas, dan membantu kelancaran kerja lintas fungsi.',
    level5:
      'Menjadi rekan kerja yang sangat dapat diandalkan dalam koordinasi, klarifikasi, dan penyelarasan eksekusi.',
  },
  {
    aspect: 'Delivery & Bisnis',
    ratingKey: 'deliveryBisnis',
    level1: 'Menyelesaikan sebagian task sprint dengan bimbingan.',
    level2:
      'Menyelesaikan task prioritas sesuai scope dan timeline sprint secara mandiri.',
    level3:
      'Mampu menerjemahkan requirement bisnis ke implementasi teknis yang tepat.',
    level4:
      'Konsisten menuntaskan delivery dengan kuat pada backlog yang bernilai bisnis dan perubahan kebutuhan yang dinamis.',
    level5:
      'Menunjukkan performa delivery yang sangat tinggi pada scope penting dengan dampak bisnis yang jelas dan berulang.',
  },
  {
    aspect: 'Security & Observability',
    ratingKey: 'securityObservability',
    level1: 'Mengikuti standar keamanan dasar yang ditetapkan tim.',
    level2: 'Aktif menindak issue security yang ditemukan secara mandiri.',
    level3:
      'Aktif mitigasi CVE dan memonitor error untuk menutup risiko teknis lebih cepat.',
    level4:
      'Secara konsisten memperkuat keamanan dan observability modul melalui mitigasi risiko dan respons teknis yang cepat.',
    level5:
      'Menunjukkan penguasaan yang sangat kuat pada security dan observability melalui penanganan isu kritikal serta pencegahan yang efektif.',
  },
  {
    aspect: 'AI & Produktivitas',
    ratingKey: 'aiProduktivitas',
    level1: 'Mengenal penggunaan AI untuk kebutuhan dasar.',
    level2: 'Memanfaatkan AI secara aman untuk mempercepat tugas rutin.',
    level3: 'Mengoptimalkan workflow AI untuk efisiensi pribadi dan tim.',
    level4:
      'Menghasilkan pemanfaatan AI yang terstruktur dan berdampak nyata pada percepatan kerja.',
    level5:
      'Menunjukkan dampak AI yang sangat kuat melalui inisiatif, tools, atau workflow yang mempercepat delivery secara signifikan.',
  },
];

export const BARE_MINIMUM_TOOLTIP_LEVELS: Array<{
  stars: number;
  label: string;
  key: BareMinimumLevelKey;
}> = [
  { stars: 1, label: '★ Perlu Perhatian', key: 'level1' },
  { stars: 2, label: '★★ Berkembang', key: 'level2' },
  { stars: 3, label: '★★★ Kompeten', key: 'level3' },
  { stars: 4, label: '★★★★ Mahir', key: 'level4' },
  { stars: 5, label: '★★★★★ Unggul', key: 'level5' },
];

export const KPI_TARGETS = {
  minTask: 40,
  maxTask: 70,
  minWeight: 60,
  maxWeight: 90,
  maxBugsRatio: 0.15,
} as const;

export interface KpiAchievement {
  taskHitRate: number;
  weightHitRate: number;
  bugsHitRate: number;
}

export function getKpiAchievement(
  rows: Array<{ totalTask: number; totalWeight: number; bugsRatio: number }>,
): KpiAchievement {
  if (rows.length === 0) {
    return { taskHitRate: 0, weightHitRate: 0, bugsHitRate: 0 };
  }

  const taskHit = rows.filter(
    (row) =>
      row.totalTask >= KPI_TARGETS.minTask &&
      row.totalTask <= KPI_TARGETS.maxTask,
  ).length;

  const weightHit = rows.filter(
    (row) =>
      row.totalWeight >= KPI_TARGETS.minWeight &&
      row.totalWeight <= KPI_TARGETS.maxWeight,
  ).length;

  const bugsHit = rows.filter(
    (row) => row.bugsRatio <= KPI_TARGETS.maxBugsRatio,
  ).length;

  return {
    taskHitRate: taskHit / rows.length,
    weightHitRate: weightHit / rows.length,
    bugsHitRate: bugsHit / rows.length,
  };
}

export function withKpiAdjustedRatings(
  baseRatings: BareMinimumRatings,
  kpi: KpiAchievement,
): BareMinimumRatings {
  const adjusted = { ...baseRatings };

  if (kpi.taskHitRate >= 0.5) {
    adjusted.deliveryBisnis = Math.min(5, adjusted.deliveryBisnis + 1);
  }

  if (kpi.weightHitRate >= 0.5) {
    adjusted.fundamentalFrontend = Math.min(
      5,
      adjusted.fundamentalFrontend + 1,
    );
  }

  if (kpi.bugsHitRate >= 0.5) {
    adjusted.testingReliability = Math.min(5, adjusted.testingReliability + 1);
    adjusted.securityObservability = Math.min(
      5,
      adjusted.securityObservability + 1,
    );
  }

  return adjusted;
}
