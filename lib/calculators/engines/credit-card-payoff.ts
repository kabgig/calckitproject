// Credit Card Payoff engine

import { addMonths, format } from 'date-fns';
import { round } from './shared/math';

export interface CCPayoffRow {
  month: number;
  date: string;
  payment: number;
  principalPaid: number;
  interestPaid: number;
  balance: number;
}

export interface CCPayoffResult {
  monthsToPayoff: number;
  totalInterest: number;
  totalPaid: number;
}

export function calculateCCPayoff(
  balance: number,
  apr: number,
  monthlyPayment: number
): CCPayoffResult {
  const monthlyRate = apr / 100 / 12;
  let bal = balance;
  let months = 0;
  let totalInterest = 0;

  if (monthlyPayment <= bal * monthlyRate) {
    return { monthsToPayoff: Infinity, totalInterest: Infinity, totalPaid: Infinity };
  }

  while (bal > 0.01 && months < 1200) {
    months++;
    const interest = bal * monthlyRate;
    totalInterest += interest;
    const pay = Math.min(bal + interest, monthlyPayment);
    bal = bal + interest - pay;
  }

  return {
    monthsToPayoff: months,
    totalInterest: round(totalInterest),
    totalPaid: round(balance + totalInterest),
  };
}

export function generateCCSchedule(
  balance: number,
  apr: number,
  monthlyPayment: number,
  startDate: Date
): CCPayoffRow[] {
  const monthlyRate = apr / 100 / 12;
  let bal = balance;
  const rows: CCPayoffRow[] = [];
  let i = 0;

  while (bal > 0.01 && i < 1200) {
    i++;
    const interest = bal * monthlyRate;
    const pay = Math.min(bal + interest, monthlyPayment);
    const principal = pay - interest;
    bal = bal - principal;

    rows.push({
      month: i,
      date: format(addMonths(startDate, i), 'MMM yyyy'),
      payment: round(pay),
      principalPaid: round(principal),
      interestPaid: round(interest),
      balance: round(Math.max(0, bal)),
    });
  }

  return rows;
}
