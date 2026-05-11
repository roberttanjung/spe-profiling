import type { ReactNode } from 'react';

export interface CareerRoadmapCourse {
  title: string;
  url?: string;
}

export interface CareerRoadmapStage {
  period: string;
  objective: string;
  courseOnline: CareerRoadmapCourse[];
  successIndicator: string;
}

export interface CareerRoadmapSectionProps {
  heading: ReactNode;
  goal?: string;
  items: CareerRoadmapStage[];
  description: string;
  headingLevel?: 'h2' | 'h3';
  className?: string;
}
