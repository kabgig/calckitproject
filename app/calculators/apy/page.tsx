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
  alternates: {
    canonical: 'https://calckit.us/calculators/apy',
  },
  openGraph: {
    title: 'APY Calculator – Annual Percentage Yield & Growth',
    description: 'Calculate Annual Percentage Yield (APY) with different compounding frequencies. See how your savings grow over time and compare rates.',
    url: 'https://calckit.us/calculators/apy',
    type: 'website',
    siteName: 'CalcKit.us',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'APY Calculator – Annual Percentage Yield & Growth',
    description: 'Calculate Annual Percentage Yield (APY) with different compounding frequencies.',
  },
};

export default function APYCalculatorPage() {
  return <APYCalculator />;
}
