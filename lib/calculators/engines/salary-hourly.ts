import { round } from './shared/math';

export interface SalaryHourlyResult {
  annualSalary: number;
  monthlySalary: number;
  biweeklySalary: number;
  weeklySalary: number;
  dailySalary: number;
  hourlyRate: number;
}

export function salaryToHourly(
  annualSalary: number,
  hoursPerWeek: number = 40,
  weeksPerYear: number = 52
): SalaryHourlyResult {
  const totalHours = hoursPerWeek * weeksPerYear;
  const hourly = annualSalary / totalHours;
  return {
    annualSalary: round(annualSalary, 2),
    monthlySalary: round(annualSalary / 12, 2),
    biweeklySalary: round(annualSalary / 26, 2),
    weeklySalary: round(annualSalary / weeksPerYear, 2),
    dailySalary: round(annualSalary / (weeksPerYear * 5), 2),
    hourlyRate: round(hourly, 2),
  };
}

export function hourlyToSalary(
  hourlyRate: number,
  hoursPerWeek: number = 40,
  weeksPerYear: number = 52
): SalaryHourlyResult {
  const annual = hourlyRate * hoursPerWeek * weeksPerYear;
  return salaryToHourly(annual, hoursPerWeek, weeksPerYear);
}
