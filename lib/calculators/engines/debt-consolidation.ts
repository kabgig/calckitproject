import { round, solveForPayment } from './shared/math';

export interface DebtItem {
  name: string;
  balance: number;
  rate: number;
  minPayment: number;
}

export interface DebtConsolidationResult {
  currentTotalBalance: number;
  currentTotalMinPayment: number;
  currentWeightedRate: number;
  currentTotalInterest: number;
  newMonthlyPayment: number;
  newTotalInterest: number;
  newTotalPaid: number;
  monthlySavings: number;
  interestSavings: number;
}

export function calculateDebtConsolidation(
  debts: DebtItem[],
  consolidationRate: number,
  consolidationTermMonths: number
): DebtConsolidationResult {
  const currentTotalBalance = debts.reduce((s, d) => s + d.balance, 0);
  const currentTotalMinPayment = debts.reduce((s, d) => s + d.minPayment, 0);
  const weightedRate =
    currentTotalBalance > 0
      ? debts.reduce((s, d) => s + d.rate * d.balance, 0) / currentTotalBalance
      : 0;

  // Estimate current total interest (simulate each debt)
  let currentTotalInterest = 0;
  for (const debt of debts) {
    let bal = debt.balance;
    const mr = debt.rate / 100 / 12;
    while (bal > 0) {
      const interest = bal * mr;
      const payment = Math.min(debt.minPayment, bal + interest);
      bal = bal + interest - payment;
      currentTotalInterest += interest;
      if (bal < 0.01) break;
      if (currentTotalInterest > 1_000_000) break; // safety
    }
  }

  const newMonthlyPayment = solveForPayment(currentTotalBalance, consolidationRate, consolidationTermMonths);
  const newTotalPaid = newMonthlyPayment * consolidationTermMonths;
  const newTotalInterest = newTotalPaid - currentTotalBalance;

  return {
    currentTotalBalance: round(currentTotalBalance, 2),
    currentTotalMinPayment: round(currentTotalMinPayment, 2),
    currentWeightedRate: round(weightedRate, 2),
    currentTotalInterest: round(currentTotalInterest, 2),
    newMonthlyPayment: round(newMonthlyPayment, 2),
    newTotalInterest: round(newTotalInterest, 2),
    newTotalPaid: round(newTotalPaid, 2),
    monthlySavings: round(currentTotalMinPayment - newMonthlyPayment, 2),
    interestSavings: round(currentTotalInterest - newTotalInterest, 2),
  };
}
