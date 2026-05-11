import * as XLSX from 'xlsx';

import { getTwbeMonthlyRowsByEmployeeName } from '@/utils/twbe';
import { allEngineerProfiles } from '@/views/Profile';
import type { EngineerProfileData } from '@/views/Profile';
import type { BareMinimumRatings } from '@/views/Profile/ProfileView/ProfileView.types';
import type {
  EngineerMetrics,
  KpiFormState,
  KpiTemplateField,
  KpiTemplateParsed,
  TemplateValidationResult,
} from './KpiGeneratorView.types';

const KPI_INPUT_COLUMN = 'G';
const SUCCESS_CELL = 'B34';
const STRENGTH_AREA_CELL = 'B41';
const DEVELOPMENT_AREA_CELL = 'I41';
const COMPETENCIES_SUGGESTED_CELL = 'B48';
const ACTIVITY_CELL = 'F48';
const TARGET_CELL = 'J48';
const MAIN_SECTION_TITLE = 'Main (80%)';
const DEVELOPMENT_SECTION_TITLE = 'Development (20%)';
const SUCCESS_SECTION_TITLE = 'Success';

const ENGINEER_PROFILES: EngineerProfileData[] = allEngineerProfiles;

const ENGINEER_PROFILE_MAP = new Map(
  ENGINEER_PROFILES.map((profile) => [profile.name, profile]),
);

function toStringValue(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }

  return String(value).trim();
}

function getCellDisplayValue(
  worksheet: XLSX.WorkSheet,
  cellAddress: string,
): string {
  const cell = worksheet[cellAddress];
  return toStringValue(cell?.w ?? cell?.v);
}

function normalizeRatioAsPercent(value: number): number {
  if (value <= 1) {
    return value * 100;
  }

  return value;
}

function getRatingsAverage(ratings?: BareMinimumRatings): number {
  if (!ratings) {
    return 3;
  }

  const values = Object.values(ratings);
  if (values.length === 0) {
    return 3;
  }

  return values.reduce((sum, rating) => sum + rating, 0) / values.length;
}

function formatList(items: string[]): string {
  return items
    .filter((item) => item.trim().length > 0)
    .map((item, idx) => `${idx + 1}. ${item}`)
    .join('\n');
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function getEngineerProfile(
  engineerName: string,
): EngineerProfileData | undefined {
  return ENGINEER_PROFILE_MAP.get(engineerName);
}

export function getEngineerList(): string[] {
  return ENGINEER_PROFILES.map((profile) => profile.name);
}

function validateTemplateStructure(
  worksheet: XLSX.WorkSheet,
): TemplateValidationResult {
  const warnings: string[] = [];
  const errors: string[] = [];
  const range = XLSX.utils.decode_range(worksheet['!ref'] ?? 'A1:A1');

  let mainSectionFound = false;
  let developmentSectionFound = false;
  let successSectionFound = false;

  for (let row = range.s.r; row <= range.e.r; row += 1) {
    const oneBasedRow = row + 1;
    const sectionLabel = getCellDisplayValue(worksheet, `B${oneBasedRow}`);

    if (sectionLabel === MAIN_SECTION_TITLE) {
      mainSectionFound = true;
    }

    if (sectionLabel === DEVELOPMENT_SECTION_TITLE) {
      developmentSectionFound = true;
    }

    if (sectionLabel === SUCCESS_SECTION_TITLE) {
      successSectionFound = true;
    }
  }

  // Errors (kritical - template tidak bisa digunakan)
  if (!mainSectionFound) {
    errors.push(`Template harus memiliki section "${MAIN_SECTION_TITLE}".`);
  }

  if (!developmentSectionFound) {
    errors.push(
      `Template harus memiliki section "${DEVELOPMENT_SECTION_TITLE}".`,
    );
  }

  // Warnings (template tetap bisa digunakan tapi dengan limitation)
  if (!successSectionFound) {
    warnings.push(
      `Section "${SUCCESS_SECTION_TITLE}" tidak ditemukan. Preview mungkin tidak lengkap.`,
    );
  }

  // Check if have enough fields
  const fieldCount = [mainSectionFound, developmentSectionFound].filter(
    Boolean,
  ).length;
  if (fieldCount < 2) {
    warnings.push(
      `Template ditemukan hanya ${fieldCount} section. Minimal 2 section diperlukan untuk operasi optimal.`,
    );
  }

  return {
    isValid: errors.length === 0,
    warnings,
    errors,
  };
}

export function parseKpiTemplate(arrayBuffer: ArrayBuffer): KpiTemplateParsed {
  const workbook = XLSX.read(arrayBuffer, {
    type: 'array',
    cellFormula: true,
    cellNF: true,
    cellText: true,
    cellDates: true,
  });

  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const range = XLSX.utils.decode_range(worksheet['!ref'] ?? 'A1:A1');
  const fields: KpiTemplateField[] = [];

  let mainSectionRow = -1;
  let developmentSectionRow = -1;
  let successSectionRow = -1;

  for (let row = range.s.r; row <= range.e.r; row += 1) {
    const oneBasedRow = row + 1;
    const sectionLabel = getCellDisplayValue(worksheet, `B${oneBasedRow}`);

    if (sectionLabel === MAIN_SECTION_TITLE) {
      mainSectionRow = oneBasedRow;
    }

    if (sectionLabel === DEVELOPMENT_SECTION_TITLE) {
      developmentSectionRow = oneBasedRow;
    }

    if (sectionLabel === SUCCESS_SECTION_TITLE) {
      successSectionRow = oneBasedRow;
    }
  }

  const sectionRanges: Array<{ startRow: number; endRow: number }> = [];

  if (mainSectionRow > 0 && developmentSectionRow > mainSectionRow) {
    sectionRanges.push({
      startRow: mainSectionRow + 1,
      endRow: developmentSectionRow - 1,
    });
  }

  if (developmentSectionRow > 0) {
    sectionRanges.push({
      startRow: developmentSectionRow + 1,
      endRow:
        successSectionRow > developmentSectionRow
          ? successSectionRow - 1
          : range.e.r + 1,
    });
  }

  sectionRanges.forEach((sectionRange) => {
    for (
      let oneBasedRow = sectionRange.startRow;
      oneBasedRow <= sectionRange.endRow;
      oneBasedRow += 1
    ) {
      const numberCell = worksheet[`B${oneBasedRow}`];
      const labelCell = worksheet[`C${oneBasedRow}`];
      const indexValue = toStringValue(numberCell?.v);
      const isKpiDataRow = /^\d+$/.test(indexValue);

      if (!isKpiDataRow || !labelCell) {
        continue;
      }

      fields.push({
        row: oneBasedRow,
        label: toStringValue(labelCell.w ?? labelCell.v),
        description: getCellDisplayValue(worksheet, `F${oneBasedRow}`),
        targetStandard: toStringValue(worksheet[`E${oneBasedRow}`]?.v ?? ''),
        achievementActual: toStringValue(
          worksheet[`${KPI_INPUT_COLUMN}${oneBasedRow}`]?.v ??
            worksheet[`${KPI_INPUT_COLUMN}${oneBasedRow}`]?.w ??
            '',
        ),
      });
    }
  });

  fields.sort((left, right) => left.row - right.row);

  if (fields.length === 0) {
    throw new Error(
      'Template KPI tidak valid. Pastikan format Main & Development sesuai KPI.xlsx.',
    );
  }

  return {
    workbookBinary: arrayBuffer,
    sheetName,
    fields,
    baseSuccess: getCellDisplayValue(worksheet, SUCCESS_CELL),
    baseStrengthArea: getCellDisplayValue(worksheet, STRENGTH_AREA_CELL),
    baseDevelopmentArea: getCellDisplayValue(worksheet, DEVELOPMENT_AREA_CELL),
    baseCompetenciesSuggested: getCellDisplayValue(
      worksheet,
      COMPETENCIES_SUGGESTED_CELL,
    ),
    baseActivity: getCellDisplayValue(worksheet, ACTIVITY_CELL),
    baseTarget: getCellDisplayValue(worksheet, TARGET_CELL),
    validation: validateTemplateStructure(worksheet),
  };
}

export function getEngineerMetrics(engineerName: string): EngineerMetrics {
  const monthlyRows = getTwbeMonthlyRowsByEmployeeName(engineerName);
  const profile = getEngineerProfile(engineerName);

  if (monthlyRows.length === 0) {
    return {
      doneRatePercent: 0,
      bugsRatio: 0,
      averageMonthlyWeight: 0,
      averageMonthlyTask: 0,
      activeMonthsRate: 0,
      qualityScore: getRatingsAverage(profile?.bareMinimumRatings) / 5,
      collaborationScore:
        (profile?.bareMinimumRatings?.kolaborasiKomunikasi ?? 3) / 5,
    };
  }

  const doneRatePercent =
    monthlyRows.reduce(
      (sum, row) => sum + normalizeRatioAsPercent(row.doneRate),
      0,
    ) / monthlyRows.length;
  const bugsRatio =
    monthlyRows.reduce((sum, row) => sum + row.bugsRatio, 0) /
    monthlyRows.length;
  const averageMonthlyWeight =
    monthlyRows.reduce((sum, row) => sum + row.totalWeight, 0) /
    monthlyRows.length;
  const averageMonthlyTask =
    monthlyRows.reduce((sum, row) => sum + row.totalTask, 0) /
    monthlyRows.length;

  return {
    doneRatePercent,
    bugsRatio,
    averageMonthlyWeight,
    averageMonthlyTask,
    activeMonthsRate: clamp(monthlyRows.length / 8, 0.5, 1),
    qualityScore: clamp(
      getRatingsAverage(profile?.bareMinimumRatings) / 5,
      0.6,
      1,
    ),
    collaborationScore: clamp(
      (profile?.bareMinimumRatings?.kolaborasiKomunikasi ?? 3) / 5,
      0.6,
      1,
    ),
  };
}

// Fuzzy match: check if label contains ANY of the keywords
function matchesAnyKeyword(label: string, keywords: string[]): boolean {
  const lowerLabel = label.toLowerCase();
  return keywords.some((keyword) => lowerLabel.includes(keyword.toLowerCase()));
}

function inferAchievementValue(
  label: string,
  metrics: EngineerMetrics,
): string {
  const lowerLabel = label.toLowerCase();

  // Primary matches (exact keywords)
  if (
    lowerLabel.includes('done dev') ||
    matchesAnyKeyword(label, ['sprint', 'completion', 'done'])
  ) {
    return metrics.doneRatePercent.toFixed(2);
  }

  if (
    lowerLabel.includes('rasio bugs') ||
    matchesAnyKeyword(label, ['bug', 'bugs', 'defect'])
  ) {
    return metrics.bugsRatio.toFixed(2);
  }

  if (
    lowerLabel.includes('rata-rata jumlah bobot') ||
    matchesAnyKeyword(label, ['bobot', 'weight', 'average weight'])
  ) {
    return metrics.averageMonthlyWeight.toFixed(2);
  }

  if (
    lowerLabel.includes('rata-rata jumlah tugas') ||
    matchesAnyKeyword(label, ['tugas', 'task', 'average task'])
  ) {
    return metrics.averageMonthlyTask.toFixed(2);
  }

  if (
    lowerLabel.includes('regular report') ||
    matchesAnyKeyword(label, ['report', 'reporting'])
  ) {
    return '1';
  }

  if (
    lowerLabel.includes('aktifitas di gitlab') ||
    matchesAnyKeyword(label, ['gitlab', 'activity', 'aktifitas'])
  ) {
    return (metrics.activeMonthsRate * 0.9).toFixed(2);
  }

  if (
    lowerLabel.includes('high churn rate') ||
    matchesAnyKeyword(label, ['churn', 'turnover', 'retention'])
  ) {
    return (metrics.qualityScore * 0.92).toFixed(2);
  }

  if (
    lowerLabel.includes('kualitas code') ||
    matchesAnyKeyword(label, ['kualitas', 'quality', 'code quality'])
  ) {
    return (metrics.qualityScore * 0.88).toFixed(2);
  }

  if (
    lowerLabel.includes('pengembangan diri') ||
    matchesAnyKeyword(label, ['pengembangan', 'development', 'learning'])
  ) {
    return (metrics.qualityScore * 100).toFixed(2);
  }

  if (
    lowerLabel.includes('dokumentasi task') ||
    matchesAnyKeyword(label, ['dokumentasi', 'documentation', 'doc'])
  ) {
    return (metrics.qualityScore * 100).toFixed(2);
  }

  if (
    lowerLabel.includes('kerjasama') ||
    matchesAnyKeyword(label, [
      'kerjasama',
      'collaboration',
      'teamwork',
      'komunikasi',
    ])
  ) {
    return (metrics.collaborationScore * 100).toFixed(2);
  }

  // Fallback: return empty string (user must fill manually)
  return '';
}

export function initializeKpiForm(
  template: KpiTemplateParsed,
  engineerName: string,
): KpiFormState {
  const profile = getEngineerProfile(engineerName);
  const metrics = getEngineerMetrics(engineerName);

  const metricValues = template.fields.reduce<Record<number, string>>(
    (accumulator, field) => {
      const autoValue = inferAchievementValue(field.label, metrics);
      accumulator[field.row] =
        autoValue.length > 0
          ? autoValue
          : toStringValue(field.achievementActual).length > 0
            ? toStringValue(field.achievementActual)
            : toStringValue(field.targetStandard);
      return accumulator;
    },
    {},
  );

  const successItems =
    profile?.good
      ?.slice(0, 3)
      .map((item) => `${item.title}: ${item.description}`) ?? [];
  const needsImproveItems =
    profile?.needsImprove?.slice(0, 3).map((item) => item.title) ?? [];

  const competenciesSources = [
    ...(profile?.careerRoadmap?.[0]?.backlogs ?? []).slice(0, 3),
    ...needsImproveItems,
  ].slice(0, 4);

  const activitySources =
    profile?.activities?.slice(0, 4).map((activity) => {
      const firstItem = activity.items?.[0]?.detail;
      if (firstItem) {
        return `${activity.project}: ${firstItem}`;
      }

      return `${activity.project}: ${activity.description ?? 'Implementasi bertahap.'}`;
    }) ?? [];

  const targetSources =
    profile?.careerRoadmap
      ?.slice(0, 3)
      .map((stage) => stage.successIndicator) ?? [];

  const success =
    successItems.length > 0 ? formatList(successItems) : template.baseSuccess;

  const strengthAreaSource = [
    profile?.softProfile?.strengths ?? '',
    'Konsistensi delivery pada target sprint.',
  ]
    .filter((item) => item.length > 0)
    .join('\n\n');

  const developmentAreaSource = [
    profile?.softProfile?.developmentAreas ?? '',
    needsImproveItems.length > 0 ? formatList(needsImproveItems) : '',
  ]
    .filter((item) => item.length > 0)
    .join('\n\n');

  return {
    engineerName,
    metricValues,
    success,
    strengthArea:
      strengthAreaSource.length > 0
        ? strengthAreaSource
        : template.baseStrengthArea,
    developmentArea:
      developmentAreaSource.length > 0
        ? developmentAreaSource
        : template.baseDevelopmentArea,
    competenciesSuggested:
      competenciesSources.length > 0
        ? formatList(competenciesSources)
        : template.baseCompetenciesSuggested,
    activity:
      activitySources.length > 0
        ? formatList(activitySources)
        : template.baseActivity,
    target:
      targetSources.length > 0
        ? formatList(targetSources)
        : template.baseTarget,
  };
}

export function validateKpiForm(form: KpiFormState): string[] {
  const errors: string[] = [];

  if (!form.engineerName) {
    errors.push('Pilih engineer terlebih dahulu.');
  }

  const hasMissingMetric = Object.values(form.metricValues).some(
    (value) => value.trim().length === 0,
  );

  if (hasMissingMetric) {
    errors.push('Pastikan semua kolom Achievement/Actual sudah terisi.');
  }

  if (form.success.trim().length === 0) {
    errors.push('Kolom Success tidak boleh kosong.');
  }

  if (form.strengthArea.trim().length === 0) {
    errors.push('Kolom Strength Area tidak boleh kosong.');
  }

  if (form.developmentArea.trim().length === 0) {
    errors.push('Kolom Development Area tidak boleh kosong.');
  }

  return errors;
}
