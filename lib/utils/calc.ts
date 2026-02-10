import { addMonths, format } from 'date-fns';

export interface MortgagePayment {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

export interface AmortizationRow {
  paymentNum: number;
  date: string;
  principalPaid: number;
  interestPaid: number;
  balance: number;
}

export interface APYResult {
  apy: number;
}

export interface GrowthRow {
  year: number;
  balance: number;
}

/**
 * Calculate monthly mortgage payment
 * Formula: M = P[r(1+r)^n]/[(1+r)^n-1]
 */
export function calculateMortgagePayment(
  principal: number,
  annualRate: number,
  years: number
): MortgagePayment {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;

  let monthlyPayment: number;

  if (monthlyRate === 0) {
    monthlyPayment = principal / numberOfPayments;
  } else {
    const numerator = monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments);
    const denominator = Math.pow(1 + monthlyRate, numberOfPayments) - 1;
    monthlyPayment = principal * (numerator / denominator);
  }

  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - principal;

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
  };
}

/**
 * Generate full amortization schedule
 */
export function generateAmortizationTable(
  principal: number,
  annualRate: number,
  years: number,
  startDate: Date
): AmortizationRow[] {
  const { monthlyPayment } = calculateMortgagePayment(principal, annualRate, years);
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;

  let balance = principal;
  const schedule: AmortizationRow[] = [];

  for (let i = 1; i <= numberOfPayments; i++) {
    const interestPaid = balance * monthlyRate;
    const principalPaid = monthlyPayment - interestPaid;
    balance = balance - principalPaid;

    // Handle final payment rounding
    if (i === numberOfPayments) {
      balance = 0;
    }

    const paymentDate = addMonths(startDate, i);

    schedule.push({
      paymentNum: i,
      date: format(paymentDate, 'MMM yyyy'),
      principalPaid: Math.round(principalPaid * 100) / 100,
      interestPaid: Math.round(interestPaid * 100) / 100,
      balance: Math.round(Math.max(0, balance) * 100) / 100,
    });
  }

  return schedule;
}

/**
 * Calculate APY from APR
 * Formula: APY = (1 + r/n)^n - 1 (or e^r - 1 for continuous)
 */
export function calculateAPY(
  apr: number,
  compoundFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual' | 'continuous' | 'custom',
  customN?: number
): APYResult {
  const r = apr / 100;
  let apy: number;

  if (compoundFrequency === 'continuous') {
    apy = Math.exp(r) - 1;
  } else {
    let n: number;
    switch (compoundFrequency) {
      case 'daily':
        n = 365;
        break;
      case 'weekly':
        n = 52;
        break;
      case 'monthly':
        n = 12;
        break;
      case 'quarterly':
        n = 4;
        break;
      case 'annual':
        n = 1;
        break;
      case 'custom':
        n = customN || 12;
        break;
      default:
        n = 12;
    }

    apy = Math.pow(1 + r / n, n) - 1;
  }

  return {
    apy: Math.round(apy * 10000) / 100, // Convert to percentage with 2 decimals
  };
}

/**
 * Generate APY growth projection table
 */
export function generateAPYGrowthTable(
  principal: number,
  apy: number,
  years: number
): GrowthRow[] {
  const growthTable: GrowthRow[] = [];
  const annualMultiplier = 1 + apy / 100;

  for (let year = 0; year <= years; year++) {
    const balance = principal * Math.pow(annualMultiplier, year);
    growthTable.push({
      year,
      balance: Math.round(balance * 100) / 100,
    });
  }

  return growthTable;
}
