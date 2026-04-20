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

const monthSortOrder: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

function normalizeRateValue(rate: number): number {
  if (rate > 100) {
    return rate / 100;
  }

  return rate;
}

function toBugsRatio(totalBugs: number, totalTask: number): number {
  if (totalTask <= 0) {
    return 0;
  }

  return totalBugs / totalTask;
}

const twbeRecords = twbeData as TwbeRecord[];

function toMonthSortValue(month: string): number {
  return monthSortOrder[month.toLowerCase()] ?? Number.MAX_SAFE_INTEGER;
}

export function getTwbeSprintRowsByEmployeeName(
  employeeName: string,
): SprintPerformanceRow[] {
  return twbeRecords
    .filter((record) => record.employee_name === employeeName)
    .map((record) => ({
      projectName: record.project_name,
      month: record.month,
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
      month: row.month,
      totalTask: row.totalTask,
      totalWeight: row.totalWeight,
      bugsRatio: row.totalBugsRatio / row.sprintCount,
      doneRate: row.totalDoneRate / row.sprintCount,
      finishRate: row.totalFinishRate / row.sprintCount,
    }));
}
