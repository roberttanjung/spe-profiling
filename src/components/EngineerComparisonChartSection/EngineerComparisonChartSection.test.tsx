import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import EngineerComparisonChartSection, {
  computeYAxisMax,
  getAdaptiveLabelPlacement,
  getAdaptiveLabelStyle,
} from './EngineerComparisonChartSection';

const mockRows = [
  {
    engineerName: 'Agmar Putra',
    totalTask: 50,
    totalWeight: 70,
    bugsRatio: 0.1,
    finishRate: 97,
  },
  {
    engineerName: 'Bagus Nur Solayman',
    totalTask: 45,
    totalWeight: 65,
    bugsRatio: 0.15,
    finishRate: 95,
  },
];

describe('computeYAxisMax', () => {
  it('returns max value padded by 25%', () => {
    expect(computeYAxisMax([50, 45])).toBeCloseTo(50 * 1.25);
  });

  it('returns 0 for empty array', () => {
    expect(computeYAxisMax([])).toBe(0);
  });
});

describe('getAdaptiveLabelPlacement', () => {
  it('uses outside for short bars', () => {
    expect(getAdaptiveLabelPlacement(12)).toBe('outside');
  });

  it('uses center for tall bars', () => {
    expect(getAdaptiveLabelPlacement(36)).toBe('center');
  });
});

describe('getAdaptiveLabelStyle', () => {
  it('uses white text for center placement', () => {
    expect(getAdaptiveLabelStyle('center').fill).toBe('#ffffff');
  });

  it('uses dark text for outside placement', () => {
    expect(getAdaptiveLabelStyle('outside').fill).toBe('#1a1a1a');
  });
});

describe('EngineerComparisonChartSection', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <EngineerComparisonChartSection rows={mockRows} />,
    );
    expect(container).toBeTruthy();
  });

  it('renders bar label text elements for each bar', async () => {
    const { container } = render(
      <EngineerComparisonChartSection rows={mockRows} />,
    );
    // MUI BarChart renders barLabel as <text> elements inside SVG
    const textElements = container.querySelectorAll('text');
    const labelTexts = Array.from(textElements).map(
      (el) => el.textContent ?? '',
    );
    // Should contain numeric values from the data
    expect(
      labelTexts.some(
        (t) => t.includes('50') || t.includes('70') || t.includes('97'),
      ),
    ).toBe(true);
  });
});
