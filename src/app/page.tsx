import EngineerComparisonChartSection from '@/components/EngineerComparisonChartSection';
import AdaptiveTooltip from '@/components/AdaptiveTooltip';
import { getTwbeMonthlyRowsByEmployeeName } from '@/utils/twbe';
import { agmarPutraProfileData } from '@/views/Profile/AgmarPutra/AgmarPutra';
import { bagusNurSolaymanProfileData } from '@/views/Profile/BagusNurSolayman/BagusNurSolayman';
import { iNyomanArijayaPutraProfileData } from '@/views/Profile/INyomanArijayaPutra/INyomanArijayaPutra';
import { nandaYusufNurPratamaProfileData } from '@/views/Profile/NandaYusufNurPratama/NandaYusufNurPratama';
import type { BareMinimumRatings } from '@/views/Profile/ProfileView/ProfileView.types';
import { rafliRaiRizkyProfileData } from '@/views/Profile/RafliRaiRizky/RafliRaiRizky';
import styles from './page.module.css';

const profiles = [
  agmarPutraProfileData,
  bagusNurSolaymanProfileData,
  iNyomanArijayaPutraProfileData,
  nandaYusufNurPratamaProfileData,
  rafliRaiRizkyProfileData,
];

const bareMinimumColumns: Array<{
  aspect: string;
  ratingKey: keyof BareMinimumRatings;
  level1: string;
  level2: string;
  level3: string;
  level4: string;
  level5: string;
}> = [
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

const TOOLTIP_LEVELS = [
  { stars: 1, label: '★ Perlu Perhatian', key: 'level1' },
  { stars: 2, label: '★★ Berkembang', key: 'level2' },
  { stars: 3, label: '★★★ Kompeten', key: 'level3' },
  { stars: 4, label: '★★★★ Mahir', key: 'level4' },
  { stars: 5, label: '★★★★★ Unggul', key: 'level5' },
] as const;

const REFERENCE_DATE = new Date(2026, 4, 5);

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
  const summaryRows = profiles.map((profile) => {
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

    return {
      name: profile.name,
      levelGrade: profile.levelGrade,
      age: getAge(profile.dateOfBirth),
      tenure: getTenureText(profile.joinedDate),
      totalTask,
      totalWeight,
      avgBugsRatio,
      avgFinishRate,
      bareMinimumAvg: getAverageBareMinimumScore(profile.bareMinimumRatings),
      bareMinimumRatings: profile.bareMinimumRatings,
      bareMinimumReasons: profile.bareMinimumReasons,
      strengths: profile.softProfile?.strengths ?? '-',
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
                  <td>{row.strengths}</td>
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
                {bareMinimumColumns.map((column) => (
                  <th key={column.ratingKey} scope="col">
                    <div className={styles.bmAspectHeader}>
                      <span>{column.aspect}</span>
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
                                {column[key]}
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
              {summaryRows.map((row) => (
                <tr key={`${row.name}-bare-minimum`}>
                  <th scope="row">{row.name}</th>
                  {bareMinimumColumns.map((column) => (
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
    </main>
  );
}
