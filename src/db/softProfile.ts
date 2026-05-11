export const SOFT_PROFILE_TEXT_KEYS = [
  'collaborationType',
  'workStyle',
  'strengths',
  'developmentAreas',
  'uniqueSellingPoint',
] as const;

export type SoftProfileTextKey = (typeof SOFT_PROFILE_TEXT_KEYS)[number];

export const SOFT_PROFILE_TEXT_LABELS: Record<SoftProfileTextKey, string> = {
  collaborationType: 'Tipe Kolaborasi',
  workStyle: 'Gaya Kerja',
  strengths: 'Kelebihan Utama',
  developmentAreas: 'Area Pengembangan',
  uniqueSellingPoint: 'Potensi / USP',
};
