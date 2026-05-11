import Link from 'next/link';
import EngineerComparisonChartSection from '@/components/EngineerComparisonChartSection';
import AdaptiveTooltip from '@/components/AdaptiveTooltip';
import { getTwbeMonthlyRowsByEmployeeName } from '@/utils/twbe';
import { engineerNavigationItems } from '@/utils/navigation';
import { allEngineerProfiles } from '@/views/Profile';
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

export default function Home() {
  const engineerPathByName = new Map(
    engineerNavigationItems.map((item) => [item.name, item.path]),
  );

  const renderEngineerName = (name: string) => {
    const path = engineerPathByName.get(name);

    if (!path) {
      return name;
    }

    return (
      <Link href={path} className={styles.engineerNameLink}>
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

  return (
    <main className={styles.mainContent}>
      <section className={styles.panel} aria-labelledby="comparison-title">
        <div className={styles.panelHeader}>
          <h1 id="comparison-title">Summary Komparasi</h1>
          <p>
            Ringkasan komparasi identitas, level, umur, lama bekerja, dan skor
            evaluasi kualitas setiap engineer.
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
                <th scope="col">Kelebihan Utama</th>
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
                  <td>{row.softProfile.strengths}</td>
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
            Daftar kelebihan utama setiap engineer berdasarkan evaluasi kinerja
            dan pola kontribusi selama periode profiling.
          </p>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className={styles.srOnly}>
              Tabel kelebihan seluruh engineer frontend
            </caption>
            <thead>
              <tr>
                <th scope="col">Nama Engineer</th>
                <th scope="col">Kelebihan</th>
              </tr>
            </thead>
            <tbody>
              {summaryRows.map((row) => (
                <tr key={`${row.name}-good`}>
                  <th scope="row">{renderEngineerName(row.name)}</th>
                  <td>
                    {row.good.length > 0 ? (
                      <ul className={styles.evalList}>
                        {row.good.map((item) => (
                          <li key={item.title} className={styles.evalListItem}>
                            <strong>{item.title}</strong>
                            <span>{item.description}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.panel} aria-labelledby="needs-improve-title">
        <div className={styles.panelHeader}>
          <h2 id="needs-improve-title">Area Pengembangan Komparasi</h2>
          <p>
            Hal-hal yang perlu ditingkatkan setiap engineer sebagai bagian dari
            rencana pengembangan diri yang berkelanjutan.
          </p>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className={styles.srOnly}>
              Tabel area pengembangan seluruh engineer frontend
            </caption>
            <thead>
              <tr>
                <th scope="col">Nama Engineer</th>
                <th scope="col">Perlu Ditingkatkan</th>
              </tr>
            </thead>
            <tbody>
              {summaryRows.map((row) => (
                <tr key={`${row.name}-improve`}>
                  <th scope="row">{renderEngineerName(row.name)}</th>
                  <td>
                    {row.needsImprove.length > 0 ? (
                      <ul className={styles.evalList}>
                        {row.needsImprove.map((item) => (
                          <li key={item.title} className={styles.evalListItem}>
                            <strong>{item.title}</strong>
                            <span>{item.description}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.panel} aria-labelledby="roadmap-title">
        <div className={styles.panelHeader}>
          <h2 id="roadmap-title">Career Trajectory Komparasi</h2>
          <p>
            Tujuan karir setiap engineer sebagai gambaran arah pengembangan
            jangka menengah dalam periode profiling.
          </p>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className={styles.srOnly}>
              Tabel career trajectory seluruh engineer frontend
            </caption>
            <thead>
              <tr>
                <th scope="col">Nama Engineer</th>
                <th scope="col">Tujuan Karir</th>
              </tr>
            </thead>
            <tbody>
              {summaryRows.map((row) => (
                <tr key={`${row.name}-roadmap`}>
                  <th scope="row">{renderEngineerName(row.name)}</th>
                  <td>{row.careerRoadmapGoal ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
    </main>
  );
}
