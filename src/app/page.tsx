import styles from './page.module.css';

export default function Home() {
  const engineers = [
    {
      name: 'Aulia Rahman',
      role: 'Frontend Engineer II',
      squad: 'Growth Web',
      score: 87,
      roadmap: 'On Track',
    },
    {
      name: 'Sinta Maharani',
      role: 'Frontend Engineer I',
      squad: 'Commerce Experience',
      score: 79,
      roadmap: 'Needs Attention',
    },
    {
      name: 'Dimas Pratama',
      role: 'Senior Frontend Engineer',
      squad: 'Core Platform',
      score: 91,
      roadmap: 'On Track',
    },
    {
      name: 'Nabila Putri',
      role: 'Frontend Engineer I',
      squad: 'Lifecycle',
      score: 73,
      roadmap: 'At Risk',
    },
  ];

  return (
    <main className={styles.mainContent}>
      <section
        className={styles.kpiGrid}
        id="overview"
        aria-label="Key insights"
      >
        <article className={styles.kpiCard}>
          <p className={styles.kpiLabel}>Engineers Monitored</p>
          <p className={styles.kpiValue}>24</p>
          <p className={styles.kpiMeta}>+2 sejak sprint lalu</p>
        </article>
        <article className={styles.kpiCard}>
          <p className={styles.kpiLabel}>Average Profiling Score</p>
          <p className={styles.kpiValue}>82.5</p>
          <p className={styles.kpiMeta}>Stabil dalam 3 minggu</p>
        </article>
        <article className={styles.kpiCard}>
          <p className={styles.kpiLabel}>Roadmap On Track</p>
          <p className={styles.kpiValue}>71%</p>
          <p className={styles.kpiMeta}>Target bulanan: 75%</p>
        </article>
      </section>

      <section
        className={styles.panel}
        aria-labelledby="profiling-title"
        id="profiling"
      >
        <div className={styles.panelHeader}>
          <h1 id="profiling-title">Profiling Frontend Engineer</h1>
          <p>Ringkasan kompetensi teknis dan progres per squad.</p>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className={styles.srOnly}>
              Daftar profil engineer frontend
            </caption>
            <thead>
              <tr>
                <th scope="col">Nama</th>
                <th scope="col">Role</th>
                <th scope="col">Squad</th>
                <th scope="col">Score</th>
                <th scope="col">Roadmap</th>
              </tr>
            </thead>
            <tbody>
              {engineers.map((engineer) => (
                <tr key={engineer.name}>
                  <th scope="row">{engineer.name}</th>
                  <td>{engineer.role}</td>
                  <td>{engineer.squad}</td>
                  <td>{engineer.score}</td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${
                        engineer.roadmap === 'On Track'
                          ? styles.statusGood
                          : engineer.roadmap === 'Needs Attention'
                            ? styles.statusWarn
                            : styles.statusRisk
                      }`}
                    >
                      {engineer.roadmap}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section
        className={styles.panel}
        aria-labelledby="roadmap-title"
        id="roadmap"
      >
        <div className={styles.panelHeader}>
          <h2 id="roadmap-title">Roadmap Completion</h2>
          <p>Visualisasi ringkas progres personal roadmap.</p>
        </div>
        <div className={styles.chartGrid}>
          <article className={styles.chartCard}>
            <p>Core Platform</p>
            <div
              className={styles.progressTrack}
              role="img"
              aria-label="Core Platform 88 percent"
            >
              <div className={styles.progressFill} style={{ width: '88%' }} />
            </div>
            <span>88%</span>
          </article>
          <article className={styles.chartCard}>
            <p>Growth Web</p>
            <div
              className={styles.progressTrack}
              role="img"
              aria-label="Growth Web 76 percent"
            >
              <div className={styles.progressFill} style={{ width: '76%' }} />
            </div>
            <span>76%</span>
          </article>
          <article className={styles.chartCard}>
            <p>Commerce Experience</p>
            <div
              className={styles.progressTrack}
              role="img"
              aria-label="Commerce Experience 64 percent"
            >
              <div className={styles.progressFill} style={{ width: '64%' }} />
            </div>
            <span>64%</span>
          </article>
        </div>
      </section>
    </main>
  );
}
