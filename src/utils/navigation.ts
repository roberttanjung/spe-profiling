import { engineerProfileRegistry } from '@/views/Profile';

export interface EngineerNavigationItem {
  name: string;
  path: string;
}

export const engineerNavigationItems: EngineerNavigationItem[] =
  engineerProfileRegistry.map((item) => ({
    name: item.profile.name,
    path: `/profile/${item.slug}`,
  }));
