import { round } from './shared/math';

export interface LifeInsuranceResult {
  incomeReplacement: number;
  debtCoverage: number;
  educationFund: number;
  finalExpenses: number;
  totalNeed: number;
  existingCoverage: number;
  additionalNeeded: number;
}

export function calculateLifeInsurance(
  annualIncome: number,
  yearsToReplace: number,
  totalDebt: number,
  childrenEducationCost: number,
  finalExpenses: number,
  existingCoverage: number
): LifeInsuranceResult {
  const incomeReplacement = annualIncome * yearsToReplace;
  const totalNeed = incomeReplacement + totalDebt + childrenEducationCost + finalExpenses;
  const additionalNeeded = Math.max(0, totalNeed - existingCoverage);

  return {
    incomeReplacement: round(incomeReplacement, 2),
    debtCoverage: round(totalDebt, 2),
    educationFund: round(childrenEducationCost, 2),
    finalExpenses: round(finalExpenses, 2),
    totalNeed: round(totalNeed, 2),
    existingCoverage: round(existingCoverage, 2),
    additionalNeeded: round(additionalNeeded, 2),
  };
}
