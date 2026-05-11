import EngineerComparisonChartSection from '@/components/EngineerComparisonChartSection';
import AdaptiveTooltip from '@/components/AdaptiveTooltip';
import { getTwbeMonthlyRowsByEmployeeName } from '@/utils/twbe';
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
      <EngineerComparisonChartSection rows={comparisonChartRows} />

      <section
        className={`${styles.panel} ${styles.panelBareMinimum}`}
        aria-labelledby="bare-minimum-title"
      >
        <div className={styles.panelHeader}>
          <h2 id="bare-minimum-title">Bare Minimum Frontend Engineer</h2>
          <p>
            Komparasi nilai Bare Minimum setiap engineer berdasarkan tujuh aspek
            penilaian.
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
                  <th scope="row">{row.name}</th>
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

      <section className={styles.panel} aria-labelledby="aspek-profil-title">
        <div className={styles.panelHeader}>
          <h2 id="aspek-profil-title">Aspek Profil Komparasi</h2>
          <p>
            Komparasi aspek profil soft masing-masing engineer untuk melihat
            pola kerja dan potensi kontribusi.
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
                  <th scope="row">{row.name}</th>
                  {SOFT_PROFILE_TEXT_KEYS.map((key) => (
                    <td key={key}>{row.softProfile[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.panel} aria-labelledby="comparison-title">
        <div className={styles.panelHeader}>
          <h1 id="comparison-title">Summary Komparasi</h1>
          <p>
            Ringkasan komparasi aspek profil menggunakan referensi level, umur,
            dan lama bekerja.
          </p>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className={styles.srOnly}>
              Tabel komparasi aspek profil seluruh engineer frontend
            </caption>
            <thead>
              <tr>
                <th scope="col">Nama Engineer</th>
                <th scope="col">Level/Grade</th>
                <th scope="col">Umur</th>
                <th scope="col">Lama bekerja</th>
                <th scope="col">Bare Minimum Avg</th>
                <th scope="col">Kelebihan Utama</th>
              </tr>
            </thead>
            <tbody>
              {summaryRows.map((row) => (
                <tr key={row.name}>
                  <th scope="row">{row.name}</th>
                  <td>{row.levelGrade}</td>
                  <td>{row.age} tahun</td>
                  <td>{row.tenure}</td>
                  <td>{row.bareMinimumAvg.toFixed(2)} / 5</td>
                  <td>{row.softProfile.strengths}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
