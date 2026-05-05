import type { RoadmapStage } from './RoadmapView.types';
import styles from './RoadmapView.module.css';

const PILLAR_COLOR: Record<string, string> = {
  Discipline: '#1d6e49',
  Resilience: '#b45309',
  Collaboration: '#0e6fa7',
  'Smart Working': '#6d28d9',
  'Growth Mindset': '#be185d',
};

const roadmapStages: RoadmapStage[] = [
  {
    id: 1,
    title: 'Fondasi Kepemimpinan Manajerial',
    period: 'Jun W1 - Jun W2 2026',
    focus:
      'Membangun pola pikir manajerial yang lebih abstrak dan adaptif, bergerak dari mindset teknis menuju perspektif kepemimpinan.',
    pillars: ['Growth Mindset', 'Discipline'],
    activities: [
      {
        platform: 'Udemy',
        courseTitle: 'Leadership: Practical Leadership Skills',
        courseUrl: 'https://www.udemy.com/course/practical-leadership/',
        courseHours: 3,
      },
      {
        platform: 'Udemy',
        courseTitle: 'Leadership: Leading When You Are Not In Charge!',
        courseUrl:
          'https://www.udemy.com/course/leadership-leading-not-in-charge/',
        courseHours: 3,
      },
    ],
    outputs: [
      {
        type: 'certificate',
        label: 'Leadership: Practical Leadership Skills Certificate',
        issuer: 'Udemy',
      },
    ],
    status: 'in-progress',
  },
  {
    id: 2,
    title: 'Komunikasi & Terminologi Manajerial',
    period: 'Jun W3 - Sep W3 2026',
    focus:
      'Memperkaya kosakata dan pemahaman terminologi manajerial agar komunikasi dan pengambilan keputusan menjadi lebih presisi.',
    pillars: ['Collaboration', 'Smart Working'],
    activities: [
      {
        platform: 'Udemy',
        courseTitle: 'The Complete Communication Skills Master Class for Life',
        courseUrl:
          'https://www.udemy.com/course/the-complete-communication-skills-master-class-for-life/',
        courseHours: 36.5,
      },
      {
        platform: 'Udemy',
        courseTitle:
          'Management Skills Training for New & Experienced Managers',
        courseUrl:
          'https://www.udemy.com/course/the-new-manager-managing-people-teams-processes/',
        courseHours: 12,
      },
    ],
    outputs: [
      {
        type: 'certificate',
        label: 'Communication Skills Certificate',
        issuer: 'Udemy',
      },
    ],
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'Analytical Thinking & Keputusan Strategis',
    period: 'Sep W4 - Okt W2 2026',
    focus:
      'Meningkatkan kemampuan analytical thinking untuk pengambilan keputusan strategis yang lebih terstruktur dan berbasis data.',
    pillars: ['Smart Working', 'Growth Mindset'],
    activities: [
      {
        platform: 'Udemy',
        courseTitle: 'Master Your Decision Making and Critical Thinking Skills',
        courseUrl:
          'https://www.udemy.com/course/leadership-science-for-decision-making/',
        courseHours: 5.5,
      },
      {
        platform: 'Udemy',
        courseTitle: 'Critical Thinking Strategies For Better Decisions',
        courseUrl: 'https://www.udemy.com/course/critical-thinking-strategies/',
        courseHours: 1,
      },
    ],
    outputs: [
      {
        type: 'certificate',
        label: 'Critical Thinking Masterclass Certificate',
        issuer: 'Udemy',
      },
      {
        type: 'document',
        label: 'Kerangka Keputusan Tim Frontend (Internal Doc)',
        issuer: 'Internal',
      },
    ],
    status: 'upcoming',
  },
  {
    id: 4,
    title: 'Kepemimpinan Tim & Agile Leadership',
    period: 'Okt W3 - Nov W2 2026',
    focus:
      'Mematangkan transisi dari fokus teknis ke perspektif kepemimpinan yang lebih luas dengan pendekatan Agile.',
    pillars: ['Discipline', 'Resilience', 'Collaboration'],
    activities: [
      {
        platform: 'Udemy',
        courseTitle: 'Management Skills Certification Course (Now with AI!)',
        courseUrl: 'https://www.udemy.com/course/new-manager-training/',
        courseHours: 5,
      },
      {
        platform: 'Udemy',
        courseTitle: 'Scrum Master Certification: Agile Project Management',
        courseUrl:
          'https://www.udemy.com/course/scrum-training-scrum-master-certification-agile-project-management/',
        courseHours: 5.5,
      },
    ],
    outputs: [
      {
        type: 'certificate',
        label: 'Professional Scrum Master I (PSM I)',
        issuer: 'Scrum.org',
      },
    ],
    status: 'upcoming',
  },
  {
    id: 5,
    title: 'Konsolidasi & Portfolio Kepemimpinan',
    period: 'Nov W3 - Des W4 2026',
    focus:
      'Mengintegrasikan seluruh kompetensi yang dibangun sepanjang 2026 ke dalam portfolio kepemimpinan yang terukur dan terdokumentasi.',
    pillars: [
      'Discipline',
      'Resilience',
      'Collaboration',
      'Smart Working',
      'Growth Mindset',
    ],
    activities: [
      {
        platform: 'Udemy',
        courseTitle: 'MBA in a Box: Business Lessons from a CEO',
        courseUrl:
          'https://www.udemy.com/course/mba-in-a-box-business-lessons-from-a-ceo/',
        courseHours: 11.5,
      },
      {
        platform: 'Internal',
        courseTitle: 'Penyusunan SPV Leadership Portfolio 2026',
      },
    ],
    outputs: [
      {
        type: 'document',
        label: 'SPV Leadership Portfolio 2026 (Dokumen Formal)',
        issuer: 'Internal — SPE',
      },
      {
        type: 'certificate',
        label: 'Strategic Planning & Management Certificate',
        issuer: 'Udemy',
      },
    ],
    status: 'upcoming',
  },
];

const WEEKLY_STUDY_HOURS = 3;
const TOTAL_TIMELINE_WEEKS = 30;
const MONTH_BANDS: Array<{ label: string; span: number }> = [
  { label: 'Jun', span: 4 },
  { label: 'Jul', span: 4 },
  { label: 'Agu', span: 5 },
  { label: 'Sep', span: 4 },
  { label: 'Okt', span: 4 },
  { label: 'Nov', span: 4 },
  { label: 'Des', span: 5 },
];

function getStageUdemyHours(stage: RoadmapStage): number {
  return stage.activities
    .filter((activity) => activity.platform === 'Udemy')
    .reduce((sum, activity) => sum + (activity.courseHours ?? 0), 0);
}

function GanttChart() {
  const timelineRows = roadmapStages.map((stage, idx, arr) => {
    const previousWeeks = arr
      .slice(0, idx)
      .reduce(
        (sum, prev) =>
          sum +
          Math.max(1, Math.ceil(getStageUdemyHours(prev) / WEEKLY_STUDY_HOURS)),
        0,
      );

    const durationWeeks = Math.max(
      1,
      Math.ceil(getStageUdemyHours(stage) / WEEKLY_STUDY_HOURS),
    );

    return {
      stage,
      durationWeeks,
      weekStart: previousWeeks + 1,
      weekEnd: previousWeeks + durationWeeks,
      udemyHours: getStageUdemyHours(stage),
    };
  });

  return (
    <div className={styles.ganttSection}>
      <div className={styles.ganttWrapper}>
        <div className={styles.ganttHeaderRow}>
          <div className={styles.ganttLabelCell} aria-hidden="true" />
          <div className={styles.ganttMonthGrid}>
            {MONTH_BANDS.map((band) => (
              <div
                key={band.label}
                className={styles.ganttHeaderCell}
                style={{ gridColumn: `span ${band.span}` }}
              >
                {band.label}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.ganttWeekRow}>
          <div className={styles.ganttLabelCell} aria-hidden="true" />
          <div className={styles.ganttWeekGrid}>
            {Array.from({ length: TOTAL_TIMELINE_WEEKS }, (_, idx) => (
              <div key={`week-${idx + 1}`} className={styles.ganttWeekCell}>
                {idx + 1}
              </div>
            ))}
          </div>
        </div>

        {timelineRows.map((row) => {
          const { stage, durationWeeks, weekStart, weekEnd, udemyHours } = row;
          return (
            <div key={stage.id} className={styles.ganttRow}>
              <div className={styles.ganttLabelCell} title={stage.title}>
                <span className={styles.ganttStageLabel}>Tahap {stage.id}</span>
              </div>
              <div className={styles.ganttGrid}>
                {Array.from({ length: TOTAL_TIMELINE_WEEKS }, (_, idx) => (
                  <div
                    key={`bg-${stage.id}-${idx + 1}`}
                    className={`${styles.ganttCol} ${idx % 2 === 0 ? styles.ganttColAlt : ''}`}
                  />
                ))}
                <div
                  className={styles.ganttBar}
                  style={{
                    gridColumn: `${weekStart} / span ${durationWeeks}`,
                  }}
                  title={`${stage.title} · ${udemyHours.toFixed(1)} jam · Minggu ${weekStart}-${weekEnd}`}
                >
                  <span className={styles.ganttBarLabel}>{stage.title}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PillarTag({ pillar }: { pillar: string }) {
  const color = PILLAR_COLOR[pillar] ?? '#1d6e49';
  return (
    <span
      className={styles.pillarTag}
      style={
        {
          '--pillar-color': color,
        } as React.CSSProperties
      }
    >
      {pillar}
    </span>
  );
}

function ActivityItem({
  activity,
}: {
  activity: RoadmapStage['activities'][number];
}) {
  const content = (
    <span className={styles.activityContent}>
      <span
        className={`${styles.platformBadge} ${
          activity.platform === 'Udemy'
            ? styles.platformUdemy
            : styles.platformInternal
        }`}
      >
        {activity.platform}
      </span>
      <span className={styles.activityTitle}>{activity.courseTitle}</span>
    </span>
  );

  if (activity.courseUrl) {
    return (
      <a
        href={activity.courseUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.activityLink}
        aria-label={`Buka kursus: ${activity.courseTitle}`}
      >
        {content}
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={styles.externalIcon}
        >
          <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3ZM5 5h6V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-2v6H5V5Z" />
        </svg>
      </a>
    );
  }

  return <div className={styles.activityItem}>{content}</div>;
}

function OutputItem({ output }: { output: RoadmapStage['outputs'][number] }) {
  const icon =
    output.type === 'certificate' ? (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.outputIcon}>
        <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4Zm0 4 5 2.18V11c0 3.5-2.33 6.79-5 7.93-2.67-1.14-5-4.43-5-7.93V7.18L12 5Z" />
      </svg>
    ) : (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.outputIcon}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm4 18H6V4h7v5h5v11ZM8 15h8v2H8v-2Zm0-4h8v2H8v-2Z" />
      </svg>
    );

  return (
    <div className={styles.outputItem}>
      {icon}
      <div>
        <span className={styles.outputLabel}>{output.label}</span>
        {output.issuer && (
          <span className={styles.outputIssuer}>{output.issuer}</span>
        )}
      </div>
    </div>
  );
}

function StageCard({ stage }: { stage: RoadmapStage }) {
  return (
    <div
      className={`${styles.stageCard} ${styles[`stage_${stage.status.replace('-', '_')}`]}`}
    >
      <div className={styles.stageHeader}>
        <div className={styles.stageMeta}>
          <span className={styles.stageNumber}>Tahap {stage.id}</span>
          <span className={styles.stagePeriod}>{stage.period}</span>
        </div>
      </div>

      <h3 className={styles.stageTitle}>{stage.title}</h3>
      <p className={styles.stageFocus}>{stage.focus}</p>

      <div className={styles.pillarRow}>
        {stage.pillars.map((pillar) => (
          <PillarTag key={pillar} pillar={pillar} />
        ))}
      </div>

      <div className={styles.sectionBlock}>
        <p className={styles.sectionLabel}>Aktivitas</p>
        <ul className={styles.activityList}>
          {stage.activities.map((activity, idx) => (
            <li key={idx}>
              <ActivityItem activity={activity} />
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.sectionBlock}>
        <p className={styles.sectionLabel}>Output</p>
        <ul className={styles.outputList}>
          {stage.outputs.map((output, idx) => (
            <li key={idx}>
              <OutputItem output={output} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function RoadmapView() {
  return (
    <div className={styles.roadmapSection}>
      <div className={styles.hero}>
        <span className={styles.badge}>SPV Roadmap 2026</span>
        <h1 className={styles.title}>Roadmap Kepemimpinan</h1>
        <p className={styles.description}>
          Rencana pengembangan diri sebagai Supervisor Frontend Engineer
          sepanjang 2026, berfokus pada transisi dari pola pikir teknis menuju
          kepemimpinan strategis sesuai nilai <strong>DR Cosma Grom</strong>.
        </p>
      </div>

      <GanttChart />

      <div className={styles.timeline}>
        {roadmapStages.map((stage, idx) => (
          <div key={stage.id} className={styles.timelineRow}>
            <div className={styles.timelineTrack} aria-hidden="true">
              <div
                className={`${styles.timelineDot} ${
                  styles[`dot_${stage.status.replace('-', '_')}`]
                }`}
              />
              {idx < roadmapStages.length - 1 && (
                <div
                  className={`${styles.timelineConnector} ${
                    stage.status === 'completed'
                      ? styles.connectorCompleted
                      : styles.connectorPending
                  }`}
                />
              )}
            </div>
            <div className={styles.timelineContent}>
              <StageCard stage={stage} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
