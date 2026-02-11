import type { Metadata } from 'next';
import CreditCardPayoffCalculator from '@/components/calculators/credit-card-payoff/CreditCardPayoffCalculator';

export const metadata: Metadata = {
  title: 'Credit Card Payoff Calculator – Debt-Free Timeline | CalcKit.us',
  description:
    'Calculate how long it will take to pay off your credit card balance. See total interest paid and generate a month-by-month payoff schedule.',
  keywords: [
    'credit card payoff calculator',
    'credit card debt calculator',
    'pay off credit card',
    'credit card interest calculator',
    'debt free calculator',
  ],
  alternates: {
    canonical: 'https://calckit.us/calculators/credit-card-payoff',
  },
  openGraph: {
    title: 'Credit Card Payoff Calculator – Debt-Free Timeline',
    description: 'Calculate how long it will take to pay off your credit card balance. See total interest paid and generate a month-by-month payoff schedule.',
    url: 'https://calckit.us/calculators/credit-card-payoff',
    type: 'website',
    siteName: 'CalcKit.us',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Credit Card Payoff Calculator – Debt-Free Timeline',
    description: 'Calculate how long it will take to pay off your credit card balance and see total interest.',
  },
};

export default function CreditCardPayoffPage() {
  return <CreditCardPayoffCalculator />;
}
