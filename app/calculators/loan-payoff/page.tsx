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
};

export default function LoanPayoffPage() {
  return <LoanPayoffCalculator />;
}
