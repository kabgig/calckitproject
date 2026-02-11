import type { Metadata } from 'next';
import CollegeSavingsCalculator from '@/components/calculators/college-savings/CollegeSavingsCalculator';

export const metadata: Metadata = {
  title: 'College Savings Calculator – 529 Plan Projections | CalcKit.us',
  description:
    'Estimate future college costs and how much you need to save monthly. See projected savings, shortfall, and a year-by-year growth schedule.',
  keywords: [
    'college savings calculator',
    '529 plan calculator',
    'college fund calculator',
    'education savings calculator',
    'how much to save for college',
  ],
  alternates: {
    canonical: 'https://calckit.us/calculators/college-savings',
  },
  openGraph: {
    title: 'College Savings Calculator – 529 Plan Projections',
    description: 'Estimate future college costs and how much you need to save monthly. See projected savings, shortfall, and a year-by-year growth schedule.',
    url: 'https://calckit.us/calculators/college-savings',
    type: 'website',
    siteName: 'CalcKit.us',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'College Savings Calculator – 529 Plan Projections',
    description: 'Estimate future college costs and how much you need to save monthly.',
  },
};

export default function CollegeSavingsPage() {
  return <CollegeSavingsCalculator />;
}
