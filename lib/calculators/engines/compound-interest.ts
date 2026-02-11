// Compound Interest calculation engine
// Future value with optional periodic contributions.

import { futureValue, round } from './shared/math';

export interface CompoundInterestResult {
  finalBalance: number;
  totalContributions: number;
  totalInterestEarned: number;
}

export interface CompoundGrowthRow {
  year: number;
  balance: number;
  contributions: number;
  interestEarned: number;
}

/**
 * Calculate final balance with compound interest and optional contributions.
 */
export function calculateCompoundInterest(
  principal: number,
  annualRate: number,
  years: number,
  compoundsPerYear: number,
  monthlyContribution: number
): CompoundInterestResult {
  // Convert monthly contribution to per-compounding-period contribution
  const contributionPerPeriod =
    compoundsPerYear > 0
      ? (monthlyContribution * 12) / compoundsPerYear
      : 0;

  const finalBalance = futureValue(
    principal,
    annualRate,
    years,
    compoundsPerYear,
    contributionPerPeriod
  );

  const totalContributions = principal + monthlyContribution * 12 * years;
  const totalInterestEarned = finalBalance - totalContributions;

  return {
    finalBalance: round(finalBalance),
    totalContributions: round(totalContributions),
    totalInterestEarned: round(totalInterestEarned),
  };
}

/**
 * Generate year-by-year growth table.
 */
export function generateCompoundGrowthTable(
  principal: number,
  annualRate: number,
  years: number,
  compoundsPerYear: number,
  monthlyContribution: number
): CompoundGrowthRow[] {
  const contributionPerPeriod =
    compoundsPerYear > 0
      ? (monthlyContribution * 12) / compoundsPerYear
      : 0;

  const rows: CompoundGrowthRow[] = [];

  for (let y = 0; y <= years; y++) {
    const balance = futureValue(
      principal,
      annualRate,
      y,
      compoundsPerYear,
      contributionPerPeriod
    );
    const contributions = principal + monthlyContribution * 12 * y;
    const interestEarned = balance - contributions;

    rows.push({
      year: y,
      balance: round(balance),
      contributions: round(contributions),
      interestEarned: round(interestEarned),
    });
  }

  return rows;
}
