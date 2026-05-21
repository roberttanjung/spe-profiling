import { allEngineerProfiles } from '@/views/Profile';
import type { ProfileRoadmapStage } from '@/views/Profile/ProfileView/ProfileView.types';
import {
  buildRoadmapTimeline,
  TOTAL_TIMELINE_WEEKS,
  WEEKS_PER_MONTH,
} from './roadmapTimeline';

export const MONTH_BANDS = [
  { label: 'Juni', month: 'Juni', monthNumber: 1 },
  { label: 'Juli', month: 'Juli', monthNumber: 2 },
  { label: 'Agustus', month: 'Agustus', monthNumber: 3 },
  { label: 'September', month: 'September', monthNumber: 4 },
  { label: 'Oktober', month: 'Oktober', monthNumber: 5 },
  { label: 'November', month: 'November', monthNumber: 6 },
];

export { WEEKS_PER_MONTH, TOTAL_TIMELINE_WEEKS };

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
      const stageTimelines = buildRoadmapTimeline(profile.careerRoadmap!);
      const stages = profile.careerRoadmap!.map((stage, stageIndex) => {
        const { weekStart, weekEnd, monthNumber } =
          getWeekRangeForPeriodByStage(
            stageTimelines[stageIndex].weekStart,
            stageTimelines[stageIndex].weekEnd,
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
  const fallbackMonth = getMonthNumberFromPeriod(period);
  return {
    weekStart: 1,
    weekEnd: WEEKS_PER_MONTH,
    monthNumber: fallbackMonth,
  };
}

function getWeekRangeForPeriodByStage(
  absoluteWeekStart: number,
  absoluteWeekEnd: number,
): {
  weekStart: number;
  weekEnd: number;
  monthNumber: number;
} {
  const clampedAbsoluteStart = Math.max(
    1,
    Math.min(TOTAL_TIMELINE_WEEKS, absoluteWeekStart),
  );
  const clampedAbsoluteEnd = Math.max(
    clampedAbsoluteStart,
    Math.min(TOTAL_TIMELINE_WEEKS, absoluteWeekEnd),
  );
  const monthNumber = Math.min(
    Math.floor((clampedAbsoluteStart - 1) / WEEKS_PER_MONTH) + 1,
    MONTH_BANDS.length,
  );
  const weekStart = ((clampedAbsoluteStart - 1) % WEEKS_PER_MONTH) + 1;
  const weekEnd = weekStart + (clampedAbsoluteEnd - clampedAbsoluteStart);

  return {
    weekStart,
    weekEnd,
    monthNumber,
  };
}

function getMonthNumberFromPeriod(period: string): number {
  const periodLower = period.toLowerCase().trim();
  const monthMatch = periodLower.match(
    /\b(juni|juli|agustus|september|oktober|november)\b/,
  );

  if (!monthMatch) {
    return 1;
  }

  const month = monthMatch[1];
  const monthBand = MONTH_BANDS.find((band) =>
    band.month.toLowerCase().startsWith(month),
  );

  return monthBand?.monthNumber ?? 1;
}

export function getStageForWeekRange(
  rows: EngineerRoadmapRow[],
  weekStart: number,
  weekEnd: number,
): ProfileRoadmapStage | undefined {
  for (const row of rows) {
    for (const stage of row.stages) {
      const stageAbsoluteStart =
        (stage.monthNumber - 1) * WEEKS_PER_MONTH + stage.weekStart;
      const stageAbsoluteEnd =
        stageAbsoluteStart + (stage.weekEnd - stage.weekStart);

      // Check if stage overlaps with week range
      if (stageAbsoluteStart <= weekEnd && stageAbsoluteEnd >= weekStart) {
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
