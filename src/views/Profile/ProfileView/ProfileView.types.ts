export interface ProfileEvaluationItem {
  title: string;
  description: string;
}

export interface ProfileActivitySubItem {
  label: string;
  detail: string;
}

export interface ProfileActivityGroup {
  project: string;
  description?: string;
  items?: ProfileActivitySubItem[];
}

export interface BareMinimumRatings {
  fundamentalFrontend: number;
  kualitasKode: number;
  testingReliability: number;
  kolaborasiKomunikasi: number;
  deliveryBisnis: number;
  securityObservability: number;
  aiProduktivitas: number;
}

export interface BareMinimumReasons {
  fundamentalFrontend: string;
  kualitasKode: string;
  testingReliability: string;
  kolaborasiKomunikasi: string;
  deliveryBisnis: string;
  securityObservability: string;
  aiProduktivitas: string;
}

export interface ProfileRoadmapStage {
  period: string;
  objective: string;
  backlogs: string[];
  successIndicator: string;
}

export interface ProfileSoftAspect {
  collaborationType: string;
  workStyle: string;
  strengths: string;
  developmentAreas: string;
  uniqueSellingPoint: string;
}

export interface EngineerProfileData {
  name: string;
  dateOfBirth: string;
  levelGrade: string;
  joinedDate: string;
  projects: string[];
  guilds: string[];
  good?: ProfileEvaluationItem[];
  needsImprove?: ProfileEvaluationItem[];
  activities?: ProfileActivityGroup[];
  bareMinimumRatings?: BareMinimumRatings;
  bareMinimumReasons?: BareMinimumReasons;
  careerRoadmapGoal?: string;
  careerRoadmap?: ProfileRoadmapStage[];
  softProfile?: ProfileSoftAspect;
}

export interface ProfileViewProps {
  profile: EngineerProfileData;
  headingId: string;
}
