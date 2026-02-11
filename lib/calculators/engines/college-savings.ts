import { round, solveForContribution } from './shared/math';

export interface CollegeSavingsRow {
  year: number;
  childAge: number;
  startBalance: number;
  contribution: number;
  interest: number;
  endBalance: number;
}

export interface CollegeSavingsResult {
  futureCollegeCost: number;
  requiredMonthlyContribution: number;
  totalContributions: number;
  totalInterest: number;
  projectedBalance: number;
  shortfall: number;
  schedule: CollegeSavingsRow[];
}

export function calculateCollegeSavings(
  childAge: number,
  collegeStartAge: number,
  annualCollegeCost: number,
  yearsInCollege: number,
  currentSavings: number,
  monthlyContribution: number,
  annualReturn: number,
  collegeCostInflation: number = 5
): CollegeSavingsResult {
  const yearsUntilCollege = collegeStartAge - childAge;
  const monthlyRate = annualReturn / 100 / 12;

  // future cost of college (inflated)
  let futureCollegeCost = 0;
  for (let y = 0; y < yearsInCollege; y++) {
    futureCollegeCost +=
      annualCollegeCost * Math.pow(1 + collegeCostInflation / 100, yearsUntilCollege + y);
  }
  futureCollegeCost = round(futureCollegeCost, 2);

  // simulate saving
  let balance = currentSavings;
  let totalContributions = currentSavings;
  let totalInterest = 0;
  const schedule: CollegeSavingsRow[] = [];

  for (let y = 1; y <= yearsUntilCollege; y++) {
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
      year: y,
      childAge: childAge + y,
      startBalance: round(startBalance, 2),
      contribution: round(yearContrib, 2),
      interest: round(yearInterest, 2),
      endBalance: round(balance, 2),
    });
  }

  const requiredMonthly = solveForContribution(
    futureCollegeCost, currentSavings, annualReturn, yearsUntilCollege, 12
  );

  return {
    futureCollegeCost,
    requiredMonthlyContribution: round(requiredMonthly, 2),
    totalContributions: round(totalContributions, 2),
    totalInterest: round(totalInterest, 2),
    projectedBalance: round(balance, 2),
    shortfall: round(Math.max(0, futureCollegeCost - balance), 2),
    schedule,
  };
}
