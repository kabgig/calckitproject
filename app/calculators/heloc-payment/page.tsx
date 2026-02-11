import type { Metadata } from 'next';
import HELOCPaymentCalculator from '@/components/calculators/heloc-payment/HELOCPaymentCalculator';

export const metadata: Metadata = {
  title: 'HELOC Payment Calculator – Home Equity Line of Credit | CalcKit.us',
  description:
    'Calculate monthly repayment on a home equity line of credit. See total interest and total cost over the repayment period.',
  keywords: [
    'HELOC calculator',
    'HELOC payment calculator',
    'home equity line of credit calculator',
    'HELOC repayment calculator',
    'home equity loan calculator',
  ],
};

export default function HELOCPaymentPage() {
  return <HELOCPaymentCalculator />;
}
