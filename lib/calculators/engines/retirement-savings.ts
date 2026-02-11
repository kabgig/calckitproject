import { round } from './shared/math';

export interface RetirementSavingsRow {
  year: number;
  age: number;
  startBalance: number;
  contribution: number;
  interest: number;
  endBalance: number;
}

export interface RetirementSavingsResult {
  futureValue: number;
  totalContributions: number;
  totalInterest: number;
  yearsToRetirement: number;
  schedule: RetirementSavingsRow[];
}

export function calculateRetirementSavings(
  currentAge: number,
  retirementAge: number,
  currentSavings: number,
  monthlyContribution: number,
  annualReturn: number,
  annualContributionIncrease: number = 0
): RetirementSavingsResult {
  const years = retirementAge - currentAge;
  const monthlyRate = annualReturn / 100 / 12;
  let balance = currentSavings;
  let totalContributions = currentSavings;
  let totalInterest = 0;
  let monthlyContr = monthlyContribution;
  const schedule: RetirementSavingsRow[] = [];

  for (let y = 1; y <= years; y++) {
    const startBalance = balance;
    let yearContrib = 0;
    let yearInterest = 0;
    for (let m = 0; m < 12; m++) {
      const interest = balance * monthlyRate;
      balance += interest + monthlyContr;
      yearContrib += monthlyContr;
      yearInterest += interest;
    }
    totalContributions += yearContrib;
    totalInterest += yearInterest;
    schedule.push({
      year: y,
      age: currentAge + y,
      startBalance: round(startBalance, 2),
      contribution: round(yearContrib, 2),
      interest: round(yearInterest, 2),
      endBalance: round(balance, 2),
    });
    monthlyContr *= 1 + annualContributionIncrease / 100;
  }

  return {
    futureValue: round(balance, 2),
    totalContributions: round(totalContributions, 2),
    totalInterest: round(totalInterest, 2),
    yearsToRetirement: years,
    schedule,
  };
}
