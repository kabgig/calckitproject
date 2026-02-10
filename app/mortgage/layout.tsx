import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mortgage Calculator - Free Monthly Payment & Amortization Schedule',
  description:
    'Calculate your monthly mortgage payment with our free mortgage calculator. Generate detailed amortization schedules, see principal vs interest breakdown, and export results to PDF. Plan your home purchase with confidence.',
  keywords: [
    'mortgage calculator',
    'monthly payment calculator',
    'amortization schedule',
    'home loan calculator',
    'mortgage payment',
    'principal and interest',
    'mortgage amortization',
    'home loan payment calculator',
  ],
  openGraph: {
    title: 'Mortgage Calculator | CalcKit.us',
    description:
      'Calculate your monthly mortgage payment with our free mortgage calculator. Generate detailed amortization schedules and export to PDF.',
    url: 'https://calckit.us/mortgage',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Mortgage Calculator | CalcKit.us',
    description: 'Calculate monthly mortgage payments and view amortization schedules.',
  },
  alternates: {
    canonical: 'https://calckit.us/mortgage',
  },
};

export default function MortgageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
