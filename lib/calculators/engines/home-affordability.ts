// Home Affordability engine — 28/36 DTI rule

import { solveForPayment, solveForPrincipal, round } from './shared/math';

export interface AffordabilityResult {
  maxHomePrice: number;
  maxLoanAmount: number;
  downPaymentAmount: number;
  estimatedMonthlyPayment: number;
  monthlyTaxes: number;
  monthlyInsurance: number;
  totalMonthlyHousing: number;
  frontEndDTI: number;
  backEndDTI: number;
}

export function calculateAffordability(
  annualIncome: number,
  monthlyDebts: number,
  downPaymentPercent: number,
  annualRate: number,
  termYears: number,
  propertyTaxRate: number,
  annualInsurance: number
): AffordabilityResult {
  const monthlyIncome = annualIncome / 12;
  const totalPayments = termYears * 12;

  // Front-end DTI: max 28% of gross income for housing
  const maxHousing28 = monthlyIncome * 0.28;
  // Back-end DTI: max 36% of gross income for all debts
  const maxHousing36 = monthlyIncome * 0.36 - monthlyDebts;

  const maxMonthlyHousing = Math.min(maxHousing28, maxHousing36);

  // Subtract taxes and insurance to get max P&I
  const monthlyInsurance = annualInsurance / 12;
  // We need to estimate taxes based on home price, which depends on the max we calculate
  // Iterative approach: estimate max loan from P&I, then derive home price, then taxes
  // Simplified: assume tax/insurance are % of home price, solve algebraically

  // maxPI + homePrice * (taxRate/100/12) + insurance/12 = maxMonthlyHousing
  // homePrice = maxLoan / (1 - downPercent/100)
  // maxLoan = solveForPrincipal(maxPI, rate, payments)
  // maxPI = maxMonthlyHousing - homePrice * taxRate/100/12 - insurance/12

  // Let dp = downPaymentPercent / 100
  // homePrice = maxLoan / (1 - dp)
  // maxPI = maxMonthlyHousing - (maxLoan / (1 - dp)) * (taxRate/100/12) - insurance/12

  const dp = downPaymentPercent / 100;
  const monthlyTaxRateFactor = propertyTaxRate / 100 / 12;

  // Binary search for max loan
  let lo = 0;
  let hi = 5000000;
  let maxLoan = 0;

  for (let iter = 0; iter < 100; iter++) {
    const mid = (lo + hi) / 2;
    const homePrice = mid / (1 - dp);
    const monthlyTax = homePrice * monthlyTaxRateFactor;
    const piPayment = solveForPayment(mid, annualRate, totalPayments);
    const totalHousing = piPayment + monthlyTax + monthlyInsurance;

    if (totalHousing <= maxMonthlyHousing) {
      maxLoan = mid;
      lo = mid;
    } else {
      hi = mid;
    }
    if (hi - lo < 1) break;
  }

  const maxHomePrice = maxLoan / (1 - dp);
  const downPaymentAmount = maxHomePrice * dp;
  const estimatedMonthlyPayment = solveForPayment(maxLoan, annualRate, totalPayments);
  const monthlyTaxes = maxHomePrice * monthlyTaxRateFactor;
  const totalMonthlyHousing = estimatedMonthlyPayment + monthlyTaxes + monthlyInsurance;
  const frontEndDTI = monthlyIncome > 0 ? (totalMonthlyHousing / monthlyIncome) * 100 : 0;
  const backEndDTI = monthlyIncome > 0 ? ((totalMonthlyHousing + monthlyDebts) / monthlyIncome) * 100 : 0;

  return {
    maxHomePrice: round(maxHomePrice),
    maxLoanAmount: round(maxLoan),
    downPaymentAmount: round(downPaymentAmount),
    estimatedMonthlyPayment: round(estimatedMonthlyPayment),
    monthlyTaxes: round(monthlyTaxes),
    monthlyInsurance: round(monthlyInsurance),
    totalMonthlyHousing: round(totalMonthlyHousing),
    frontEndDTI: round(frontEndDTI, 1),
    backEndDTI: round(backEndDTI, 1),
  };
}
