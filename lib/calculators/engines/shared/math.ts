// ── Shared financial math helpers ──
// Pure, zero-dependency math used across all calculators.

/**
 * Round to `decimals` places (default 2).
 */
export function round(value: number, decimals = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Monthly payment for a fixed-rate amortized loan.
 * M = P·r(1+r)ⁿ / [(1+r)ⁿ − 1]
 */
export function solveForPayment(
  principal: number,
  annualRate: number,
  totalPayments: number
): number {
  const r = annualRate / 100 / 12;
  if (r === 0) return principal / totalPayments;
  const factor = Math.pow(1 + r, totalPayments);
  return principal * ((r * factor) / (factor - 1));
}

/**
 * Future value of a lump sum with optional recurring contributions.
 * FV = PV·(1+r/n)^(n·t) + PMT·[((1+r/n)^(n·t) − 1) / (r/n)]
 */
export function futureValue(
  presentValue: number,
  annualRate: number,
  years: number,
  compoundsPerYear: number,
  periodicContribution = 0
): number {
  const r = annualRate / 100;
  if (r === 0) {
    return presentValue + periodicContribution * compoundsPerYear * years;
  }
  const rn = r / compoundsPerYear;
  const nt = compoundsPerYear * years;
  const factor = Math.pow(1 + rn, nt);
  const fvLump = presentValue * factor;
  const fvAnnuity = periodicContribution * ((factor - 1) / rn);
  return fvLump + fvAnnuity;
}

/**
 * Present value of a future sum.
 * PV = FV / (1+r/n)^(n·t)
 */
export function presentValue(
  fv: number,
  annualRate: number,
  years: number,
  compoundsPerYear: number
): number {
  const r = annualRate / 100;
  if (r === 0) return fv;
  const rn = r / compoundsPerYear;
  const nt = compoundsPerYear * years;
  return fv / Math.pow(1 + rn, nt);
}

/**
 * Total interest paid over an amortized loan.
 */
export function totalInterest(
  principal: number,
  monthlyPayment: number,
  totalPayments: number
): number {
  return monthlyPayment * totalPayments - principal;
}

/**
 * Compound Annual Growth Rate.
 * CAGR = (endValue / startValue)^(1/years) − 1
 */
export function cagr(
  startValue: number,
  endValue: number,
  years: number
): number {
  if (startValue <= 0 || years <= 0) return 0;
  return Math.pow(endValue / startValue, 1 / years) - 1;
}

/**
 * APY from a nominal rate + compounding frequency.
 * APY = (1 + r/n)ⁿ − 1  (or e^r − 1 for continuous)
 */
export function computeAPY(
  nominalRate: number,
  compoundsPerYear: number | 'continuous'
): number {
  const r = nominalRate / 100;
  if (compoundsPerYear === 'continuous') return Math.exp(r) - 1;
  if (compoundsPerYear <= 0) return 0;
  return Math.pow(1 + r / compoundsPerYear, compoundsPerYear) - 1;
}

/**
 * Compound frequency string → number (for APY calc).
 */
export function frequencyToN(
  freq: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual' | 'continuous' | 'custom',
  customN?: number
): number | 'continuous' {
  switch (freq) {
    case 'daily':
      return 365;
    case 'weekly':
      return 52;
    case 'monthly':
      return 12;
    case 'quarterly':
      return 4;
    case 'annual':
      return 1;
    case 'continuous':
      return 'continuous';
    case 'custom':
      return customN ?? 12;
  }
}

// ── Formatting helpers ──

/**
 * Format a number as USD currency: $12,345.67
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format a number as a percentage: 5.25%
 */
export function formatPercent(value: number, decimals = 2): string {
  return `${round(value, decimals)}%`;
}

/**
 * Format a plain number with commas: 1,234,567
 */
export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}
