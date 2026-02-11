// Mortgage calculation engine
// Pure functions — no React, no side effects.

import { addMonths, format } from 'date-fns';
import { solveForPayment, round } from './shared/math';

export interface MortgageResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

export interface AmortizationRow {
  paymentNum: number;
  date: string;
  principalPaid: number;
  interestPaid: number;
  balance: number;
}

export function calculateMortgage(
  principal: number,
  annualRate: number,
  years: number
): MortgageResult {
  const totalPayments = years * 12;
  const monthlyPayment = solveForPayment(principal, annualRate, totalPayments);
  const totalPayment = monthlyPayment * totalPayments;
  const totalInterest = totalPayment - principal;

  return {
    monthlyPayment: round(monthlyPayment),
    totalPayment: round(totalPayment),
    totalInterest: round(totalInterest),
  };
}

export function generateAmortization(
  principal: number,
  annualRate: number,
  years: number,
  startDate: Date
): AmortizationRow[] {
  const totalPayments = years * 12;
  const monthlyPayment = solveForPayment(principal, annualRate, totalPayments);
  const monthlyRate = annualRate / 100 / 12;

  let balance = principal;
  const rows: AmortizationRow[] = [];

  for (let i = 1; i <= totalPayments; i++) {
    const interestPaid = balance * monthlyRate;
    const principalPaid = monthlyPayment - interestPaid;
    balance -= principalPaid;
    if (i === totalPayments) balance = 0;

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
