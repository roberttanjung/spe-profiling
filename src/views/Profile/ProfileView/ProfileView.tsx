import type { ProfileInfoRow } from '@/components/ProfileInfoTable';
import ProfileInfoTable from '@/components/ProfileInfoTable';
import ProfileChartSection from '@/components/ProfileChartSection';
import ProfileMonthlyTable from '@/components/ProfileMonthlyTable';
import ProfileSprintTable from '@/components/ProfileSprintTable';
import AdaptiveTooltip from '@/components/AdaptiveTooltip';
import CareerRoadmapSectionComponent from '@/components/CareerRoadmapSection';
import {
  getTwbeChartRowsByEmployeeName,
  getTwbeMonthlyRowsByEmployeeName,
  getTwbeSprintRowsByEmployeeName,
} from '@/utils/twbe';
import {
  BARE_MINIMUM_MATRIX,
  BARE_MINIMUM_TOOLTIP_LEVELS,
  getKpiAchievement,
  withKpiAdjustedRatings,
  type KpiAchievement,
} from '@/db/bareMinimum';
import {
  SOFT_PROFILE_TEXT_KEYS,
  SOFT_PROFILE_TEXT_LABELS,
} from '@/db/softProfile';
import { REFERENCE_DATE } from '@/db/constants';
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

function parseDateInDdMmYyyy(dateText: string): Date {
  const [day, month, year] = dateText.split('/').map(Number);
  return new Date(year, month - 1, day);
}

function getAgeInYears(dateOfBirth: Date): number {
  let years = REFERENCE_DATE.getFullYear() - dateOfBirth.getFullYear();
  const hasNotHadBirthdayThisYear =
    REFERENCE_DATE.getMonth() < dateOfBirth.getMonth() ||
    (REFERENCE_DATE.getMonth() === dateOfBirth.getMonth() &&
      REFERENCE_DATE.getDate() < dateOfBirth.getDate());

  if (hasNotHadBirthdayThisYear) {
    years -= 1;
  }

  return years;
}

function getWorkingDuration(joinedDate: Date): string {
  let years = REFERENCE_DATE.getFullYear() - joinedDate.getFullYear();
  let months = REFERENCE_DATE.getMonth() - joinedDate.getMonth();

  if (REFERENCE_DATE.getDate() < joinedDate.getDate()) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return `${years} tahun ${months} bulan`;
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

function CareerRoadmapSection({
  goal,
  items,
}: {
  goal?: string;
  items: ProfileRoadmapStage[];
  name: string;
}) {
  return (
    <CareerRoadmapSectionComponent
      headingLevel="h3"
      heading={`Roadmap Karir`}
      goal={goal}
      items={items}
      description=""
    />
  );
}

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
                          {BARE_MINIMUM_TOOLTIP_LEVELS.map(
                            ({ stars, label, key }) => (
                              <span key={stars} className={styles.bmTooltipRow}>
                                <span className={styles.bmTooltipLabel}>
                                  {label}
                                </span>
                                {row[key]}
                              </span>
                            ),
                          )}
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

      {profile.softProfile && <SoftProfileSection data={profile.softProfile} />}

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

      {profile.careerRoadmap && profile.careerRoadmap.length > 0 && (
        <CareerRoadmapSection
          goal={profile.careerRoadmapGoal}
          items={profile.careerRoadmap}
          name={profile.name}
        />
      )}

      {profile.activities && profile.activities.length > 0 && (
        <ActivitiesSection items={profile.activities} />
      )}

      <ProfileChartSection rows={twbeChartRows} />

      <ProfileMonthlyTable rows={twbeMonthlyRows} />

      <ProfileSprintTable rows={twbeRows} />
    </section>
  );
}
