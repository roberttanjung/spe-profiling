import type { ReactNode } from 'react';

const EMPHASIZED_TERMS = [
  'Koordinatif-proaktif',
  'Aktif-komunikatif',
  'Explorative-collaborative',
  'Problem-solver kolaboratif',
  'Individual contributor',
] as const;

const emphasizedTermSet = new Set<string>(EMPHASIZED_TERMS);
const emphasizedTermPattern = new RegExp(
  `(${EMPHASIZED_TERMS.map((term) => term.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')).join('|')})`,
  'g',
);

export function emphasizeProfileTerms(text: string): ReactNode {
  if (!text) {
    return text;
  }

  return text.split(emphasizedTermPattern).map((chunk, index) => {
    if (emphasizedTermSet.has(chunk)) {
      return <strong key={`${chunk}-${index}`}>{chunk}</strong>;
    }

    return chunk;
  });
}
