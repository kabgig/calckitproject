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
  alternates: {
    canonical: 'https://calckit.us/calculators/compound-interest',
  },
  openGraph: {
    title: 'Compound Interest Calculator – Growth with Contributions',
    description: 'Calculate compound interest with regular contributions. See how your investment grows year by year and export your growth schedule to PDF.',
    url: 'https://calckit.us/calculators/compound-interest',
    type: 'website',
    siteName: 'CalcKit.us',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compound Interest Calculator – Growth with Contributions',
    description: 'Calculate compound interest with regular contributions. See how your investment grows over time.',
  },
};

export default function CompoundInterestPage() {
  return <CompoundInterestCalculator />;
}
