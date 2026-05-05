'use client';

import { BarChart } from '@mui/x-charts/BarChart';
import styles from './EngineerComparisonChartSection.module.css';
import type { EngineerComparisonChartSectionProps } from './EngineerComparisonChartSection.types';

const CHART_HEIGHT = 340;

const numberFormatter = new Intl.NumberFormat('id-ID', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export default function EngineerComparisonChartSection({
  rows,
  className,
}: EngineerComparisonChartSectionProps) {
  const engineers = rows.map((row) => row.engineerName);
  const totalTaskData = rows.map((row) => row.totalTask);
  const totalWeightData = rows.map((row) => row.totalWeight);
  const bugsRatioData = rows.map((row) => parseFloat(row.bugsRatio.toFixed(2)));
  const finishRateData = rows.map((row) =>
    parseFloat(row.finishRate.toFixed(2)),
  );

  const commonProps = {
    height: CHART_HEIGHT,
    borderRadius: 6,
    margin: { top: 20, right: 20, bottom: 88, left: 48 },
    xAxis: [
      {
        scaleType: 'band' as const,
        data: engineers,
        height: 84,
        tickLabelStyle: {
          angle: -35,
          textAnchor: 'end',
          fontSize: 11,
          fontStyle: 'italic',
        },
      },
    ],
  };

  return (
    <section
      className={className ? `${styles.section} ${className}` : styles.section}
    >
      <h2 className={styles.title}>TWBE Total Comparison Chart</h2>
      <p className={styles.subtitle}>
        Komparasi TWBE total per engineer dengan sumbu X nama engineer dan sumbu
        Y nilai.
      </p>

      <div className={styles.grid}>
        <div className={styles.chartCard}>
          <p className={styles.chartTitle}>Jumlah Task</p>
          <BarChart
            {...commonProps}
            series={[
              {
                data: totalTaskData,
                label: 'Total Task',
                color: '#2e7d32',
                valueFormatter: (v) => numberFormatter.format(v ?? 0),
              },
            ]}
          />
        </div>

        <div className={styles.chartCard}>
          <p className={styles.chartTitle}>Weight</p>
          <BarChart
            {...commonProps}
            series={[
              {
                data: totalWeightData,
                label: 'Total Weight',
                color: '#1565c0',
                valueFormatter: (v) => numberFormatter.format(v ?? 0),
              },
            ]}
          />
        </div>

        <div className={styles.chartCard}>
          <p className={styles.chartTitle}>Bugs Ratio</p>
          <BarChart
            {...commonProps}
            series={[
              {
                data: bugsRatioData,
                label: 'Bugs Ratio',
                color: '#c62828',
                valueFormatter: (v) => numberFormatter.format(v ?? 0),
              },
            ]}
          />
        </div>

        <div className={styles.chartCard}>
          <p className={styles.chartTitle}>Finish Rate (%)</p>
          <BarChart
            {...commonProps}
            yAxis={[{ min: 0, max: 100 }]}
            series={[
              {
                data: finishRateData,
                label: 'Finish Rate',
                color: '#6a1b9a',
                valueFormatter: (v) => `${v ?? 0}%`,
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
