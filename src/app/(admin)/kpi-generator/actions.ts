'use server';

import XlsxPopulate from 'xlsx-populate';

const KPI_INPUT_COLUMN = 'G';
const SUCCESS_CELL = 'B34';
const STRENGTH_AREA_CELL = 'B41';
const DEVELOPMENT_AREA_CELL = 'I41';
const COMPETENCIES_SUGGESTED_CELL = 'B48';
const ACTIVITY_CELL = 'F48';
const TARGET_CELL = 'J48';
const HEADER_EMPLOYEE_NAME_CELL = 'I8';
const SIGNATURE_EMPLOYEE_NAME_CELL = 'B72';

export interface ExportKpiPayload {
  templateBase64: string;
  engineerName: string;
  metricValues: Record<number, string>;
  success: string;
  strengthArea: string;
  developmentArea: string;
  competenciesSuggested: string;
  activity: string;
  target: string;
  fieldRows: number[];
}

export async function exportKpiAction(
  payload: ExportKpiPayload,
): Promise<string> {
  const buffer = Buffer.from(payload.templateBase64, 'base64');
  const workbook = await XlsxPopulate.fromDataAsync(buffer);
  const sheet = workbook.sheet(0);

  payload.fieldRows.forEach((row) => {
    const raw = payload.metricValues[row] ?? '';
    const num = Number(raw);
    sheet
      .cell(`${KPI_INPUT_COLUMN}${row}`)
      .value(Number.isFinite(num) ? num : raw);
  });

  sheet.cell(SUCCESS_CELL).value(payload.success);
  sheet.cell(STRENGTH_AREA_CELL).value(payload.strengthArea);
  sheet.cell(DEVELOPMENT_AREA_CELL).value(payload.developmentArea);
  sheet.cell(COMPETENCIES_SUGGESTED_CELL).value(payload.competenciesSuggested);
  sheet.cell(ACTIVITY_CELL).value(payload.activity);
  sheet.cell(TARGET_CELL).value(payload.target);
  sheet.cell(HEADER_EMPLOYEE_NAME_CELL).value(payload.engineerName);
  sheet.cell(SIGNATURE_EMPLOYEE_NAME_CELL).value(`( ${payload.engineerName} )`);

  const output = await workbook.outputAsync();
  const uint8 =
    output instanceof Uint8Array
      ? output
      : new Uint8Array(output as ArrayBuffer);
  return Buffer.from(uint8).toString('base64');
}
