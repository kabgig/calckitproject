// APY calculation engine
// Pure functions — no React, no side effects.

import { computeAPY, frequencyToN, round } from './shared/math';

export type CompoundFrequency =
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'quarterly'
  | 'annual'
  | 'continuous'
  | 'custom';

export interface APYResult {
  /** APY as a percentage, e.g. 5.12 means 5.12% */
  apy: number;
}

export interface GrowthRow {
  year: number;
  balance: number;
}

export function calculateAPYResult(
  apr: number,
  frequency: CompoundFrequency,
  customN?: number
): APYResult {
  const n = frequencyToN(frequency, customN);
  const apyDecimal = computeAPY(apr, n);
  return { apy: round(apyDecimal * 100, 2) };
}

export function generateGrowthTable(
  principal: number,
  apyPercent: number,
  years: number
): GrowthRow[] {
  const multiplier = 1 + apyPercent / 100;
  const rows: GrowthRow[] = [];

  for (let y = 0; y <= years; y++) {
    rows.push({
      year: y,
      balance: round(principal * Math.pow(multiplier, y)),
    });
  }

  return rows;
}
