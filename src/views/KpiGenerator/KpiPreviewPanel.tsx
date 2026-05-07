'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Box,
  Divider,
} from '@mui/material';
import type { KpiFormState, KpiTemplateParsed } from './KpiGeneratorView.types';
import styles from './KpiPreviewPanel.module.css';

interface KpiPreviewPanelProps {
  template: KpiTemplateParsed;
  form: KpiFormState;
}

export default function KpiPreviewPanel({
  template,
  form,
}: KpiPreviewPanelProps) {
  const mainFields = template.fields.filter(
    (field) => field.row >= 17 && field.row <= 24,
  );
  const developmentFields = template.fields.filter(
    (field) => field.row >= 29 && field.row <= 31,
  );

  const formatTextBlock = (text: string): string[] => {
    return text
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .slice(0, 5);
  };

  return (
    <Paper className={styles.previewPanel} elevation={0}>
      <Box className={styles.previewHeader}>
        <Typography className={styles.previewTitle}>
          Preview Hasil KPI
        </Typography>
        <Typography className={styles.previewSubtitle}>
          {form.engineerName}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box className={styles.section}>
        <Typography className={styles.sectionTitle}>Main (80%)</Typography>
        <Table size="small" className={styles.table}>
          <TableHead>
            <TableRow className={styles.tableHeader}>
              <TableCell>No</TableCell>
              <TableCell>Individual Key Results</TableCell>
              <TableCell align="right">Actual</TableCell>
              <TableCell align="right">Target</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mainFields.map((field, idx) => (
              <TableRow key={field.row}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell className={styles.label}>{field.label}</TableCell>
                <TableCell align="right">
                  {form.metricValues[field.row] ?? '-'}
                </TableCell>
                <TableCell align="right">{field.targetStandard}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box className={styles.section}>
        <Typography className={styles.sectionTitle}>
          Development (20%)
        </Typography>
        <Table size="small" className={styles.table}>
          <TableHead>
            <TableRow className={styles.tableHeader}>
              <TableCell>No</TableCell>
              <TableCell>Individual Key Results</TableCell>
              <TableCell align="right">Actual</TableCell>
              <TableCell align="right">Target</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {developmentFields.map((field, idx) => (
              <TableRow key={field.row}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell className={styles.label}>{field.label}</TableCell>
                <TableCell align="right">
                  {form.metricValues[field.row] ?? '-'}
                </TableCell>
                <TableCell align="right">{field.targetStandard}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box className={styles.textSection}>
        <Box className={styles.textBlock}>
          <Typography className={styles.textTitle}>Success</Typography>
          <Typography className={styles.textContent}>
            {formatTextBlock(form.success).join('\n')}
          </Typography>
        </Box>

        <Box className={styles.textBlock}>
          <Typography className={styles.textTitle}>Strength Area</Typography>
          <Typography className={styles.textContent}>
            {formatTextBlock(form.strengthArea).join('\n')}
          </Typography>
        </Box>

        <Box className={styles.textBlock}>
          <Typography className={styles.textTitle}>Development Area</Typography>
          <Typography className={styles.textContent}>
            {formatTextBlock(form.developmentArea).join('\n')}
          </Typography>
        </Box>

        <Box className={styles.textBlock}>
          <Typography className={styles.textTitle}>
            Competencies Suggested
          </Typography>
          <Typography className={styles.textContent}>
            {formatTextBlock(form.competenciesSuggested).join('\n')}
          </Typography>
        </Box>

        <Box className={styles.textBlock}>
          <Typography className={styles.textTitle}>Activity</Typography>
          <Typography className={styles.textContent}>
            {formatTextBlock(form.activity).join('\n')}
          </Typography>
        </Box>

        <Box className={styles.textBlock}>
          <Typography className={styles.textTitle}>Target</Typography>
          <Typography className={styles.textContent}>
            {formatTextBlock(form.target).join('\n')}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
