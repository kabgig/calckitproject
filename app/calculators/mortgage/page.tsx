import type { Metadata } from 'next';
import MortgageCalculator from '@/components/calculators/mortgage/MortgageCalculator';

export const metadata: Metadata = {
  title: 'Mortgage Calculator – Monthly Payment & Amortization | CalcKit.us',
  description:
    'Calculate your monthly mortgage payment and generate a full amortization schedule. See how principal and interest change over time and export to PDF.',
  keywords: [
    'mortgage calculator',
    'home loan calculator',
    'mortgage payment calculator',
    'amortization calculator',
    'amortization schedule',
  ],
};

export default function MortgageCalculatorPage() {
  return <MortgageCalculator />;
}
