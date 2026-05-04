'use client';

import { BarChart } from '@mui/x-charts/BarChart';
import styles from './ProfileChartSection.module.css';
import type { ProfileChartSectionProps } from './ProfileChartSection.types';

const CHART_HEIGHT = 240;

const numberFormatter = new Intl.NumberFormat('id-ID', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

function shortMonth(month: string): string {
  return month.slice(0, 3);
}

export default function ProfileChartSection({
  rows,
  className,
}: ProfileChartSectionProps) {
  const months = rows.map((r) => shortMonth(r.month));
  const totalTaskData = rows.map((r) => r.totalTask);
  const totalWeightData = rows.map((r) => r.totalWeight);
  const bugsRatioData = rows.map((r) => parseFloat(r.bugsRatio.toFixed(2)));
  const finishRateData = rows.map((r) => parseFloat(r.finishRate.toFixed(2)));

  const commonProps = {
    height: CHART_HEIGHT,
    borderRadius: 6,
  };

  return (
    <section
      className={className ? `${styles.section} ${className}` : styles.section}
    >
      <h2 className={styles.title}>TWBE Monthly Chart</h2>
      <p className={styles.subtitle}>
        Visualisasi performa bulanan berdasarkan data TWBE.
      </p>

      <div className={styles.grid}>
        <div className={styles.chartCard}>
          <p className={styles.chartTitle}>Jumlah Task</p>
          <BarChart
            {...commonProps}
            xAxis={[{ scaleType: 'band', data: months }]}
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
            xAxis={[{ scaleType: 'band', data: months }]}
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
            xAxis={[{ scaleType: 'band', data: months }]}
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
            xAxis={[{ scaleType: 'band', data: months }]}
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
