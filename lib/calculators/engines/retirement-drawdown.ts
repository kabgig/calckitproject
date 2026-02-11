import { round } from './shared/math';

export interface DrawdownRow {
  year: number;
  age: number;
  startBalance: number;
  withdrawal: number;
  interest: number;
  endBalance: number;
}

export interface DrawdownResult {
  yearsLastsUntil: number;
  ageMoneyRunsOut: number;
  totalWithdrawn: number;
  totalInterestEarned: number;
  schedule: DrawdownRow[];
}

export function calculateDrawdown(
  currentAge: number,
  retirementBalance: number,
  annualWithdrawal: number,
  annualReturn: number,
  inflationRate: number = 2
): DrawdownResult {
  const monthlyRate = annualReturn / 100 / 12;
  let balance = retirementBalance;
  let totalWithdrawn = 0;
  let totalInterest = 0;
  let monthlyWithdrawal = annualWithdrawal / 12;
  const schedule: DrawdownRow[] = [];
  let year = 0;

  while (balance > 0 && year < 80) {
    year++;
    const startBalance = balance;
    let yearWithdrawal = 0;
    let yearInterest = 0;
    for (let m = 0; m < 12; m++) {
      const interest = balance * monthlyRate;
      balance += interest;
      yearInterest += interest;
      const withdrawal = Math.min(monthlyWithdrawal, balance);
      balance -= withdrawal;
      yearWithdrawal += withdrawal;
      if (balance <= 0) { balance = 0; break; }
    }
    totalWithdrawn += yearWithdrawal;
    totalInterest += yearInterest;
    schedule.push({
      year,
      age: currentAge + year,
      startBalance: round(startBalance, 2),
      withdrawal: round(yearWithdrawal, 2),
      interest: round(yearInterest, 2),
      endBalance: round(Math.max(balance, 0), 2),
    });
    if (balance <= 0) break;
    // Adjust withdrawal for inflation
    monthlyWithdrawal *= 1 + inflationRate / 100;
  }

  return {
    yearsLastsUntil: year,
    ageMoneyRunsOut: currentAge + year,
    totalWithdrawn: round(totalWithdrawn, 2),
    totalInterestEarned: round(totalInterest, 2),
    schedule,
  };
}
