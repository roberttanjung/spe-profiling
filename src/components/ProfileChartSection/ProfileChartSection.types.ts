export interface ChartMonthlyRow {
  month: string;
  totalTask: number;
  totalWeight: number;
  bugsRatio: number;
  finishRate: number;
}

export interface ProfileChartSectionProps {
  rows: ChartMonthlyRow[];
  className?: string;
}
