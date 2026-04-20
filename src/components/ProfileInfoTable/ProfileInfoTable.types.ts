import type { ReactNode } from 'react';

export interface ProfileInfoRow {
  label: string;
  value: ReactNode | ReactNode[];
}

export interface ProfileInfoTableProps {
  rows: ProfileInfoRow[];
  className?: string;
}
