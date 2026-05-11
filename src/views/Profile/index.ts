import { agmarPutraProfileData } from './AgmarPutra/AgmarPutra';
import { bagusNurSolaymanProfileData } from './BagusNurSolayman/BagusNurSolayman';
import { iNyomanArijayaPutraProfileData } from './INyomanArijayaPutra/INyomanArijayaPutra';
import { nandaYusufNurPratamaProfileData } from './NandaYusufNurPratama/NandaYusufNurPratama';
import type { EngineerProfileData } from './ProfileView';
import { rafliRaiRizkyProfileData } from './RafliRaiRizky/RafliRaiRizky';

export interface EngineerProfileRegistryItem {
  slug: string;
  profile: EngineerProfileData;
}

export const engineerProfileRegistry: EngineerProfileRegistryItem[] = [
  {
    slug: 'agmar-putra',
    profile: agmarPutraProfileData,
  },
  {
    slug: 'bagus-nur-solayman',
    profile: bagusNurSolaymanProfileData,
  },
  {
    slug: 'i-nyoman-arijaya-putra',
    profile: iNyomanArijayaPutraProfileData,
  },
  {
    slug: 'nanda-yusuf-nur-pratama',
    profile: nandaYusufNurPratamaProfileData,
  },
  {
    slug: 'rafli-rai-rizky',
    profile: rafliRaiRizkyProfileData,
  },
];

export const allEngineerProfiles: EngineerProfileData[] =
  engineerProfileRegistry.map((item) => item.profile);

export {
  agmarPutraProfileData,
  bagusNurSolaymanProfileData,
  iNyomanArijayaPutraProfileData,
  nandaYusufNurPratamaProfileData,
  rafliRaiRizkyProfileData,
};

export type { EngineerProfileData } from './ProfileView';
