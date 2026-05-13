'use client';

import { BarChart } from '@mui/x-charts/BarChart';
import { BarLabel } from '@mui/x-charts/BarChart';
import type { BarLabelProps } from '@mui/x-charts/BarChart';
import styles from './ProfileChartSection.module.css';
import type { ProfileChartSectionProps } from './ProfileChartSection.types';

const CHART_HEIGHT = 280;

function computeYAxisMax(data: number[]): number {
  if (data.length === 0) return 0;
  return Math.max(...data) * 1.25;
}

const MIN_INSIDE_LABEL_HEIGHT = 24;

function getAdaptiveLabelPlacement(height: number): 'center' | 'outside' {
  return height < MIN_INSIDE_LABEL_HEIGHT ? 'outside' : 'center';
}

function getAdaptiveLabelStyle(placement: 'center' | 'outside') {
  return {
    fill:
      placement === 'center'
        ? 'var(--chart-label-inside, #ffffff)'
        : 'var(--chart-label-outside, #1a1a1a)',
    fontWeight: 700,
    fontSize: 11,
  };
}

function AdaptiveBarLabel(props: BarLabelProps) {
  const placement = getAdaptiveLabelPlacement(props.height);
  return (
    <BarLabel
      {...props}
      placement={placement}
      style={{ ...props.style, ...getAdaptiveLabelStyle(placement) }}
    />
  );
}

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
  title = 'Chart TWBE Bulanan',
  subtitle = 'Visualisasi performa bulanan berdasarkan data TWBE.',
  showHeader = true,
}: ProfileChartSectionProps) {
  const months = rows.map((r) => shortMonth(r.month));
  const totalTaskData = rows.map((r) => r.totalTask);
  const totalWeightData = rows.map((r) => r.totalWeight);
  const bugsRatioData = rows.map((r) => parseFloat(r.bugsRatio.toFixed(2)));
  const finishRateData = rows.map((r) => parseFloat(r.finishRate.toFixed(2)));

  const taskMax = computeYAxisMax(totalTaskData);
  const weightMax = computeYAxisMax(totalWeightData);
  const bugsMax = computeYAxisMax(bugsRatioData);

  const commonProps = {
    height: CHART_HEIGHT,
    borderRadius: 6,
    margin: { top: 56 },
    slots: {
      barLabel: AdaptiveBarLabel,
    },
  };

  return (
    <section
      className={className ? `${styles.section} ${className}` : styles.section}
    >
      {showHeader ? (
        <>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </>
      ) : null}

      <div className={styles.grid}>
        <div className={styles.chartCard}>
          <p className={styles.chartTitle}>Jumlah Task</p>
          <BarChart
            {...commonProps}
            xAxis={[{ scaleType: 'band', data: months }]}
            yAxis={[{ min: 0, max: taskMax }]}
            series={[
              {
                data: totalTaskData,
                label: 'Total Task',
                color: '#2e7d32',
                valueFormatter: (v) => numberFormatter.format(v ?? 0),
                barLabel: 'value',
              },
            ]}
          />
        </div>

        <div className={styles.chartCard}>
          <p className={styles.chartTitle}>Weight</p>
          <BarChart
            {...commonProps}
            xAxis={[{ scaleType: 'band', data: months }]}
            yAxis={[{ min: 0, max: weightMax }]}
            series={[
              {
                data: totalWeightData,
                label: 'Total Weight',
                color: '#1565c0',
                valueFormatter: (v) => numberFormatter.format(v ?? 0),
                barLabel: 'value',
              },
            ]}
          />
        </div>

        <div className={styles.chartCard}>
          <p className={styles.chartTitle}>Bugs Ratio</p>
          <BarChart
            {...commonProps}
            xAxis={[{ scaleType: 'band', data: months }]}
            yAxis={[{ min: 0, max: bugsMax }]}
            series={[
              {
                data: bugsRatioData,
                label: 'Bugs Ratio',
                color: '#c62828',
                valueFormatter: (v) => numberFormatter.format(v ?? 0),
                barLabel: 'value',
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
                barLabel: 'value',
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
