// Rent vs Buy engine — year-by-year cost comparison

import { round } from './shared/math';

export interface RentVsBuyRow {
  year: number;
  cumulativeRent: number;
  cumulativeBuyCost: number;
  homeEquity: number;
  netBuyCost: number; // cumulative buy cost - equity
}

export interface RentVsBuyResult {
  breakEvenYear: number | null;
  totalRentCost: number;
  totalBuyCost: number;
  totalEquity: number;
  netBuyAdvantage: number;
}

export function calculateRentVsBuy(
  monthlyRent: number,
  rentIncreasePercent: number,
  homePrice: number,
  downPaymentPercent: number,
  rate: number,
  termYears: number,
  propertyTaxRate: number,
  annualInsurance: number,
  maintenancePercent: number,
  investmentReturnPercent: number,
  years: number
): { result: RentVsBuyResult; table: RentVsBuyRow[] } {
  const downPayment = homePrice * (downPaymentPercent / 100);
  const loanAmount = homePrice - downPayment;
  const monthlyRate = rate / 100 / 12;
  const totalPayments = termYears * 12;

  // Monthly mortgage P&I
  let monthlyPI: number;
  if (monthlyRate === 0) {
    monthlyPI = loanAmount / totalPayments;
  } else {
    const factor = Math.pow(1 + monthlyRate, totalPayments);
    monthlyPI = loanAmount * ((monthlyRate * factor) / (factor - 1));
  }

  const rows: RentVsBuyRow[] = [];
  let cumulativeRent = 0;
  let cumulativeBuyCost = downPayment; // include down payment
  let loanBalance = loanAmount;
  let currentRent = monthlyRent;
  let breakEvenYear: number | null = null;

  // Opportunity cost: what down payment would earn if invested instead
  let investmentBalance = 0;
  const monthlyInvestReturn = investmentReturnPercent / 100 / 12;

  for (let y = 1; y <= years; y++) {
    // Renter costs for this year
    let yearRent = 0;
    for (let m = 0; m < 12; m++) {
      yearRent += currentRent;
      // Renter invests the difference (down payment opportunity grows)
      investmentBalance *= 1 + monthlyInvestReturn;
    }
    cumulativeRent += yearRent;
    currentRent *= 1 + rentIncreasePercent / 100;

    // Buyer costs for this year
    let yearBuyCost = 0;
    let yearInterest = 0;
    for (let m = 0; m < 12; m++) {
      if (y * 12 - 12 + m < totalPayments && loanBalance > 0) {
        const interest = loanBalance * monthlyRate;
        const principal = monthlyPI - interest;
        loanBalance = Math.max(0, loanBalance - principal);
        yearBuyCost += monthlyPI;
        yearInterest += interest;
      }
    }
    // Add taxes, insurance, maintenance
    yearBuyCost += homePrice * (propertyTaxRate / 100);
    yearBuyCost += annualInsurance;
    yearBuyCost += homePrice * (maintenancePercent / 100);
    cumulativeBuyCost += yearBuyCost;

    const homeEquity = homePrice - loanBalance; // simplified: no appreciation

    const netBuyCost = cumulativeBuyCost - homeEquity;

    if (breakEvenYear === null && netBuyCost < cumulativeRent) {
      breakEvenYear = y;
    }

    rows.push({
      year: y,
      cumulativeRent: round(cumulativeRent),
      cumulativeBuyCost: round(cumulativeBuyCost),
      homeEquity: round(homeEquity),
      netBuyCost: round(netBuyCost),
    });
  }

  const lastRow = rows[rows.length - 1];
  return {
    result: {
      breakEvenYear,
      totalRentCost: lastRow.cumulativeRent,
      totalBuyCost: lastRow.cumulativeBuyCost,
      totalEquity: lastRow.homeEquity,
      netBuyAdvantage: round(lastRow.cumulativeRent - lastRow.netBuyCost),
    },
    table: rows,
  };
}
