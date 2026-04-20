export interface SprintPerformanceRow {
  projectName: string;
  month: string;
  sprintName: string;
  totalTask: number;
  totalWeights: number;
  bugsRatio: number;
  doneRate: number;
  finishRate: number;
}

export interface ProfileSprintTableProps {
  title?: string;
  rows: SprintPerformanceRow[];
  emptyMessage?: string;
  className?: string;
}
