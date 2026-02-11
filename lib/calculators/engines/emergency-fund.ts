import { round } from './shared/math';

export interface EmergencyFundResult {
  targetFund: number;
  currentShortfall: number;
  monthlyRequired: number;
  monthsToGoal: number;
  monthlyExpenses: number;
}

export function calculateEmergencyFund(
  monthlyExpenses: number,
  monthsCoverage: number,
  currentSavings: number,
  monthlySavingsRate: number
): EmergencyFundResult {
  const targetFund = monthlyExpenses * monthsCoverage;
  const shortfall = Math.max(0, targetFund - currentSavings);
  const monthsToGoal =
    monthlySavingsRate > 0 ? Math.ceil(shortfall / monthlySavingsRate) : shortfall > 0 ? Infinity : 0;

  return {
    targetFund: round(targetFund, 2),
    currentShortfall: round(shortfall, 2),
    monthlyRequired: round(monthlySavingsRate, 2),
    monthsToGoal,
    monthlyExpenses,
  };
}
