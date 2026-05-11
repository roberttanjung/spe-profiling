import type { StageStatus } from '@/views/Roadmap/RoadmapView.types';
import roadmapStyles from '@/views/Roadmap/RoadmapView.module.css';
import styles from './CareerRoadmapSection.module.css';
import type { CareerRoadmapSectionProps } from './CareerRoadmapSection.types';

const WEEKS_PER_STAGE = 4;

function getStageStatus(index: number): StageStatus {
  if (index === 0) {
    return 'in-progress';
  }

  return 'upcoming';
}

function toPeriodLabel(period: string): string {
  return period.replace(/\s+2026$/i, '');
}

function buildGanttRows(items: CareerRoadmapSectionProps['items']): Array<{
  stage: CareerRoadmapSectionProps['items'][number];
  index: number;
  weekStart: number;
  weekEnd: number;
}> {
  return items.map((stage, index) => {
    const weekStart = index * WEEKS_PER_STAGE + 1;
    const weekEnd = weekStart + WEEKS_PER_STAGE - 1;

    return {
      stage,
      index,
      weekStart,
      weekEnd,
    };
  });
}

function StageCourseItem({ title, url }: { title: string; url?: string }) {
  const content = (
    <span className={roadmapStyles.activityContent}>
      {url ? (
        <span
          className={`${roadmapStyles.platformBadge} ${roadmapStyles.platformUdemy}`}
        >
          Course Online
        </span>
      ) : null}
      <span className={roadmapStyles.activityMainRow}>
        <span className={roadmapStyles.activityTitle}>{title}</span>
      </span>
    </span>
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={roadmapStyles.activityLink}
        aria-label={`Buka kursus: ${title}`}
      >
        {content}
      </a>
    );
  }

  return <div className={roadmapStyles.activityItem}>{content}</div>;
}

export default function CareerRoadmapSection({
  heading,
  goal,
  items,
  headingLevel = 'h2',
  className,
}: CareerRoadmapSectionProps) {
  const HeadingTag = headingLevel;
  const roadmapGoal =
    goal ??
    `Mencapai ${items[items.length - 1]?.objective.toLowerCase() ?? 'target pengembangan karir yang terukur'}.`;
  const ganttRows = buildGanttRows(items);
  const totalTimelineWeeks = ganttRows.length * WEEKS_PER_STAGE;
  const rootClassName = className ? `${styles.root} ${className}` : styles.root;

  return (
    <section className={rootClassName}>
      <div className={roadmapStyles.hero}>
        <span className={roadmapStyles.badge}>Roadmap Karir</span>
        <HeadingTag className={roadmapStyles.title}>{heading}</HeadingTag>
        <p className={roadmapStyles.description}>{roadmapGoal}</p>
      </div>

      {items.length === 0 ? (
        <p className={styles.emptyState}>
          Belum ada data tahapan roadmap untuk profil ini.
        </p>
      ) : (
        <>
          <div className={roadmapStyles.ganttSection}>
            <div className={roadmapStyles.ganttIntro}>
              <div>
                <h3 className={roadmapStyles.ganttTitle}>Time-Based</h3>
              </div>
            </div>

            <div className={roadmapStyles.ganttWrapper}>
              <div
                className={roadmapStyles.ganttHeaderRow}
                style={{
                  gridTemplateColumns: `var(--gantt-label-col) minmax(calc(var(--gantt-week-col) * ${totalTimelineWeeks}), 1fr)`,
                }}
              >
                <div
                  className={roadmapStyles.ganttLabelCell}
                  aria-hidden="true"
                />
                <div
                  className={roadmapStyles.ganttMonthGrid}
                  style={{
                    gridTemplateColumns: `repeat(${totalTimelineWeeks}, minmax(var(--gantt-week-col), 1fr))`,
                  }}
                >
                  {items.map((stage, idx) => (
                    <div
                      key={`band-${stage.period}-${idx}`}
                      className={roadmapStyles.ganttHeaderCell}
                      style={{ gridColumn: `span ${WEEKS_PER_STAGE}` }}
                    >
                      {toPeriodLabel(stage.period)}
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={roadmapStyles.ganttWeekRow}
                style={{
                  gridTemplateColumns: `var(--gantt-label-col) minmax(calc(var(--gantt-week-col) * ${totalTimelineWeeks}), 1fr)`,
                }}
              >
                <div
                  className={roadmapStyles.ganttLabelCell}
                  aria-hidden="true"
                />
                <div
                  className={roadmapStyles.ganttWeekGrid}
                  style={{
                    gridTemplateColumns: `repeat(${totalTimelineWeeks}, minmax(var(--gantt-week-col), 1fr))`,
                  }}
                >
                  {Array.from({ length: totalTimelineWeeks }, (_, index) => (
                    <div
                      key={`gantt-week-${index + 1}`}
                      className={roadmapStyles.ganttWeekCell}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
              </div>

              {ganttRows.map((row) => (
                <div
                  key={`gantt-row-${row.stage.period}-${row.index}`}
                  className={roadmapStyles.ganttRow}
                  style={{
                    gridTemplateColumns: `var(--gantt-label-col) minmax(calc(var(--gantt-week-col) * ${totalTimelineWeeks}), 1fr)`,
                  }}
                >
                  <div
                    className={roadmapStyles.ganttLabelCell}
                    title={row.stage.objective}
                  >
                    <span className={roadmapStyles.ganttStageLabel}>
                      {`Tahap ${row.index + 1}`}
                    </span>
                  </div>
                  <div
                    className={roadmapStyles.ganttGrid}
                    style={{
                      gridTemplateColumns: `repeat(${totalTimelineWeeks}, minmax(var(--gantt-week-col), 1fr))`,
                    }}
                  >
                    {Array.from({ length: totalTimelineWeeks }, (_, index) => (
                      <div
                        key={`gantt-col-${row.index}-${index + 1}`}
                        className={`${roadmapStyles.ganttCol} ${index % 2 === 0 ? roadmapStyles.ganttColAlt : ''}`}
                      />
                    ))}
                    <div
                      className={roadmapStyles.ganttBar}
                      style={{
                        gridColumn: `${row.weekStart} / span ${WEEKS_PER_STAGE}`,
                      }}
                      title={`${row.stage.objective} · Minggu ${row.weekStart}-${row.weekEnd}`}
                    >
                      <span className={roadmapStyles.ganttBarLabel}>
                        {row.stage.objective}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={roadmapStyles.timeline}>
            {items.map((stage, idx) => {
              const status = getStageStatus(idx);

              return (
                <div
                  key={`${stage.period}-${idx}`}
                  className={roadmapStyles.timelineRow}
                >
                  <div
                    className={roadmapStyles.timelineTrack}
                    aria-hidden="true"
                  >
                    <div
                      className={`${roadmapStyles.timelineDot} ${roadmapStyles[`dot_${status.replace('-', '_')}`]}`}
                    />
                    {idx < items.length - 1 && (
                      <div
                        className={`${roadmapStyles.timelineConnector} ${roadmapStyles.connectorPending}`}
                      />
                    )}
                  </div>

                  <div className={roadmapStyles.timelineContent}>
                    <div
                      className={`${roadmapStyles.stageCard} ${roadmapStyles[`stage_${status.replace('-', '_')}`]}`}
                    >
                      <div className={roadmapStyles.stageHeader}>
                        <div className={roadmapStyles.stageMeta}>
                          <span
                            className={roadmapStyles.stageNumber}
                          >{`Tahap ${idx + 1}`}</span>
                          <span className={roadmapStyles.stagePeriod}>
                            {stage.period}
                          </span>
                        </div>
                      </div>

                      <h3 className={roadmapStyles.stageTitle}>
                        {stage.objective}
                      </h3>

                      <div className={roadmapStyles.sectionBlock}>
                        <p className={roadmapStyles.sectionLabel}>Aktivitas</p>
                        <ul className={roadmapStyles.activityList}>
                          {stage.courseOnline.map((course, courseIdx) => (
                            <li key={`${course.title}-${courseIdx}`}>
                              <StageCourseItem
                                title={course.title}
                                url={course.url}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className={roadmapStyles.sectionBlock}>
                        <p className={roadmapStyles.sectionLabel}>
                          Target Hasil
                        </p>
                        <div className={roadmapStyles.outputItem}>
                          <span className={roadmapStyles.outputLabel}>
                            {stage.successIndicator}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
