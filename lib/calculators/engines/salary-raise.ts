import { round } from './shared/math';

export interface SalaryRaiseResult {
  oldSalary: number;
  newSalary: number;
  raiseAmount: number;
  raisePercent: number;
  monthlyIncrease: number;
  newMonthly: number;
}

export function calculateSalaryRaise(
  currentSalary: number,
  raisePercent: number
): SalaryRaiseResult {
  const raiseAmount = currentSalary * raisePercent / 100;
  const newSalary = currentSalary + raiseAmount;
  return {
    oldSalary: round(currentSalary, 2),
    newSalary: round(newSalary, 2),
    raiseAmount: round(raiseAmount, 2),
    raisePercent: round(raisePercent, 2),
    monthlyIncrease: round(raiseAmount / 12, 2),
    newMonthly: round(newSalary / 12, 2),
  };
}
