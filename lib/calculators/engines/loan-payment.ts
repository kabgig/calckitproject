// Loan Payment calculation engine
// Generic loan (auto, personal, student, etc.)

import { addMonths, format } from 'date-fns';
import { solveForPayment, round } from './shared/math';

export interface LoanPaymentResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

export interface LoanScheduleRow {
  paymentNum: number;
  date: string;
  principalPaid: number;
  interestPaid: number;
  balance: number;
}

export function calculateLoanPayment(
  principal: number,
  annualRate: number,
  months: number
): LoanPaymentResult {
  const monthlyPayment = solveForPayment(principal, annualRate, months);
  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - principal;

  return {
    monthlyPayment: round(monthlyPayment),
    totalPayment: round(totalPayment),
    totalInterest: round(totalInterest),
  };
}

export function generateLoanSchedule(
  principal: number,
  annualRate: number,
  months: number,
  startDate: Date
): LoanScheduleRow[] {
  const monthlyPayment = solveForPayment(principal, annualRate, months);
  const monthlyRate = annualRate / 100 / 12;

  let balance = principal;
  const rows: LoanScheduleRow[] = [];

  for (let i = 1; i <= months; i++) {
    const interestPaid = balance * monthlyRate;
    const principalPaid = monthlyPayment - interestPaid;
    balance -= principalPaid;
    if (i === months) balance = 0;

    rows.push({
      paymentNum: i,
      date: format(addMonths(startDate, i), 'MMM yyyy'),
      principalPaid: round(principalPaid),
      interestPaid: round(interestPaid),
      balance: round(Math.max(0, balance)),
    });
  }

  return rows;
}
