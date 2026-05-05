export type StageStatus = 'completed' | 'in-progress' | 'upcoming';

export type DrCosmaPillar =
  | 'Discipline'
  | 'Resilience'
  | 'Collaboration'
  | 'Smart Working'
  | 'Growth Mindset';

export interface RoadmapActivity {
  platform: 'Udemy' | 'Internal';
  courseTitle: string;
  courseUrl?: string;
  courseHours?: number;
}

export interface RoadmapOutput {
  type: 'certificate' | 'document';
  label: string;
  issuer?: string;
}

export interface RoadmapStage {
  id: number;
  title: string;
  period: string;
  focus: string;
  pillars: DrCosmaPillar[];
  activities: RoadmapActivity[];
  outputs: RoadmapOutput[];
  status: StageStatus;
}
