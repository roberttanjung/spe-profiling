import type { ProfileInfoRow } from '@/components/ProfileInfoTable';
import ProfileInfoTable from '@/components/ProfileInfoTable';
import ProfileChartSection from '@/components/ProfileChartSection';
import ProfileMonthlyTable from '@/components/ProfileMonthlyTable';
import ProfileSprintTable from '@/components/ProfileSprintTable';
import AdaptiveTooltip from '@/components/AdaptiveTooltip';
import {
  getTwbeChartRowsByEmployeeName,
  getTwbeMonthlyRowsByEmployeeName,
  getTwbeSprintRowsByEmployeeName,
} from '@/utils/twbe';
import styles from '../ProfileCommon.module.css';
import type {
  ProfileViewProps,
  ProfileEvaluationItem,
  ProfileSoftAspect,
  ProfileActivityGroup,
  BareMinimumRatings,
  BareMinimumReasons,
  ProfileRoadmapStage,
} from './ProfileView.types';

const KPI_TARGETS = {
  minTask: 40,
  maxTask: 70,
  minWeight: 60,
  maxWeight: 90,
  maxBugsRatio: 0.15,
} as const;

interface KpiAchievement {
  taskHitRate: number;
  weightHitRate: number;
  bugsHitRate: number;
}

function parseDateInDdMmYyyy(dateText: string): Date {
  const [day, month, year] = dateText.split('/').map(Number);
  return new Date(year, month - 1, day);
}

function getAgeInYears(dateOfBirth: Date): number {
  const today = new Date();
  let years = today.getFullYear() - dateOfBirth.getFullYear();
  const hasNotHadBirthdayThisYear =
    today.getMonth() < dateOfBirth.getMonth() ||
    (today.getMonth() === dateOfBirth.getMonth() &&
      today.getDate() < dateOfBirth.getDate());

  if (hasNotHadBirthdayThisYear) {
    years -= 1;
  }

  return years;
}

function getWorkingDuration(joinedDate: Date): string {
  const today = new Date();
  let years = today.getFullYear() - joinedDate.getFullYear();
  let months = today.getMonth() - joinedDate.getMonth();

  if (today.getDate() < joinedDate.getDate()) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return `${years} tahun ${months} bulan`;
}

function getKpiAchievement(
  rows: Array<{ totalTask: number; totalWeight: number; bugsRatio: number }>,
): KpiAchievement {
  if (rows.length === 0) {
    return {
      taskHitRate: 0,
      weightHitRate: 0,
      bugsHitRate: 0,
    };
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

function withKpiAdjustedRatings(
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

function toPercentText(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function EvalSection({
  title,
  items,
  variant,
}: {
  title: string;
  items: ProfileEvaluationItem[];
  variant: 'good' | 'improve';
}) {
  return (
    <div className={styles.sectionCard}>
      <p className={styles.sectionTitle}>{title}</p>
      <div className={styles.evalGrid}>
        {items.map((item) => (
          <div
            key={item.title}
            className={`${styles.evalItem} ${variant === 'good' ? styles['evalItem--good'] : styles['evalItem--improve']}`}
          >
            <p className={styles.evalItemTitle}>{item.title}</p>
            <p className={styles.evalItemDesc}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivitiesSection({ items }: { items: ProfileActivityGroup[] }) {
  return (
    <div className={styles.sectionCard}>
      <p className={styles.sectionTitle}>Aktivitas yang Sudah Dilakukan</p>
      <div className={styles.activityGroups}>
        {items.map((group, idx) => (
          <div key={idx} className={styles.activityGroup}>
            <p className={styles.activityGroupTitle}>{group.project}</p>
            {group.description && (
              <p className={styles.activityGroupDesc}>{group.description}</p>
            )}
            {group.items && group.items.length > 0 && (
              <ul className={styles.activityList}>
                {group.items.map((item, itemIdx) => (
                  <li key={itemIdx} className={styles.activityItem}>
                    <strong>{item.label}</strong>: {item.detail}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const SOFT_PROFILE_TEXT_KEYS = [
  'collaborationType',
  'workStyle',
  'strengths',
  'developmentAreas',
  'uniqueSellingPoint',
] as const;

type SoftProfileTextKey = (typeof SOFT_PROFILE_TEXT_KEYS)[number];

const SOFT_PROFILE_TEXT_LABELS: Record<SoftProfileTextKey, string> = {
  collaborationType: 'Tipe Kolaborasi',
  workStyle: 'Gaya Kerja',
  strengths: 'Kelebihan Utama',
  developmentAreas: 'Area Pengembangan',
  uniqueSellingPoint: 'Potensi / USP',
};

function CareerRoadmapSection({
  goal,
  items,
}: {
  goal?: string;
  items: ProfileRoadmapStage[];
}) {
  const roadmapGoal =
    goal ??
    `Mencapai ${items[items.length - 1]?.objective.toLowerCase() ?? 'target pengembangan karir yang terukur'}.`;

  return (
    <div className={styles.sectionCard}>
      <p className={styles.sectionTitle}>Roadmap Karir</p>
      <div className={styles.roadmapGoalCard}>
        <p className={styles.roadmapGoalLabel}>Tujuan Utama</p>
        <p className={styles.roadmapGoalText}>{roadmapGoal}</p>
      </div>
      <div className={styles.roadmapGrid}>
        {items.map((stage, idx) => (
          <div key={stage.period} className={styles.roadmapCard}>
            <p
              className={styles.roadmapPeriod}
            >{`Tahap ${idx + 1} • ${stage.period}`}</p>
            <p className={styles.roadmapObjective}>
              <strong>Tujuan Tahap:</strong> {stage.objective}
            </p>
            <p className={styles.roadmapBacklogLabel}>Backlog Tahap:</p>
            <ul className={styles.roadmapBacklogList}>
              {stage.backlogs.map((backlog) => (
                <li key={backlog} className={styles.roadmapBacklogItem}>
                  {backlog}
                </li>
              ))}
            </ul>
            <p className={styles.roadmapSuccess}>
              <strong>Target Hasil:</strong> {stage.successIndicator}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const BARE_MINIMUM_MATRIX = [
  {
    aspect: 'Fundamental Frontend',
    ratingKey: 'fundamentalFrontend' as const,
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
    ratingKey: 'kualitasKode' as const,
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
    ratingKey: 'testingReliability' as const,
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
    ratingKey: 'kolaborasiKomunikasi' as const,
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
    ratingKey: 'deliveryBisnis' as const,
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
    ratingKey: 'securityObservability' as const,
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
    ratingKey: 'aiProduktivitas' as const,
    level1: 'Mengenal penggunaan AI untuk kebutuhan dasar.',
    level2: 'Memanfaatkan AI secara aman untuk mempercepat tugas rutin.',
    level3: 'Mengoptimalkan workflow AI untuk efisiensi pribadi dan tim.',
    level4:
      'Menghasilkan pemanfaatan AI yang terstruktur dan berdampak nyata pada percepatan kerja.',
    level5:
      'Menunjukkan dampak AI yang sangat kuat melalui inisiatif, tools, atau workflow yang mempercepat delivery secara signifikan.',
  },
] as const;

function SoftProfileSection({ data }: { data: ProfileSoftAspect }) {
  return (
    <div className={styles.sectionCard}>
      <p className={styles.sectionTitle}>Aspek Profil</p>
      <table className={styles.softTable}>
        <tbody>
          {SOFT_PROFILE_TEXT_KEYS.map((key) => (
            <tr key={key}>
              <td className={styles.softTableKey}>
                {SOFT_PROFILE_TEXT_LABELS[key]}
              </td>
              <td className={styles.softTableVal}>{data[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StarRating({ count, reason }: { count: number; reason: string }) {
  return (
    <span className={styles.bmStarWrap}>
      <AdaptiveTooltip
        preferredSide="top"
        maxWidth={220}
        className={`${styles.bmStarTooltip} ${styles[`bmStarTooltip--${count}`]}`}
        content={
          <>
            <span className={styles.bmStarTooltipLabel}>{`${count}/5`}</span>
            {reason}
          </>
        }
        trigger={
          <span
            className={styles.bmStarRating}
            aria-label={`${count} dari 5 bintang`}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={i < count ? styles.bmStarFilled : styles.bmStarEmpty}
              >
                {i < count ? '★' : '☆'}
              </span>
            ))}
          </span>
        }
      />
    </span>
  );
}

const TOOLTIP_LEVELS = [
  { stars: 1, label: '★ Perlu Perhatian', key: 'level1' },
  { stars: 2, label: '★★ Berkembang', key: 'level2' },
  { stars: 3, label: '★★★ Kompeten', key: 'level3' },
  { stars: 4, label: '★★★★ Mahir', key: 'level4' },
  { stars: 5, label: '★★★★★ Unggul', key: 'level5' },
] as const;

function BareMinimumSection({
  ratings,
  reasons,
  kpi,
}: {
  ratings: BareMinimumRatings;
  reasons?: BareMinimumReasons;
  kpi: KpiAchievement;
}) {
  return (
    <div className={styles.sectionCard}>
      <p className={styles.sectionTitle}>Bare Minimum Frontend Engineer</p>
      <p className={styles.kpiSummaryText}>
        Penilaian disesuaikan dengan KPI bulanan: Task{' '}
        {toPercentText(kpi.taskHitRate)}, Weight{' '}
        {toPercentText(kpi.weightHitRate)}, Bugs Ratio{' '}
        {toPercentText(kpi.bugsHitRate)}.
      </p>
      <div className={styles.bmScroll}>
        <table className={styles.bmTable}>
          <thead>
            <tr>
              {BARE_MINIMUM_MATRIX.map((row) => (
                <th key={row.aspect}>
                  <div className={styles.bmAspectHeader}>
                    <span>{row.aspect}</span>
                    <AdaptiveTooltip
                      preferredSide="bottom"
                      maxWidth={240}
                      className={styles.bmTooltip}
                      content={
                        <>
                          {TOOLTIP_LEVELS.map(({ stars, label, key }) => (
                            <span key={stars} className={styles.bmTooltipRow}>
                              <span className={styles.bmTooltipLabel}>
                                {label}
                              </span>
                              {row[key]}
                            </span>
                          ))}
                        </>
                      }
                      trigger={
                        <span className={styles.bmInfoWrap}>
                          <span
                            className={styles.bmInfoIcon}
                            aria-hidden="true"
                          >
                            ⓘ
                          </span>
                        </span>
                      }
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {BARE_MINIMUM_MATRIX.map((row) => (
                <td key={row.aspect}>
                  <StarRating
                    count={ratings[row.ratingKey]}
                    reason={
                      reasons?.[row.ratingKey] ??
                      'Belum ada catatan penilaian untuk aspek ini.'
                    }
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ProfileView({ profile, headingId }: ProfileViewProps) {
  const dateOfBirth = parseDateInDdMmYyyy(profile.dateOfBirth);
  const joinedDate = parseDateInDdMmYyyy(profile.joinedDate);
  const twbeRows = getTwbeSprintRowsByEmployeeName(profile.name);
  const twbeMonthlyRows = getTwbeMonthlyRowsByEmployeeName(profile.name);
  const twbeChartRows = getTwbeChartRowsByEmployeeName(profile.name);
  const kpiAchievement = getKpiAchievement(twbeMonthlyRows);
  const adjustedRatings = profile.bareMinimumRatings
    ? withKpiAdjustedRatings(profile.bareMinimumRatings, kpiAchievement)
    : undefined;
  const profileRows: ProfileInfoRow[] = [
    {
      label: 'Nama Lengkap',
      value: profile.name,
    },
    {
      label: 'Tanggal Lahir',
      value: profile.dateOfBirth,
    },
    {
      label: 'Umur',
      value: `${getAgeInYears(dateOfBirth)} tahun`,
    },
    {
      label: 'Level Grade',
      value: profile.levelGrade,
    },
    {
      label: 'Tanggal Bergabung',
      value: profile.joinedDate,
    },
    {
      label: 'Lama Bekerja',
      value: getWorkingDuration(joinedDate),
    },
    {
      label: 'Proyek Aktif',
      value: profile.projects,
    },
    {
      label: 'Guild Aktif',
      value: profile.guilds,
    },
  ];

  return (
    <section className={styles.profileSection} aria-labelledby={headingId}>
      <header className={styles.hero}>
        <span className={styles.badge}>Frontend Engineer Profile</span>
        <h1 id={headingId} className={styles.title}>
          {profile.name}
        </h1>
        <p className={styles.description}>
          Ringkasan profil Frontend Engineer mencakup biodata, level, pengalaman
          kerja, proyek aktif, dan guild yang sedang dijalankan.
        </p>
      </header>

      <ProfileInfoTable rows={profileRows} />

      <ProfileChartSection rows={twbeChartRows} />

      {adjustedRatings && (
        <BareMinimumSection
          ratings={adjustedRatings}
          reasons={profile.bareMinimumReasons}
          kpi={kpiAchievement}
        />
      )}

      {profile.good && profile.good.length > 0 && (
        <EvalSection title="Kelebihan" items={profile.good} variant="good" />
      )}

      {profile.needsImprove && profile.needsImprove.length > 0 && (
        <EvalSection
          title="Perlu Ditingkatkan"
          items={profile.needsImprove}
          variant="improve"
        />
      )}

      {profile.softProfile && <SoftProfileSection data={profile.softProfile} />}

      {profile.careerRoadmap && profile.careerRoadmap.length > 0 && (
        <CareerRoadmapSection
          goal={profile.careerRoadmapGoal}
          items={profile.careerRoadmap}
        />
      )}

      {profile.activities && profile.activities.length > 0 && (
        <ActivitiesSection items={profile.activities} />
      )}

      <ProfileMonthlyTable rows={twbeMonthlyRows} />

      <ProfileSprintTable rows={twbeRows} />
    </section>
  );
}
