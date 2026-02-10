import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'APY Calculator - Annual Percentage Yield & Compound Interest',
  description:
    'Calculate Annual Percentage Yield (APY) with our free calculator. Compare different compounding frequencies (daily, weekly, monthly), see growth projections, and maximize your savings returns. Understand the true value of your interest rate.',
  keywords: [
    'apy calculator',
    'annual percentage yield',
    'compound interest calculator',
    'savings calculator',
    'apy vs apr',
    'interest compounding',
    'daily compound interest',
    'savings account calculator',
  ],
  openGraph: {
    title: 'APY Calculator | CalcKit.us',
    description:
      'Calculate Annual Percentage Yield (APY) with different compounding frequencies. Free calculator with growth projections.',
    url: 'https://calckit.us/apy',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'APY Calculator | CalcKit.us',
    description: 'Calculate APY with different compounding frequencies and see growth projections.',
  },
  alternates: {
    canonical: 'https://calckit.us/apy',
  },
};

export default function APYLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
