export const WEEKS_PER_MONTH = 4;
export const TOTAL_TIMELINE_WEEKS = 24;

interface RoadmapCourseItem {
  title: string;
  url?: string;
}

interface RoadmapStageLike {
  objective: string;
  successIndicator: string;
  courseOnline: RoadmapCourseItem[];
}

const COMPLEXITY_KEYWORDS = [
  'arsitektur',
  'migrasi',
  'security',
  'hardening',
  'observability',
  'reliability',
  'coverage',
  'testing',
  'integrasi',
  'end-to-end',
  'lintas',
  'multi',
] as const;

const DELIVERABLE_KEYWORDS = [
  'dokumen',
  'template',
  'guideline',
  'playbook',
  'audit',
  'sertifikat',
  'presentasi',
  'portofolio',
] as const;

export function estimateStageDurationWeeks(stage: RoadmapStageLike): number {
  const text = `${stage.objective} ${stage.successIndicator}`.toLowerCase();
  const courseCount = stage.courseOnline.length;
  const onlineCourseCount = stage.courseOnline.filter((item) =>
    Boolean(item.url),
  ).length;

  let complexityScore = 0;
  for (const keyword of COMPLEXITY_KEYWORDS) {
    if (text.includes(keyword)) {
      complexityScore += 1;
    }
  }

  let deliverableScore = 0;
  for (const keyword of DELIVERABLE_KEYWORDS) {
    if (text.includes(keyword)) {
      deliverableScore += 1;
    }
  }

  const duration =
    2 +
    Math.min(2, courseCount) +
    Math.min(3, Math.ceil(complexityScore / 2)) +
    Math.min(1, onlineCourseCount) +
    Math.min(1, Math.ceil(deliverableScore / 3));

  return Math.max(3, Math.min(8, duration));
}

export function buildRoadmapTimeline(stages: RoadmapStageLike[]): Array<{
  weekStart: number;
  weekEnd: number;
  durationWeeks: number;
}> {
  return stages.map((stage, index) => {
    const weekStart = index * WEEKS_PER_MONTH + 1;
    const durationWeeks = estimateStageDurationWeeks(stage);
    const weekEnd = Math.min(
      weekStart + durationWeeks - 1,
      TOTAL_TIMELINE_WEEKS,
    );

    return {
      weekStart,
      weekEnd,
      durationWeeks,
    };
  });
}
