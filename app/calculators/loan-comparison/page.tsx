import type { Metadata } from 'next';
import LoanComparisonCalculator from '@/components/calculators/loan-comparison/LoanComparisonCalculator';

export const metadata: Metadata = {
  title: 'Loan Comparison Calculator – Compare Two Loan Offers | CalcKit.us',
  description:
    'Compare two loan offers side by side to find the cheapest option. See monthly payment differences, total interest, and overall cost savings.',
  keywords: [
    'loan comparison calculator',
    'compare loans',
    'compare loan offers',
    'loan rate comparison',
    'which loan is cheaper',
  ],
  alternates: {
    canonical: 'https://calckit.us/calculators/loan-comparison',
  },
  openGraph: {
    title: 'Loan Comparison Calculator – Compare Two Loan Offers',
    description: 'Compare two loan offers side by side to find the cheapest option. See monthly payment differences, total interest, and overall cost savings.',
    url: 'https://calckit.us/calculators/loan-comparison',
    type: 'website',
    siteName: 'CalcKit.us',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loan Comparison Calculator – Compare Two Loan Offers',
    description: 'Compare two loan offers side by side to find the cheapest option.',
  },
};

export default function LoanComparisonPage() {
  return <LoanComparisonCalculator />;
}
