import type { Metadata } from 'next';
import APYCalculator from '@/components/calculators/apy/APYCalculator';

export const metadata: Metadata = {
  title: 'APY Calculator – Annual Percentage Yield & Growth | CalcKit.us',
  description:
    'Calculate Annual Percentage Yield (APY) with different compounding frequencies. See how your savings grow over time and compare rates.',
  keywords: [
    'APY calculator',
    'annual percentage yield calculator',
    'savings interest calculator',
    'compound interest rate calculator',
  ],
};

export default function APYCalculatorPage() {
  return <APYCalculator />;
}
