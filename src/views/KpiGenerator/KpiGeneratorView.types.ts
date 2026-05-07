export interface KpiTemplateField {
  row: number;
  label: string;
  description: string;
  targetStandard: number | string;
  achievementActual: number | string;
}

export interface TemplateValidationResult {
  isValid: boolean;
  warnings: string[];
  errors: string[];
}

export interface KpiTemplateParsed {
  workbookBinary: ArrayBuffer;
  sheetName: string;
  fields: KpiTemplateField[];
  baseSuccess: string;
  baseStrengthArea: string;
  baseDevelopmentArea: string;
  baseCompetenciesSuggested: string;
  baseActivity: string;
  baseTarget: string;
  validation: TemplateValidationResult;
}

export interface KpiFormState {
  engineerName: string;
  metricValues: Record<number, string>;
  success: string;
  strengthArea: string;
  developmentArea: string;
  competenciesSuggested: string;
  activity: string;
  target: string;
}

export interface EngineerMetrics {
  doneRatePercent: number;
  bugsRatio: number;
  averageMonthlyWeight: number;
  averageMonthlyTask: number;
  activeMonthsRate: number;
  qualityScore: number;
  collaborationScore: number;
}
