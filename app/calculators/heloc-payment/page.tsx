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
  alternates: {
    canonical: 'https://calckit.us/calculators/heloc-payment',
  },
  openGraph: {
    title: 'HELOC Payment Calculator – Home Equity Line of Credit',
    description: 'Calculate monthly repayment on a home equity line of credit. See total interest and total cost over the repayment period.',
    url: 'https://calckit.us/calculators/heloc-payment',
    type: 'website',
    siteName: 'CalcKit.us',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HELOC Payment Calculator – Home Equity Line of Credit',
    description: 'Calculate monthly repayment on a home equity line of credit.',
  },
};

export default function HELOCPaymentPage() {
  return <HELOCPaymentCalculator />;
}
