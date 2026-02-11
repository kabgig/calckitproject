// Loan Comparison engine — compare two loan offers side by side

import { solveForPayment, round } from './shared/math';

export interface LoanSide {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  totalCost: number; // totalPayment + fees
}

export interface LoanComparisonResult {
  loanA: LoanSide;
  loanB: LoanSide;
  monthlySavings: number;
  totalSavings: number;
  cheaperLoan: 'A' | 'B' | 'equal';
}

function computeSide(
  principal: number,
  annualRate: number,
  months: number,
  fees: number
): LoanSide {
  const monthlyPayment = solveForPayment(principal, annualRate, months);
  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - principal;
  return {
    monthlyPayment: round(monthlyPayment),
    totalPayment: round(totalPayment),
    totalInterest: round(totalInterest),
    totalCost: round(totalPayment + fees),
  };
}

export function compareTwoLoans(
  amountA: number,
  rateA: number,
  monthsA: number,
  feesA: number,
  amountB: number,
  rateB: number,
  monthsB: number,
  feesB: number
): LoanComparisonResult {
  const loanA = computeSide(amountA, rateA, monthsA, feesA);
  const loanB = computeSide(amountB, rateB, monthsB, feesB);
  const monthlySavings = round(Math.abs(loanA.monthlyPayment - loanB.monthlyPayment));
  const totalSavings = round(Math.abs(loanA.totalCost - loanB.totalCost));
  const cheaperLoan =
    loanA.totalCost < loanB.totalCost
      ? 'A'
      : loanB.totalCost < loanA.totalCost
        ? 'B'
        : 'equal';

  return { loanA, loanB, monthlySavings, totalSavings, cheaperLoan };
}
