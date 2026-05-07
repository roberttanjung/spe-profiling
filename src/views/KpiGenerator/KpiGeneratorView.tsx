'use client';

import { useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import styles from './KpiGeneratorView.module.css';
import {
  getEngineerList,
  initializeKpiForm,
  parseKpiTemplate,
  validateKpiForm,
} from './kpi.utils';
import type { KpiFormState, KpiTemplateParsed } from './KpiGeneratorView.types';
import KpiPreviewPanel from './KpiPreviewPanel';
import { exportKpiAction } from '@/app/(admin)/kpi-generator/actions';

type GeneratorStatus = 'idle' | 'ready' | 'preview' | 'completed';

function downloadArrayBuffer(filename: string, data: Uint8Array): void {
  const arrayBuffer = data.buffer.slice(
    data.byteOffset,
    data.byteOffset + data.byteLength,
  ) as ArrayBuffer;
  const blob = new Blob([arrayBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();

  URL.revokeObjectURL(url);
}

async function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return file.arrayBuffer();
}

function emptyForm(engineerName: string): KpiFormState {
  return {
    engineerName,
    metricValues: {},
    success: '',
    strengthArea: '',
    developmentArea: '',
    competenciesSuggested: '',
    activity: '',
    target: '',
  };
}

export default function KpiGeneratorView() {
  const engineers = useMemo(() => getEngineerList(), []);

  const [status, setStatus] = useState<GeneratorStatus>('idle');
  const [template, setTemplate] = useState<KpiTemplateParsed | null>(null);
  const [form, setForm] = useState<KpiFormState>(emptyForm(''));
  const [errors, setErrors] = useState<string[]>([]);

  const isReady = status === 'ready' && template !== null;

  const handleTemplateApply = (parsedTemplate: KpiTemplateParsed) => {
    // Check template validation
    if (parsedTemplate.validation.errors.length > 0) {
      setErrors(parsedTemplate.validation.errors);
      setStatus('idle');
      return;
    }

    // Show warnings if any
    if (parsedTemplate.validation.warnings.length > 0) {
      setErrors(parsedTemplate.validation.warnings);
    }

    setTemplate(parsedTemplate);
    setStatus('ready');

    if (form.engineerName) {
      const initialized = initializeKpiForm(parsedTemplate, form.engineerName);
      setForm(initialized);
      return;
    }

    setForm((previous) => ({
      ...previous,
      metricValues: parsedTemplate.fields.reduce<Record<number, string>>(
        (accumulator, field) => {
          accumulator[field.row] = String(field.achievementActual);
          return accumulator;
        },
        {},
      ),
      success: parsedTemplate.baseSuccess,
      strengthArea: parsedTemplate.baseStrengthArea,
      developmentArea: parsedTemplate.baseDevelopmentArea,
      competenciesSuggested: parsedTemplate.baseCompetenciesSuggested,
      activity: parsedTemplate.baseActivity,
      target: parsedTemplate.baseTarget,
    }));
  };

  const handleUploadTemplate = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const uploadedFile = event.target.files?.[0];

    if (!uploadedFile) {
      return;
    }

    const arrayBuffer = await readFileAsArrayBuffer(uploadedFile);
    const parsed = parseKpiTemplate(arrayBuffer);
    handleTemplateApply(parsed);
  };

  const handleEngineerChange = (event: SelectChangeEvent<string>) => {
    const engineerName = event.target.value;

    if (!template) {
      setForm(emptyForm(engineerName));
      return;
    }

    const initialized = initializeKpiForm(template, engineerName);
    setForm(initialized);
    setErrors([]);
  };

  const handleMetricChange = (row: number, value: string) => {
    setForm((previous) => ({
      ...previous,
      metricValues: {
        ...previous.metricValues,
        [row]: value,
      },
    }));
  };

  const handleTextFieldChange = (
    key:
      | 'success'
      | 'strengthArea'
      | 'developmentArea'
      | 'competenciesSuggested'
      | 'activity'
      | 'target',
    value: string,
  ) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const handleGenerate = () => {
    if (!template) {
      setErrors(['Template KPI belum tersedia.']);
      return;
    }

    const validationErrors = validateKpiForm(form);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    setStatus('preview');
  };

  const handleDownloadKpi = async () => {
    if (!template) {
      return;
    }

    // Convert ArrayBuffer to base64 to send to server action
    const uint8 = new Uint8Array(template.workbookBinary as ArrayBuffer);
    let binary = '';
    for (let i = 0; i < uint8.byteLength; i += 1) {
      binary += String.fromCharCode(uint8[i]);
    }
    const templateBase64 = btoa(binary);

    const resultBase64 = await exportKpiAction({
      templateBase64,
      engineerName: form.engineerName,
      metricValues: form.metricValues,
      success: form.success,
      strengthArea: form.strengthArea,
      developmentArea: form.developmentArea,
      competenciesSuggested: form.competenciesSuggested,
      activity: form.activity,
      target: form.target,
      fieldRows: template.fields.map((f) => f.row),
    });

    // Decode base64 result back to Uint8Array
    const decoded = atob(resultBase64);
    const workbookArray = new Uint8Array(decoded.length);
    for (let i = 0; i < decoded.length; i += 1) {
      workbookArray[i] = decoded.charCodeAt(i);
    }

    const filename = `KPI-${form.engineerName.replaceAll(' ', '-')}.xlsx`;
    downloadArrayBuffer(filename, workbookArray);
    setStatus('completed');
  };

  return (
    <section className={styles.section} aria-labelledby="kpi-generator-title">
      <Paper className={styles.hero} elevation={0}>
        <Typography
          component="h1"
          id="kpi-generator-title"
          className={styles.title}
        >
          KPI Generator
        </Typography>
        <Typography className={styles.description}>
          Upload template KPI, pilih engineer, lalu generate file KPI otomatis
          dengan data valid dari TWBE dan profile engineer.
        </Typography>
        <Stack direction="row" spacing={1} className={styles.badges}>
          <Chip label="Form Builder" size="small" />
          <Chip label="Auto Fill" size="small" />
          <Chip label="Formula Preserved" size="small" />
        </Stack>
      </Paper>

      <Paper className={styles.block} elevation={0}>
        <Typography className={styles.blockTitle}>
          1. Upload Template
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          className={styles.topActions}
        >
          <Button variant="outlined" component="label">
            Upload KPI .xlsx
            <input
              type="file"
              accept=".xlsx"
              hidden
              onChange={handleUploadTemplate}
            />
          </Button>
        </Stack>

        {template?.validation && (
          <>
            {template.validation.warnings.length > 0 ? (
              <Stack spacing={1} sx={{ mt: 2 }}>
                {template.validation.warnings.map((warning) => (
                  <Alert key={warning} severity="warning">
                    {warning}
                  </Alert>
                ))}
              </Stack>
            ) : null}
            {template.validation.errors.length > 0 ? (
              <Stack spacing={1} sx={{ mt: 2 }}>
                {template.validation.errors.map((error) => (
                  <Alert key={error} severity="error">
                    {error}
                  </Alert>
                ))}
              </Stack>
            ) : null}
          </>
        )}
      </Paper>

      {template && template.validation.errors.length === 0 ? (
        <Paper className={styles.block} elevation={0}>
          <Typography className={styles.blockTitle}>
            2. Pilih Engineer
          </Typography>
          <FormControl
            fullWidth
            size="small"
            className={styles.engineerControl}
          >
            <InputLabel id="engineer-select-label">Daftar Engineer</InputLabel>
            <Select
              labelId="engineer-select-label"
              label="Daftar Engineer"
              value={form.engineerName}
              onChange={handleEngineerChange}
            >
              {engineers.map((engineer) => (
                <MenuItem key={engineer} value={engineer}>
                  {engineer}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
      ) : null}

      {isReady && template ? (
        <Paper className={styles.block} elevation={0}>
          <Typography className={styles.blockTitle}>3. Form Builder</Typography>
          <Typography className={styles.blockDesc}>
            Label dan deskripsi diambil dari template: Individual Key Results
            dan Description. Kolom input mengisi Actual pada sesi Main dan
            Development.
          </Typography>

          <Box className={styles.fieldsContainer}>
            {/* Main Section */}
            <Box>
              <Typography className={styles.sectionHeader}>
                Main (80%)
              </Typography>
              <Box className={styles.fieldGrid}>
                {template.fields
                  .filter((field) => field.row >= 17 && field.row <= 24)
                  .map((field) => (
                    <Box key={field.row} className={styles.fieldCard}>
                      <Typography className={styles.fieldLabel}>
                        {field.label}
                      </Typography>
                      {field.description ? (
                        <Typography className={styles.fieldDescription}>
                          {field.description}
                        </Typography>
                      ) : null}
                      <TextField
                        label="Actual"
                        size="small"
                        className={styles.metricInput}
                        fullWidth
                        value={form.metricValues[field.row] ?? ''}
                        onChange={(event) =>
                          handleMetricChange(field.row, event.target.value)
                        }
                      />
                    </Box>
                  ))}
              </Box>
            </Box>

            {/* Development Section */}
            <Box>
              <Typography className={styles.sectionHeader}>
                Development (20%)
              </Typography>
              <Box className={styles.fieldGrid}>
                {template.fields
                  .filter((field) => field.row >= 29 && field.row <= 31)
                  .map((field) => (
                    <Box key={field.row} className={styles.fieldCard}>
                      <Typography className={styles.fieldLabel}>
                        {field.label}
                      </Typography>
                      {field.description ? (
                        <Typography className={styles.fieldDescription}>
                          {field.description}
                        </Typography>
                      ) : null}
                      <TextField
                        label="Actual"
                        size="small"
                        className={styles.metricInput}
                        fullWidth
                        value={form.metricValues[field.row] ?? ''}
                        onChange={(event) =>
                          handleMetricChange(field.row, event.target.value)
                        }
                      />
                    </Box>
                  ))}
              </Box>
            </Box>
          </Box>

          {/* Text Fields Section */}
          <Box className={styles.textFieldsSection}>
            <Typography className={styles.textFieldsTitle}>
              Informasi Tambahan
            </Typography>
            <Box className={styles.textFieldsGrid}>
              <TextField
                label="Success"
                placeholder="Hal-hal baik yang telah dilakukan..."
                multiline
                minRows={4}
                fullWidth
                value={form.success}
                onChange={(event) =>
                  handleTextFieldChange('success', event.target.value)
                }
              />
              <TextField
                label="Strength Area"
                placeholder="Kelebihan dan kekuatan yang dimiliki..."
                multiline
                minRows={4}
                fullWidth
                value={form.strengthArea}
                onChange={(event) =>
                  handleTextFieldChange('strengthArea', event.target.value)
                }
              />
              <TextField
                label="Development Area"
                placeholder="Area yang perlu ditingkatkan..."
                multiline
                minRows={4}
                fullWidth
                value={form.developmentArea}
                onChange={(event) =>
                  handleTextFieldChange('developmentArea', event.target.value)
                }
              />
              <TextField
                label="Competencies Suggested"
                placeholder="Kompetensi yang direkomendasikan..."
                multiline
                minRows={4}
                fullWidth
                value={form.competenciesSuggested}
                onChange={(event) =>
                  handleTextFieldChange(
                    'competenciesSuggested',
                    event.target.value,
                  )
                }
              />
              <TextField
                label="Activity"
                placeholder="Aktifitas detail untuk peningkatan..."
                multiline
                minRows={4}
                fullWidth
                value={form.activity}
                onChange={(event) =>
                  handleTextFieldChange('activity', event.target.value)
                }
              />
              <TextField
                label="Target"
                placeholder="Target yang diharapkan..."
                multiline
                minRows={4}
                fullWidth
                value={form.target}
                onChange={(event) =>
                  handleTextFieldChange('target', event.target.value)
                }
              />
            </Box>
          </Box>

          {errors.length > 0 ? (
            <Box className={styles.errorList}>
              <Stack spacing={1}>
                {errors.map((error) => {
                  const isWarning =
                    error.includes('tidak ditemukan') ||
                    error.includes('mungkin');
                  return (
                    <Alert
                      key={error}
                      severity={isWarning ? 'warning' : 'error'}
                    >
                      {error}
                    </Alert>
                  );
                })}
              </Stack>
            </Box>
          ) : null}

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            className={styles.actions}
          >
            <Button variant="contained" size="large" onClick={handleGenerate}>
              Preview & Generate KPI (.xlsx)
            </Button>
          </Stack>
        </Paper>
      ) : null}

      {status === 'preview' && template ? (
        <Paper className={styles.block} elevation={0}>
          <KpiPreviewPanel template={template} form={form} />
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            className={styles.actions}
            sx={{ mt: 3 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={handleDownloadKpi}
            >
              Download KPI (.xlsx)
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => setStatus('ready')}
            >
              Kembali ke Form
            </Button>
          </Stack>
        </Paper>
      ) : null}

      {status === 'completed' ? (
        <Paper className={styles.block} elevation={0}>
          <Stack spacing={2} sx={{ alignItems: 'center', textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              KPI berhasil dibuat!
            </Typography>
            <Typography color="textSecondary">
              File KPI untuk {form.engineerName} telah diunduh.
            </Typography>
            <Alert severity="success">
              Template berhasil diisi dengan data TWBE dan profile engineer.
              Semua formula dan formatting telah dipertahankan.
            </Alert>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ mt: 2 }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  setStatus('idle');
                  setTemplate(null);
                  setForm(emptyForm(''));
                }}
              >
                Buat KPI Baru
              </Button>
            </Stack>
          </Stack>
        </Paper>
      ) : null}
    </section>
  );
}
