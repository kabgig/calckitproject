import { round } from './shared/math';

export interface MillionaireRow {
  year: number;
  startBalance: number;
  contribution: number;
  interest: number;
  endBalance: number;
}

export interface MillionaireResult {
  yearsToMillion: number;
  totalContributions: number;
  totalInterest: number;
  finalBalance: number;
  schedule: MillionaireRow[];
}

export function calculateMillionaire(
  currentSavings: number,
  monthlyContribution: number,
  annualReturn: number,
  targetAmount: number = 1_000_000
): MillionaireResult {
  const r = annualReturn / 100;
  const monthlyRate = r / 12;
  let balance = currentSavings;
  let totalContributions = currentSavings;
  let totalInterest = 0;
  const schedule: MillionaireRow[] = [];
  let year = 0;

  while (balance < targetAmount && year < 100) {
    year++;
    const startBalance = balance;
    let yearContrib = 0;
    let yearInterest = 0;
    for (let m = 0; m < 12; m++) {
      const interest = balance * monthlyRate;
      balance += interest + monthlyContribution;
      yearContrib += monthlyContribution;
      yearInterest += interest;
    }
    totalContributions += yearContrib;
    totalInterest += yearInterest;
    schedule.push({
      year,
      startBalance: round(startBalance, 2),
      contribution: round(yearContrib, 2),
      interest: round(yearInterest, 2),
      endBalance: round(balance, 2),
    });
    if (balance >= targetAmount) break;
  }

  return {
    yearsToMillion: year >= 100 ? Infinity : year,
    totalContributions: round(totalContributions, 2),
    totalInterest: round(totalInterest, 2),
    finalBalance: round(balance, 2),
    schedule,
  };
}
