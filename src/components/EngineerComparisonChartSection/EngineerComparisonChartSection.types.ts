export interface EngineerComparisonChartRow {
  engineerName: string;
  totalTask: number;
  totalWeight: number;
  bugsRatio: number;
  finishRate: number;
}

export interface EngineerComparisonChartSectionProps {
  rows: EngineerComparisonChartRow[];
  className?: string;
}
