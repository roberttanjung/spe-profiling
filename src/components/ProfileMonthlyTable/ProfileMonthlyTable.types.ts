export interface MonthlyPerformanceRow {
  month: string;
  totalTask: number;
  totalWeight: number;
  bugsRatio: number;
  doneRate: number;
  finishRate: number;
}

export interface ProfileMonthlyTableProps {
  title?: string;
  rows: MonthlyPerformanceRow[];
  emptyMessage?: string;
  className?: string;
}
