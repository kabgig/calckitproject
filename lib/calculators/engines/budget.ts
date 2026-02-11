import { round } from './shared/math';

export interface BudgetBreakdown {
  needs: number;
  wants: number;
  savings: number;
  needsPercent: number;
  wantsPercent: number;
  savingsPercent: number;
  totalIncome: number;
}

export function calculateBudget(
  monthlyIncome: number,
  needsPercent: number = 50,
  wantsPercent: number = 30,
  savingsPercent: number = 20
): BudgetBreakdown {
  const total = needsPercent + wantsPercent + savingsPercent;
  const nP = needsPercent / total * 100;
  const wP = wantsPercent / total * 100;
  const sP = savingsPercent / total * 100;

  return {
    needs: round(monthlyIncome * nP / 100, 2),
    wants: round(monthlyIncome * wP / 100, 2),
    savings: round(monthlyIncome * sP / 100, 2),
    needsPercent: round(nP, 1),
    wantsPercent: round(wP, 1),
    savingsPercent: round(sP, 1),
    totalIncome: monthlyIncome,
  };
}
