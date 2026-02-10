import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mortgage Calculator | Free Monthly Payment & Amortization Calculator',
  description:
    'Calculate your monthly mortgage payment with our free mortgage calculator. Generate detailed amortization schedules, see principal vs interest breakdown, and export results to PDF.',
  keywords: [
    'mortgage calculator',
    'monthly payment calculator',
    'amortization schedule',
    'home loan calculator',
    'mortgage payment',
    'principal and interest',
  ],
  openGraph: {
    title: 'Mortgage Calculator | CalcKit.us',
    description:
      'Calculate your monthly mortgage payment with our free mortgage calculator.',
    type: 'website',
  },
};

export default function MortgageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
