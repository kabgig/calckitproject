// Mortgage Refinance engine

import { solveForPayment, round } from './shared/math';

export interface RefinanceResult {
  currentPayment: number;
  newPayment: number;
  monthlySavings: number;
  breakEvenMonths: number;
  currentTotalInterest: number;
  newTotalInterest: number;
  lifetimeSavings: number;
}

export function calculateRefinance(
  currentBalance: number,
  currentRate: number,
  remainingMonths: number,
  newRate: number,
  newTermMonths: number,
  closingCosts: number
): RefinanceResult {
  const currentPayment = solveForPayment(currentBalance, currentRate, remainingMonths);
  const newPayment = solveForPayment(currentBalance, newRate, newTermMonths);
  const monthlySavings = currentPayment - newPayment;

  const currentTotalInterest = currentPayment * remainingMonths - currentBalance;
  const newTotalInterest = newPayment * newTermMonths - currentBalance;
  const lifetimeSavings = currentTotalInterest - newTotalInterest - closingCosts;
  const breakEvenMonths =
    monthlySavings > 0 ? Math.ceil(closingCosts / monthlySavings) : Infinity;

  return {
    currentPayment: round(currentPayment),
    newPayment: round(newPayment),
    monthlySavings: round(monthlySavings),
    breakEvenMonths,
    currentTotalInterest: round(currentTotalInterest),
    newTotalInterest: round(newTotalInterest),
    lifetimeSavings: round(lifetimeSavings),
  };
}
