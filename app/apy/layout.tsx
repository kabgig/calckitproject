import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'APY Calculator | Annual Percentage Yield Calculator with Compounding',
  description:
    'Calculate Annual Percentage Yield (APY) with our free calculator. Compare different compounding frequencies, see growth projections, and maximize your savings returns.',
  keywords: [
    'apy calculator',
    'annual percentage yield',
    'compound interest calculator',
    'savings calculator',
    'apy vs apr',
    'interest compounding',
  ],
  openGraph: {
    title: 'APY Calculator | CalcKit.us',
    description:
      'Calculate Annual Percentage Yield (APY) with our free calculator.',
    type: 'website',
  },
};

export default function APYLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
