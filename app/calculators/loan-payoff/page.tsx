import type { Metadata } from 'next';
import LoanPayoffCalculator from '@/components/calculators/loan-payoff/LoanPayoffCalculator';

export const metadata: Metadata = {
  title: 'Loan Payoff Calculator – Pay Off Debt Faster | CalcKit.us',
  description:
    'See how extra payments accelerate your loan payoff. Calculate months saved, interest saved, and generate an accelerated payment schedule.',
  keywords: [
    'loan payoff calculator',
    'early loan payoff',
    'extra payment calculator',
    'pay off loan faster',
    'loan payoff schedule',
  ],
  alternates: {
    canonical: 'https://calckit.us/calculators/loan-payoff',
  },
  openGraph: {
    title: 'Loan Payoff Calculator – Pay Off Debt Faster',
    description: 'See how extra payments accelerate your loan payoff. Calculate months saved, interest saved, and generate an accelerated payment schedule.',
    url: 'https://calckit.us/calculators/loan-payoff',
    type: 'website',
    siteName: 'CalcKit.us',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loan Payoff Calculator – Pay Off Debt Faster',
    description: 'See how extra payments accelerate your loan payoff and save on interest.',
  },
};

export default function LoanPayoffPage() {
  return <LoanPayoffCalculator />;
}
