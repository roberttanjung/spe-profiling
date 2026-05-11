import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { getTwbeMonthlyRowsByEmployeeName } from '@/utils/twbe';
import { getEngineerList } from '@/views/KpiGenerator/kpi.utils';
import {
  allEngineerProfiles,
  engineerProfileRegistry,
} from '@/views/Profile';

describe('profile SSOT guard', () => {
  it('has unique slug and engineer name in registry', () => {
    const slugs = engineerProfileRegistry.map((item) => item.slug);
    const names = engineerProfileRegistry.map((item) => item.profile.name);

    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(names).size).toBe(names.length);
  });

  it('ensures every registry slug has a profile route page', () => {
    const missingRoutePages = engineerProfileRegistry.filter((item) => {
      const pagePath = resolve(
        process.cwd(),
        'src/app/(admin)/profile',
        item.slug,
        'page.tsx',
      );

      return !existsSync(pagePath);
    });

    expect(missingRoutePages).toEqual([]);
  });

  it('ensures every engineer in registry has TWBE monthly data', () => {
    const engineersWithoutTwbe = allEngineerProfiles.filter((profile) => {
      return getTwbeMonthlyRowsByEmployeeName(profile.name).length === 0;
    });

    expect(engineersWithoutTwbe).toEqual([]);
  });

  it('keeps KPI engineer list aligned with profile registry', () => {
    const registryNames = allEngineerProfiles.map((profile) => profile.name);
    expect(getEngineerList()).toEqual(registryNames);
  });
});