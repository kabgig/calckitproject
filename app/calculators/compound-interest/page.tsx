import type { Metadata } from 'next';
import CompoundInterestCalculator from '@/components/calculators/compound-interest/CompoundInterestCalculator';

export const metadata: Metadata = {
  title: 'Compound Interest Calculator – Growth with Contributions | CalcKit.us',
  description:
    'Calculate compound interest with regular contributions. See how your investment grows year by year and export your growth schedule to PDF.',
  keywords: [
    'compound interest calculator',
    'investment growth calculator',
    'compound interest with contributions',
    'savings growth calculator',
  ],
};

export default function CompoundInterestPage() {
  return <CompoundInterestCalculator />;
}
