import type { Metadata } from 'next';
import IncomeTaxCalculator from '@/components/calculators/income-tax/IncomeTaxCalculator';

export const metadata: Metadata = {
  title: 'Income Tax Calculator – 2025 Federal Tax Brackets | CalcKit.us',
  description:
    'Estimate your 2025 federal income tax using current tax brackets. See effective rate, marginal rate, and a detailed bracket breakdown.',
  keywords: [
    'income tax calculator',
    'federal tax calculator',
    '2025 tax brackets',
    'tax estimate calculator',
    'effective tax rate calculator',
  ],
};

export default function IncomeTaxPage() {
  return <IncomeTaxCalculator />;
}
