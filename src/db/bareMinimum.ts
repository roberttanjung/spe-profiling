import type {
  BareMinimumRatings,
  BareMinimumReasons,
  ProfileActivityGroup,
} from '@/views/Profile/ProfileView/ProfileView.types';

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
  minTask: 30,
  minWeight: 50,
  maxBugsRatio: 0.15,
  minDoneRate: 0.95,
  minFinishRate: 0.95,
} as const;

export interface KpiAchievement {
  taskHitRate: number;
  weightHitRate: number;
  bugsHitRate: number;
  doneHitRate: number;
  finishHitRate: number;
}

export interface ActivityAchievement {
  projectHitRate: number;
  evidenceHitRate: number;
  descriptionHitRate: number;
  evidenceProjectHitRate: number;
  overallHitRate: number;
  totalProjects: number;
  totalEvidenceItems: number;
}

export interface RoadmapGoalContext {
  needsImproveTitles?: string[];
  developmentAreas?: string;
  forcedSpecialistTrack?: string;
}

export function getKpiAchievement(
  rows: Array<{
    totalTask: number;
    totalWeight: number;
    bugsRatio: number;
    doneRate: number;
    finishRate: number;
  }>,
): KpiAchievement {
  if (rows.length === 0) {
    return {
      taskHitRate: 0,
      weightHitRate: 0,
      bugsHitRate: 0,
      doneHitRate: 0,
      finishHitRate: 0,
    };
  }

  const taskHit = rows.filter(
    (row) => row.totalTask >= KPI_TARGETS.minTask,
  ).length;

  const weightHit = rows.filter(
    (row) => row.totalWeight >= KPI_TARGETS.minWeight,
  ).length;

  const bugsHit = rows.filter(
    (row) => row.bugsRatio <= KPI_TARGETS.maxBugsRatio,
  ).length;

  const doneHit = rows.filter(
    (row) => row.doneRate >= KPI_TARGETS.minDoneRate,
  ).length;

  const finishHit = rows.filter(
    (row) => row.finishRate >= KPI_TARGETS.minFinishRate,
  ).length;

  return {
    taskHitRate: taskHit / rows.length,
    weightHitRate: weightHit / rows.length,
    bugsHitRate: bugsHit / rows.length,
    doneHitRate: doneHit / rows.length,
    finishHitRate: finishHit / rows.length,
  };
}

function clampRate(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function average(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }

  const total = values.reduce((sum, value) => sum + value, 0);
  return total / values.length;
}

function toStarRate(rate: number): number {
  const normalized = clampRate(rate);
  return Math.max(1, Math.min(5, Math.round(normalized * 4) + 1));
}

function toHitRateText(rate: number): string {
  return `${Math.round(clampRate(rate) * 100)}%`;
}

export const ACTIVITY_TARGETS = {
  minProjects: 6,
  minEvidenceItems: 10,
  minDescriptionProjects: 6,
  minEvidenceProjects: 4,
} as const;

export function getActivityAchievement(
  activities?: ProfileActivityGroup[],
): ActivityAchievement {
  const totalProjects = activities?.length ?? 0;

  if (!activities || activities.length === 0) {
    return {
      projectHitRate: 0,
      evidenceHitRate: 0,
      descriptionHitRate: 0,
      evidenceProjectHitRate: 0,
      overallHitRate: 0,
      totalProjects,
      totalEvidenceItems: 0,
    };
  }

  const projectsWithDescription = activities.filter((activity) =>
    Boolean(activity.description?.trim()),
  ).length;
  const projectsWithEvidence = activities.filter(
    (activity) => (activity.items?.length ?? 0) > 0,
  ).length;
  const totalEvidenceItems = activities.reduce(
    (total, activity) => total + (activity.items?.length ?? 0),
    0,
  );

  const projectHitRate = clampRate(
    totalProjects / ACTIVITY_TARGETS.minProjects,
  );
  const evidenceHitRate = clampRate(
    totalEvidenceItems / ACTIVITY_TARGETS.minEvidenceItems,
  );
  const descriptionHitRate = clampRate(
    projectsWithDescription / ACTIVITY_TARGETS.minDescriptionProjects,
  );
  const evidenceProjectHitRate = clampRate(
    projectsWithEvidence / ACTIVITY_TARGETS.minEvidenceProjects,
  );
  const overallHitRate = average([
    projectHitRate,
    evidenceHitRate,
    descriptionHitRate,
    evidenceProjectHitRate,
  ]);

  return {
    projectHitRate,
    evidenceHitRate,
    descriptionHitRate,
    evidenceProjectHitRate,
    overallHitRate,
    totalProjects,
    totalEvidenceItems,
  };
}

export function getKpiBasedBareMinimumRatings(
  kpi: KpiAchievement,
  activity: ActivityAchievement,
): BareMinimumRatings {
  return {
    fundamentalFrontend: toStarRate(
      average([kpi.weightHitRate, kpi.finishHitRate, activity.overallHitRate]),
    ),
    kualitasKode: toStarRate(
      average([kpi.bugsHitRate, kpi.finishHitRate, activity.evidenceHitRate]),
    ),
    testingReliability: toStarRate(
      average([kpi.bugsHitRate, kpi.doneHitRate, activity.evidenceHitRate]),
    ),
    kolaborasiKomunikasi: toStarRate(
      average([
        kpi.doneHitRate,
        kpi.finishHitRate,
        activity.descriptionHitRate,
      ]),
    ),
    deliveryBisnis: toStarRate(
      average([
        kpi.taskHitRate,
        kpi.doneHitRate,
        kpi.finishHitRate,
        activity.projectHitRate,
      ]),
    ),
    securityObservability: toStarRate(
      average([kpi.bugsHitRate, kpi.finishHitRate, activity.evidenceHitRate]),
    ),
    aiProduktivitas: toStarRate(
      average([kpi.taskHitRate, kpi.weightHitRate, activity.overallHitRate]),
    ),
  };
}

export function getKpiBasedBareMinimumReasons(
  kpi: KpiAchievement,
  activity: ActivityAchievement,
): BareMinimumReasons {
  const ratings = getKpiBasedBareMinimumRatings(kpi, activity);
  const task = toHitRateText(kpi.taskHitRate);
  const weight = toHitRateText(kpi.weightHitRate);
  const bugs = toHitRateText(kpi.bugsHitRate);
  const done = toHitRateText(kpi.doneHitRate);
  const finish = toHitRateText(kpi.finishHitRate);
  const activityOverall = toHitRateText(activity.overallHitRate);

  const withSolution = (
    key: keyof BareMinimumRatings,
    reason: string,
    solution: string,
  ) => {
    if (ratings[key] >= 5) {
      return reason;
    }

    return `${reason} Solusi menuju 5 bintang: ${solution}`;
  };

  return {
    fundamentalFrontend: withSolution(
      'fundamentalFrontend',
      `Dinilai dari kestabilan hasil kerja berdasarkan Weight (${weight}), Finish Rate (${finish}), dan konsistensi aktivitas yang sudah dilakukan (${activityOverall}).`,
      'Perkuat konsistensi hasil lintas modul dengan menaikkan ketercapaian Weight dan Finish Rate ke 100%, lalu dokumentasikan pola implementasi yang bisa direplikasi tim.',
    ),
    kualitasKode: withSolution(
      'kualitasKode',
      `Dinilai dari seberapa kecil masalah yang muncul (Bugs Ratio ${bugs}), ketuntasan kerja (${finish}), dan kelengkapan bukti aktivitas`,
      'Dorong Bugs Ratio tetap rendah di semua sprint, tambah bukti perbaikan kode penting, dan pastikan quality gate (lint, review, dan Sonar) lolos konsisten sebelum rilis.',
    ),
    testingReliability: withSolution(
      'testingReliability',
      `Dinilai dari rendahnya masalah (Bugs Ratio ${bugs}), konsistensi pekerjaan selesai (${done}), dan bukti aktivitas yang mendukung kualitas kerja`,
      'Naikkan reliability lewat cakupan test skenario kritikal, pertahankan stabilitas test per sprint, dan tambah evidence perbaikan bug agar performa konsisten menuju level unggul.',
    ),
    kolaborasiKomunikasi: withSolution(
      'kolaborasiKomunikasi',
      `Dinilai dari kedisiplinan menyelesaikan pekerjaan (Done Rate ${done}, Finish Rate ${finish}) dan kejelasan penjelasan aktivitas`,
      'Perjelas update progres dengan konteks bisnis, lakukan sinkronisasi blocker lebih dini, dan jaga konsistensi komunikasi lintas fungsi sampai keputusan eksekusi benar-benar align.',
    ),
    deliveryBisnis: withSolution(
      'deliveryBisnis',
      `Dinilai dari ketercapaian target kerja (Task ${task}), konsistensi penyelesaian (${done}, ${finish}), dan cakupan aktivitas di berbagai project`,
      'Tingkatkan rasio task selesai tepat waktu pada backlog prioritas tinggi, jaga stabilitas done dan finish rate di setiap sprint, serta perluas dampak delivery pada area bisnis bernilai tinggi.',
    ),
    securityObservability: withSolution(
      'securityObservability',
      `Dinilai dari kemampuan menjaga agar masalah tetap rendah (Bugs Ratio ${bugs}) dan hasil kerja tetap stabil (${finish})`,
      'Perkuat preventive control dengan checklist security dan monitoring error rutin, percepat tindak lanjut temuan risiko, lalu dokumentasikan mitigasi agar standar keamanan konsisten di semua modul.',
    ),
    aiProduktivitas: withSolution(
      'aiProduktivitas',
      `Dinilai dari efisiensi hasil kerja (Task ${task}, Weight ${weight}) serta konsistensi aktivitas yang terdokumentasi`,
      'Gunakan workflow AI secara lebih terstruktur pada tugas berulang, ukur dampak efisiensinya per sprint, dan bagikan praktik yang terbukti efektif agar produktivitas tim ikut naik.',
    ),
  };
}

const ROADMAP_ASPECT_LABELS: Record<keyof BareMinimumRatings, string> = {
  fundamentalFrontend: 'Fundamental Frontend',
  kualitasKode: 'Kualitas Kode',
  testingReliability: 'Testing & Reliability',
  kolaborasiKomunikasi: 'Kolaborasi & Komunikasi',
  deliveryBisnis: 'Delivery & Bisnis',
  securityObservability: 'Security & Observability',
  aiProduktivitas: 'AI & Produktivitas',
};

const SPECIALIST_TRACK_BY_ASPECT: Record<keyof BareMinimumRatings, string> = {
  fundamentalFrontend: 'Specialist Arsitektur Frontend',
  kualitasKode: 'Specialist Kualitas Kode Frontend',
  testingReliability: 'Specialist Reliability Frontend',
  kolaborasiKomunikasi: 'Specialist Kolaborasi Delivery Frontend',
  deliveryBisnis: 'Specialist Delivery Produk Frontend',
  securityObservability: 'Specialist Security & Observability Frontend',
  aiProduktivitas: 'Specialist AI Frontend',
};

const SPECIALIST_KEYWORD_TRACKS: Array<{
  specialistTrack: string;
  keywords: string[];
}> = [
  {
    specialistTrack: 'Specialist AI Frontend',
    keywords: ['ai', 'copilot', 'prompt', 'automation', 'otomasi'],
  },
  {
    specialistTrack: 'Specialist Arsitektur Frontend',
    keywords: ['arsitektur', 'architecture', 'monorepo', 'scalable'],
  },
  {
    specialistTrack: 'Specialist Security & Observability Frontend',
    keywords: ['security', 'cve', 'observability', 'monitoring', 'encrypt'],
  },
  {
    specialistTrack: 'Specialist Reliability Frontend',
    keywords: ['testing', 'test', 'coverage', 'reliability', 'stabil'],
  },
  {
    specialistTrack: 'Specialist Kualitas Kode Frontend',
    keywords: ['quality', 'kualitas', 'sonarqube', 'tech debt', 'refactor'],
  },
  {
    specialistTrack: 'Specialist Delivery Produk Frontend',
    keywords: ['delivery', 'produk', 'business', 'bisnis', 'backlog'],
  },
  {
    specialistTrack: 'Specialist Kolaborasi Delivery Frontend',
    keywords: ['kolaborasi', 'komunikasi', 'lintas tim', 'sinkron'],
  },
];

export const ALL_SPECIALIST_TRACKS = Array.from(
  new Set([
    ...Object.values(SPECIALIST_TRACK_BY_ASPECT),
    ...SPECIALIST_KEYWORD_TRACKS.map((item) => item.specialistTrack),
  ]),
);

export function getSpecialistTrackByContext(
  context: RoadmapGoalContext | undefined,
  fallbackAspect: keyof BareMinimumRatings,
): string {
  const sourceText = [
    context?.developmentAreas ?? '',
    ...(context?.needsImproveTitles ?? []),
  ]
    .join(' ')
    .toLowerCase();

  const keywordMatch = SPECIALIST_KEYWORD_TRACKS.find(({ keywords }) =>
    keywords.some((keyword) => sourceText.includes(keyword)),
  );

  if (keywordMatch) {
    return keywordMatch.specialistTrack;
  }

  return SPECIALIST_TRACK_BY_ASPECT[fallbackAspect];
}

export function getRoadmapGoalFromBareMinimumRatings(
  ratings: BareMinimumRatings,
  context?: RoadmapGoalContext,
): string {
  const entries = Object.entries(ratings) as Array<
    [keyof BareMinimumRatings, number]
  >;
  const averageScore = average(entries.map(([, score]) => score));
  const minScore = Math.min(...entries.map(([, score]) => score));
  const technicalStrengthCount = [
    ratings.fundamentalFrontend,
    ratings.kualitasKode,
    ratings.testingReliability,
    ratings.securityObservability,
  ].filter((score) => score >= 4).length;
  const sortedByStrength = [...entries].sort(
    (left, right) => right[1] - left[1],
  );
  const primaryAspect = sortedByStrength[0]?.[0] ?? 'fundamentalFrontend';
  const targetSpecialistTrack =
    context?.forcedSpecialistTrack ??
    getSpecialistTrackByContext(context, primaryAspect);

  const weakestAspects = [...entries]
    .sort((left, right) => left[1] - right[1])
    .slice(0, 2)
    .map(([key]) => ROADMAP_ASPECT_LABELS[key])
    .join(' dan ');

  const needsImproveFocus = (context?.needsImproveTitles ?? [])
    .map((title) => title.trim())
    .filter((title) => title.length > 0)
    .slice(0, 2)
    .join(' dan ');

  const developmentAreaFocus = context?.developmentAreas?.trim() ?? '';

  const roadmapFocus =
    needsImproveFocus || developmentAreaFocus || weakestAspects;

  const specialistEligible =
    averageScore >= 4.4 && minScore >= 4 && technicalStrengthCount >= 3;
  const seniorEligible = averageScore >= 3.8 && minScore >= 3;

  if (specialistEligible) {
    return `Target utama: mencapai ${targetSpecialistTrack} (SPEcialist) dengan penguatan ${roadmapFocus}, standardisasi kualitas lintas modul, dan portfolio teknis tingkat lanjut.`;
  }

  if (seniorEligible) {
    return `Target utama: engineer belum layak masuk jalur SPEcialist, sehingga prioritas saat ini adalah mengokohkan level Senior Frontend Engineer melalui penguatan ${roadmapFocus}; setelah stabil, lanjutkan akselerasi ke ${targetSpecialistTrack}.`;
  }

  return `Target utama: engineer belum layak masuk jalur SPEcialist, sehingga prioritas saat ini adalah mencapai stabilitas Middle Frontend Engineer terlebih dahulu melalui penguatan ${roadmapFocus}; setelah itu lanjutkan ke Senior Frontend Engineer sebelum akselerasi ke ${targetSpecialistTrack}.`;
}

export function withKpiAdjustedRatings(
  baseRatings: BareMinimumRatings,
  kpi: KpiAchievement,
  activity: ActivityAchievement,
): BareMinimumRatings {
  // Backward-compatible helper: keep base profile context but normalize with KPI+activity floor.
  const kpiOnlyRatings = getKpiBasedBareMinimumRatings(kpi, activity);
  const adjusted = { ...baseRatings };

  (Object.keys(adjusted) as Array<keyof BareMinimumRatings>).forEach((key) => {
    adjusted[key] = Math.max(adjusted[key], kpiOnlyRatings[key]);
  });

  return adjusted;
}
