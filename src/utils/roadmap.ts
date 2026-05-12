import { allEngineerProfiles } from '@/views/Profile';
import type { ProfileRoadmapStage } from '@/views/Profile/ProfileView/ProfileView.types';

export const MONTH_BANDS = [
  { label: 'Juni', month: 'Juni', monthNumber: 1 },
  { label: 'Juli', month: 'Juli', monthNumber: 2 },
  { label: 'Agustus', month: 'Agustus', monthNumber: 3 },
  { label: 'September', month: 'September', monthNumber: 4 },
  { label: 'Oktober', month: 'Oktober', monthNumber: 5 },
  { label: 'November', month: 'November', monthNumber: 6 },
];

export const WEEKS_PER_MONTH = 4;
export const TOTAL_TIMELINE_WEEKS = 24;

export interface EngineerRoadmapStageRow {
  stageIndex: number;
  period: string;
  objective: string;
  courseOnline: Array<{ title: string; url?: string }>;
  successIndicator: string;
  weekStart: number;
  weekEnd: number;
  monthNumber: number;
}

export interface EngineerRoadmapRow {
  engineerName: string;
  stages: EngineerRoadmapStageRow[];
}

export function getEngineerRoadmapRows(): EngineerRoadmapRow[] {
  return allEngineerProfiles
    .filter(
      (profile) => profile.careerRoadmap && profile.careerRoadmap.length > 0,
    )
    .map((profile) => {
      const stages = profile.careerRoadmap!.map((stage, stageIndex) => {
        const { weekStart, weekEnd, monthNumber } = getWeekRangeForPeriod(
          stage.period,
        );
        return {
          stageIndex,
          period: stage.period,
          objective: stage.objective,
          courseOnline: stage.courseOnline,
          successIndicator: stage.successIndicator,
          weekStart,
          weekEnd,
          monthNumber,
        };
      });

      return {
        engineerName: profile.name,
        stages,
      };
    });
}

export function getWeekRangeForPeriod(period: string): {
  weekStart: number;
  weekEnd: number;
  monthNumber: number;
} {
  const periodLower = period.toLowerCase().trim();

  // Extract month name from period string
  const monthMatch = periodLower.match(
    /\b(juni|juli|agustus|september|oktober|november)\b/,
  );
  if (!monthMatch) {
    return { weekStart: 1, weekEnd: 4, monthNumber: 1 };
  }

  const month = monthMatch[1];
  const monthBand = MONTH_BANDS.find((band) =>
    band.month.toLowerCase().startsWith(month),
  );

  if (monthBand) {
    return {
      weekStart: 1,
      weekEnd: WEEKS_PER_MONTH,
      monthNumber: monthBand.monthNumber,
    };
  }

  return { weekStart: 1, weekEnd: 4, monthNumber: 1 };
}

export function getStageForWeekRange(
  rows: EngineerRoadmapRow[],
  weekStart: number,
  weekEnd: number,
): ProfileRoadmapStage | undefined {
  for (const row of rows) {
    for (const stage of row.stages) {
      // Check if stage overlaps with week range
      if (stage.weekStart <= weekEnd && stage.weekEnd >= weekStart) {
        return {
          period: stage.period,
          objective: stage.objective,
          courseOnline: stage.courseOnline,
          successIndicator: stage.successIndicator,
        };
      }
    }
  }
  return undefined;
}
