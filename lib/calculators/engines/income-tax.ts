import { round } from './shared/math';

// 2025 Federal Tax Brackets (Single filer)
const BRACKETS_2025_SINGLE = [
  { min: 0, max: 11925, rate: 10 },
  { min: 11925, max: 48475, rate: 12 },
  { min: 48475, max: 103350, rate: 22 },
  { min: 103350, max: 197300, rate: 24 },
  { min: 197300, max: 250525, rate: 32 },
  { min: 250525, max: 626350, rate: 35 },
  { min: 626350, max: Infinity, rate: 37 },
];

// 2025 Standard Deduction
const STANDARD_DEDUCTION_2025 = 15000;

export interface TaxBracketRow {
  bracket: string;
  rate: number;
  taxableInBracket: number;
  taxInBracket: number;
}

export interface IncomeTaxResult {
  grossIncome: number;
  standardDeduction: number;
  taxableIncome: number;
  totalFederalTax: number;
  effectiveRate: number;
  marginalRate: number;
  afterTaxIncome: number;
  monthlyAfterTax: number;
  brackets: TaxBracketRow[];
}

export function calculateIncomeTax(
  grossIncome: number,
  deductions: number = 0
): IncomeTaxResult {
  const totalDeductions = deductions > 0 ? deductions : STANDARD_DEDUCTION_2025;
  const taxableIncome = Math.max(0, grossIncome - totalDeductions);
  let totalTax = 0;
  let marginalRate = 10;
  const brackets: TaxBracketRow[] = [];

  for (const bracket of BRACKETS_2025_SINGLE) {
    if (taxableIncome <= bracket.min) break;
    const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
    const taxInBracket = taxableInBracket * bracket.rate / 100;
    totalTax += taxInBracket;
    marginalRate = bracket.rate;
    brackets.push({
      bracket: bracket.max === Infinity
        ? `$${bracket.min.toLocaleString()}+`
        : `$${bracket.min.toLocaleString()} – $${bracket.max.toLocaleString()}`,
      rate: bracket.rate,
      taxableInBracket: round(taxableInBracket, 2),
      taxInBracket: round(taxInBracket, 2),
    });
  }

  const effectiveRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;

  return {
    grossIncome: round(grossIncome, 2),
    standardDeduction: round(totalDeductions, 2),
    taxableIncome: round(taxableIncome, 2),
    totalFederalTax: round(totalTax, 2),
    effectiveRate: round(effectiveRate, 2),
    marginalRate,
    afterTaxIncome: round(grossIncome - totalTax, 2),
    monthlyAfterTax: round((grossIncome - totalTax) / 12, 2),
    brackets,
  };
}
