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
  alternates: {
    canonical: 'https://calckit.us/calculators/retirement-savings',
  },
  openGraph: {
    title: 'Retirement Savings Calculator – Plan Your Retirement',
    description: 'Project your retirement savings balance based on age, contributions, and expected returns. See a year-by-year growth schedule.',
    url: 'https://calckit.us/calculators/retirement-savings',
    type: 'website',
    siteName: 'CalcKit.us',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Retirement Savings Calculator – Plan Your Retirement',
    description: 'Project your retirement savings balance based on age, contributions, and expected returns.',
  },
};

export default function RetirementSavingsPage() {
  return <RetirementSavingsCalculator />;
}
