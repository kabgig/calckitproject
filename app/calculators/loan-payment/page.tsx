import type { Metadata } from 'next';
import LoanPaymentCalculator from '@/components/calculators/loan-payment/LoanPaymentCalculator';

export const metadata: Metadata = {
  title: 'Loan Payment Calculator – Monthly Payment & Schedule | CalcKit.us',
  description:
    'Calculate monthly payments for any loan type—personal, auto, or student. See total interest and generate a full payment schedule.',
  keywords: [
    'loan payment calculator',
    'loan monthly payment calculator',
    'personal loan calculator',
    'auto loan calculator',
    'student loan calculator',
  ],
};

export default function LoanPaymentPage() {
  return <LoanPaymentCalculator />;
}
