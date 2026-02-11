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
};

export default function LoanComparisonPage() {
  return <LoanComparisonCalculator />;
}
