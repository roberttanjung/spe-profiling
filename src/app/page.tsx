import Link from 'next/link';
import EngineerComparisonChartSection from '@/components/EngineerComparisonChartSection';
import AdaptiveTooltip from '@/components/AdaptiveTooltip';
import { getTwbeMonthlyRowsByEmployeeName } from '@/utils/twbe';
import { engineerNavigationItems } from '@/utils/navigation';
import ProfileView from '@/views/Profile/ProfileView';
import { allEngineerProfiles, engineerProfileRegistry } from '@/views/Profile';
import {
  getEngineerRoadmapRows,
  MONTH_BANDS,
  TOTAL_TIMELINE_WEEKS,
  WEEKS_PER_MONTH,
} from '@/utils/roadmap';
import {
  BARE_MINIMUM_MATRIX,
  BARE_MINIMUM_TOOLTIP_LEVELS,
  getKpiAchievement,
  withKpiAdjustedRatings,
} from '@/db/bareMinimum';
import {
  SOFT_PROFILE_TEXT_KEYS,
  SOFT_PROFILE_TEXT_LABELS,
} from '@/db/softProfile';
import { REFERENCE_DATE } from '@/db/constants';
import type { BareMinimumRatings } from '@/views/Profile/ProfileView/ProfileView.types';
import styles from './page.module.css';

type DashboardSearchParams = {
  profile?: string;
};

function parseDate(dateText: string) {
  const [day, month, year] = dateText.split('/').map(Number);
  return new Date(year, month - 1, day);
}

function getAge(dateOfBirth: string) {
  const birthDate = parseDate(dateOfBirth);
  let age = REFERENCE_DATE.getFullYear() - birthDate.getFullYear();
  const monthDiff = REFERENCE_DATE.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && REFERENCE_DATE.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }

  return age;
}

function getTenureText(joinedDate: string) {
  const startDate = parseDate(joinedDate);
  let years = REFERENCE_DATE.getFullYear() - startDate.getFullYear();
  let months = REFERENCE_DATE.getMonth() - startDate.getMonth();

  if (REFERENCE_DATE.getDate() < startDate.getDate()) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years <= 0) {
    return `${months} bulan`;
  }

  if (months === 0) {
    return `${years} tahun`;
  }

  return `${years} tahun ${months} bulan`;
}

function getAverageBareMinimumScore(ratings?: BareMinimumRatings) {
  if (!ratings) {
    return 0;
  }

  const values = Object.values(ratings);
  return values.reduce((sum, value) => sum + value, 0) / values.length;
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

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<DashboardSearchParams> | DashboardSearchParams;
}) {
  const resolvedSearchParams = await searchParams;
  const selectedSlug =
    typeof resolvedSearchParams?.profile === 'string'
      ? resolvedSearchParams.profile
      : '';

  const engineerSlugByName = new Map(
    engineerNavigationItems.map((item) => [
      item.name,
      item.path.replace('/profile/', ''),
    ]),
  );
  const selectedEngineer = engineerProfileRegistry.find(
    (item) => item.slug === selectedSlug,
  );

  const renderEngineerName = (name: string) => {
    const slug = engineerSlugByName.get(name);

    if (!slug) {
      return name;
    }

    const isActive = selectedEngineer?.profile.name === name;

    return (
      <Link
        href={`/?profile=${encodeURIComponent(slug)}`}
        className={`${styles.engineerNameLink} ${
          isActive ? styles.engineerNameLinkActive : ''
        }`}
        scroll={false}
      >
        {name}
      </Link>
    );
  };

  const summaryRows = allEngineerProfiles.map((profile) => {
    const monthlyRows = getTwbeMonthlyRowsByEmployeeName(profile.name);
    const totalTask = monthlyRows.reduce((sum, row) => sum + row.totalTask, 0);
    const totalWeight = monthlyRows.reduce(
      (sum, row) => sum + row.totalWeight,
      0,
    );
    const avgBugsRatio =
      monthlyRows.length > 0
        ? monthlyRows.reduce((sum, row) => sum + row.bugsRatio, 0) /
          monthlyRows.length
        : 0;
    const avgFinishRate =
      monthlyRows.length > 0
        ? monthlyRows.reduce((sum, row) => sum + row.finishRate, 0) /
          monthlyRows.length
        : 0;

    const kpiAchievement = getKpiAchievement(monthlyRows);
    const adjustedRatings = profile.bareMinimumRatings
      ? withKpiAdjustedRatings(profile.bareMinimumRatings, kpiAchievement)
      : undefined;

    return {
      name: profile.name,
      levelGrade: profile.levelGrade,
      age: getAge(profile.dateOfBirth),
      tenure: getTenureText(profile.joinedDate),
      totalTask,
      totalWeight,
      avgBugsRatio,
      avgFinishRate,
      bareMinimumAvg: getAverageBareMinimumScore(adjustedRatings),
      bareMinimumRatings: adjustedRatings,
      bareMinimumReasons: profile.bareMinimumReasons,
      good: profile.good ?? [],
      needsImprove: profile.needsImprove ?? [],
      careerRoadmapGoal: profile.careerRoadmapGoal,
      characteristic: [
        profile.softProfile?.collaborationType,
        profile.softProfile?.workStyle,
      ]
        .filter((value): value is string => Boolean(value && value.trim()))
        .join(' '),
      softProfile: {
        collaborationType: profile.softProfile?.collaborationType ?? '-',
        workStyle: profile.softProfile?.workStyle ?? '-',
        strengths: profile.softProfile?.strengths ?? '-',
        developmentAreas: profile.softProfile?.developmentAreas ?? '-',
        uniqueSellingPoint: profile.softProfile?.uniqueSellingPoint ?? '-',
      },
    };
  });

  const comparisonChartRows = summaryRows.map((row) => ({
    engineerName: row.name,
    totalTask: row.totalTask,
    totalWeight: row.totalWeight,
    bugsRatio: row.avgBugsRatio,
    finishRate: row.avgFinishRate,
  }));

  const maxGoodCount = Math.max(
    ...summaryRows.map((row) => row.good.length),
    1,
  );

  const timelineGridTemplate = `repeat(${TOTAL_TIMELINE_WEEKS}, minmax(var(--roadmap-week-min), 1fr))`;

  return (
    <main className={styles.mainContent}>
      <section className={styles.panel} aria-labelledby="comparison-title">
        <div className={styles.panelHeader}>
          <h1 id="comparison-title">Summary Komparasi</h1>
          <p>
            Ringkasan komparasi identitas, level, umur, lama bekerja, dan
            karakteristik setiap engineer.
          </p>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className={styles.srOnly}>
              Tabel komparasi identitas dan skor evaluasi seluruh engineer
              frontend
            </caption>
            <thead>
              <tr>
                <th scope="col">Nama Engineer</th>
                <th scope="col">Level/Grade</th>
                <th scope="col">Umur</th>
                <th scope="col">Lama bekerja</th>
                <th scope="col" className={styles.whiteSpaceNowrap}>
                  Bare Minimum Avg
                </th>
                <th scope="col">Karakteristik</th>
              </tr>
            </thead>
            <tbody>
              {summaryRows.map((row) => (
                <tr key={row.name}>
                  <th scope="row">{renderEngineerName(row.name)}</th>
                  <td>{row.levelGrade}</td>
                  <td className={styles.whiteSpaceNowrap}>{row.age} tahun</td>
                  <td className={styles.whiteSpaceNowrap}>{row.tenure}</td>
                  <td className={styles.whiteSpaceNowrap}>
                    {row.bareMinimumAvg.toFixed(2)} / 5
                  </td>
                  <td>{row.characteristic || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.panel} aria-labelledby="aspek-profil-title">
        <div className={styles.panelHeader}>
          <h2 id="aspek-profil-title">Aspek Profil Komparasi</h2>
          <p>
            Karakteristik kerja dan potensi kontribusi setiap engineer melalui
            profil soft skill, gaya kolaborasi, dan unique selling point.
          </p>
        </div>
        <div className={styles.tableWrap}>
          <table className={`${styles.table} ${styles.profileAspectTable}`}>
            <caption className={styles.srOnly}>
              Tabel komparasi aspek profil seluruh engineer frontend
            </caption>
            <thead>
              <tr>
                <th scope="col">Nama Engineer</th>
                {SOFT_PROFILE_TEXT_KEYS.map((key) => (
                  <th key={key} scope="col">
                    {SOFT_PROFILE_TEXT_LABELS[key]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {summaryRows.map((row) => (
                <tr key={`${row.name}-aspek-profil`}>
                  <th scope="row">{renderEngineerName(row.name)}</th>
                  {SOFT_PROFILE_TEXT_KEYS.map((key) => (
                    <td key={key}>{row.softProfile[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section
        className={`${styles.panel} ${styles.panelBareMinimum}`}
        aria-labelledby="bare-minimum-title"
      >
        <div className={styles.panelHeader}>
          <h2 id="bare-minimum-title">Bare Minimum Frontend Engineer</h2>
          <p>
            Evaluasi kualitas kompeten setiap engineer berdasarkan tujuh aspek
            penilaian fundamental frontend.
          </p>
        </div>
        <div className={`${styles.tableWrap} ${styles.tableWrapBareMinimum}`}>
          <table className={`${styles.table} ${styles.bareMinimumTable}`}>
            <caption className={styles.srOnly}>
              Tabel bare minimum seluruh engineer frontend
            </caption>
            <thead>
              <tr>
                <th scope="col">Nama Engineer</th>
                {BARE_MINIMUM_MATRIX.map((column) => (
                  <th key={column.ratingKey} scope="col">
                    <div className={styles.bmAspectHeader}>
                      <span>{column.aspect}</span>
                      <AdaptiveTooltip
                        preferredSide="bottom"
                        maxWidth={240}
                        className={styles.bmTooltip}
                        content={
                          <>
                            {BARE_MINIMUM_TOOLTIP_LEVELS.map(
                              ({ stars, label, key }) => (
                                <span
                                  key={stars}
                                  className={styles.bmTooltipRow}
                                >
                                  <span className={styles.bmTooltipLabel}>
                                    {label}
                                  </span>
                                  {column[key]}
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
              {summaryRows.map((row) => (
                <tr key={`${row.name}-bare-minimum`}>
                  <th scope="row">{renderEngineerName(row.name)}</th>
                  {BARE_MINIMUM_MATRIX.map((column) => (
                    <td key={column.ratingKey} className={styles.starsCell}>
                      {row.bareMinimumRatings ? (
                        <StarRating
                          count={row.bareMinimumRatings[column.ratingKey]}
                          reason={
                            row.bareMinimumReasons?.[column.ratingKey] ??
                            'Belum ada catatan penilaian untuk aspek ini.'
                          }
                        />
                      ) : (
                        '-'
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.panel} aria-labelledby="kelebihan-title">
        <div className={styles.panelHeader}>
          <h2 id="kelebihan-title">Kelebihan Komparasi</h2>
          <p>
            Komparasi kelebihan utama setiap engineer dalam format tabel
            terstruktur untuk memudahkan perbandingan antar profil.
          </p>
        </div>
        <div className={styles.tableWrap}>
          <table className={`${styles.table} ${styles.profileAspectTable}`}>
            <caption className={styles.srOnly}>
              Tabel kelebihan seluruh engineer frontend
            </caption>
            <thead>
              <tr>
                {summaryRows.map((row) => (
                  <th key={`${row.name}-good-header`} scope="col">
                    {renderEngineerName(row.name)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: maxGoodCount }, (_, pointIndex) => (
                <tr key={`good-point-row-${pointIndex + 1}`}>
                  {summaryRows.map((row) => {
                    const item = row.good[pointIndex];

                    if (!item) {
                      return (
                        <td key={`${row.name}-good-empty-${pointIndex}`}>-</td>
                      );
                    }

                    return (
                      <td key={`${row.name}-good-${pointIndex}`}>
                        <strong>{item.title}</strong>
                        <br />
                        {item.description}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.panel} aria-labelledby="roadmap-title">
        <div className={styles.panelHeader}>
          <h2 id="roadmap-title">Roadmap Karir Komparasi</h2>
          <p>
            Timeline pengembangan karir setiap engineer untuk periode
            Juni-November 2026 dalam format Gantt chart.
          </p>
        </div>
        <div className={styles.roadmapGanttWrapper}>
          <div
            className={styles.roadmapGanttHeaderRow}
            style={{
              gridTemplateColumns: `var(--roadmap-label-col) minmax(calc(var(--roadmap-week-min) * ${TOTAL_TIMELINE_WEEKS}), 1fr)`,
            }}
          >
            <div className={styles.roadmapGanttLabelCell} aria-hidden="true" />
            <div
              className={styles.roadmapGanttHeaderGrid}
              style={{
                gridTemplateColumns: timelineGridTemplate,
              }}
            >
              {MONTH_BANDS.map((band, monthIndex) => {
                const monthColumnStart = monthIndex * WEEKS_PER_MONTH + 1;

                return (
                  <div
                    key={`band-${band.month}`}
                    className={styles.roadmapGanttHeaderCell}
                    title={`${band.month} 2026`}
                    style={{
                      gridColumn: `${monthColumnStart} / span ${WEEKS_PER_MONTH}`,
                    }}
                  >
                    <span className={styles.roadmapGanttHeaderMonth}>
                      {band.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className={styles.roadmapGanttWeekRow}
            style={{
              gridTemplateColumns: `var(--roadmap-label-col) minmax(calc(var(--roadmap-week-min) * ${TOTAL_TIMELINE_WEEKS}), 1fr)`,
            }}
          >
            <div className={styles.roadmapGanttLabelCell} aria-hidden="true" />
            <div
              className={styles.roadmapGanttWeekGrid}
              style={{
                gridTemplateColumns: timelineGridTemplate,
              }}
            >
              {Array.from({ length: TOTAL_TIMELINE_WEEKS }, (_, weekIndex) => (
                <div
                  key={`week-${weekIndex + 1}`}
                  className={styles.roadmapGanttWeekCell}
                >
                  {(weekIndex % WEEKS_PER_MONTH) + 1}
                </div>
              ))}
            </div>
          </div>

          {getEngineerRoadmapRows().map((engineerRow, engineerIndex) => (
            <div
              key={`engineer-${engineerRow.engineerName}`}
              className={styles.roadmapEngineerGroup}
            >
              <div
                className={styles.roadmapEngineerName}
                style={{
                  gridTemplateColumns: `var(--roadmap-label-col) minmax(calc(var(--roadmap-week-min) * ${TOTAL_TIMELINE_WEEKS}), 1fr)`,
                }}
              >
                <div className={styles.roadmapEngineerBadge}>
                  {renderEngineerName(engineerRow.engineerName)}
                </div>
                <div
                  className={styles.roadmapEngineerSpacer}
                  aria-hidden="true"
                />
              </div>

              {engineerRow.stages.map((stage, stageIndex) => {
                const monthOffset = (stage.monthNumber - 1) * WEEKS_PER_MONTH;
                const gridColumnStart = monthOffset + stage.weekStart;
                const gridColumnSpan = stage.weekEnd - stage.weekStart + 1;

                return (
                  <div
                    key={`stage-${engineerRow.engineerName}-${stageIndex}`}
                    className={styles.roadmapGanttRow}
                    style={{
                      gridTemplateColumns: `var(--roadmap-label-col) minmax(calc(var(--roadmap-week-min) * ${TOTAL_TIMELINE_WEEKS}), 1fr)`,
                    }}
                  >
                    <div
                      className={styles.roadmapGanttLabelCell}
                      title={stage.objective}
                    >
                      <span className={styles.roadmapGanttStageLabel}>
                        {`Tahap ${stage.stageIndex + 1}`}
                      </span>
                    </div>
                    <div
                      className={styles.roadmapGanttGrid}
                      style={{
                        gridTemplateColumns: timelineGridTemplate,
                      }}
                    >
                      {Array.from(
                        { length: TOTAL_TIMELINE_WEEKS },
                        (_, index) => (
                          <div
                            key={`gantt-col-${engineerIndex}-${stageIndex}-${index + 1}`}
                            className={`${styles.roadmapGanttCol} ${index % 2 === 0 ? styles.roadmapGanttColAlt : ''}`}
                          />
                        ),
                      )}
                      <div
                        className={`${styles.roadmapGanttBar} ${styles[`roadmapBar_engineer${engineerIndex}`]}`}
                        style={{
                          gridColumn: `${gridColumnStart} / span ${gridColumnSpan}`,
                        }}
                        title={`${stage.objective} · Minggu ${stage.weekStart}-${stage.weekEnd}`}
                      >
                        <span className={styles.roadmapGanttBarLabel}>
                          {stage.objective}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      <section
        className={`${styles.panel} ${styles.panelComparison}`}
        aria-labelledby="chart-comparison-title"
      >
        <div className={styles.panelHeader}>
          <h2 id="chart-comparison-title">Performa TWBE Komparasi</h2>
          <p>
            Data performa TWBE setiap engineer periode September 2025 - April
            2026 dalam komparasi visual.
          </p>
        </div>
        <EngineerComparisonChartSection rows={comparisonChartRows} />
      </section>

      {selectedEngineer ? (
        <div className={styles.profileOverlay}>
          <section
            className={styles.profilePanel}
            role="dialog"
            aria-modal="true"
            aria-label={`Profile ${selectedEngineer.profile.name}`}
          >
            <div className={styles.profilePanelHeader}>
              <Link
                href="/"
                className={styles.profilePanelClose}
                aria-label="Tutup panel profile"
                scroll={false}
              >
                X
              </Link>
              <h2 className={styles.profilePanelTitle}>
                {selectedEngineer.profile.name}
              </h2>
            </div>
            <div className={styles.profilePanelBody}>
              <ProfileView
                profile={selectedEngineer.profile}
                headingId={`dashboard-profile-${selectedEngineer.slug}`}
              />
            </div>
          </section>
        </div>
      ) : null}
    </main>
  );
}
