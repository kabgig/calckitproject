import { round } from './shared/math';

export interface FreelanceRateResult {
  hourlyRate: number;
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  annualRevenue: number;
  effectiveHourlyAfterExpenses: number;
  billableHoursPerYear: number;
}

export function calculateFreelanceRate(
  desiredAnnualIncome: number,
  annualExpenses: number,
  billableHoursPerWeek: number,
  weeksPerYear: number = 48,
  taxRate: number = 30
): FreelanceRateResult {
  const billableHoursPerYear = billableHoursPerWeek * weeksPerYear;
  const annualRevenue = (desiredAnnualIncome + annualExpenses) / (1 - taxRate / 100);
  const hourlyRate = annualRevenue / billableHoursPerYear;
  const dailyRate = hourlyRate * 8;
  const weeklyRate = hourlyRate * billableHoursPerWeek;
  const monthlyRate = annualRevenue / 12;
  const effectiveHourly = desiredAnnualIncome / billableHoursPerYear;

  return {
    hourlyRate: round(hourlyRate, 2),
    dailyRate: round(dailyRate, 2),
    weeklyRate: round(weeklyRate, 2),
    monthlyRate: round(monthlyRate, 2),
    annualRevenue: round(annualRevenue, 2),
    effectiveHourlyAfterExpenses: round(effectiveHourly, 2),
    billableHoursPerYear,
  };
}
