import { round } from './shared/math';

export interface SavingsGoalResult {
  monthlyRequired: number;
  totalContributions: number;
  totalInterest: number;
  months: number;
}

export function calculateSavingsGoal(
  goalAmount: number,
  currentSavings: number,
  monthlyContribution: number,
  annualReturn: number
): SavingsGoalResult {
  const monthlyRate = annualReturn / 100 / 12;
  let balance = currentSavings;
  let months = 0;
  let totalInterest = 0;

  if (monthlyContribution <= 0 && monthlyRate <= 0) {
    return { monthlyRequired: 0, totalContributions: 0, totalInterest: 0, months: Infinity };
  }

  while (balance < goalAmount && months < 1200) {
    months++;
    const interest = balance * monthlyRate;
    balance += interest + monthlyContribution;
    totalInterest += interest;
  }

  // Also calculate the minimum monthly required (ignoring user contribution)
  let reqBalance = currentSavings;
  let reqMonths = 0;
  // Use the same formula but solve for minimum monthly to reach goal in same months
  const requiredMonthly =
    monthlyRate > 0
      ? (goalAmount - currentSavings * Math.pow(1 + monthlyRate, months)) /
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
      : months > 0
        ? (goalAmount - currentSavings) / months
        : goalAmount - currentSavings;

  return {
    monthlyRequired: round(Math.max(0, requiredMonthly), 2),
    totalContributions: round(currentSavings + monthlyContribution * months, 2),
    totalInterest: round(totalInterest, 2),
    months: months >= 1200 ? Infinity : months,
  };
}
