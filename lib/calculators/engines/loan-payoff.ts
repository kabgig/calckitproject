// Loan Payoff engine — extra payments shorten loan and save interest

import { addMonths, format } from 'date-fns';
import { solveForPayment, round } from './shared/math';

export interface PayoffScheduleRow {
  paymentNum: number;
  date: string;
  payment: number;
  principalPaid: number;
  interestPaid: number;
  balance: number;
}

export interface LoanPayoffResult {
  originalMonths: number;
  newMonths: number;
  monthsSaved: number;
  originalTotalInterest: number;
  newTotalInterest: number;
  interestSaved: number;
}

export function calculatePayoff(
  balance: number,
  annualRate: number,
  remainingMonths: number,
  extraPayment: number
): LoanPayoffResult {
  const monthlyRate = annualRate / 100 / 12;
  const basePayment = solveForPayment(balance, annualRate, remainingMonths);

  // Original schedule total interest
  const originalTotalInterest = round(basePayment * remainingMonths - balance);

  // New schedule with extra
  let bal = balance;
  let newMonths = 0;
  let newTotalInterest = 0;

  while (bal > 0.01 && newMonths < remainingMonths * 2) {
    newMonths++;
    const interest = bal * monthlyRate;
    newTotalInterest += interest;
    const totalPay = Math.min(bal + interest, basePayment + extraPayment);
    bal = bal + interest - totalPay;
  }

  return {
    originalMonths: remainingMonths,
    newMonths,
    monthsSaved: remainingMonths - newMonths,
    originalTotalInterest,
    newTotalInterest: round(newTotalInterest),
    interestSaved: round(originalTotalInterest - newTotalInterest),
  };
}

export function generatePayoffSchedule(
  balance: number,
  annualRate: number,
  remainingMonths: number,
  extraPayment: number,
  startDate: Date
): PayoffScheduleRow[] {
  const monthlyRate = annualRate / 100 / 12;
  const basePayment = solveForPayment(balance, annualRate, remainingMonths);
  let bal = balance;
  const rows: PayoffScheduleRow[] = [];

  let i = 0;
  while (bal > 0.01 && i < remainingMonths * 2) {
    i++;
    const interest = bal * monthlyRate;
    const totalPay = Math.min(bal + interest, basePayment + extraPayment);
    const principal = totalPay - interest;
    bal = bal - principal;

    rows.push({
      paymentNum: i,
      date: format(addMonths(startDate, i), 'MMM yyyy'),
      payment: round(totalPay),
      principalPaid: round(principal),
      interestPaid: round(interest),
      balance: round(Math.max(0, bal)),
    });
  }

  return rows;
}
