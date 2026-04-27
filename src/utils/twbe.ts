import twbeData from '@/db/twbe.json';

import type { MonthlyPerformanceRow } from '@/components/ProfileMonthlyTable/ProfileMonthlyTable.types';
import type { SprintPerformanceRow } from '@/components/ProfileSprintTable/ProfileSprintTable.types';

interface TwbeRecord {
  project_name: string;
  sprint_name: string;
  month: string;
  employee_name: string;
  total_task: number;
  total_weights: number;
  total_bugs: number;
  finish_rate: number;
  done_rate: number;
}

interface MonthlyAccumulator {
  month: string;
  sprintCount: number;
  totalTask: number;
  totalWeight: number;
  totalBugsRatio: number;
  totalDoneRate: number;
  totalFinishRate: number;
}

const monthToYear: Record<string, number> = {
  september: 2025,
  october: 2025,
  november: 2025,
  december: 2025,
  january: 2026,
  february: 2026,
  march: 2026,
  april: 2026,
};

const monthSortOrder: Record<string, number> = {
  'september 2025': 0,
  'october 2025': 1,
  'november 2025': 2,
  'december 2025': 3,
  'january 2026': 4,
  'february 2026': 5,
  'march 2026': 6,
  'april 2026': 7,
};

function normalizeRateValue(rate: number): number {
  if (rate > 100) {
    return rate / 100;
  }

  return rate;
}

function formatMonthWithYear(month: string): string {
  const monthLower = month.toLowerCase();
  const year = monthToYear[monthLower] ?? 2025;
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
  return `${capitalizedMonth} ${year}`;
}

function toBugsRatio(totalBugs: number, totalTask: number): number {
  if (totalTask <= 0) {
    return 0;
  }

  return totalBugs / totalTask;
}

const twbeRecords = twbeData as TwbeRecord[];

function toMonthSortValue(month: string): number {
  const formattedMonth = formatMonthWithYear(month).toLowerCase();
  return monthSortOrder[formattedMonth] ?? Number.MAX_SAFE_INTEGER;
}

export function getTwbeSprintRowsByEmployeeName(
  employeeName: string,
): SprintPerformanceRow[] {
  return twbeRecords
    .filter((record) => record.employee_name === employeeName)
    .map((record) => ({
      projectName: record.project_name,
      month: formatMonthWithYear(record.month),
      sprintName: record.sprint_name,
      totalTask: record.total_task,
      totalWeights: record.total_weights,
      bugsRatio: toBugsRatio(record.total_bugs, record.total_task),
      doneRate: normalizeRateValue(record.done_rate),
      finishRate: normalizeRateValue(record.finish_rate),
    }));
}

export function getTwbeMonthlyRowsByEmployeeName(
  employeeName: string,
): MonthlyPerformanceRow[] {
  const groupedByMonth = twbeRecords
    .filter((record) => record.employee_name === employeeName)
    .reduce<Record<string, MonthlyAccumulator>>((accumulator, record) => {
      const groupKey = record.month;
      const sprintBugsRatio = toBugsRatio(record.total_bugs, record.total_task);
      const doneRate = normalizeRateValue(record.done_rate);
      const finishRate = normalizeRateValue(record.finish_rate);

      if (!accumulator[groupKey]) {
        accumulator[groupKey] = {
          month: record.month,
          sprintCount: 0,
          totalTask: 0,
          totalWeight: 0,
          totalBugsRatio: 0,
          totalDoneRate: 0,
          totalFinishRate: 0,
        };
      }

      accumulator[groupKey].sprintCount += 1;
      accumulator[groupKey].totalTask += record.total_task;
      accumulator[groupKey].totalWeight += record.total_weights;
      accumulator[groupKey].totalBugsRatio += sprintBugsRatio;
      accumulator[groupKey].totalDoneRate += doneRate;
      accumulator[groupKey].totalFinishRate += finishRate;

      return accumulator;
    }, {});

  return Object.values(groupedByMonth)
    .sort((left, right) => {
      return toMonthSortValue(left.month) - toMonthSortValue(right.month);
    })
    .map((row) => ({
      month: formatMonthWithYear(row.month),
      totalTask: row.totalTask,
      totalWeight: row.totalWeight,
      bugsRatio: row.totalBugsRatio / row.sprintCount,
      doneRate: row.totalDoneRate / row.sprintCount,
      finishRate: row.totalFinishRate / row.sprintCount,
    }));
}
