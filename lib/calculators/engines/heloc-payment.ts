import { round, solveForPayment } from './shared/math';

export interface HELOCResult {
  monthlyPayment: number;
  totalInterest: number;
  totalPaid: number;
  drawAmount: number;
}

export function calculateHELOC(
  drawAmount: number,
  annualRate: number,
  repaymentYears: number
): HELOCResult {
  const totalPayments = repaymentYears * 12;
  const monthlyPayment = solveForPayment(drawAmount, annualRate, totalPayments);
  const totalPaid = monthlyPayment * totalPayments;
  const totalInterest = totalPaid - drawAmount;

  return {
    monthlyPayment: round(monthlyPayment, 2),
    totalInterest: round(totalInterest, 2),
    totalPaid: round(totalPaid, 2),
    drawAmount: round(drawAmount, 2),
  };
}
