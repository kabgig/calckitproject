import type { Metadata } from 'next';
import RetirementSavingsCalculator from '@/components/calculators/retirement-savings/RetirementSavingsCalculator';

export const metadata: Metadata = {
  title: 'Retirement Savings Calculator – Plan Your Retirement | CalcKit.us',
  description:
    'Project your retirement savings balance based on age, contributions, and expected returns. See a year-by-year growth schedule.',
  keywords: [
    'retirement savings calculator',
    'retirement planning calculator',
    '401k calculator',
    'retirement fund calculator',
    'how much to save for retirement',
  ],
};

export default function RetirementSavingsPage() {
  return <RetirementSavingsCalculator />;
}
